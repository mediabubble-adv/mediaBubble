import React from 'react'
import { Copy, Check, Palette, SunMoon, Layers } from 'lucide-react'
import { colorFamilies, neutralScale } from '../constants'
import { ColorFamilyCard } from '../ui/ColorFamilyCard'
import { ContrastChecker } from '../ui/ContrastChecker'
import { PageHero } from './PageHero'
import { BrandPageContent, BrandSectionHeading } from '../ui/brand-doc'
import { useI18n } from '@/lib/i18n/provider'

const themeTokens = [
  { token: '--brand-canvas', light: '#FAFAFA', dark: '#0b1220' },
  { token: '--brand-surface', light: '#FFFFFF', dark: '#111827' },
  { token: '--brand-text', light: '#333333', dark: '#e5e7eb' },
  { token: '--brand-whisper-border', light: '#E8E8E8', dark: 'white/8%' },
]

function TokenSwatch({ value }: { value: string }) {
  const isHex = /^#[0-9a-fA-F]{3,8}$/.test(value)
  return (
    <span
      className="w-5 h-5 rounded-md shrink-0 ring-1 ring-inset ring-black/[0.08] dark:ring-white/[0.12] shadow-sm relative overflow-hidden"
      style={isHex ? { backgroundColor: value } : { backgroundImage: 'linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))' }}
    >
      <span className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/10 pointer-events-none" />
    </span>
  )
}

export function ColorsPage({ onCopy, copiedId }: {
  onCopy: (text: string, id: string) => void; copiedId: string | null
}) {
  const { t } = useI18n()

  return (
    <div>
      <PageHero icon={Palette} kicker={t('colors.hero.kicker')} title={t('colors.hero.title')} titleHighlight={t('colors.hero.title')} description={t('colors.hero.description')} />

      <BrandPageContent>
        {/* Color families — the core palette, surfaced first */}
        <section className="mb-14">
          <BrandSectionHeading icon={Palette} title={t('colors.colorFamilies')} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 stagger-grid">
            {colorFamilies.map((family) => (
              <ColorFamilyCard key={family.name} family={family} onCopy={onCopy} copiedId={copiedId} />
            ))}
          </div>
        </section>

        {/* Neutral scale */}
        <section className="mb-14">
          <BrandSectionHeading icon={Layers} title={t('colors.neutralScale')} />
          <div className="bg-brand-surface rounded-xl border border-brand-whisper-border dark:border-brand-light-border/40 overflow-hidden divide-y divide-brand-whisper-border dark:divide-brand-light-border/20 shadow-sm">
            {neutralScale.map((color, i) => (
              <button
                type="button"
                key={color.name}
                className="group flex w-full items-center gap-4 px-4 sm:px-5 py-3.5 text-start cursor-pointer transition-all duration-150 hover:bg-black/[0.02] dark:hover:bg-white/[0.04] active:scale-[0.99]"
                onClick={() => onCopy(color.hex, `neutral-${i}`)}
              >
                <div
                  className="w-10 h-10 rounded-lg shrink-0 ring-1 ring-inset ring-black/[0.08] dark:ring-white/[0.12] shadow-sm relative overflow-hidden transition-transform duration-200 group-hover:scale-[1.06]"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/5 pointer-events-none" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-brand-text">{color.name}</p>
                  <p className="text-[12px] text-brand-text-secondary truncate mt-0.5">{color.note}</p>
                </div>
                <code className="text-[11px] font-mono text-brand-text-muted shrink-0 hidden sm:block bg-brand-canvas dark:bg-white/[0.02] border border-brand-whisper-border dark:border-brand-light-border/20 px-1.5 py-0.5 rounded">{color.hex}</code>
                <span className="shrink-0 w-5 flex justify-center">
                  {copiedId === `neutral-${i}` ? (
                    <Check size={14} className="text-brand-success animate-pulse-once" />
                  ) : (
                    <Copy size={13} className="text-brand-muted-steel opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Theme system */}
        <section className="mb-14">
          <BrandSectionHeading icon={SunMoon} title={t('colors.theme.title', 'Light & dark mode (marketing sites)')} />
          <p className="text-sm text-brand-text-secondary leading-relaxed max-w-[68ch] mb-5 text-wrap pretty">
            {t(
              'colors.theme.body',
              'Egypt (web-eg), UAE (web-ae), and this brand guide share the same theme system: class-based dark mode on html, preference stored as mediabubble-theme, and semantic surface tokens that swap in .dark.',
            )}
          </p>

          <div className="rounded-xl border border-brand-whisper-border dark:border-brand-light-border/40 bg-brand-surface overflow-hidden divide-y divide-brand-whisper-border dark:divide-brand-light-border/20 shadow-sm">
            {themeTokens.map((row) => (
              <div key={row.token} className="flex items-center gap-4 px-4 sm:px-5 py-3.5">
                <div className="flex items-center gap-1.5 shrink-0">
                  <TokenSwatch value={row.light} />
                  <TokenSwatch value={row.dark} />
                </div>
                <code className="text-[12px] font-mono font-medium text-brand-text flex-1 min-w-0 truncate">{row.token}</code>
                <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono text-brand-text-muted shrink-0">
                  <span className="bg-brand-canvas dark:bg-white/[0.02] border border-brand-whisper-border dark:border-brand-light-border/20 px-1.5 py-0.5 rounded">light {row.light}</span>
                  <span className="bg-brand-canvas dark:bg-white/[0.02] border border-brand-whisper-border dark:border-brand-light-border/20 px-1.5 py-0.5 rounded">dark {row.dark}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[12px] text-brand-text-muted mt-4 leading-relaxed max-w-[72ch] text-wrap pretty">
            {t(
              'colors.theme.toggle',
              'Use the header sun/moon control to preview the same resolved theme as the live marketing sites. Fixed brand hues (navy, yellow, logo blue) stay constant across modes.',
            )}
          </p>
        </section>

        {/* WCAG Contrast Checker — self-contained, isolated state */}
        <ContrastChecker />
      </BrandPageContent>
    </div>
  )
}

