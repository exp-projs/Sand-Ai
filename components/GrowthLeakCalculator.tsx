'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ArrowRight, RotateCcw, AlertTriangle, Sparkles, Calendar } from 'lucide-react'
import { gsap } from '@/lib/gsap'

interface Question {
  id: number
  text: string
  options: {
    label: string
    value: string
    leakType: 'web' | 'ads' | 'analytics' | 'crm'
    points: number
  }[]
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What is your primary source of web traffic?',
    options: [
      { label: 'Paid Social (Meta Ads, Instagram, etc.)', value: 'meta', leakType: 'ads', points: 25 },
      { label: 'Paid Search (Google Ads, Bing, etc.)', value: 'google', leakType: 'ads', points: 15 },
      { label: 'Organic Search / SEO', value: 'seo', leakType: 'web', points: 20 },
      { label: 'Direct / Referrals / Word of mouth', value: 'direct', leakType: 'analytics', points: 10 },
    ],
  },
  {
    id: 2,
    text: 'What is the biggest conversion bottleneck you notice?',
    options: [
      { label: 'Lots of clicks/visitors, but very few submit forms.', value: 'web_leak', leakType: 'web', points: 30 },
      { label: 'Ad spend is rising, but lead volume and ROI are flat.', value: 'ads_leak', leakType: 'ads', points: 30 },
      { label: 'We get leads, but sales says they are poor quality / spam.', value: 'crm_leak', leakType: 'crm', points: 25 },
      { label: 'We do not have clear tracking; dashboards are missing or messy.', value: 'analytics_leak', leakType: 'analytics', points: 25 },
    ],
  },
  {
    id: 3,
    text: 'How do you currently route and manage new leads?',
    options: [
      { label: 'Manually copy-paste from emails or site backend.', value: 'manual', leakType: 'crm', points: 30 },
      { label: 'Automated to Google Sheets/Slack, but no CRM pipeline.', value: 'sheets', leakType: 'crm', points: 15 },
      { label: 'We have a CRM (HubSpot/Notion), but it is underutilized.', value: 'crm_ok', leakType: 'analytics', points: 20 },
      { label: 'Leads just sit in our database; we do not route them.', value: 'none', leakType: 'crm', points: 35 },
    ],
  },
  {
    id: 4,
    text: 'What happens immediately after a user submits a form?',
    options: [
      { label: 'They see a generic static "Thank You" message.', value: 'static', leakType: 'web', points: 15 },
      { label: 'They get an automated email confirmation.', value: 'email', leakType: 'crm', points: 10 },
      { label: 'They get a WhatsApp message & instant booking link.', value: 'whatsapp', leakType: 'analytics', points: 5 },
      { label: 'Our sales team calls them back hours or days later.', value: 'slow_call', leakType: 'crm', points: 25 },
    ],
  },
]

