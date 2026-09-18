import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-primary/20 blur-[100px] md:h-96 md:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-secondary-container/25 blur-[100px] md:h-96 md:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[65%] h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]"
      />

      <HeroSection />
      <FeaturesSection />
    </div>
  )
}