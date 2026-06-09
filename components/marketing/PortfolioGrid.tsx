'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { Container } from './Container'
import { CASE_STUDIES } from '@/lib/data/case-studies'

export function PortfolioGrid() {
  const { t, dir } = useI18n()

  return (
    <section dir={dir} className="py-10 sm:py-16 lg:py-20 bg-[#FAFAFA]" aria-label="Case studies">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2196F3] mb-3">
            {t('portfolio.heading.kicker', 'Our Work')}
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[#072A6B] leading-tight mb-4">
            {t('portfolio.heading.title', 'Results We\'re Proud Of')}
          </h2>
          <p className="text-[16px] text-[#666] leading-relaxed">
            {t('portfolio.heading.subtitle', 'Every case study below started with a clear business problem. Here\'s how we solved it — and what changed.')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((cs) => (
            <article
              key={cs.id}
              className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] transition-all duration-200 flex flex-col"
            >
              {/* Colour band */}
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: cs.accent }}
                aria-hidden="true"
              />

              <div className="p-7 flex flex-col flex-1">
                <span
                  className="inline-block text-[11px] font-semibold uppercase tracking-[0.14em] mb-3"
                  style={{ color: cs.accent }}
                >
                  {cs.tag}
                </span>

                <h3 className="font-display text-[16px] font-bold text-[#1A1A2E] leading-snug mb-3">
                  {cs.title}
                </h3>

                <p className="text-[13px] text-[#666] leading-relaxed mb-5 flex-1">
                  {cs.desc}
                </p>

                {/* Metric callout */}
                <div
                  className="rounded-xl px-4 py-3 mb-5"
                  style={{ backgroundColor: cs.bg }}
                >
                  <p
                    className="text-[12px] font-semibold leading-relaxed"
                    style={{ color: cs.accent }}
                  >
                    ↗ {cs.metric}
                  </p>
                </div>

                <Link
                  href={`/portfolio/${cs.id}`}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-150 group"
                  style={{ color: cs.accent }}
                >
                  {t('portfolio.readMore', 'Read case study')}
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-150 group-hover:translate-x-[2px]"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
