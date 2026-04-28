'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@/lib/gsap'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface ProductHeroProps {
  badge: string
  title: string
  highlightedTitle?: string
  description: string
  ctaText: string
  imageSrc: string
  colorVariant?: 'purple' | 'orange'
}

export default function ProductHero({
  badge,
  title,
  highlightedTitle,
  description,
  ctaText,
  imageSrc,
  colorVariant = 'purple'
}: ProductHeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  
  return (
    <section ref={containerRef} className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${colorVariant === 'purple' ? 'from-sand-cardPurple' : 'from-sand-cardOrange'} to-sand-bg -z-10`} />
      
      {/* Animated Shapes */}
      <div className="absolute top-20 right-[-10%] w-[400px] h-[400px] bg-sand-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-[-10%] w-[300px] h-[300px] bg-sand-orange/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start gap-8 z-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`flex items-center gap-2 border border-sand-border rounded-full px-4 py-1.5 text-xs font-semibold ${colorVariant === 'purple' ? 'text-sand-purple' : 'text-sand-orange'} uppercase tracking-wider bg-sand-bg/50 backdrop-blur-sm`}
          >
            <span className="w-2 h-2 rounded-full animate-pulse bg-current"></span>
            {badge}
          </motion.div>

          <h1 className="font-poppins text-5xl md:text-6xl lg:text-7xl font-black text-sand-textPrimary tracking-tight leading-[1.1]">
            {title} <br />
            {highlightedTitle && (
              <span className={colorVariant === 'purple' ? 'text-sand-purple' : 'text-sand-orange'}>
                {highlightedTitle}
              </span>
            )}
          </h1>

          <p className="text-sand-textSecondary text-lg md:text-xl max-w-[500px] leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className={`w-full sm:w-auto rounded-full ${colorVariant === 'purple' ? 'bg-sand-purple' : 'bg-sand-orange'} px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group`}>
              {ctaText}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button className="flex items-center gap-2 text-sand-textPrimary font-semibold hover:opacity-70 transition-opacity px-4 py-4">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right Column: Hero Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="relative aspect-square w-full max-w-[600px] mx-auto lg:ml-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-sand-purple/10 to-transparent rounded-full blur-2xl animate-pulse" />
          <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-sand-cardPurple/10 backdrop-blur-sm p-4">
             <div className="w-full h-full relative rounded-2xl overflow-hidden bg-sand-cardPurple">
                <Image 
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                />
             </div>
          </div>
          
          {/* Floating Elements (Micro-animations with Framer Motion) */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 bg-sand-cardPurple rounded-2xl shadow-xl p-4 border border-sand-border hidden md:block"
          >
             <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${colorVariant === 'purple' ? 'bg-sand-purple/10 text-sand-purple' : 'bg-sand-orange/10 text-sand-orange'}`}>
                  ✦
                </div>
                <div>
                   <div className="text-[10px] text-sand-textSecondary font-bold uppercase">AI Status</div>
                   <div className="text-sm font-black text-sand-textPrimary">Optimized</div>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
