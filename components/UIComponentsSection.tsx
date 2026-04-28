'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

export default function UIComponentsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-sand-bg border-t border-sand-border">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-sand-textSecondary uppercase">
            UI Components
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          
          {/* Buttons */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold text-sand-textSecondary uppercase mb-2">Buttons</h4>
            <button className="rounded-full bg-sand-orange px-6 py-3 text-sm font-bold text-white shadow-md shadow-sand-orange/20 w-fit">
              Primary Button
            </button>
            <button className="rounded-full border-2 border-sand-purple text-sand-purple px-6 py-3 text-sm font-bold w-fit bg-transparent hover:bg-sand-purple/5">
              Secondary Button
            </button>
            <button className="flex items-center gap-2 text-sand-textPrimary text-sm font-bold w-fit hover:text-sand-purple transition-colors mt-2">
              Text Button <span>→</span>
            </button>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold text-sand-textSecondary uppercase mb-2">Cards</h4>
            <div className="bg-sand-cardPurple rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none p-4 border border-sand-border flex items-center gap-4 w-full max-w-[200px]">
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
          </div>

          {/* Form Elements */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold text-sand-textSecondary uppercase mb-2">Form Elements</h4>
            <div className="flex flex-col gap-3 w-full">
              <div>
                <label className="text-xs font-medium text-sand-textSecondary ml-1">Your Name</label>
                <input type="text" placeholder="John Doe" className="w-full mt-1 px-4 py-2 bg-sand-bg border border-sand-border rounded-lg text-sm focus:outline-none focus:border-sand-purple focus:ring-1 focus:ring-sand-purple" />
              </div>
              <div>
                <label className="text-xs font-medium text-sand-textSecondary ml-1">Email</label>
                <input type="email" placeholder="john@business.com" className="w-full mt-1 px-4 py-2 bg-sand-bg border border-sand-border rounded-lg text-sm focus:outline-none focus:border-sand-purple focus:ring-1 focus:ring-sand-purple" />
              </div>
              <div>
                <label className="text-xs font-medium text-sand-textSecondary ml-1">Business Type</label>
                <select className="w-full mt-1 px-4 py-2 bg-sand-bg border border-sand-border rounded-lg text-sm text-sand-textPrimary focus:outline-none focus:border-sand-purple focus:ring-1 focus:ring-sand-purple appearance-none">
                  <option>E-commerce</option>
                  <option>SaaS</option>
                  <option>Agency</option>
                </select>
              </div>
              <button className="w-full rounded-full bg-sand-orange py-2.5 text-sm font-bold text-white shadow-md shadow-sand-orange/20 hover:bg-[#E67A00] transition-colors flex items-center justify-center gap-2 mt-2">
                Submit <span>→</span>
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col gap-4 items-start">
            <h4 className="text-xs font-bold text-sand-textSecondary uppercase mb-2">Badges</h4>
            <div className="bg-sand-orange text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
              Most Popular
            </div>
            <div className="bg-sand-purple/10 text-sand-purple text-xs font-bold px-3 py-1.5 rounded-full border border-sand-purple/20 flex items-center gap-1.5">
              <span>✦</span> New
            </div>
            <div className="bg-sand-cardPurple border border-sand-border text-sand-textSecondary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              AI Powered
            </div>
          </div>

          {/* Icons */}
          <div className="flex flex-col gap-4">
             <h4 className="text-xs font-bold text-sand-textSecondary uppercase mb-2">Icons</h4>
             <div className="grid grid-cols-2 gap-4">
                <div className="w-10 h-10 rounded-xl bg-sand-cardOrange border border-sand-border shadow-sm flex items-center justify-center text-xl text-sand-purple">😃</div>
                <div className="w-10 h-10 rounded-xl bg-sand-cardOrange border border-sand-border shadow-sm flex items-center justify-center text-xl text-sand-purple">📊</div>
                <div className="w-10 h-10 rounded-xl bg-sand-cardOrange border border-sand-border shadow-sm flex items-center justify-center text-xl text-sand-purple">📅</div>
                <div className="w-10 h-10 rounded-xl bg-sand-cardOrange border border-sand-border shadow-sm flex items-center justify-center text-xl text-sand-purple">🔒</div>
                <div className="w-10 h-10 rounded-xl bg-sand-cardOrange border border-sand-border shadow-sm flex items-center justify-center text-xl text-sand-purple">🤖</div>
                <div className="w-10 h-10 rounded-xl bg-sand-cardOrange border border-sand-border shadow-sm flex items-center justify-center text-xl text-sand-purple">💬</div>
             </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
             <h4 className="text-xs font-bold text-sand-textSecondary uppercase mb-2">Navigation</h4>
             <div className="bg-sand-cardPurple rounded-2xl shadow-lg dark:shadow-none border border-sand-border p-6 flex flex-col gap-4 w-full">
                <div className="flex gap-4 text-xs font-medium text-sand-textSecondary">
                  <span className="text-sand-textPrimary font-semibold">Home</span>
                  <span>Services</span>
                  <span>Pricing</span>
                </div>
                <div className="w-full h-px bg-sand-border"></div>
                <button className="w-full rounded-full bg-sand-orange py-2.5 text-sm font-bold text-white shadow-md shadow-sand-orange/20 flex justify-center items-center gap-2">
                   📞 Book a Call
                </button>
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}
