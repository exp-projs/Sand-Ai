'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const PILLARS = [
  {
    icon: '💡',
    title: 'AI Strategy & Consulting',
    description: 'Bespoke, data-driven frameworks engineered to unlock operational leverage and sustainable scale.',
    color: 'from-orange-500/20 to-amber-500/20 dark:from-orange-500/10 dark:to-amber-500/10',
    accentColor: 'bg-gradient-to-r from-orange-500 to-amber-400',
    glowColor: 'rgba(255, 138, 0, 0.18)',
  },
  {
    icon: '🤖',
    title: 'Autonomous Automation',
    description: 'Deploying custom digital workflows and agentic pipelines that reclaim time and accelerate execution.',
    color: 'from-purple-500/20 to-blue-500/20 dark:from-purple-500/10 dark:to-blue-500/10',
    accentColor: 'bg-gradient-to-r from-purple-500 to-blue-500',
    glowColor: 'rgba(100, 97, 255, 0.18)',
  },
  {
    icon: '📊',
    title: 'Intelligent Analytics',
    description: 'Synthesizing real-time operational streams into high-fidelity dashboards for precise decision-making.',
    color: 'from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10',
    accentColor: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    glowColor: 'rgba(16, 185, 129, 0.18)',
  },
  {
    icon: '🎨',
    title: 'Generative Creative AI',
    description: 'Architecting brand-aligned visual assets, high-impact copywriting, and cinematic media on demand.',
    color: 'from-rose-500/20 to-pink-500/20 dark:from-rose-500/10 dark:to-pink-500/10',
    accentColor: 'bg-gradient-to-r from-rose-500 to-pink-500',
    glowColor: 'rgba(244, 63, 94, 0.18)',
  },
]

export default function AIPillars() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track mouse coordinates over each card to update CSS custom variables for dynamic spotlight tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const items = el.querySelectorAll('.pillar-item')
    const separators = el.querySelectorAll('.pillar-separator')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    // Staggered reveal of pillars and separators
    tl.fromTo(
      items,
      { opacity: 0, y: 30, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      }
    )

    tl.fromTo(
      separators,
      { opacity: 0, scale: 0.6 },
      {
        opacity: 0.8,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      },
      '-=0.5'
    )
  }, [])

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-6 pt-8 pb-28 md:pb-40 relative z-10">
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-2">
        {PILLARS.map((pillar, idx) => (
          <div key={idx} className="flex flex-col lg:flex-row items-center w-full lg:w-auto flex-1">
            {/* Pillar Card */}
            <div 
              onMouseMove={(e) => handleMouseMove(e, idx)}
              className="pillar-item group relative w-full lg:w-auto flex-1 min-h-[220px] p-8 rounded-3xl bg-white/40 dark:bg-[#0e0c18]/50 backdrop-blur-xl border border-black/5 dark:border-white/5 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] select-none overflow-hidden"
              style={{
                '--glow-color': pillar.glowColor,
                '--mouse-x': '50%',
                '--mouse-y': '50%',
              } as React.CSSProperties}
            >
              {/* Colored Top Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] ${pillar.accentColor} opacity-70 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Dynamic Interactive Cursor Glow Layer */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                style={{
                  background: `radial-gradient(180px circle at var(--mouse-x) var(--mouse-y), ${pillar.glowColor}, transparent 80%)`,
                }}
              />

              {/* Dynamic Pillar Glow Border/Backdrop */}
              <div className={`absolute inset-px rounded-[23px] bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-5 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left h-full justify-between gap-4">
                {/* Icon wrapper with bounce & shadow animation */}
                <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-white/5 flex items-center justify-center text-3xl shadow-sm border border-black/5 dark:border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out group-hover:shadow-[0_0_20px_var(--glow-color)]">
                  {pillar.icon}
                </div>

                <div className="flex-grow flex flex-col justify-end">
                  <h4 className="font-poppins font-bold text-lg text-sand-textPrimary dark:text-white tracking-tight group-hover:text-sand-orange transition-colors duration-300">
                    {pillar.title}
                  </h4>
                  <p className="text-xs md:text-sm text-sand-textSecondary mt-2 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Separator Arrow */}
            {idx < PILLARS.length - 1 && (
              <div className="pillar-separator flex items-center justify-center my-3 lg:my-0 lg:mx-5 z-10">
                {/* Responsive Arrow: pointing right on large screens, pointing down on mobile */}
                <span className="text-xl lg:text-2xl font-light text-sand-purple/30 dark:text-white/15 select-none animate-pulse">
                  <span className="hidden lg:inline">→</span>
                  <span className="inline lg:hidden">↓</span>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
