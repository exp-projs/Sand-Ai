'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Zap, Target, TrendingUp } from 'lucide-react'

export default function CorePhilosophy() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const sections = gsap.utils.toArray('.philosophy-panel')

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1, // smooth scrubbing
        snap: 1 / (sections.length - 1),
        end: () => '+=' + wrapperRef.current?.offsetWidth,
      }
    })
  }, { scope: sectionRef })

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-sand-bg text-sand-textPrimary border-y border-sand-border/40"
    >
      <div className="absolute top-12 left-12 md:left-24 z-10">
        <h2 className="text-sm md:text-base font-inter tracking-[0.3em] uppercase text-sand-textSecondary font-semibold">
          Core Philosophy
        </h2>
      </div>

      <div 
        ref={wrapperRef} 
        className="flex w-[300vw] h-full"
      >
        {/* Panel 1 */}
        <div className="philosophy-panel w-screen h-full flex items-center justify-center relative px-6">
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-sand-orange/10 flex items-center justify-center text-sand-orange mb-8">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-5xl md:text-7xl font-poppins font-bold text-sand-textPrimary leading-tight">
                Unmatched <span className="text-sand-orange">Speed.</span>
              </h3>
              <p className="text-lg md:text-xl text-sand-textSecondary max-w-lg leading-relaxed font-inter">
                In the digital age, hesitation is the enemy of growth. We deploy custom architectures in days, not months—ensuring your campaigns hit the market faster than the competition.
              </p>
            </div>
            <div className="hidden md:flex justify-end relative">
              <div className="w-72 h-96 rounded-3xl bg-sand-cardOrange border border-sand-orange/20 shadow-[0_0_60px_-15px_rgba(255,138,0,0.3)] relative overflow-hidden backdrop-blur-sm flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-tr from-sand-orange/10 to-transparent"></div>
                 <Zap className="w-32 h-32 text-sand-orange/30 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="philosophy-panel w-screen h-full flex items-center justify-center relative px-6">
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-sand-purple/10 flex items-center justify-center text-sand-purple mb-8">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-5xl md:text-7xl font-poppins font-bold text-sand-textPrimary leading-tight">
                Precision <span className="text-sand-purple">AI.</span>
              </h3>
              <p className="text-lg md:text-xl text-sand-textSecondary max-w-lg leading-relaxed font-inter">
                We don't guess. We utilize deeply integrated machine learning models to analyze consumer behavior, optimizing ad spend down to the micro-cent for unparalleled ROAS.
              </p>
            </div>
            <div className="hidden md:flex justify-end relative">
              <div className="w-72 h-96 rounded-3xl bg-sand-cardPurple border border-sand-purple/20 shadow-[0_0_60px_-15px_rgba(100,97,255,0.3)] relative overflow-hidden backdrop-blur-sm flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-tr from-sand-purple/10 to-transparent"></div>
                 <Target className="w-32 h-32 text-sand-purple/30 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Panel 3 */}
        <div className="philosophy-panel w-screen h-full flex items-center justify-center relative px-6">
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sand-purple/20 to-sand-orange/20 flex items-center justify-center mb-8">
                <TrendingUp className="w-8 h-8 text-sand-textPrimary" />
              </div>
              <h3 className="text-5xl md:text-7xl font-poppins font-bold text-sand-textPrimary leading-tight">
                Growth <br/><span className="bg-gradient-to-r from-sand-purple to-sand-orange text-transparent bg-clip-text">Focused.</span>
              </h3>
              <p className="text-lg md:text-xl text-sand-textSecondary max-w-lg leading-relaxed font-inter">
                Beautiful dashboards mean nothing without results. Every system we build is designed with one singular objective: to scale your business predictably and profitably.
              </p>
            </div>
            <div className="hidden md:flex justify-end relative">
              <div className="w-72 h-96 rounded-3xl bg-white dark:bg-black border border-sand-border shadow-[0_0_60px_-15px_rgba(100,97,255,0.15)] relative overflow-hidden backdrop-blur-sm flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-tr from-sand-purple/10 via-transparent to-sand-orange/10"></div>
                 <TrendingUp className="w-32 h-32 text-sand-textPrimary/20 animate-bounce" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
