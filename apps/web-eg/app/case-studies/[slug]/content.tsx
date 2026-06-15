'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import type { CaseStudy } from '@/lib/data/case-studies'
import { CaseStudyHero } from '@/components/features/insights/CaseStudyHero'
import { CaseStudyGallery } from '@/components/features/case-studies/CaseStudyGallery'
import { CaseStudyBeforeAfter } from '@/components/features/case-studies/CaseStudyBeforeAfter'
import { CaseStudyDetails } from '@/components/features/case-studies/CaseStudyDetails'
import { CaseStudyCta } from '@/components/features/case-studies/CaseStudyCta'
import { Container } from '@/components/layout/Container'
import { CtaSection } from '@/components/sections/CtaSection'
import { MainLayout } from '@/components/layout/MainLayout'

interface Props { cs: CaseStudy }

export function CaseStudyContent({ cs }: Props) {
  return (
    <MainLayout>

        <CaseStudyHero cs={cs} />
        <CaseStudyDetails cs={cs} />
        {cs.beforeAfter && <CaseStudyBeforeAfter pair={cs.beforeAfter} accent={cs.accent} />}
        <CaseStudyGallery cs={cs} />

        <div className="py-10 sm:py-16 bg-white">
          <Container>
            <div className="max-w-3xl space-y-12">

              <section aria-label="The challenge">
                <h2 className="font-display text-[22px] font-bold text-brand-navy mb-4">The Challenge</h2>
                <p className="text-[15px] text-brand-secondary leading-relaxed">{cs.challenge}</p>
              </section>

              <section aria-label="Our approach">
                <h2 className="font-display text-[22px] font-bold text-brand-navy mb-5">Our Approach</h2>
                <ul className="space-y-3" role="list">
                  {cs.approach.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-[2px]"
                        style={{ backgroundColor: `${cs.accent}18` }}
                      >
                        <Check size={11} style={{ color: cs.accent }} strokeWidth={2.5} />
                      </span>
                      <span className="text-[15px] text-brand-secondary leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-label="Results">
                <h2 className="font-display text-[22px] font-bold text-brand-navy mb-5">The Results</h2>
                <div
                  className="rounded-2xl border p-7 space-y-4"
                  style={{ borderColor: `${cs.accent}30`, backgroundColor: cs.bg }}
                >
                  {cs.results.map((r, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-[16px] font-bold shrink-0 leading-snug" style={{ color: cs.accent }}>↗</span>
                      <span className="text-[15px] font-medium text-brand-navy">{r}</span>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </Container>
        </div>

        <CaseStudyCta cs={cs} />

        <div className="py-8 bg-brand-canvas border-t border-brand-whisper-border">
          <Container>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-brand-secondary hover:text-brand-navy transition-colors"
              >
                <ArrowLeft size={14} />
                Back to all case studies
              </Link>
              <Link
                href="/contact"
                data-ripple=""
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-brand-yellow text-brand-navy hover:bg-[#FFB300] active:scale-[0.97] transition-all duration-150"
              >
                Start a similar project
                <ArrowRight size={14} />
              </Link>
            </div>
          </Container>
        </div>

        <CtaSection />
    </MainLayout>
  )
}
