'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { Service } from '@/types'

const SERVICES: Service[] = [
  {
    id: 's1',
    number: '01',
    icon: '/icons/icon-chatbot.jpg',
    title: 'AI Chatbot',
    description: 'Intelligent chatbots that engage, qualify, and convert 24/7.',
    features: ['24/7 Customer Support', 'Lead Generation', 'Smart Conversations', 'Seamless Integrations'],
  },
  {
    id: 's2',
    number: '02',
    icon: '/icons/icon-social.jpg',
    title: 'Social Media',
    description: 'AI-powered content, scheduling, and engagement strategies.',
    features: ['Content Creation', 'AI Captions & Hashtags', 'Smart Scheduling', 'Performance Tracking'],
  },
  {
    id: 's3',
    number: '03',
    icon: '/icons/icon-website.jpg',
    title: 'AI Website',
    description: 'Beautiful, high-converting websites built with AI — designed to impress.',
    features: ['AI Website Builder', 'SEO Optimized', 'Responsive Design', 'Conversion Focused'],
  },
  {
    id: 's4',
    number: '04',
    icon: '/icons/icon-app.jpg',
    title: 'Your Own App',
    description: 'We build custom AI-powered apps tailored to your business goals.',
    features: ['Custom App Development', 'AI Integrations', 'Scalable & Secure', 'iOS & Android Ready'],
  },
  {
    id: 's5',
    number: '05',
    icon: '/icons/icon-feedback.jpg',
    title: 'AI Marketing Feedback',
    description: 'AI-driven insights and feedback that help you optimize, improve, and grow faster.',
    features: ['Customer Feedback AI', 'Campaign Insights', 'Sentiment Analysis', 'Actionable Reports'],
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

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {SERVICES.map((service, idx) => (
            <div 
              key={service.id}
              className={`rounded-3xl p-6 shadow-sm border border-sand-border flex flex-col h-full hover:shadow-xl transition-shadow duration-300 ${idx % 2 !== 0 ? 'bg-sand-cardOrange' : 'bg-sand-cardPurple'}`}
            >
              <div className="mb-6 relative">
                <div className="absolute -top-2 -left-2 bg-sand-orange rounded-lg w-8 h-8 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  {service.number}
                </div>
                <div className="w-24 h-24 mx-auto relative rounded-2xl overflow-hidden shadow-md mt-4 group-hover:scale-105 transition-transform duration-300">
                  <Image 
                    src={service.icon} 
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </div>

              <h3 className="font-poppins font-bold text-xl text-sand-textPrimary mb-3 text-center">
                {service.title}
              </h3>
              
              <p className="text-sand-textSecondary text-sm text-center mb-8 flex-grow">
                {service.description}
              </p>

              <ul className="space-y-3 mt-auto">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-sand-textSecondary">
                    <span className="text-sand-orange font-bold mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
