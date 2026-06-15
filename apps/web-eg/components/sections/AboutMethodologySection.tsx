'use client'

import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'
import { TimelineSection } from '@mediabubble/design-system'

const STEPS = [
  {
    step: '01',
    titleKey: 'about.methodology.step1.title',
    descKey: 'about.methodology.step1.desc',
    titleFallback: 'Embed with your leadership',
    descFallback:
      'We start with your commercial goals, seasonality, and sales motion — not a generic marketing template.',
  },
  {
    step: '02',
    titleKey: 'about.methodology.step2.title',
    descKey: 'about.methodology.step2.desc',
    titleFallback: 'Agree KPIs in writing',
    descFallback:
      'Leads, bookings, ROAS, or pipeline — every engagement ships with targets, owners, and review cadence.',
  },
  {
    step: '03',
    titleKey: 'about.methodology.step3.title',
    descKey: 'about.methodology.step3.desc',
    titleFallback: 'Ship in focused sprints',
    descFallback:
      'Creative, media, and web work in parallel with weekly checkpoints so nothing stalls between departments.',
  },
  {
    step: '04',
    titleKey: 'about.methodology.step4.title',
    descKey: 'about.methodology.step4.desc',
    titleFallback: 'Review, learn, scale',
    descFallback:
      'Monthly performance reviews decide what to double down on, pause, or test next — with full account transparency.',
  },
] as const

export function AboutMethodologySection() {
  const { t, dir } = useI18n()

  const steps = STEPS.map((step) => ({
    step: step.step,
    title: t(step.titleKey, step.titleFallback),
    description: t(step.descKey, step.descFallback),
  }))

  return (
    <section dir={dir} className="py-12 sm:py-20 lg:py-28 bg-brand-navy" aria-label={t('about.methodology.aria', 'Our methodology')}>
      <Container>
        <TimelineSection
          variant="vertical"
          light
          kicker={t('about.methodology.kicker', 'Partnership model')}
          title={t('about.methodology.title', 'How we work alongside your team')}
          intro={t(
            'about.methodology.intro',
            'A four-phase rhythm designed for hospitality and retail operators who need clarity, not another slide deck.',
          )}
          steps={steps}
        />
      </Container>
    </section>
  )
}
