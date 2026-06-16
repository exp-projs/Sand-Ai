'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, ArrowLeft } from 'lucide-react'

export interface NoteArticle {
  slug: string
  title: string
  date: string
  readTime: string
  summary: string
  content: string[]
}

export const NOTES_DATA: NoteArticle[] = [
  {
    slug: 'why-switching-channels-doesnt-work',
    title: "Why Switching Ad Channels Doesn't Work",
    date: 'June 15, 2026',
    readTime: '4 min read',
    summary: 'If your conversions are flat, the constraint is rarely the channel. It is usually the alignment between the visitor’s intent and your landing page positioning.',
    content: [
      "We see this sequence play out repeatedly: Google Ads spend grows, but the cost per lead (CPL) rises and conversion stays flat. The conclusion? 'Google Ads doesn't work for us anymore. Let's switch to Meta Ads or LinkedIn Ads.'",
      "So, the budget is shifted. New creatives are built. Campaigns go live. And for the first two weeks, performance looks promising. Then, the numbers slide back to where they were.",
      "The issue is rarely the channel itself. All major acquisition channels—Google Search, Meta, LinkedIn, Organic Search—have access to your target audience. The breakdown happens where the traffic lands.",
      "If visitors arrive on a landing page that lists generic product features, is cluttered with excessive call-to-actions, or ignores the exact pain point they searched for, they will bounce. Switching the traffic source just changes the logo on the server logs—it does not change the core conversion bottleneck.",
      "Instead of changing channels, do this first: Trace one channel's full path. Match the search query to the page headline. If they search for 'looker studio integrations,' the page must show a Looker dashboard immediately, not a generic contact page. Remove friction before changing traffic."
    ]
  },
  {
    slug: 'why-search-visibility-doesnt-create-demand',
    title: "Why Search Visibility Doesn't Create Demand",
    date: 'June 12, 2026',
    readTime: '5 min read',
    summary: 'Ranking for high-volume keywords feels good. But if those searches are informational rather than commercial, traffic grows while revenue remains flat.',
    content: [
      "SEO reports often look healthy: impressions are up 150%, organic clicks are rising, and the rankings spreadsheet is full of green numbers. Yet, the sales pipeline remains quiet.",
      "How does organic search visibility grow while pipeline stays flat? Because of the gap between informational intent and buying intent.",
      "An informational keyword like 'what is conversion rate optimization' attracts people researching definitions. A commercial keyword like 'conversion rate optimization agency for local business' attracts buyers ready to hire. If your SEO agency focuses entirely on high-volume informational keywords, you will get traffic, but they will never become pipeline.",
      "To fix this, you must audit your rankings. Group your keywords by intent stage. Focus content creation and landing page optimizations on decision-stage comparisons and specific local business pain points. Volume will be lower, but conversion value will be exponentially higher."
    ]
  },
  {
    slug: 'optimization-score-is-googles-strategy',
    title: "The Optimization Score is Google's Strategy",
    date: 'June 8, 2026',
    readTime: '6 min read',
    summary: "Google's optimization score is designed to maximize ad inventory usage and automation training. Here is how to prioritize your margin instead.",
    content: [
      "Inside Google Ads, the dashboard will warn you: 'Your Optimization Score is 72%. Apply recommendations to reach 100%.' It feels like a report card. You click 'apply all,' and the score jumps to 100%.",
      "But what actually happened? Google's automated recommendations frequently turn on broad match keywords, expand targeting to low-intent display networks, and raise budgets to run automated bidding setups.",
      "These recommendations are optimized for Google's goal: maximizing ad volume and gathering training data for their automated models. They are not optimized for your profit margin.",
      "Never apply ad suggestions blindly. Turn off auto-apply recommendations. Tightly control keyword matching (use phrase and exact match for high intent), build clean negative keyword lists, and audit display expansion settings. Let your business margin drive the budget, not dashboard scores."
    ]
  },
  {
    slug: 'why-b2b-website-redesigns-fail',
    title: "Why B2B Website Redesigns Fail",
    date: 'June 3, 2026',
    readTime: '5 min read',
    summary: 'Most website redesigns make pages look modern but fail to increase conversion. They fail because they do not trace where trust actually breaks down.',
    content: [
      "A website redesign is a common reaction to slow sales: 'Our website looks outdated. We need a modern, premium look to build trust.'",
      "Tens of thousands of rupees are spent. Designers build beautiful layouts with sleek fonts. The new site is launched. And... conversion rates stay exactly the same, or sometimes even drop.",
      "Why? Because trust is not build by clean layouts alone. Trust is built by context and conviction. If the website does not explain how you solve the user's specific problem, clean fonts will not save it.",
      "A successful website redesign is not about cosmetics; it is about architecture. Start by mapping out the questions a buyer asks in a live sales call. Address those questions sequentially on the homepage. Back up claims with concrete performance metrics and clean social proof. Design should support the explanation, not replace it."
    ]
  }
]

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNotes = NOTES_DATA.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.summary.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-sand-bg pt-32 pb-24 overflow-hidden relative">
      {/* Glows */}
      <div className="ambient-blob blob-purple w-[500px] h-[500px] top-[15%] right-[-100px] opacity-10" />
      
      <div className="mx-auto max-w-4xl px-6 relative z-10">
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

        {/* Header */}
        <div className="space-y-6 mb-16">
          <h1 className="font-poppins text-4xl md:text-6xl font-black text-sand-textPrimary leading-none tracking-tight">
            Notes & Insights
          </h1>
          <p className="text-base md:text-lg text-sand-textSecondary max-w-xl font-light leading-relaxed">
            Technical breakdowns, common marketing patterns, and diagnostic case logs from operating digital systems. No fluff, just what works.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md pt-4">
            <Search className="absolute left-4 top-7 w-4 h-4 text-sand-textSecondary" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-sand-cardPurple/50 border border-sand-border rounded-xl text-sm focus:outline-none focus:border-sand-purple focus:ring-1 focus:ring-sand-purple text-sand-textPrimary transition-all placeholder:text-sand-textSecondary/60"
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="flex flex-col divide-y divide-sand-border">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <article key={note.slug} className="py-8 first:pt-0 last:pb-0 group">
                <Link href={`/notes/${note.slug}`} className="block space-y-3">
                  <div className="flex items-center gap-3 text-xs font-semibold text-sand-textSecondary">
                    <span>{note.date}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-sand-border" />
                    <span>{note.readTime}</span>
                  </div>
                  
                  <h2 className="font-poppins font-bold text-xl md:text-2xl text-sand-textPrimary group-hover:text-sand-purple transition-colors">
                    {note.title}
                  </h2>
                  
                  <p className="text-sm text-sand-textSecondary leading-relaxed font-light">
                    {note.summary}
                  </p>
                  
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sand-purple uppercase tracking-wider pt-2 group-hover:text-sand-deep-purple transition-colors">
                    Read article
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-sand-textSecondary text-sm">No notes found matching your search query.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
