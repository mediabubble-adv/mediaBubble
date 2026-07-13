import type { CaseStudy } from '@/lib/data/case-studies'
import { Container } from '@/components/layout/Container'

interface Props {
  cs: CaseStudy
}

export function CaseStudyDetails({ cs }: Props) {
  return (
    <section aria-label="Project details" className="py-8 sm:py-10 bg-brand-canvas dark:bg-brand-surface border-b border-brand-whisper-border">
      <Container>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-secondary dark:text-brand-text-muted mb-1">Client</p>
            <p className="text-[15px] font-semibold text-brand-navy dark:text-brand-off-white">{cs.client}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-secondary dark:text-brand-text-muted mb-1">Duration</p>
            <p className="text-[15px] font-semibold text-brand-navy dark:text-brand-off-white">{cs.duration}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-secondary dark:text-brand-text-muted mb-1">Service</p>
            <p className="text-[15px] font-semibold text-brand-navy dark:text-brand-off-white">{cs.service}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-secondary dark:text-brand-text-muted mb-3">Tools & Technologies</p>
          <ul className="flex flex-wrap gap-2" role="list">
            {cs.technologies.map(tech => (
              <li
                key={tech}
                className="text-[12px] font-medium px-3 py-1.5 rounded-full border border-brand-whisper-border bg-white dark:bg-brand-navy/40 text-brand-navy dark:text-brand-off-white"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {cs.keyMetrics.length > 0 && (
          <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cs.keyMetrics.map(m => (
              <div
                key={m.label}
                className="rounded-2xl border p-5 text-center dark:border-white/10 dark:bg-white/[0.04]"
                style={{ borderColor: `${cs.accent}30`, backgroundColor: cs.bg }}
              >
                <p className="font-display text-[28px] font-bold leading-none mb-2" style={{ color: cs.accent }}>
                  {m.value}
                </p>
                <p className="text-[12px] font-medium text-brand-secondary dark:text-brand-text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
