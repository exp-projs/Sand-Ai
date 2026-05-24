'use client'

import ExoHero from '@/components/ExoHero'
import InteractiveNetwork from '@/components/InteractiveNetwork'
import PortfolioGrid from '@/components/PortfolioGrid'
import KineticMarquee from '@/components/KineticMarquee'
import ExoFooter from '@/components/ExoFooter'
import BokehBackdrop from '@/components/BokehBackdrop'
import BackgroundSpotlight from '@/components/BackgroundSpotlight'
import { useEffect } from 'react'

// Unified portfolio case studies dataset

const ALL_PORTFOLIO_ITEMS = [
  {
    title: 'Performance Ads',
    category: 'Paid Advertising',
    image: '/icons/icon-meta-ads.jpg',
    href: '/meta-ads',
    features: [
      'Autonomous high-volume creative copy testing',
      'Lookalike audience targeting systems',
      'Adaptive real-time bid optimization engines',
    ],
  },
  {
    title: 'Digital Architecture',
    category: 'Web Development',
    image: '/icons/icon-website.jpg',
    href: '/web-development',
    features: [
      'Premium, high-converting digital storefronts',
      'Multi-region advanced local SEO optimization',
      'Ultra-fast Next.js dynamic load architecture',
    ],
  },
  {
    title: 'Mobile Applications',
    category: 'App Development',
    image: '/icons/icon-app.jpg',
    href: '/app-dev',
    features: [
      'Bespoke native iOS and Android configurations',
      'Offline-first client data synchronization',
      'Targeted push notifications & secure checkout',
    ],
  },
  {
    title: 'Conversational Core',
    category: 'Conversational AI',
    image: '/icons/icon-chatbot.jpg',
    href: '/chatbot',
    features: [
      '24/7 autonomous customer acquisition and support',
      'Instant lead routing & catalog synchronization',
      'Advanced multilingual dialog processing',
    ],
  },
]

export default function Home() {
  // Hide the layout footer on homepage — we use ExoFooter instead
  useEffect(() => {
    const layoutFooter = document.getElementById('layout-footer')
    if (layoutFooter) {
      layoutFooter.style.display = 'none'
    }
    return () => {
      if (layoutFooter) {
        layoutFooter.style.display = ''
      }
    }
  }, [])

  return (
    <>
      <main className="flex flex-col bg-sand-bg relative overflow-hidden">
        {/* Dynamic Interactive Background Layers */}
        <BokehBackdrop />
        <BackgroundSpotlight />

        {/* Atmospheric Ambient Glow Blobs */}
        <div className="ambient-blob blob-orange w-[600px] h-[600px] top-[8%] left-[-150px]" />
        <div className="ambient-blob blob-purple w-[700px] h-[700px] top-[24%] right-[-200px]" />
        <div className="ambient-blob blob-orange w-[650px] h-[650px] top-[48%] left-[10%]" />
        <div className="ambient-blob blob-purple w-[700px] h-[700px] top-[68%] left-[-200px]" />
        <div className="ambient-blob blob-orange w-[600px] h-[600px] top-[88%] right-[-150px]" />

        {/* Giant Floating Parallax Outline guide words */}
        <div className="parallax-bg-word outline-text text-[14vw] top-[14%] opacity-100 select-none z-0">INTELLIGENCE</div>
        <div className="parallax-bg-word outline-text text-[14vw] top-[38%] opacity-100 select-none z-0">AUTOMATION</div>
        <div className="parallax-bg-word outline-text text-[14vw] top-[62%] opacity-100 select-none z-0">EXPANSION</div>
        <div className="parallax-bg-word outline-text text-[14vw] top-[84%] opacity-100 select-none z-0">EVOLUTION</div>

        <ExoHero />

        <InteractiveNetwork />

        {/* Consolidated Staggered 2-Column Grid */}
        <PortfolioGrid items={ALL_PORTFOLIO_ITEMS} startIndex={0} />

        <KineticMarquee />
      </main>

      <ExoFooter />
    </>
  )
}