export default function GrowthLeakCalculator() {
  const [currentStep, setCurrentStep] = useState(0) // 0: Intro, 1-4: Questions, 5: Results
  const [answers, setAnswers] = useState<Record<number, typeof QUESTIONS[0]['options'][0]>>({})
  const [scores, setScores] = useState<Record<string, number>>({ web: 0, ads: 0, analytics: 0, crm: 0 })
  const [primaryLeak, setPrimaryLeak] = useState<string>('')
  
  const containerRef = useRef<HTMLDivElement>(null)
  const stepRef = useRef<HTMLDivElement>(null)

  const handleStart = () => {
    animateTransition(() => {
      setCurrentStep(1)
    })
  }

  const handleSelectOption = (questionId: number, option: typeof QUESTIONS[0]['options'][0]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }))
    
    // Smooth auto-advance delay
    setTimeout(() => {
      if (questionId < QUESTIONS.length) {
        animateTransition(() => {
          setCurrentStep(questionId + 1)
        })
      } else {
        // Calculate results
        const finalAnswers = { ...answers, [questionId]: option }
        const newScores = { web: 0, ads: 0, analytics: 0, crm: 0 }
        
        Object.values(finalAnswers).forEach((ans) => {
          newScores[ans.leakType] += ans.points
        })
        
        setScores(newScores)
        
        // Find highest score
        let maxType = 'web'
        let maxVal = newScores.web
        
        if (newScores.ads > maxVal) { maxType = 'ads'; maxVal = newScores.ads; }
        if (newScores.analytics > maxVal) { maxType = 'analytics'; maxVal = newScores.analytics; }
        if (newScores.crm > maxVal) { maxType = 'crm'; maxVal = newScores.crm; }
        
        setPrimaryLeak(maxType)
        
        animateTransition(() => {
          setCurrentStep(QUESTIONS.length + 1)
        })
      }
    }, 350)
  }

  const handleReset = () => {
    setAnswers({})
    setScores({ web: 0, ads: 0, analytics: 0, crm: 0 })
    setPrimaryLeak('')
    animateTransition(() => {
      setCurrentStep(0)
    })
  }

  const animateTransition = (callback: () => void) => {
    if (stepRef.current) {
      gsap.to(stepRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          callback()
          gsap.fromTo(
            stepRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
          )
        },
      })
    } else {
      callback()
    }
  }

  const getLeakDetails = (type: string) => {
    switch (type) {
      case 'web':
        return {
          title: 'Website & Conviction Leak',
          desc: 'Your traffic is landing, but they are not convinced. You need high-intent page restructuring and clearer value propositions.',
          checklist: ['Optimize Hero value propositions', 'Simplify form fields', 'Remove visual clutter', 'Add interactive philosophy blocks'],
        }
      case 'ads':
        return {
          title: 'Ad Optimization & Targeting Leak',
          desc: 'Your ad spend is leaking. The algorithms are chasing low-intent clicks. You need tighter audience alignment and feedback integrations.',
          checklist: ['Setup Meta Conversions API (CAPI)', 'Clean Google Ads search term reports', 'Deploy blended cost tracking dashboards', 'Exposed attribution discrepancies'],
        }
      case 'analytics':
        return {
          title: 'Analytics & Tracking Blindspot',
          desc: 'You are running blind. Dashboards show clicks, but fail to tie activities to direct CRM conversions and customer lifetime value.',
          checklist: ['Connect GA4 conversion events', 'Integrate Looker Studio live dashboards', 'Conduct full pixel audit', 'Setup custom attribution reports'],
        }
      case 'crm':
        default:
        return {
          title: 'CRM Routing & Follow-up Leak',
          desc: 'Leads are falling through the cracks due to manual routing or delayed follow-up. You need sub-minute notifications and automation.',
          checklist: ['Build automated lead-to-CRM pipeline', 'Deploy instant Slack & WhatsApp alerts', 'Reduce sales callback times to <2 minutes', 'Setup automated follow-up sequences'],
        }
    }
  }

  const leakInfo = getLeakDetails(primaryLeak)

  return (
    <section id="leak-calculator" ref={containerRef} className="py-24 bg-sand-bg border-t border-sand-border relative overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sand-cardPurple/30 pointer-events-none" />
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold text-sand-purple tracking-widest uppercase">
            Interactive Diagnostic
          </span>
          <h2 className="font-poppins text-3xl md:text-5xl font-black tracking-tight text-sand-textPrimary leading-none">
            Where is your marketing leaking?
          </h2>
          <p className="text-sand-textSecondary text-sm md:text-base font-light">
            Take our 2-minute diagnostic questionnaire to calculate your primary bottleneck and reveal a step-by-step roadmap to fix it.
          </p>
        </div>

        <div className="bg-sand-cardPurple/70 backdrop-blur-md rounded-3xl border border-sand-border p-8 md:p-12 shadow-2xl relative">
          <div ref={stepRef}>
            {/* Step 0: Intro */}
            {currentStep === 0 && (
              <div className="text-center space-y-8 py-6">
                <div className="w-16 h-16 rounded-full bg-sand-purple/10 text-sand-purple flex items-center justify-center mx-auto shadow-inner animate-pulse">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-sand-textPrimary font-poppins">
                    Ready to diagnose your growth setup?
                  </h3>
                  <p className="text-sand-textSecondary max-w-md mx-auto leading-relaxed text-sm font-light">
                    Analyze your current web presence, ads attribution, and sales routing systems. Get a custom audit report instantly.
                  </p>
                </div>
                <button
                  onClick={handleStart}
                  className="rounded-full bg-sand-orange px-8 py-4 text-base font-bold text-white shadow-lg shadow-sand-orange/20 hover:bg-[#E67A00] transition-colors inline-flex items-center gap-2 group"
                >
                  Start Diagnostic Quiz
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {/* Step 1-4: Questions */}
            {currentStep >= 1 && currentStep <= QUESTIONS.length && (
              <div className="space-y-8">
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-sand-textSecondary">
                    <span>Question {currentStep} of {QUESTIONS.length}</span>
                    <span>{Math.round((currentStep / QUESTIONS.length) * 100)}% Complete</span>
                  </div>
                  <div className="w-full h-1.5 bg-sand-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sand-purple to-sand-orange transition-all duration-300"
                      style={{ width: `${(currentStep / QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl md:text-2xl font-bold text-sand-textPrimary font-poppins leading-snug">
                    {QUESTIONS[currentStep - 1].text}
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {QUESTIONS[currentStep - 1].options.map((option) => {
                      const isSelected = answers[currentStep]?.value === option.value
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleSelectOption(currentStep, option)}
                          className={`w-full text-left p-5 rounded-2xl border text-sm md:text-base font-medium transition-all flex items-center justify-between group ${
                            isSelected
                              ? 'bg-sand-purple text-white border-sand-purple shadow-lg shadow-sand-purple/20'
                              : 'bg-sand-bg border-sand-border text-sand-textPrimary hover:border-sand-purple hover:bg-sand-purple/5'
                          }`}
                        >
                          <span>{option.label}</span>
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                            isSelected
                              ? 'bg-white text-sand-purple border-white'
                              : 'border-sand-border text-transparent group-hover:border-sand-purple'
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Results & Booking */}
            {currentStep > QUESTIONS.length && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Results Details */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-sand-orange/10 text-sand-orange flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-sand-orange tracking-widest block">
                          Primary Bottleneck Detected
                        </span>
                        <h4 className="text-xl font-bold text-sand-textPrimary font-poppins">
                          {leakInfo.title}
                        </h4>
                      </div>
                    </div>
                    
                    <p className="text-sm text-sand-textSecondary leading-relaxed font-light">
                      {leakInfo.desc}
                    </p>

                    <div className="space-y-3">
                      <span className="text-xs font-bold text-sand-textPrimary uppercase tracking-wider block">
                        Your Custom Action Checklist:
                      </span>
                      <ul className="space-y-2.5">
                        {leakInfo.checklist.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-sand-textSecondary font-light">
                            <span className="w-4 h-4 rounded-full bg-sand-purple/10 text-sand-purple flex items-center justify-center mt-0.5 flex-shrink-0">
                              ✓
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 text-xs font-bold text-sand-purple hover:text-sand-deep-purple transition-colors uppercase tracking-wider mt-4"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Retake Quiz
                    </button>
                  </div>

                  {/* Inline Cal.com Embed */}
                  <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-sand-border rounded-2xl overflow-hidden shadow-lg p-1">
                    <div className="bg-sand-bg/50 px-4 py-3 border-b border-sand-border flex items-center justify-between text-xs">
                      <span className="font-semibold text-sand-textPrimary flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-sand-orange" />
                        Book 30-min Diagnostic Call
                      </span>
                      <span className="text-[10px] text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded-full">
                        Free Session
                      </span>
                    </div>
                    {/* Embedded Calendar Scheduler */}
                    <div className="w-full h-[450px] relative">
                      <iframe
                        src="https://cal.com/adikri/30min?embed=true"
                        className="w-full h-full border-0"
                        title="Cal.com Booking Scheduler"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
