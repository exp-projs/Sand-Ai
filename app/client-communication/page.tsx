'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductHero from '@/components/ProductHero'
import ServiceIntakeForm from '@/components/ServiceIntakeForm'
import { MessageSquare, BellRing, Users, ShieldAlert, Sparkles, Send } from 'lucide-react'

interface AlertItem {
  id: string
  type: 'slack' | 'whatsapp'
  text: string
  timestamp: string
}

export default function ClientCommunicationPage() {
  const [alertStream, setAlertStream] = useState<AlertItem[]>([
    { id: '1', type: 'slack', text: '🚨 NEW INCOMING LEAD: Rahul Sharma (Google Ads) - Budget: ₹50K', timestamp: '12:40 PM' },
    { id: '2', type: 'whatsapp', text: '✉️ OUTBOUND CONFIRMATION SENT: "Hi Rahul, thank you for booking a dental session..."', timestamp: '12:40 PM' }
  ])

  const triggerMockAlert = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newItems: AlertItem[] = [
      { id: Date.now().toString() + '-1', type: 'slack', text: '🚨 NEW INCOMING LEAD: Anita Grover (Meta Ads) - Category: Beauty', timestamp: time },
      { id: Date.now().toString() + '-2', type: 'whatsapp', text: '✉️ OUTBOUND CONFIRMATION SENT: "Hi Anita, your Grace Beauty Salon treatment is logged..."', timestamp: time }
    ]
    setAlertStream(prev => [newItems[0], newItems[1], ...prev.slice(0, 4)])
  }

  return (
    <main className="min-h-screen bg-sand-bg">
      <ProductHero 
        badge="Automated Client Alert Channels"
        title="Instant Lead Pings."
        highlightedTitle="Zero Delayed Follow-ups."
        description="Connect lead generation tools directly to your team Slack channels or WhatsApp numbers. Get notified the exact second a client requests setup, allowing your sales team to call back instantly when high intent is active."
        ctaText="Request Alerts Setup"
        imageSrc="/icons/icon-alerts.png"
        colorVariant="orange"
        onCtaClick={() => document.getElementById('intake-form')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* Benefits Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: <BellRing />, 
              title: "Slack Push Alerts", 
              desc: "Deploy custom Slack webhooks to push lead information, ad platform source, and contact details directly to private channels." 
            },
            { 
              icon: <MessageSquare />, 
              title: "WhatsApp Business API", 
              desc: "Automate outbound confirmation texts to leads upon form submission. Establish instant WhatsApp brand presence." 
            },
            { 
              icon: <Users />, 
              title: "Lead Distribution", 
              desc: "Route leads dynamically to different sales reps based on regional pin codes or category fields automatically." 
            },
            { 
              icon: <Sparkles />, 
              title: "Higher Conversion Rates", 
              desc: "Call leads back within 60 seconds of submission. Fast response times increase booking conversions by up to 390%." 
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

      {/* Notification Stream Simulator */}
      <section className="py-24 bg-sand-bg border-y border-sand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">
              Real-time alert <span className="text-sand-orange">notifications stream.</span>
            </h2>
            <p className="text-sand-textSecondary max-w-2xl mx-auto">
              Click the button to simulate a lead submission and watch the Slack and WhatsApp notification logs trigger in real-time.
            </p>
            <button
              onClick={triggerMockAlert}
              className="mt-6 bg-sand-orange hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-2xl text-xs flex items-center gap-2 mx-auto shadow-md"
            >
              <Send className="w-4 h-4" />
              Simulate Lead Form Signup
            </button>
          </div>

          <div className="max-w-4xl mx-auto bg-gray-950 text-gray-100 rounded-3xl border border-gray-800 p-8 font-mono shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sand-orange to-sand-purple" />
            
            <div className="flex justify-between items-center pb-4 border-b border-gray-800 text-[10px] text-gray-500 uppercase tracking-widest font-black">
              <span>Terminal: Sand AI Alerts Log Engine</span>
              <span>Webhooks: Listening</span>
            </div>

            <div className="mt-6 space-y-3.5 min-h-[200px] flex flex-col justify-start">
              <AnimatePresence>
                {alertStream.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-xl border flex items-center justify-between gap-4 text-xs ${log.type === 'slack' ? 'bg-indigo-950/30 border-indigo-900/50 text-indigo-200' : 'bg-green-950/30 border-green-900/50 text-green-200'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">{log.type === 'slack' ? '💬' : '📱'}</span>
                      <span className="font-semibold">{log.text}</span>
                    </div>
                    <span className="text-[9px] text-gray-500 font-bold shrink-0">{log.timestamp}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-800 text-[9px] text-gray-600 flex items-center justify-between">
              <span>Slack Token: Active</span>
              <span>WhatsApp Cloud API: Online</span>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Form Section */}
      <section id="intake-form" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">Request Alerts Setup</h2>
          <p className="text-sand-textSecondary max-w-xl mx-auto text-sm">
            Ready to speed up lead follow-ups? Submit the setup request form, and our automation architects will configure your alerts systems.
          </p>
        </div>

        <ServiceIntakeForm serviceType="client-communication" serviceName="Client Communication Setup" colorVariant="orange" />
      </section>
    </main>
  )
}
