'use client'

import { usePrefersReducedMotion } from '@mediabubble/shared/client'
import { useI18n } from '@/lib/i18n/provider'

// ─── Data ───────────────────────────────────────────────────────────────────
// Real numbers sourced from live client engagements (see lib/data/case-studies).

type Result = { value: string; labelKey: string; labelFallback: string }

const ROW_A: Result[] = [
  { value: '68%', labelKey: 'results.directBookings', labelFallback: 'Direct booking growth' },
  { value: '340%', labelKey: 'results.organic', labelFallback: 'Organic session growth' },
  { value: '3.9×', labelKey: 'results.roas', labelFallback: 'Google Ads ROAS' },
  { value: '4.8×', labelKey: 'results.engagement', labelFallback: 'Engagement vs. average' },
  { value: '47', labelKey: 'results.keywords', labelFallback: 'Page 1 keywords' },
]

const ROW_B: Result[] = [
  { value: '200+', labelKey: 'results.projects', labelFallback: 'Projects delivered' },
  { value: '92%', labelKey: 'results.retention', labelFallback: 'Client retention' },
  { value: '11.4k', labelKey: 'results.followers', labelFallback: 'Followers earned' },
  { value: '22+', labelKey: 'results.team', labelFallback: 'In-house specialists' },
  { value: '2015', labelKey: 'results.since', labelFallback: 'Serving the Red Sea since' },
]

// ─── Item ───────────────────────────────────────────────────────────────────

function ResultItem({ item, 'aria-hidden': ariaHidden }: { item: Result; 'aria-hidden'?: boolean }) {
  const { t } = useI18n()
  return (
    <div className="flex shrink-0 items-baseline gap-3 px-7 sm:px-9" aria-hidden={ariaHidden || undefined}>
      <span className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-bold tabular-nums tracking-tight text-brand-navy dark:text-brand-off-white">
        {item.value}
      </span>
      <span className="text-[13px] sm:text-[14px] font-medium text-brand-navy/65 dark:text-brand-off-white/65 whitespace-nowrap">
        {t(item.labelKey, item.labelFallback)}
      </span>
      <span aria-hidden="true" className="ms-4 h-1.5 w-1.5 rounded-full bg-brand-navy/40 dark:bg-brand-yellow/70" />
    </div>
  )
}

// ─── Track ──────────────────────────────────────────────────────────────────

function Track({
  items,
  duration,
  reverse = false,
}: {
  items: Result[]
  duration: number
  reverse?: boolean
}) {
  const animClass = reverse ? 'animate-marquee-right' : 'animate-marquee-left'
  return (
    <div dir="ltr" className="group relative overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-yellow dark:from-brand-navy to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-yellow dark:from-brand-navy to-transparent sm:w-28" />
      <div
        className={`flex w-max items-center will-change-transform ${animClass} group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${duration}s` }}
      >
        {items.map((item) => (
          <ResultItem key={item.labelKey} item={item} />
        ))}
        {/* Duplicate set for seamless CSS marquee — hidden from assistive tech */}
        {items.map((item) => (
          <ResultItem key={`${item.labelKey}-dup`} item={item} aria-hidden />
        ))}
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ResultsMarquee() {
  const { t, dir } = useI18n()
  const prefersReducedMotion = usePrefersReducedMotion()
  const allItems = [...ROW_A, ...ROW_B]

  return (
    <section
      dir={dir}
      className="relative overflow-hidden bg-brand-yellow dark:bg-brand-navy py-12 sm:py-16"
      aria-label={t('results.aria', 'Client results at a glance')}
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-navy/30 dark:via-brand-yellow/60 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-navy/20 dark:via-brand-yellow/30 to-transparent"
        aria-hidden="true"
      />

      <div className="mb-2 px-6 text-center sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy dark:text-brand-yellow">
          {t('results.kicker', 'Client results from Hurghada and the Red Sea')}
        </p>
      </div>

      {prefersReducedMotion ? (
        <div
          dir={dir}
          className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-6 px-6 pt-6 sm:grid-cols-3 sm:px-8 lg:grid-cols-5"
        >
          {allItems.map((item) => (
            <div key={item.labelKey} className="flex flex-col gap-1">
              <span className="font-display text-[1.75rem] font-bold tabular-nums tracking-tight text-brand-navy dark:text-brand-off-white">
                {item.value}
              </span>
              <span className="text-[13px] font-medium text-brand-navy/65 dark:text-brand-off-white/65">
                {t(item.labelKey, item.labelFallback)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div dir="ltr" className="mt-2 space-y-1">
          <Track items={ROW_A} duration={48} />
          <Track items={ROW_B} duration={62} reverse />
        </div>
      )}
    </section>
  )
}
