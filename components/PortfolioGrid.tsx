'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface PortfolioItem {
  title: string
  category: string
  image: string
  href: string
  gradient?: string
  features?: string[]
}

interface PortfolioGridProps {
  items: PortfolioItem[]
  startIndex?: number
}

// Unique gradients from site palette (fallback / secondary layers)
const CARD_GRADIENTS = [
  'linear-gradient(135deg, #44319E 0%, #6461FF 50%, #44319E 100%)',
  'linear-gradient(135deg, #FF8A00 0%, #FFD082 50%, #FF8A00 100%)',
  'linear-gradient(135deg, #6461FF 0%, #44319E 50%, #6461FF 100%)',
  'linear-gradient(135deg, #44319E 0%, #FF8A00 50%, #44319E 100%)',
  'linear-gradient(135deg, #FF8A00 0%, #6461FF 50%, #FF8A00 100%)',
]

// High-resolution case study editorial photography
const CARD_EDITORIAL_IMAGES = [
  '/editorial/chatbot_bg.jpg',
  '/editorial/social_bg.jpg',
  '/editorial/website_bg.jpg',
  '/editorial/mailing_bg.jpg',
  '/editorial/meta_ads_bg.jpg',
]


export default function PortfolioGrid({ items, startIndex = 0 }: PortfolioGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const cards = el.querySelectorAll('.portfolio-card')
    const isMobile = window.matchMedia('(hover: none)').matches

    cards.forEach((card) => {
      // 1. Reveal Animation
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )

      // 2. Parallax Motion inside card (Desktop only)
      if (!isMobile) {
        const icon = card.querySelector('.card-icon-container')
        const bgNum = card.querySelector('.service-number')
        const circle1 = card.querySelector('.decor-circle-1')
        const circle2 = card.querySelector('.decor-circle-2')

        const cardTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })

        // Floating icon parallax
        if (icon) {
          cardTimeline.fromTo(
            icon,
            { y: -30 },
            { y: 30, ease: 'none' },
            0
          )
        }

        // Faded number parallax
        if (bgNum) {
          cardTimeline.fromTo(
            bgNum,
            { y: 20 },
            { y: -20, ease: 'none' },
            0
          )
        }

        // Circular background overlays parallax
        if (circle1) {
          cardTimeline.fromTo(
            circle1,
            { y: -15, scale: 0.9 },
            { y: 15, scale: 1.1, ease: 'none' },
            0
          )
        }
        if (circle2) {
          cardTimeline.fromTo(
            circle2,
            { y: 15, scale: 1.1 },
            { y: -15, scale: 0.9, ease: 'none' },
            0
          )
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (el.contains(t.trigger as Node)) t.kill()
      })
    }
  }, [])

  const leftItems = items.filter((_, idx) => idx % 2 === 0)
  const rightItems = items.filter((_, idx) => idx % 2 !== 0)

  // 3. Right Column Parallax scroll trigger wiring
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    if (!isMobile) {
      const rightCol = el.querySelector('.right-column')
      if (rightCol) {
        gsap.fromTo(
          rightCol,
          { y: 80 },
          {
            y: -120,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
      }
    }
  }, [items])

  const renderCard = (item: PortfolioItem, globalIndex: number) => {
    const editorialImg = CARD_EDITORIAL_IMAGES[globalIndex % CARD_EDITORIAL_IMAGES.length]

    return (
      <Link
        key={item.title}
        href={item.href}
        className="portfolio-card block w-full skew-element group relative"
        style={{
          marginBottom: 'clamp(2rem, 5vw, 4rem)',
        }}
      >
        {/* Card Media Wrapper */}
        <div
          className="card-media rounded-2xl overflow-hidden shadow-2xl relative w-full flex items-center justify-center border border-white/5 bg-black"
          style={{
            aspectRatio: '3/2',
          }}
        >
          {/* High-Resolution Full-Bleed Editorial Background */}
          <Image
            src={editorialImg}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={globalIndex < 2}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105 z-0"
          />

          {/* Dark Vignette Overlay for High Typography Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 z-[1] transition-opacity duration-700 ease-out group-hover:opacity-95" />

          {/* Frosted Glassmorphic Backdrop Overlay on Hover */}
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[6px] z-[2] opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 pointer-events-none" />

          {/* Frosted Glassmorphic Service Name Pill */}
          <div className="absolute top-4 right-4 z-10 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center gap-2 select-none shadow-lg">
            <span className="font-poppins font-bold text-xs tracking-wider text-sand-orange leading-none">
              {String(globalIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/90 leading-none">
              // {item.title}
            </span>
          </div>

          {/* Decorative Atmospheric Glow Circles */}
          <div className="decor-circle-1 absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-2xl will-change-transform transition-all duration-1000 ease-out group-hover:scale-125 group-hover:bg-white/10 z-[2]" />
          <div className="decor-circle-2 absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-white/5 blur-2xl will-change-transform transition-all duration-1000 ease-out group-hover:scale-125 group-hover:bg-white/10 z-[2]" />

          {/* Centered Floating Icon Box (Floating Top Layer - Translates up on hover) */}
          <div className="card-icon-container relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 will-change-transform transition-all duration-700 ease-out group-hover:scale-[0.82] group-hover:rotate-3 group-hover:-translate-y-8 group-hover:border-white/45">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              width={240}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Category Label at bottom inside vignette (Fades out on hover) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-[2] bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-500 group-hover:opacity-0 pointer-events-none">
            <span className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase">
              {item.category}
            </span>
          </div>

          {/* Elegant Staggered Info Reveal Panel (Fades & slides up on hover) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10 pointer-events-none flex flex-col justify-end">
            <div className="info-reveal-panel flex flex-col gap-2 translate-y-4 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-[9px] font-bold tracking-[0.25em] text-sand-orange uppercase select-none">
                Core Capabilities
              </span>
              <ul className="flex flex-col gap-1.5">
                {item.features?.map((feature, idx) => (
                  <li
                    key={idx}
                    className="capability-item flex items-center gap-2 text-white/95 text-xs md:text-sm font-medium translate-y-3 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                    style={{
                      transitionDelay: `${150 + idx * 80}ms`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sand-orange flex-shrink-0 select-none shadow-[0_0_8px_rgba(255,138,0,0.6)]" />
                    <span className="truncate md:whitespace-normal">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Card Information */}
        <div className="card-info flex items-center justify-between pt-6">
          <div>
            <h3 className="card-title text-xl md:text-2xl font-bold transition-all duration-500 ease-out group-hover:text-sand-orange group-hover:translate-x-1">
              {item.title}
            </h3>
            <p className="card-category text-xs tracking-[0.15em] uppercase text-sand-textSecondary transition-all duration-500 ease-out group-hover:text-sand-textPrimary dark:group-hover:text-white mt-1">
              {item.category}
            </p>
          </div>

          {/* Premium Loop Arrow Button */}
          <div className="relative w-12 h-12 rounded-full border border-sand-border dark:border-white/10 flex items-center justify-center overflow-hidden transition-all duration-500 ease-out group-hover:border-sand-orange group-hover:bg-sand-orange group-hover:shadow-[0_0_20px_rgba(255,138,0,0.4)]">
            <span className="text-sand-textSecondary dark:text-white/60 text-lg transition-transform duration-500 ease-out group-hover:translate-x-[40px] absolute">
              →
            </span>
            <span className="text-white text-lg transition-transform duration-500 ease-out -translate-x-[40px] group-hover:translate-x-0 absolute">
              →
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left Column (Static Base Column) */}
        <div className="left-column flex flex-col gap-10 md:gap-16">
          {leftItems.map((item, idx) => renderCard(item, idx * 2))}
        </div>

        {/* Right Column (Dynamic Parallax Scroll Offset Column) */}
        <div className="right-column flex flex-col gap-10 md:gap-16">
          {rightItems.map((item, idx) => renderCard(item, idx * 2 + 1))}

          {/* Gorgeous Frosted Glassmorphic CTA Card to balance heights */}
          <div className="portfolio-card block w-full relative z-10 skew-element group">
            <div
              className="card-media rounded-2xl overflow-hidden shadow-2xl relative w-full flex flex-col items-center justify-center border border-black/10 dark:border-white/10 bg-gradient-to-br from-sand-orange/5 via-sand-purple/5 to-transparent backdrop-blur-md p-8 md:p-12 text-center"
              style={{
                aspectRatio: '3/2',
              }}
            >
              {/* Dim frosted backdrop */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px] z-0" />
              {/* Dynamic glow blob */}
              <div className="absolute w-[60%] h-[60%] rounded-full bg-sand-orange/20 dark:bg-sand-orange/15 blur-3xl z-0 animate-pulse" />

              <div className="relative z-10 flex flex-col items-center gap-3">
                <span className="text-[9px] font-bold tracking-[0.25em] text-sand-orange uppercase select-none">
                  Ready to scale?
                </span>
                <h3 className="font-poppins font-bold text-xl md:text-2xl text-white leading-snug">
                  Let's build something extraordinary.
                </h3>
                <p className="text-white/80 text-xs max-w-xs">
                  Connect with our technical strategy team to deploy high-converting AI integrations.
                </p>
                <Link
                  href="/signup"
                  className="mt-3 px-6 py-2.5 rounded-full bg-sand-orange hover:bg-sand-orange/90 text-white font-poppins font-bold text-xs tracking-wider shadow-lg transition-all duration-300 hover:scale-105 pointer-events-auto select-auto"
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
