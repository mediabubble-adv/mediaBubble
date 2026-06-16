import React from 'react'
import { Copy, Check, Palette, SunMoon, Layers } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { colorFamilies, neutralScale } from '../constants'
import { ColorFamilyCard } from '../ui/ColorFamilyCard'
import { ContrastChecker } from '../ui/ContrastChecker'
import { PageHero } from './PageHero'
import { BrandPageContent, BrandSectionHeading } from '../ui/brand-doc'
import { useI18n } from '@/lib/i18n/provider'
import { relativeLuminance } from '../ui/utils'

const themeTokens = [
  { token: '--brand-canvas', light: '#FAFAFA', dark: '#0D0F12' },
  { token: '--brand-surface', light: '#FFFFFF', dark: '#121418' },
  { token: '--brand-text', light: '#333333', dark: '#e5e7eb' },
  { token: '--brand-whisper-border', light: '#E8E8E8', dark: '#1F2128' },
]

function readableOn(hex: string) {
  return relativeLuminance(hex) > 0.5 ? '#0D0F12' : '#FFFFFF'
}

function SectionDivider() {
  return <div className="border-t border-brand-whisper-border my-16 lg:my-20" />
}

function SectionHeader({
  icon,
  title,
  specLabel,
}: {
  icon: LucideIcon
  title: string
  specLabel: string
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
      <BrandSectionHeading icon={icon} title={title} className="mb-0" />
      <span className="text-[10px] font-mono text-brand-text-muted bg-brand-canvas dark:bg-white/5 border border-brand-whisper-border px-3 py-1.5 rounded-md self-start sm:self-auto shrink-0">
        {specLabel}
      </span>
    </div>
  )
}

