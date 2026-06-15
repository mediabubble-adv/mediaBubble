'use client'

import { MapPin, UsersRound, LineChart } from 'lucide-react'
import { marketingKickerClassName } from '@mediabubble/shared/ui/marketing-kicker'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'

const PILLARS = [
  {
    id: 'local',
    icon: MapPin,
    titleKey: 'whyUs.local.title',
    descKey: 'whyUs.local.desc',
    titleFallback: 'Built for the UAE market',
    descFallback:
      'We understand Dubai and Abu Dhabi buying cycles, expat audiences, and how hospitality brands win attention locally.',
  },
  {
    id: 'team',
    icon: UsersRound,
    titleKey: 'whyUs.team.title',
    descKey: 'whyUs.team.desc',
    titleFallback: 'One accountable team',
    descFallback:
      'Strategy, creative, paid media, and web sit together — no handoffs between disconnected vendors.',
  },
  {
    id: 'reporting',
    icon: LineChart,
    titleKey: 'whyUs.reporting.title',
    descKey: 'whyUs.reporting.desc',
    titleFallback: 'Reporting you can act on',
    descFallback:
      'Monthly dashboards tied to revenue and pipeline, not vanity metrics buried in a PDF.',
  },
] as const

export function WhyUsStrip() {
  const { t, dir } = useI18n()
  const headingId = 'why-us-heading'

  return (
    <section
      dir={dir}
      className="py-12 sm:py-20 lg:py-28 bg-brand-off-white dark:bg-brand-navy/20 border-y border-brand-whisper-border dark:border-white/10"
      aria-labelledby={headingId}
    >
      <Container>
        <div data-reveal className="max-w-2xl mb-10 sm:mb-14">
          <p className={marketingKickerClassName}>
            {t('whyUs.kicker', 'Why brands stay')}
          </p>
          <h2
            id={headingId}
            className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-bold text-brand-navy dark:text-brand-off-white leading-tight"
          >
            {t('whyUs.title', 'UAE expertise without agency overhead')}
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 list-none p-0 m-0">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <li
                key={pillar.id}
                data-reveal
                data-reveal-delay={String(index * 70)}
                className="flex gap-4 rounded-2xl border border-brand-whisper-border dark:border-white/10 bg-brand-canvas dark:bg-brand-navy/30 p-6 sm:p-7"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue"
                  aria-hidden="true"
                >
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-display text-[17px] font-bold text-brand-navy dark:text-brand-off-white mb-2">
                    {t(pillar.titleKey, pillar.titleFallback)}
                  </h3>
                  <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed">
                    {t(pillar.descKey, pillar.descFallback)}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
