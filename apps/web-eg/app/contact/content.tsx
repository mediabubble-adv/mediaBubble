'use client'

import { useI18n } from '@/lib/i18n/provider'
import { PageHero } from '@/components/sections/PageHero'
import { ContactSection } from '@/components/features/contact/ContactSection'
import { MainLayout } from '@/components/layout/MainLayout'

export function ContactPageContent() {
  const { t } = useI18n()

  return (
    <MainLayout>
        <PageHero
          breadcrumbs={[
            { label: t('nav.home', 'Home'), href: '/' },
            { label: t('contact.hero.kicker', 'Contact') },
          ]}
          kicker={t('contact.hero.kicker', 'Get in Touch')}
          title={t('contact.hero.title', "Let's Build Something Together")}
          subtitle={t(
            'contact.hero.subtitle',
            'Tell us about your business. We will review your current marketing and reply with a prioritised plan. Free, no commitment.',
          )}
        />
        <ContactSection />
    </MainLayout>
  )
}
