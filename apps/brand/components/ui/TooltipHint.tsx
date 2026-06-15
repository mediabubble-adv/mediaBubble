import React from 'react'
import { Info } from 'lucide-react'

export function TooltipHint({ text, side = 'top' }: { text: string; side?: 'top' | 'right' | 'bottom' | 'left' }) {
  const sideClasses = {
    top: 'bottom-full start-1/2 -translate-x-1/2 mb-2',
    right: 'start-full top-1/2 -translate-y-1/2 ms-2',
    bottom: 'top-full start-1/2 -translate-x-1/2 mt-2',
    left: 'end-full top-1/2 -translate-y-1/2 me-2',
  }
  return (
    <span className="relative group inline-flex items-center shrink-0">
      <Info size={12} className="text-brand-text-muted hover:text-brand-text-secondary cursor-help transition-colors" />
      <span className={`absolute ${sideClasses[side]} px-2 py-1.5 rounded-lg bg-[#0D0F12] text-white text-[10px] leading-tight whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-[var(--z-tooltip)] shadow-lg max-w-[200px]`}>
        {text}
      </span>
    </span>
  )
}
