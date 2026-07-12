'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
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
        {/* Header */}
        <div className="mb-10 sm:mb-14 lg:mb-16 max-w-2xl">
          <p className={marketingKickerClassName}>
            {t('showcase.heading.kicker', 'Selected work')}
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold text-brand-navy dark:text-brand-off-white leading-tight mb-4 [text-wrap:balance]">
            {t('showcase.heading.title', 'Recent client results')}
          </h2>
          <p className="text-[16px] text-brand-secondary dark:text-brand-text-muted leading-relaxed">
            {t('showcase.heading.subtitle', 'Six Hurghada businesses. Real metrics from live campaigns.')}
          </p>
        </div>

        {/* Cards grid — explicit row heights so image-only cards don't collapse */}
        <div
          key={page}
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:[grid-template-rows:260px_260px] lg:[grid-template-rows:300px_300px] lg:gap-5 stagger-grid"
          aria-live="polite"
        >
          {visible.map((project, index) => {
            const featured = index === 0

            if (featured) {
              return (
                <Link
                  key={project.id}
                  href={`/case-studies/${project.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 focus-visible:ring-2 focus-visible:ring-brand-blue outline-none"
                >
                  {/* Full-bleed image */}
                  <div className="relative flex-1 min-h-[300px]">
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={t(project.poeticTitleKey, project.poeticTitleFallback)}
                        fill
                        priority={page === 0}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 67vw"
                      />
                    )}
                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/20 to-transparent group-hover:from-brand-navy/90 transition-all duration-300" />
                    {/* Overlaid content */}
                    <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-10">
                      <span
                        className="inline-block text-[11px] font-semibold uppercase tracking-[0.16em] mb-3"
                        style={{ color: project.accent }}
                      >
                        {t(project.tagKey, project.tagFallback)}
                      </span>
                      <h3 className="font-display text-[clamp(1.5rem,2.5vw,2.4rem)] font-bold text-white leading-tight mb-3 [text-wrap:balance]">
                        {t(project.poeticTitleKey, project.poeticTitleFallback)}
                      </h3>
                      <p className="text-[13px] font-semibold mb-5" style={{ color: project.accent }}>
                        <span className="inline-block mr-1" aria-hidden="true" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}>↗</span>
                        {t(project.metricKey, project.metricFallback)}
                      </p>
                      <div className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-white/80 group-hover:text-white transition-colors duration-150">
                        {t('showcase.cta.explore', 'View case study')}
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-150 group-hover:translate-x-[3px]"
                          style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            }

            return (
              <Link
                key={project.id}
                href={`/case-studies/${project.id}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl md:col-span-1 focus-visible:ring-2 focus-visible:ring-brand-blue outline-none"
              >
                <div className="relative flex-1 min-h-[220px]">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={t(project.poeticTitleKey, project.poeticTitleFallback)}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  {/* Persistent gradient scrim — always readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/30 to-transparent group-hover:from-brand-navy/90 transition-all duration-300" />
                  {/* Always-visible content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span
                      className="inline-block text-[10px] font-semibold uppercase tracking-[0.16em] mb-1.5"
                      style={{ color: project.accent }}
                    >
                      {t(project.tagKey, project.tagFallback)}
                    </span>
                    <h3 className="font-display text-[15px] sm:text-[16px] font-bold text-white leading-snug">
                      {t(project.poeticTitleKey, project.poeticTitleFallback)}
                    </h3>
                    {/* Metric fades up on hover */}
                    <p
                      className="text-[12px] font-semibold mt-2 opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 motion-reduce:transition-none transition-all duration-200 ease-out"
                      style={{ color: project.accent }}
                    >
                      <span className="inline-block mr-1" aria-hidden="true" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}>↗</span>
                      {t(project.metricKey, project.metricFallback)}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom bar: CTA · dots · nav */}
        <div className="mt-8 sm:mt-10 flex items-center justify-between gap-4">
          {/* View all CTA */}
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-semibold bg-brand-navy text-white hover:bg-[#0a3a8a] active:scale-[0.97] transition-all duration-150 shadow-md shadow-brand-navy/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow/50 shrink-0"
          >
            {t('showcase.cta.viewAll', 'View all case studies')}
            <ArrowRight size={15} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
          </Link>

          {/* Page indicator dots */}
          <div className="flex items-center gap-2" aria-hidden="true">
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

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-2 shrink-0" role="group" aria-label={t('showcase.nav.label', 'Browse case studies')}>
            <button
              type="button"
              onClick={goPrev}
              disabled={!canPrev}
              aria-label={t('showcase.nav.prev', 'Previous case studies')}
              className="w-9 h-9 rounded-full border border-brand-whisper-border bg-brand-surface flex items-center justify-center text-brand-navy dark:text-brand-off-white hover:bg-brand-navy/5 dark:hover:bg-white/5 disabled:opacity-35 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <PrevIcon size={16} />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              aria-label={t('showcase.nav.next', 'Next case studies')}
              className="w-9 h-9 rounded-full border border-brand-whisper-border bg-brand-surface flex items-center justify-center text-brand-navy dark:text-brand-off-white hover:bg-brand-navy/5 dark:hover:bg-white/5 disabled:opacity-35 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <NextIcon size={16} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
