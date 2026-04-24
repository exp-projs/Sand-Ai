import { KeyPrinciple } from '@/types'

const PRINCIPLES: KeyPrinciple[] = [
  {
    id: 'p1',
    icon: '✦',
    title: 'AI-Powered Solutions',
    description: 'Smart automation for real results.',
  },
  {
    id: 'p2',
    icon: '📊',
    title: 'Data-Driven Results',
    description: 'Insights that drive meaningful growth.',
  },
  {
    id: 'p3',
    icon: '⚡',
    title: 'Fast Turnaround',
    description: 'Quick execution without compromise.',
  },
  {
    id: 'p4',
    icon: '🔒',
    title: 'Scalable & Secure',
    description: 'Built to scale with enterprise-grade security.',
  },
  {
    id: 'p5',
    icon: '🤝',
    title: 'Dedicated Support',
    description: "We're with you every step.",
  },
]

export default function FooterSection() {
  return (
    <footer>
      {/* Key Principles Strip */}
      <div className="bg-sand-bg py-12 border-t border-sand-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10">
            <h2 className="text-sm font-semibold tracking-[0.2em] text-sand-textSecondary uppercase">
              Key Principles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 border-t border-sand-border pt-10">
            {PRINCIPLES.map((principle) => (
              <div key={principle.id} className="flex flex-col items-center text-center gap-3">
                <div className="text-2xl text-sand-purple">{principle.icon}</div>
                <h4 className="font-poppins font-bold text-sm text-sand-textPrimary">{principle.title}</h4>
                <p className="text-xs text-sand-textSecondary leading-relaxed px-2">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dark Footer */}
      <div className="bg-[#151B1E] py-8 text-sand-textSecondary border-t border-[#1f282d]">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 group">
             <span className="text-sand-purple">✦</span>
             <span className="font-poppins font-bold text-lg text-white tracking-tight">
               sand AI
             </span>
          </div>
          
          <div className="text-xs md:text-sm text-center md:text-left">
            Design System & Layout Guide for sand AI — Built for Clarity. Designed for Developers.
          </div>

          <div className="text-xs flex items-center gap-4">
            <span>Version 1.0</span>
            <span className="w-px h-3 bg-gray-700"></span>
            <span>May 2025</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
