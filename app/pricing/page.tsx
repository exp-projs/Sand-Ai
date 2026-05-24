'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import BokehBackdrop from '@/components/BokehBackdrop'
import BackgroundSpotlight from '@/components/BackgroundSpotlight'
import { Check, HelpCircle } from 'lucide-react'
import Link from 'next/link'

const PRICING_TIERS = [
  {
    name: 'Basic Suite',
    monthlyPrice: 299,
    yearlyPrice: 239, // ~20% discount
    description: 'Essential AI capabilities for local brands and medical clinics looking to establish automated customer touchpoints.',
    features: [
      'Conversational AI Core (24/7 WhatsApp Agent)',
      'Basic Web Presence layout setup',
      'Standard lead routing notifications',
      'Automated performance digest reports',
      'Next.js secure hosting platform setup',
      'Standard customer ticket email support',
    ],
    isPopular: false,
    color: 'from-blue-500/20 to-indigo-500/20 dark:from-blue-500/10 dark:to-indigo-500/10',
    accentColor: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    ctaLabel: 'Get Started Today',
    href: '/signup?plan=basic',
  },
  {
    name: 'Growth Enterprise',
    monthlyPrice: 599,
    yearlyPrice: 479,
    description: 'Our flagship suite. Complete automation and high-speed web presence engineered to scale customer acquisition.',
    features: [
      'Everything in Basic Suite',
      'Web Development Suite (Premium custom SEO site)',
      'Meta Ads Campaign setup & routing',
      'Priority lead synchronization webhooks',
      'Interactive real-time lead alert dashboard',
      'Advanced transactional alerts configuration',
      'Dedicated technical strategy consultant',
    ],
    isPopular: true,
    color: 'from-purple-500/20 to-pink-500/20 dark:from-purple-500/10 dark:to-pink-500/10',
    accentColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.18)',
    ctaLabel: 'Deploy Growth Plan',
    href: '/signup?plan=growth',
  },
  {
    name: 'Scale Blueprint',
    monthlyPrice: 999,
    yearlyPrice: 799,
    description: 'Fully tailored, custom-engineered intelligence stack for high-volume multi-location businesses.',
    features: [
      'Everything in Growth Enterprise',
      'App Dev Suite (Tailored iOS & Android native apps)',
      'Custom database schema & system architecture integrations',
      'High-performance Meta Ads optimization engines',
      'Dedicated Slack operational hotline support',
      'Weekly strategy and metrics analysis reviews',
    ],
    isPopular: false,
    color: 'from-orange-500/20 to-amber-500/20 dark:from-orange-500/10 dark:to-amber-500/10',
    accentColor: 'bg-gradient-to-r from-orange-500 to-amber-500',
    glowColor: 'rgba(249, 115, 22, 0.15)',
    ctaLabel: 'Contact Scale Advisory',
    href: '/signup?plan=pro',
  },
]

