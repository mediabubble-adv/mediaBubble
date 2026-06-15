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
            { label: t('about.hero.kicker', 'About') },
          ]}
          kicker={t('about.hero.kicker', 'About MediaBubble')}
          title={t('about.hero.title', 'Hurghada-Born. Results-Driven. Since 2015.')}
          subtitle={t(
            'about.hero.subtitle',
            "We started MediaBubble in Hurghada because we saw local businesses being underserved by generic agencies that didn't understand the market. Ten years later, we're a team of 22+ and the region's most trusted marketing partner.",
          )}
          ctas={[
            { label: t('about.hero.cta', 'Work With Us'), href: '/contact' },
            {
              label: t('about.hero.ctaSecondary', 'See Our Results'),
              href: '/case-studies',
              variant: 'secondary',
            },
          ]}
          proofPoints={[
            t('about.hero.proof1', 'Founded 2015 in Hurghada, Red Sea'),
            t('about.hero.proof2', '22+ full-time marketing professionals'),
            t('about.hero.proof3', 'Clients in tourism, hospitality, retail, and real estate'),
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
