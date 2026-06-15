'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { marketingKickerClassName } from '@mediabubble/shared/ui/marketing-kicker'
import { Container } from './Container'
import { MainLayout } from './MainLayout'

import { useI18n } from '@/lib/i18n/provider'

interface Section {
  heading: string
  body:    string | string[]
}

interface Props {
  kicker:      string
  title:       string
  lastUpdated: string
  sections:    Section[]
  contactEmail?: string
}

export function LegalLayout({ kicker, title, lastUpdated, sections, contactEmail = 'hello@mediabubble.com' }: Props) {
  const { t } = useI18n()

  return (
    <MainLayout navTopSurface="light">

        {/* Page header */}
        <div className="pt-24 pb-10 sm:pt-28 sm:pb-12 bg-brand-canvas border-b border-brand-whisper-border">
          <Container>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand-blue hover:text-brand-dark-blue mb-6 transition-colors"
            >
              <ArrowLeft size={14} />
              {t('legal.backHome', 'Home')}
            </Link>
            <p className={marketingKickerClassName}>
              {kicker}
            </p>
            <h1 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-brand-navy dark:text-brand-off-white leading-tight mb-3">
              {title}
            </h1>
            <p className="text-[13px] text-brand-text-muted">
              {t('legal.lastUpdated', 'Last updated:')} {lastUpdated}
            </p>
          </Container>
        </div>

        {/* Body */}
        <div className="py-10 sm:py-16 bg-brand-surface">
          <Container>
            <div className="max-w-3xl space-y-10">
              {sections.map((section, i) => (
                <section key={i}>
                  <h2 className="font-display text-[18px] font-bold text-brand-navy dark:text-brand-off-white mb-3">
                    {section.heading}
                  </h2>
                  {Array.isArray(section.body) ? (
                    <ul className="space-y-2 list-disc list-inside text-[15px] text-brand-text dark:text-brand-text-muted leading-relaxed">
                      {section.body.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[15px] text-brand-text dark:text-brand-text-muted leading-relaxed">{section.body}</p>
                  )}
                </section>
              ))}

              <div className="pt-6 border-t border-brand-whisper-border">
                <p className="text-[14px] text-brand-secondary dark:text-brand-text-muted">
                  {t('legal.questions', 'Questions? Email us at')}{' '}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-brand-blue hover:underline"
                  >
                    {contactEmail}
                  </a>
                </p>
              </div>
            </div>
          </Container>
        </div>

    </MainLayout>
  )
}
