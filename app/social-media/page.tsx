'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductHero from '@/components/ProductHero'
import { Share2, Camera, Calendar, Search } from 'lucide-react'

export default function SocialMediaPage() {
  const [activeTab, setActiveTab] = React.useState('post')

  return (
    <main className="min-h-screen bg-sand-bg">
      <ProductHero 
        badge="AI Content Engine"
        title="Stop Thinking."
        highlightedTitle="Start Posting."
        description="SandAI automatically creates festival posts, product photos, and viral reels scripts. It picks the time, writes the captions, and publishes — with zero effort from you."
        ctaText="Boost My Socials"
        imageSrc="/icons/icon-social.jpg"
        colorVariant="orange"
      />

      {/* Benefits Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Camera />, title: "Product Photos", desc: "AI turns raw photos into studio-quality marketing assets." },
            { icon: <Share2 />, title: "Viral Reels", desc: "Scripts and editing cues that grab attention and engagement." },
            { icon: <Calendar />, title: "Auto Scheduling", desc: "We post when your customers are most active." },
            { icon: <Search />, title: "Smart SEO", desc: "Captions and hashtags tailored to rank in local searches." }
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

      {/* Interactive Instagram Preview */}
      <section className="py-24 bg-sand-bg border-y border-sand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-sand-textPrimary mb-4">
              AI creates, <span className="text-sand-orange">you grow.</span>
            </h2>
            <p className="text-sand-textSecondary">Tap to see different content types created by SandAI</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-4">
                {['post', 'reel', 'festival'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${activeTab === tab ? 'border-sand-orange bg-sand-cardOrange' : 'border-sand-border hover:border-sand-orange/30'}`}
                  >
                    <div>
                      <h4 className="font-bold capitalize">{tab === 'post' ? 'Regular Post' : tab === 'festival' ? 'Festival Greeting' : 'Video Reel Script'}</h4>
                      <p className="text-xs text-sand-textSecondary">Automated creation & scheduling</p>
                    </div>
                    {activeTab === tab && <div className="w-6 h-6 rounded-full bg-sand-orange flex items-center justify-center text-white text-xs">✓</div>}
                  </button>
                ))}
             </div>

             <div className="relative aspect-square max-w-[450px] mx-auto w-full">
                <AnimatePresence mode="wait">
                  {activeTab === 'post' && (
                    <motion.div 
                      key="post"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-sand-bg rounded-3xl border border-sand-border shadow-2xl overflow-hidden"
                    >
                      <div className="p-4 flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-0.5">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px]">📸</div>
                         </div>
                         <div className="text-xs font-bold text-sand-textPrimary">sharma_kirana</div>
                      </div>
                      <div className="aspect-square bg-gray-200 flex items-center justify-center relative">
                         <div className="absolute inset-0 bg-gradient-to-br from-sand-orange/20 to-sand-purple/20" />
                         <span className="text-4xl">🛒</span>
                      </div>
                      <div className="p-4 space-y-2">
                         <div className="flex gap-4 text-xl">
                            <span>❤️</span> <span>💬</span> <span>✈️</span>
                         </div>
                         <div className="text-xs">
                            <span className="font-bold">sharma_kirana</span> Fresh vegetables just arrived! Buy 1kg, get 250g free. Only today! #Freshness #LocalBusiness
                         </div>
                      </div>
                    </motion.div>
                  )}

                   {activeTab === 'festival' && (
                    <motion.div 
                      key="festival"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-sand-bg rounded-3xl border border-sand-border shadow-2xl overflow-hidden"
                    >
                      <div className="aspect-[4/5] bg-[#FFF8EE] flex flex-col items-center justify-center p-8 text-center gap-6">
                         <div className="text-sand-orange text-5xl">🪔</div>
                         <h3 className="font-black text-3xl text-[#8E5A2E]">Happy Diwali</h3>
                         <p className="text-[#8E5A2E] opacity-80 text-sm">Wishing you and your family a year full of light and prosperity.</p>
                         <div className="w-24 h-px bg-[#8E5A2E]/20" />
                         <div className="text-[10px] uppercase tracking-widest text-[#8E5A2E]">From Sharma Kirana</div>
                      </div>
                      <div className="p-4 bg-sand-bg flex justify-between items-center">
                         <div className="text-[10px] font-bold text-sand-textSecondary uppercase">AI Generated Post</div>
                         <div className="flex gap-1">
                            <div className="w-6 h-6 rounded-full bg-sand-orange/10" />
                            <div className="w-6 h-6 rounded-full bg-sand-orange/10" />
                         </div>
                      </div>
                    </motion.div>
                  )}

                   {activeTab === 'reel' && (
                    <motion.div 
                      key="reel"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-sand-deepPurple rounded-3xl border border-sand-border shadow-2xl aspect-[9/16] p-8 text-white flex flex-col justify-between"
                    >
                      <div className="text-[10px] font-bold text-sand-orange uppercase tracking-widest bg-sand-orange/10 w-fit px-2 py-1 rounded">Reel Script</div>
                      <div className="space-y-6">
                         <div>
                            <div className="text-[10px] text-gray-400 mb-1">0:00 - 0:03 (HOOK)</div>
                            <p className="text-sm">"Tired of paying too much for groceries?" (Visual: Point to price tags)</p>
                         </div>
                         <div>
                            <div className="text-[10px] text-gray-400 mb-1">0:03 - 0:08 (CONTENT)</div>
                            <p className="text-sm">Scan the aisle quickly showing the fresh deals today.</p>
                         </div>
                         <div>
                            <div className="text-[10px] text-gray-400 mb-1">0:08 - 0:15 (CTA)</div>
                            <p className="text-sm">"Visit Sharma Kirana before 8 PM tonight!"</p>
                         </div>
                      </div>
                      <button className="w-full bg-white/10 backdrop-blur-md py-3 rounded-xl text-xs font-bold border border-white/10">Use This Script</button>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-sand-deepPurple text-white text-center">
        <h2 className="text-4xl font-black mb-8 px-6">Ready to go viral locally?</h2>
        <button className="bg-sand-orange text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-black/20 hover:scale-105 transition-transform">
          Connect My Instagram
        </button>
      </section>
    </main>
  )
}
