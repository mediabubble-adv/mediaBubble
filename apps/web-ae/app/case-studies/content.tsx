'use client'

import { useI18n } from '@/lib/i18n/provider'
import { PageHero } from '@/components/sections/PageHero'
import { CaseStudiesGrid } from '@/components/features/case-studies/CaseStudiesGrid'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { MainLayout } from '@/components/layout/MainLayout'

export function CaseStudiesPageContent() {
  const { t } = useI18n()

  return (
    <MainLayout>
        <PageHero
          breadcrumbs={[
            { label: t('nav.home', 'Home'), href: '/' },
            { label: t('hero.portfolio.kicker', 'Portfolio') },
          ]}
          kicker={t('hero.portfolio.kicker', 'Case Studies')}
          title={t('hero.portfolio.title', 'Work That Speaks for Itself')}
          subtitle={t(
            'hero.portfolio.description',
            "We measure success in outcomes, not outputs. Every case study here shows the problem, the strategy, and the result — in numbers.",
          )}
          ctas={[{ label: t('hero.portfolio.cta', 'Start Your Project'), href: '/contact' }]}
          proofPoints={[
            t('hero.portfolio.proof1', '500+ projects delivered since 2015'),
            t('hero.portfolio.proof2', 'Clients across hospitality, retail, real estate, and professional services'),
            t('hero.portfolio.proof3', 'Average 35% growth in client revenue within 12 months'),
          ]}
        />
        <CaseStudiesGrid />
        <TestimonialsSection />
        <CtaSection />
    </MainLayout>
  )
}
