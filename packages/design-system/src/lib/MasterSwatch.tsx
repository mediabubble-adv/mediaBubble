'use client'

import React from 'react'
import { Copy, Check } from 'lucide-react'

export function MasterSwatch({ selectedColor, onCopy, copiedId, onColorSelect }: {
  selectedColor: string; onCopy: (text: string, id: string) => void; copiedId: string | null; onColorSelect: (hex: string) => void
}) {
  const isLight = ['#FFFFFF', '#FAFAFA', '#F5F5F5', '#FFF8E1', '#FFECB3', '#FFE082', '#E3F2FD', '#BBDEFB', '#E8EAF6', '#C5CAE9'].includes(selectedColor)
  const textColor = isLight ? 'text-black/75' : 'text-white'
  const labelColor = isLight ? 'text-black/40' : 'text-white/55'
  const btnBg = isLight ? 'bg-black/8 hover:bg-black/15' : 'bg-white/15 hover:bg-white/25'
  const btnText = isLight ? 'text-black/50' : 'text-white/75'

  return (
    <div className="bg-white rounded-xl border border-[#E8E8E8] shadow-[0_2px_6px_rgba(0,0,0,0.07)] overflow-hidden mb-8">
      <div
        className="h-56 sm:h-64 relative flex items-center justify-center transition-colors duration-300"
        style={{ backgroundColor: selectedColor }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
        <div className="relative text-center">
          <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${labelColor} mb-3`}>Preview</p>
          <p className={`font-display text-5xl sm:text-7xl font-black ${textColor} tracking-tight`}>{selectedColor}</p>
        </div>
        <button
          onClick={() => onCopy(selectedColor, 'master-color')}
          className={`absolute top-4 end-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${btnBg} ${btnText} hover:opacity-100 hover:scale-[1.03] active:scale-95 text-[11px] font-medium transition-all backdrop-blur-sm`}
        >
          {copiedId === 'master-color' ? <><Check size={13} className="text-green-400 animate-pulse-once" /> Copied</> : <><Copy size={13} /> Copy</>}
        </button>
      </div>
    </div>
  )
}
