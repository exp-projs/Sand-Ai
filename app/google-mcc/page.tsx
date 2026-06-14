'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductHero from '@/components/ProductHero'
import ServiceIntakeForm from '@/components/ServiceIntakeForm'
import { Sparkles, Layers, ShieldCheck, ShieldAlert, FolderKey, FileSpreadsheet } from 'lucide-react'

const ACCOUNTS_DATA = {
  active: [
    { name: 'North Region Search Campaign', budget: '₹50,000/mo', status: 'Active', leads: '142' },
    { name: 'Ecommerce Performance Max', budget: '₹1,20,000/mo', status: 'Active', leads: '389' },
    { name: 'Local Store Video Ads', budget: '₹25,000/mo', status: 'Active', leads: '98' }
  ],
  testing: [
    { name: 'Retargeting Display Campaign', budget: '₹15,000/mo', status: 'Testing', leads: '41' },
    { name: 'Competitor Keywords Search', budget: '₹30,000/mo', status: 'Testing', leads: '29' }
  ],
  paused: [
    { name: 'Holiday Season Promo', budget: '₹80,000/mo', status: 'Paused', leads: '194' }
  ]
}

export default function GoogleMCCPage() {
  const [selectedSubAccount, setSelectedSubAccount] = useState<'active' | 'testing' | 'paused'>('active')

  return (
    <main className="min-h-screen bg-sand-bg">
      <ProductHero 
        badge="Google Ads MCC Setup"
        title="One Master Account."
        highlightedTitle="Zero Account Chaos."
        description="Consolidate all client Google Ads accounts under a professional Google Manager Account (MCC). Securely share access with teams, manage consolidated billing, and apply unified audience sheets without sharing passwords."
        ctaText="Request MCC Setup"
        imageSrc="/icons/icon-google-mcc.png"
        colorVariant="purple"
        onCtaClick={() => document.getElementById('intake-form')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* Benefits Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: <Layers />, 
              title: "Unified Login", 
              desc: "Manage multiple client accounts with a single email address. Say goodbye to logging in and out of different accounts." 
            },
            { 
              icon: <FolderKey />, 
              title: "Granular Permissions", 
              desc: "Grant precise read, write, or admin permissions to team members or external partners without sharing client passwords." 
            },
            { 
              icon: <FileSpreadsheet />, 
              title: "Consolidated Billing", 
              desc: "Merge separate invoicing profiles into a single monthly invoice, saving time for accounts and finance teams." 
            },
            { 
              icon: <ShieldCheck />, 
              title: "Shared Libraries", 
              desc: "Apply negative keyword lists, exclusion audiences, and tags across all sub-accounts with a single click." 
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

      {/* Interactive MCC Tree Simulator */}
      <section className="py-24 bg-sand-bg border-y border-sand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">
              Explore your <span className="text-sand-purple">MCC Hierarchy</span>
            </h2>
            <p className="text-sand-textSecondary max-w-2xl mx-auto">
              Simulate how multiple client accounts nest under the manager account, keeping billing, access logs, and assets completely separated.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Controller Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-bold text-sand-textSecondary uppercase tracking-widest px-1">Manager Root Nodes</div>
              
              <div className="p-6 rounded-3xl bg-sand-cardPurple border border-sand-border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sand-purple/20 flex items-center justify-center text-xl">🏢</div>
                  <div>
                    <h4 className="font-black text-base text-sand-textPrimary">Sand AI MCC Root</h4>
                    <p className="text-[10px] text-sand-textSecondary font-semibold uppercase">ID: 948-283-1102</p>
                  </div>
                </div>
                
                <div className="h-px bg-sand-border" />
                
                <div className="space-y-2.5">
                  <div className="text-[10px] font-bold text-sand-textSecondary uppercase tracking-wider">Sub-Account Folders</div>
                  {[
                    { id: 'active', label: 'Active Retail Accounts', icon: '🟢', count: '3 active campaigns' },
                    { id: 'testing', label: 'Beta Testing Group', icon: '🟡', count: '2 test campaigns' },
                    { id: 'paused', label: 'Archived / Paused', icon: '🔴', count: '1 paused campaign' }
                  ].map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => setSelectedSubAccount(folder.id as any)}
                      className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${selectedSubAccount === folder.id ? 'border-sand-purple bg-sand-cardPurple/50' : 'border-sand-border hover:border-sand-purple/20'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm">{folder.icon}</span>
                        <div>
                          <h5 className="font-bold text-xs text-sand-textPrimary">{folder.label}</h5>
                          <span className="text-[9px] text-sand-textSecondary">{folder.count}</span>
                        </div>
                      </div>
                      {selectedSubAccount === folder.id && <span className="text-xs text-sand-purple font-extrabold">Selected</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Display Column */}
            <div className="lg:col-span-7 bg-sand-cardPurple/40 rounded-3xl border border-sand-border p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-sand-textSecondary uppercase tracking-widest">Client Account Overview</span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                    Live Dashboard Sync
                  </span>
                </div>

                <div className="space-y-3">
                  <AnimatePresence mode="wait">
                    {ACCOUNTS_DATA[selectedSubAccount].map((campaign, idx) => (
                      <motion.div
                        key={campaign.name}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white dark:bg-sand-cardPurple rounded-2xl border border-sand-border p-5 flex items-center justify-between gap-4 shadow-sm"
                      >
                        <div className="space-y-1">
                          <h5 className="font-extrabold text-sm text-sand-textPrimary">{campaign.name}</h5>
                          <div className="flex gap-3 text-[10px] text-sand-textSecondary font-bold">
                            <span>Budget: {campaign.budget}</span>
                            <span>•</span>
                            <span>Leads Captured: {campaign.leads}</span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${campaign.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' : campaign.status === 'Testing' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' : 'bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-400'}`}>
                          {campaign.status}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-sand-border flex justify-between items-center text-xs text-sand-textSecondary">
                <span>Accounts Node Limit: 10,000 maximum</span>
                <span className="text-sand-purple font-bold">Consolidated Billing Active</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Setup Form Section */}
      <section id="intake-form" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">Initialize MCC Setup</h2>
          <p className="text-sand-textSecondary max-w-xl mx-auto text-sm">
            Ready to clean up account access? Submit details below, and our certified Google Ads architects will coordinate your MCC configurations.
          </p>
        </div>

        <ServiceIntakeForm serviceType="google-mcc" serviceName="Google MCC Setup" colorVariant="purple" />
      </section>
    </main>
  )
}
