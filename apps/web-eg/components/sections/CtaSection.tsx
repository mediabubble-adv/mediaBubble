'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'

export function CtaSection() {
  const { t, dir } = useI18n()

  return (
    <section dir={dir} className="bg-brand-yellow border-y border-brand-navy/10 dark:border-white/10 py-14 sm:py-[4.5rem] lg:py-[5.5rem]" aria-label="Call to action">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-navy/60 mb-3">
            {t('cta.section.kicker', 'Ready to talk?')}
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-brand-navy leading-tight mb-5">
            {t('cta.section.title', 'Book your free strategy audit')}
          </h2>
          <p className="text-[16px] text-brand-navy/70 leading-relaxed mb-8">
            {t(
              'cta.section.body',
              'Tell us where you are today. In 30 minutes we review your marketing and return with three priorities you can act on this quarter.',
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold bg-brand-navy text-white hover:bg-[#0a3a8a] active:scale-[0.97] transition-all duration-150 shadow-lg shadow-brand-navy/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/50"
            >
              {t('cta.short.primary', 'Free audit')}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold border-2 border-brand-navy/30 text-brand-navy hover:bg-brand-navy/[0.08] active:scale-[0.97] transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-navy/25"
            >
              {t('cta.secondary', 'View case studies')}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
