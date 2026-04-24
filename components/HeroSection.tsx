'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { StatCard } from '@/types'

const STAT_CARDS: StatCard[] = [
  {
    id: 'ai-campaign',
    label: 'AI Campaign Performance',
    value: '↑45%',
    variant: 'purple',
    position: { top: '5%', right: '0%' },
  },
  {
    id: 'roi',
    label: 'ROI',
    value: '312%',
    delta: 'This Month',
    variant: 'white',
    position: { top: '30%', right: '-10%' },
  },
  {
    id: 'leads',
    label: 'Leads Generated',
    value: '2,458',
    delta: '+68%',
    variant: 'white',
    position: { bottom: '25%', left: '-5%' },
  },
  {
    id: 'conversions',
    label: '10X Better Conversions Powered by AI',
    value: '',
    variant: 'orange',
    position: { bottom: '5%', right: '5%' },
  },
]

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const titleLinesRef = useRef<HTMLHeadingElement>(null)
  const giraffeRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // H1 words staggered entrance
      if (titleLinesRef.current) {
        const words = titleLinesRef.current.querySelectorAll('.word-wrap')
        gsap.from(words, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
        })
      }

      // Badge entrance
      gsap.from(badgeRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      })

      // CTA Buttons entrance
      gsap.from(buttonsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
      })

      // Giraffe bounce loop
      gsap.to(giraffeRef.current, {
        y: -18,
        repeat: -1,
        yoyo: true,
        duration: 2.6,
        ease: 'sine.inOut',
      })

      // Floating Stat Cards scatter in
      if (cardsRef.current) {
        const cards = cardsRef.current.children
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          x: () => (Math.random() - 0.5) * 50,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.5,
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative pt-32 pb-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4F0F9] to-[#EDE8FA] -z-10" />

      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="flex flex-col items-start gap-8 z-10">
          <div ref={badgeRef} className="border border-sand-border rounded-full px-4 py-1.5 text-xs font-semibold text-sand-purple uppercase tracking-wider bg-sand-cardPurple/50 backdrop-blur-sm">
            ✦ AI POWERED MARKETING. REAL WORLD RESULTS.
          </div>

          <h1 ref={titleLinesRef} className="font-poppins text-[42px] leading-tight md:text-[56px] font-bold text-sand-textPrimary">
            <span className="inline-block overflow-hidden"><span className="word-wrap inline-block">Smarter Marketing.</span></span><br />
            <span className="inline-block overflow-hidden"><span className="word-wrap inline-block">Better Growth.</span></span><br />
            <span className="inline-block overflow-hidden"><span className="word-wrap inline-block text-sand-orange">Powered by AI.</span></span>
          </h1>

          <p className="text-sand-textSecondary text-lg max-w-lg leading-relaxed">
            sand AI is your growth partner for the AI era. We blend data, creativity, and automation to build marketing that scales.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button className="rounded-full bg-sand-orange px-8 py-4 text-base font-bold text-white shadow-lg shadow-sand-orange/20 hover:bg-[#E67A00] transition-colors flex items-center gap-2 group">
              Get Your Free Strategy
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="flex items-center gap-2 text-sand-textPrimary font-semibold hover:text-sand-purple transition-colors px-4 py-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sand-purple/10 text-sand-purple">▶</span>
              Watch Our Story
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative w-full h-[600px] flex justify-center items-center">
          <div ref={giraffeRef} className="relative z-10 w-full max-w-[600px] transform scale-125 lg:scale-[1.5] -translate-x-4 lg:-translate-x-24 mt-8">
            <img
              src="/giraffe.png"
              alt="sand AI Giraffe Mascot"
              className="object-contain w-full h-auto drop-shadow-2xl mix-blend-multiply"
            />
          </div>

          {/* Stat Cards Layer */}
          <div ref={cardsRef} className="absolute inset-0 z-20 pointer-events-none hidden md:block">
            {/* Hardcoded cards for exact visual replication based on spec */}

            {/* Top Right: AI Campaign Performance */}
            <div className="absolute top-[5%] -right-4 bg-sand-cardPurple/90 backdrop-blur-md rounded-2xl shadow-xl p-4 w-48 text-xs pointer-events-auto border border-sand-border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-sand-textPrimary">AI Campaign<br />Performance</span>
                <span className="bg-sand-purple/10 text-sand-purple px-2 py-0.5 rounded-full font-bold">↑ 45%</span>
              </div>
              <svg width="100%" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 25C10 25 15 15 25 15C35 15 40 20 50 20C60 20 65 5 75 5C85 5 90 10 100 10" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="25" cy="15" r="3" fill="#FF8A00" />
                <circle cx="50" cy="20" r="3" fill="#FF8A00" />
                <circle cx="75" cy="5" r="3" fill="#FF8A00" />
                <circle cx="100" cy="10" r="3" fill="#FF8A00" />
                <defs>
                  <linearGradient id="paint0_linear" x1="0" y1="15" x2="100" y2="15" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6461FF" />
                    <stop offset="1" stopColor="#FF8A00" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Mid Right: ROI */}
            <div className="absolute top-[35%] -right-12 bg-sand-cardPurple/90 backdrop-blur-md rounded-2xl shadow-xl p-4 flex items-center gap-4 w-[200px] pointer-events-auto border border-sand-border">
              <div className="relative w-12 h-12">
                <svg viewBox="0 0 36 36" className="w-12 h-12 transform -rotate-90">
                  <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path className="text-sand-orange" strokeDasharray="30, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path className="text-sand-purple" strokeDasharray="60, 100" strokeDashoffset="-30" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] text-sand-textSecondary font-semibold uppercase">ROI</div>
                <div className="text-lg font-bold text-sand-textPrimary leading-none">312%</div>
                <div className="text-[9px] text-sand-textSecondary mt-1">This Month</div>
              </div>
            </div>

            {/* Bottom Left: Leads Generated */}
            <div className="absolute bottom-[20%] -left-8 bg-sand-cardPurple/90 backdrop-blur-md rounded-2xl shadow-xl p-4 w-48 pointer-events-auto border border-sand-border flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-sand-textPrimary">Leads Generated</span>
                <span className="text-sand-orange font-bold">+68%</span>
              </div>
              <div className="text-2xl font-bold text-sand-textPrimary">2,458</div>
              <div className="flex items-end gap-1 h-6 mr-4 mt-1">
                {[40, 60, 45, 80, 50, 90, 75, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-sand-orange/40 to-sand-orange rounded-t-sm" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>

            {/* Bottom Right: 10X Better */}
            <div className="absolute bottom-[0%] right-8 bg-gradient-to-br from-sand-cardOrange to-sand-bg rounded-2xl shadow-xl p-4 flex gap-3 items-center w-[220px] pointer-events-auto border border-sand-border">
              <div className="text-3xl">⭐</div>
              <div>
                <div className="font-bold text-sand-textPrimary text-lg">10X</div>
                <div className="text-[10px] text-sand-textSecondary leading-tight">Better Conversions<br />Powered by AI</div>
              </div>
            </div>

            {/* Mid Left: AI Content Engine */}
            <div className="absolute top-[25%] -left-[140px] bg-sand-cardPurple/90 backdrop-blur-md rounded-2xl shadow-xl p-4 flex gap-4 pointer-events-auto border border-sand-border shadow-purple-500/10">
              <div className="bg-sand-purple rounded-xl p-3 flex flex-col items-center justify-center w-16 h-16 shadow-inner">
                <span className="text-white font-poppins font-bold text-2xl">AI</span>
              </div>
              <div className="flex flex-col gap-1.5 justify-center">
                <div className="text-[10px] font-semibold text-sand-textSecondary uppercase tracking-wider mb-1">AI Content Engine</div>
                {['Blog Posts', 'Ad Copy', 'Social Media', 'Email Campaigns'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-[10px] font-medium text-sand-textPrimary">
                    <span className="text-sand-orange bg-sand-orange/10 rounded-full w-3 h-3 flex items-center justify-center font-bold">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
