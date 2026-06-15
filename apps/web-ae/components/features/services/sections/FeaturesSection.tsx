'use client'

import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'
import { SectionHeader, FeatureCard } from '@mediabubble/design-system'
import type { ServiceData } from '@/lib/services-data'

export function FeaturesSection({ features }: { features: ServiceData['features'] }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-canvas" aria-label="What's included">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-reveal>
            <SectionHeader
              kicker="What's Included"
              title="Everything You Need, Nothing You Don't"
              intro="No upsells or hidden extras. Everything in the package."
              className="mb-0"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {features.map((f, i) => (
              <div key={f.feature} data-reveal data-reveal-delay={String(i * 60)}>
                <FeatureCard feature={f.feature} description={f.description} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