const FAQS = [
  {
    question: 'How does the WhatsApp API setup work?',
    answer: 'We deploy the Conversational Core chatbot using the official Meta Cloud API. If you have an existing phone number, we will assist you in verifying it. The setup is fully secure and handled by our technical onboarding team during your first week.',
  },
  {
    question: 'Are there any hidden hosting or setup fees?',
    answer: 'None. All Next.js website hosting, SSL certificates, and baseline serverless function calls are included in your subscription. Custom domain registration is billed separately if you do not already own a domain.',
  },
  {
    question: 'Can I change my subscription or cancel anytime?',
    answer: 'Yes, you can upgrade, downgrade, or cancel your plan at any time through your customer billing dashboard. If you cancel, your access will remain active until the end of your current billing period.',
  },
  {
    question: 'What kind of support is included?',
    answer: 'Basic plans receive email support with a 24-hour SLA. Growth plans include a dedicated consultant with priority routing. Scale plans include a dedicated Slack workspace with direct developer support.',
  },
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const containerRef = useRef<HTMLDivElement>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

    const cards = el.querySelectorAll('.pricing-card')
    const faqItems = el.querySelectorAll('.faq-item')

    // Stagger reveal of cards
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out',
      }
    )

    // Stagger reveal of FAQs
    gsap.fromTo(
      faqItems,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.faq-section',
          start: 'top 85%',
        },
      }
    )
  }, [])

  return (
    <main ref={containerRef} className="flex flex-col bg-sand-bg relative overflow-hidden min-h-screen pt-32 pb-24">
      {/* Background Layers */}
      <BokehBackdrop />
      <BackgroundSpotlight />

      {/* Atmospheric Ambient Glow Blobs */}
      <div className="ambient-blob blob-orange w-[500px] h-[500px] top-[10%] left-[-150px]" />
      <div className="ambient-blob blob-purple w-[600px] h-[600px] top-[40%] right-[-200px]" />
      <div className="ambient-blob blob-orange w-[550px] h-[550px] bottom-[10%] left-[-100px]" />

      {/* Floating Outline Words */}
      <div className="parallax-bg-word outline-text text-[14vw] top-[15%] opacity-100 select-none z-0">PRICING</div>
      <div className="parallax-bg-word outline-text text-[14vw] top-[50%] opacity-100 select-none z-0">VALUE</div>
      <div className="parallax-bg-word outline-text text-[14vw] top-[80%] opacity-100 select-none z-0">GROWTH</div>

      {/* Page Header */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-16">
        <span className="text-[10px] font-bold tracking-[0.25em] text-sand-orange uppercase select-none">
          INVESTMENT PLANS
        </span>
        <h1 className="font-poppins font-bold text-4xl md:text-6xl text-sand-textPrimary dark:text-white mt-4 tracking-tight leading-none max-w-3xl mx-auto">
          Transparent pricing. Engineered for scale.
        </h1>
        <p className="text-sm md:text-base text-sand-textSecondary max-w-xl mx-auto mt-6 leading-relaxed">
          Select the optimal plan to deploy autonomous conversational nodes, custom SEO architecture, and automated lead generation frameworks.
        </p>

        {/* Monthly / Yearly Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <span className={`text-xs md:text-sm font-medium transition-colors duration-300 ${billingPeriod === 'monthly' ? 'text-sand-orange' : 'text-sand-textSecondary'}`}>
            Monthly Billing
          </span>
          <button 
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className="w-16 h-8 rounded-full bg-sand-cardPurple dark:bg-white/5 border border-sand-border dark:border-white/10 relative p-1 transition-all duration-300 focus:outline-none"
            aria-label="Toggle billing interval"
          >
            <div className={`w-6 h-6 rounded-full bg-sand-orange transition-transform duration-300 ${billingPeriod === 'yearly' ? 'translate-x-8' : 'translate-x-0'}`} />
          </button>
          <span className={`text-xs md:text-sm font-medium transition-colors duration-300 flex items-center gap-1.5 ${billingPeriod === 'yearly' ? 'text-sand-orange' : 'text-sand-textSecondary'}`}>
            Yearly Billing
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-sand-orange/15 text-sand-orange border border-sand-orange/20 select-none uppercase">
              Save 20%
            </span>
          </span>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 w-full mb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_TIERS.map((tier, idx) => {
            const currentPrice = billingPeriod === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice

            return (
              <div 
                key={idx}
                onMouseMove={handleMouseMove}
                className={`pricing-card group relative rounded-[32px] p-8 md:p-10 flex flex-col justify-between transition-all duration-700 ease-out select-none overflow-hidden ${
                  tier.isPopular 
                    ? 'bg-white/60 dark:bg-[#120f22]/60 shadow-[0_30px_60px_rgba(255,138,0,0.06)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-2 border-sand-orange scale-100 md:scale-[1.03] z-10' 
                    : 'bg-white/40 dark:bg-[#0e0c18]/50 shadow-sm border border-black/5 dark:border-white/5 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
                }`}
                style={{
                  '--glow-color': tier.glowColor,
                  '--mouse-x': '50%',
                  '--mouse-y': '50%',
                } as React.CSSProperties}
              >
                {/* Popular Badge */}
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sand-orange text-white text-[9px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    Recommended
                  </div>
                )}

                {/* Accent line */}
                <div className={`absolute top-0 left-0 right-0 h-[4px] ${tier.accentColor}`} />

                {/* Dynamic Cursor Spotlight Overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background: `radial-gradient(220px circle at var(--mouse-x) var(--mouse-y), ${tier.glowColor}, transparent 80%)`,
                  }}
                />

                {/* Dynamic Card Glow Border/Backdrop */}
                <div className={`absolute inset-px rounded-[30px] bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                  {/* Top Content */}
                  <div>
                    <h4 className="font-poppins font-bold text-xl md:text-2xl text-sand-textPrimary dark:text-white tracking-tight group-hover:text-sand-orange transition-colors duration-300">
                      {tier.name}
                    </h4>
                    <p className="text-xs md:text-sm text-sand-textSecondary mt-2 leading-relaxed font-normal min-h-[60px]">
                      {tier.description}
                    </p>

                    {/* Price section */}
                    <div className="mt-6 flex items-baseline gap-1.5 border-b border-sand-border dark:border-white/5 pb-6">
                      <span className="font-poppins font-bold text-4xl md:text-5xl text-sand-purple dark:text-white tracking-tighter">
                        ${currentPrice}
                      </span>
                      <span className="text-sand-textSecondary text-xs md:text-sm">
                        /mo
                      </span>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-4 mt-6">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-xs md:text-sm text-sand-textPrimary dark:text-white/90 font-medium">
                          <Check className="w-4 h-4 text-sand-orange flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <Link 
                    href={tier.href}
                    className={`block w-full text-center rounded-full py-4 text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                      tier.isPopular
                        ? 'bg-sand-orange text-white hover:bg-sand-orange/90 shadow-lg hover:shadow-sand-orange/20 hover:scale-[1.02]'
                        : 'bg-sand-purple/10 dark:bg-white/5 text-sand-purple dark:text-white hover:bg-sand-purple hover:text-white hover:scale-[1.02]'
                    }`}
                  >
                    {tier.ctaLabel}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="faq-section relative z-10 max-w-4xl mx-auto px-6 w-full">
        <div className="text-center mb-12">
          <HelpCircle className="w-10 h-10 text-sand-orange mx-auto mb-4" />
          <h2 className="font-poppins font-bold text-2xl md:text-4xl text-sand-textPrimary dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs md:text-sm text-sand-textSecondary mt-2">
            Find answers to common technical, billing, and integration inquiries.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx

            return (
              <div 
                key={idx}
                className="faq-item rounded-2xl bg-white/40 dark:bg-[#0e0c18]/50 border border-black/5 dark:border-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-poppins font-bold text-sm md:text-base text-sand-textPrimary dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <span className={`text-xl font-light text-sand-purple transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>

                <div 
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-40 border-t border-sand-border dark:border-white/5' : 'max-h-0'
                  }`}
                >
                  <p className="p-6 text-xs md:text-sm text-sand-textSecondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
