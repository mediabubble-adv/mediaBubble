'use client'

import { ChipGroup } from './ChipGroup'
import { modelsForMode } from '../lib/options'
import type { Mode, Model } from '../lib/types'

interface ModelSelectorProps {
  mode: Mode
  value: Model
  onChange: (model: Model) => void
}

/** Model chips; the list switches with the active mode. */
export const ModelSelector = ({ mode, value, onChange }: ModelSelectorProps) => (
  <ChipGroup
    label="Target model"
    name="model"
    options={modelsForMode(mode)}
    value={value}
    onChange={(v) => onChange(v as Model)}
  />
)
