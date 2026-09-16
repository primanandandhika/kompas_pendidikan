import Link from 'next/link'
import type { Feature } from '@/lib/data/features'

export default function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-surface-container-lowest p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl md:p-8">
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.iconBg} ${feature.iconText} shadow-sm transition-transform duration-300 group-hover:scale-110 md:h-14 md:w-14`}>
            <span className="material-symbols-outlined text-[26px] md:text-[30px]">{feature.icon}</span>
          </div>
          <span className={`rounded-full ${feature.badgeBg} ${feature.badgeText} px-2.5 py-1 font-label-sm text-label-sm font-bold uppercase tracking-wider`}>
            {feature.badge}
          </span>
        </div>

        <div className="space-y-1.5">
          <h3 className={`font-headline-sm text-headline-sm text-on-surface transition-colors ${feature.hoverText} md:font-headline-md md:text-headline-md`}>
            {feature.title}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant md:font-body-md md:text-body-md">
            {feature.description}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between pt-6">
        <Link
          href={feature.href}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-label-lg text-label-lg text-on-primary shadow-sm transition-all duration-200 hover:bg-primary-container"
        >
          Buka
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
        <span className="font-body-sm text-body-sm text-outline">{feature.footer}</span>
      </div>
    </article>
  )
}