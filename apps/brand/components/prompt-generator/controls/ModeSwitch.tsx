'use client'

import { Image as ImageIcon, Video } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import type { Mode } from '../lib/types'

interface ModeSwitchProps {
  mode: Mode
  onChange: (mode: Mode) => void
}

const MODES: { value: Mode; label: string; icon: typeof ImageIcon }[] = [
  { value: 'image', label: 'Image', icon: ImageIcon },
  { value: 'video', label: 'Video', icon: Video },
]

/** Segmented Image | Video toggle. */
export const ModeSwitch = ({ mode, onChange }: ModeSwitchProps) => {
  const { t } = useI18n()

  return (
    <div
      role="tablist"
      aria-label={t('Generation mode', 'Generation mode')}
      className="grid grid-cols-2 gap-1 bg-brand-surface border border-brand-whisper-border rounded-xl p-1"
    >
      {MODES.map(({ value, label, icon: Icon }) => {
        const active = value === mode
        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(value)}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[13px] font-bold transition-all duration-150 active:scale-95 ${
              active
                ? 'bg-brand-blue text-white shadow-sm'
                : 'text-brand-text-muted hover:text-brand-text hover:bg-black/[0.02] dark:hover:bg-white/[0.06]'
            }`}
          >
            <Icon size={15} />
            {t(label, label)}
          </button>
        )
      })}
    </div>
  )
}
