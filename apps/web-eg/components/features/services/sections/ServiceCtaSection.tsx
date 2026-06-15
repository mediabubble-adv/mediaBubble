'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'

export function ServiceCtaSection({ kicker }: { kicker: string }) {
  const { t, dir } = useI18n()
  const serviceLabel = kicker.toLowerCase()
  const bullets = [
    t('serviceCta.bullet1', 'No long contracts'),
    t('serviceCta.bullet2', 'Free strategy session'),
    t('serviceCta.bullet3', 'Clear reporting'),
  ]

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-yellow" aria-label="Call to action">
      <Container>
        <div data-reveal className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-brand-navy/50 mb-3">
              {t('serviceCta.kicker', 'Ready for a free audit?')}
            </p>
            <h2 className="text-[28px] sm:text-[36px] font-bold text-brand-navy leading-tight">
              {t('serviceCta.title', "Let's plan your {{service}} strategy").replace(
                '{{service}}',
                serviceLabel,
              )}
            </h2>
            <div className="flex items-center gap-2 mt-4">
              {bullets.map((item) => (
                <span key={item} className="flex items-center gap-1 text-[13px] text-brand-navy/70 font-medium">
                  <CheckCircle2 size={14} className="text-brand-navy/50" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <Link
            href="/contact"
            data-ripple=""
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-navy text-white text-[16px] font-semibold hover:bg-[#0a3a8a] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-150 shadow-xl shadow-brand-navy/30"
          >
            {t('serviceCta.cta', 'Free audit')}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
