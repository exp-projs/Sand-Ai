'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductHero from '@/components/ProductHero'
import ServiceIntakeForm from '@/components/ServiceIntakeForm'
import { ShieldAlert, Users, Settings2, KeyRound, Globe, Radio } from 'lucide-react'

const TEAM_ROLES = {
  admin: {
    label: 'Business Admin',
    desc: 'Full control. Can edit settings, add/remove partners, assign financial billing, and manage all ad accounts.',
    permissions: ['Manage Billing', 'Add/Remove Partners', 'Delete Pixel Data', 'Assign Staff Access', 'Edit Ad Campaigns']
  },
  employee: {
    label: 'Staff Member',
    desc: 'Partial access. Can view details and edit assigned assets only. No access to financial billing details.',
    permissions: ['Edit Ad Campaigns', 'Reply to Page Comments', 'View Reporting Dashboards']
  },
  partner: {
    label: 'External Agency Partner',
    desc: 'Delegated asset access. Safe collaboration without giving away ownership of your pixels or pages.',
    permissions: ['Edit Ad Campaigns', 'View Reporting Dashboards', 'Upload Custom Audiences']
  }
}

export default function MetaBusinessManagerPage() {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'employee' | 'partner'>('admin')

  return (
    <main className="min-h-screen bg-sand-bg">
      <ProductHero 
        badge="Meta Business Manager Setup"
        title="Centralized Assets."
        highlightedTitle="Secured Permissions."
        description="Set up your Meta Business Suite the professional way. Consolidate your Facebook pages, Instagram accounts, ad accounts, pixel datasets, and domain verifications under one secure dashboard, eliminating access issues."
        ctaText="Setup Meta Business Suite"
        imageSrc="/icons/icon-meta-ads.jpg"
        colorVariant="orange"
        onCtaClick={() => document.getElementById('intake-form')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* Benefits Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: <KeyRound />, 
              title: "Absolute Ownership", 
              desc: "Ensure your business owns its data, pixels, and accounts. Never lose control if a developer or agency leaves." 
            },
            { 
              icon: <Users />, 
              title: "Granular Team Access", 
              desc: "Delegate tasks to page managers, advertisers, or analysts with specific permissions and roles." 
            },
            { 
              icon: <Radio />, 
              title: "Meta Pixel & Datasets", 
              desc: "Properly map and link standard conversions and CAPI datasets, boosting attribution accuracy." 
            },
            { 
              icon: <Globe />, 
              title: "Domain Verification", 
              desc: "Verify your web domain inside Meta to enable link customization and prevent advertising restrictions." 
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

      {/* Interactive Permission Mapping Simulator */}
      <section className="py-24 bg-sand-bg border-y border-sand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">
              Simulate asset <span className="text-sand-orange">delegations.</span>
            </h2>
            <p className="text-sand-textSecondary max-w-2xl mx-auto">
              Select a team role to inspect the specific permission tags assigned under a standard Meta Business Suite setup.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-bold text-sand-textSecondary uppercase tracking-widest px-1">1. Choose Role Tier</div>
              <div className="space-y-3">
                {[
                  { id: 'admin', label: 'Business Admin (Full Control)', icon: '👑' },
                  { id: 'employee', label: 'Team Member (Employee Access)', icon: '👤' },
                  { id: 'partner', label: 'Agency Partner (Client-Agency link)', icon: '🤝' }
                ].map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id as any)}
                    className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${selectedRole === role.id ? 'border-sand-orange bg-sand-cardOrange' : 'border-sand-border hover:border-sand-orange/30'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{role.icon}</span>
                      <div>
                        <h4 className="font-bold text-sm text-sand-textPrimary">{role.label}</h4>
                        <span className="text-[10px] text-sand-textSecondary uppercase font-medium">Permission Profiles</span>
                      </div>
                    </div>
                    {selectedRole === role.id && <div className="w-5 h-5 rounded-full bg-sand-orange flex items-center justify-center text-white text-xs">✓</div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column Visual Display */}
            <div className="lg:col-span-7 bg-sand-cardPurple rounded-3xl border border-sand-border p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-sand-textSecondary uppercase tracking-widest">Active Permissions Matrix</span>
                  <span className="px-3 py-1 bg-sand-orange/10 text-sand-orange rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Role: {TEAM_ROLES[selectedRole].label}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-extrabold text-lg text-sand-textPrimary">{TEAM_ROLES[selectedRole].label} Profile</h4>
                  <p className="text-sand-textSecondary text-xs leading-relaxed italic">{TEAM_ROLES[selectedRole].desc}</p>
                </div>

                <div className="h-px bg-sand-border" />

                <div className="space-y-2">
                  <div className="text-[10px] text-sand-textSecondary uppercase font-bold tracking-wider mb-2">Granted Scopes</div>
                  <div className="flex flex-wrap gap-2">
                    {TEAM_ROLES[selectedRole].permissions.map((perm) => (
                      <span key={perm} className="bg-sand-cardOrange text-sand-orange border border-sand-orange/20 text-xs px-3.5 py-1.5 rounded-full font-bold">
                        ✓ {perm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-sand-border text-[10px] text-sand-textSecondary flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                Complies with Meta Security Center Best Practices (2FA Enforced)
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Setup Request Section */}
      <section id="intake-form" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">Initialize Business Suite Setup</h2>
          <p className="text-sand-textSecondary max-w-xl mx-auto text-sm">
            Ready to secure your business assets? Fill out the setup request form, and our integration specialists will configure your manager dashboards.
          </p>
        </div>

        <ServiceIntakeForm serviceType="meta-business-manager" serviceName="Meta Business Manager Setup" colorVariant="orange" />
      </section>
    </main>
  )
}
