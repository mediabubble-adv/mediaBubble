import React, { useEffect, useState } from 'react'
import { AtSign } from 'lucide-react'
import { PageHero } from './PageHero'
import { BrandBody, BrandDocCard, BrandInfoBand, BrandMetaPill, BrandPageContent, BrandSectionHeading } from '@/components/ui/brand-doc'
import { useI18n } from '@/lib/i18n/provider'

export function EmailApplicationsPage() {
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

  const improvements = [
    t('Replaced Arial with the approved Inter stack for body content.'),
    t('Used a single brand blue divider between the logo and identity block.'),
    t('Kept footer emphasis to one approved accent gradient instead of decorative extras.'),
    t('Maintained clear role hierarchy for name, title, and contact details.'),
  ]

  const tokens = ['Inter', '#2196F3', '#1565C0', '#333333']

  return (
    <div>
      <PageHero
        icon={AtSign}
        kicker={t('Pattern Applications')}
        title={t('Email Applications')}
        titleHighlight={t('Email')}
        description={t('Reference applications for signatures and email brand surfaces. Use them to apply the system, not to create new email styles.')}
      />

      <BrandPageContent className="space-y-10">
        <BrandInfoBand className="flex flex-wrap items-start gap-3">
          <BrandMetaPill tone="reference">{t('Pattern · Reference')}</BrandMetaPill>
          <BrandBody className="max-w-3xl text-[13px]">
            {t('This page shows how canonical logo, type, and color rules come together in email surfaces. The source rules still live in Foundations, Components, and Digital Assets.')}
          </BrandBody>
        </BrandInfoBand>

        <section>
          <BrandSectionHeading icon={AtSign} title={t('Jump within this page')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '#guideline-pattern-email-signature', label: t('Email Signature Application') },
              { href: '#guideline-pattern-email-rules', label: t('Email Application Rules') },
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

        <section id="guideline-pattern-email-signature" className="scroll-mt-20">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <BrandSectionHeading icon={AtSign} title={t('Email signature application')} anchorId="pattern-email-signature" className="mb-0" />
            {activeAnchor === 'pattern-email-signature' ? <BrandMetaPill tone="system">{t('You are here')}</BrandMetaPill> : null}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <BrandDocCard>
              <BrandMetaPill tone="reference" className="mb-3">{t('Before')}</BrandMetaPill>
              <p className="text-[13px] text-brand-text-secondary leading-relaxed">
                {t('A plain text signature with mismatched font styling, generic links, and no visible brand system. It communicates contact details, but not MediaBubble.')}
              </p>
            </BrandDocCard>
            <BrandDocCard>
              <BrandMetaPill tone="reference" className="mb-3">{t('After')}</BrandMetaPill>
              <p className="text-[13px] text-brand-text leading-relaxed">
                {t('A branded signature with a strict two-column structure, one divider, controlled accent use, and consistent hierarchy. The result feels operational rather than ornamental.')}
              </p>
            </BrandDocCard>
          </div>
        </section>

        <section id="guideline-pattern-email-rules" className="scroll-mt-20">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <BrandSectionHeading icon={AtSign} title={t('What makes this valid')} anchorId="pattern-email-rules" className="mb-0" />
            {activeAnchor === 'pattern-email-rules' ? <BrandMetaPill tone="system">{t('You are here')}</BrandMetaPill> : null}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <BrandDocCard>
              <BrandMetaPill tone="canonical" className="mb-3">{t('Canonical rules applied')}</BrandMetaPill>
              <ul className="space-y-2 text-[12px] text-brand-text-secondary leading-relaxed">
                {improvements.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </BrandDocCard>
            <BrandDocCard>
              <BrandMetaPill tone="system" className="mb-3">{t('Tokens used')}</BrandMetaPill>
              <div className="flex flex-wrap gap-2">
                {tokens.map((token) => (
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
