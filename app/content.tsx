'use client'

import { useI18n } from '@/lib/i18n/I18nProvider'
import { HeroSection } from '@/components/marketing/HeroSection'
import { ServicesSection } from '@/components/marketing/ServicesSection'
import { StatsBar } from '@/components/marketing/StatsBar'
import { CtaSection } from '@/components/marketing/CtaSection'
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection'
import { ClientLogosSection } from '@/components/marketing/ClientLogosSection'
import { SiteNav } from '@/components/marketing/SiteNav'
import { SiteFooter } from '@/components/marketing/SiteFooter'

export function HomePageContent() {
  const { t } = useI18n()

  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <HeroSection
          title={t('hero.home.title', 'We Turn Local Businesses Into Market Leaders')}
          subtitle={t('hero.home.kicker', "Hurghada's #1 Marketing Agency")}
          description={t(
            'hero.home.description',
            "MediaBubble is a full-service marketing agency based in Hurghada, Egypt. Since 2015, we've helped 200+ brands grow through SEO, branding, web development, and paid advertising — measuring outcomes, not just outputs.",
          )}
          ctaButtons={{
            primary:   { label: t('hero.home.cta', 'Get Your Free Strategy Audit'), href: '/contact' },
            secondary: { label: t('hero.home.ctaSecondary', 'View Case Studies'),   href: '/portfolio' },
          }}
          proofPoints={[
            { text: t('hero.home.proof1', '35% average client growth in 12 months') },
            { text: t('hero.home.proof2', '92% client retention rate') },
            { text: t('hero.home.proof3', '500+ successful projects delivered') },
          ]}
          layout="default"
        />
        <ClientLogosSection />
        <StatsBar />
        <ServicesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
