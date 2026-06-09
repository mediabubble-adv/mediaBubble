'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import type { CaseStudy } from '@/lib/data/case-studies'
import { Container } from '@/components/marketing/Container'
import { CtaSection } from '@/components/marketing/CtaSection'
import { SiteNav } from '@/components/marketing/SiteNav'
import { SiteFooter } from '@/components/marketing/SiteFooter'

interface Props { cs: CaseStudy }

export function CaseStudyContent({ cs }: Props) {
  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1}>

        {/* Hero */}
        <div className="pt-24 pb-14 sm:pt-28 sm:pb-16 bg-gradient-to-br from-[#EBF5FB] via-[#F4F8FE] to-white">
          <Container>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#2196F3] hover:text-[#1976D2] mb-8 transition-colors"
            >
              <ArrowLeft size={14} />
              All case studies
            </Link>

            <span
              className="inline-block text-[11px] font-semibold uppercase tracking-[0.14em] mb-4"
              style={{ color: cs.accent }}
            >
              {cs.service}
            </span>

            <h1 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold text-[#072A6B] leading-tight mb-6 max-w-3xl">
              {cs.title}
            </h1>

            <div
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3"
              style={{ backgroundColor: cs.bg }}
            >
              <span className="text-[18px]" aria-hidden="true">↗</span>
              <span className="text-[15px] font-semibold" style={{ color: cs.accent }}>
                {cs.metric}
              </span>
            </div>
          </Container>
        </div>

        {/* Body */}
        <div className="py-10 sm:py-16 bg-white">
          <Container>
            <div className="max-w-3xl space-y-12">

              {/* Challenge */}
              <section aria-label="The challenge">
                <h2 className="font-display text-[22px] font-bold text-[#072A6B] mb-4">The Challenge</h2>
                <p className="text-[15px] text-[#444] leading-relaxed">{cs.challenge}</p>
              </section>

              {/* Approach */}
              <section aria-label="Our approach">
                <h2 className="font-display text-[22px] font-bold text-[#072A6B] mb-5">Our Approach</h2>
                <ul className="space-y-3" role="list">
                  {cs.approach.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-[2px]"
                        style={{ backgroundColor: `${cs.accent}18` }}
                      >
                        <Check size={11} style={{ color: cs.accent }} strokeWidth={2.5} />
                      </span>
                      <span className="text-[15px] text-[#444] leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Results */}
              <section aria-label="Results">
                <h2 className="font-display text-[22px] font-bold text-[#072A6B] mb-5">The Results</h2>
                <div
                  className="rounded-2xl border p-7 space-y-4"
                  style={{ borderColor: `${cs.accent}30`, backgroundColor: cs.bg }}
                >
                  {cs.results.map((r, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-[16px] font-bold shrink-0 leading-snug" style={{ color: cs.accent }}>↗</span>
                      <span className="text-[15px] font-medium text-[#333]">{r}</span>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </Container>
        </div>

        {/* Pagination bar */}
        <div className="py-8 bg-[#FAFAFA] border-t border-[#E8E8E8]">
          <Container>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#555] hover:text-[#072A6B] transition-colors"
              >
                <ArrowLeft size={14} />
                Back to all case studies
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-[#FFC107] text-[#072A6B] hover:bg-[#FFB300] active:scale-[0.97] transition-all duration-150"
              >
                Start a similar project
                <ArrowRight size={14} />
              </Link>
            </div>
          </Container>
        </div>

        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
