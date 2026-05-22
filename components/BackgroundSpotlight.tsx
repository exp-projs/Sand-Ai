'use client'

import React, { useEffect, useState } from 'react'

export default function BackgroundSpotlight() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      })
      if (!visible) setVisible(true)
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className="absolute pointer-events-none z-0 rounded-full w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 transition-all duration-[1s] cubic-bezier(0.1, 0.8, 0.2, 1) will-change-transform mix-blend-plus-lighter opacity-35 dark:opacity-20"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: 'radial-gradient(circle, rgba(255,138,0,0.14) 0%, rgba(124,58,237,0.06) 45%, transparent 70%)',
        filter: 'blur(70px)',
      }}
    />
  )
}
