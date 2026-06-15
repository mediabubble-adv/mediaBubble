'use client'

import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'

export function ServicesCtaSection() {
  const { t, dir } = useI18n()

  return (
    <section
      dir={dir}
      aria-label={t('services.cta.heading', 'Need help choosing a service?')}
      className="relative w-full bg-brand-yellow overflow-hidden border-y border-brand-navy/10 dark:border-white/10 py-14 sm:py-[4.5rem] lg:py-[5.5rem]"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 end-[10%] w-64 h-64 bg-brand-navy/[0.05] rounded-full blur-3xl" />
        <div className="absolute -bottom-16 start-[5%] w-48 h-48 bg-white/30 rounded-full blur-2xl" />
      </div>

      <Container className="relative z-10">
        <div
          data-reveal
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-14"
        >
          <div className="flex items-start gap-5 max-w-2xl">
            <div
              className="hidden sm:flex w-12 h-12 rounded-2xl bg-brand-navy/10 items-center justify-center shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <MessageCircle size={22} className="text-brand-navy" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-navy/55 mb-2.5">
                {t('services.cta.kicker', 'Not sure where to start?')}
              </p>
              <h2 className="font-display text-[clamp(1.35rem,2.5vw,1.875rem)] font-bold text-brand-navy leading-snug mb-3">
                {t('services.cta.heading', 'Need help choosing a service?')}
              </h2>
              <p className="text-[15px] sm:text-[16px] text-brand-navy/70 leading-relaxed">
                {t(
                  'services.cta.body',
                  'Book a 30-minute call. We listen to your goal and point you to the right channel and next steps.',
                )}
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl text-[14px] sm:text-[15px] font-semibold bg-brand-navy text-white hover:bg-[#0a3a8a] active:scale-[0.97] transition-all duration-150 shadow-lg shadow-brand-navy/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-navy/25 lg:self-center"
          >
            {t('services.cta.primary', 'Free audit')}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
