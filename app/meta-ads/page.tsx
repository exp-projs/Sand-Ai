'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductHero from '@/components/ProductHero'
import { Sparkles, Target, TrendingUp, Bell, Users } from 'lucide-react'

// Custom Facebook and Instagram icons because of package exports limitation
const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

// Copy data for dynamic interactive preview
const INDUSTRY_PREVIEWS = {
  grocery: {
    primaryText: "Get fresh fruits, organic vegetables, and daily essentials delivered to your doorstep in less than 30 minutes! Flat 20% off on your first order. Order via WhatsApp today.",
    headline: "Fresh Groceries, Delivered in 30 Mins! 🛒",
    buttonText: "Order Now",
    emoji: "🍎",
    bannerBg: "from-[#4CAF50]/20 to-[#8BC34A]/20",
    bannerIcon: "🛒",
    badgeText: "Local Delivery",
    targetAudience: "Families, Homemakers within 3km of shop",
    estimatedReach: "12,000 - 15,000 locals"
  },
  dental: {
    primaryText: "Book a comprehensive dental check-up, cleaning & scan starting at just ₹499. Expert dentists, zero-pain technology. Claim your slot now!",
    headline: "Get a Perfect Smile for ₹499! 🦷",
    buttonText: "Book Appointment",
    emoji: "✨",
    bannerBg: "from-[#2196F3]/20 to-[#00BCD4]/20",
    bannerIcon: "🦷",
    badgeText: "Dental Clinic",
    targetAudience: "Ages 22-60, within 5km radius",
    estimatedReach: "18,500 - 24,000 locals"
  },
  salon: {
    primaryText: "Indulge in a premium skin treatment, haircut & head massage at 40% off this weekend! Pamper yourself with our certified beauticians. Limited slots!",
    headline: "Weekend Pampering: Flat 40% Off! ✨",
    buttonText: "Claim Offer",
    emoji: "💇‍♀️",
    bannerBg: "from-[#E91E63]/20 to-[#9C27B0]/20",
    bannerIcon: "💄",
    badgeText: "Beauty & Spa",
    targetAudience: "Ages 18-45, interested in beauty & fashion",
    estimatedReach: "15,000 - 21,000 locals"
  }
}

