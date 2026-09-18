import { features } from '@/lib/data/features'
import FeatureCard from './FeatureCard'

export default function FeaturesSection() {
  return (
    <section id="layanan-inti" className="w-full bg-background px-4 py-14 md:px-6 md:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-8 md:space-y-12">
        <div className="max-w-2xl space-y-2">
          <span className="font-label-md text-label-md font-bold uppercase tracking-widest text-primary">
            Empat Layanan Utama
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface md:font-headline-lg md:text-headline-lg">
            Pilih Layanan
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}