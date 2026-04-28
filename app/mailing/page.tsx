'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ProductHero from '@/components/ProductHero'
import { Mail, Smartphone, Gift, Star } from 'lucide-react'

export default function MailingPage() {
  return (
    <main className="min-h-screen bg-sand-bg">
      <ProductHero 
        badge="AI Loyalty & Retention"
        title="Turn One-Time Sales"
        highlightedTitle="Into Lifelong Fans."
        description="Auto reminders and loyalty rewards bring customers back. Send personalised offers by email or SMS. Give loyalty points via your app. Make sure your customers return more often."
        ctaText="Increase Retention"
        imageSrc="/icons/icon-app.jpg"
        colorVariant="orange"
      />

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary">Your personal retention engine</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="space-y-8">
              {[
                { icon: <Mail />, color: "bg-blue-500", title: "Smart Email Marketing", desc: "AI writes and sends the right offer to the right customer at the right time." },
                { icon: <Smartphone />, color: "bg-green-500", title: "SMS Direct Alerts", desc: "98% open rates for your most important updates and limited-time deals." },
                { icon: <Gift />, color: "bg-purple-500", title: "Loyalty Points System", desc: "Automate rewards. Every purchase gets closer to a prize, keeping them hooked." },
                { icon: <Star />, color: "bg-yellow-500", title: "Review Collector", desc: "Automatically ask for Google reviews after a positive customer experience." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 p-6 rounded-3xl bg-sand-cardPurple border border-sand-border shadow-sm hover:shadow-md transition-shadow"
                >
                   <div className={`w-12 h-12 shrink-0 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-${item.color.split('-')[1]}-200`}>
                      {item.icon}
                   </div>
                   <div>
                      <h4 className="font-bold text-lg text-sand-textPrimary">{item.title}</h4>
                      <p className="text-sand-textSecondary text-sm">{item.desc}</p>
                   </div>
                </motion.div>
              ))}
           </div>

           {/* Dashboard Preview */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="bg-sand-deepPurple rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-64 h-64 bg-sand-orange/10 rounded-full blur-[100px]" />
              
              <div className="relative z-10 space-y-8">
                 <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl">Campaign Status</h3>
                    <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">Active</span>
                 </div>

                 <div className="space-y-4">
                    {[
                      { type: "Offer", title: "Weekend 15% Off", sent: "1,240", opens: "42%" },
                      { type: "Reminder", title: "We miss you scan", sent: "230", opens: "68%" },
                      { type: "Loyalty", title: "Points Milestone", sent: "85", opens: "91%" }
                    ].map((row, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center group hover:bg-white/10 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg">
                               {row.type === 'Offer' ? '🎁' : row.type === 'Reminder' ? '⏰' : '⭐'}
                            </div>
                            <div>
                               <div className="text-sm font-bold">{row.title}</div>
                               <div className="text-[10px] text-gray-400 uppercase tracking-widest">{row.type}</div>
                            </div>
                         </div>
                         <div className="text-right">
                            <div className="text-sm font-black text-sand-orange">{row.opens} Open</div>
                            <div className="text-[10px] text-gray-500">{row.sent} Sent</div>
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="pt-4 space-y-4">
                    <div className="text-xs font-bold text-gray-400 uppercase">Recent Feedback</div>
                    <div className="bg-white/5 p-4 rounded-2xl space-y-2 border-l-4 border-sand-purple">
                       <div className="flex gap-1 text-yellow-400 text-xs">★★★★★</div>
                       <p className="text-xs italic text-gray-300">"The automatic reminders are great. I forgot my appointment but then I got the SMS! Best service."</p>
                       <div className="text-[10px] text-gray-500">— Rahul S.</div>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
         <div className="max-w-4xl mx-auto px-6 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary leading-tight">Stop letting your customers <br /> <span className="text-sand-orange italic line-through decoration-3 underline-offset-8">forget about you.</span></h2>
            <p className="text-sand-textSecondary text-xl">Let SandAI keep your brand top-of-mind, automatically.</p>
            <button className="bg-sand-orange text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-sand-orange/20 hover:scale-110 transition-transform">
              Send My First Campaign
            </button>
         </div>
      </section>
    </main>
  )
}
