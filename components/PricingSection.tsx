'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { PricingTier } from '@/types'

const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Basic',
    price: 299,
    period: '/mo',
    features: ['AI Chatbot', 'Social Media (2)', 'AI Marketing Feedback'],
    isPopular: false,
    ctaLabel: 'Choose Plan',
  },
  {
    name: 'Growth',
    price: 599,
    period: '/mo',
    features: [
      'Everything in Basic',
      'Social Media (4)',
      'AI Website',
      'AI Marketing Feedback (Priority)',
    ],
    isPopular: true,
    ctaLabel: 'Choose Plan',
  },
  {
    name: 'Pro',
    price: 999,
    period: '/mo',
    features: [
      'Everything in Growth',
      'Your Own App',
      'Priority Support',
      'Advanced Analytics',
    ],
    isPopular: false,
    ctaLabel: 'Choose Plan',
  },
]

export default function PricingSection() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        })
      }
    }, cardsRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PRICING_TIERS.map((tier, idx) => (
        <div
          key={tier.name}
          className={`relative bg-sand-cardPurple rounded-3xl p-8 flex flex-col h-full transition-transform duration-300 hover:-translate-y-2 ${
            tier.isPopular
              ? 'border-2 border-sand-orange shadow-xl shadow-sand-orange/10 transform md:scale-105 z-10'
              : 'border border-sand-border shadow-sm'
          }`}
        >
          {tier.isPopular && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sand-orange text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
          )}

          <div className="mb-6">
            <h4 className="font-poppins font-bold text-xl text-sand-textPrimary mb-1">{tier.name}</h4>
            <p className="text-sand-textSecondary text-xs">
              {idx === 0 ? 'Perfect for small businesses' : idx === 1 ? 'Ideal for growing businesses' : 'Advanced solutions for scale'}
            </p>
          </div>

          <div className="mb-8 flex items-baseline gap-1">
            <span className="font-poppins font-bold text-4xl text-sand-purple">${tier.price}</span>
            <span className="text-sand-textSecondary text-sm">{tier.period}</span>
          </div>

          <ul className="space-y-4 mb-8 flex-grow">
            {tier.features.map((feature, fIdx) => (
              <li key={fIdx} className="flex items-start gap-3 text-sm text-sand-textPrimary font-medium">
                <span className="text-sand-orange font-bold">✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <button
            className={`w-full rounded-full py-3.5 text-sm font-bold transition-colors mt-auto ${
              tier.isPopular
                ? 'bg-sand-orange text-white hover:bg-[#E67A00] shadow-md shadow-sand-orange/20'
                : 'bg-sand-purple/10 text-sand-purple hover:bg-sand-purple hover:text-white'
            }`}
          >
            {tier.ctaLabel}
          </button>
        </div>
      ))}
    </div>
  )
}
