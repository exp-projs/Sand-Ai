'use client'

import React from 'react'
import { Instagram, Search, Globe, Users } from 'lucide-react'

const PILLARS = [
  {
    title: 'Meta Ads',
    icon: <Instagram className="w-6 h-6 text-sand-purple" />,
    description: 'Hyper-targeted campaigns across Facebook and Instagram. We leverage advanced CAPI integrations and predictive audience modeling to find your ideal customers and scale your ROAS predictably.',
    color: 'purple',
  },
  {
    title: 'Google Ads',
    icon: <Search className="w-6 h-6 text-sand-orange" />,
    description: 'Capture high-intent search traffic the moment they look for you. From intelligent Search campaigns to Performance Max, we dominate the search engine results page to drive immediate conversions.',
    color: 'orange',
  },
  {
    title: 'Google Free Organic (GFO)',
    icon: <Globe className="w-6 h-6 text-green-500" />,
    description: 'Sustainable, long-term growth without ad spend. We optimize your local SEO and Google Business Profile to ensure your brand ranks organically, capturing free, high-quality traffic 24/7.',
    color: 'green',
  },
  {
    title: 'Social Media Mgmt',
    icon: <Users className="w-6 h-6 text-blue-500" />,
    description: 'Building authentic community and brand trust. We craft compelling, aesthetic content that resonates with your target audience, turning casual followers into loyal, paying brand advocates.',
    color: 'blue',
  },
]

export default function ServicePillars() {
  return (
    <section className="relative w-full py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/5 border border-sand-border/50 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-sand-orange animate-pulse" />
            <span className="text-[10px] md:text-xs font-semibold tracking-widest text-sand-textSecondary uppercase font-inter">
              The Sand AI Ecosystem
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-sand-textPrimary mb-6 tracking-tight">
            Omnichannel Dominance.
          </h2>
          <p className="text-base md:text-lg text-sand-textSecondary leading-relaxed">
            We don't just run ads; we engineer holistic digital ecosystems. By integrating paid acquisition with organic visibility and community engagement, we build sustainable growth engines that dominate your market.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, i) => (
            <div 
              key={i}
              className="group relative p-8 rounded-3xl bg-sand-cardPurple/10 dark:bg-white/[0.02] border border-sand-border/50 backdrop-blur-sm hover:bg-sand-cardPurple/30 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-black/50 border border-sand-border shadow-sm flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                {pillar.icon}
              </div>
              
              <h3 className="text-xl font-poppins font-bold text-sand-textPrimary mb-3 relative z-10">
                {pillar.title}
              </h3>
              
              <p className="text-sm text-sand-textSecondary leading-relaxed relative z-10 font-inter flex-grow">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
