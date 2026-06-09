'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { Container } from './Container'

export function CtaSection() {
  const { t, dir } = useI18n()

  return (
    <section dir={dir} className="py-10 sm:py-16 lg:py-20 bg-white" aria-label="Call to action">
      <Container>
        <div className="bg-brand-navy rounded-3xl px-8 py-14 sm:px-14 lg:px-20 overflow-hidden relative">
          {/* Background accent */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute end-0 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-brand-yellow/[0.06] blur-[80px]" />
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-dots)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-yellow mb-3">
              {t('services.cta.heading', "Not Sure Where to Start?")}
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-white leading-tight mb-5">
              {t('cta.consultation', 'Book a Free Consultation')}
            </h2>
            <p className="text-[16px] text-white/65 leading-relaxed mb-8">
              {t('services.cta.body', "Book a free 30-minute strategy call. We'll review your current marketing, identify the biggest opportunities, and tell you exactly where to focus first.")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold bg-brand-yellow text-brand-navy hover:bg-[#FFB300] active:scale-[0.97] transition-all duration-150 shadow-lg shadow-brand-yellow/20"
              >
                {t('cta.primary', 'Get Your Free Strategy Audit')}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold border border-white/20 text-white hover:bg-white/[0.08] active:scale-[0.97] transition-all duration-150"
              >
                {t('cta.secondary', 'View Case Studies')}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
