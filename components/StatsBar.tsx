'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { FeatureCard } from '@/types'

const LOGOS = [
  { name: 'startupgrind', delay: 0.1 },
  { name: 'CloudFlex', delay: 0.2 },
  { name: 'NEXORA', delay: 0.3 },
  { name: 'arcana', delay: 0.4 },
  { name: 'visionly', delay: 0.5 },
]

const FEATURES: FeatureCard[] = [
  {
    icon: '💡', // Using emoji as placeholder since image paths weren't provided
    title: 'AI Strategy',
    description: 'Data-driven strategies tailored for real growth.',
    href: '#',
  },
  {
    icon: '🤖',
    title: 'Automation',
    description: 'Automate campaigns. Save time. Scale faster.',
    href: '#',
  },
  {
    icon: '📊',
    title: 'Analytics',
    description: 'Real-time insights. Smarter decisions.',
    href: '#',
  },
  {
    icon: '🎨',
    title: 'Creative AI',
    description: 'Stunning content, crafted by AI.',
    href: '#',
  },
]

export default function StatsBar() {
  const containerRef = useRef<HTMLElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logos fade in on scroll
      if (logosRef.current) {
        gsap.from(logosRef.current.children, {
          scrollTrigger: {
            trigger: logosRef.current,
            start: 'top 85%',
          },
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
        })
      }

      // Feature cards stagger up
      if (featuresRef.current) {
        gsap.from(featuresRef.current.children, {
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="stats-bar" ref={containerRef} className="pt-48 pb-16 bg-sand-bg">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Trusted By Logos */}
        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-sand-border pb-16">
          <p className="text-sm font-medium text-sand-textSecondary whitespace-nowrap min-w-max">
            Trusted by<br className="hidden md:block"/>innovative brands
          </p>
          <div ref={logosRef} className="flex flex-wrap items-center justify-between w-full opacity-60 grayscale gap-6">
            {LOGOS.map((logo) => (
              <div key={logo.name} className="font-poppins font-bold text-xl md:text-2xl text-sand-textPrimary tracking-tight">
                {logo.name}
              </div>
            ))}
          </div>
        </div>

        {/* Feature Strip */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-16">
          {FEATURES.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-sand-cardPurple rounded-2xl border border-sand-border p-6 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sand-purple/10 to-sand-orange/10 flex items-center justify-center text-3xl mb-2 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-poppins font-semibold text-lg text-sand-textPrimary">{feature.title}</h3>
              <p className="text-sand-textSecondary text-sm leading-relaxed flex-grow">
                {feature.description}
              </p>
              <a 
                href={feature.href}
                className="w-8 h-8 rounded-full border border-sand-border flex items-center justify-center text-sand-textSecondary group-hover:bg-sand-purple group-hover:text-white group-hover:border-sand-purple transition-colors mt-2"
                aria-label={`Learn more about ${feature.title}`}
              >
                →
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