export default function MetaAdsPage() {
  const [activeIndustry, setActiveIndustry] = React.useState<'grocery' | 'dental' | 'salon'>('grocery')
  const [activeTab, setActiveTab] = React.useState<'feed' | 'story' | 'form'>('feed')

  const currentPreview = INDUSTRY_PREVIEWS[activeIndustry]

  return (
    <main className="min-h-screen bg-sand-bg">
      <ProductHero 
        badge="AI-Powered Meta Ads"
        title="Stop Wasting Budget."
        highlightedTitle="Start Winning Customers."
        description="Launch high-converting Facebook and Instagram ads in minutes. SandAI writes the perfect copy, designs the scroll-stopping creative, finds your local target customers, and syncs leads in real-time."
        ctaText="Launch Your Ad Now"
        imageSrc="/icons/icon-meta-ads.jpg"
        colorVariant="orange"
      />

      {/* Benefits Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: <Sparkles />, 
              title: "AI Ad Writer", 
              desc: "Never stare at a blank page. Our AI crafts high-intent headlines and copy tailored for local Indian audiences." 
            },
            { 
              icon: <Target />, 
              title: "Hyperlocal Targeting", 
              desc: "Reach exact buyers within 3-5 km of your physical shop, clinic, or service point with pin-point precision." 
            },
            { 
              icon: <TrendingUp />, 
              title: "Budget Optimization", 
              desc: "Smart spend algorithms pause low-performing ads and scale winners automatically to boost your ROI." 
            },
            { 
              icon: <Bell />, 
              title: "Instant Lead Alerts", 
              desc: "Get instant WhatsApp notifications the moment a local customer fills out your ad form. No delay." 
            }
          ].map((benefit, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-sand-cardOrange/50 p-8 rounded-3xl border border-sand-border shadow-sm hover:shadow-orange-200/50 transition-shadow"
            >
              <div className="w-12 h-12 bg-sand-orange/10 rounded-2xl flex items-center justify-center text-sand-orange mb-6">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-xl text-sand-textPrimary mb-3">{benefit.title}</h3>
              <p className="text-sand-textSecondary text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Ad Preview Builder */}
      <section className="py-24 bg-sand-bg border-y border-sand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">
              AI builds, <span className="text-sand-orange">customers buy.</span>
            </h2>
            <p className="text-sand-textSecondary max-w-2xl mx-auto">
              Select your business type and toggle ad formats to see how SandAI designs high-converting creatives instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Controls Column */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Category Selector */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-sand-textSecondary uppercase tracking-widest px-1">1. Choose Business Category</div>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'grocery', label: 'Sharma Kirana (Grocery)', icon: '🛒' },
                    { id: 'dental', label: 'Verma Dental Clinic', icon: '🦷' },
                    { id: 'salon', label: 'Grace Beauty Salon', icon: '💇‍♀️' }
                  ].map((industry) => (
                    <button
                      key={industry.id}
                      onClick={() => setActiveIndustry(industry.id as any)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${activeIndustry === industry.id ? 'border-sand-orange bg-sand-cardOrange' : 'border-sand-border hover:border-sand-orange/30'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{industry.icon}</span>
                        <div>
                          <h4 className="font-bold text-sm text-sand-textPrimary">{industry.label}</h4>
                          <span className="text-[10px] text-sand-textSecondary uppercase font-medium">Automatic Creative Engine</span>
                        </div>
                      </div>
                      {activeIndustry === industry.id && <div className="w-5 h-5 rounded-full bg-sand-orange flex items-center justify-center text-white text-xs">✓</div>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format Selector */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-sand-textSecondary uppercase tracking-widest px-1">2. Toggle Ad Format</div>
                <div className="flex gap-2 p-1 bg-sand-cardPurple rounded-xl border border-sand-border">
                  {[
                    { id: 'feed', label: 'Feed Ad', icon: <Facebook className="w-4 h-4" /> },
                    { id: 'story', label: 'Story Ad', icon: <Instagram className="w-4 h-4" /> },
                    { id: 'form', label: 'Lead Form', icon: <Users className="w-4 h-4" /> }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-white shadow-sm text-sand-purple' : 'text-sand-textSecondary hover:text-sand-textPrimary'}`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Targeting Metrics Info Box */}
              <div className="p-6 rounded-2xl bg-sand-cardPurple border border-sand-border space-y-4">
                <div className="text-xs font-black uppercase text-sand-orange tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sand-orange animate-pulse" />
                  AI Hyperlocal targeting setup
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] text-sand-textSecondary uppercase font-bold">Estimated Reach</div>
                    <div className="text-lg font-bold text-sand-textPrimary mt-0.5">{currentPreview.estimatedReach}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-sand-textSecondary uppercase font-bold">Ad Health Score</div>
                    <div className="text-lg font-bold text-green-500 mt-0.5">9.8 / 10</div>
                  </div>
                </div>
                <div className="border-t border-sand-border pt-4">
                  <div className="text-[10px] text-sand-textSecondary uppercase font-bold">Targeted Audience Profile</div>
                  <div className="text-xs text-sand-textPrimary mt-1 font-semibold">{currentPreview.targetAudience}</div>
                </div>
              </div>

            </div>

            {/* Right Live Preview Column */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full max-w-[420px] aspect-[9/18] bg-sand-cardPurple rounded-[48px] border-[10px] border-gray-900 shadow-2xl p-2 relative overflow-hidden flex flex-col justify-between">
                
                <AnimatePresence mode="wait">
                  {/* FACEBOOK FEED AD PREVIEW */}
                  {activeTab === 'feed' && (
                    <motion.div
                      key="feed"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full bg-white text-gray-900 rounded-[38px] flex flex-col p-4 overflow-y-auto space-y-3 shadow-inner"
                    >
                      {/* FB Header */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">f</div>
                          <div>
                            <div className="text-xs font-bold flex items-center gap-1">
                              {activeIndustry === 'grocery' ? 'Sharma Kirana' : activeIndustry === 'dental' ? 'Verma Dental Clinic' : 'Grace Beauty Salon'}
                              <span className="text-blue-500">✓</span>
                            </div>
                            <div className="text-[9px] text-gray-500">Sponsored · 🌐</div>
                          </div>
                        </div>
                        <span className="text-gray-400 text-sm">•••</span>
                      </div>

                      {/* Primary text */}
                      <p className="text-[11px] leading-relaxed text-gray-800 font-medium">
                        {currentPreview.primaryText}
                      </p>

                      {/* Creative Image Panel */}
                      <div className={`relative aspect-video rounded-xl bg-gradient-to-br ${currentPreview.bannerBg} flex flex-col items-center justify-center p-6 text-center gap-3 overflow-hidden border border-gray-100`}>
                        <div className="absolute top-2 left-2 bg-black/60 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {currentPreview.badgeText}
                        </div>
                        <span className="text-5xl drop-shadow-md">{currentPreview.bannerIcon}</span>
                        <div className="space-y-1">
                          <h4 className="font-black text-sm text-gray-900 leading-tight">
                            {currentPreview.headline}
                          </h4>
                          <p className="text-[9px] text-gray-600 font-semibold">Special Offer Powered by SandAI</p>
                        </div>
                      </div>

                      {/* FB Footer CTA */}
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex justify-between items-center gap-4">
                        <div className="space-y-0.5">
                          <div className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">SANDAI.IN</div>
                          <div className="text-xs font-black text-gray-900 truncate max-w-[180px]">{currentPreview.headline}</div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-4 py-2 rounded-lg shrink-0 shadow transition-colors">
                          {currentPreview.buttonText}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* INSTAGRAM STORY AD PREVIEW */}
                  {activeTab === 'story' && (
                    <motion.div
                      key="story"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full bg-gradient-to-tr from-purple-900 to-indigo-950 text-white rounded-[38px] flex flex-col justify-between p-4 overflow-hidden relative"
                    >
                      {/* Top Progress Bar */}
                      <div className="w-full flex gap-1 pt-1.5 z-10">
                        <div className="h-0.5 bg-white flex-1 rounded-full opacity-80" />
                        <div className="h-0.5 bg-white/20 flex-1 rounded-full" />
                      </div>

                      {/* IG Story Header */}
                      <div className="flex items-center gap-2.5 mt-3 z-10">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-0.5">
                          <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs">📸</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1">
                            {activeIndustry === 'grocery' ? 'sharma_kirana' : activeIndustry === 'dental' ? 'verma_dental' : 'grace_salon'}
                          </div>
                          <div className="text-[8px] opacity-70">Sponsored</div>
                        </div>
                      </div>

                      {/* Main Message Content */}
                      <div className="flex-1 flex flex-col justify-center items-center text-center p-6 gap-6 z-10">
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl border border-white/10 shadow-2xl">
                          {currentPreview.emoji}
                        </div>
                        <h3 className="font-black text-2xl leading-tight bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                          {currentPreview.headline}
                        </h3>
                        <p className="text-xs text-gray-200 font-medium leading-relaxed max-w-[240px]">
                          {currentPreview.primaryText.substring(0, 100)}...
                        </p>
                      </div>

                      {/* Swipe Up Button */}
                      <div className="flex flex-col items-center gap-1.5 pb-4 z-10">
                        <span className="text-[10px] font-bold tracking-widest text-orange-400 uppercase animate-bounce">Swipe Up</span>
                        <div className="w-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/10 text-white text-xs font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg">
                          <span>{currentPreview.buttonText}</span>
                          <span>→</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* LEAD FORM PREVIEW */}
                  {activeTab === 'form' && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full bg-[#1A1A2E] text-white rounded-[38px] flex flex-col justify-between p-5 overflow-y-auto space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs opacity-75">
                          <span>Meta Lead Generation</span>
                          <span className="text-green-400 font-bold">● Secure Sync</span>
                        </div>
                        <div className="w-full h-px bg-white/10" />
                      </div>

                      <div className="space-y-4 text-center">
                        <span className="text-4xl">{currentPreview.emoji}</span>
                        <h4 className="font-extrabold text-lg text-white">
                          Claim Your Offer Now
                        </h4>
                        <p className="text-[10px] text-gray-400">
                          Confirm your details below to get instant WhatsApp confirmation.
                        </p>
                      </div>

                      {/* Lead form fields */}
                      <div className="space-y-3 flex-1 flex flex-col justify-center">
                        <div className="space-y-1">
                          <label className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Full Name</label>
                          <input 
                            type="text" 
                            disabled
                            placeholder="Rahul Sharma" 
                            className="w-full bg-white/5 border border-white/10 text-xs px-3.5 py-2.5 rounded-xl text-gray-300"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">WhatsApp Number</label>
                          <input 
                            type="text" 
                            disabled
                            placeholder="+91 98765 43210" 
                            className="w-full bg-white/5 border border-white/10 text-xs px-3.5 py-2.5 rounded-xl text-gray-300"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Your City</label>
                          <input 
                            type="text" 
                            disabled
                            placeholder="Indore, MP" 
                            className="w-full bg-white/5 border border-white/10 text-xs px-3.5 py-2.5 rounded-xl text-gray-300"
                          />
                        </div>
                      </div>

                      {/* Submit form button */}
                      <div className="pt-2">
                        <button className="w-full bg-sand-orange hover:bg-orange-600 text-white font-bold py-3.5 rounded-2xl text-xs shadow-lg shadow-sand-orange/15 transition-colors">
                          Submit Details
                        </button>
                        <p className="text-[8px] text-center text-gray-500 mt-2">Your information will be directly sent to the business owner.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Campaign Process/How It Works */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">
             How it works
          </h2>
          <p className="text-sand-textSecondary max-w-2xl mx-auto">
             Get real-world customers from your phone screen to your shop floor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {[
             { step: "01", title: "AI Copy & Image Generation", desc: "Just enter your offer. Our AI writes high-intent ad text and designs visual graphics tailored to capture local attention." },
             { step: "02", title: "Smart Hyperlocal Launch", desc: "Select target pin codes. We set up optimized target radii to ensure only people who can visit you see the ad." },
             { step: "03", title: "Real-Time Lead Notifications", desc: "The second a customer clicks and signs up, details sync directly to your WhatsApp so you can close the sale immediately." }
           ].map((stepInfo, idx) => (
             <div key={idx} className="relative bg-sand-cardPurple p-8 rounded-3xl border border-sand-border space-y-6 flex flex-col justify-between">
                <div className="absolute -top-4 left-6 bg-sand-purple text-white font-bold text-xs px-3 py-1 rounded-full">
                  Step {stepInfo.step}
                </div>
                <div>
                   <h3 className="font-bold text-xl text-sand-textPrimary mb-3 mt-2">{stepInfo.title}</h3>
                   <p className="text-sand-textSecondary text-sm leading-relaxed">{stepInfo.desc}</p>
                </div>
                <div className="w-full h-1.5 bg-gradient-to-r from-sand-purple to-sand-orange rounded-full mt-4 opacity-50" />
             </div>
           ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center bg-sand-cardOrange/30 border-t border-sand-border">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
           <h2 className="text-4xl font-black text-sand-textPrimary leading-tight">
             Ready to launch your first <br />
             <span className="text-sand-orange font-black">AI Meta Ad Campaign?</span>
           </h2>
           <p className="text-sand-textSecondary text-lg max-w-xl mx-auto">
             Stop spending blindly. Let SandAI manage your creatives, budget, and targeting for real growth.
           </p>
           <button className="bg-sand-orange text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-sand-orange/20 hover:scale-105 transition-transform">
             Start Generating Customers
           </button>
        </div>
      </section>
    </main>
  )
}
