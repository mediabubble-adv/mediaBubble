// Default config + starter presets. Color emphasis references brand color
// cssVars (resolved via brand-dna), keeping the palette as single source of truth.

import { defaultColorEmphasis } from './brand-dna'
import type { GeneratorConfig, Model, Mode } from './types'

export const defaultConfig: GeneratorConfig = {
  mode: 'image',
  subcategory: 'product',
  composition: { orientation: 'landscape', density: 'medium' },
  camera: { shot: 'medium', movement: 'dolly', motion: 'moderate', duration: '5' },
  lighting: 'studio',
  model: 'midjourney',
  colorEmphasis: defaultColorEmphasis,
}

/** Default model when switching modes. */
export const defaultModelForMode: Record<Mode, Model> = {
  image: 'midjourney',
  video: 'runway',
}

export interface Preset {
  id: string
  name: string
  description: string
  config: GeneratorConfig
}

export const presets: Preset[] = [
  {
    id: 'product-hero',
    name: 'Product Hero',
    description: 'High-key product shot for marketing surfaces',
    config: {
      ...defaultConfig,
      subcategory: 'product',
      lighting: 'soft',
      composition: { orientation: 'landscape', density: 'low' },
    },
  },
  {
    id: 'brand-portrait',
    name: 'Brand Portrait',
    description: 'Dramatic character portrait, studio feel',
    config: {
      ...defaultConfig,
      subcategory: 'character',
      lighting: 'dramatic',
      composition: { orientation: 'portrait', density: 'medium' },
    },
  },
  {
    id: 'campaign-reel',
    name: 'Campaign Reel',
    description: 'Short brand video, dolly push-in',
    config: {
      ...defaultConfig,
      mode: 'video',
      model: 'runway',
      subcategory: 'marketing',
      lighting: 'studio',
      composition: { orientation: 'portrait', density: 'medium' },
      camera: { shot: 'medium', movement: 'dolly', motion: 'moderate', duration: '6' },
    },
  },
]
