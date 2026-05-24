'use client'

import React, { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

export default function InteractiveNetwork() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    // Determine initial theme
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')

    // Observe class changes on html tag for theme toggling
    const observer = new MutationObserver(() => {
      const currentDark = document.documentElement.classList.contains('dark')
      setTheme(currentDark ? 'dark' : 'light')
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    const particleCount = 45
    const connectionDist = 110
    const mouseRadius = 160

    // Theme-based colors
    const colors = {
      purple: '100, 97, 255',  // #6461FF
      orange: '255, 138, 0',  // #FF8A00
    }

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      
      initParticles(rect.width, rect.height)
    }

    const initParticles = (w: number, h: number) => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        const isOrange = Math.random() > 0.5
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: 1.5 + Math.random() * 2,
          color: isOrange ? colors.orange : colors.purple,
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleMouseEnter = () => {
      mouseRef.current.active = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current.x = e.touches[0].clientX - rect.left
        mouseRef.current.y = e.touches[0].clientY - rect.top
        mouseRef.current.active = true
      }
    }

    const handleTouchEnd = () => {
      mouseRef.current.active = false
    }

    // Bind event listeners
    window.addEventListener('resize', resizeCanvas)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('touchmove', handleTouchMove, { passive: true })
    container.addEventListener('touchend', handleTouchEnd)

    // Initial sizing
    resizeCanvas()

    // Draw Loop
    const draw = () => {
      const rect = container.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      ctx.clearRect(0, 0, w, h)

      const mouse = mouseRef.current
      const lineAlphaFactor = theme === 'dark' ? 0.18 : 0.12
      const dotAlphaFactor = theme === 'dark' ? 0.7 : 0.5

      // 1. Update and Draw lines between particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]

        // Update positions
        p1.x += p1.vx
        p1.y += p1.vy

        // Bounce boundaries
        if (p1.x < 0 || p1.x > w) p1.vx *= -1
        if (p1.y < 0 || p1.y > h) p1.vy *= -1

        // Mouse attraction / interaction
        if (mouse.active) {
          const dx = mouse.x - p1.x
          const dy = mouse.y - p1.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseRadius) {
            // Soft magnetic pull towards mouse
            const force = (mouseRadius - dist) / mouseRadius
            p1.x += (dx / dist) * force * 0.8
            p1.y += (dy / dist) * force * 0.8

            // Draw link to mouse cursor
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(${p1.color}, ${force * lineAlphaFactor * 1.5})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }

        // Draw connections to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * lineAlphaFactor
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            // Linear gradient styling for links connecting different colored nodes
            if (p1.color !== p2.color) {
              const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
              grad.addColorStop(0, `rgba(${p1.color}, ${alpha})`)
              grad.addColorStop(1, `rgba(${p2.color}, ${alpha})`)
              ctx.strokeStyle = grad
            } else {
              ctx.strokeStyle = `rgba(${p1.color}, ${alpha})`
            }
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // 2. Draw nodes
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${dotAlphaFactor})`
        ctx.fill()

        // Soft outer glow for particles close to mouse
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouseRadius) {
            const glowOpacity = (1 - dist / mouseRadius) * 0.3
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${p.color}, ${glowOpacity})`
            ctx.fill()
          }
        }
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[280px] md:h-[380px] my-12 md:my-20 flex items-center justify-center overflow-hidden border-y border-sand-border/40 dark:border-sand-border/10 bg-gradient-to-b from-transparent to-sand-card-purple/10 dark:to-sand-card-purple/5"
    >
      {/* HTML5 Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block z-0" />

      {/* Futuristic Center Badge Overlay */}
      <div className="relative z-10 text-center px-6 py-8 rounded-2xl bg-white/5 dark:bg-slate-950/20 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-[0_12px_40px_0_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_0_rgba(0,0,0,0.3)] max-w-md mx-4 pointer-events-none transform transition-transform duration-500 hover:scale-[1.02]">
        <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-sand-purple/10 dark:bg-sand-purple/20 border border-sand-purple/20">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sand-purple opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sand-purple"></span>
          </span>
          <span className="text-[10px] md:text-xs font-semibold tracking-widest text-sand-purple uppercase font-inter">
            Sand AI Integration
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-poppins tracking-tight mb-2">
          Bridging Intelligence & Automation
        </h3>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-inter leading-relaxed max-w-[320px] mx-auto">
          Interact to visualize dynamic node pipelines adapting in real-time.
        </p>
      </div>
    </section>
  )
}
