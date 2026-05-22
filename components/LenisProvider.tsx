'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface LenisProviderProps {
  children: React.ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Check if device supports touch/hover to disable high-overhead transitions on mobile
    const isMobile = window.matchMedia('(hover: none)').matches

    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease
      smoothWheel: true,
      syncTouch: true,
    })

    lenisRef.current = lenis

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    // Velocity-based Skew Animation
    if (!isMobile) {
      lenis.on('scroll', (e) => {
        // Map velocity to a safe skew range [-1.5deg, 1.5deg]
        const targetSkew = gsap.utils.clamp(-1.5, 1.5, e.velocity * 0.03)

        // Interpolate elements with '.skew-element' class
        gsap.to('.skew-element', {
          skewY: targetSkew,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }

    // Integrate with GSAP ticker
    function update(time: number) {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Ensure scroll positions reset correctly on fresh load after intro
    window.history.scrollRestoration = 'manual'

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
