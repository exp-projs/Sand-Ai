'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Calendar, 
  Shield, 
  MapPin, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Lock, 
  Mail, 
  User, 
  Check, 
  AlertTriangle, 
  Activity, 
  Code, 
  LineChart, 
  FileText, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Loader2,
  LockKeyhole,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { User as SupabaseUser } from '@supabase/supabase-js'

interface Issue {
  category: 'seo' | 'performance' | 'tracking' | 'copywriting'
  severity: 'critical' | 'warning' | 'optimized'
  title: string
  description: string
  recommendation: string
}

interface AuditReport {
  score: number
  scores: {
    seo: number
    performance: number
    tracking: number
    copywriting: number
  }
  summary: string
  issues: Issue[]
}

const SCAN_LOADER_STAGES = [
  'Initializing secure connection with audit nodes...',
  'Fetching homepage HTML structures & assets...',
  'Extracting metadata tags (H1s, title, description, viewport)...',
  'Analyzing scripts, external stylesheets, and media alt labels...',
  'Running Nvidia NIM (Llama-3.1-70b-instruct) analytics models...',
  'Formatting custom conversion leak checklist...'
]

export default function DiagnosticPage() {
  const [activeTab, setActiveTab] = useState<'booking' | 'scanner'>('booking')
  const [user, setUser] = useState<SupabaseUser | null>(null)
  
  // URL Scan States
  const [url, setUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanStepIndex, setScanStepIndex] = useState(0)
  const [report, setReport] = useState<AuditReport | null>(null)
  const [scanError, setScanError] = useState('')
  const [scanCount, setScanCount] = useState<number>(0)
  const [limitReached, setLimitReached] = useState<boolean>(false)
  
  // Auth Form States
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authName, setAuthName] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Report Section Accordion state (stores the index of the expanded issue)
  const [expandedIssueIndex, setExpandedIssueIndex] = useState<number | null>(null)

  // Cal.com scheduler and form scroll references
  const schedulerRef = useRef<HTMLDivElement>(null)

  // Fetch scan usage count
  const fetchScanUsage = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL || 
        (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
          ? 'http://localhost:5000/api' 
          : '/api')

      const res = await fetch(`${backendHost}/scan-usage`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setScanCount(data.count || 0)
        if ((data.count || 0) >= 3) {
          setLimitReached(true)
        }
      }
    } catch (err) {
      console.error('Error fetching scan usage:', err)
    }
  }

  useEffect(() => {
    if (user) {
      fetchScanUsage()
    } else {
      setScanCount(0)
      setLimitReached(false)
    }
  }, [user])

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Auto-advance loader messages during scan
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isScanning) {
      setScanStepIndex(0)
      interval = setInterval(() => {
        setScanStepIndex((prev) => {
          if (prev < SCAN_LOADER_STAGES.length - 1) {
            return prev + 1
          } else {
            clearInterval(interval)
            return prev
          }
        })
      }, 1600)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isScanning])

  // Handle Scan Request
  const handleRunScan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return
    setIsScanning(true)
    setScanError('')
    setReport(null)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token
      if (!token) {
        throw new Error('You must be signed in to perform a diagnostic scan.')
      }

      // Append protocol if missing
      let targetUrl = url.trim()
      if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = 'https://' + targetUrl
      }

      const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL || 
        (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
          ? 'http://localhost:5000/api' 
          : '/api')
      const response = await fetch(`${backendHost}/analyze-website`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ url: targetUrl })
      })

      const responseData = await response.json()

      if (!response.ok) {
        if (response.status === 403 && responseData.limitReached) {
          setLimitReached(true)
          setScanCount(3)
        }
        throw new Error(responseData.error || 'Diagnostic audit failed.')
      }

      setReport(responseData)
      if (responseData.scanCount !== undefined) {
        setScanCount(responseData.scanCount)
        if (responseData.scanCount >= 3) {
          setLimitReached(true)
        }
      }
    } catch (err: any) {
      setScanError(err.message || 'Something went wrong during analysis.')
    } finally {
      setIsScanning(false)
    }
  }

  // Handle inline login / signup
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError('')

    try {
      if (authMode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword
        })
        if (error) throw error
        console.log('Login success:', data)
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: {
            data: {
              full_name: authName
            }
          }
        })
        if (error) throw error
        console.log('Signup success:', data)
        if (!data.session) {
          setAuthError('Account created! Please check your email to verify.')
        }
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed.')
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'seo': return <Globe className="w-4 h-4 text-sky-500" />
      case 'performance': return <Activity className="w-4 h-4 text-emerald-500" />
      case 'tracking': return <Code className="w-4 h-4 text-indigo-500" />
      case 'copywriting': return <LineChart className="w-4 h-4 text-amber-500" />
      default: return <FileText className="w-4 h-4 text-slate-500" />
    }
  }

  const getSeverityPill = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <span className="text-[10px] font-bold text-red-500 bg-red-500/10 dark:bg-red-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Critical Leak</span>
      case 'warning':
        return <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 dark:bg-orange-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Growth Warning</span>
      case 'optimized':
      default:
        return <span className="text-[10px] font-bold text-green-500 bg-green-500/10 dark:bg-green-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Optimized</span>
    }
  }

  return (
    <main className="min-h-screen bg-sand-bg pt-32 pb-24 overflow-hidden relative transition-colors duration-300">
      {/* Decorative Glows */}
      <div className="ambient-blob blob-orange w-[500px] h-[500px] top-[10%] left-[-100px] opacity-10" />
      <div className="ambient-blob blob-purple w-[600px] h-[600px] bottom-[10%] right-[-100px] opacity-10" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-bold text-sand-textSecondary hover:text-sand-purple uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-sand-orange tracking-widest uppercase bg-sand-orange/10 px-4 py-1.5 rounded-full inline-block">
            Sand AI Diagnostic Suite
          </span>
          <h1 className="font-poppins text-4xl md:text-6xl font-black text-sand-textPrimary leading-none tracking-tight">
            The Diagnostic.
          </h1>
          <p className="text-lg md:text-xl text-sand-textSecondary leading-relaxed font-light max-w-2xl mx-auto">
            Inspect your marketing architecture, discover where conversions are dropping, and acquire a clear optimization checklist.
          </p>
        </div>

        {/* Tab Toggle buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-sand-cardPurple/40 dark:bg-white/5 border border-sand-border p-1.5 rounded-2xl shadow-inner">
            <button
              onClick={() => setActiveTab('booking')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${
                activeTab === 'booking'
                  ? 'bg-sand-purple text-white shadow'
                  : 'text-sand-textSecondary hover:text-sand-textPrimary'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Schedule 1:1 Live Deep-Dive
            </button>
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${
                activeTab === 'scanner'
                  ? 'bg-sand-purple text-white shadow'
                  : 'text-sand-textSecondary hover:text-sand-textPrimary'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Instant AI Website Scan
            </button>
          </div>
        </div>

        {/* MAIN TOGGLED SECTIONS */}
        <div className="transition-all duration-300">
          
          {/* TAB 1: Booking & Team details */}
          {activeTab === 'booking' && (
            <div className="space-y-20 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-6 space-y-6">
                  <h2 className="font-poppins text-3xl font-black text-sand-textPrimary tracking-tight">
                    Collaborate live on your setup.
                  </h2>
                  <p className="text-base text-sand-textSecondary leading-relaxed font-light">
                    A collaborative video call to screen-share and inspect your tracking configurations, domain settings, ad routing triggers, and website conversions.
                  </p>
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-3 text-sm font-medium text-sand-textSecondary">
                      <Shield className="w-5 h-5 text-sand-purple flex-shrink-0" />
                      Zero sales pitch. pure engineering audit.
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-sand-textSecondary">
                      <MapPin className="w-5 h-5 text-sand-purple flex-shrink-0" />
                      Optimized for Tier-2 Indian agencies & brands.
                    </div>
                  </div>
                </div>

                <div ref={schedulerRef} className="lg:col-span-6 bg-white dark:bg-slate-900 border border-sand-border rounded-3xl overflow-hidden shadow-2xl p-1.5">
                  <div className="bg-sand-bg/50 px-4 py-3 border-b border-sand-border flex items-center justify-between text-xs rounded-t-2xl">
                    <span className="font-semibold text-sand-textPrimary flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sand-orange" />
                      Direct Calendar Booking
                    </span>
                    <span className="text-[10px] text-green-500 font-bold bg-green-500/10 px-2.5 py-0.5 rounded-full">
                      Available Online
                    </span>
                  </div>
                  {/* Embedded cal.com scheduler */}
                  <div className="w-full h-[500px]">
                    <iframe
                      src="https://cal.com/adikri/30min?embed=true"
                      className="w-full h-full border-0"
                      title="Cal.com Diagnostic Booking"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>

              {/* Grid Section: Team & Process */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-sand-border pt-16">
                {/* Left Column: Who You Speak With */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-2">
                    <h3 className="font-poppins text-2xl font-bold text-sand-textPrimary">
                      Who you’ll speak with
                    </h3>
                    <p className="text-sm text-sand-textSecondary font-light">
                      We review your channels and tech stack live. No placeholders, no intermediaries.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Bio 1 */}
                    <div className="bg-sand-cardPurple/50 dark:bg-white/5 border border-sand-border rounded-2xl p-6 space-y-3">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-poppins font-bold text-sand-textPrimary text-base">
                          Srivatsa N
                        </h4>
                        <span className="text-[10px] font-bold text-sand-purple uppercase tracking-wider">
                          Strategy & Growth
                        </span>
                      </div>
                      <p className="text-xs text-sand-textSecondary leading-relaxed font-light">
                        Background in decision science and B2B growth systems. Focuses on diagnosing where buyer interest breaks down between search intent, landing page copy, and final conversion triggers.
                      </p>
                    </div>

                    {/* Bio 2 */}
                    <div className="bg-sand-cardPurple/50 dark:bg-white/5 border border-sand-border rounded-2xl p-6 space-y-3">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-poppins font-bold text-sand-textPrimary text-base">
                          Adithya K V
                        </h4>
                        <span className="text-[10px] font-bold text-sand-purple uppercase tracking-wider">
                          Tech & Execution
                        </span>
                      </div>
                      <p className="text-xs text-sand-textSecondary leading-relaxed font-light">
                        Builds and operates pipeline software and automation stacks. Approaches websites, APIs, and ad tracking pixels as code: highly measurable, but fragile under wrong configurations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: The Process */}
                <div className="lg:col-span-7 space-y-8">
                  <h3 className="font-poppins text-2xl font-bold text-sand-textPrimary">
                    We trace the path from intent to action.
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3 p-4 bg-sand-cardPurple/20 dark:bg-white/5 border border-sand-border rounded-2xl">
                      <div className="w-8 h-8 rounded-full bg-sand-purple/10 text-sand-purple flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <h4 className="font-poppins font-bold text-sand-textPrimary text-sm">
                        Review Surfaces
                      </h4>
                      <p className="text-xs text-sand-textSecondary leading-relaxed font-light">
                        We look at your homepage, pricing page, and landing pages. Wherever intent meets explanations.
                      </p>
                    </div>

                    <div className="space-y-3 p-4 bg-sand-cardPurple/20 dark:bg-white/5 border border-sand-border rounded-2xl">
                      <div className="w-8 h-8 rounded-full bg-sand-purple/10 text-sand-purple flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      <h4 className="font-poppins font-bold text-sand-textPrimary text-sm">
                        Trace One Channel
                      </h4>
                      <p className="text-xs text-sand-textSecondary leading-relaxed font-light">
                        We select one primary acquisition channel—Search, Meta ads, or Organic—and trace the entire conversion sequence.
                      </p>
                    </div>

                    <div className="space-y-3 p-4 bg-sand-cardPurple/20 dark:bg-white/5 border border-sand-border rounded-2xl">
                      <div className="w-8 h-8 rounded-full bg-sand-purple/10 text-sand-purple flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <h4 className="font-poppins font-bold text-sand-textPrimary text-sm">
                        Name the Leak
                      </h4>
                      <p className="text-xs text-sand-textSecondary leading-relaxed font-light">
                        We isolate where attention drops, why it drops, and supply a concrete checklist to repair it.
                      </p>
                    </div>
                  </div>

                  {/* Fictionalized Case Study */}
                  <div className="border border-sand-border bg-sand-cardPurple/30 dark:bg-white/5 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-sand-orange uppercase tracking-wider">
                        Real-world Pattern Example
                      </span>
                      <span className="text-xs text-sand-textSecondary font-semibold">
                        Traffic to Demo Funnel
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-sand-textSecondary">
                      <div className="space-y-2 border-l border-sand-border pl-4">
                        <h5 className="font-bold text-sand-textPrimary">The Issue:</h5>
                        <p className="leading-relaxed font-light">
                          Landing page lists generic product features and dashboard integrations. High traffic, but visitors leave thinking "maybe later."
                        </p>
                      </div>
                      <div className="space-y-2 border-l border-sand-border pl-4">
                        <h5 className="font-bold text-sand-textPrimary">The Repair:</h5>
                        <p className="leading-relaxed font-light">
                          Open with the exact search pain point. Establish core authority first, then introduce features. Conversion rate jumps from 0.5% to 3.5%.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AI Website Scanner */}
          {activeTab === 'scanner' && (
            <div className="animate-fadeIn max-w-4xl mx-auto">
              
              {/* SECTION A: Logged Out State - Inline Auth Gating */}
              {!user ? (
                <div className="bg-sand-cardPurple/70 dark:bg-slate-900 border border-sand-border p-8 md:p-12 rounded-3xl shadow-2xl relative">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <LockKeyhole className="w-24 h-24 text-sand-purple" />
                  </div>
                  
                  <div className="text-center max-w-md mx-auto mb-8 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-sand-purple/10 text-sand-purple flex items-center justify-center mx-auto shadow-inner">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold font-poppins text-sand-textPrimary">
                      Unlock Your AI Website Scan
                    </h3>
                    <p className="text-xs md:text-sm text-sand-textSecondary font-light leading-relaxed">
                      Register or sign in below to verify your details and access our Nvidia NIM-powered scanner.
                    </p>
                  </div>

                  {authError && (
                    <div className="max-w-md mx-auto bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 p-4 rounded-xl text-xs mb-6 border border-red-100 dark:border-red-900/50 italic text-center">
                      {authError}
                    </div>
                  )}

                  <form onSubmit={handleAuthSubmit} className="max-w-md mx-auto space-y-4">
                    {authMode === 'signup' && (
                      <div>
                        <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Full Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={authName}
                            onChange={(e) => setAuthName(e.target.value)}
                            className="w-full pl-11 pr-5 py-3 text-xs md:text-sm rounded-xl bg-sand-bg dark:bg-white/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all text-sand-textPrimary"
                            placeholder="John Doe"
                          />
                          <User className="w-4 h-4 text-sand-textSecondary absolute left-4 top-3.5" />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={authEmail}
                          onChange={(e) => setAuthEmail(e.target.value)}
                          className="w-full pl-11 pr-5 py-3 text-xs md:text-sm rounded-xl bg-sand-bg dark:bg-white/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all text-sand-textPrimary"
                          placeholder="name@company.com"
                        />
                        <Mail className="w-4 h-4 text-sand-textSecondary absolute left-4 top-3.5" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Password</label>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          value={authPassword}
                          onChange={(e) => setAuthPassword(e.target.value)}
                          className="w-full pl-11 pr-5 py-3 text-xs md:text-sm rounded-xl bg-sand-bg dark:bg-white/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all text-sand-textPrimary"
                          placeholder="••••••••"
                        />
                        <Lock className="w-4 h-4 text-sand-textSecondary absolute left-4 top-3.5" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full bg-sand-purple hover:bg-[#524EFA] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sand-purple/20 transition-all flex items-center justify-center gap-2 text-xs md:text-sm mt-6"
                    >
                      {authLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : authMode === 'login' ? (
                        'Sign In'
                      ) : (
                        'Create Free Account'
                      )}
                    </button>
                  </form>

                  <div className="relative max-w-md mx-auto my-6 text-center">
                    <span className="bg-sand-cardPurple dark:bg-slate-900 px-4 text-xs text-sand-textSecondary relative z-10 font-medium">Or continue with</span>
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-sand-border" />
                  </div>

                  <div className="max-w-md mx-auto">
                    <button
                      onClick={handleGoogleAuth}
                      className="w-full bg-white dark:bg-white/5 border border-sand-border text-sand-textPrimary font-bold py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-3 text-xs md:text-sm"
                    >
                      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
                      Sign in with Google
                    </button>
                  </div>

                  <p className="mt-8 text-center text-xs md:text-sm text-sand-textSecondary font-medium">
                    {authMode === 'login' ? (
                      <>
                        Don't have an account?{' '}
                        <button onClick={() => setAuthMode('signup')} className="text-sand-purple font-bold hover:underline">
                          Sign up
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
              ) : (
                
                // SECTION B: Logged In State - Scanner Dashboard
                <div className="space-y-12">
                  
                  {/* Scanner Input Card */}
                  <div className="bg-sand-cardPurple/70 dark:bg-slate-900 border border-sand-border p-8 rounded-3xl shadow-xl space-y-6">
                    {limitReached || scanCount >= 3 ? (
                      <div className="text-center py-6 space-y-6 animate-fadeIn">
                        <div className="inline-flex p-3 rounded-full bg-sand-orange/10 text-sand-orange">
                          <AlertTriangle className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-poppins text-xl md:text-2xl font-black text-sand-textPrimary tracking-tight">
                            Free Diagnostic Limit Reached
                          </h3>
                          <p className="text-xs md:text-sm text-sand-textSecondary max-w-md mx-auto leading-relaxed font-light">
                            You have used your 3 free website scans ({scanCount}/3). Schedule a 1:1 Live Deep-Dive screen share call with our engineering and growth team to perform more scans and review your marketing architecture.
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                          <button
                            onClick={() => {
                              setActiveTab('booking')
                              schedulerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                            }}
                            className="bg-sand-purple text-white px-8 py-3.5 rounded-xl text-xs md:text-sm font-bold shadow-lg shadow-sand-purple/20 hover:bg-sand-purple/95 transition-colors flex items-center justify-center gap-2 group cursor-pointer"
                          >
                            <Calendar className="w-4 h-4" />
                            Book 1:1 Diagnostic Call
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-sand-purple" />
                            <span className="text-xs font-bold text-sand-textPrimary uppercase tracking-wider">
                              Verify Website Status ({scanCount}/3 scans used)
                            </span>
                          </div>
                          <span className="text-[10px] text-sand-purple bg-sand-purple/10 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                            Active Account
                          </span>
                        </div>

                        <form onSubmit={handleRunScan} className="space-y-4">
                          <div className="flex flex-col md:flex-row gap-3">
                            <div className="relative flex-grow">
                              <input
                                type="text"
                                required
                                disabled={isScanning}
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-sand-bg dark:bg-white/5 border border-sand-border focus:ring-2 focus:ring-sand-purple/20 focus:border-sand-purple outline-none transition-all font-medium text-xs md:text-sm text-sand-textPrimary placeholder:text-sand-textSecondary/60"
                                placeholder="e.g. mybusiness.com or https://example.com"
                              />
                              <Globe className="w-4 h-4 text-sand-textSecondary absolute left-4.5 top-4.5" />
                            </div>
                            <button
                              type="submit"
                              disabled={isScanning || !url}
                              className="rounded-2xl bg-sand-orange px-8 py-4 text-xs md:text-sm font-bold text-white shadow-lg shadow-sand-orange/20 hover:bg-[#E67A00] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
                            >
                              {isScanning ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Scanning...
                                </>
                              ) : (
                                <>
                                  Analyze Website
                                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                              )}
                            </button>
                          </div>
                        </form>

                        {scanError && (
                          <div className="bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 p-4 rounded-xl text-xs border border-red-100 dark:border-red-900/50 italic">
                            Error: {scanError}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* LOADING SEQUENCE ANIMATION */}
                  {isScanning && (
                    <div className="bg-sand-cardPurple/40 dark:bg-slate-900 border border-sand-border rounded-3xl p-8 md:p-12 shadow-inner space-y-8 text-center relative overflow-hidden backdrop-blur-md">
                      {/* Glow backgrounds */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-sand-purple/10 rounded-full blur-3xl pointer-events-none" />
                      
                      {/* Premium Rotating AI Spinner */}
                      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-[3px] border-sand-purple/10 border-t-sand-purple animate-spin" />
                        <div className="absolute w-16 h-16 rounded-full border-[3px] border-sand-orange/15 border-b-sand-orange animate-spin [animation-duration:1.5s] [animation-direction:reverse]" />
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sand-purple to-sand-orange opacity-35 animate-pulse blur-[1px]" />
                      </div>
                      
                      <div className="space-y-3 relative z-10">
                        <h4 className="font-poppins font-bold text-xl text-sand-textPrimary tracking-wide animate-pulse">Running AI Website Audit</h4>
                        <p className="text-xs text-sand-textSecondary max-w-md mx-auto">
                          Analyzing HTML structures, script weights, tag tracking configurations, and copywriting conversions via Nvidia NIM.
                        </p>
                      </div>

                      {/* Ticking logs */}
                      <div className="bg-sand-bg/80 dark:bg-white/5 rounded-2xl p-5 border border-sand-border max-w-lg mx-auto text-left font-mono text-[10px] space-y-2 text-sand-textSecondary shadow-sm relative z-10">
                        {SCAN_LOADER_STAGES.map((stage, idx) => {
                          const isDone = scanStepIndex > idx
                          const isActive = scanStepIndex === idx
                          return (
                            <div key={idx} className={`flex items-center gap-2 ${isDone ? 'text-sand-purple font-medium' : isActive ? 'text-sand-textPrimary font-semibold' : 'opacity-40'}`}>
                              <span>{isDone ? '✔' : isActive ? '➜' : '◦'}</span>
                              <span>{stage}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* SCAN REPORT DASHBOARD */}
                  {report && !isScanning && (
                    <div className="space-y-8 animate-fadeIn">
                      
                      {/* Executive Header Box */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-sand-cardPurple/70 dark:bg-slate-900 border border-sand-border p-8 rounded-3xl shadow-2xl">
                        
                        {/* Circle Gauge Score */}
                        <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-3 border-b lg:border-b-0 lg:border-r border-sand-border pb-6 lg:pb-0 lg:pr-6">
                          <div className="relative w-32 h-32">
                            {/* SVG gauge */}
                            <svg className="w-full h-full transform -rotate-90">
                              <circle
                                cx="64"
                                cy="64"
                                r="54"
                                className="stroke-sand-border"
                                strokeWidth="8"
                                fill="transparent"
                              />
                              <circle
                                cx="64"
                                cy="64"
                                r="54"
                                className="stroke-sand-orange transition-all duration-1000"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={2 * Math.PI * 54}
                                strokeDashoffset={2 * Math.PI * 54 * (1 - report.score / 100)}
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-3xl font-black text-sand-textPrimary font-poppins">{report.score}</span>
                              <span className="text-[9px] uppercase font-bold text-sand-textSecondary tracking-wider">Audit Score</span>
                            </div>
                          </div>
                          
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                            report.score < 50 
                              ? 'text-red-500 bg-red-500/10' 
                              : report.score < 75 
                                ? 'text-orange-500 bg-orange-500/10' 
                                : 'text-green-500 bg-green-500/10'
                          }`}>
                            {report.score < 50 ? 'Critical Attention' : report.score < 75 ? 'Needs Improvement' : 'Fully Optimized'}
                          </span>
                        </div>

                        {/* Executive Summary */}
                        <div className="lg:col-span-8 space-y-4">
                          <span className="text-[10px] font-bold text-sand-purple uppercase tracking-widest block">Executive Analysis</span>
                          <h3 className="text-xl font-bold font-poppins text-sand-textPrimary leading-snug">
                            Detailed Conversion & Structural Audit
                          </h3>
                          <p className="text-xs md:text-sm text-sand-textSecondary font-light leading-relaxed">
                            {report.summary}
                          </p>
                        </div>
                      </div>

                      {/* Sub-metrics Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { key: 'seo', label: 'SEO Config', score: report.scores.seo, color: 'bg-sky-500' },
                          { key: 'performance', label: 'Speed & Perf', score: report.scores.performance, color: 'bg-emerald-500' },
                          { key: 'tracking', label: 'Pixel Tracking', score: report.scores.tracking, color: 'bg-indigo-500' },
                          { key: 'copywriting', label: 'Copy & Conversion', score: report.scores.copywriting, color: 'bg-amber-500' }
                        ].map((metric) => (
                          <div key={metric.key} className="bg-sand-cardPurple/30 dark:bg-white/5 border border-sand-border rounded-2xl p-5 space-y-3">
                            <span className="text-[10px] font-bold text-sand-textSecondary uppercase tracking-wider block">
                              {metric.label}
                            </span>
                            <div className="flex items-baseline justify-between">
                              <span className="text-2xl font-black text-sand-textPrimary font-poppins">{metric.score}</span>
                              <span className="text-[9px] text-sand-textSecondary font-medium">/100</span>
                            </div>
                            <div className="w-full h-1.5 bg-sand-border rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${metric.color} transition-all duration-700`}
                                style={{ width: `${metric.score}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Audit Details - Checklist Accordion */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-sand-orange" />
                          <h4 className="text-xs font-bold text-sand-textPrimary uppercase tracking-wider">Identified Issues Checklist</h4>
                        </div>

                        <div className="space-y-3">
                          {report.issues.map((issue, idx) => {
                            const isExpanded = expandedIssueIndex === idx
                            return (
                              <div 
                                key={idx} 
                                className="bg-white dark:bg-slate-900 border border-sand-border rounded-2xl overflow-hidden transition-all shadow-sm"
                              >
                                {/* Accordion Header */}
                                <button
                                  onClick={() => setExpandedIssueIndex(isExpanded ? null : idx)}
                                  className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-sand-cardPurple/10"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-sand-cardPurple dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                                      {getCategoryIcon(issue.category)}
                                    </div>
                                    <div>
                                      <h5 className="text-sm font-bold text-sand-textPrimary font-poppins">
                                        {issue.title}
                                      </h5>
                                      <span className="text-[9px] text-sand-textSecondary uppercase font-medium tracking-wider">
                                        {issue.category} Check
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-3">
                                    {getSeverityPill(issue.severity)}
                                    {isExpanded ? (
                                      <ChevronUp className="w-4 h-4 text-sand-textSecondary" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-sand-textSecondary" />
                                    )}
                                  </div>
                                </button>

                                {/* Accordion Body */}
                                {isExpanded && (
                                  <div className="px-5 pb-5 pt-1 border-t border-sand-border/50 bg-sand-cardPurple/10 space-y-4 animate-slideDown">
                                    <div className="space-y-1">
                                      <span className="text-[10px] font-bold text-sand-textSecondary uppercase tracking-wider block">Detailed Critique</span>
                                      <p className="text-xs md:text-sm text-sand-textSecondary leading-relaxed font-light">
                                        {issue.description}
                                      </p>
                                    </div>

                                    {/* Sand AI Fix Block */}
                                    <div className="border border-sand-purple/20 bg-sand-purple/5 p-4 rounded-xl space-y-3">
                                      <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-sand-purple" />
                                        <span className="text-[10px] font-bold text-sand-purple uppercase tracking-wider">Sand AI Resolution Recommendation</span>
                                      </div>
                                      <p className="text-xs text-sand-textSecondary leading-relaxed font-light">
                                        {issue.recommendation}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Direct Live Session CTA */}
                      <div className="bg-gradient-to-r from-sand-purple to-sand-deepPurple text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 text-center md:text-left">
                          <h4 className="font-poppins font-black text-xl md:text-2xl leading-none">
                            Ready to repair these conversion leaks?
                          </h4>
                          <p className="text-xs text-white/70 font-light max-w-lg leading-relaxed">
                            Schedule your free 30-minute deep-dive screen share with our engineers. We will trace these vulnerabilities and show you how to implement god-tier developer and analytics structures.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab('booking')
                            setTimeout(() => {
                              schedulerRef.current?.scrollIntoView({ behavior: 'smooth' })
                            }, 100)
                          }}
                          className="rounded-full bg-sand-orange px-8 py-4 text-xs md:text-sm font-bold text-white shadow-lg shadow-sand-orange/20 hover:bg-[#E67A00] transition-all whitespace-nowrap"
                        >
                          Book 1:1 Live Deep-Dive
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </main>
  )
}
