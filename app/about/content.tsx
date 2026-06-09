'use client'

import { useI18n } from '@/lib/i18n/I18nProvider'
import { HeroSection } from '@/components/marketing/HeroSection'
import { StatsBar } from '@/components/marketing/StatsBar'
import { ValuesSection } from '@/components/marketing/ValuesSection'
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection'
import { CtaSection } from '@/components/marketing/CtaSection'
import { SiteNav } from '@/components/marketing/SiteNav'
import { SiteFooter } from '@/components/marketing/SiteFooter'

export function AboutPageContent() {
  const { t } = useI18n()

  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <HeroSection
          title={t('hero.about.title', 'Hurghada-Born. Results-Driven. Since 2015.')}
          subtitle={t('hero.about.kicker', 'About MediaBubble')}
          description={t(
            'hero.about.description',
            "We started MediaBubble in Hurghada because we saw local businesses being underserved by generic agencies that didn't understand the market. Ten years later, we're a team of 22+ and the region's most trusted marketing partner.",
          )}
          ctaButtons={{
            primary:   { label: t('hero.about.cta', 'Work With Us'),      href: '/contact' },
            secondary: { label: t('hero.about.ctaSecondary', 'See Our Results'), href: '/portfolio' },
          }}
          proofPoints={[
            { text: t('hero.about.proof1', 'Founded 2015 in Hurghada, Red Sea') },
            { text: t('hero.about.proof2', '22+ full-time marketing professionals') },
            { text: t('hero.about.proof3', 'Clients in tourism, hospitality, retail, and real estate') },
          ]}
          layout="default"
        />
        <StatsBar />
        <ValuesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
