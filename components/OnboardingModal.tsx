'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { 
  X, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  Check, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  Building2, 
  Globe, 
  Target, 
  MessageSquare,
  Loader2
} from 'lucide-react'

const SERVICE_OPTIONS = [
  { id: 'google-mcc', label: 'Google MCC Setup', icon: '🏢' },
  { id: 'meta-business-manager', label: 'Meta Business Manager', icon: '🔑' },
  { id: 'looker-studio', label: 'Looker Studio Dashboards', icon: '📊' },
  { id: 'crm-integration', label: 'CRM Integration', icon: '💼' },
  { id: 'client-communication', label: 'Client Communication', icon: '📱' },
]

const BUDGET_OPTIONS = [
  { value: '< ₹50K', label: 'Under ₹50K / month' },
  { value: '₹50K - ₹2L', label: '₹50K to ₹2 Lakhs / month' },
  { value: '₹2L - ₹10L', label: '₹2L to ₹10 Lakhs / month' },
  { value: '> ₹10L', label: 'Above ₹10 Lakhs / month' },
]

const BUSINESS_TYPES = [
  'E-commerce',
  'Local Shop / Retail',
  'B2B SaaS',
  'Marketing Agency',
  'Professional Services (Clinic, Salon, etc.)',
  'Other'
]

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  // Current onboarding step (1: Business Info, 2: Services & Goals, 3: Contact Info)
  const [step, setStep] = useState(1)

  // Form states
  const [companyName, setCompanyName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [budget, setBudget] = useState('')
  const [primaryGoal, setPrimaryGoal] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [notes, setNotes] = useState('')
  const [agreedToDpdp, setAgreedToDpdp] = useState(false)

  // Auth gate states
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authName, setAuthName] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Submission states
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const formStepRef = useRef<HTMLDivElement>(null)

  // Confetti effect on success
  const createConfettiBurst = () => {
    const container = modalRef.current
    if (!container) return

    const colors = ['#6461FF', '#FF8A00', '#9EB2C0', '#FFD082', '#C3B1E1']
    const numConfetti = 40

    for (let i = 0; i < numConfetti; i++) {
      const el = document.createElement('div')
      el.className = 'absolute pointer-events-none w-2.5 h-2.5 rounded-sm'
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      el.style.left = '50%'
      el.style.top = '40%'
      el.style.zIndex = '100'
      container.appendChild(el)

      const angle = Math.random() * Math.PI * 2
      const distance = 60 + Math.random() * 140
      const destX = Math.cos(angle) * distance
      const destY = Math.sin(angle) * distance - (40 + Math.random() * 60)
      const rotation = Math.random() * 360
      const scale = 0.5 + Math.random() * 0.8

      gsap.fromTo(el,
        { x: 0, y: 0, scale: 0, rotation: 0, opacity: 0.9 },
        {
          x: destX,
          y: destY,
          scale: scale,
          rotation: rotation + 720,
          opacity: 0,
          duration: 1.5 + Math.random() * 1.5,
          ease: 'power2.out',
          onComplete: () => el.remove()
        }
      )
    }
  }

  // Handle outside click & escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Listen to open-onboarding events
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail?.serviceId) {
        setSelectedServices([customEvent.detail.serviceId])
      }
      setIsOpen(true)
    }
    window.addEventListener('open-onboarding', handleOpen)
    return () => window.removeEventListener('open-onboarding', handleOpen)
  }, [])

  // Check auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        setCompanyName(session.user.user_metadata?.company_name || '')
        setWhatsapp(session.user.user_metadata?.phone || '')
      }
      setLoadingUser(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        setCompanyName(session.user.user_metadata?.company_name || '')
        setWhatsapp(session.user.user_metadata?.phone || '')
      }
      setLoadingUser(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Modal open/close GSAP animations
  useGSAP(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Animate backdrop and modal scaling
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.9, y: 15 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.2)' }
      )
    } else {
      document.body.style.overflow = ''
    }
  }, { dependencies: [isOpen] })

  // Slide transition for step changes
  useGSAP(() => {
    if (!isOpen || success) return
    gsap.fromTo(formStepRef.current, 
      { opacity: 0, x: 20 }, 
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, { dependencies: [step, isOpen, user, success] })

  // Trigger confetti when success status changes
  useGSAP(() => {
    if (success) {
      createConfettiBurst()
    }
  }, { dependencies: [success] })

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 10,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setIsOpen(false)
        setSuccess(false)
        setStep(1)
        setSubmitError('')
        setAgreedToDpdp(false)
      }
    })
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' })
  }

  // Handle Auth submission
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError('')

    try {
      if (authMode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword
        })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: {
            data: {
              full_name: authName
            }
          }
        })
        if (error) throw error
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed. Please check details.')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(window.location.pathname)}`
        }
      })
      if (error) throw error
    } catch (err: any) {
      setAuthError(err.message)
    }
  }

  // Toggle service selection
  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  // Form validation for steps
  const validateStep = () => {
    if (step === 1) {
      if (!companyName.trim()) return 'Please enter your company/brand name.'
      if (!businessType) return 'Please select your business type.'
    } else if (step === 2) {
      if (selectedServices.length === 0) return 'Please select at least one service.'
      if (!budget) return 'Please select your monthly budget.'
    }
    return ''
  }

  const handleNext = () => {
    const error = validateStep()
    if (error) {
      setSubmitError(error)
      return
    }
    setSubmitError('')
    setStep(prev => prev + 1)
  }

  const handleBack = () => {
    setSubmitError('')
    setStep(prev => Math.max(1, prev - 1))
  }

  // Final submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    // Simple phone check
    const phoneDigits = whatsapp.replace(/\D/g, '')
    if (phoneDigits.length < 10) {
      setSubmitError('Please enter a valid WhatsApp number (at least 10 digits).')
      return
    }

    if (!agreedToDpdp) {
      setSubmitError('You must agree to the Data Processing Agreement (DPA) and Consent Notices to proceed.')
      return
    }

    setSubmitting(true)
    setSubmitError('')

    const detailsObj = {
      company_name: companyName,
      business_type: businessType,
      website_url: websiteUrl,
      selected_services: selectedServices,
      budget: budget,
      primary_goal: primaryGoal,
      notes: notes,
      agreed_to_dpdp: true,
      onboarding_flow: 'general'
    }

    try {
      // 1. Insert into leads table
      const { error } = await supabase.from('leads').insert({
        user_id: user.id,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Onboarding User',
        email: user.email || '',
        phone: whatsapp,
        service_type: 'general_onboarding',
        details: JSON.stringify(detailsObj),
        status: 'pending'
      })

      // Fallback to todos table if leads table schema failed or locked
      if (error) {
        console.warn('Leads insertion failed, falling back to todos table:', error.message)
        const fallbackText = JSON.stringify({
          leads_table_fallback: true,
          user_id: user.id,
          name: user.user_metadata?.full_name || 'Onboarding User',
          email: user.email,
          phone: whatsapp,
          service_type: 'general_onboarding',
          details: detailsObj
        })
        const { error: todoError } = await supabase.from('todos').insert({
          name: fallbackText
        })
        if (todoError) throw todoError
      }

      // 2. Trigger n8n Webhook
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'general_onboarding_submitted',
              timestamp: new Date().toISOString(),
              user: {
                id: user.id,
                email: user.email,
                name: user.user_metadata?.full_name
              },
              whatsapp,
              details: detailsObj
            })
          })
        } catch (webhookErr) {
          console.error('Webhook fail:', webhookErr)
        }
      }

      setSuccess(true)
    } catch (err: any) {
      console.error(err)
      setSubmitError(err.message || 'Failed to submit onboarding details. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        ref={backdropRef} 
        onClick={handleClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md opacity-0"
      />

      {/* Modal Container */}
      <div 
        ref={modalRef} 
        className="relative w-full max-w-2xl bg-white dark:bg-sand-cardPurple rounded-3xl border border-sand-border shadow-2xl p-6 md:p-8 overflow-hidden opacity-0 scale-95"
      >
        {/* Dynamic Theme Banner Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sand-purple to-sand-orange" />

        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-sand-textSecondary hover:text-sand-textPrimary transition-colors"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {loadingUser ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-sand-purple" />
          </div>
        ) : !user ? (
          /* AUTH GATE */
          <div className="space-y-6 pt-4">
            <div className="text-center max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-full bg-sand-purple/10 text-sand-purple flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold font-poppins text-sand-textPrimary">
                Sign In to Start Onboarding
              </h3>
              <p className="text-xs md:text-sm text-sand-textSecondary font-light leading-relaxed">
                Connect your account to save your onboarding progress and wire up ad platforms.
              </p>
            </div>

            {authError && (
              <div className="bg-red-50 dark:bg-red-950/20 text-red-500 p-4 rounded-xl text-xs flex items-center gap-3 border border-red-100 dark:border-red-950/50 italic">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4 max-w-md mx-auto">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-sand-textPrimary mb-1 ml-1">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full pl-11 pr-5 py-3 text-xs md:text-sm rounded-xl bg-slate-50 dark:bg-white/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all text-sand-textPrimary font-medium"
                      placeholder="e.g. Amit Kumar"
                    />
                    <User className="w-4 h-4 text-sand-textSecondary absolute left-4 top-3.5" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-sand-textPrimary mb-1 ml-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full pl-11 pr-5 py-3 text-xs md:text-sm rounded-xl bg-slate-50 dark:bg-white/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all text-sand-textPrimary font-medium"
                    placeholder="e.g. amit@company.com"
                  />
                  <Mail className="w-4 h-4 text-sand-textSecondary absolute left-4 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-sand-textPrimary mb-1 ml-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full pl-11 pr-5 py-3 text-xs md:text-sm rounded-xl bg-slate-50 dark:bg-white/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all text-sand-textPrimary font-medium"
                    placeholder="••••••••"
                  />
                  <Lock className="w-4 h-4 text-sand-textSecondary absolute left-4 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-sand-purple hover:bg-sand-purple/95 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sand-purple/25 transition-all flex items-center justify-center gap-2 text-xs md:text-sm mt-6"
              >
                {authLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Connecting...
                  </>
                ) : authMode === 'login' ? (
                  'Sign In & Begin'
                ) : (
                  'Create Account & Begin'
                )}
              </button>
            </form>

            <div className="relative max-w-md mx-auto my-4 text-center">
              <span className="bg-white dark:bg-sand-cardPurple px-4 text-xs text-sand-textSecondary relative z-10 font-medium">Or continue with</span>
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-sand-border" />
            </div>

            <div className="max-w-md mx-auto">
              <button
                onClick={handleGoogleAuth}
                className="w-full bg-white dark:bg-white/5 border border-sand-border text-sand-textPrimary font-bold py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-3 text-xs md:text-sm"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
                Sign in with Google
              </button>
            </div>

            <p className="text-center text-xs md:text-sm text-sand-textSecondary font-semibold">
              {authMode === 'login' ? (
                <>
                  New to Sand AI?{' '}
                  <button onClick={() => setAuthMode('signup')} className="text-sand-purple font-bold hover:underline">
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button onClick={() => setAuthMode('login')} className="text-sand-purple font-bold hover:underline">
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        ) : success ? (
          /* SUCCESS SCREEN */
          <div className="text-center space-y-6 py-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-sand-textPrimary font-poppins">Onboarding Initialized!</h3>
              <p className="text-sand-textSecondary text-sm max-w-md mx-auto leading-relaxed">
                Thank you. We have logged your company details for Sand AI services. Our integrations team will contact you on WhatsApp shortly to schedule the final setup.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="px-8 py-3.5 bg-sand-purple hover:bg-sand-purple/90 text-white rounded-2xl font-bold text-sm shadow-lg shadow-sand-purple/20 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          /* WIZARD FORM */
          <div className="pt-4 flex flex-col h-full">
            {/* Header info */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-sand-orange">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-sand-textPrimary font-poppins">Deploy Sand AI Services</h3>
                <p className="text-xs text-sand-textSecondary">Setup checklist - Step {step} of 3</p>
              </div>
            </div>

            {/* Error banner */}
            {submitError && (
              <div className="bg-red-50 dark:bg-red-950/20 text-red-500 p-4 rounded-xl text-xs flex items-center gap-3 border border-red-100 dark:border-red-950/50 italic mb-4">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {submitError}
              </div>
            )}

            {/* Step Content */}
            <div ref={formStepRef} className="flex-grow space-y-5">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Company / Brand Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full pl-11 pr-5 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all text-xs md:text-sm text-sand-textPrimary font-semibold"
                        placeholder="e.g. Chai Point"
                      />
                      <Building2 className="w-4 h-4 text-sand-textSecondary absolute left-4 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Business Category</label>
                    <select
                      required
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all text-xs md:text-sm text-sand-textPrimary font-semibold appearance-none"
                    >
                      <option value="">Select Category</option>
                      {BUSINESS_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Website URL (Optional)</label>
                    <div className="relative">
                      <input
                        type="url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="w-full pl-11 pr-5 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all text-xs md:text-sm text-sand-textPrimary font-semibold"
                        placeholder="e.g. chaipoint.com"
                      />
                      <Globe className="w-4 h-4 text-sand-textSecondary absolute left-4 top-3.5" />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-sand-textPrimary mb-2 ml-1">Select Services to Activate</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICE_OPTIONS.map((opt) => {
                        const isSelected = selectedServices.includes(opt.id)
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => toggleService(opt.id)}
                            className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                              isSelected
                                ? 'bg-sand-purple/10 border-sand-purple shadow-sm'
                                : 'bg-slate-50 dark:bg-white/5 border-sand-border hover:bg-slate-100 dark:hover:bg-white/10'
                            }`}
                          >
                            <span className="text-xl">{opt.icon}</span>
                            <span className="text-xs md:text-sm font-bold text-sand-textPrimary">{opt.label}</span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-sand-purple ml-auto shrink-0" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Estimated Monthly Spend</label>
                      <select
                        required
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all text-xs md:text-sm text-sand-textPrimary font-semibold appearance-none"
                      >
                        <option value="">Select Spend Level</option>
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Primary Growth Goal</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={primaryGoal}
                          onChange={(e) => setPrimaryGoal(e.target.value)}
                          className="w-full pl-11 pr-5 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all text-xs md:text-sm text-sand-textPrimary font-semibold"
                          placeholder="e.g. Double organic leads"
                        />
                        <Target className="w-4 h-4 text-sand-textSecondary absolute left-4 top-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">WhatsApp Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full pl-11 pr-5 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all text-xs md:text-sm text-sand-textPrimary font-semibold"
                        placeholder="e.g. +91 98765 43210"
                      />
                      <MessageSquare className="w-4 h-4 text-sand-textSecondary absolute left-4 top-3.5" />
                    </div>
                    <span className="text-[10px] text-sand-textSecondary ml-1">Used exclusively for final setup coordination.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Additional Requirements / Notes</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all text-xs md:text-sm text-sand-textPrimary font-semibold resize-none"
                      placeholder="Share details on key dashboard metrics, specific ad accounts, or CRM systems you want integrated."
                    />
                  </div>

                  {/* DPDP Compliance Checkbox */}
                  <div className="flex items-start gap-3 mt-4 bg-sand-purple/5 dark:bg-white/5 p-4 rounded-2xl border border-sand-purple/10">
                    <input
                      id="agreedToDpdp"
                      type="checkbox"
                      checked={agreedToDpdp}
                      onChange={(e) => setAgreedToDpdp(e.target.checked)}
                      className="w-4 h-4 rounded text-sand-purple focus:ring-sand-purple/20 border-sand-border bg-slate-50 dark:bg-white/5 cursor-pointer mt-1"
                    />
                    <label htmlFor="agreedToDpdp" className="text-[11px] md:text-xs text-sand-textSecondary cursor-pointer select-none leading-relaxed">
                      I agree to the{' '}
                      <a 
                        href="/legal/dpdp" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sand-purple font-bold hover:underline"
                      >
                        Data Processing Agreement (DPA)
                      </a>{' '}
                      and consent to Sand AI processing my business parameters for system deployment.
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="mt-8 pt-4 border-t border-sand-border flex justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 rounded-xl border border-sand-border text-sand-textPrimary font-bold text-xs md:text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-sand-purple hover:bg-sand-purple/95 text-white rounded-xl font-bold text-xs md:text-sm shadow-md shadow-sand-purple/25 transition-all flex items-center gap-1.5"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-8 py-3 bg-sand-orange hover:bg-[#E67A00] text-white rounded-xl font-bold text-xs md:text-sm shadow-lg shadow-sand-orange/20 transition-all flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Setup...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Submit Setup Request
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
