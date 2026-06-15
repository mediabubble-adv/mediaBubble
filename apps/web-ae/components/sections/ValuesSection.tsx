'use client'

import { Target, BarChart2, Users } from 'lucide-react'
import { marketingKickerClassName } from '@mediabubble/shared/ui/marketing-kicker'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'

const VALUES = [
  {
    icon:  Target,
    color: '#2196F3',
    titleKey:      'about.values.results.title',
    descKey:       'about.values.results.desc',
    titleFallback: 'Results First',
    descFallback:  'Every campaign starts with a specific, measurable target agreed in writing before we spend a dirham. If we are off-track at week six, you hear it from us first, not from a dashboard.',
  },
  {
    icon:  Users,
    color: '#072A6B',
    titleKey:      'about.values.partnership.title',
    descKey:       'about.values.partnership.desc',
    titleFallback: 'A Dedicated Team, Not a Ticketing System',
    descFallback:  'Every client has a named account manager reachable by phone during working hours. We attend your launches, respond same-day, and flag problems before you notice them.',
  },
  {
    icon:  BarChart2,
    color: '#1565C0',
    titleKey:      'about.values.reporting.title',
    descKey:       'about.values.reporting.desc',
    titleFallback: 'Radical Transparency',
    descFallback:  'You get a live performance dashboard from day one, a plain-English monthly report, and direct read-access to your ad accounts. No locked logins. No mystery numbers.',
  },
] as const

export function ValuesSection() {
  const { t, dir } = useI18n()

  return (
    <section dir={dir} className="py-12 sm:py-20 lg:py-28 bg-brand-surface" aria-label="Our values">
      <Container>
        <div data-reveal className="max-w-2xl mb-12 sm:mb-16 lg:mb-20">
          <p className={marketingKickerClassName}>
            {t('about.values.kicker', 'How We Work')}
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-brand-navy dark:text-brand-off-white leading-tight mb-4">
            {t('about.values.title', 'The Principles Behind Every Campaign')}
          </h2>
          <p className="text-[16px] text-brand-secondary dark:text-brand-text-muted leading-relaxed">
            {t('about.values.subtitle', "We've refined our approach over ten years of working with businesses across the UAE and the Gulf. These three principles drive every decision we make.")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {VALUES.map((v, i) => {
            const Icon = v.icon
            return (
              <div
                key={v.titleKey}
                data-reveal
                data-reveal-delay={String(i * 80)}
                className="bg-brand-canvas dark:bg-brand-navy/30 rounded-2xl border border-brand-whisper-border p-8"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${v.color}14` }}
                >
                  <Icon size={20} strokeWidth={1.75} style={{ color: v.color }} />
                </div>
                <h3 className="font-display text-[18px] font-bold text-brand-navy dark:text-brand-off-white mb-2">
                  {t(v.titleKey, v.titleFallback)}
                </h3>
                <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed">
                  {t(v.descKey, v.descFallback)}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
