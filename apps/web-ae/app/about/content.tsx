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
          title={t('hero.about.title', 'UAE-Focused. Results-Driven. Since 2015.')}
          subtitle={t(
            'hero.about.description',
            "We help UAE businesses grow with marketing that respects local culture and global standards. From Dubai to Abu Dhabi and the Northern Emirates, we combine strategy, creative, and performance under one accountable team.",
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
            t('hero.about.proof1', 'Serving UAE businesses since 2015'),
            t('hero.about.proof2', '22+ full-time marketing professionals'),
            t('hero.about.proof3', 'Clients in hospitality, retail, real estate, and professional services'),
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
