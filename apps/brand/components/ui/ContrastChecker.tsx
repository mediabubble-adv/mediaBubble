import React, { useState } from 'react'
import { Contrast } from 'lucide-react'
import { parseHex, contrastRatio } from './utils'
import { BrandSectionHeading } from './brand-doc'
import { useI18n } from '@/lib/i18n/provider'

/**
 * Self-contained WCAG contrast checker. Owns its own fg/bg input state so that
 * typing here never re-renders the color-family cards or neutral scale above it.
 */
export function ContrastChecker() {
  const { t } = useI18n()
  const [fgInput, setFgInput] = useState('#333333')
  const [bgInput, setBgInput] = useState('#FFFFFF')

  const validFg = parseHex(fgInput)
  const validBg = parseHex(bgInput)
  const ratio = validFg && validBg ? contrastRatio(validFg, validBg) : null

  return (
    <section className="mb-16">
      <BrandSectionHeading
        icon={Contrast}
        title={
          <span className="flex items-center gap-2">
            {t('colors.contrastChecker')}
            <span className="text-[10px] font-mono font-normal text-brand-muted-steel">{t('colors.wcagBadge')}</span>
          </span>
        }
      />

      <div className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: t('colors.foreground'), value: fgInput, set: setFgInput, valid: validFg, fallback: '#333333' },
            { label: t('colors.background'), value: bgInput, set: setBgInput, valid: validBg, fallback: '#FFFFFF' },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-text-muted mb-2">{field.label}</label>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg shrink-0 ring-1 ring-inset ring-black/[0.08] dark:ring-white/[0.12]" style={{ backgroundColor: field.valid || field.fallback }} />
                <input
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  placeholder={field.fallback}
                  className="flex-1 px-3 py-2 text-[13px] font-mono rounded-lg border border-brand-input-border bg-brand-canvas dark:bg-brand-surface text-brand-text outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-5 sm:p-6 mb-6 min-h-[60px] ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.06] transition-colors duration-150" style={{ backgroundColor: validBg || '#FFFFFF' }}>
          <p className="text-base sm:text-lg font-semibold leading-relaxed" style={{ color: validFg || '#333333' }}>
            {t('colors.pangram')}
          </p>
        </div>

        {ratio ? (
          <div className="space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] font-medium text-brand-text-secondary">{t('colors.contrastRatio')}</span>
              <span key={`ratio-${ratio.toFixed(2)}`} className={`text-3xl font-bold font-mono animate-scale-in ${ratio >= 4.5 ? 'text-brand-success' : ratio >= 3 ? 'text-brand-yellow' : 'text-brand-error'}`}>
                {ratio.toFixed(2)}:1
              </span>
            </div>
            <div key={`badges-${ratio.toFixed(2)}`} className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-scale-in">
              {[
                { label: t('colors.aaNormal'), key: 'AA Normal (≥ 4.5:1)', pass: ratio >= 4.5, threshold: '4.5:1' },
                { label: t('colors.aaLarge'), key: 'AA Large (≥ 3:1)', pass: ratio >= 3, threshold: '3:1' },
                { label: t('colors.aaaNormal'), key: 'AAA Normal (≥ 7:1)', pass: ratio >= 7, threshold: '7:1' },
                { label: t('colors.aaaLarge'), key: 'AAA Large (≥ 4.5:1)', pass: ratio >= 4.5, threshold: '4.5:1' },
              ].map((check) => (
                <div key={check.key} className={`rounded-lg px-4 py-3 text-center transition-all ${check.pass ? 'bg-brand-success-bg dark:bg-brand-success/15 ring-1 ring-brand-success/30' : 'bg-brand-error-bg dark:bg-brand-error/15 ring-1 ring-brand-error/30'}`}>
                  <p className={`text-[13px] font-semibold ${check.pass ? 'text-brand-success' : 'text-brand-error'}`}>{check.pass ? t('colors.pass') : t('colors.fail')}</p>
                  <p className="text-[11px] text-brand-text-secondary mt-0.5">{check.label}</p>
                  <p className="text-[10px] font-mono text-brand-muted-steel mt-px">{check.threshold}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-brand-muted-steel mt-3 text-center leading-relaxed">{t('colors.wcagDefinition', 'AA = minimum compliance. AAA = enhanced compliance. Large text = 18px+ bold or 24px+ regular.')}</p>
          </div>
        ) : (
          <p className="text-[13px] text-brand-muted-steel text-center py-4">{t('colors.emptyState', 'Enter a foreground and background hex color (e.g. #333333 on #FFFFFF) to check WCAG contrast.')}</p>
        )}

        <p className="text-[11px] text-brand-muted-steel mt-4 text-center leading-relaxed">
          {t('colors.wcagDescription')}
        </p>
      </div>
    </section>
  )
}
