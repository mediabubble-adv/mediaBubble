'use client'

import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@mediabubble/design-system'
import type { ServiceData } from '@/lib/services-data'

export function ProblemsSection({ problems }: { problems: ServiceData['problems'] }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-canvas" aria-label="Problems we solve">
      <Container>
        <div data-reveal>
          <SectionHeader
            kicker="Common challenges"
            title="Problems we solve"
            intro="If any of these sound familiar, we can help."
            className="mb-10"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <div
              key={p.title}
              data-reveal
              data-reveal-delay={String(i * 80)}
              className="bg-brand-surface rounded-2xl p-6 border border-brand-whisper-border dark:border-white/10"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4 text-red-500 font-bold text-[18px]">
                ✕
              </div>
              <h3 className="text-[16px] font-semibold text-brand-navy dark:text-brand-off-white mb-2">{p.title}</h3>
              <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
