'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

export default function ScrollIntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const purpleOrbRef = useRef<HTMLDivElement>(null)
  const orangeOrbRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
        }
      })

      const particles = particlesRef.current ? Array.from(particlesRef.current.children) : []

      // THE REVEAL (Starts immediately, finishes by 20% of scroll)
      tl.to(purpleOrbRef.current, { scale: 3, xPercent: 60, yPercent: 20, opacity: 0.8, duration: 1 }, 0)
        .to(orangeOrbRef.current, { scale: 3, xPercent: -60, yPercent: -20, opacity: 0.8, duration: 1 }, 0)
        .to(textRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.8 }, 0)
        .fromTo(particles,
          { x: 0, y: 50, scale: 0, opacity: 0 },
          {
            x: "random(-180, 180)",
            y: "random(-180, 180)",
            scale: "random(0.8, 1.5)",
            opacity: 1,
            rotation: "random(-180, 180)",
            stagger: 0.05,
            ease: "power3.out",
            duration: 0.8
          },
          0
        )
      
      // THE HOLD (Empty space for a long scroll distance)

      // THE GENTLE EXIT (Starts at duration 3, makes the transition much slower)
      tl.to(purpleOrbRef.current, { scale: 10, opacity: 0, duration: 2, ease: 'power1.inOut' }, 3)
        .to(orangeOrbRef.current, { scale: 10, opacity: 0, duration: 2, ease: 'power1.inOut' }, 3)
        .to(textRef.current, { opacity: 0, scale: 1.2, y: -50, duration: 1.5 }, 3.5)
        .to(particles, { opacity: 0, scale: 2, y: -100, stagger: 0.02, duration: 1.5 }, 3.5)

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-[120vh] overflow-hidden flex items-center justify-center bg-sand-bg">
      <div
        ref={purpleOrbRef}
        className="absolute left-1/4 top-1/4 w-[40vh] h-[40vh] bg-sand-purple rounded-full blur-[100px] opacity-60 mix-blend-multiply dark:mix-blend-screen"
      />
      <div
        ref={orangeOrbRef}
        className="absolute right-1/4 bottom-1/4 w-[40vh] h-[40vh] bg-sand-orange rounded-full blur-[100px] opacity-60 mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Floating Elements Container */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
        <div ref={particlesRef} className="relative w-0 h-0">
          {/* Particles positioned accurately outward from the exact center */}
          <div className="absolute -top-[150px] -left-[250px] text-sand-purple text-3xl font-bold">✦</div>
          <div className="absolute top-[120px] left-[280px] text-sand-orange bg-sand-orange/20 rounded-full w-6 h-6 backdrop-blur-sm shadow-lg border border-sand-border"></div>
          <div className="absolute top-[180px] -left-[280px] text-sand-purple text-5xl opacity-40">✴</div>
          <div className="absolute -top-[220px] left-[160px] text-sand-orange text-4xl font-bold">✦</div>
          <div className="absolute top-[20px] -left-[350px] text-sand-purple bg-sand-purple/20 rounded-full w-10 h-10 backdrop-blur-sm border border-sand-border"></div>
          <div className="absolute -top-[50px] left-[320px] text-sand-orange text-5xl opacity-50 font-bold">✴</div>
          <div className="absolute top-[280px] left-[120px] text-sand-orange bg-sand-orange/40 w-5 h-5 rounded-full blur-[1px]"></div>
          <div className="absolute -bottom-[200px] -left-[100px] text-sand-purple text-xl font-bold border-2 border-sand-purple/30 w-8 h-8 rounded-sm rotate-12"></div>
        </div>
      </div>

      <div ref={textRef} className="text-center z-10 opacity-0 scale-90 translate-y-12 px-6">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-sand-textPrimary tracking-tight leading-tight">
          Welcome to the <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sand-purple to-sand-orange drop-shadow-sm">
            Intelligence Era
          </span>
        </h2>
        <p className="mt-6 text-sand-textSecondary max-w-2xl mx-auto text-lg md:text-xl">
          Where data points become decisions, and traffic becomes revenue.
        </p>
      </div>
    </section>
  )
}
