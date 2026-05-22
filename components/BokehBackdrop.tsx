'use client'

import React, { useEffect, useState } from 'react'

interface Particle {
  id: number
  top: string
  left: string
  size: number
  duration: number
  delay: number
  color: 'orange' | 'purple'
}

export default function BokehBackdrop() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate distinct particles once on client to prevent server/client hydration mismatch
    const generated: Particle[] = []
    const colors: ('orange' | 'purple')[] = ['orange', 'purple']
    
    for (let i = 0; i < 18; i++) {
      generated.push({
        id: i,
        top: `${5 + Math.random() * 90}%`,
        left: `${2 + Math.random() * 96}%`,
        size: 100 + Math.floor(Math.random() * 180), // sizes between 100px and 280px
        duration: 30 + Math.floor(Math.random() * 40), // slow drift (30s - 70s)
        delay: -Math.floor(Math.random() * 25), // negative delay so they are pre-warmed
        color: colors[i % 2],
      })
    }
    setParticles(generated)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => {
        const bgGradients = {
          orange: 'radial-gradient(circle, rgba(255,138,0,0.05) 0%, rgba(255,138,0,0) 75%)',
          purple: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, rgba(124,58,237,0) 75%)',
        }

        return (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: bgGradients[p.color],
              filter: 'blur(30px)',
              animation: `float-bokeh-${p.color} ${p.duration}s infinite alternate ease-in-out`,
              animationDelay: `${p.delay}s`,
              willChange: 'transform, opacity',
            }}
          />
        )
      })}
    </div>
  )
}
