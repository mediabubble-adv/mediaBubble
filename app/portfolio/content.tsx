'use client'

import { useI18n } from '@/lib/i18n/I18nProvider'
import { HeroSection } from '@/components/marketing/HeroSection'
import { PortfolioGrid } from '@/components/marketing/PortfolioGrid'
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection'
import { CtaSection } from '@/components/marketing/CtaSection'
import { SiteNav } from '@/components/marketing/SiteNav'
import { SiteFooter } from '@/components/marketing/SiteFooter'

export function PortfolioPageContent() {
  const { t } = useI18n()

  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <HeroSection
          title={t('hero.portfolio.title', 'Work That Speaks for Itself')}
          subtitle={t('hero.portfolio.kicker', 'Case Studies')}
          description={t(
            'hero.portfolio.description',
            "We measure success in outcomes, not outputs. Every case study here shows the problem, the strategy, and the result — in numbers.",
          )}
          ctaButtons={{
            primary: { label: t('hero.portfolio.cta', 'Start Your Project'), href: '/contact' },
          }}
          proofPoints={[
            { text: t('hero.portfolio.proof1', '500+ projects delivered since 2015') },
            { text: t('hero.portfolio.proof2', 'Clients across tourism, hospitality, real estate, and retail') },
            { text: t('hero.portfolio.proof3', 'Average 35% growth in client revenue within 12 months') },
          ]}
          layout="default"
        />
        <PortfolioGrid />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
