import React from 'react'
import { Check } from 'lucide-react'

export function ToneBarVertical({ tones, mainHex, onCopy, copiedId, onColorSelect }: {
  tones: string[]; mainHex: string; onCopy: (text: string, id: string) => void; copiedId: string | null; onColorSelect?: (hex: string) => void
}) {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden w-20 h-full min-h-[200px]">
      {tones.map((tone, i) => {
        const isMain = tone === mainHex
        return (
          <button
            key={i}
            className={`flex-1 relative transition-all duration-150 hover:scale-x-110 hover:z-10 hover:brightness-110 active:brightness-125 ${isMain ? 'ring-2 ring-inset ring-white/40 z-[1]' : ''}`}
            style={{ backgroundColor: tone }}
            onClick={() => { onCopy(tone, `tone-${mainHex}-${i}`); onColorSelect?.(tone) }}
            title={tone}
          >
            {isMain && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-1.5 h-1.5 rounded-full ${['#FFC107', '#FFF8E1', '#FFECB3', '#E3F2FD', '#BBDEFB', '#E8EAF6', '#C5CAE9', '#FFFFFF', '#FAFAFA', '#F5F5F5'].includes(tone) ? 'bg-black/30' : 'bg-white/60'}`} />
              </div>
            )}
            {copiedId === `tone-${mainHex}-${i}` && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Check size={10} className="text-white animate-pulse-once" />
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
