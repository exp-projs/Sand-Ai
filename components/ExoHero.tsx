'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

gsap.registerPlugin(ScrollTrigger)

export default function ExoHero() {
  const pinRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    // 1. Initial entrance animations for text lines
    const ctx = gsap.context(() => {
      // Scale and shift mascot image to the right to prevent text overlap
      gsap.set(imgRef.current, {
        scale: 1.02,
        xPercent: 0,
        yPercent: -2.5,
        transformOrigin: 'right top',
      })

      // Blue dot reveals
      gsap.fromTo(
        '.hero-dot',
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          ease: 'back.out(1.7)',
          delay: 0.2,
        }
      )

      // Headline lines slide up from behind mask
      gsap.fromTo(
        '.hero-headline-line span',
        { y: '110%', rotate: 4 },
        {
          y: '0%',
          rotate: 0,
          duration: 1.4,
          ease: 'power4.out',
          stagger: 0.15,
          delay: 0.3,
        }
      )

      // Subtitle reveals softly
      gsap.fromTo(
        '.hero-subline',
        { opacity: 0, y: 20 },
        {
          opacity: 0.85,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.8,
        }
      )

      // Scroll indicator fades in
      gsap.fromTo(
        indicatorRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 0.6,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
          delay: 1.6,
        }
      )
    }, pinRef)

    // 2. ScrollTrigger dynamic parallax timeline (no pinning)
    const isMobile = window.matchMedia('(hover: none)').matches

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: pinRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true, // smooth scrub interpolation
      },
    })

    // Premium background image parallax motion
    scrollTimeline.to(
      imgRef.current,
      {
        yPercent: 15,
        ease: 'none',
      },
      0
    )

    // Sleek parallax shift & fade out for text content
    scrollTimeline.to(
      textRef.current,
      {
        yPercent: isMobile ? -15 : -30,
        opacity: 0,
        ease: 'none',
      },
      0
    )

    // Fade out scroll indicator on scroll down
    scrollTimeline.to(
      indicatorRef.current,
      {
        opacity: 0,
        y: -30,
        ease: 'none',
      },
      0
    )

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === pinRef.current) trigger.kill()
      })
    }
  }, [])

  const headlineLines = ['Smarter', 'Growth', "for Bharat's", 'Local Business.']

  return (
    <div ref={pinRef} className="hero-pin-wrapper w-full h-screen bg-sand-bg flex items-center justify-center relative overflow-hidden">
      {/* Zoomable Floating Hero Card */}
      <div
        ref={cardRef}
        className="hero-card w-full h-full relative overflow-hidden flex items-end"
        style={{
          transformOrigin: 'center center',
          willChange: 'width, height, border-radius',
        }}
      >
        {/* Background Image inside card */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            ref={imgRef}
            src="/giraffe.png"
            alt="Sand AI — Empowering local businesses with AI"
            className="w-full h-full object-cover"
            style={{
              willChange: 'transform',
              objectPosition: 'right -35px',
              transformOrigin: 'right top',
            }}
            loading="eager"
            decoding="async"
            // @ts-ignore
            fetchPriority="high"
            width={1920}
            height={1080}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="hero-gradient absolute inset-0 z-[1]" />

        {/* Text Contrast Backdrop Overlay */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-slate-950/70 via-slate-950/30 to-transparent pointer-events-none" />

        {/* Top Navbar Contrast Overlay for Dark Mode */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-950/60 to-transparent z-[2] pointer-events-none hidden dark:block" />

        {/* Content Section */}
        <div
          ref={textRef}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32"
          style={{
            willChange: 'transform, opacity',
          }}
        >
          {user && (
            <>
              <style>{`
                @keyframes fadeInDown {
                  from { opacity: 0; transform: translateY(-10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                .hero-welcome-badge {
                  animation: fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
              `}</style>
              <div className="hero-welcome-badge mb-6 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-950/75 backdrop-blur-md border border-sand-purple/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] text-xs md:text-sm font-semibold tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sand-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sand-orange"></span>
                </span>
                <span className="text-white/90">Welcome, </span>
                <span className="font-extrabold bg-gradient-to-r from-sand-purple to-sand-orange bg-clip-text text-transparent uppercase">
                  {user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User'}
                </span>
              </div>
            </>
          )}

          {/* Blue Accent Dot */}
          <div className="hero-dot opacity-0 w-3 h-3 bg-blue-500 rounded-full mb-6 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />

          {/* Masked Headline */}
          <h1 className="exo-headline mb-6 text-white leading-none">
            {headlineLines.map((line, i) => (
              <span
                key={i}
                className="hero-headline-line block overflow-hidden"
              >
                <span className="block will-change-transform pb-1">
                  {i === 2 ? (
                    <>
                      for <span className="text-sand-purple">Bharat's</span>
                    </>
                  ) : i === 3 ? (
                    <span className="text-sand-orange">Local Business.</span>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-subline text-white/80 max-w-[640px] leading-relaxed opacity-0 text-base md:text-lg font-normal">
            Every rupee you spend on ads is either working or wasting. Growth problem that appears during paid campaigns, SEO, website or analytics . We identify what’s actually causing them and then decide what to improve. We wire together paid campaigns, automated follow-ups, and live performance dashboards so nothing leaks and nothing gets missed. You grow. We make sure of it.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={indicatorRef}
        id="scroll-indicator"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-white/50 text-[10px] tracking-[0.25em] uppercase font-inter">
          Scroll to explore
        </span>
        <svg
          className="scroll-indicator w-5 h-5 text-white/50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  )
}
