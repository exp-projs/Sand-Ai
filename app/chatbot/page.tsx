'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ProductHero from '@/components/ProductHero'
import { MessageSquare, Globe, Clock, Zap } from 'lucide-react'

export default function ChatbotPage() {
  return (
    <main className="min-h-screen bg-sand-bg">
      <ProductHero 
        badge="24/7 AI Customer Engagement"
        title="Your Business Never Sleeps."
        highlightedTitle="Neither Does Your AI."
        description="Pick up every message on WhatsApp, answer queries instantly, and take orders even at 2 AM. SandAI Chatbot is the tireless employee your business deserves."
        ctaText="Get Started for Free"
        imageSrc="/icons/icon-chatbot.jpg"
        colorVariant="purple"
      />

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">
            How our <span className="text-sand-purple">AI Chatbot</span> works
          </h2>
          <p className="text-sand-textSecondary max-w-2xl mx-auto">
            Scale your customer support without adding more staff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Clock />, title: "24/7 Availability", desc: "Instantly replies to customers anytime, anywhere." },
            { icon: <MessageSquare />, title: "WhatsApp Native", desc: "Lives right where your customers already are." },
            { icon: <Globe />, title: "Multi-Language", desc: "Talks in Hindi, English, and regional languages." },
            { icon: <Zap />, title: "Order Taking", desc: "Automate sales and appointments directly in chat." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-sand-cardPurple p-8 rounded-3xl border border-sand-border shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-sand-purple/10 rounded-2xl flex items-center justify-center text-sand-purple mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl text-sand-textPrimary mb-3">{feature.title}</h3>
              <p className="text-sand-textSecondary text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WhatsApp Preview Section */}
      <section className="py-24 bg-sand-cardPurple/30 border-y border-sand-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-8">
              A real conversation, <br /> 
              <span className="text-sand-purple">powered by SandAI.</span>
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">✓</div>
                <div>
                  <h4 className="font-bold text-sand-textPrimary">Natural Conversations</h4>
                  <p className="text-sand-textSecondary text-sm">Not like old bots. Our AI understands context and slang.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">✓</div>
                <div>
                  <h4 className="font-bold text-sand-textPrimary">Instant Updates</h4>
                  <p className="text-sand-textSecondary text-sm">Sends order confirmations and appointment alerts automatically.</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, rotate: -2, scale: 0.95 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-sand-cardPurple rounded-[40px] shadow-2xl border-[8px] border-gray-900 overflow-hidden max-w-[400px] mx-auto lg:ml-auto aspect-[9/19]"
          >
            {/* WhatsApp Header */}
            <div className="bg-[#075E54] p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-xs">🤖</div>
              <div className="text-white">
                <div className="text-sm font-bold">SandAI Assistant</div>
                <div className="text-[10px] opacity-80">Online</div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="p-4 bg-[#E5DDD5] h-full flex flex-col gap-4 overflow-y-auto">
               <motion.div 
                 initial={{ x: -20, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 transition={{ delay: 0.5 }}
                 className="bg-sand-bg p-3 rounded-xl rounded-tl-none shadow-sm text-sm max-w-[80%] text-sand-textPrimary border border-sand-border"
               >
                 Namaste! Main Sharma Kirana Assistant hoon. Kaise madad kar sakta hoon?
               </motion.div>
               
               <motion.div 
                 initial={{ x: 20, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 transition={{ delay: 1.5 }}
                 className="bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none shadow-sm text-sm max-w-[80%] ml-auto text-gray-800"
               >
                 Bhaiya, aaj shop khuli hai?
               </motion.div>

               <motion.div 
                 initial={{ x: -20, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 transition={{ delay: 2.5 }}
                 className="bg-sand-bg p-3 rounded-xl rounded-tl-none shadow-sm text-sm max-w-[80%] text-sand-textPrimary border border-sand-border"
               >
                 Haan! Aaj 9 AM - 9 PM khuli hai. Kya order karein? 😊
               </motion.div>
               
               <motion.div 
                 initial={{ x: 20, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 transition={{ delay: 3.5 }}
                 className="bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none shadow-sm text-sm max-w-[80%] ml-auto text-gray-800"
               >
                 1 kg aloo aur 500g tamatar chahiye.
               </motion.div>

               <motion.div 
                 initial={{ x: -20, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 transition={{ delay: 4.5 }}
                 className="bg-sand-bg p-3 rounded-xl rounded-tl-none shadow-sm text-sm max-w-[80%] text-sand-textPrimary border-l-4 border-sand-orange border-y border-r border-sand-border"
               >
                 <div className="font-bold text-[10px] text-sand-orange mb-1 uppercase">Order Confirmed</div>
                 Done! Order confirm. Delivery 30 min mein. Total ₹52 ✓
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-black mb-8 px-6">Ready to automate your support?</h2>
        <button className="bg-sand-orange text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-sand-orange/20 hover:scale-105 transition-transform">
          Talk to Sales
        </button>
      </section>
    </main>
  )
}
