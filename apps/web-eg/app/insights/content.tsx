'use client'

import { useI18n } from '@/lib/i18n/provider'
import { HeroSection } from '@/components/sections/HeroSection'
import { InsightsGrid } from '@/components/features/insights/InsightsGrid'
import { CtaSection } from '@/components/sections/CtaSection'
import { MainLayout } from '@/components/layout/MainLayout'

export function InsightsPageContent() {
  const { t } = useI18n()

  return (
    <MainLayout>
        <HeroSection
          title={t('hero.blog.title', 'Marketing Insights from the Field')}
          subtitle={t('hero.blog.kicker', 'The MediaBubble Blog')}
          description={t(
            'hero.blog.description',
            "Practical strategy, honest analysis, and real numbers from the team that runs campaigns every day. No recycled content. No fluff.",
          )}
          backgroundImage="/assets/hero/premium/insights-featured.webp"
          mode="background-blur"
          size="small"
          ctaButtons={{
            primary: { label: t('hero.blog.cta', 'Get a Free Audit'), href: '/contact' },
          }}
        />
        <InsightsGrid />
        <CtaSection />
    </MainLayout>
  )
}
