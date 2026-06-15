'use client'

import { useI18n } from '@/lib/i18n/provider'
import { PageHero } from '@/components/sections/PageHero'
import { StatsBar } from '@/components/sections/StatsBar'
import { ValuesSection } from '@/components/sections/ValuesSection'
import { AboutMethodologySection } from '@/components/sections/AboutMethodologySection'
import { ClientLogosSection } from '@/components/sections/ClientLogosSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { MainLayout } from '@/components/layout/MainLayout'

export function AboutPageContent() {
  const { t } = useI18n()

  return (
    <MainLayout>
        <PageHero
          breadcrumbs={[
            { label: t('nav.home', 'Home'), href: '/' },
            { label: t('hero.about.kicker', 'About') },
          ]}
          kicker={t('hero.about.kicker', 'About MediaBubble')}
          title={t('hero.about.title', 'Hurghada-Born. Results-Driven. Since 2015.')}
          subtitle={t(
            'hero.about.description',
            "We started MediaBubble in Hurghada because we saw local businesses being underserved by generic agencies that didn't understand the market. Ten years later, we're a team of 22+ and the region's most trusted marketing partner.",
          )}
          ctas={[
            { label: t('hero.about.cta', 'Work With Us'), href: '/contact' },
            {
              label: t('hero.about.ctaSecondary', 'See Our Results'),
              href: '/portfolio',
              variant: 'secondary',
            },
          ]}
          proofPoints={[
            t('hero.about.proof1', 'Founded 2015 in Hurghada, Red Sea'),
            t('hero.about.proof2', '22+ full-time marketing professionals'),
            t('hero.about.proof3', 'Clients in tourism, hospitality, retail, and real estate'),
          ]}
        />
        <StatsBar />
        <ValuesSection />
        <AboutMethodologySection />
        <ClientLogosSection />
        <TestimonialsSection />
        <CtaSection />
    </MainLayout>
  )
}
