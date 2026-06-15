'use client'

import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@mediabubble/design-system'
import type { ServiceData } from '@/lib/services-data'

export function ProcessSection({ process }: { process: ServiceData['process'] }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-navy" aria-label="How it works">
      <Container>
        <div data-reveal>
          <SectionHeader
            kicker="How It Works"
            title="Our Proven Process"
            intro="A clear system with no surprises and no hand-waving."
            light
            className="mb-12"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step, i) => (
            <div
              key={step.step}
              data-reveal
              data-reveal-delay={String(i * 80)}
              className="relative"
            >
              {i < process.length - 1 && (
                <div className="hidden lg:block absolute top-5 left-full w-full h-px bg-white/[0.08] -translate-y-px z-0" aria-hidden="true" />
              )}
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow font-bold text-[14px] mb-4">
                  {step.step}
                </div>
                <h3 className="text-[16px] font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-[14px] text-white/55 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
