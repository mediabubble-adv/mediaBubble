'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Container } from './Container'
import { SiteNav } from './SiteNav'
import { SiteFooter } from './SiteFooter'

interface Section {
  heading: string
  body:    string | string[]
}

interface Props {
  kicker:      string
  title:       string
  lastUpdated: string
  sections:    Section[]
}

export function LegalLayout({ kicker, title, lastUpdated, sections }: Props) {
  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1}>

        {/* Page header */}
        <div className="pt-24 pb-10 sm:pt-28 sm:pb-12 bg-[#FAFAFA] border-b border-[#E8E8E8]">
          <Container>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#2196F3] hover:text-[#1976D2] mb-6 transition-colors"
            >
              <ArrowLeft size={14} />
              Home
            </Link>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2196F3] mb-3">
              {kicker}
            </p>
            <h1 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-[#072A6B] leading-tight mb-3">
              {title}
            </h1>
            <p className="text-[13px] text-[#999]">Last updated: {lastUpdated}</p>
          </Container>
        </div>

        {/* Body */}
        <div className="py-10 sm:py-16 bg-white">
          <Container>
            <div className="max-w-3xl space-y-10">
              {sections.map((section, i) => (
                <section key={i}>
                  <h2 className="font-display text-[18px] font-bold text-[#072A6B] mb-3">
                    {section.heading}
                  </h2>
                  {Array.isArray(section.body) ? (
                    <ul className="space-y-2 list-disc list-inside text-[15px] text-[#444] leading-relaxed">
                      {section.body.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[15px] text-[#444] leading-relaxed">{section.body}</p>
                  )}
                </section>
              ))}

              <div className="pt-6 border-t border-[#E8E8E8]">
                <p className="text-[14px] text-[#666]">
                  Questions? Email us at{' '}
                  <a
                    href="mailto:hello@mediabubble.com"
                    className="text-[#2196F3] hover:underline"
                  >
                    hello@mediabubble.com
                  </a>
                </p>
              </div>
            </div>
          </Container>
        </div>

      </main>
      <SiteFooter />
    </>
  )
}
