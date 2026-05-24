'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductHero from '@/components/ProductHero'
import { Smartphone, Zap, Bell, ShieldCheck } from 'lucide-react'

// App mockups for the interactive preview
const APP_MOCKUPS = {
  store: {
    title: "E-Commerce Store",
    accent: "from-blue-600 to-indigo-600",
    glow: "rgba(59, 130, 246, 0.2)",
    icon: "🛍️",
    badge: "Instant Purchase",
    screenContent: (
      <div className="flex-1 flex flex-col justify-between p-4 bg-white dark:bg-[#0c0a1c] text-gray-900 dark:text-white">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider">New Arrival</span>
            <span className="text-xs">⭐ 4.9</span>
          </div>
          <div className="h-32 w-full rounded-2xl bg-gradient-to-tr from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center text-4xl shadow-inner">
            📱
          </div>
          <h4 className="font-extrabold text-sm leading-snug">SandAI Smart Hub Pro</h4>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal">
            Bespoke automation hub with real-time analytics client.
          </p>
        </div>
        <div className="space-y-2.5 pt-4 border-t border-gray-100 dark:border-white/5">
          <div className="flex justify-between items-center">
            <span className="text-sm font-black">$499.00</span>
            <span className="text-[9px] line-through text-gray-400">$599.00</span>
          </div>
          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-2.5 rounded-xl text-[10px] tracking-wider uppercase shadow-md shadow-indigo-500/20">
            One-Tap Buy Now
          </button>
        </div>
      </div>
    )
  },
  loyalty: {
    title: "Loyalty Wallet",
    accent: "from-purple-600 to-pink-600",
    glow: "rgba(168, 85, 247, 0.2)",
    icon: "💳",
    badge: "Rewards Card",
    screenContent: (
      <div className="flex-1 flex flex-col justify-between p-4 bg-white dark:bg-[#0c0a1c] text-gray-900 dark:text-white">
        <div className="space-y-4">
          <span className="text-[10px] uppercase font-bold text-purple-500 tracking-wider">Your Rewards Wallet</span>
          {/* Glass Card */}
          <div className="h-28 w-full rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-4 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            <div className="flex justify-between items-start z-10">
              <span className="text-[9px] font-medium opacity-80 uppercase tracking-widest">SandAI Loyalty</span>
              <span className="text-xs">✦</span>
            </div>
            <div className="z-10">
              <span className="text-2xl font-black tracking-tight">1,420 PTS</span>
              <div className="text-[8px] opacity-70 mt-1">Level 4 VIP Member</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Available Perks</div>
            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-between border border-gray-100 dark:border-white/5">
              <span className="text-[10px] font-bold">Free Shipping Coupon</span>
              <span className="text-[10px] text-purple-500 font-bold">Redeem</span>
            </div>
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2.5 rounded-xl text-[10px] tracking-wider uppercase shadow-md shadow-pink-500/20 mt-4">
          Show Scan QR Code
        </button>
      </div>
    )
  },
  booking: {
    title: "Booking Portal",
    accent: "from-orange-500 to-amber-500",
    glow: "rgba(249, 115, 22, 0.2)",
    icon: "📅",
    badge: "Real-time Scheduling",
    screenContent: (
      <div className="flex-1 flex flex-col justify-between p-4 bg-white dark:bg-[#0c0a1c] text-gray-900 dark:text-white">
        <div className="space-y-3">
          <span className="text-[10px] uppercase font-bold text-orange-500 tracking-wider">Schedule Consultation</span>
          <div className="grid grid-cols-3 gap-2">
            {['Mon 25', 'Tue 26', 'Wed 27'].map((day, i) => (
              <div key={i} className={`p-2 rounded-xl text-center border text-[9px] font-bold cursor-pointer transition-colors ${i === 0 ? 'bg-orange-500/10 border-orange-500 text-orange-600' : 'border-gray-200 dark:border-white/5'}`}>
                {day}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Select Slots</div>
            {['10:00 AM', '02:30 PM', '05:00 PM'].map((slot, i) => (
              <div key={i} className={`p-2.5 rounded-xl text-center border text-[10px] font-bold cursor-pointer transition-colors ${i === 1 ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-200 dark:border-white/5'}`}>
                {slot}
              </div>
            ))}
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-2.5 rounded-xl text-[10px] tracking-wider uppercase shadow-md shadow-orange-500/20 mt-4">
          Confirm Appointment
        </button>
      </div>
    )
  }
}

export default function AppDevPage() {
  const [activeTab, setActiveTab] = React.useState<'store' | 'loyalty' | 'booking'>('store')
  const mockup = APP_MOCKUPS[activeTab]

  return (
    <main className="min-h-screen bg-sand-bg">
      <ProductHero 
        badge="Tailored Native Applications"
        title="Your Brand In"
        highlightedTitle="Their Pocket."
        description="Deploy bespoke iOS and Android native apps built to convert, engage, and retain. From custom loyalty systems to instant database synchronization, we handle the entire engineering pipeline."
        ctaText="Build My Mobile App"
        imageSrc="/icons/icon-app.jpg"
        colorVariant="orange"
      />

      {/* Stats/Proof Section */}
      <section className="py-12 bg-sand-bg border-y border-sand-border">
         <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24">
            {[
              { label: "Deployment", value: "< 4 Weeks" },
              { label: "User Retention", value: "+65%" },
              { label: "Crash-Free Rate", value: "99.9%" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                 <div className="text-4xl font-black text-sand-orange mb-1">{stat.value}</div>
                 <div className="text-xs font-bold text-sand-textSecondary uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
         </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: <Smartphone />, 
              title: "Custom UI/UX", 
              desc: "Individually styled screens styled for your unique brand with buttery-smooth 120Hz animations." 
            },
            { 
              icon: <Zap />, 
              title: "Offline Sync", 
              desc: "Robust database caches allow the app to boot fast and remain usable even without network connectivity." 
            },
            { 
              icon: <Bell />, 
              title: "Smart Push Alerts", 
              desc: "Re-engage customers dynamically using rich, image-enabled push notifications directly on their lockscreens." 
            },
            { 
              icon: <ShieldCheck />, 
              title: "Frictionless Checkout", 
              desc: "Integrate Apple Pay, Google Pay, and local UPI setups to complete customer transactions in seconds." 
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

      {/* Interactive App Preview Builder */}
      <section className="py-24 bg-sand-bg border-y border-sand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">
              Premium layouts, <span className="text-sand-orange">native performance.</span>
            </h2>
            <p className="text-sand-textSecondary max-w-2xl mx-auto">
              Select an application type to preview how our native configurations display on customer devices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Controls Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-bold text-sand-textSecondary uppercase tracking-widest px-1">Choose App Template</div>
              <div className="grid grid-cols-1 gap-3">
                {(Object.keys(APP_MOCKUPS) as Array<keyof typeof APP_MOCKUPS>).map((key) => {
                  const item = APP_MOCKUPS[key]
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${activeTab === key ? 'border-sand-orange bg-sand-cardOrange' : 'border-sand-border hover:border-sand-orange/30'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h4 className="font-bold text-sm text-sand-textPrimary">{item.title}</h4>
                          <span className="text-[10px] text-sand-textSecondary uppercase font-medium">{item.badge}</span>
                        </div>
                      </div>
                      {activeTab === key && <div className="w-5 h-5 rounded-full bg-sand-orange flex items-center justify-center text-white text-xs">✓</div>}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right Live Preview Column */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full max-w-[360px] aspect-[9/18.5] bg-gray-950 rounded-[48px] border-[10px] border-gray-900 shadow-2xl p-2 relative overflow-hidden flex flex-col justify-between">
                
                {/* Dynamic Screen Mockup */}
                <div className="w-full h-full bg-white dark:bg-[#0c0a1c] rounded-[38px] overflow-hidden flex flex-col relative">
                  
                  {/* Status Bar */}
                  <div className="w-full h-8 px-5 flex justify-between items-center text-[10px] font-bold text-gray-900 dark:text-white select-none z-10 shrink-0">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <span>📶</span>
                      <span>🔋</span>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 flex flex-col overflow-hidden"
                    >
                      {mockup.screenContent}
                    </motion.div>
                  </AnimatePresence>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Campaign Process/How It Works */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">
             Bespoke Development Pipeline
          </h2>
          <p className="text-sand-textSecondary max-w-2xl mx-auto">
             How we bring your custom mobile application from concept to the App Store.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {[
             { step: "01", title: "Prototyping & UX Mapping", desc: "We design every screen in high-fidelity interactive wireframes to ensure your customer flow is fully optimized." },
             { step: "02", title: "Native Swift/Kotlin Build", desc: "Our engineering team codes the app natively to guarantee 120Hz screen updates, offline sync, and total performance." },
             { step: "03", title: "App Store Publishing", desc: "We handle the complete provisioning, compilation, and submission processes for both Apple App Store and Google Play Store." }
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
             Ready to launch your custom <br />
             <span className="text-sand-orange font-black">Native Mobile Application?</span>
           </h2>
           <p className="text-sand-textSecondary text-lg max-w-xl mx-auto">
             Claim your direct channel to your best customers. Let's design a high-performance app today.
           </p>
           <button className="bg-sand-orange text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-sand-orange/20 hover:scale-105 transition-transform">
             Start App Consultation
           </button>
        </div>
      </section>
    </main>
  )
}
