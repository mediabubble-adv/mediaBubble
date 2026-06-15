'use client'

import { useI18n } from '@/lib/i18n/provider'
import { PageHero } from '@/components/sections/PageHero'
import { InsightsGrid } from '@/components/features/insights/InsightsGrid'
import { CtaSection } from '@/components/sections/CtaSection'
import { MainLayout } from '@/components/layout/MainLayout'

export function InsightsPageContent() {
  const { t } = useI18n()

  return (
    <MainLayout>
        <PageHero
          breadcrumbs={[
            { label: t('nav.home', 'Home'), href: '/' },
            { label: t('hero.blog.kicker', 'Blog') },
          ]}
          kicker={t('hero.blog.kicker', 'The MediaBubble Blog')}
          title={t('hero.blog.title', 'Marketing Insights from the Field')}
          subtitle={t(
            'hero.blog.description',
            "Practical strategy, honest analysis, and real numbers from the team that runs campaigns every day. No recycled content. No fluff.",
          )}
          ctas={[{ label: t('hero.blog.cta', 'Get a Free Audit'), href: '/contact' }]}
        />
        <InsightsGrid />
        <CtaSection />
    </MainLayout>
  )
}