export function ColorsPage({
  onCopy,
  copiedId,
}: {
  onCopy: (text: string, id: string) => void
  copiedId: string | null
}) {
  const { t } = useI18n()

  return (
    <div>
      <PageHero
        icon={Palette}
        kicker={t('colors.hero.kicker')}
        title={t('colors.hero.title')}
        titleHighlight={t('colors.hero.title')}
        description={t('colors.hero.description')}
      />

      <BrandPageContent>
        {/* SECTION 1: Color Families */}
        <section>
          <SectionHeader
            icon={Palette}
            title={t('colors.colorFamilies')}
            specLabel={t('colors.familiesSpec', '5 core keys')}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-grid">
            {colorFamilies.map((family) => (
              <ColorFamilyCard key={family.name} family={family} onCopy={onCopy} copiedId={copiedId} />
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* SECTION 2: Neutral Scale */}
        <section>
          <SectionHeader
            icon={Layers}
            title={t('colors.neutralScale')}
            specLabel={t('colors.neutralsSpec', 'Obsidian neutrals')}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 stagger-grid">
            {neutralScale.map((color, i) => {
              const swatchId = `neutral-${i}`
              const isCopied = copiedId === swatchId
              const textCol = readableOn(color.hex)
              return (
                <div
                  key={color.name}
                  className="group flex flex-col rounded-xl overflow-hidden border border-brand-whisper-border bg-brand-surface shadow-sm hover:border-brand-blue/30 dark:hover:border-brand-blue/50 transition-all duration-300 select-none"
                >
                  {/* Swatch Color Block */}
                  <button
                    type="button"
                    onClick={() => onCopy(color.hex, swatchId)}
                    aria-label={`Copy neutral ${color.name} ${color.hex}`}
                    className="relative w-full h-24 sm:h-28 transition-transform active:scale-[0.98] overflow-hidden"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/5 pointer-events-none" />
                    
                    {/* Copy hover overlay badge */}
                    <span className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider shadow-sm uppercase"
                        style={{
                          backgroundColor: textCol === '#FFFFFF' ? 'rgba(255,255,255,0.25)' : 'rgba(13,15,18,0.1)',
                          color: textCol,
                          border: `1px solid ${textCol === '#FFFFFF' ? 'rgba(255,255,255,0.3)' : 'rgba(13,15,18,0.15)'}`
                        }}
                      >
                        {isCopied ? (
                          <>
                            <Check size={9} className="animate-pulse-once" />
                            {t('colors.copied', 'Copied')}
                          </>
                        ) : (
                          <>
                            <Copy size={9} />
                            {t('colors.copy', 'Copy')}
                          </>
                        )}
                      </span>
                    </span>
                    
                    {isCopied && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/5">
                        <Check size={14} style={{ color: textCol }} className="animate-pulse-once" />
                      </span>
                    )}
                  </button>

                  {/* Swatch Label Metadata */}
                  <div className="p-3.5 bg-brand-surface flex-1 flex flex-col justify-between min-h-[80px] text-start border-t border-brand-whisper-border/60">
                    <div>
                      <p className="text-[11.5px] font-bold text-brand-text leading-tight truncate">
                        {color.name}
                      </p>
                      <p className="text-[10px] text-brand-text-secondary leading-snug mt-1 truncate">
                        {color.note}
                      </p>
                    </div>
                    <code className="text-[9.5px] font-mono font-bold text-brand-text-muted mt-2 select-all bg-brand-canvas dark:bg-white/[0.02] border border-brand-whisper-border/60 px-1.5 py-0.5 rounded w-max">
                      {color.hex}
                    </code>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <SectionDivider />

        {/* SECTION 3: Theme System */}
        <section>
          <SectionHeader
            icon={SunMoon}
            title={t('colors.theme.title', 'Light & dark mode (marketing sites)')}
            specLabel={t('colors.themeSpec', 'Semantic map')}
          />
          <p className="text-sm text-brand-text-secondary leading-relaxed max-w-[68ch] mb-8 text-wrap pretty">
            {t(
              'colors.theme.body',
              'Egypt (web-eg), UAE (web-ae), and this brand guide share the same theme system: class-based dark mode on html, preference stored as mediabubble-theme, and semantic surface tokens that swap in .dark.',
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-grid">
            {themeTokens.map((row) => {
              const tokenId = `theme-${row.token}`
              const isCopied = copiedId === tokenId
              return (
                <div
                  key={row.token}
                  className="group flex flex-col justify-between rounded-xl border border-brand-whisper-border bg-brand-surface p-5 hover:border-brand-blue/30 dark:hover:border-brand-blue/50 transition-all duration-300 select-none shadow-sm"
                >
                  {/* Header with CSS Token Name */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <code className="text-[11px] font-mono font-bold text-brand-text truncate select-all">
                      {row.token}
                    </code>
                    <button
                      type="button"
                      onClick={() => onCopy(row.token, tokenId)}
                      className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 transition-colors border ${
                        isCopied
                          ? 'text-brand-success bg-brand-success-bg dark:bg-brand-success/15 border-brand-success/20'
                          : 'text-brand-text-muted hover:text-brand-text hover:bg-black/[0.04] dark:hover:bg-white/[0.06] border-transparent'
                      }`}
                      aria-label={`Copy token name ${row.token}`}
                    >
                      {isCopied ? <Check size={10} className="animate-pulse-once" /> : <Copy size={10} />}
                    </button>
                  </div>

                  {/* Live Theme Previews */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Light Mode Spec */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-brand-text-muted">
                        Light Mode
                      </span>
                      <div
                        className="h-14 rounded-lg border border-brand-whisper-border flex flex-col justify-center px-3.5 gap-1.5 relative overflow-hidden shadow-inner bg-[#FAFAFA]"
                        style={{
                          backgroundColor: row.token === '--brand-canvas' ? row.light : (row.token === '--brand-surface' ? row.light : '#FAFAFA'),
                          color: row.token === '--brand-text' ? row.light : '#333333',
                          borderColor: row.token === '--brand-whisper-border' ? row.light : undefined,
                        }}
                      >
                        <span className="text-[11px] font-bold leading-none truncate">
                          {row.token === '--brand-text' ? 'Text Color' : 'Surface'}
                        </span>
                        <span className="text-[9.5px] font-mono text-brand-text-muted leading-none font-bold">
                          {row.light}
                        </span>
                      </div>
                    </div>

                    {/* Dark Mode Spec */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-brand-text-muted">
                        Dark Mode
                      </span>
                      <div
                        className="h-14 rounded-lg border border-brand-whisper-border flex flex-col justify-center px-3.5 gap-1.5 relative overflow-hidden shadow-inner bg-[#0D0F12]"
                        style={{
                          backgroundColor: row.token === '--brand-canvas' ? row.dark : (row.token === '--brand-surface' ? row.dark : '#0D0F12'),
                          color: row.token === '--brand-text' ? row.dark : '#e5e7eb',
                          borderColor: row.token === '--brand-whisper-border' ? row.dark : undefined,
                        }}
                      >
                        <span className="text-[11px] font-bold leading-none truncate" style={{ color: row.token === '--brand-text' ? row.dark : '#e5e7eb' }}>
                          {row.token === '--brand-text' ? 'Text Color' : 'Surface'}
                        </span>
                        <span className="text-[9.5px] font-mono text-brand-text-muted leading-none font-bold" style={{ color: row.token === '--brand-text' ? row.dark : '#9E9E9E' }}>
                          {row.dark}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-[12px] text-brand-text-muted mt-6 leading-relaxed max-w-[72ch] text-wrap pretty">
            {t(
              'colors.theme.toggle',
              'Use the header sun/moon control to preview the same resolved theme as the live marketing sites. Fixed brand hues (navy, yellow, logo blue) stay constant across modes.',
            )}
          </p>
        </section>

        <SectionDivider />

        {/* SECTION 4: Contrast Checker */}
        <ContrastChecker />
      </BrandPageContent>
    </div>
  )
}
