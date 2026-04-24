import HeroSection from '@/components/HeroSection'
import ScrollIntroAnimation from '@/components/ScrollIntroAnimation'
import StatsBar from '@/components/StatsBar'
import ServicesSection from '@/components/ServicesSection'
import ProcessSection from '@/components/ProcessSection'
import UIComponentsSection from '@/components/UIComponentsSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-sand-bg">
      <HeroSection />
      <ScrollIntroAnimation />
      <StatsBar />
      <ServicesSection />
      <ProcessSection />
      <UIComponentsSection />
    </main>
  )
}
