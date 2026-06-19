'use client'

import { Sun } from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'
import { ChipGroup } from './ChipGroup'
import { lightingOptions } from '../lib/options'
import type { Lighting } from '../lib/types'

interface LightingSystemProps {
  value: Lighting
  onChange: (value: Lighting) => void
}

const TIER_HINT: Record<Lighting, string> = {
  soft: 'High-key, diffused — clean and premium.',
  studio: 'Balanced contrast — versatile default.',
  dramatic: 'Directional, deep shadows — bold and moody.',
}

/** Three-tier lighting selector with a contextual description. */
export const LightingSystem = ({ value, onChange }: LightingSystemProps) => {
  const { t } = useI18n()

  return (
    <div className="space-y-2">
      <ChipGroup
        label="Lighting"
        name="lighting"
        options={lightingOptions}
        value={value}
        onChange={(v) => onChange(v as Lighting)}
      />
      <p className="flex items-center gap-1.5 text-[11px] text-brand-text-muted">
        <Sun size={12} className="text-brand-yellow shrink-0" />
        {t(TIER_HINT[value], TIER_HINT[value])}
      </p>
    </div>
  )
}
