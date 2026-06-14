import CorePhilosophy from '@/components/CorePhilosophy'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Sand AI',
  description: 'Our core philosophy and approach to digital growth.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-sand-bg pt-32 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
        <h1 className="text-5xl md:text-7xl font-poppins font-bold text-sand-textPrimary mb-6 tracking-tight">
          About <span className="text-sand-purple">Sand AI</span>
        </h1>
        <p className="text-lg md:text-xl text-sand-textSecondary max-w-3xl leading-relaxed">
          We are a team of data-driven marketers, engineers, and creatives dedicated to scaling your business predictably. We build robust acquisition systems and automation infrastructure so you can focus on what matters.
        </p>
      </div>

      <CorePhilosophy />
      
      <div className="h-32"></div>
    </main>
  )
}
