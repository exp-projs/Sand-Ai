'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function ExoFooter() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const elements = footer.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '#about' },
    { label: 'Pricing', href: '/pricing' },
  ]

  const socialLinks = [
    { label: 'Twitter', initial: 'T' },
    { label: 'Instagram', initial: 'I' },
    { label: 'LinkedIn', initial: 'L' },
  ]

  return (
    <footer
      ref={footerRef}
      className="bg-sand-deepPurple text-white pt-24 md:pt-40 pb-12"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Large CTA Email — Exo Ape Signature */}
        <div data-reveal data-delay="1" className="mb-20 md:mb-32">
          <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-4 font-inter">
            Get in touch
          </p>
          <a
            href="mailto:hello@sandai.com"
            className="block font-poppins font-bold text-white hover:text-sand-orange transition-colors duration-300 leading-tight"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
            }}
          >
            hello@sandai.com
          </a>
        </div>

        {/* Nav Links Row */}
        <div
          data-reveal
          data-delay="2"
          className="flex flex-wrap gap-6 md:gap-10 mb-10 border-t border-white/10 pt-10"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-white/60 hover:text-sand-orange transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Links + Copyright */}
        <div
          data-reveal
          data-delay="3"
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <div
                key={social.label}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs text-white/60 hover:bg-sand-orange hover:text-white hover:border-sand-orange transition-all cursor-pointer"
                aria-label={social.label}
              >
                {social.initial}
              </div>
            ))}
          </div>

          {/* Logo + Copyright */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Sand AI Logo"
              className="w-8 h-8 object-contain opacity-80"
              width={32}
              height={32}
              loading="lazy"
              decoding="async"
            />
            <span className="text-xs text-white/40">
              © {new Date().getFullYear()} Sand AI. All rights reserved.
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-xs text-white/40">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
