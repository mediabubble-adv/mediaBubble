import React from 'react'
import { ArrowRight, LayoutTemplate } from 'lucide-react'
import { PageHero } from './PageHero'
import { BrandBody, BrandDocCard, BrandInfoBand, BrandMetaPill, BrandPageContent, BrandSectionHeading } from '@/components/ui/brand-doc'
import { useI18n } from '@/lib/i18n/provider'

export function RealWorldExamplesPage({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const { t } = useI18n()

  const pages = [
    {
      id: 'pattern-email',
      title: t('Email Applications'),
      summary: t('Email signatures and email identity surfaces translated from the core system.'),
    },
    {
      id: 'pattern-social',
      title: t('Social Applications'),
      summary: t('Cross-platform social compositions that keep one brand logic across multiple surfaces.'),
    },
    {
      id: 'pattern-decks',
      title: t('Deck Applications'),
      summary: t('Presentation and slide-system applications with stable type, footer, and accent logic.'),
    },
  ]

  return (
    <div>
      <PageHero
        icon={LayoutTemplate}
        kicker={t('Pattern Applications')}
        title={t('Application Hub')}
        titleHighlight={t('Applications')}
        description={t('Reference application pages that show the system working in context. Use them to validate composition, not to define new standards.')}
      />

      <BrandPageContent className="space-y-10">
        <BrandInfoBand className="flex flex-wrap items-start gap-3">
          <BrandMetaPill tone="reference">{t('Pattern · Reference')}</BrandMetaPill>
          <BrandBody className="max-w-3xl text-[13px]">
            {t('This page is now the entry point for application references. Open the specific page that matches your surface instead of treating all examples as one blended showcase.')}
          </BrandBody>
        </BrandInfoBand>

        <section>
          <BrandSectionHeading icon={LayoutTemplate} title={t('Jump to application')} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onNavigate?.(page.id)}
                className="rounded-lg border border-brand-whisper-border bg-brand-surface px-4 py-3 text-start transition-all duration-150 hover:-translate-y-0.5 hover:border-brand-blue/30"
              >
                <BrandMetaPill tone="reference" className="mb-2">
                  {t('Reference application')}
                </BrandMetaPill>
                <p className="text-[13px] font-semibold text-brand-text">{page.title}</p>
                <p className="mt-1 text-[11px] text-brand-text-secondary leading-relaxed">{page.summary}</p>
              </button>
            ))}
          </div>
        </section>

        <section>
          <BrandSectionHeading icon={LayoutTemplate} title={t('Application pages')} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onNavigate?.(page.id)}
                className="text-start"
              >
                <BrandDocCard className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue/30">
                  <BrandMetaPill tone="reference" className="mb-4">
                    {t('Reference application')}
                  </BrandMetaPill>
                  <h2 className="text-[15px] font-semibold text-brand-text mb-1.5">{page.title}</h2>
                  <BrandBody className="text-[12px] mb-4">{page.summary}</BrandBody>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-blue">
                    {t('Open page')}
                    <ArrowRight size={13} />
                  </span>
                </BrandDocCard>
              </button>
            ))}
          </div>
        </section>
      </BrandPageContent>
    </div>
  )
}
