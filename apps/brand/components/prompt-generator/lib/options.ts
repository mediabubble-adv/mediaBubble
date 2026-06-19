// Control option lists for the generator UI. Labels are English defaults; the UI
// passes them through useI18n's t() for translation.

import type { ImageModel, Mode, Model, VideoModel } from './types'

export interface Option<T extends string = string> {
  value: T
  label: string
}

export const subcategoryOptions: Option[] = [
  { value: 'product', label: 'Product' },
  { value: 'character', label: 'Character' },
  { value: 'landscape', label: 'Landscape' },
  { value: 'marketing', label: 'Marketing' },
]

export const orientationOptions: Option[] = [
  { value: 'landscape', label: 'Landscape' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'square', label: 'Square' },
]

export const densityOptions: Option[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

export const lightingOptions: Option[] = [
  { value: 'soft', label: 'Soft / High-key' },
  { value: 'studio', label: 'Studio' },
  { value: 'dramatic', label: 'Dramatic' },
]

export const shotOptions: Option[] = [
  { value: 'wide', label: 'Wide' },
  { value: 'medium', label: 'Medium' },
  { value: 'close-up', label: 'Close-up' },
  { value: 'aerial', label: 'Aerial' },
]

export const movementOptions: Option[] = [
  { value: 'static', label: 'Static' },
  { value: 'pan', label: 'Pan' },
  { value: 'dolly', label: 'Dolly' },
  { value: 'orbit', label: 'Orbit' },
  { value: 'handheld', label: 'Handheld' },
]

export const motionOptions: Option[] = [
  { value: 'subtle', label: 'Subtle' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'dynamic', label: 'Dynamic' },
]

export const imageModels: Option<ImageModel>[] = [
  { value: 'midjourney', label: 'Midjourney' },
  { value: 'flux', label: 'Flux' },
  { value: 'grok', label: 'Grok' },
]

export const videoModels: Option<VideoModel>[] = [
  { value: 'runway', label: 'Runway' },
  { value: 'kling', label: 'Kling' },
]

export const modelsForMode = (mode: Mode): Option<Model>[] =>
  mode === 'image' ? imageModels : videoModels
