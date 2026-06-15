import React from 'react'
import { Copy, Check } from 'lucide-react'
import { TooltipHint } from './TooltipHint'
import { ToneBarVertical } from './ToneBarVertical'
import { brandDocCardShell } from './brand-doc'

interface ColorFamily {
  name: string
  role: string
  hex: string
  tones: string[]
  usage: string
  cssVar: string
}

export function ColorFamilyCard({ family, onCopy, copiedId, onColorSelect }: {
  family: ColorFamily; onCopy: (text: string, id: string) => void; copiedId: string | null; onColorSelect?: (hex: string) => void
}) {
  return (
    <div
      className={`${brandDocCardShell} shadow-[0_2px_6px_rgba(0,0,0,0.07)] dark:shadow-black/20 transition-all duration-150 hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] dark:hover:shadow-black/30 hover:-translate-y-[1px] active:scale-[0.99] flex overflow-hidden min-h-[170px]`}
      style={{ borderTopColor: family.hex, borderTopWidth: '4px' }}
    >
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-1.5">
            <h3 className="font-display text-sm font-bold text-brand-text">{family.name}</h3>
            <TooltipHint text={family.usage} />
            <button
              onClick={() => onCopy(family.hex, `family-${family.name}`)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-all shrink-0 ${copiedId === `family-${family.name}` ? 'text-brand-success bg-brand-success-bg dark:bg-brand-success/20 animate-copy-flash' : 'text-brand-text-muted hover:text-brand-text hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:scale-[1.03] active:scale-95'}`}
            >
              {copiedId === `family-${family.name}` ? (
                <><Check size={11} className="text-brand-success animate-pulse-once" /></>
              ) : (
                <><Copy size={11} /></>
              )}
            </button>
          </div>
          <p className="text-sm text-brand-text-secondary leading-relaxed pe-2">{family.role}</p>
          <div className="flex items-center gap-2 mt-3">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: family.hex }}
            />
            <code className="text-[11px] font-mono text-brand-text-muted">{family.hex}</code>
            <span className="text-brand-whisper-border text-[10px]">|</span>
            <code className="text-[11px] font-mono text-brand-text-muted">{family.cssVar}</code>
          </div>
        </div>

        <p className="text-sm text-brand-text-secondary leading-relaxed mt-3">{family.usage}</p>
      </div>

      <ToneBarVertical tones={family.tones} mainHex={family.hex} onCopy={onCopy} copiedId={copiedId} onColorSelect={onColorSelect} />
    </div>
  )
}
