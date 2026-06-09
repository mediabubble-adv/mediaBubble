'use client'

import { useI18n } from '@/lib/i18n/I18nProvider'
import { HeroSection } from '@/components/marketing/HeroSection'
import { ServicesSection } from '@/components/marketing/ServicesSection'
import { StatsBar } from '@/components/marketing/StatsBar'
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection'
import { CtaSection } from '@/components/marketing/CtaSection'
import { SiteNav } from '@/components/marketing/SiteNav'
import { SiteFooter } from '@/components/marketing/SiteFooter'

export function ServicesPageContent() {
  const { t } = useI18n()

  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <HeroSection
          title={t('hero.services.title', 'Every Service You Need to Grow')}
          subtitle={t('hero.services.kicker', 'Full-Service Marketing')}
          description={t(
            'hero.services.description',
            "From search rankings to social media, brand identity to paid advertising — we cover every channel that moves the needle. One agency, one strategy, total accountability.",
          )}
          ctaButtons={{
            primary:   { label: t('hero.services.cta', 'Book a Free Strategy Call'), href: '/contact' },
            secondary: { label: t('hero.services.ctaSecondary', 'View Our Work'),    href: '/portfolio' },
          }}
          proofPoints={[
            { text: t('hero.services.proof1', 'SEO, PPC, social, branding, web, events — all in one place') },
            { text: t('hero.services.proof2', 'Dedicated strategist assigned to every account') },
            { text: t('hero.services.proof3', 'Monthly reporting tied to your business goals') },
          ]}
          layout="default"
        />
        <StatsBar />
        <ServicesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
