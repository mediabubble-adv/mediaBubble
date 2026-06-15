'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@mediabubble/design-system'
import type { ServiceData } from '@/lib/services-data'

export function CaseStudySection({ caseStudy }: { caseStudy: ServiceData['caseStudy'] }) {
  const { dir } = useI18n()

  return (
    <section dir={dir} className="py-14 sm:py-20 bg-brand-canvas" aria-label="Case study">
      <Container>
        <div data-reveal>
          <SectionHeader kicker="Real Results" title="Proof It Works" className="mb-10" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="relative bg-brand-navy rounded-2xl p-8 overflow-hidden">
            <div
              className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            <p className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-6">{caseStudy.company}</p>
            <div className="mb-5">
              <span className="text-[56px] font-bold text-brand-yellow leading-none">{caseStudy.metric}</span>
              <p className="text-[15px] text-white/60 mt-2">{caseStudy.metricLabel}</p>
            </div>
            <p className="text-[15px] text-white/55 leading-relaxed mb-6">{caseStudy.description}</p>
            {caseStudy.href && (
              <Link
                href={caseStudy.href}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-yellow hover:gap-2.5 transition-all duration-150"
              >
                View Full Case Study
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            )}
          </div>

          <div className="bg-brand-surface rounded-2xl p-8 border border-brand-whisper-border dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex gap-0.5 mb-5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 14 14" fill="#FFC107" aria-hidden="true">
                    <path d="M7 1l1.545 4.756H13.5L9.477 8.488l1.545 4.756L7 10.512l-4.023 2.732 1.546-4.756L.5 5.756h4.955z" />
                  </svg>
                ))}
              </div>
              <blockquote>
                <p className="text-[17px] text-brand-navy dark:text-brand-off-white leading-relaxed font-medium">
                  &ldquo;{caseStudy.quote}&rdquo;
                </p>
              </blockquote>
            </div>
            <footer className="flex items-center gap-3 mt-8">
              <div className="w-11 h-11 rounded-full bg-brand-navy text-white flex items-center justify-center text-[14px] font-semibold">
                {caseStudy.author.charAt(0)}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-brand-navy dark:text-brand-off-white">{caseStudy.author}</p>
                <p className="text-[12px] text-brand-secondary dark:text-brand-text-muted">{caseStudy.authorTitle}</p>
              </div>
            </footer>
          </div>
        </div>
      </Container>
    </section>
  )
}
