'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'
import { NavItem } from '@/types'
import { ThemeToggle } from './ThemeToggle'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

import { ChevronDown } from 'lucide-react'

const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'About Us', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
]

const PRODUCT_LINKS = [
  { label: 'AI Chatbot', href: '/chatbot', description: '24/7 WhatsApp automation', icon: '🤖' },
  { label: 'Social Media', href: '/social-media', description: 'Auto-posts & Reels scripts', icon: '📱' },
  { label: 'AI Website', href: '/website', description: 'Local SEO optimized sites', icon: '🌐' },
  { label: 'Mailing & Loyalty', href: '/mailing', description: 'Retention & Rewards', icon: '✉️' },
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
      subscription.unsubscribe()
      ctx.revert()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

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
          <img 
            src="/logo.png" 
            alt="Sand AI Logo" 
            className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
          />
          <span className="font-poppins font-bold text-xl text-sand-textPrimary tracking-tight">
            Sand AI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
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
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${servicesOpen ? 'text-sand-purple' : 'text-sand-textSecondary'} hover:text-sand-purple`}
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-sand-cardPurple rounded-3xl border border-sand-border shadow-2xl p-6 transition-all duration-300 origin-top overflow-hidden ${servicesOpen ? 'scale-y-100 opacity-100 pointer-events-auto' : 'scale-y-95 opacity-0 pointer-events-none'}`}
            >
              <div className="grid grid-cols-2 gap-4">
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

          {NAV_LINKS.filter(l => l.label !== 'Home').map((link) => (
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
          
          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-sand-border">
              <div className="text-right hidden lg:block">
                <p className="text-xs font-bold text-sand-textPrimary leading-none">
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </p>
                <button 
                  onClick={handleLogout}
                  className="text-[10px] text-sand-purple font-semibold hover:underline"
                >
                  Logout
                </button>
              </div>
              {user.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full border border-sand-purple/20"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-sand-purple/10 flex items-center justify-center text-sand-purple font-bold text-xs border border-sand-purple/20 uppercase">
                  {user.email?.charAt(0)}
                </div>
              )}
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
          {user && (
            <div className="flex items-center gap-4 p-4 bg-sand-purple/5 rounded-xl border border-sand-purple/10 mb-2">
               {user.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full border border-sand-purple/20"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-sand-purple/10 flex items-center justify-center text-sand-purple font-bold border border-sand-purple/20 uppercase">
                  {user.email?.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-bold text-sand-textPrimary">
                   {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </p>
                <p className="text-xs text-sand-textSecondary">{user.email}</p>
              </div>
            </div>
          )}

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

          <div className="space-y-3 pt-2">
            <div className="text-[10px] font-black uppercase text-sand-textSecondary tracking-[0.2em] px-1">Our Products</div>
            <div className="grid grid-cols-1 gap-2">
              {PRODUCT_LINKS.map((product) => (
                <Link
                  key={product.label}
                  href={product.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-sand-purple/5 border border-sand-purple/10"
                >
                   <span className="text-xl">{product.icon}</span>
                   <span className="text-sm font-bold text-sand-textPrimary">{product.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-4 border-t border-sand-border">
            {!user ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-full border border-sand-border px-6 py-3 text-center font-semibold text-sand-textPrimary"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-full border border-sand-purple px-6 py-3 text-center font-semibold text-sand-purple"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full rounded-full border border-red-200 text-red-500 px-6 py-3 text-center font-semibold bg-red-50"
              >
                Logout
              </button>
            )}
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-full bg-sand-orange px-6 py-3 text-center font-semibold text-white shadow-sm hover:bg-[#E67A00]"
            >
              Book a Call
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
