'use client'

import { useRef, useState } from 'react'
import { Plus, Minus, ArrowUpRight } from 'lucide-react'
import { gsap } from '@/lib/gsap'

interface PatternItem {
  id: string
  symptom: string
  leak: string
  solution: string
  link: string
}

const PATTERNS: PatternItem[] = [
  {
    id: 'traffic-demos',
    symptom: 'Traffic rises, conversions don’t.',
    leak: 'Visitors arrive but fail to take action. The landing pages explain the product features but fail to create conviction for their specific pain points.',
    solution: 'Restructure landing pages to lead with high-intent pain points, simplify the conversion path, and verify that analytics are tracking all touchpoints.',
    link: '/notes/why-switching-channels-doesnt-work',
  },
  {
    id: 'paid-scaling',
    symptom: 'Paid campaigns work small, break large.',
    leak: 'As ad budget increases, lead quality drops. The ad platforms are optimizing for cheap clicks rather than high-intent buying signals.',
    solution: 'Implement Conversion API (CAPI) feedback loops to feed down-funnel CRM sales data back into ad platform algorithms.',
    link: '/notes/optimization-score-is-googles-strategy',
  },
  {
    id: 'content-pipeline',
    symptom: 'More content, same pipeline.',
    leak: 'SEO traffic is growing, but it does not convert to pipeline. You are ranking for high-volume informational keywords rather than high-intent buyer searches.',
    solution: 'Shift content strategy to comparison and decision-stage keywords. Align articles with specific revenue-generating services.',
    link: '/notes/why-search-visibility-doesnt-create-demand',
  },
  {
    id: 'referral-dependency',
    symptom: 'Referrals convert. Cold traffic doesn’t.',
    leak: 'The website lacks the trust context that a warm referral carries. Cold visitors feel a trust gap and leave.',
    solution: 'Rebuild website social proof. Add in-depth, transparent case studies and concrete proof of results instead of generic testimonials.',
    link: '/notes/why-b2b-website-redesigns-fail',
  },
  {
    id: 'sales-marketing',
    symptom: 'Sales and marketing are misaligned.',
    leak: 'Marketing delivers leads, but sales says they are unqualified. The definition of a "lead" is based on clicks/downloads rather than buying intent.',
    solution: 'Establish a single revenue dashboard. Optimize campaigns for Qualified Pipeline (SQLs) rather than volume of form submissions.',
    link: '/notes/why-b2b-website-redesigns-fail',
  },
]

export default function GrowthPatterns() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const accordionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const toggleAccordion = (id: string) => {
    const isOpening = activeId !== id
    const currentActive = activeId

    // Animate closing of the current open item
    if (currentActive && accordionRefs.current[currentActive]) {
      gsap.to(accordionRefs.current[currentActive], {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    // Animate opening of the new item
    if (isOpening && accordionRefs.current[id]) {
      setActiveId(id)
      gsap.fromTo(
        accordionRefs.current[id],
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        }
      )
    } else {
      setActiveId(null)
    }
  }

  return (
    <section id="patterns" className="py-24 bg-sand-bg border-t border-sand-border relative overflow-hidden z-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Concept Intro */}
          <div className="lg:col-span-4 flex flex-col justify-start gap-4">
            <span className="text-xs font-semibold text-sand-orange tracking-widest uppercase">
              Sound Familiar?
            </span>
            <h2 className="font-poppins text-3xl md:text-4xl font-bold tracking-tight text-sand-textPrimary leading-tight">
              Patterns we see <br />
              repeatedly.
            </h2>
            <p className="text-sand-textSecondary text-sm md:text-base font-light leading-relaxed max-w-[320px]">
              Different companies, similar symptoms. Most marketing problems don't happen everywhere at once. They're usually caused by one weak point in the customer journey.
            </p>
            <div className="mt-4">
              <a
                href="/diagnostic"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sand-purple hover:text-sand-deep-purple transition-colors uppercase tracking-wider group"
              >
                Find your leak
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-sand-border">
            {PATTERNS.map((item) => {
              const isOpen = activeId === item.id
              return (
                <div key={item.id} className="py-5 first:pt-0 last:pb-0">
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="flex w-full items-center justify-between text-left group focus:outline-none"
                  >
                    <span className="font-poppins font-semibold text-lg md:text-xl text-sand-textPrimary group-hover:text-sand-purple transition-colors pr-4">
                      {item.symptom}
                    </span>
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-sand-purple/10 text-sand-purple group-hover:bg-sand-purple/20 transition-all">
                      {isOpen ? (
                        <Minus className="w-4 h-4 transition-transform duration-300 rotate-180" />
                      ) : (
                        <Plus className="w-4 h-4 transition-transform duration-300" />
                      )}
                    </span>
                  </button>

                  <div
                    ref={(el) => {
                      accordionRefs.current[item.id] = el
                    }}
                    className="overflow-hidden"
                    style={{ height: 0, opacity: 0 }}
                  >
                    <div className="pt-4 pb-2 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-sand-textSecondary">
                      <div className="space-y-1.5 border-l-2 border-sand-orange pl-4">
                        <span className="text-[10px] uppercase font-bold text-sand-orange tracking-wider">
                          The Leak
                        </span>
                        <p className="leading-relaxed font-light">{item.leak}</p>
                      </div>
                      <div className="space-y-1.5 border-l-2 border-sand-purple pl-4">
                        <span className="text-[10px] uppercase font-bold text-sand-purple tracking-wider">
                          The Resolution
                        </span>
                        <p className="leading-relaxed font-light">{item.solution}</p>
                        <div className="pt-2">
                          <a
                            href={item.link}
                            className="inline-flex items-center gap-1 text-xs text-sand-purple hover:underline"
                          >
                            Read notes
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
