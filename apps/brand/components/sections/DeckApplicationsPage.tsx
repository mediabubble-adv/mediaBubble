import React, { useEffect, useState } from 'react'
import { LayoutTemplate } from 'lucide-react'
import { PageHero } from './PageHero'
import { BrandBody, BrandDocCard, BrandInfoBand, BrandMetaPill, BrandPageContent, BrandSectionHeading } from '@/components/ui/brand-doc'
import { useI18n } from '@/lib/i18n/provider'

export function DeckApplicationsPage() {
  const { t } = useI18n()
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null)

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace(/^#guideline-/, '')
      setActiveAnchor(hash || null)
    }
    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  const rules = [
    t('Use Poppins only for slide titles and keep sizing roles stable.'),
    t('Use Inter for body copy and data support.'),
    t('Reserve brand yellow for dividers, callouts, and one emphasis move per slide.'),
    t('Keep footer structure consistent so deck pages feel like one system, not one-off slides.'),
  ]

  return (
    <div>
      <PageHero
        icon={LayoutTemplate}
        kicker={t('Pattern Applications')}
        title={t('Deck Applications')}
        titleHighlight={t('Deck')}
        description={t('Reference applications for presentations and slide systems. These examples translate the brand into sequence-based layouts without becoming separate presentation branding.')}
      />

      <BrandPageContent className="space-y-10">
        <BrandInfoBand className="flex flex-wrap items-start gap-3">
          <BrandMetaPill tone="reference">{t('Pattern · Reference')}</BrandMetaPill>
          <BrandBody className="max-w-3xl text-[13px]">
            {t('Deck applications are reference compositions for sequence-based communication. Use them to validate hierarchy, pacing, and emphasis while keeping the underlying rules canonical elsewhere.')}
          </BrandBody>
        </BrandInfoBand>

        <section>
          <BrandSectionHeading icon={LayoutTemplate} title={t('Jump within this page')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '#guideline-pattern-deck-presentation', label: t('Presentation Application') },
              { href: '#guideline-pattern-deck-checks', label: t('Deck Application Checks') },
            ].map((item) => {
              const anchor = item.href.replace(/^#guideline-/, '')
              const isActive = activeAnchor === anchor
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg border px-4 py-3 text-start transition-all duration-150 hover:-translate-y-0.5 ${
                    isActive
                      ? 'border-brand-blue bg-brand-blue/5'
                      : 'border-brand-whisper-border bg-brand-surface hover:border-brand-blue/30'
                  }`}
                >
                  <p className="text-[13px] font-semibold text-brand-text">{item.label}</p>
                  <p className="mt-1 text-[11px] text-brand-text-secondary">
                    {isActive ? t('You are here') : t('Jump to section')}
                  </p>
                </a>
              )
            })}
          </div>
        </section>

        <section id="guideline-pattern-deck-presentation" className="scroll-mt-20">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <BrandSectionHeading icon={LayoutTemplate} title={t('Presentation application')} anchorId="pattern-deck-presentation" className="mb-0" />
            {activeAnchor === 'pattern-deck-presentation' ? <BrandMetaPill tone="system">{t('You are here')}</BrandMetaPill> : null}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <BrandDocCard>
              <BrandMetaPill tone="reference" className="mb-3">{t('Before')}</BrandMetaPill>
              <p className="text-[13px] text-brand-text-secondary leading-relaxed">
                {t('Slides mix stock aesthetics, uncontrolled type scales, and inconsistent footer treatments. The deck reads like assembled material instead of one authored system.')}
              </p>
            </BrandDocCard>
            <BrandDocCard>
              <BrandMetaPill tone="reference" className="mb-3">{t('After')}</BrandMetaPill>
              <p className="text-[13px] text-brand-text leading-relaxed">
                {t('A clean slide rhythm uses stable type roles, one accent divider logic, and a repeatable footer structure. The deck feels composed, not decorated.')}
              </p>
            </BrandDocCard>
          </div>
        </section>

        <section id="guideline-pattern-deck-checks" className="scroll-mt-20">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <BrandSectionHeading icon={LayoutTemplate} title={t('Application checks')} anchorId="pattern-deck-checks" className="mb-0" />
            {activeAnchor === 'pattern-deck-checks' ? <BrandMetaPill tone="system">{t('You are here')}</BrandMetaPill> : null}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <BrandDocCard>
              <BrandMetaPill tone="canonical" className="mb-3">{t('Canonical rules applied')}</BrandMetaPill>
              <ul className="space-y-2 text-[12px] text-brand-text-secondary leading-relaxed">
                {rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </BrandDocCard>
            <BrandDocCard>
              <BrandMetaPill tone="system" className="mb-3">{t('Primary system cues')}</BrandMetaPill>
              <div className="flex flex-wrap gap-2">
                {['Poppins', 'Inter', '#FFC107', '#1565C0'].map((token) => (
                  <span key={token} className="rounded-md bg-brand-canvas px-2 py-1 text-[10px] font-mono font-semibold text-brand-text-secondary">
                    {token}
                  </span>
                ))}
              </div>
            </BrandDocCard>
          </div>
        </section>
      </BrandPageContent>
    </div>
  )
}
