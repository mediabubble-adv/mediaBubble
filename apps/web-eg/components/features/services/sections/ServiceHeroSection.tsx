'use client'

import { useI18n } from '@/lib/i18n/provider'
import { HeroSection } from '@/components/sections/HeroSection'
import type { ServiceData } from '@/lib/services-data'

export function ServiceHeroSection({
  hero,
  slug,
}: {
  hero: ServiceData['hero']
  slug: string
}) {
  const { t } = useI18n()
  const label = hero.kicker.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return (
    <HeroSection
      title={hero.title}
      subtitle={hero.kicker}
      description={hero.subtitle}
      image={hero.image}
      imageFallback={hero.imageFallback}
      layout="image-right"
      size="medium"
      ctaButtons={{
        primary: {
          label: t('service.hero.ctaPrimary', 'Free audit'),
          href: '/contact',
        },
        secondary: {
          label: t('service.hero.ctaSecondary', 'See case studies'),
          href: `/case-studies#${label}`,
        },
      }}
      stats={hero.stats.map((s) => ({ number: s.value, label: s.label }))}
    />
  )
}
