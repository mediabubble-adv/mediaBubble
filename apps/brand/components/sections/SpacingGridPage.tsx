import React from 'react'
import { PageHero } from './PageHero'
import { useI18n } from '@/lib/i18n/provider'
import { Grid3X3 } from 'lucide-react'
import { BrandBody, BrandInfoBand, BrandMetaPill } from '@/components/ui/brand-doc'

export function SpacingGridPage() {
  const { t } = useI18n()

  const spacingScale = [
    { token: '--space-xs', px: '4px', rem: '0.25rem', tailwind: 'p-1 / gap-1', use: t('Icon-to-label gap, inline tight spacing') },
    { token: '--space-sm', px: '8px', rem: '0.5rem', tailwind: 'p-2 / gap-2', use: t('Component internal padding, badge padding') },
    { token: '--space-md', px: '12px', rem: '0.75rem', tailwind: 'p-3 / gap-3', use: t('Card internal gaps, form field spacing') },
    { token: '--space-lg', px: '16px', rem: '1rem', tailwind: 'p-4 / gap-4', use: t('Standard card padding, input padding') },
    { token: '--space-xl', px: '24px', rem: '1.5rem', tailwind: 'p-6 / gap-6', use: t('Section internal padding, card-to-card gap') },
    { token: '--space-2xl', px: '32px', rem: '2rem', tailwind: 'p-8 / gap-8', use: t('Large component separation') },
    { token: '--space-3xl', px: '48px', rem: '3rem', tailwind: 'p-12', use: t('Section-to-section vertical rhythm') },
    { token: '--space-4xl', px: '64px', rem: '4rem', tailwind: 'p-16', use: t('Hero section padding, page-level spacing') },
    { token: '--space-5xl', px: '96px', rem: '6rem', tailwind: 'p-24', use: t('Top-level section gaps, max page breathing room') },
  ]

  const gridPatterns = [
    { name: t('Content grid'), cols: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', gap: 'gap-5', use: t('Feature cards, service areas, typography rules'), items: 3 },
    { name: t('Stat grid'), cols: 'grid-cols-2', gap: 'gap-px', use: t('Metrics, key values, compact data pairs'), items: 4 },
    { name: t('Side-by-side'), cols: 'grid-cols-1 sm:grid-cols-2', gap: 'gap-px', use: t("Do/don't pairs, before/after, comparisons"), items: 2 },
    { name: t('Auto-fit'), cols: '', gap: 'gap-4', use: t('Auto-reflows cards into as many columns as fit the viewport. Best for card galleries with equal-width items.'), items: 4, autoFit: true },
  ]

  const containerRules = [
    { rule: t('Max width'), value: '1400px', note: t('Content never exceeds this at any viewport') },
    { rule: t('Page padding'), value: 'px-6 lg:px-10', note: t('Content breathing room from viewport edges') },
    { rule: t('Sidebar width'), value: '220px', note: t('Fixed left nav; collapses on mobile') },
    { rule: t('Topbar height'), value: '46px', note: t('Fixed; contains breadcrumb and menu trigger') },
    { rule: t('Column gutter'), value: 'gap-4 / gap-5', note: t('Between most card-level components') },
    { rule: t('Section gap'), value: 'mb-12 / mb-16', note: t('Between major page sections') },
  ]

  return (
    <div>
      <PageHero icon={Grid3X3} kicker={t('Layout System')} title={t('Spacing & Grid')} titleHighlight={t('Spacing')} description={t("Use these tokens for every gap, padding, and margin. Do not add arbitrary spacing values.")} />

      <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto">
      <BrandInfoBand className="flex flex-wrap items-start gap-3">
        <BrandMetaPill tone="canonical">{t('Canonical pattern rules')}</BrandMetaPill>
        <BrandBody className="max-w-3xl text-[13px]">
          {t('Everything on this page is normative. Use these spacing and layout rules before composing any new pattern or marketing screen.')}
        </BrandBody>
      </BrandInfoBand>

      <section className="mb-10">
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Spacing Scale')}</h2>
            <BrandMetaPill tone="canonical">{t('Canonical')}</BrandMetaPill>
          </div>
        </div>
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden">
          {spacingScale.map((step, i) => (
            <div
              key={step.token}
              className={`flex items-center gap-4 px-5 py-3 transition-all hover:bg-black/[0.015] dark:hover:bg-white/[0.02] ${i < spacingScale.length - 1 ? 'border-b border-brand-whisper-border' : ''}`}
            >
              <div className="w-28 shrink-0 flex items-center">
                <div className="flex items-center gap-0.5 w-full">
                  {Array.from({ length: Math.min(Math.ceil(parseInt(step.px) / 8), 12) }).map((_, idx) => {
                    const ratio = idx / 11
                    const r = Math.round(33 + ratio * (21 - 33))
                    const g = Math.round(150 + ratio * (101 - 150))
                    const b = Math.round(243 + ratio * (192 - 243))
                    return <div key={idx} className="h-4 w-[7px] rounded-sm transition-all" style={{ backgroundColor: `rgb(${r},${g},${b})` }} />
                  })}
                </div>
              </div>
              <div className="w-24 shrink-0">
                <p className="text-[12px] font-semibold text-brand-text">{step.px}</p>
                <p className="text-[10px] font-mono text-brand-text-muted">{step.rem}</p>
              </div>
              <code className="text-[11px] font-mono text-[#2196F3] w-28 shrink-0 hidden sm:block">{step.token}</code>
              <div className="flex-1 min-w-0 hidden md:block">
                <p className="text-[12px] text-brand-text-secondary leading-snug">{step.use}</p>
              </div>
              <code className="text-[10px] font-mono text-brand-text-muted shrink-0 hidden lg:block">{step.tailwind}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Grid Patterns')}</h2>
          <BrandMetaPill tone="canonical">{t('Canonical')}</BrandMetaPill>
        </div>
        <div className="space-y-4">
          {gridPatterns.map((pattern, pi) => {
            const palette = [
              { cell: 'bg-[#2196F3]/10 dark:bg-[#2196F3]/20 border border-brand-whisper-border', gapCell: 'bg-brand-canvas dark:bg-[#1C1E24]', topBar: 'bg-[#2196F3]' },
              { cell: 'bg-[#FFC107]/10 dark:bg-[#FFC107]/20 border border-brand-whisper-border', gapCell: 'bg-brand-canvas', topBar: 'bg-[#FFC107]' },
              { cell: 'bg-[#1AD191]/10 dark:bg-[#1AD191]/20 border border-brand-whisper-border', gapCell: 'bg-brand-canvas', topBar: 'bg-[#1AD191]' },
              { cell: 'bg-[#1565C0]/10 dark:bg-[#1565C0]/20 border border-brand-whisper-border', gapCell: 'bg-brand-canvas', topBar: 'bg-[#1565C0]' },
            ]
            const p = palette[pi % palette.length]
            return (
            <div key={pattern.name} className="bg-brand-surface rounded-xl border border-brand-whisper-border overflow-hidden transition-all duration-150 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
              <div className={`h-1 ${p.topBar}`} />
              <div className="flex items-start justify-between px-5 py-3.5 border-b border-brand-whisper-border">
                <div>
                  <p className="text-[13px] font-semibold text-brand-text">{pattern.name}</p>
                  <p className="text-[12px] text-brand-text-muted mt-0.5">{pattern.use}</p>
                </div>
                <code className="text-[10px] font-mono text-brand-text-muted text-end shrink-0 ms-4 leading-relaxed">
                  {pattern.autoFit ? 'repeat(auto-fit,\nminmax(280px, 1fr))' : `${pattern.cols}\n${pattern.gap}`}
                </code>
              </div>
              <div className="p-5">
                {pattern.autoFit ? (
                  <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
                    {Array.from({ length: pattern.items }).map((_, i) => (
                      <div key={i} className={`h-10 rounded-lg ${p.cell}`} />
                    ))}
                  </div>
                ) : (
                  <div className={`grid ${pattern.cols} ${pattern.gap} ${pattern.gap === 'gap-px' ? 'bg-brand-whisper-border rounded-lg overflow-hidden' : ''}`}>
                    {Array.from({ length: pattern.items }).map((_, i) => (
                      <div key={i} className={`h-10 rounded-lg ${pattern.gap === 'gap-px' ? `${p.gapCell} rounded-none` : p.cell}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>
            )})}
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('Layout Dimensions')}</h2>
            <BrandMetaPill tone="system">{t('System constraint')}</BrandMetaPill>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {containerRules.map((r) => (
            <div key={r.rule} className="bg-brand-canvas dark:bg-white/[0.04] rounded-xl px-4 py-3.5 transition-all hover:bg-[#EEF1F6] dark:hover:bg-white/[0.08]">
              <p className="text-[13px] font-semibold text-brand-text">{r.rule}</p>
              <code className="text-[11px] font-mono text-brand-text font-semibold">{r.value}</code>
              <p className="text-[11px] text-brand-text-muted mt-1 leading-snug">{r.note}</p>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  )
}
