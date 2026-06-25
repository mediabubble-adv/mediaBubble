import React from 'react'
import { ArrowRight, Grid3X3, LayoutTemplate, Sparkles } from 'lucide-react'
import { PageHero } from './PageHero'
import { BrandBody, BrandDocCard, BrandInfoBand, BrandMetaPill, BrandPageContent, BrandSectionHeading } from '@/components/ui/brand-doc'
import { useI18n } from '@/lib/i18n/provider'

export function PatternsPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { t } = useI18n()

  const compositionPages = [
    {
      id: 'spacing',
      icon: Grid3X3,
      title: t('Spacing & Grid'),
      description: t('Canonical spacing tokens, grid structures, and layout dimensions used across the system.'),
      meta: t('Canonical composition rules'),
      tone: 'canonical' as const,
    },
    {
      id: 'real-world-examples',
      icon: Sparkles,
      title: t('Application Pages'),
      description: t('Reference application pages for email, social, and deck compositions built from the approved system.'),
      meta: t('Reference applications'),
      tone: 'reference' as const,
    },
  ]

  const patternRules = [
    t('Patterns combine approved foundations and components. They do not create separate visual rules.'),
    t('Use spacing, hierarchy, and composition tokens first before inventing a new layout.'),
    t('Examples belong here only when they teach composition. Pure downloads stay in Assets.'),
  ]

  return (
    <div>
      <PageHero
        icon={LayoutTemplate}
        kicker={t('Composition System')}
        title={t('Patterns')}
        titleHighlight={t('Patterns')}
        description={t('Patterns are the composition layer of the system: how approved foundations and components assemble into repeatable layouts.')}
      />

      <BrandPageContent className="space-y-10">
        <BrandInfoBand className="flex flex-wrap items-start gap-3">
          <BrandMetaPill tone="canonical">{t('Canonical structure')}</BrandMetaPill>
          <BrandBody className="max-w-3xl text-[13px]">
            {t('Treat this area as the composition map for the design system. Start with the canonical layout rules, then use reference pages only to see those rules applied in context.')}
          </BrandBody>
        </BrandInfoBand>

        <section>
          <BrandSectionHeading icon={LayoutTemplate} title={t('Composition pages')} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {compositionPages.map((page) => {
              const Icon = page.icon
              return (
                <button key={page.id} onClick={() => onNavigate(page.id)} className="text-start">
                  <BrandDocCard className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue/30">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-whisper-border bg-brand-canvas text-brand-blue">
                        <Icon size={18} />
                      </span>
                      <BrandMetaPill tone={page.tone}>{page.meta}</BrandMetaPill>
                    </div>
                    <h2 className="text-[15px] font-semibold text-brand-text mb-1.5">{page.title}</h2>
                    <BrandBody className="text-[12px] mb-4">{page.description}</BrandBody>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-blue">
                      {t('Open page')}
                      <ArrowRight size={13} />
                    </span>
                  </BrandDocCard>
                </button>
              )
            })}
          </div>
        </section>

        <section>
          <BrandSectionHeading icon={Grid3X3} title={t('Pattern rules')} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {patternRules.map((rule) => (
              <BrandDocCard key={rule}>
                <BrandMetaPill tone="system" className="mb-3">
                  {t('System rule')}
                </BrandMetaPill>
                <BrandBody className="text-[12px]">{rule}</BrandBody>
              </BrandDocCard>
            ))}
          </div>
        </section>
      </BrandPageContent>
    </div>
  )
}
