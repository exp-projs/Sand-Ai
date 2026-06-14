'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ProductHero from '@/components/ProductHero'
import ServiceIntakeForm from '@/components/ServiceIntakeForm'
import { Table, ListFilter, KanbanSquare, CheckCircle, ArrowRight, UserPlus } from 'lucide-react'

interface LeadCard {
  id: string
  name: string
  source: string
  value: string
}

export default function CRMIntegrationPage() {
  const [pipelineLeads, setPipelineLeads] = useState<Record<string, LeadCard[]>>({
    incoming: [
      { id: '1', name: 'Sharma Kirana Request', source: 'Google Local', value: '₹15,000' },
      { id: '2', name: 'Amit Clinic Consult', source: 'Facebook Ad', value: '₹22,000' }
    ],
    contacted: [
      { id: '3', name: 'Grover Retail Inquiry', source: 'Website Form', value: '₹8,000' }
    ],
    won: [
      { id: '4', name: 'Verma Dental Care Plan', source: 'WhatsApp Ads', value: '₹45,000' }
    ]
  })

  // Move lead from one stage to next
  const moveLead = (leadId: string, currentStage: string, nextStage: string) => {
    const leadToMove = pipelineLeads[currentStage].find(l => l.id === leadId)
    if (!leadToMove) return

    setPipelineLeads({
      ...pipelineLeads,
      [currentStage]: pipelineLeads[currentStage].filter(l => l.id !== leadId),
      [nextStage]: [...pipelineLeads[nextStage], leadToMove]
    })
  }

  return (
    <main className="min-h-screen bg-sand-bg">
      <ProductHero 
        badge="Simple CRM Integrations"
        title="Zero CRM Software Cost."
        highlightedTitle="100% Pipeline Visibility."
        description="Stop paying hundreds of dollars for complex CRM systems. We set up professional, automated Notion dashboards or Google Sheets connected to your ad campaigns to log, distribute, and track leads effortlessly."
        ctaText="Request CRM Setup"
        imageSrc="/icons/icon-crm.png"
        colorVariant="orange"
        onCtaClick={() => document.getElementById('intake-form')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* Benefits Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: <KanbanSquare />, 
              title: "Visual Pipelines", 
              desc: "Track sales pipelines from initial inquiries, calls, and follow-ups to deals closed using intuitive, clean Kanban boards." 
            },
            { 
              icon: <Table />, 
              title: "Sheets & Notion Sync", 
              desc: "Synchronize client inquiries automatically. Share dashboards with teams or access records on the go via mobile apps." 
            },
            { 
              icon: <UserPlus />, 
              title: "Automatic Lead Logs", 
              desc: "Form entries insert rows directly into your sheets in real-time. Never lose details in chat logs or emails again." 
            },
            { 
              icon: <CheckCircle />, 
              title: "Zero CRM Fees", 
              desc: "Built on top of platforms you already use (Google Workspace and Notion). Pay zero recurring CRM tool subscription fees." 
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

      {/* Interactive Pipeline Kanban Simulator */}
      <section className="py-24 bg-sand-bg border-y border-sand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">
              Interactive <span className="text-sand-orange">Notion Pipeline Simulator</span>
            </h2>
            <p className="text-sand-textSecondary max-w-2xl mx-auto">
              Simulate how leads route through stages inside Notion. Click cards to advance them through the sales pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* INCOMING STAGE */}
            <div className="bg-sand-cardPurple rounded-3xl border border-sand-border p-6 min-h-[300px] flex flex-col gap-4">
              <div className="flex justify-between items-center pb-2 border-b border-sand-border">
                <span className="text-xs font-black text-sand-textPrimary uppercase">1. Incoming Inquiries</span>
                <span className="bg-sand-purple/10 text-sand-purple text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                  {pipelineLeads.incoming.length}
                </span>
              </div>
              
              <div className="space-y-3 flex-1">
                {pipelineLeads.incoming.map(lead => (
                  <div key={lead.id} className="bg-white dark:bg-sand-cardPurple rounded-2xl border border-sand-border p-4 shadow-sm space-y-3">
                    <div>
                      <h4 className="font-extrabold text-xs text-sand-textPrimary">{lead.name}</h4>
                      <p className="text-[9px] text-sand-textSecondary font-bold uppercase mt-0.5">Source: {lead.source} · {lead.value}</p>
                    </div>
                    <button 
                      onClick={() => moveLead(lead.id, 'incoming', 'contacted')}
                      className="w-full text-center py-2 bg-sand-orange text-white text-[10px] font-bold rounded-lg flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                    >
                      Call / Contact <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {pipelineLeads.incoming.length === 0 && (
                  <p className="text-[10px] text-sand-textSecondary italic text-center py-8">No incoming inquiries</p>
                )}
              </div>
            </div>

            {/* CONTACTED STAGE */}
            <div className="bg-sand-cardPurple rounded-3xl border border-sand-border p-6 min-h-[300px] flex flex-col gap-4">
              <div className="flex justify-between items-center pb-2 border-b border-sand-border">
                <span className="text-xs font-black text-sand-textPrimary uppercase">2. Under Discussion</span>
                <span className="bg-sand-purple/10 text-sand-purple text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                  {pipelineLeads.contacted.length}
                </span>
              </div>
              
              <div className="space-y-3 flex-1">
                {pipelineLeads.contacted.map(lead => (
                  <div key={lead.id} className="bg-white dark:bg-sand-cardPurple rounded-2xl border border-sand-border p-4 shadow-sm space-y-3">
                    <div>
                      <h4 className="font-extrabold text-xs text-sand-textPrimary">{lead.name}</h4>
                      <p className="text-[9px] text-sand-textSecondary font-bold uppercase mt-0.5">Source: {lead.source} · {lead.value}</p>
                    </div>
                    <button 
                      onClick={() => moveLead(lead.id, 'contacted', 'won')}
                      className="w-full text-center py-2 bg-green-500 text-white text-[10px] font-bold rounded-lg flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                    >
                      Close Won / Sign <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {pipelineLeads.contacted.length === 0 && (
                  <p className="text-[10px] text-sand-textSecondary italic text-center py-8">No contacted leads</p>
                )}
              </div>
            </div>

            {/* CLOSED WON STAGE */}
            <div className="bg-sand-cardPurple rounded-3xl border border-sand-border p-6 min-h-[300px] flex flex-col gap-4">
              <div className="flex justify-between items-center pb-2 border-b border-sand-border">
                <span className="text-xs font-black text-sand-textPrimary uppercase">3. Closed Won Contracts</span>
                <span className="bg-green-500/10 text-green-500 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                  {pipelineLeads.won.length}
                </span>
              </div>
              
              <div className="space-y-3 flex-1">
                {pipelineLeads.won.map(lead => (
                  <div key={lead.id} className="bg-white dark:bg-sand-cardPurple rounded-2xl border border-sand-border p-4 shadow-sm border-l-4 border-l-green-500">
                    <h4 className="font-extrabold text-xs text-sand-textPrimary">{lead.name}</h4>
                    <p className="text-[9px] text-sand-textSecondary font-bold uppercase mt-0.5">Value: {lead.value} · Confirmed</p>
                  </div>
                ))}
                {pipelineLeads.won.length === 0 && (
                  <p className="text-[10px] text-sand-textSecondary italic text-center py-8">No closed contracts yet</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Setup Form Section */}
      <section id="intake-form" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">Request CRM Workflow Setup</h2>
          <p className="text-sand-textSecondary max-w-xl mx-auto text-sm">
            Ready to structure your business leads? Fill out the setup request form, and our integration engineers will set up your Notion pipelines.
          </p>
        </div>

        <ServiceIntakeForm serviceType="crm-integration" serviceName="CRM Integration" colorVariant="orange" />
      </section>
    </main>
  )
}
