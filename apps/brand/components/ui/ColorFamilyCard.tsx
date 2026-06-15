import React from 'react'
import { Copy, Check } from 'lucide-react'
import { TooltipHint } from './TooltipHint'
import { ToneBarVertical } from './ToneBarVertical'

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
      className="bg-white rounded-xl border border-[#E8E8E8] shadow-[0_2px_6px_rgba(0,0,0,0.07)] transition-all duration-150 hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:-translate-y-[1px] active:scale-[0.99] flex overflow-hidden min-h-[170px]"
      style={{ borderTopColor: family.hex, borderTopWidth: '4px' }}
    >
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-1.5">
            <h3 className="font-display text-sm font-bold text-[#333333]">{family.name}</h3>
            <TooltipHint text={family.usage} />
            <button
              onClick={() => onCopy(family.hex, `family-${family.name}`)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-all shrink-0 ${copiedId === `family-${family.name}` ? 'text-[#16A34A] bg-green-50 animate-copy-flash' : 'text-[#9E9E9E] hover:text-[#333333] hover:bg-[#F5F5F5] hover:scale-[1.03] active:scale-95'}`}
            >
              {copiedId === `family-${family.name}` ? (
                <><Check size={11} className="text-green-600 animate-pulse-once" /></>
              ) : (
                <><Copy size={11} /></>
              )}
            </button>
          </div>
          <p className="text-sm text-[#666666] leading-relaxed pe-2">{family.role}</p>
          <div className="flex items-center gap-2 mt-3">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: family.hex }}
            />
            <code className="text-[11px] font-mono text-[#9E9E9E]">{family.hex}</code>
            <span className="text-[#E8E8E8] text-[10px]">|</span>
            <code className="text-[11px] font-mono text-[#9E9E9E]">{family.cssVar}</code>
          </div>
        </div>

        <p className="text-sm text-[#666666] leading-relaxed mt-3">{family.usage}</p>
      </div>

      <ToneBarVertical tones={family.tones} mainHex={family.hex} onCopy={onCopy} copiedId={copiedId} onColorSelect={onColorSelect} />
    </div>
  )
}
