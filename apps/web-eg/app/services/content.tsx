'use client'

import { useI18n } from '@/lib/i18n/provider'
import { PageHero } from '@/components/sections/PageHero'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ServicesDeliverySection } from '@/components/sections/ServicesDeliverySection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ClientLogosSection } from '@/components/sections/ClientLogosSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { MainLayout } from '@/components/layout/MainLayout'

export function ServicesPageContent() {
  const { t } = useI18n()

  return (
    <MainLayout>
        <PageHero
          breadcrumbs={[
            { label: t('nav.home', 'Home'), href: '/' },
            { label: t('hero.services.kicker', 'Services') },
          ]}
          kicker={t('hero.services.kicker', 'Full-Service Marketing')}
          title={t('hero.services.title', 'Every Service You Need to Grow')}
          subtitle={t(
            'hero.services.description',
            "From search rankings to social media, brand identity to paid advertising, we cover every channel that moves the needle. One agency, one strategy, total accountability.",
          )}
          ctas={[
            { label: t('hero.services.cta', 'Book a Free Strategy Call'), href: '/contact' },
            {
              label: t('hero.services.ctaSecondary', 'View Our Work'),
              href: '/case-studies',
              variant: 'secondary',
            },
          ]}
          proofPoints={[
            t('hero.services.proof1', 'SEO, PPC, social, branding, web, events, all in one place'),
            t('hero.services.proof2', 'Dedicated strategist assigned to every account'),
            t('hero.services.proof3', 'Monthly reporting tied to your business goals'),
          ]}
        />
        <ServicesSection />
        <ServicesDeliverySection />
        <ClientLogosSection />
        <TestimonialsSection />
        <CtaSection />
    </MainLayout>
  )
}
