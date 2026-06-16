import React from 'react'
import { Copy, Check } from 'lucide-react'
import { relativeLuminance } from './utils'

interface ColorFamily {
  name: string
  role: string
  hex: string
  tones: string[]
  usage: string
  cssVar: string
}

function readableOn(hex: string) {
  return relativeLuminance(hex) > 0.5 ? '#0D0F12' : '#FFFFFF'
}

export function ColorFamilyCard({
  family,
  onCopy,
  copiedId,
}: {
  family: ColorFamily
  onCopy: (text: string, id: string) => void
  copiedId: string | null
}) {
  const mainId = `family-${family.name}`
  const mainCopied = copiedId === mainId
  const mainText = readableOn(family.hex)

  const copyMain = () => onCopy(family.hex, mainId)

  return (
    <div className="group flex items-stretch rounded-xl border border-brand-whisper-border bg-brand-surface overflow-hidden hover:border-brand-blue/30 dark:hover:border-brand-blue/50 hover:bg-brand-surface/80 dark:hover:bg-brand-surface/40 transition-all duration-300 ease-out select-none">
      {/* Premium left-bleed physical swatch card */}
      <button
        type="button"
        onClick={copyMain}
        aria-label={`Copy ${family.name} ${family.hex}`}
        className="relative shrink-0 w-[110px] sm:w-[130px] self-stretch min-h-[220px] transition-all duration-350 hover:brightness-[0.97] active:scale-[0.98] overflow-hidden"
        style={{ backgroundColor: family.hex }}
      >
        {/* Subtle physical sheen overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/10 pointer-events-none" />
        
        {/* Swatch labels - clean mono tracking-widest */}
        <span
          className="absolute left-3.5 top-4 text-[9px] font-bold uppercase tracking-[0.2em] opacity-80"
          style={{ color: mainText }}
        >
          {family.name}
        </span>
        
        <span
          className="absolute left-3.5 bottom-4 font-mono text-[11px] sm:text-[12px] font-bold tracking-tight"
          style={{ color: mainText }}
        >
          {family.hex}
        </span>
        
        {/* Hover copy feedback badge */}
        <span
          className="absolute right-3 bottom-3 flex items-center justify-center w-6 h-6 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-250 scale-90 group-hover:scale-100 shadow-sm"
          style={{ 
            backgroundColor: mainText === '#FFFFFF' ? 'rgba(255,255,255,0.15)' : 'rgba(13,15,18,0.08)',
            border: `1px solid ${mainText === '#FFFFFF' ? 'rgba(255,255,255,0.25)' : 'rgba(13,15,18,0.12)'}`
          }}
        >
          {mainCopied ? (
            <Check size={11} style={{ color: mainText }} className="animate-pulse-once" />
          ) : (
            <Copy size={11} style={{ color: mainText }} />
          )}
        </span>
      </button>

      {/* Content Column */}
      <div className="flex-1 min-w-0 flex flex-col p-5 sm:p-6 justify-between gap-4">
        {/* Swatch Header Info */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-[15px] sm:text-base font-bold text-brand-text leading-none">
              {family.name}
            </h3>
            <p className="text-[12px] font-medium text-brand-text-secondary leading-snug mt-1.5 pe-1">
              {family.role}
            </p>
          </div>
          
          <button
            type="button"
            onClick={copyMain}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono shrink-0 transition-all active:scale-95 border ${
              mainCopied
                ? 'text-brand-success bg-brand-success-bg dark:bg-brand-success/15 border-brand-whisper-border'
                : 'text-brand-text-muted hover:text-brand-text hover:bg-black/[0.04] dark:hover:bg-white/[0.06] border-transparent'
            }`}
          >
            {mainCopied ? <Check size={10} className="animate-pulse-once" /> : <Copy size={10} />}
            {family.hex}
          </button>
        </div>

        {/* Tone scale ribbon - interactive horizontal strip */}
        <div className="flex h-10 rounded-lg overflow-hidden border border-brand-whisper-border/50 divide-x divide-black/[0.06] dark:divide-white/[0.08] shadow-inner select-none mt-2 relative z-10">
          {family.tones.map((tone, i) => {
            const toneId = `tone-${family.hex}-${i}`
            const isMain = tone.toLowerCase() === family.hex.toLowerCase()
            const copied = copiedId === toneId
            const textCol = readableOn(tone)
            const toneName = `Tone ${i * 100 || 50}`

            return (
              <button
                type="button"
                key={i}
                aria-label={`Copy ${family.name} ${toneName} (${tone})`}
                onClick={() => onCopy(tone, toneId)}
                className={`group/tone relative flex-1 h-full transition-all duration-350 hover:grow-[1.8] active:scale-95 focus:outline-none focus:z-20 ${
                  isMain ? 'ring-1 ring-inset ring-brand-text/30 dark:ring-white/30 z-10' : ''
                }`}
                style={{ backgroundColor: tone }}
              >
                {/* CSS Tooltip */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1.5 bg-brand-charcoal dark:bg-brand-surface text-[10px] font-mono text-white dark:text-brand-text rounded-md border border-brand-whisper-border opacity-0 pointer-events-none group-hover/tone:opacity-100 transition-all duration-200 whitespace-nowrap z-30 shadow-md transform translate-y-1 group-hover/tone:translate-y-0">
                  <span className="font-semibold block text-[9px] uppercase tracking-wider text-brand-blue dark:text-brand-dark-blue mb-0.5">{toneName}</span>
                  <span className="font-bold">{tone}</span>
                </span>

                {/* Copied indication inside segment */}
                {copied && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-all duration-150">
                    <Check size={11} style={{ color: textCol }} className="animate-pulse-once" />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Footer info: Usage description + CSS custom property variable copy tag */}
        <div className="pt-3.5 border-t border-brand-whisper-border/60 mt-2 flex flex-col gap-3">
          <p className="text-[12px] text-brand-text-secondary leading-relaxed text-wrap pretty">
            {family.usage}
          </p>
          <div className="flex items-center justify-between gap-2 bg-brand-canvas dark:bg-white/[0.02] border border-brand-whisper-border px-2.5 py-1.5 rounded-lg">
            <code className="text-[10px] font-mono text-brand-text-muted select-all">
              {family.cssVar}
            </code>
            <button
              type="button"
              onClick={() => onCopy(family.cssVar, `${mainId}-var`)}
              className="text-brand-text-muted hover:text-brand-text shrink-0 p-0.5 rounded transition-colors active:scale-90"
              aria-label={`Copy CSS variable name ${family.cssVar}`}
            >
              {copiedId === `${mainId}-var` ? (
                <Check size={11} className="text-brand-success animate-pulse-once" />
              ) : (
                <Copy size={11} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
