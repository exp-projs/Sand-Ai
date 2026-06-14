'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { ThemeToggle } from './ThemeToggle'
import { ChevronDown } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '#about' },
  { label: 'Pricing', href: '/pricing' },
]

const PRODUCT_LINKS = [
  { label: 'Google MCC Setup', href: '/google-mcc', description: 'Centralized client account management & billing', icon: '🏢' },
  { label: 'Meta Business Manager', href: '/meta-business-manager', description: 'Secure assets, pages, pixels & permissions', icon: '🔑' },
  { label: 'Looker Studio Dashboards', href: '/looker-studio', description: 'Real-time blended reporting & analytics', icon: '📊' },
  { label: 'CRM Integration', href: '/crm-integration', description: 'Automated Notion/Sheets customer pipelines', icon: '💼' },
  { label: 'Client Communication', href: '/client-communication', description: 'Slack notifications & WhatsApp alert triggers', icon: '📱' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Scroll detection for nav background — uses rAF for performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      subscription.unsubscribe()
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-sand-bg/80 backdrop-blur-xl shadow-sm border-b border-sand-border/50'
            : 'bg-transparent'
        }`}
        style={{ willChange: 'background-color' }}
      >
        <div className="mx-auto max-w-7xl px-6 flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-50">
            <img
              src="/logo.png"
              alt="Sand AI Logo"
              className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
              width={40}
              height={40}
            />
            <span className="font-poppins font-bold text-xl text-sand-textPrimary tracking-tight">
              Sand AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center gap-8 transition-all duration-500 ${
            scrolled
              ? 'opacity-0 -translate-y-4 pointer-events-none'
              : 'opacity-100 translate-y-0'
          }`}>
            <Link
              href="/"
              className="text-sm font-medium text-sand-textSecondary hover:text-sand-purple transition-colors"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative group py-4"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  servicesOpen ? 'text-sand-purple' : 'text-sand-textSecondary'
                } hover:text-sand-purple`}
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    servicesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-sand-cardPurple rounded-3xl border border-sand-border shadow-2xl p-6 transition-all duration-300 origin-top overflow-hidden ${
                  servicesOpen
                    ? 'scale-y-100 opacity-100 pointer-events-auto'
                    : 'scale-y-95 opacity-0 pointer-events-none'
                }`}
              >
                <div className="grid grid-cols-1 gap-4">
                  {PRODUCT_LINKS.map((product) => (
                    <Link
                      key={product.label}
                      href={product.href}
                      onClick={() => setServicesOpen(false)}
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-sand-cardPurple/30 transition-colors group/item"
                    >
                      <div className="w-10 h-10 rounded-xl bg-sand-purple/10 flex items-center justify-center text-xl group-hover/item:scale-110 transition-transform">
                        {product.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-sand-textPrimary group-hover/item:text-sand-purple transition-colors">
                          {product.label}
                        </div>
                        <div className="text-[10px] text-sand-textSecondary leading-tight">
                          {product.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-sand-border">
                  <Link
                    href="#services"
                    className="text-xs font-bold text-sand-purple hover:underline flex items-center justify-center gap-2"
                    onClick={() => setServicesOpen(false)}
                  >
                    View All Services <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {NAV_LINKS.filter((l) => l.label !== 'Home').map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-sand-textSecondary hover:text-sand-purple transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions & Scrolled Menu Button Wrapper */}
          <div className="relative flex items-center justify-end">
            {/* Desktop Right Actions */}
            <div className={`hidden md:flex items-center gap-4 transition-all duration-500 ${
              scrolled
                ? 'opacity-0 -translate-y-4 pointer-events-none'
                : 'opacity-100 translate-y-0'
            }`}>
              <ThemeToggle />

              {user ? (
                <div className="flex items-center gap-3 pl-3 pr-2.5 py-1.5 rounded-full bg-sand-cardPurple/50 dark:bg-white/5 border border-sand-border/80 backdrop-blur-md shadow-sm">
                  <div className="text-right hidden lg:block">
                    <span className="text-[9px] font-medium text-sand-textSecondary uppercase tracking-wider">Welcome,</span>
                    <p className="text-xs font-extrabold bg-gradient-to-r from-sand-purple to-sand-orange bg-clip-text text-transparent leading-none mt-0.5">
                      {user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0]}
                    </p>
                  </div>
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border border-sand-purple/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sand-purple to-sand-orange flex items-center justify-center text-white font-bold text-xs shadow-sm uppercase">
                      {(user.user_metadata?.full_name || user.user_metadata?.name || user.email || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-[10px] text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-semibold pl-2 border-l border-sand-border/60 hover:underline"
                    title="Logout"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-semibold text-sand-textPrimary hover:text-sand-purple transition-colors px-2"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-full border border-sand-purple px-6 py-2.5 text-sm font-semibold text-sand-purple hover:bg-sand-purple hover:text-white transition-all shadow-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}

              <Link
                href="#contact"
                className="rounded-full bg-sand-orange px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#E67A00] transition-colors"
              >
                Book a Call
              </Link>
            </div>

            {/* Scrolled & Mobile Unified Menu Button */}
            <button
              title="Menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-full border border-sand-border/80 bg-sand-cardPurple/40 backdrop-blur-md transition-all duration-500 z-50 focus:outline-none ${
                scrolled || mobileMenuOpen
                  ? 'opacity-100 translate-x-0 pointer-events-auto'
                  : 'opacity-100 translate-x-0 pointer-events-auto md:opacity-0 md:translate-x-4 md:pointer-events-none md:absolute'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-sand-textPrimary hidden md:inline">
                {mobileMenuOpen ? 'Close' : 'Menu'}
              </span>
              <div className="flex flex-col justify-center gap-1 w-5 h-5 items-center">
                <span
                  className={`block w-4 h-0.5 bg-sand-textPrimary transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`block w-4 h-0.5 bg-sand-textPrimary transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block w-4 h-0.5 bg-sand-textPrimary transition-all duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'is-open' : ''}`}
      >
        {/* Nav Links */}
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        {/* Services */}
        <div className="flex flex-col gap-2.5 px-4 py-3 bg-sand-cardPurple/30 rounded-2xl border border-sand-border/40 text-left my-2">
          <div className="text-[10px] font-bold text-sand-textSecondary uppercase tracking-widest mb-1.5">Our Services</div>
          {PRODUCT_LINKS.map((product) => (
            <Link
              key={product.label}
              href={product.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-sand-textPrimary hover:text-sand-purple flex items-center gap-2"
            >
              <span className="text-base">{product.icon}</span>
              {product.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="#contact"
          onClick={() => setMobileMenuOpen(false)}
          className="!text-sand-orange"
        >
          Book a Call
        </Link>

        {/* Auth Actions */}
        {user && (
          <div className="flex items-center gap-4.5 mt-4 mb-2 px-5 py-3.5 bg-sand-cardPurple/50 dark:bg-white/5 rounded-2xl border border-sand-border/80 backdrop-blur-md shadow-sm">
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-sand-purple/20"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sand-purple to-sand-orange flex items-center justify-center text-white font-bold text-base shadow-sm uppercase">
                {(user.user_metadata?.full_name || user.user_metadata?.name || user.email || 'U').charAt(0).toUpperCase()}
              </div>
            )}
            <div className="text-left">
              <p className="text-[10px] text-sand-textSecondary uppercase tracking-wider font-medium">Welcome,</p>
              <p className="text-sm font-extrabold bg-gradient-to-r from-sand-purple to-sand-orange bg-clip-text text-transparent leading-none mt-1">
                {user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0]}
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-4">
          {!user ? (
            <>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="!text-base !font-medium text-sand-textSecondary"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="!text-base !font-medium text-sand-purple"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout()
                setMobileMenuOpen(false)
              }}
              className="!text-base !font-medium text-red-400"
            >
              Logout
            </button>
          )}
        </div>

        {/* Theme Toggle in Mobile Menu */}
        <div className="mt-2">
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}
