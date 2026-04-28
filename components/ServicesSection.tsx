'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { Service } from '@/types'

const SERVICES = [
  {
    id: 's1',
    number: '01',
    icon: '/icons/icon-chatbot.jpg',
    title: 'AI Chatbot',
    description: 'Intelligent chatbots that engage, qualify, and convert 24/7 on WhatsApp.',
    features: ['24/7 WhatsApp Support', 'Order Taking AI', 'Multi-language Chat', 'Natural Conversations'],
    href: '/chatbot'
  },
  {
    id: 's2',
    number: '02',
    icon: '/icons/icon-social.jpg',
    title: 'Social Media',
    description: 'Auto-generated content, festival posts, and viral reels scripts.',
    features: ['Auto Festival Posts', 'Reels Scripts', 'Smart Scheduling', 'SEO Captions'],
    href: '/social-media'
  },
  {
    id: 's3',
    number: '03',
    icon: '/icons/icon-website.jpg',
    title: 'AI Website',
    description: 'Beautiful, high-converting websites built in minutes — for any business.',
    features: ['Local SEO Optimizer', 'Mobile-First Design', 'Online Booking', 'Product Catalogs'],
    href: '/website'
  },
  {
    id: 's4',
    number: '04',
    icon: '/icons/icon-app.jpg',
    title: 'Mailing & Loyalty',
    description: 'Automated retention engine with SMS/Email alerts and rewards.',
    features: ['Retention Marketing', 'SMS Direct Alerts', 'Loyalty Points', 'Review Collector'],
    href: '/mailing'
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
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

      // Cards horizontal slide-in from alternating sides
      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.children)
        cards.forEach((card, i) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            x: i % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-[#F9FBFF]">
      <div className="mx-auto max-w-7xl px-6">
        
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-sand-textSecondary uppercase">
            Our Services
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, idx) => (
            <Link 
              key={service.id}
              href={service.href}
              className={`group rounded-3xl p-8 shadow-sm border border-sand-border flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${idx % 2 !== 0 ? 'bg-sand-cardOrange' : 'bg-sand-cardPurple'}`}
            >
              <div className="mb-8 relative">
                <div className="absolute -top-2 -left-2 bg-sand-orange rounded-lg w-8 h-8 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  {service.number}
                </div>
                <div className="w-24 h-24 mx-auto relative rounded-2xl overflow-hidden shadow-md mt-4 group-hover:scale-110 transition-transform duration-500">
                  <Image 
                    src={service.icon} 
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </div>

              <h3 className="font-poppins font-bold text-2xl text-sand-textPrimary mb-4 text-center">
                {service.title}
              </h3>
              
              <p className="text-sand-textSecondary text-sm text-center mb-10 flex-grow leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-4 mt-auto">
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-sand-textSecondary">
                      <span className="text-sand-orange font-bold mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-6 border-t border-sand-border flex items-center justify-center gap-2 text-sand-purple font-bold text-sm">
                  Learn More <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
