'use client'

import { useI18n } from '@/lib/i18n/I18nProvider'
import { HeroSection } from '@/components/marketing/HeroSection'
import { BlogGrid } from '@/components/marketing/BlogGrid'
import { CtaSection } from '@/components/marketing/CtaSection'
import { SiteNav } from '@/components/marketing/SiteNav'
import { SiteFooter } from '@/components/marketing/SiteFooter'

export function BlogPageContent() {
  const { t } = useI18n()

  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <HeroSection
          title={t('hero.blog.title', 'Marketing Insights from the Field')}
          subtitle={t('hero.blog.kicker', 'The MediaBubble Blog')}
          description={t(
            'hero.blog.description',
            "Practical strategy, honest analysis, and real numbers from the team that runs campaigns every day. No recycled content. No fluff.",
          )}
          ctaButtons={{
            primary: { label: t('hero.blog.cta', 'Get a Free Audit'), href: '/contact' },
          }}
          layout="default"
        />
        <BlogGrid />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
