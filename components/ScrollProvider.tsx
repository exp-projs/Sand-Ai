'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface ScrollProviderProps {
  children: React.ReactNode
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Intercept click events for smooth anchor scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      // If it's a hash link on the current page
      if (href.startsWith('#')) {
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          e.preventDefault()
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      } else if (href === '/') {
        // If they click "Home" / Logo and are already on the home page, scroll to top
        if (window.location.pathname === '/') {
          e.preventDefault()
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  // Handle page changes: reset scroll to top and refresh ScrollTrigger positions
  useEffect(() => {
    // Reset scroll to top instantly to prevent page overlap or visual jumping
    window.scrollTo(0, 0)

    // Delay ScrollTrigger refresh slightly to allow the DOM to settle
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    return () => clearTimeout(timeout)
  }, [pathname])

  return <>{children}</>
}
