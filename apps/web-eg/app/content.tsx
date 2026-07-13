'use client'

import dynamic from 'next/dynamic'
import { useI18n } from '@/lib/i18n/provider'
import {
  EXPERIMENTS,
  HOME_HERO_CTA_COPY,
  trackExperimentConversion,
  useExperiment,
} from '@mediabubble/shared/client'
import { HomeHero } from '@/components/sections/HomeHero'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { MainLayout } from '@/components/layout/MainLayout'

// Below-the-fold sections — lazy-loaded to reduce initial bundle
const ServicesSection     = dynamic(() => import('@/components/sections/ServicesSection').then(m => ({ default: m.ServicesSection })))
const ShowcaseSection     = dynamic(() => import('@/components/sections/ShowcaseSection').then(m => ({ default: m.ShowcaseSection })))
const ResultsMarquee      = dynamic(() => import('@/components/sections/ResultsMarquee').then(m => ({ default: m.ResultsMarquee })))
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
        <HomeHero
          subtitle={t('hero.home.kicker', "Hurghada's #1 Marketing Agency")}
          title={t('hero.home.title', "Hurghada's growth partner for tourism, hospitality & retail")}
          description={t(
            'hero.home.description',
            'One team for strategy, content, paid media, and web, with measurable growth for 200+ Red Sea businesses since 2015.',
          )}
          backgroundImage="/assets/hero/home/homepage-hero-4x.webp"
          primaryCta={{
            label: primaryCtaLabel,
            href: '/contact',
            onClick: () =>
              trackExperimentConversion(
                EXPERIMENTS.homeHeroCta.id,
                heroCtaVariant,
                'hero_primary_click',
              ),
          }}
          secondaryCta={{ label: t('hero.home.ctaSecondary', 'View case studies'), href: '/case-studies' }}
          servicesLink={{ label: t('hero.home.ctaServices', 'Explore all services'), href: '/services' }}
          proofPoints={[
            { text: t('hero.home.proof1', '35% average client growth in 12 months') },
            { text: t('hero.home.proof2', '92% client retention rate') },
            { text: t('hero.home.proof3', '500+ successful projects delivered') },
          ]}
        />
        <FeaturesSection />
        <ShowcaseSection />
        <ResultsMarquee />
        <ServicesSection />
        <ClientLogosSection />
        <WhyUsStrip />
        <TestimonialsSection />
        <CtaSection />
    </MainLayout>
  )
}
