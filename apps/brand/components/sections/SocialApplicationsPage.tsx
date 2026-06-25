import React, { useEffect, useState } from 'react'
import { Share2 } from 'lucide-react'
import { PageHero } from './PageHero'
import { BrandBody, BrandDocCard, BrandInfoBand, BrandMetaPill, BrandPageContent, BrandSectionHeading } from '@/components/ui/brand-doc'
import { useI18n } from '@/lib/i18n/provider'

export function SocialApplicationsPage() {
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
    t('Keep the logo locked to one placement across variants.'),
    t('Use brand yellow only as the accent moment, not as the whole surface.'),
    t('Keep headline hierarchy consistent between platforms.'),
    t('Treat avatar and post treatments as platform references, not as new logo variants.'),
  ]

  return (
    <div>
      <PageHero
        icon={Share2}
        kicker={t('Pattern Applications')}
        title={t('Social Applications')}
        titleHighlight={t('Social')}
        description={t('Reference applications for social templates and profile surfaces. These show consistent composition across platforms without redefining the brand.')}
      />

      <BrandPageContent className="space-y-10">
        <BrandInfoBand className="flex flex-wrap items-start gap-3">
          <BrandMetaPill tone="reference">{t('Pattern · Reference')}</BrandMetaPill>
          <BrandBody className="max-w-3xl text-[13px]">
            {t('Use these examples to check composition, not to invent platform-specific branding. Canonical identity rules still come from Logo, Color, and Digital Assets.')}
          </BrandBody>
        </BrandInfoBand>

        <section>
          <BrandSectionHeading icon={Share2} title={t('Jump within this page')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '#guideline-pattern-social-template', label: t('Social Template Application') },
              { href: '#guideline-pattern-social-checks', label: t('Social Application Checks') },
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

        <section id="guideline-pattern-social-template" className="scroll-mt-20">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <BrandSectionHeading icon={Share2} title={t('Social template application')} anchorId="pattern-social-template" className="mb-0" />
            {activeAnchor === 'pattern-social-template' ? <BrandMetaPill tone="system">{t('You are here')}</BrandMetaPill> : null}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <BrandDocCard>
              <BrandMetaPill tone="reference" className="mb-3">{t('Before')}</BrandMetaPill>
              <p className="text-[13px] text-brand-text-secondary leading-relaxed">
                {t('Each platform drifts visually with inconsistent color treatment, shifting logo position, and no shared headline system. The brand feels fragmented even when the content is strong.')}
              </p>
            </BrandDocCard>
            <BrandDocCard>
              <BrandMetaPill tone="reference" className="mb-3">{t('After')}</BrandMetaPill>
              <p className="text-[13px] text-brand-text leading-relaxed">
                {t('A unified post structure uses one top treatment, one accent zone, and one logo placement model. The result feels recognizably MediaBubble across LinkedIn, Instagram, and X.')}
              </p>
            </BrandDocCard>
          </div>
        </section>

        <section id="guideline-pattern-social-checks" className="scroll-mt-20">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <BrandSectionHeading icon={Share2} title={t('Application checks')} anchorId="pattern-social-checks" className="mb-0" />
            {activeAnchor === 'pattern-social-checks' ? <BrandMetaPill tone="system">{t('You are here')}</BrandMetaPill> : null}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <BrandDocCard>
              <BrandMetaPill tone="canonical" className="mb-3">{t('Canonical rules applied')}</BrandMetaPill>
              <ul className="space-y-2 text-[12px] text-brand-text-secondary leading-relaxed">
                {rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#FFC107] shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </BrandDocCard>
            <BrandDocCard>
              <BrandMetaPill tone="system" className="mb-3">{t('Primary system cues')}</BrandMetaPill>
              <div className="flex flex-wrap gap-2">
                {['#1565C0', '#FFC107', '#2196F3', 'Poppins', 'Inter'].map((token) => (
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
