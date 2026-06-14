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
    title: 'Google MCC Setup',
    category: 'Google Ads Manager Accounts',
    image: '/icons/icon-google-mcc.png',
    href: '/google-mcc',
    features: [
      'Consolidated Billing & Invoicing across all client Google Ads accounts',
      'Multi-user Access & Custom Permissions to control staff access levels securely',
      'Shared Libraries for negative keywords, audiences, and conversions',
      'Unified Dashboard for performance monitoring across all accounts at a glance',
    ],
  },
  {
    title: 'Meta Business Manager',
    category: 'Meta Ads Asset Management',
    image: '/icons/icon-meta-ads.jpg',
    href: '/meta-business-manager',
    features: [
      'Centralized asset control for Facebook pages, Instagram accounts, and ad accounts',
      'Secure Partner & Employee access management without sharing personal credentials',
      'Dataset & Conversion API (CAPI) pixel installation for optimal tracking',
      'Domain verification & security center setups to prevent account lockouts',
    ],
  },
  {
    title: 'Looker Studio Dashboards',
    category: 'Automated Custom Reporting',
    image: '/icons/icon-looker-studio.png',
    href: '/looker-studio',
    features: [
      'Direct API integrations with Google Ads, Meta Ads, and GA4',
      'Blended channel spend and Cost-Per-Lead (CPL) dashboards',
      'White-label sharing links for client-facing status reviews',
      'Automated PDF snapshot delivery to stakeholders weekly or monthly',
    ],
  },
  {
    title: 'CRM Integration',
    category: 'Lead Routing & Pipelines',
    image: '/icons/icon-crm.png',
    href: '/crm-integration',
    features: [
      'Automatic lead routing to Google Sheets and Notion databases',
      'Visual Kanban boards and pipelines to track lead status easily',
      'Real-time data logging to secure customer details instantly',
      'Zero monthly CRM subscription fees for growing agencies',
    ],
  },
  {
    title: 'Client Communication',
    category: 'Instant Notification Systems',
    image: '/icons/icon-alerts.png',
    href: '/client-communication',
    features: [
      'Instant Slack notification alerts on new lead signup submissions',
      'Automatic WhatsApp confirmation messages sent directly to leads',
      'Dynamic routing logic based on service selection or region',
      'Sub-minute callback alerts to boost sales conversion rates',
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
        <div className="parallax-bg-word outline-text text-[14vw] top-[15%] id-target opacity-100 select-none z-0">SERVICES</div>
        <div className="parallax-bg-word outline-text text-[14vw] top-[32%] id-target opacity-100 select-none z-0">MANAGEMENT</div>
        <div className="parallax-bg-word outline-text text-[14vw] top-[49%] id-target opacity-100 select-none z-0">REPORTING</div>
        <div className="parallax-bg-word outline-text text-[14vw] top-[66%] id-target opacity-100 select-none z-0">AUTOMATION</div>
        <div className="parallax-bg-word outline-text text-[14vw] top-[83%] id-target opacity-100 select-none z-0">ALERTS</div>

        <ExoHero />

        <InteractiveNetwork />

        {/* Consolidated Staggered 2-Column Grid */}
        <PortfolioGrid items={ALL_PORTFOLIO_ITEMS} startIndex={0} id="services" />

        <KineticMarquee />
      </main>

      <ExoFooter />
    </>
  )
}
