'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ProductHero from '@/components/ProductHero'
import { Layout, Smartphone, Search, ShoppingCart } from 'lucide-react'

export default function WebsitePage() {
  return (
    <main className="min-h-screen bg-sand-bg">
      <ProductHero 
        badge="High-Converting AI Sites"
        title="Your Shop's New"
        highlightedTitle="Digital Front Door."
        description="A fast, mobile-friendly website with local SEO means when someone searches for your category in your city — you appear first. Simple, professional, and built in minutes."
        ctaText="Build My Website"
        imageSrc="/icons/icon-website.jpg"
        colorVariant="purple"
      />

      {/* Stats/Proof Section */}
      <section className="py-12 bg-sand-bg border-y border-sand-border">
         <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24">
            {[
              { label: "Mobile Speed", value: "98/100" },
              { label: "Local Ranking", value: "#1" },
              { label: "Setup Time", value: "< 24 hrs" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                 <div className="text-4xl font-black text-sand-purple mb-1">{stat.value}</div>
                 <div className="text-xs font-bold text-sand-textSecondary uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
         </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            {[
              { icon: <Layout />, title: "Product/Menu Catalog", desc: "Display your items with beautiful photos and real-time pricing updates." },
              { icon: <Smartphone />, title: "Mobile-First Design", desc: "Built to look perfect on every phone, where 90% of your customers are." },
              { icon: <Search />, title: "Local SEO Optimizer", desc: "We handle the keywords and Google settings to make sure you're found locally." },
              { icon: <ShoppingCart />, title: "Online Enquiries", desc: "Let customers book appointments or ask for quotes directly from your site." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 group"
              >
                <div className="w-14 h-14 shrink-0 bg-sand-purple/10 rounded-2xl flex items-center justify-center text-sand-purple group-hover:bg-sand-purple group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <div>
                   <h3 className="font-bold text-xl text-sand-textPrimary mb-2">{feature.title}</h3>
                   <p className="text-sand-textSecondary text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Website Preview Laptop/Mobile Stack */}
          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="bg-sand-cardPurple rounded-3xl shadow-2xl border border-sand-border p-3 aspect-video relative z-10"
             >
                <div className="bg-sand-bg w-full h-full rounded-2xl overflow-hidden border border-sand-border flex flex-col">
                   <div className="h-8 border-b border-sand-border bg-sand-cardPurple flex items-center px-4 gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <div className="ml-4 bg-sand-border h-4 w-48 rounded text-[8px] flex items-center px-2 text-gray-400">sharma-kirana.sandai.in</div>
                   </div>
                   <div className="flex-1 p-6 space-y-4">
                      <div className="h-4 w-32 bg-sand-purple/20 rounded" />
                      <div className="h-12 w-full bg-sand-cardPurple rounded-lg" />
                      <div className="grid grid-cols-3 gap-4">
                         <div className="aspect-square bg-sand-cardOrange rounded-lg" />
                         <div className="aspect-square bg-sand-cardPurple rounded-lg" />
                         <div className="aspect-square bg-sand-cardOrange rounded-lg" />
                      </div>
                   </div>
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: 40 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.3 }}
               className="absolute -bottom-8 -right-8 w-40 bg-sand-cardPurple rounded-3xl shadow-2xl border-[4px] border-gray-900 p-1.5 aspect-[9/18] z-20"
             >
                <div className="bg-sand-bg w-full h-full rounded-2xl overflow-hidden flex flex-col items-center p-4 gap-4">
                   <div className="w-8 h-8 rounded-full bg-sand-purple/20" />
                   <div className="w-full h-2 bg-sand-border rounded" />
                   <div className="w-full h-2 bg-sand-border rounded" />
                   <div className="w-full h-24 bg-sand-cardOrange rounded-xl" />
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center bg-sand-cardPurple/50">
        <h2 className="text-3xl md:text-5xl font-black mb-8 px-6">Claim your spot on <span className="text-sand-purple">Page 1 of Google.</span></h2>
        <button className="bg-sand-purple text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-sand-purple/20 hover:scale-105 transition-transform">
          Start Your Website
        </button>
      </section>
    </main>
  )
}
