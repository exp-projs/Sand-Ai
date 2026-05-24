'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function KineticMarquee() {
  const containerRef = useRef<HTMLDivElement>(null)
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track1 = track1Ref.current
    const track2 = track2Ref.current
    const container = containerRef.current
    if (!track1 || !track2 || !container) return

    // Create GSAP infinite marquee loops
    const tween1 = gsap.to(track1, {
      xPercent: -50,
      ease: 'none',
      duration: 32,
      repeat: -1,
    })

    const tween2 = gsap.to(track2, {
      xPercent: 0,
      ease: 'none',
      duration: 32,
      repeat: -1,
    })
    // Start track 2 at -50% so it scrolls right
    gsap.set(track2, { xPercent: -50 })

    const latestVelocity = { current: 0 }

    // ScrollTrigger to track scroll speed and apply kinetic skew and speedup
    let scrollTriggerInstance = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        // Get current scroll velocity (px/sec)
        const velocity = self.getVelocity()
        latestVelocity.current = velocity
        const absVelocity = Math.abs(velocity)
        
        // Calculate speed multiplier based on velocity (cap at 6x)
        const speedScale = 1 + Math.min(absVelocity / 350, 5)
        
        // Calculate skew angle based on velocity (cap at 15 degrees, direction aware)
        const skewAngle = (velocity / 200) * -1
        const clampedSkew = Math.max(Math.min(skewAngle, 12), -12)

        // Smoothly animate the timeScale (speed) of marquees
        gsap.to([tween1, tween2], {
          timeScale: speedScale,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        })

        // Smoothly animate skew of track elements
        gsap.to([track1, track2], {
          skewX: clampedSkew,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      },
    })

    // Slowly decay speed and skew back to default when scroll stops
    const decayInterval = setInterval(() => {
      const scrollVelocity = latestVelocity.current
      if (Math.abs(scrollVelocity) < 10) {
        gsap.to([tween1, tween2], {
          timeScale: 1,
          duration: 0.8,
          ease: 'power1.out',
          overwrite: 'auto',
        })
        gsap.to([track1, track2], {
          skewX: 0,
          duration: 0.8,
          ease: 'power1.out',
          overwrite: 'auto',
        })
      }
      latestVelocity.current *= 0.85
    }, 150)

    return () => {
      tween1.kill()
      tween2.kill()
      scrollTriggerInstance.kill()
      clearInterval(decayInterval)
    }
  }, [])

  const row1Words = [
    { text: 'AI Automation', style: 'text-gradient' },
    { text: '★', style: 'text-slate-400/40 dark:text-slate-600/40' },
    { text: 'Scale Operations', style: 'text-outline-purple' },
    { text: '★', style: 'text-slate-400/40 dark:text-slate-600/40' },
    { text: 'Deep Market Intelligence', style: 'text-solid' },
    { text: '★', style: 'text-slate-400/40 dark:text-slate-600/40' },
    { text: 'Conversational Pipelines', style: 'text-gradient-orange' },
    { text: '★', style: 'text-slate-400/40 dark:text-slate-600/40' },
  ]

  const row2Words = [
    { text: 'Digital Architecture', style: 'text-outline-orange' },
    { text: '★', style: 'text-slate-400/40 dark:text-slate-600/40' },
    { text: 'Hyper-Growth', style: 'text-gradient' },
    { text: '★', style: 'text-slate-400/40 dark:text-slate-600/40' },
    { text: 'Autonomous Core', style: 'text-solid' },
    { text: '★', style: 'text-slate-400/40 dark:text-slate-600/40' },
    { text: 'Meta Ads Integration', style: 'text-gradient-orange' },
    { text: '★', style: 'text-slate-400/40 dark:text-slate-600/40' },
  ]

  // Helper to render double content for seamless looping
  const renderRow = (words: typeof row1Words) => {
    return (
      <div className="flex whitespace-nowrap gap-8 py-2 md:py-4">
        {words.map((item, idx) => (
          <span key={`word-${idx}`} className={`text-4xl md:text-6xl lg:text-7xl font-black uppercase font-poppins tracking-wider select-none inline-block ${getStyleClass(item.style)}`}>
            {item.text}
          </span>
        ))}
      </div>
    )
  }

  const getStyleClass = (style: string) => {
    switch (style) {
      case 'text-gradient':
        return 'bg-gradient-to-r from-sand-purple to-sand-deep-purple dark:from-sand-purple dark:to-sand-soft-orange bg-clip-text text-transparent pb-1'
      case 'text-gradient-orange':
        return 'bg-gradient-to-r from-sand-orange to-sand-purple dark:from-sand-orange dark:to-sand-soft-orange bg-clip-text text-transparent pb-1'
      case 'text-outline-purple':
        return 'text-transparent [-webkit-text-stroke:1px_#6461ff] dark:[-webkit-text-stroke:1px_rgba(123,121,255,0.6)]'
      case 'text-outline-orange':
        return 'text-transparent [-webkit-text-stroke:1px_#ff8a00] dark:[-webkit-text-stroke:1px_rgba(255,155,38,0.6)]'
      case 'text-solid':
      default:
        return 'text-slate-800/80 dark:text-slate-200/80'
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden py-16 md:py-24 my-12 md:my-20 bg-gradient-to-b from-transparent via-sand-card-orange/10 to-transparent dark:via-sand-card-orange/5"
    >
      <div className="flex flex-col gap-6 md:gap-8 skew-element">
        {/* Row 1: Left to Right */}
        <div className="w-full overflow-hidden flex select-none">
          <div ref={track1Ref} className="flex gap-8 whitespace-nowrap min-w-max">
            {renderRow(row1Words)}
            {renderRow(row1Words)}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="w-full overflow-hidden flex select-none">
          <div ref={track2Ref} className="flex gap-8 whitespace-nowrap min-w-max">
            {renderRow(row2Words)}
            {renderRow(row2Words)}
          </div>
        </div>
      </div>
    </section>
  )
}
