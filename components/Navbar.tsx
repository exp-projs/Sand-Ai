'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { NavItem } from '@/types'
import { ThemeToggle } from './ThemeToggle'

const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'About Us', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, navRef)

    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      ctx.revert()
    }
  }, [])

  return (
    <header
      ref={navRef}
      className={`fixed top-4 left-0 right-0 z-50 mx-auto max-w-6xl transition-all duration-300 backdrop-blur-lg ${scrolled ? 'drop-shadow-sm' : ''
        }`}
    >
      <div
        className={`mx-4 md:mx-auto flex h-16 items-center justify-between rounded-full px-6 transition-colors duration-300 ${scrolled ? 'bg-sand-cardPurple/40 shadow-md border border-sand-border' : 'bg-sand-cardPurple/10 '
          }`}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-sand-purple transition-transform group-hover:scale-110">✦</span>
          <span className="font-poppins font-bold text-xl text-sand-textPrimary tracking-tight">
            Sand AI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-sand-textSecondary hover:text-sand-purple transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="#contact"
            className="rounded-full bg-sand-orange px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#E67A00] transition-colors"
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          title="Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 z-50 relative focus:outline-none"
        >
          <span className={`block w-6 h-0.5 bg-sand-textPrimary transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-sand-textPrimary transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-sand-textPrimary transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`absolute top-20 left-4 right-4 rounded-2xl bg-sand-cardPurple border border-sand-border shadow-xl origin-top transition-all duration-300 ease-in-out md:hidden overflow-hidden ${mobileMenuOpen ? 'scale-y-100 opacity-100 pointer-events-auto' : 'scale-y-0 opacity-0 pointer-events-none'
          }`}
      >
        <nav className="flex flex-col p-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-sand-textPrimary hover:text-sand-purple"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full mt-4 rounded-full bg-sand-orange px-6 py-3 text-center font-semibold text-white shadow-sm hover:bg-[#E67A00]"
          >
            Book a Call
          </Link>
        </nav>
      </div>
    </header>
  )
}
