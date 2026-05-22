'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface EditorialTextProps {
  text: string
  align?: 'center' | 'left'
}

export default function EditorialText({ text, align = 'center' }: EditorialTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const words = el.querySelectorAll('.mask-word')

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(words, {
          y: '0%',
          rotate: 0,
          skewY: 0,
          duration: 1.2,
          stagger: 0.02,
          ease: 'power3.out',
        })
      },
      once: true,
    })

    return () => {
      trigger.kill()
    }
  }, [])

  const rawWords = text.split(' ')

  return (
    <section
      className={`py-24 md:py-40 px-6 skew-element ${
        align === 'center' ? 'flex justify-center' : ''
      }`}
    >
      <div
        ref={containerRef}
        className={`exo-editorial text-balance ${
          align === 'center' ? 'text-center mx-auto' : 'ml-auto mr-auto md:ml-[10%]'
        }`}
      >
        {rawWords.map((word, idx) => (
          <span
            key={idx}
            className="inline-block overflow-hidden align-bottom mr-[0.22em] pb-[0.12em] -mb-[0.12em] last:mr-0"
          >
            <span
              className="mask-word inline-block translate-y-[110%] rotate-[6deg] skew-y-[4deg]"
              style={{
                willChange: 'transform',
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}

