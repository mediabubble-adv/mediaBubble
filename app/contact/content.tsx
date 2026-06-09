'use client'

import { useI18n } from '@/lib/i18n/I18nProvider'
import { ContactSection } from '@/components/marketing/ContactSection'
import { SiteNav } from '@/components/marketing/SiteNav'
import { SiteFooter } from '@/components/marketing/SiteFooter'

export function ContactPageContent() {
  const { t } = useI18n()

  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <div className="pt-24 pb-8 sm:pt-28 sm:pb-10 bg-[#FAFAFA] border-b border-[#E8E8E8]">
          <div className="max-w-[1152px] mx-auto px-6 sm:px-8 lg:px-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2196F3] mb-3">
              {t('contact.hero.kicker', 'Get in Touch')}
            </p>
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-[#072A6B] leading-tight">
              {t('contact.hero.title', "Let's Build Something Together")}
            </h1>
          </div>
        </div>
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
