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
          title={t('about.hero.title', 'UAE-Focused. Results-Driven. Since 2015.')}
          subtitle={t(
            'about.hero.subtitle',
            "We help UAE businesses grow with marketing that respects local culture and global standards. From Dubai to Abu Dhabi and the Northern Emirates, we combine strategy, creative, and performance under one accountable team.",
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
            t('about.hero.proof1', 'Serving UAE businesses since 2015'),
            t('about.hero.proof2', '22+ full-time marketing professionals'),
            t('about.hero.proof3', 'Clients in hospitality, retail, real estate, and professional services'),
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
