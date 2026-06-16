'use client'

import { Calendar, Shield, MapPin, Eye, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function DiagnosticPage() {
  return (
    <main className="min-h-screen bg-sand-bg pt-32 pb-24 overflow-hidden relative">
      {/* Decorative Glows */}
      <div className="ambient-blob blob-orange w-[500px] h-[500px] top-[10%] left-[-100px] opacity-10" />
      <div className="ambient-blob blob-purple w-[600px] h-[600px] bottom-[10%] right-[-100px] opacity-10" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Back Link */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-bold text-sand-textSecondary hover:text-sand-purple uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-sand-orange tracking-widest uppercase bg-sand-orange/10 px-3.5 py-1.5 rounded-full inline-block">
              Free Growth Audit
            </span>
            <h1 className="font-poppins text-4xl md:text-6xl font-black text-sand-textPrimary leading-none tracking-tight">
              The Diagnostic.
            </h1>
            <p className="text-xl text-sand-textSecondary leading-relaxed font-light">
              A 30-minute collaborative session to inspect your growth pipeline, pinpoint where demand is leaking, and map out concrete resolutions.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sand-textSecondary">
                <Shield className="w-4 h-4 text-sand-purple" />
                Zero Sales Pressure
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sand-textSecondary">
                <MapPin className="w-4 h-4 text-sand-purple" />
                Tailored for Tier-2 India
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-sand-border rounded-3xl overflow-hidden shadow-2xl p-1.5">
            <div className="bg-sand-bg/50 px-4 py-3 border-b border-sand-border flex items-center justify-between text-xs rounded-t-2xl">
              <span className="font-semibold text-sand-textPrimary flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sand-orange" />
                Direct Calendar Booking
              </span>
              <span className="text-[10px] text-green-500 font-bold bg-green-500/10 px-2.5 py-0.5 rounded-full">
                Available Online
              </span>
            </div>
            {/* Embedded cal.com scheduler */}
            <div className="w-full h-[500px]">
              <iframe
                src="https://cal.com/adikri/30min?embed=true"
                className="w-full h-full border-0"
                title="Cal.com Diagnostic Booking"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Grid Section: Team & Process */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-sand-border pt-16">
          {/* Left Column: Who You Speak With */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <h3 className="font-poppins text-2xl font-bold text-sand-textPrimary">
                Who you’ll speak with
              </h3>
              <p className="text-xs text-sand-textSecondary font-light">
                We review your channels and tech stack live. No placeholders, no intermediaries.
              </p>
            </div>

            <div className="space-y-6">
              {/* Bio 1 */}
              <div className="bg-sand-cardPurple/50 border border-sand-border rounded-2xl p-6 space-y-3">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-poppins font-bold text-sand-textPrimary text-base">
                    Srivatsa N
                  </h4>
                  <span className="text-[10px] font-bold text-sand-purple uppercase tracking-wider">
                    Strategy & Growth
                  </span>
                </div>
                <p className="text-xs text-sand-textSecondary leading-relaxed font-light">
                  Background in decision science and B2B growth systems. Focuses on diagnosing where buyer interest breaks down between search intent, landing page copy, and final conversion triggers.
                </p>
              </div>

              {/* Bio 2 */}
              <div className="bg-sand-cardPurple/50 border border-sand-border rounded-2xl p-6 space-y-3">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-poppins font-bold text-sand-textPrimary text-base">
                    Adithya K V
                  </h4>
                  <span className="text-[10px] font-bold text-sand-purple uppercase tracking-wider">
                    Tech & Execution
                  </span>
                </div>
                <p className="text-xs text-sand-textSecondary leading-relaxed font-light">
                  Builds and operates pipeline software and automation stacks. Approaches websites, APIs, and ad tracking pixels as code: highly measurable, but fragile under wrong configurations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: The Process */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="font-poppins text-2xl font-bold text-sand-textPrimary">
              We trace the path from intent to action.
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3 p-4 bg-sand-cardPurple/20 border border-sand-border rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-sand-purple/10 text-sand-purple flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h4 className="font-poppins font-bold text-sand-textPrimary text-sm">
                  Review Surfaces
                </h4>
                <p className="text-xs text-sand-textSecondary leading-relaxed font-light">
                  We look at your homepage, pricing page, and landing pages. Wherever intent meets explanations.
                </p>
              </div>

              <div className="space-y-3 p-4 bg-sand-cardPurple/20 border border-sand-border rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-sand-purple/10 text-sand-purple flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h4 className="font-poppins font-bold text-sand-textPrimary text-sm">
                  Trace One Channel
                </h4>
                <p className="text-xs text-sand-textSecondary leading-relaxed font-light">
                  We select one primary acquisition channel—Search, Meta ads, or Organic—and trace the entire conversion sequence.
                </p>
              </div>

              <div className="space-y-3 p-4 bg-sand-cardPurple/20 border border-sand-border rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-sand-purple/10 text-sand-purple flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h4 className="font-poppins font-bold text-sand-textPrimary text-sm">
                  Name the Leak
                </h4>
                <p className="text-xs text-sand-textSecondary leading-relaxed font-light">
                  We isolate where attention drops, why it drops, and supply a concrete checklist to repair it.
                </p>
              </div>
            </div>

            {/* Fictionalized Case Study */}
            <div className="border border-sand-border bg-sand-cardPurple/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-sand-orange uppercase tracking-wider">
                  Real-world Pattern Example
                </span>
                <span className="text-xs text-sand-textSecondary font-semibold">
                  Traffic to Demo Funnel
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-sand-textSecondary">
                <div className="space-y-2 border-l border-sand-border pl-4">
                  <h5 className="font-bold text-sand-textPrimary">The Issue:</h5>
                  <p className="leading-relaxed font-light">
                    Landing page lists generic product features and dashboard integrations. High traffic, but visitors leave thinking "maybe later."
                  </p>
                </div>
                <div className="space-y-2 border-l border-sand-border pl-4">
                  <h5 className="font-bold text-sand-textPrimary">The Repair:</h5>
                  <p className="leading-relaxed font-light">
                    Open with the exact search pain point. Establish core authority first, then introduce features. Conversion rate jumps from 0.5% to 3.5%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
