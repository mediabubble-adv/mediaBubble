'use client'

import dynamic from 'next/dynamic'
import { useI18n } from '@/lib/i18n/provider'
import {
  EXPERIMENTS,
  HOME_HERO_CTA_COPY,
  trackExperimentConversion,
  useExperiment,
} from '@mediabubble/shared/client'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { MainLayout } from '@/components/layout/MainLayout'

// Below-the-fold sections — lazy-loaded to reduce initial bundle
const ServicesSection     = dynamic(() => import('@/components/sections/ServicesSection').then(m => ({ default: m.ServicesSection })))
const ShowcaseSection     = dynamic(() => import('@/components/sections/ShowcaseSection').then(m => ({ default: m.ShowcaseSection })))
const ClientLogosSection  = dynamic(() => import('@/components/sections/ClientLogosSection').then(m => ({ default: m.ClientLogosSection })))
const WhyUsStrip          = dynamic(() => import('@/components/sections/WhyUsStrip').then(m => ({ default: m.WhyUsStrip })))
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })))
const CtaSection          = dynamic(() => import('@/components/sections/CtaSection').then(m => ({ default: m.CtaSection })))

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
          title={t('hero.home.title', "UAE's growth partner for hospitality, retail & tourism brands")}
          subtitle={t('hero.home.kicker', 'Full-service marketing agency')}
          description={t(
            'hero.home.description',
            'Strategy, creative, paid media, and web from one team, with measurable growth for brands across the UAE.',
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
