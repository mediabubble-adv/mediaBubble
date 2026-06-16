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

export function ColorFamilyCard({ family, onCopy, copiedId }: {
  family: ColorFamily; onCopy: (text: string, id: string) => void; copiedId: string | null
}) {
  const mainId = `family-${family.name}`
  const mainCopied = copiedId === mainId
  const mainText = readableOn(family.hex)

  const copyMain = () => onCopy(family.hex, mainId)

  return (
    <div className="group flex items-stretch rounded-2xl border border-brand-whisper-border dark:border-brand-light-border/40 bg-brand-surface overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
      {/* Full-bleed main color panel */}
      <button
        type="button"
        onClick={copyMain}
        aria-label={`Copy ${family.name} ${family.hex}`}
        className="relative shrink-0 w-[100px] sm:w-[130px] self-stretch min-h-[200px] transition-all duration-300 group-hover:brightness-[0.98] active:scale-[0.98] overflow-hidden"
        style={{ backgroundColor: family.hex }}
      >
        {/* Subtle sheen highlight for physical swatch feel */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/10 pointer-events-none" />
        
        <span
          className="absolute left-3 top-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] opacity-80"
          style={{ color: mainText }}
        >
          {family.name}
        </span>
        <span
          className="absolute left-3 bottom-3 font-mono text-[11px] sm:text-[12px] font-semibold tracking-tight"
          style={{ color: mainText }}
        >
          {family.hex}
        </span>
        <span
          className="absolute right-2 bottom-2 flex items-center justify-center w-6 h-6 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100"
          style={{ backgroundColor: mainText === '#FFFFFF' ? 'rgba(255,255,255,0.2)' : 'rgba(13,15,18,0.1)' }}
        >
          {mainCopied
            ? <Check size={12} style={{ color: mainText }} className="animate-pulse-once" />
            : <Copy size={11} style={{ color: mainText }} />}
        </span>
      </button>

      {/* Content column: tight header group, generous gap, tones, footer */}
      <div className="flex-1 min-w-0 flex flex-col p-4 sm:p-5">
        {/* Tight group: name + role + copy chip */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-[15px] sm:text-base font-bold text-brand-text leading-tight">{family.name}</h3>
            <p className="text-[12px] sm:text-[13px] font-medium text-brand-text-secondary leading-snug mt-1 pe-1">{family.role}</p>
          </div>
          <button
            type="button"
            onClick={() => onCopy(family.hex, mainId)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono shrink-0 transition-all active:scale-95 ${
              mainCopied 
                ? 'text-brand-success bg-brand-success-bg dark:bg-brand-success/15 border border-brand-success/20' 
                : 'text-brand-text-muted hover:text-brand-text hover:bg-black/[0.04] dark:hover:bg-white/[0.06] border border-transparent'
            }`}
          >
            {mainCopied ? <Check size={10} className="animate-pulse-once" /> : <Copy size={10} />}
            {family.hex}
          </button>
        </div>

        {/* Generous separation before the tone scale — single 8-column row of swatches */}
        <div className="grid grid-cols-8 gap-1 mt-5">
          {family.tones.map((tone, i) => {
            const toneId = `tone-${family.hex}-${i}`
            const isMain = tone.toLowerCase() === family.hex.toLowerCase()
            const copied = copiedId === toneId
            const textCol = readableOn(tone)
            return (
              <button
                type="button"
                key={i}
                title={`${family.name} Tone ${i * 100 || 50}: ${tone}`}
                aria-label={`Copy tone ${tone}`}
                onClick={() => onCopy(tone, toneId)}
                className={`relative aspect-square rounded-md transition-all duration-200 hover:scale-125 hover:-translate-y-1 hover:z-20 active:scale-90 hover:shadow-md ${
                  isMain 
                    ? 'ring-2 ring-brand-text dark:ring-white z-10 shadow-sm' 
                    : 'ring-1 ring-inset ring-black/[0.06] dark:ring-white/[0.1]'
                }`}
                style={{ backgroundColor: tone }}
              >
                {copied && (
                  <span className="absolute inset-0 flex items-center justify-center rounded-md bg-black/15 transition-all duration-150">
                    <Check size={10} style={{ color: textCol }} className="animate-pulse-once" />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Footer group: supporting detail, pushed to the base for even cards */}
        <div className="mt-auto pt-4 border-t border-brand-whisper-border dark:border-brand-light-border/40">
          <p className="text-[12px] sm:text-[12.5px] text-brand-text-muted leading-relaxed text-wrap pretty">{family.usage}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <code className="text-[10px] font-mono text-brand-text-muted/80 bg-brand-canvas dark:bg-white/[0.03] px-1.5 py-0.5 rounded border border-brand-whisper-border dark:border-brand-light-border/20 select-all">
              {family.cssVar}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

