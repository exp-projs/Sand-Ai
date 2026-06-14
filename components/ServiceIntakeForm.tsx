'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react'

interface ServiceIntakeFormProps {
  serviceType: string
  serviceName: string
  colorVariant?: 'purple' | 'orange'
}

export default function ServiceIntakeForm({
  serviceType,
  serviceName,
  colorVariant = 'purple',
}: ServiceIntakeFormProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [currentPath, setCurrentPath] = useState('')

  // Form inputs
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  
  // Dynamic fields state
  const [param1, setParam1] = useState('')
  const [param2, setParam2] = useState('')
  const [param3, setParam3] = useState('')

  // Submit states
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const router = useRouter()
  const themeColor = colorVariant === 'orange' ? 'sand-orange' : 'sand-purple'
  const themeBg = colorVariant === 'orange' ? 'bg-sand-orange' : 'bg-sand-purple'
  const borderFocus = colorVariant === 'orange' ? 'focus:border-sand-orange focus:ring-sand-orange/20' : 'focus:border-sand-purple focus:ring-sand-purple/20'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname)
    }

    // Check user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        setName(session.user.user_metadata?.full_name || '')
        setEmail(session.user.email || '')
      }
      setLoadingUser(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        setName(session.user.user_metadata?.full_name || '')
        setEmail(session.user.email || '')
      } else {
        setUser(null)
      }
      setLoadingUser(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSubmitting(true)
    setErrorMsg('')

    const detailsObj: Record<string, string> = {}
    if (serviceType === 'google-mcc') {
      detailsObj['Number of Ad Accounts'] = param1
      detailsObj['Estimated Monthly Spend'] = param2
    } else if (serviceType === 'meta-business-manager') {
      detailsObj['Facebook Page URL'] = param1
      detailsObj['Estimated Monthly Spend'] = param2
    } else if (serviceType === 'looker-studio') {
      detailsObj['Reporting Frequency'] = param1
      detailsObj['Data Sources Requested'] = param2
    } else if (serviceType === 'crm-integration') {
      detailsObj['Preferred Platform'] = param1
      detailsObj['Lead Capture Sources'] = param2
    } else if (serviceType === 'client-communication') {
      detailsObj['Preferred Channels'] = param1
      detailsObj['Team Size'] = param2
    }

    try {
      // 1. Attempt insert into leads table
      const { error } = await supabase.from('leads').insert({
        user_id: user.id,
        name,
        email,
        phone: whatsapp,
        service_type: serviceType,
        details: JSON.stringify(detailsObj),
        status: 'pending'
      })

      // 2. Fallback to todos table if leads table is missing
      if (error) {
        console.warn('Leads table insert failed, running fallback to todos table:', error.message)
        const fallbackText = JSON.stringify({
          leads_table_fallback: true,
          user_id: user.id,
          name,
          email,
          phone: whatsapp,
          service_type: serviceType,
          details: detailsObj
        })
        const { error: todoError } = await supabase.from('todos').insert({
          name: fallbackText
        })
        if (todoError) throw todoError
      }

      // 3. Trigger n8n Webhook if configured
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'service_request_submitted',
              timestamp: new Date().toISOString(),
              user: {
                id: user.id,
                name,
                email
              },
              whatsapp,
              serviceType,
              serviceName,
              details: detailsObj
            })
          })
        } catch (webhookErr) {
          console.error('Failed to trigger n8n webhook:', webhookErr)
        }
      } else {
        console.warn('NEXT_PUBLIC_N8N_WEBHOOK_URL environment variable is not defined.')
      }

      setSuccess(true)
    } catch (err: any) {
      console.error('Form submission error:', err)
      setErrorMsg(err.message || 'An error occurred during submission. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className={`w-8 h-8 rounded-full border-4 border-t-transparent animate-spin ${colorVariant === 'orange' ? 'border-sand-orange' : 'border-sand-purple'}`} />
      </div>
    )
  }

  // Lock screen wrapper for unauthenticated users
  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto bg-white dark:bg-sand-cardPurple rounded-3xl border border-sand-border shadow-xl p-8 text-center space-y-6 relative overflow-hidden"
      >
        <div className={`absolute top-0 left-0 w-full h-1.5 ${themeBg}`} />
        <div className="mx-auto w-16 h-16 rounded-full bg-sand-border/20 flex items-center justify-center text-sand-textSecondary">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-sand-textPrimary">Authentication Required</h3>
          <p className="text-sand-textSecondary text-sm max-w-sm mx-auto leading-relaxed">
            Please sign in or create an account to request setup for <strong className="text-sand-textPrimary font-bold">{serviceName}</strong>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <button
            onClick={() => router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)}
            className={`px-8 py-3.5 rounded-2xl font-bold text-sm text-white ${themeBg} hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
          >
            Sign In
          </button>
          <button
            onClick={() => router.push(`/signup?redirect=${encodeURIComponent(currentPath)}`)}
            className="px-8 py-3.5 rounded-2xl font-bold text-sm text-sand-textPrimary bg-sand-cardPurple/10 dark:bg-white/5 border border-sand-border hover:bg-sand-cardPurple/20 transition-colors"
          >
            Create Account
          </button>
        </div>
      </motion.div>
    )
  }

  // Success Screen
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto bg-white dark:bg-sand-cardPurple rounded-3xl border border-sand-border shadow-xl p-8 text-center space-y-6 relative overflow-hidden"
      >
        <div className={`absolute top-0 left-0 w-full h-1.5 ${themeBg}`} />
        <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-sand-textPrimary">Request Received!</h3>
          <p className="text-sand-textSecondary text-sm max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-sand-textPrimary font-semibold">{name}</strong>. Your setup request for <strong className="text-sand-textPrimary font-semibold">{serviceName}</strong> has been logged. Our integration team will contact you on WhatsApp shortly.
          </p>
        </div>
        <div className="pt-4 border-t border-sand-border">
          <p className="text-[10px] text-sand-textSecondary">
            A confirmation webhook has been sent to n8n. Ref ID: {user.id.substring(0, 8)}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white dark:bg-sand-cardPurple rounded-3xl border border-sand-border shadow-2xl p-8 relative overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-full h-1.5 ${themeBg}`} />
      
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${themeBg}`}>
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-extrabold text-xl text-sand-textPrimary">Request Setup</h3>
          <p className="text-xs text-sand-textSecondary">Fill details to initialize database sync & n8n notifications</p>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-50 dark:bg-red-950/20 text-red-500 p-4 rounded-xl text-xs flex items-center gap-3 border border-red-100 dark:border-red-950/50 mb-6 italic">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl bg-sand-cardPurple/5 dark:bg-white/5 border border-sand-border outline-none transition-all text-sm text-sand-textPrimary font-semibold ${borderFocus}`}
              placeholder="e.g. Rahul Sharma"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl bg-sand-cardPurple/5 dark:bg-white/5 border border-sand-border outline-none transition-all text-sm text-sand-textPrimary font-semibold ${borderFocus}`}
              placeholder="e.g. rahul@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">WhatsApp Number</label>
          <input
            type="tel"
            required
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-sand-cardPurple/5 dark:bg-white/5 border border-sand-border outline-none transition-all text-sm text-sand-textPrimary font-semibold ${borderFocus}`}
            placeholder="e.g. +91 98765 43210"
          />
        </div>

        {/* Dynamic Fields based on serviceType */}
        {serviceType === 'google-mcc' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Number of Ad Accounts</label>
              <select
                required
                value={param1}
                onChange={(e) => setParam1(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-sand-border outline-none transition-all text-sm text-sand-textPrimary font-semibold ${borderFocus}`}
              >
                <option value="">Select Accounts</option>
                <option value="1-3">1 to 3 Accounts</option>
                <option value="4-10">4 to 10 Accounts</option>
                <option value="10+">More than 10 Accounts</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Estimated Monthly Ad Spend</label>
              <select
                required
                value={param2}
                onChange={(e) => setParam2(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-sand-border outline-none transition-all text-sm text-sand-textPrimary font-semibold ${borderFocus}`}
              >
                <option value="">Select Spend</option>
                <option value="< ₹50K">Under ₹50K</option>
                <option value="₹50K - ₹2L">₹50K to ₹2 Lakhs</option>
                <option value="₹2L - ₹10L">₹2L to ₹10 Lakhs</option>
                <option value="> ₹10L">Above ₹10 Lakhs</option>
              </select>
            </div>
          </div>
        )}

        {serviceType === 'meta-business-manager' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Facebook Page / Instagram Profile URL</label>
              <input
                type="url"
                required
                value={param1}
                onChange={(e) => setParam1(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-sand-cardPurple/5 dark:bg-white/5 border border-sand-border outline-none transition-all text-sm text-sand-textPrimary font-semibold ${borderFocus}`}
                placeholder="e.g. facebook.com/yourbusiness"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Estimated Monthly Ad Spend</label>
              <select
                required
                value={param2}
                onChange={(e) => setParam2(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-sand-border outline-none transition-all text-sm text-sand-textPrimary font-semibold ${borderFocus}`}
              >
                <option value="">Select Spend</option>
                <option value="< ₹50K">Under ₹50K</option>
                <option value="₹50K - ₹2L">₹50K to ₹2 Lakhs</option>
                <option value="₹2L - ₹10L">₹2L to ₹10 Lakhs</option>
                <option value="> ₹10L">Above ₹10 Lakhs</option>
              </select>
            </div>
          </div>
        )}

        {serviceType === 'looker-studio' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Preferred Reporting Frequency</label>
              <select
                required
                value={param1}
                onChange={(e) => setParam1(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-sand-border outline-none transition-all text-sm text-sand-textPrimary font-semibold ${borderFocus}`}
              >
                <option value="">Select Frequency</option>
                <option value="Real-time / Live">Real-time / Live Link</option>
                <option value="Weekly Summary">Weekly Automated Emails</option>
                <option value="Monthly Review">Monthly Presentation</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Core Data Sources (e.g. Google Ads, Meta Ads)</label>
              <input
                type="text"
                required
                value={param2}
                onChange={(e) => setParam2(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-sand-cardPurple/5 dark:bg-white/5 border border-sand-border outline-none transition-all text-sm text-sand-textPrimary font-semibold ${borderFocus}`}
                placeholder="e.g. Meta, Google, GA4, Shopify"
              />
            </div>
          </div>
        )}

        {serviceType === 'crm-integration' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Preferred CRM Platform</label>
              <select
                required
                value={param1}
                onChange={(e) => setParam1(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-sand-border outline-none transition-all text-sm text-sand-textPrimary font-semibold ${borderFocus}`}
              >
                <option value="">Select Platform</option>
                <option value="Notion Workspace">Notion Workspace</option>
                <option value="Google Sheets">Google Sheets (Automated)</option>
                <option value="Airtable">Airtable Database</option>
                <option value="Other / Deciding">Other / Need consultation</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Lead Capture Sources</label>
              <input
                type="text"
                required
                value={param2}
                onChange={(e) => setParam2(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-sand-cardPurple/5 dark:bg-white/5 border border-sand-border outline-none transition-all text-sm text-sand-textPrimary font-semibold ${borderFocus}`}
                placeholder="e.g. Website Form, Facebook Lead Ads, WhatsApp"
              />
            </div>
          </div>
        )}

        {serviceType === 'client-communication' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Preferred Notification Channel</label>
              <select
                required
                value={param1}
                onChange={(e) => setParam1(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-sand-border outline-none transition-all text-sm text-sand-textPrimary font-semibold ${borderFocus}`}
              >
                <option value="">Select Channel</option>
                <option value="WhatsApp Business API">WhatsApp Business Alerts</option>
                <option value="Slack Channel Setup">Slack Channel Integrations</option>
                <option value="Both Channels">Both Slack & WhatsApp</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-sand-textPrimary mb-1.5 ml-1">Number of Team Members</label>
              <input
                type="number"
                min="1"
                required
                value={param2}
                onChange={(e) => setParam2(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-sand-cardPurple/5 dark:bg-white/5 border border-sand-border outline-none transition-all text-sm text-sand-textPrimary font-semibold ${borderFocus}`}
                placeholder="e.g. 5"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 ${themeBg}`}
        >
          {submitting ? 'Submitting Setup Request...' : `Request ${serviceName}`}
        </button>
      </form>
    </motion.div>
  )
}
