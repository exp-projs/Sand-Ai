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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.9,
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

    // 2. ScrollTrigger dynamic zoom & pin timeline
    const isMobile = window.matchMedia('(hover: none)').matches

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: pinRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1, // smooth scrub interpolation
        pin: true,
        pinSpacing: true,
      },
    })

    // Exo Ape card zoom transformation
    scrollTimeline.to(cardRef.current, {
      width: isMobile ? '94vw' : '90vw',
      height: isMobile ? '80vh' : '85vh',
      borderRadius: isMobile ? '24px' : '40px',
      ease: 'power1.inOut',
    })

    // Background image zoom parallax inside the frame
    scrollTimeline.to(
      imgRef.current,
      {
        scale: 1.0,
        ease: 'power1.inOut',
      },
      0
    )

    // Parallax shift for text content
    scrollTimeline.to(
      textRef.current,
      {
        yPercent: isMobile ? -10 : -25,
        opacity: 0.15,
        ease: 'none',
      },
      0
    )

    // Fade out scroll indicator early on scroll down
    scrollTimeline.to(
      indicatorRef.current,
      {
        opacity: 0,
        y: -20,
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

  const headlineLines = ['Smarter', 'Scale.', 'Autonomous', 'Growth.']

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
            className="w-full h-full object-cover object-center scale-110"
            style={{
              willChange: 'transform',
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

          {/* Masked Headline */}
          <h1 className="exo-headline mb-6 text-white leading-none">
            {headlineLines.map((line, i) => (
              <span
                key={i}
                className="hero-headline-line block overflow-hidden"
              >
                <span className="block will-change-transform">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          {/* Subline */}
          <p className="hero-subline text-white/80 max-w-[520px] leading-relaxed opacity-0 text-sm md:text-base font-normal">
            Deploying conversational intelligence, custom digital environments, and autonomous paid acquisition models—tailored for Tier-2 brands, retail commerce, and modern medical clinics.
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
