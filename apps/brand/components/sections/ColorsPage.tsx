import React, { useState } from 'react'
import { Copy, Check, Palette } from 'lucide-react'
import { colorFamilies, neutralScale } from '../constants'
import { MasterSwatch } from '@mediabubble/design-system'
import { ColorFamilyCard } from '../ui/ColorFamilyCard'
import { parseHex, contrastRatio } from '../ui/utils'
import { PageHero } from './PageHero'
import { useI18n } from '@/lib/i18n/provider'

export function ColorsPage({ onCopy, copiedId }: {
  onCopy: (text: string, id: string) => void; copiedId: string | null
}) {
  const [selectedColor, setSelectedColor] = useState('#2196F3')
  const [fgInput, setFgInput] = useState('#333333')
  const [bgInput, setBgInput] = useState('#FFFFFF')
  const { t } = useI18n()

  const validFg = parseHex(fgInput)
  const validBg = parseHex(bgInput)
  const ratio = validFg && validBg ? contrastRatio(validFg, validBg) : null

  return (
    <div>
      <PageHero icon={Palette} kicker={t('colors.hero.kicker')} title={t('colors.hero.title')} titleHighlight={t('colors.hero.title')} description={t('colors.hero.description')} />

      <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px] mx-auto">
        <section className="mb-10 rounded-xl border border-brand-whisper-border dark:border-brand-light-border bg-brand-surface p-5 sm:p-6">
          <h2 className="text-[13px] font-semibold text-brand-dark-blue dark:text-brand-blue mb-2">
            {t('colors.theme.title', 'Light & dark mode (marketing sites)')}
          </h2>
          <p className="text-sm text-brand-text-secondary leading-relaxed mb-4">
            {t(
              'colors.theme.body',
              'Egypt (web-eg), UAE (web-ae), and this brand guide share the same theme system: class-based dark mode on html, preference stored as mediabubble-theme, and semantic surface tokens that swap in .dark.',
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] font-mono">
            {[
              { token: '--brand-canvas', light: '#FAFAFA', dark: '#0b1220' },
              { token: '--brand-surface', light: '#FFFFFF', dark: '#111827' },
              { token: '--brand-text', light: '#333333', dark: '#e5e7eb' },
              { token: '--brand-whisper-border', light: '#E8E8E8', dark: 'white/8%' },
            ].map((row) => (
              <div
                key={row.token}
                className="rounded-lg border border-brand-light-border dark:border-brand-whisper-border px-3 py-2.5 bg-brand-canvas"
              >
                <p className="text-brand-text font-semibold">{row.token}</p>
                <p className="text-brand-text-muted mt-1">
                  light {row.light} · dark {row.dark}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-brand-text-muted mt-4">
            {t(
              'colors.theme.toggle',
              'Use the header sun/moon control to preview the same resolved theme as the live marketing sites. Fixed brand hues (navy, yellow, logo blue) stay constant across modes.',
            )}
          </p>
          <p className="text-[11px] text-brand-text-muted mt-2 leading-relaxed">
            {t(
              'colors.theme.components',
              'Component previews on the Components page and marketing kickers/headings use the same semantic tokens (bg-brand-surface, text-brand-text, getButtonClasses) — they follow whichever theme is active.',
            )}
          </p>
        </section>

        <MasterSwatch selectedColor={selectedColor} onCopy={onCopy} copiedId={copiedId} onColorSelect={setSelectedColor} />

      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('colors.colorFamilies')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 stagger-grid">
          {colorFamilies.map((family) => (
            <ColorFamilyCard key={family.name} family={family} onCopy={onCopy} copiedId={copiedId} onColorSelect={setSelectedColor} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('colors.neutralScale')}</h2>
        </div>
        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border overflow-hidden divide-y divide-brand-whisper-border">
          {neutralScale.map((color, i) => (
            <div
              key={color.name}
              className="group flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-all duration-150 hover:bg-black/[0.02] hover:ps-6 active:bg-black/[0.04]"
              onClick={() => { onCopy(color.hex, `neutral-${i}`); setSelectedColor(color.hex) }}
            >
              <div
                className="w-11 h-11 rounded-xl shrink-0 ring-1 ring-inset ring-black/[0.06] transition-all group-hover:scale-105 group-hover:ring-2 group-hover:ring-[#2196F3]/30"
                style={{ backgroundColor: color.hex }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-brand-text">{color.name}</p>
                <p className="text-sm text-brand-text-secondary">{color.note}</p>
              </div>
              <code className="text-[12px] font-mono text-brand-text-muted shrink-0 hidden sm:block">{color.hex}</code>
              {copiedId === `neutral-${i}` ? (
                <Check size={14} className="text-green-600 shrink-0 animate-pulse-once" />
              ) : (
                <div className="flex items-center gap-1.5 text-brand-muted-steel group-hover:text-brand-text-muted transition-colors">
                  <Copy size={14} className="shrink-0" />
                  <span className="text-[10px] font-medium hidden sm:inline">{t('colors.copy')}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* WCAG Contrast Checker */}
      <section className="mb-16">
        <div className="bg-brand-info-bg dark:bg-brand-navy/30 rounded-lg px-4 py-2.5 mb-5">
          <h2 className="text-[13px] font-semibold text-brand-dark-blue">{t('colors.contrastChecker')}</h2>
          <span className="text-[10px] font-mono text-brand-muted-steel">{t('colors.wcagBadge')}</span>
        </div>

        <div className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-text-muted mb-2">{t('colors.foreground')}</label>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg shrink-0 ring-1 ring-inset ring-black/[0.08]" style={{ backgroundColor: validFg || '#333333' }} />
                <input value={fgInput} onChange={e => setFgInput(e.target.value)} placeholder="#333333" className="flex-1 px-3 py-2 text-[13px] font-mono rounded-lg border border-brand-input-border bg-brand-surface text-brand-text outline-none focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3]/20 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-text-muted mb-2">{t('colors.background')}</label>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg shrink-0 ring-1 ring-inset ring-black/[0.08]" style={{ backgroundColor: validBg || '#FFFFFF' }} />
                <input value={bgInput} onChange={e => setBgInput(e.target.value)} placeholder="#FFFFFF" className="flex-1 px-3 py-2 text-[13px] font-mono rounded-lg border border-brand-input-border bg-brand-surface text-brand-text outline-none focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3]/20 transition-all" />
              </div>
            </div>
          </div>

          <div className="rounded-xl p-5 sm:p-6 mb-6 min-h-[60px] transition-colors duration-150" style={{ backgroundColor: validBg || '#FFFFFF' }}>
            <p className="text-base sm:text-lg font-semibold leading-relaxed" style={{ color: validFg || '#333333' }}>
              {t('colors.pangram')}
            </p>
          </div>

          {ratio ? (
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-medium text-brand-text-secondary">{t('colors.contrastRatio')}</span>
                <span key={`ratio-${ratio.toFixed(2)}`} className={`text-2xl font-bold font-mono animate-scale-in ${ratio >= 4.5 ? 'text-green-600' : ratio >= 3 ? 'text-[#FFC107]' : 'text-[#DC2626]'}`}>
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
                  <div key={check.key} className={`rounded-lg px-4 py-3 text-center transition-all ${check.pass ? 'bg-green-50 ring-1 ring-green-200' : 'bg-red-50 ring-1 ring-red-200'}`}>
                    <p className={`text-[13px] font-semibold ${check.pass ? 'text-green-700' : 'text-red-700'}`}>{check.pass ? t('colors.pass') : t('colors.fail')}</p>
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
      </div>
    </div>
  )
}
