'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import PricingSection from './PricingSection'

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      if (stepsContainerRef.current) {
        gsap.from(stepsContainerRef.current.children, {
          scrollTrigger: {
            trigger: stepsContainerRef.current,
            start: 'top 75%',
          },
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-sand-bg relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-sand-textSecondary uppercase">
            Our Process
          </h2>
        </div>

        <div ref={stepsContainerRef} className="flex flex-col lg:flex-row gap-8 xl:gap-12 relative w-full items-start">
          
          {/* Connecting Arrow Lines under relative container */}
          <svg className="absolute top-1/4 left-[15%] w-[70%] h-32 hidden lg:block -z-10 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 100">
            <path
              d="M0,50 Q250,5 500,50 T1000,50"
              fill="none"
              stroke="#FF8A00"
              strokeWidth="2"
              strokeDasharray="8 8"
              opacity="0.3"
            />
          </svg>

          {/* Step 01 */}
          <div className="flex-1 w-full lg:w-1/4 bg-sand-cardOrange rounded-3xl p-8 border border-sand-border relative group">
            <div className="absolute -top-4 -left-4 bg-sand-orange rounded-xl w-10 h-10 flex items-center justify-center text-white text-sm font-bold shadow-sm shadow-sand-orange/20 transition-transform group-hover:scale-110">
              01
            </div>
            <div className="text-4xl mb-6">📝</div>
            <h3 className="font-poppins font-bold text-xl text-sand-textPrimary mb-3">You Fill the Form</h3>
            <p className="text-sand-textSecondary text-sm mb-6">
              Intelligent chatbots that and goals. It takes less than 2 minutes!
            </p>
            <ul className="space-y-3">
              {['Business Details', 'Your Goals', 'Current Challenges', 'Contact Information'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-sand-textPrimary font-medium">
                  <span className="text-sand-orange font-bold text-xs">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Step 02 - Pricing Container */}
          <div className="flex-[2.5] w-full lg:w-2/4 bg-sand-cardPurple rounded-3xl relative">
            <div className="hidden lg:flex absolute -left-12 top-1/4 text-sand-purple/30 text-4xl transform -translate-y-1/2">
              →
            </div>
            
            <div className="mb-8 pl-4 lg:pl-0">
               <div className="inline-block mb-3 bg-sand-orange rounded-xl w-10 h-10 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                02
              </div>
              <h3 className="font-poppins font-bold text-2xl text-sand-textPrimary mb-2">We Show You the Best Package</h3>
              <p className="text-sand-textSecondary text-sm max-w-sm">We analyze your needs and recommend the perfect package tailored for you.</p>
            </div>
            
            <PricingSection />
            
            <div className="hidden lg:flex absolute -right-8 top-1/4 text-sand-purple/30 text-4xl transform -translate-y-1/2">
              →
            </div>
          </div>

          {/* Step 03 */}
          <div className="flex-1 w-full lg:w-1/4 bg-sand-cardOrange rounded-3xl p-8 border border-sand-border flex flex-col items-center text-center relative group h-full">
            <div className="absolute -top-4 -left-4 bg-sand-orange rounded-xl w-10 h-10 flex items-center justify-center text-white text-sm font-bold shadow-sm shadow-sand-orange/20 transition-transform group-hover:scale-110">
              03
            </div>
            <h3 className="font-poppins font-bold text-xl text-sand-textPrimary mb-3 pt-6">Pay & We Deliver on Time</h3>
            <p className="text-sand-textSecondary text-sm mb-8">
              Secure payment, clear timelines, and stress-free delivery. We value your time!
            </p>
            
            <div className="flex flex-col items-center gap-6 w-full mb-8">
              <div className="flex flex-col items-center text-center w-full">
                <div className="w-12 h-12 bg-sand-bg rounded-full shadow-sm flex items-center justify-center text-2xl text-sand-purple mb-2">🔒</div>
                <div className="text-xs font-bold text-sand-textPrimary">Secure Payment</div>
                <div className="text-[10px] text-sand-textSecondary mt-0.5">Safe & encrypted<br/>transactions</div>
              </div>
              <div className="text-sand-orange font-bold">↓</div>
              <div className="flex flex-col items-center text-center w-full">
                <div className="w-12 h-12 bg-sand-bg rounded-full shadow-sm flex items-center justify-center text-2xl text-sand-purple mb-2">📅</div>
                <div className="text-xs font-bold text-sand-textPrimary">Estimated TAT</div>
                <div className="text-[10px] text-sand-textSecondary mt-0.5">We share delivery<br/>timeline upfront</div>
              </div>
              <div className="text-sand-orange font-bold">↓</div>
              <div className="flex flex-col items-center text-center w-full">
                <div className="w-12 h-12 bg-sand-bg rounded-full shadow-sm flex items-center justify-center text-2xl text-sand-orange mb-2">🚀</div>
                <div className="text-xs font-bold text-sand-textPrimary">We Deliver</div>
                <div className="text-[10px] text-sand-textSecondary mt-0.5">High-quality service<br/>delivered on time</div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/10 flex items-center justify-center gap-2 text-xs font-medium text-sand-textPrimary w-full">
              <span className="text-sand-purple text-base">⏱️</span> Typical Delivery Time <span className="text-sand-purple font-bold mx-1">·</span> <span className="text-sand-purple font-bold">3 to 10 Business Days</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
