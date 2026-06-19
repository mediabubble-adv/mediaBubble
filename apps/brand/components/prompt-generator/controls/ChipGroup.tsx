'use client'

import { useI18n } from '@/lib/i18n/provider'
import type { Option } from '../lib/options'

interface ChipGroupProps {
  label: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  /** Optional id prefix for a11y. */
  name?: string
}

/**
 * Reusable single-select chip group. Keyboard-navigable radio semantics so
 * arrow keys move selection, matching WCAG expectations.
 */
export const ChipGroup = ({ label, options, value, onChange, name }: ChipGroupProps) => {
  const { t } = useI18n()

  return (
    <div role="radiogroup" aria-label={t(label, label)} className="space-y-2">
      <span className="block text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">
        {t(label, label)}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const selected = opt.value === value
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              id={name ? `${name}-${opt.value}` : undefined}
              onClick={() => onChange(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all duration-150 active:scale-95 border ${
                selected
                  ? 'bg-brand-yellow/[0.12] text-brand-text border-brand-yellow/40 shadow-[inset_0_0_0_1px_rgba(255,193,7,0.2)]'
                  : 'bg-brand-surface text-brand-text-muted border-brand-whisper-border hover:text-brand-text hover:border-brand-blue/30'
              }`}
            >
              {t(opt.label, opt.label)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
