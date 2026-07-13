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
    titleFallback: 'Built for the Red Sea market',
    descFallback:
      'We know Hurghada tourism seasons, booking cycles, and how guests discover hotels and experiences online.',
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
      'Monthly dashboards tied to revenue and bookings, not vanity metrics buried in a PDF.',
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
            className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-bold text-brand-navy dark:text-brand-off-white leading-tight [text-wrap:balance]"
          >
            {t('whyUs.title', 'Local expertise without agency overhead')}
          </h2>
        </div>

        <ul className="grid list-none grid-cols-1 gap-x-10 gap-y-10 p-0 m-0 md:grid-cols-3 md:gap-y-0 md:divide-x md:divide-brand-whisper-border md:dark:divide-white/10 rtl:md:divide-x-reverse">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <li
                key={pillar.id}
                data-reveal
                data-reveal-delay={String(index * 70)}
                className="group flex gap-4 md:px-7 md:first:ps-0 md:last:pe-0"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue transition-transform duration-300 group-hover:-translate-y-0.5"
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
