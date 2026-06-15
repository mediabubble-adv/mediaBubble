'use client'

import { useI18n } from '@/lib/i18n/provider'
import { PageHero } from '@/components/sections/PageHero'
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
    <PageHero
      breadcrumbs={[
        { label: t('nav.home', 'Home'), href: '/' },
        { label: t('nav.services', 'Services'), href: '/services' },
        { label: hero.kicker },
      ]}
      kicker={hero.kicker}
      title={hero.title}
      subtitle={hero.subtitle}
      ctas={[
        {
          label: t('service.hero.ctaPrimary', 'Free audit'),
          href: '/contact',
        },
        {
          label: t('service.hero.ctaSecondary', 'See case studies'),
          href: `/case-studies#${label}`,
          variant: 'secondary',
        },
      ]}
      stats={hero.stats.map((s) => ({ value: s.value, label: s.label }))}
    />
  )
}
