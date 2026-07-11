import HeroScene from '@/components/HeroScene'
import ServicesSection from '@/components/ServicesSection'
import PortfolioGallery from '@/components/PortfolioGallery'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* 3D Cinematic Intro Landscape */}
      <HeroScene />
      
      {/* Luxury Services Grid */}
      <ServicesSection />

      {/* Real Wedding Portfolio Showcase */}
      <PortfolioGallery />
      
      {/* Floating 24/7 Concierge Connect */}
      <WhatsAppFloat />
    </main>
  )
}