'use client'

import { useI18n } from '@/lib/i18n/I18nProvider'
import { Container } from './Container'

const STATS = [
  { valueKey: 'about.stats.founded.value', labelKey: 'about.stats.founded.label', valueFallback: '2015',  labelFallback: 'Founded' },
  { valueKey: 'about.stats.team.value',    labelKey: 'about.stats.team.label',    valueFallback: '22+',   labelFallback: 'Team' },
  { valueKey: 'about.stats.clients.value', labelKey: 'about.stats.clients.label', valueFallback: '200+',  labelFallback: 'Clients Served' },
  { valueKey: 'about.stats.projects.value',labelKey: 'about.stats.projects.label',valueFallback: '500+',  labelFallback: 'Projects Delivered' },
  { valueKey: 'about.stats.retention.value',labelKey:'about.stats.retention.label',valueFallback: '92%',  labelFallback: 'Client Retention' },
] as const

export function StatsBar() {
  const { t, dir } = useI18n()

  return (
    <section dir={dir} className="py-10 sm:py-12 bg-brand-navy" aria-label="Stats">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {STATS.map(({ valueKey, labelKey, valueFallback, labelFallback }) => (
            <div key={labelKey} className="text-center">
              <p className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-brand-yellow leading-none mb-1">
                {t(valueKey, valueFallback)}
              </p>
              <p className="text-[12px] text-white/50 font-medium">
                {t(labelKey, labelFallback)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
