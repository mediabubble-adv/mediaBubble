'use client'

import { useI18n } from '@/lib/i18n/provider'
import { ModeSwitch } from '../controls/ModeSwitch'
import { ChipGroup } from '../controls/ChipGroup'
import { LightingSystem } from '../controls/LightingSystem'
import { ModelSelector } from '../controls/ModelSelector'
import {
  densityOptions,
  movementOptions,
  motionOptions,
  orientationOptions,
  shotOptions,
  subcategoryOptions,
} from '../lib/options'
import { defaultModelForMode } from '../lib/templates'
import type {
  Density,
  GeneratorConfig,
  ImageSubcategory,
  Lighting,
  Mode,
  Model,
  MotionIntensity,
  Orientation,
  VideoMovement,
  VideoShot,
} from '../lib/types'

interface ConfigPaneProps {
  config: GeneratorConfig
  onChange: (patch: Partial<GeneratorConfig>) => void
}

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-4 pb-5 border-b border-brand-whisper-border/60 last:border-b-0 last:pb-0">
    {children}
  </div>
)

/** LEFT pane: all generation inputs. */
export const ConfigPane = ({ config, onChange }: ConfigPaneProps) => {
  const { t } = useI18n()

  const setMode = (mode: Mode) =>
    onChange({ mode, model: defaultModelForMode[mode] })

  return (
    <div className="space-y-5">
      <ModeSwitch mode={config.mode} onChange={setMode} />

      <Section>
        <ChipGroup
          label="Subject"
          name="subcategory"
          options={subcategoryOptions}
          value={config.subcategory}
          onChange={(v) => onChange({ subcategory: v as ImageSubcategory })}
        />
      </Section>

      {config.mode === 'image' ? (
        <Section>
          <ChipGroup
            label="Orientation"
            name="orientation"
            options={orientationOptions}
            value={config.composition.orientation}
            onChange={(v) =>
              onChange({
                composition: { ...config.composition, orientation: v as Orientation },
              })
            }
          />
          <ChipGroup
            label="Visual density"
            name="density"
            options={densityOptions}
            value={config.composition.density}
            onChange={(v) =>
              onChange({
                composition: { ...config.composition, density: v as Density },
              })
            }
          />
        </Section>
      ) : (
        <Section>
          <ChipGroup
            label="Shot"
            name="shot"
            options={shotOptions}
            value={config.camera.shot}
            onChange={(v) => onChange({ camera: { ...config.camera, shot: v as VideoShot } })}
          />
          <ChipGroup
            label="Camera movement"
            name="movement"
            options={movementOptions}
            value={config.camera.movement}
            onChange={(v) =>
              onChange({ camera: { ...config.camera, movement: v as VideoMovement } })
            }
          />
          <ChipGroup
            label="Motion intensity"
            name="motion"
            options={motionOptions}
            value={config.camera.motion}
            onChange={(v) =>
              onChange({ camera: { ...config.camera, motion: v as MotionIntensity } })
            }
          />
          <label className="block space-y-1.5">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">
              {t('Duration (seconds)', 'Duration (seconds)')}
            </span>
            <input
              type="number"
              min={1}
              max={60}
              value={config.camera.duration}
              onChange={(e) =>
                onChange({ camera: { ...config.camera, duration: e.target.value } })
              }
              className="w-24 px-3 py-1.5 rounded-lg text-[13px] font-mono bg-brand-surface border border-brand-input-border text-brand-text focus:outline-none focus:border-brand-blue"
            />
          </label>
        </Section>
      )}

      <Section>
        <LightingSystem
          value={config.lighting}
          onChange={(v: Lighting) => onChange({ lighting: v })}
        />
      </Section>

      <Section>
        <ModelSelector
          mode={config.mode}
          value={config.model}
          onChange={(m: Model) => onChange({ model: m })}
        />
      </Section>
    </div>
  )
}
