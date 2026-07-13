'use client'

import { useI18n } from '@/lib/i18n/provider'
import { HeroSection } from '@/components/sections/HeroSection'
import { ContactSection } from '@/components/features/contact/ContactSection'
import { MainLayout } from '@/components/layout/MainLayout'

export function ContactPageContent() {
  const { t } = useI18n()

  return (
    <MainLayout>
        <HeroSection
          title={t('contact.hero.title', "Let's Build Something Together")}
          subtitle={t('contact.hero.kicker', 'Get in Touch')}
          description={t(
            'contact.hero.subtitle',
            'Tell us about your business. We will review your current marketing and reply with a prioritised plan. Free, no commitment.',
          )}
          backgroundImage="/assets/hero/premium/contact-hero.webp"
          mode="background-blur"
          size="compact"
          ctaButtons={{
            primary: { label: t('contact.cta', 'Get Started'), href: '#contact-form' },
          }}
        />
        <ContactSection />
    </MainLayout>
  )
}
