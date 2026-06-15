'use client'

import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'
import { SectionHeader, ComparisonTable } from '@mediabubble/design-system'

const ROWS = [
  {
    labelKey: 'services.delivery.row.strategist',
    labelFallback: 'Dedicated strategist',
    values: [true, true, true] as const,
  },
  {
    labelKey: 'services.delivery.row.reporting',
    labelFallback: 'Monthly performance reporting',
    values: [true, true, true] as const,
  },
  {
    labelKey: 'services.delivery.row.creative',
    labelFallback: 'Creative & content production',
    values: [false, true, true] as const,
  },
  {
    labelKey: 'services.delivery.row.paid',
    labelFallback: 'Paid media management',
    values: [true, true, true] as const,
  },
  {
    labelKey: 'services.delivery.row.web',
    labelFallback: 'Web & landing pages',
    values: [false, true, true] as const,
  },
  {
    labelKey: 'services.delivery.row.events',
    labelFallback: 'Events & activations',
    values: [false, false, true] as const,
  },
] as const

export function ServicesDeliverySection() {
  const { t, dir } = useI18n()

  const columns = [
    t('services.delivery.col.channel', 'Single channel'),
    t('services.delivery.col.multi', 'Multi-channel'),
    t('services.delivery.col.full', 'Full partnership'),
  ]

  const rows = ROWS.map((row) => ({
    label: t(row.labelKey, row.labelFallback),
    values: [...row.values],
  }))

  return (
    <section
      dir={dir}
      className="py-12 sm:py-20 lg:py-28 bg-brand-surface"
      aria-label={t('services.delivery.aria', 'How we deliver')}
    >
      <Container>
        <SectionHeader
          kicker={t('services.delivery.kicker', 'Delivery options')}
          title={t('services.delivery.title', 'Choose the depth that fits your stage')}
          intro={t(
            'services.delivery.intro',
            'Start with one channel or bring the full stack under one plan. Every tier includes a named strategist and reporting.',
          )}
          className="mb-10 sm:mb-14"
        />
        <div data-reveal>
          <ComparisonTable
            columns={columns}
            rows={rows}
            highlightColumn={2}
            aria-label={t('services.delivery.tableAria', 'Service delivery comparison')}
          />
        </div>
      </Container>
    </section>
  )
}
