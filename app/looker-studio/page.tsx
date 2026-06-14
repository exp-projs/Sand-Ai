'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductHero from '@/components/ProductHero'
import ServiceIntakeForm from '@/components/ServiceIntakeForm'
import { LineChart, BarChart3, PieChart, Sparkles, RefreshCcw, Landmark } from 'lucide-react'

const METRICS_DATA = {
  blended: { spend: '₹2,45,000', leads: '942', cpl: '₹260', metaSpend: '₹1,50,000', googleSpend: '₹95,000' },
  meta: { spend: '₹1,50,000', leads: '610', cpl: '₹245', metaSpend: '₹1,50,000', googleSpend: '₹0' },
  google: { spend: '₹95,000', leads: '332', cpl: '₹286', metaSpend: '₹0', googleSpend: '₹95,000' }
}

export default function LookerStudioPage() {
  const [selectedChannel, setSelectedChannel] = useState<'blended' | 'meta' | 'google'>('blended')
  const metrics = METRICS_DATA[selectedChannel]

  return (
    <main className="min-h-screen bg-sand-bg">
      <ProductHero 
        badge="Looker Studio Custom Reporting"
        title="Live Dashboards."
        highlightedTitle="Smarter Spending."
        description="Stop waiting until the end of the month for reporting spreadsheets. Connect Google Ads, Meta Ads, and GA4 to interactive Looker Studio dashboards to view combined spends, leads, and conversion costs in real-time."
        ctaText="Request Custom Dashboard"
        imageSrc="/icons/icon-website.png"
        colorVariant="purple"
      />

      {/* Benefits Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: <RefreshCcw />, 
              title: "Automated Data Sync", 
              desc: "Reports sync directly with Google Ads and Meta APIs. No more manual copy-pasting or spreadsheet formula breaks." 
            },
            { 
              icon: <BarChart3 />, 
              title: "Cross-Channel Blending", 
              desc: "Compare Google and Meta performance side-by-side. Calculate overall combined CPA and blended ROAS instantly." 
            },
            { 
              icon: <PieChart />, 
              title: "Tailored Visuals", 
              desc: "Custom-built tables, geographical heatmaps, and funnel graphs representing metrics that actually matter to your business." 
            },
            { 
              icon: <Landmark />, 
              title: "White-Label Link sharing", 
              desc: "Generate white-label PDF downloads or permanent view-only links to share with clients or internal executives." 
            }
          ].map((benefit, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-sand-cardPurple/30 p-8 rounded-3xl border border-sand-border shadow-sm hover:shadow-purple-200/50 transition-shadow"
            >
              <div className="w-12 h-12 bg-sand-purple/10 rounded-2xl flex items-center justify-center text-sand-purple mb-6">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-xl text-sand-textPrimary mb-3">{benefit.title}</h3>
              <p className="text-sand-textSecondary text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blended Dashboard Simulator */}
      <section className="py-24 bg-sand-bg border-y border-sand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">
              Live Report <span className="text-sand-purple">Interactive Mockup</span>
            </h2>
            <p className="text-sand-textSecondary max-w-2xl mx-auto">
              Select reporting channels to see how Looker Studio calculates combined statistics and displays them instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-bold text-sand-textSecondary uppercase tracking-widest px-1">Filter Report Data</div>
              
              <div className="p-6 rounded-3xl bg-sand-cardPurple border border-sand-border space-y-3">
                {[
                  { id: 'blended', label: 'Blended Overview (Google + Meta)', icon: '📊' },
                  { id: 'meta', label: 'Meta Performance Ads only', icon: '🔵' },
                  { id: 'google', label: 'Google Search PPC only', icon: '🔴' }
                ].map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id as any)}
                    className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${selectedChannel === channel.id ? 'border-sand-purple bg-sand-cardPurple/50' : 'border-sand-border hover:border-sand-purple/20'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{channel.icon}</span>
                      <div>
                        <h4 className="font-bold text-xs text-sand-textPrimary">{channel.label}</h4>
                        <span className="text-[9px] text-sand-textSecondary">Calculated using API connectors</span>
                      </div>
                    </div>
                    {selectedChannel === channel.id && <span className="text-xs text-sand-purple font-extrabold">Selected</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column Visual Mockup */}
            <div className="lg:col-span-7 bg-white dark:bg-sand-cardPurple rounded-3xl border border-sand-border p-8 shadow-xl flex flex-col justify-between">
              <div className="space-y-8">
                <div className="flex justify-between items-center pb-4 border-b border-sand-border">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sand-purple" />
                    <span className="text-xs font-extrabold text-sand-textPrimary uppercase">Looker Studio Blended Sheet</span>
                  </div>
                  <span className="text-[10px] text-sand-textSecondary font-bold">Updated 5 Mins Ago</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-sand-bg border border-sand-border space-y-1">
                    <span className="text-[9px] text-sand-textSecondary uppercase font-black">Total Spend</span>
                    <div className="text-lg font-black text-sand-textPrimary">{metrics.spend}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-sand-bg border border-sand-border space-y-1">
                    <span className="text-[9px] text-sand-textSecondary uppercase font-black">Total Leads</span>
                    <div className="text-lg font-black text-sand-purple">{metrics.leads}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-sand-bg border border-sand-border space-y-1">
                    <span className="text-[9px] text-sand-textSecondary uppercase font-black">Avg Cost / Lead</span>
                    <div className="text-lg font-black text-sand-textPrimary">{metrics.cpl}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] text-sand-textSecondary uppercase font-black tracking-wider block">Spend Share Breakdown</span>
                  <div className="h-6 w-full bg-sand-bg rounded-lg border border-sand-border overflow-hidden flex">
                    <AnimatePresence mode="wait">
                      {selectedChannel === 'blended' ? (
                        <>
                          <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} className="h-full bg-blue-500 flex items-center justify-center text-[9px] text-white font-bold">Meta Ads (60%)</motion.div>
                          <motion.div initial={{ width: 0 }} animate={{ width: '40%' }} className="h-full bg-red-500 flex items-center justify-center text-[9px] text-white font-bold">Google (40%)</motion.div>
                        </>
                      ) : selectedChannel === 'meta' ? (
                        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full bg-blue-500 flex items-center justify-center text-[9px] text-white font-bold">Meta Ads (100%)</motion.div>
                      ) : (
                        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full bg-red-500 flex items-center justify-center text-[9px] text-white font-bold">Google Ads (100%)</motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-sand-border text-[9px] text-sand-textSecondary flex items-center gap-1.5 justify-between">
                <span>Google API Status: Connected</span>
                <span>Meta Marketing API Status: Connected</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Setup Form Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">Request Custom Dashboard Setup</h2>
          <p className="text-sand-textSecondary max-w-xl mx-auto text-sm">
            Ready to track stats like a pro? Submit the setup request form, and our analytics engineers will build out your Looker Studio boards.
          </p>
        </div>

        <ServiceIntakeForm serviceType="looker-studio" serviceName="Looker Studio Customization" colorVariant="purple" />
      </section>
    </main>
  )
}
