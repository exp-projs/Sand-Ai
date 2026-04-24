import React from 'react'

export interface NavItem {
  label: string
  href: string
}

export interface StatCard {
  id: string
  label: string
  value: string
  delta?: string
  position: { top?: string; bottom?: string; left?: string; right?: string }
  variant: 'purple' | 'orange' | 'white'
}

export interface FeatureCard {
  icon: string
  title: string
  description: string
  href: string
}

export interface Service {
  id: string
  number: string
  icon: string
  title: string
  description: string
  features: string[]
}

export interface PricingTier {
  name: string
  price: number
  period: string
  features: string[]
  isPopular: boolean
  ctaLabel: string
}

export interface ProcessStep {
  id: string
  number: string
  title: string
  illustration: string
  details: string[]
}

export interface UIComponent {
  id: string
  name: string
  preview: React.ReactNode
}

export interface KeyPrinciple {
  id: string
  icon: string
  title: string
  description: string
}

export interface SocialProofLogo {
  id: string
  name: string
  path: string
}
