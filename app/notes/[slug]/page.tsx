'use client'

import { use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react'
import { NOTES_DATA } from '../page'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function ArticlePage({ params }: PageProps) {
  const { slug } = use(params)
  
  const article = NOTES_DATA.find((item) => item.slug === slug)

  if (!article) {
    return (
      <main className="min-h-screen bg-sand-bg pt-32 pb-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-sand-textPrimary font-poppins">Article not found</h1>
          <p className="text-sm text-sand-textSecondary max-w-xs mx-auto">
            The note you are looking for does not exist or has been moved.
          </p>
          <div className="pt-4">
            <Link
              href="/notes"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sand-purple uppercase tracking-wider hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Notes
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Find next article for suggestions at bottom
  const currentIndex = NOTES_DATA.findIndex((item) => item.slug === slug)
  const nextArticle = NOTES_DATA[(currentIndex + 1) % NOTES_DATA.length]

  return (
    <main className="min-h-screen bg-sand-bg pt-32 pb-24 overflow-hidden relative">
      <div className="ambient-blob blob-orange w-[450px] h-[450px] top-[10%] left-[-150px] opacity-10" />
      
      <div className="mx-auto max-w-3xl px-6 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-12">
          <Link
            href="/notes"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sand-textSecondary hover:text-sand-purple uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Notes
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-6 border-b border-sand-border pb-10 mb-10">
          <div className="flex items-center gap-4 text-xs font-semibold text-sand-textSecondary">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-sand-orange" />
              {article.date}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-sand-border" />
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sand-purple" />
              {article.readTime}
            </span>
          </div>

          <h1 className="font-poppins text-3xl md:text-5xl font-black text-sand-textPrimary leading-tight tracking-tight">
            {article.title}
          </h1>
          
          <p className="text-base text-sand-textSecondary leading-relaxed border-l-2 border-sand-orange pl-4 italic">
            {article.summary}
          </p>
        </div>

        {/* Article Body */}
        <div className="prose dark:prose-invert max-w-none text-sand-textPrimary space-y-6 text-base md:text-lg leading-relaxed font-light">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-sand-cardPurple/50 border border-sand-border rounded-2xl p-8 text-center space-y-4 my-16">
          <h3 className="font-poppins font-bold text-xl text-sand-textPrimary">
            Want to diagnose your growth channels?
          </h3>
          <p className="text-sm text-sand-textSecondary max-w-md mx-auto leading-relaxed font-light">
            We will trace your metrics and trace the source of leakages. Let's find your bottlenecks together.
          </p>
          <div className="pt-2">
            <Link
              href="/diagnostic"
              className="rounded-full bg-sand-purple px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-sand-deep-purple transition-all inline-flex items-center gap-1.5"
            >
              Book the Diagnostic call
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Suggestion Footer */}
        {nextArticle && (
          <div className="border-t border-sand-border pt-10 mt-10">
            <span className="text-[10px] uppercase font-bold text-sand-textSecondary tracking-wider block mb-4">
              Next Note
            </span>
            <Link href={`/notes/${nextArticle.slug}`} className="group block space-y-2 max-w-xl">
              <h4 className="font-poppins font-bold text-lg text-sand-textPrimary group-hover:text-sand-purple transition-colors">
                {nextArticle.title}
              </h4>
              <p className="text-xs text-sand-textSecondary leading-relaxed font-light">
                {nextArticle.summary}
              </p>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-sand-purple group-hover:text-sand-deep-purple transition-colors pt-1">
                Read next note
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
