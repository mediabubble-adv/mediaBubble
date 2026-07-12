'use client'

import { useI18n } from '@/lib/i18n/provider'
import { HeroSection } from '@/components/sections/HeroSection'
import { CaseStudiesGrid } from '@/components/features/case-studies/CaseStudiesGrid'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { MainLayout } from '@/components/layout/MainLayout'

export function CaseStudiesPageContent() {
  const { t } = useI18n()

  return (
    <MainLayout>
        <HeroSection
          title={t('hero.portfolio.title', 'Work That Speaks for Itself')}
          subtitle={t('hero.portfolio.kicker', 'Case Studies')}
          description={t(
            'hero.portfolio.description',
            "We measure success in outcomes, not outputs. Every case study here shows the problem, the strategy, and the result, in numbers.",
          )}
          backgroundImage="/assets/hero/premium/services-hero-premium.webp"
          mode="background-blur"
          size="medium"
          ctaButtons={{
            primary: { label: t('hero.portfolio.cta', 'Start Your Project'), href: '/contact' },
          }}
          proofPoints={[
            { text: t('hero.portfolio.proof1', '500+ projects delivered since 2015') },
            { text: t('hero.portfolio.proof2', 'Clients across tourism, hospitality, real estate, and retail') },
            { text: t('hero.portfolio.proof3', 'Average 35% growth in client revenue within 12 months') },
          ]}
        />
        <CaseStudiesGrid />
        <TestimonialsSection />
        <CtaSection />
    </MainLayout>
  )
}
