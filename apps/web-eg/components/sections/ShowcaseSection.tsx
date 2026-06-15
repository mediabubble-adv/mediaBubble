'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { marketingKickerClassName } from '@mediabubble/shared/ui/marketing-kicker'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'
import { SHOWCASE_PAGE_COUNT, SHOWCASE_PER_PAGE, SHOWCASE_PROJECTS } from '@/lib/data/showcase'

const PER_PAGE = SHOWCASE_PER_PAGE
const PAGE_COUNT = SHOWCASE_PAGE_COUNT

export function ShowcaseSection() {
  const { t, dir } = useI18n()
  const isRTL = dir === 'rtl'
  const [page, setPage] = useState(0)

  const visible = SHOWCASE_PROJECTS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)
  const canPrev = page > 0
  const canNext = page < PAGE_COUNT - 1

  function goPrev() {
    setPage(p => Math.max(0, p - 1))
  }

  function goNext() {
    setPage(p => Math.min(PAGE_COUNT - 1, p + 1))
  }

  const PrevIcon = isRTL ? ChevronRight : ChevronLeft
  const NextIcon = isRTL ? ChevronLeft : ChevronRight

  return (
    <section dir={dir} className="relative py-12 sm:py-20 lg:py-28 bg-brand-canvas overflow-hidden" aria-label="Featured Work">
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #072A6B 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <p className={marketingKickerClassName}>
              {t('showcase.heading.kicker', 'Selected work')}
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold text-brand-navy dark:text-brand-off-white leading-tight mb-4">
              {t('showcase.heading.title', 'Recent client results')}
            </h2>
            <p className="text-[16px] text-brand-secondary dark:text-brand-text-muted leading-relaxed">
              {t('showcase.heading.subtitle', 'Six Hurghada businesses. Real metrics from live campaigns.')}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0" role="group" aria-label={t('showcase.nav.label', 'Browse case studies')}>
            <button
              type="button"
              onClick={goPrev}
              disabled={!canPrev}
              aria-label={t('showcase.nav.prev', 'Previous case studies')}
              className="w-11 h-11 rounded-full border border-brand-whisper-border bg-brand-surface flex items-center justify-center text-brand-navy dark:text-brand-off-white hover:bg-brand-navy/5 dark:hover:bg-white/5 disabled:opacity-35 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <PrevIcon size={20} />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              aria-label={t('showcase.nav.next', 'Next case studies')}
              className="w-11 h-11 rounded-full border border-brand-whisper-border bg-brand-surface flex items-center justify-center text-brand-navy dark:text-brand-off-white hover:bg-brand-navy/5 dark:hover:bg-white/5 disabled:opacity-35 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <NextIcon size={20} />
            </button>
          </div>
        </div>

        <div
          key={page}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7"
          aria-live="polite"
        >
          {visible.map((project, index) => (
            <Link
              key={project.id}
              href={`/case-studies/${project.id}`}
              className="group relative flex flex-col bg-brand-surface rounded-2xl border border-brand-whisper-border overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:-translate-y-[4px] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand-blue outline-none"
            >
              <div className="h-1 w-full" style={{ backgroundColor: project.accent }} aria-hidden="true" />

              <div className="relative w-full h-[200px] sm:h-[220px] overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={t(project.poeticTitleKey, project.poeticTitleFallback)}
                    fill
                    priority={page === 0 && index === 0}
                    loading={page === 0 && index === 0 ? undefined : 'lazy'}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : null}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundColor: project.accent }}
                />
              </div>

              <div className="p-6 lg:p-7 flex flex-col flex-1">
                <span
                  className="inline-block text-[11px] font-semibold uppercase tracking-[0.14em] mb-3"
                  style={{ color: project.accent }}
                >
                  {t(project.tagKey, project.tagFallback)}
                </span>

                <h3 className="font-display text-[18px] lg:text-[20px] font-bold text-brand-navy dark:text-brand-off-white leading-snug mb-3 group-hover:text-brand-blue transition-colors duration-300">
                  {t(project.poeticTitleKey, project.poeticTitleFallback)}
                </h3>

                <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed mb-5 flex-1 line-clamp-3">
                  {t(project.descKey, project.descFallback)}
                </p>

                <div
                  data-showcase-metric
                  className="rounded-xl px-4 py-3 mb-5 dark:bg-brand-navy/40"
                  style={{ backgroundColor: project.bg }}
                >
                  <p className="text-[13px] font-semibold leading-relaxed" style={{ color: project.accent }}>
                    <span className="inline-block mr-1" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}>
                      ↗
                    </span>
                    {t(project.metricKey, project.metricFallback)}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-150" style={{ color: project.accent }}>
                  {t('showcase.cta.explore', 'Learn more')}
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-150 group-hover:translate-x-[3px]"
                    style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                  />
                </div>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: project.accent }}>
                  <ArrowUpRight size={16} className="text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
          {Array.from({ length: PAGE_COUNT }, (_, i) => (
            <span
              key={i}
              className={[
                'h-1.5 rounded-full transition-all duration-300',
                i === page ? 'w-6 bg-brand-blue' : 'w-1.5 bg-brand-navy/20 dark:bg-white/25',
              ].join(' ')}
            />
          ))}
        </div>

        <div className="mt-10 sm:mt-14">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold bg-brand-navy text-white hover:bg-[#0a3a8a] active:scale-[0.97] transition-all duration-150 shadow-lg shadow-brand-navy/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/50"
          >
            {t('showcase.cta.viewAll', 'View all')}
            <ArrowRight size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
          </Link>
        </div>
      </Container>
    </section>
  )
}
