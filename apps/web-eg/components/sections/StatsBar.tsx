'use client'

import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'

const STATS = [
  { valueKey: 'about.stats.founded.value', labelKey: 'about.stats.founded.label', valueFallback: '2015', labelFallback: 'Founded' },
  { valueKey: 'about.stats.team.value', labelKey: 'about.stats.team.label', valueFallback: '22+', labelFallback: 'Team' },
  { valueKey: 'about.stats.clients.value', labelKey: 'about.stats.clients.label', valueFallback: '200+', labelFallback: 'Clients Served' },
  { valueKey: 'about.stats.projects.value', labelKey: 'about.stats.projects.label', valueFallback: '500+', labelFallback: 'Projects Delivered' },
  { valueKey: 'about.stats.retention.value', labelKey: 'about.stats.retention.label', valueFallback: '92%', labelFallback: 'Client Retention' },
] as const

export function StatsBar() {
  const { t, dir } = useI18n()

  return (
    <section dir={dir} className="py-8 sm:py-10 lg:py-12 bg-brand-navy border-y border-white/10" aria-label="Stats">
      <Container>
        <ul
          className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0 sm:gap-y-3 list-none p-0 m-0"
          role="list"
        >
          {STATS.map(({ valueKey, labelKey, valueFallback, labelFallback }, index) => (
            <li key={labelKey} className="flex items-center gap-4 sm:gap-5">
              {index > 0 ? (
                <span className="hidden sm:block h-4 w-px bg-white/20 shrink-0" aria-hidden="true" />
              ) : null}
              <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[13px] sm:text-[14px] text-white/65">
                <span className="font-display font-semibold text-white tabular-nums tracking-tight">
                  {t(valueKey, valueFallback)}
                </span>
                <span>{t(labelKey, labelFallback)}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
