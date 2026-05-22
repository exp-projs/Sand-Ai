'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export default function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const hasExited = useRef(false)

  useEffect(() => {
    // Check sessionStorage — only show intro once per session
    if (typeof window !== 'undefined') {
      const introSeen = sessionStorage.getItem('introSeen')
      if (!introSeen) {
        setShouldRender(true)
        document.body.style.overflow = 'hidden'
      }
      setIsMounted(true)
    }
  }, [])

  const handleDismiss = useCallback(() => {
    if (hasExited.current) return
    hasExited.current = true

    const overlay = overlayRef.current
    if (!overlay) return

    // Add exit animation class
    overlay.classList.add('intro-exit')

    // After animation, remove overlay and restore scroll
    setTimeout(() => {
      document.body.style.overflow = ''
      sessionStorage.setItem('introSeen', 'true')
      overlay.remove()
    }, 700)
  }, [])

  useEffect(() => {
    if (!shouldRender) return

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleDismiss()
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [shouldRender, handleDismiss])

  // Don't render at all if already seen or not mounted yet
  if (!isMounted || !shouldRender) return null

  // Detect touch device for text
  const isTouchDevice =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches

  return (
    <div
      ref={overlayRef}
      className="intro-overlay"
      onClick={handleDismiss}
      role="button"
      tabIndex={0}
      aria-label="Click to enter site"
    >
      <h1 className="intro-title">Welcome to Sand AI</h1>
      <p className="intro-subtitle intro-pulse">
        {isTouchDevice ? 'Tap to continue' : 'Click to continue'}
      </p>
    </div>
  )
}
