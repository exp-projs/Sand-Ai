'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Sparkles, BookOpen, Calendar, HelpCircle, ArrowRight, CornerDownLeft, Loader2 } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { NOTES_DATA, NoteArticle } from '@/app/notes/page'

interface CommandItem {
  id: string
  title: string
  subtitle: string
  category: 'action' | 'service' | 'note'
  url?: string
  action?: () => void
  icon: React.ReactNode
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const router = useRouter()
  const backdropRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Listen to open-command-palette events & Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(prev => !prev)
      } else if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('open-command-palette', handleOpenEvent)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('open-command-palette', handleOpenEvent)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  // GSAP animation for opening/closing
  useGSAP(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(containerRef.current, 
        { opacity: 0, scale: 0.95, y: -10 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      )
    } else {
      document.body.style.overflow = ''
    }
  }, { dependencies: [isOpen] })

  const handleClose = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.97,
      y: -5,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => setIsOpen(false)
    })
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' })
  }

  // Trigger onboarding modal
  const triggerOnboarding = (serviceId?: string) => {
    handleClose()
    // Wait a brief moment for palette close animation to complete
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('open-onboarding', { detail: { serviceId } }))
    }, 150)
  }

  // Static options
  const defaultActions: CommandItem[] = [
    {
      id: 'book-call',
      title: 'Book a Call / Get Onboarded',
      subtitle: 'Open the detailed onboarding form to schedule agency services',
      category: 'action',
      action: () => triggerOnboarding(),
      icon: <Calendar className="w-4 h-4 text-sand-orange" />
    },
    {
      id: 'diagnostic',
      title: 'Run Instant Website Diagnostic',
      subtitle: 'Free AI audits of your SEO, metrics, pixels and copy benchmarks',
      category: 'action',
      url: '/diagnostic',
      icon: <Sparkles className="w-4 h-4 text-sand-purple" />
    },
    {
      id: 'pricing',
      title: 'View Pricing & Packages',
      subtitle: 'Check detailed transparency pricing plans for local businesses',
      category: 'action',
      url: '/pricing',
      icon: <HelpCircle className="w-4 h-4 text-sand-textSecondary" />
    }
  ]

  const serviceActions: CommandItem[] = [
    {
      id: 'service-google',
      title: 'Google MCC Setup',
      subtitle: 'Configure multi-client advertiser accounts for Google Ads delegation',
      category: 'service',
      action: () => triggerOnboarding('google-mcc'),
      icon: <span className="text-xs">🏢</span>
    },
    {
      id: 'service-meta',
      title: 'Meta Business Manager Setup',
      subtitle: 'Initialize pixels, assets, and business manager ad configurations',
      category: 'service',
      action: () => triggerOnboarding('meta-business-manager'),
      icon: <span className="text-xs">🔑</span>
    },
    {
      id: 'service-looker',
      title: 'Looker Studio Dashboards',
      subtitle: 'Deploy direct marketing dashboard integrations and reports',
      category: 'service',
      action: () => triggerOnboarding('looker-studio'),
      icon: <span className="text-xs">📊</span>
    },
    {
      id: 'service-crm',
      title: 'CRM Integration',
      subtitle: 'Map website leads directly into Notion, Sheets, or custom CRM systems',
      category: 'service',
      action: () => triggerOnboarding('crm-integration'),
      icon: <span className="text-xs">💼</span>
    },
    {
      id: 'service-client',
      title: 'Client Communication alerts',
      subtitle: 'Setup instant ad lead notifications on Slack or WhatsApp channels',
      category: 'service',
      action: () => triggerOnboarding('client-communication'),
      icon: <span className="text-xs">📱</span>
    }
  ]

  // Map notes from NOTES_DATA
  const noteItems: CommandItem[] = NOTES_DATA.map((note: NoteArticle) => ({
    id: `note-${note.slug}`,
    title: note.title,
    subtitle: note.summary,
    category: 'note',
    url: `/notes/${note.slug}`,
    icon: <BookOpen className="w-4 h-4 text-sand-purple/70" />
  }))

  const allItems = [...defaultActions, ...serviceActions, ...noteItems]

  // Filter items based on query
  const filteredItems = query.trim() === '' 
    ? [...defaultActions, ...serviceActions] 
    : allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )

  // Navigate using keys
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % filteredItems.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        executeItem(filteredItems[selectedIndex])
      }
    }
  }

  const executeItem = (item: CommandItem) => {
    if (item.action) {
      item.action()
    } else if (item.url) {
      router.push(item.url)
      handleClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        ref={backdropRef} 
        onClick={handleClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm opacity-0"
      />

      {/* Main Container */}
      <div 
        ref={containerRef} 
        className="relative w-full max-w-xl bg-white dark:bg-sand-cardPurple rounded-2xl border border-sand-border shadow-2xl overflow-hidden opacity-0 scale-95"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Box */}
        <div className="flex items-center gap-3 px-4 border-b border-sand-border">
          <Search className="w-5 h-5 text-sand-textSecondary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Type 'book a call', search notes, or select services..."
            className="w-full py-4 bg-transparent text-sm text-sand-textPrimary focus:outline-none placeholder:text-sand-textSecondary/60 font-semibold"
          />
          <div className="text-[10px] bg-slate-100 dark:bg-white/5 border border-sand-border rounded px-1.5 py-0.5 text-sand-textSecondary font-bold shrink-0 shadow-sm select-none">
            ESC
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex
              return (
                <button
                  key={item.id}
                  onClick={() => executeItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                    isSelected 
                      ? 'bg-sand-purple/10 border-l-2 border-sand-purple pl-2.5' 
                      : 'border-l-2 border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-sand-purple/20 text-sand-purple' : 'bg-slate-50 dark:bg-white/5 text-sand-textSecondary'} transition-colors shrink-0`}>
                    {item.icon}
                  </div>
                  <div className="flex-grow min-w-0 pr-4">
                    <div className="text-xs font-bold text-sand-textPrimary flex items-center gap-2">
                      {item.title}
                      {item.category === 'service' && (
                        <span className="text-[9px] font-semibold text-sand-orange bg-sand-orange/10 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Service</span>
                      )}
                      {item.category === 'note' && (
                        <span className="text-[9px] font-semibold text-sand-purple bg-sand-purple/10 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Note</span>
                      )}
                    </div>
                    <div className="text-[10px] text-sand-textSecondary font-light leading-normal truncate mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>
                  {isSelected && (
                    <CornerDownLeft className="w-3.5 h-3.5 text-sand-purple shrink-0 self-center opacity-80 animate-pulse" />
                  )}
                </button>
              )
            })
          ) : (
            <div className="text-center py-8 space-y-2">
              <HelpCircle className="w-8 h-8 text-sand-textSecondary/50 mx-auto" />
              <p className="text-xs text-sand-textSecondary font-semibold">No results found for "{query}"</p>
              <p className="text-[10px] text-sand-textSecondary font-light">Try searching for 'Google', 'Meta', 'pricing', or 'redesign'.</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="flex justify-between items-center bg-slate-50 dark:bg-black/20 px-4 py-2 text-[10px] text-sand-textSecondary border-t border-sand-border select-none">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <span className="border border-sand-border px-1 rounded bg-white dark:bg-slate-950 font-bold">↑↓</span> Move
            </span>
            <span className="flex items-center gap-1">
              <span className="border border-sand-border px-1 rounded bg-white dark:bg-slate-950 font-bold">Enter</span> Select
            </span>
          </div>
          <div>
            Open Palette: <span className="border border-sand-border px-1 rounded bg-white dark:bg-slate-950 font-bold">Cmd K</span>
          </div>
        </div>
      </div>
    </div>
  )
}
