'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    // Only show custom cursor on devices that support hover (desktop mice)
    if (typeof window !== 'undefined') {
      const hasHover = window.matchMedia('(hover: hover)').matches
      setIsTouch(!hasHover)
    }
  }, [])

  useEffect(() => {
    if (isTouch) return

    const cursor = cursorRef.current
    const label = labelRef.current
    if (!cursor || !label) return

    // Position coordinates
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    const lerp = 0.15

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!cursor.classList.contains('is-active')) {
        cursor.classList.add('is-active')
      }
    }

    // Dynamic Hover & Context-Aware Cursor States
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isCard = target.closest('.portfolio-card')
      const isLink = target.closest('a') || target.closest('button') || target.closest('.clickable')

      if (isCard) {
        cursor.classList.add('is-hovering-card')
        label.innerText = 'EXPLORE'
        gsap.to(cursor, {
          width: 80,
          height: 80,
          backgroundColor: '#FF8A00',
          mixBlendMode: 'normal',
          duration: 0.3,
        })
      } else if (isLink) {
        cursor.classList.add('is-hovering-link')
        label.innerText = ''
        gsap.to(cursor, {
          width: 40,
          height: 40,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 138, 0, 0.6)',
          borderWidth: 2,
          mixBlendMode: 'normal',
          duration: 0.3,
        })
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isCard = target.closest('.portfolio-card')
      const isLink = target.closest('a') || target.closest('button') || target.closest('.clickable')

      if (isCard || isLink) {
        cursor.classList.remove('is-hovering-card', 'is-hovering-link')
        label.innerText = ''
        gsap.to(cursor, {
          width: 20,
          height: 20,
          backgroundColor: '#FF8A00',
          borderColor: 'transparent',
          borderWidth: 0,
          mixBlendMode: 'difference',
          duration: 0.3,
        })
      }
    }

    // ─── Magnetic Pull Effect for Premium Interaction ───
    const magneticElements: HTMLElement[] = []
    
    // Select magnetic items (nav links, CTA buttons, social links)
    const selectMagnetic = () => {
      const elms = document.querySelectorAll<HTMLElement>(
        '.magnetic, nav a, .theme-toggle, footer a, header button'
      )
      elms.forEach((el) => {
        if (!magneticElements.includes(el)) {
          magneticElements.push(el)
          bindMagnetic(el)
        }
      })
    }

    const bindMagnetic = (el: HTMLElement) => {
      el.style.willChange = 'transform'

      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const relX = e.clientX - (rect.left + rect.width / 2)
        const relY = e.clientY - (rect.top + rect.height / 2)

        // Soft magnetic translate pull
        gsap.to(el, {
          x: relX * 0.35,
          y: relY * 0.35,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      const onMouseLeave = () => {
        // High-end elastic rebound snap back to center
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
          overwrite: 'auto',
        })
      }

      el.addEventListener('mousemove', onMouseMove)
      el.addEventListener('mouseleave', onMouseLeave)

      // Store callbacks on element for clean cleanup
      ;(el as any)._onMouseMove = onMouseMove
      ;(el as any)._onMouseLeave = onMouseLeave
    }

    // Listeners & animation loop
    let rafId: number
    function animate() {
      if (!cursor) return
      cursorX += (mouseX - cursorX) * lerp
      cursorY += (mouseY - cursorY) * lerp

      cursor.style.transform = `translate3d(${cursorX - cursor.offsetWidth / 2}px, ${cursorY - cursor.offsetHeight / 2}px, 0)`

      rafId = requestAnimationFrame(animate)
    }
    
    rafId = requestAnimationFrame(animate)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    // Run selection of magnetic items
    selectMagnetic()
    const observer = new MutationObserver(selectMagnetic)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      observer.disconnect()

      // Clean up magnetic event listeners
      magneticElements.forEach((el) => {
        if ((el as any)._onMouseMove) {
          el.removeEventListener('mousemove', (el as any)._onMouseMove)
        }
        if ((el as any)._onMouseLeave) {
          el.removeEventListener('mouseleave', (el as any)._onMouseLeave)
        }
      })
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <div
      ref={cursorRef}
      className="custom-cursor pointer-events-none"
      style={{
        border: '0px solid transparent',
        backgroundColor: '#FF8A00',
        width: '20px',
        height: '20px',
      }}
    >
      <span
        ref={labelRef}
        className="custom-cursor-label text-white text-[9px] font-bold tracking-wider pointer-events-none"
      >
        EXPLORE
      </span>
    </div>
  )
}
