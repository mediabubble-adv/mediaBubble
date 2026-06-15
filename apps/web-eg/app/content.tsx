'use client'

import { useI18n } from '@/lib/i18n/provider'
import {
  EXPERIMENTS,
  HOME_HERO_CTA_COPY,
  trackExperimentConversion,
  useExperiment,
} from '@mediabubble/shared/client'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ShowcaseSection } from '@/components/sections/ShowcaseSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ClientLogosSection } from '@/components/sections/ClientLogosSection'
import { WhyUsStrip } from '@/components/sections/WhyUsStrip'
import { MainLayout } from '@/components/layout/MainLayout'

export function HomePageContent() {
  const { t } = useI18n()
  const heroCtaVariant = useExperiment('homeHeroCta')
  const primaryCtaLabel =
    heroCtaVariant === 'urgency'
      ? t('hero.home.ctaUrgency', HOME_HERO_CTA_COPY.urgency)
      : t('hero.home.cta', HOME_HERO_CTA_COPY.control)

  return (
    <MainLayout>
        <HeroSection
          title={t('hero.home.title', "Hurghada's growth partner for tourism, hospitality & retail")}
          subtitle={t('hero.home.kicker', "Hurghada's #1 Marketing Agency")}
          description={t(
            'hero.home.description',
            'One team for strategy, content, paid media, and web, with measurable growth for 200+ Red Sea businesses since 2015.',
          )}
          ctaButtons={{
            primary:   { label: primaryCtaLabel, href: '/contact' },
            secondary: { label: t('hero.home.ctaSecondary', 'View case studies'),   href: '/portfolio' },
          }}
          onPrimaryCtaClick={() =>
            trackExperimentConversion(
              EXPERIMENTS.homeHeroCta.id,
              heroCtaVariant,
              'hero_primary_click',
            )
          }
          proofPoints={[
            { text: t('hero.home.proof1', '35% average client growth in 12 months') },
            { text: t('hero.home.proof2', '92% client retention rate') },
            { text: t('hero.home.proof3', '500+ successful projects delivered') },
          ]}
          dropdownMenu={[
            { label: t('hero.dropdown.seo', 'SEO & Organic Growth'), href: '/services/seo' },
            { label: t('hero.dropdown.ppc', 'Paid Advertising'), href: '/services/ppc' },
            { label: t('hero.dropdown.social', 'Social Media Marketing'), href: '/services/social' },
            { label: t('hero.dropdown.branding', 'Branding & Design'), href: '/services/branding' },
            { label: t('hero.dropdown.web', 'Web Development'), href: '/services/web' },
          ]}
        />
        <FeaturesSection />
        <ShowcaseSection />
        <ServicesSection />
        <ClientLogosSection />
        <WhyUsStrip />
        <TestimonialsSection />
        <CtaSection />
    </MainLayout>
  )
}
