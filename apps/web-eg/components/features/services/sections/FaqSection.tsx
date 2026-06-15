'use client'

import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'
import { SectionHeader, FaqAccordion } from '@mediabubble/design-system'
import type { ServiceData } from '@/lib/services-data'

export function FaqSection({ faqs }: { faqs: ServiceData['faqs'] }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-surface" aria-label="Frequently asked questions">
      <Container>
        <div data-reveal>
          <SectionHeader
            kicker="FAQ"
            title="Common Questions"
            intro="Everything you need to know before we start working together."
            className="mb-10"
          />
        </div>
        <div className="max-w-2xl mx-auto">
          <FaqAccordion items={faqs} />
        </div>
      </Container>
    </section>
  )
}
