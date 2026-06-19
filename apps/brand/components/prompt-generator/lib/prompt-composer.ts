// Pure prompt composition: compose(config, dna) -> string.
// Total by construction — every config combination yields valid text and the
// function never throws. Unknown models fall back to a plain formatter.

import { colorByVar } from './brand-dna'
import type { BrandDNA, GeneratorConfig, Model, Orientation } from './types'

const ASPECT_RATIO: Record<Orientation, string> = {
  landscape: '16:9',
  portrait: '9:16',
  square: '1:1',
}

const SUBCATEGORY_INTENT: Record<string, string> = {
  product: 'a clean product hero shot with the subject sharply in focus',
  character: 'a character portrait with expressive lighting and depth',
  landscape: 'a wide environmental scene with strong sense of place',
  marketing: 'a marketing key visual with deliberate negative space for copy',
}

const LIGHTING_DESC: Record<string, string> = {
  soft: 'soft, high-key diffused lighting with gentle shadows',
  studio: 'balanced studio lighting with controlled contrast',
  dramatic: 'dramatic directional lighting with deep, sculpted shadows',
}

const SHOT_DESC: Record<string, string> = {
  wide: 'wide establishing shot',
  medium: 'medium shot',
  'close-up': 'intimate close-up',
  aerial: 'aerial overhead shot',
}

const MOVEMENT_DESC: Record<string, string> = {
  static: 'locked-off static camera',
  pan: 'smooth horizontal pan',
  dolly: 'slow dolly push-in',
  orbit: 'orbiting camera move',
  handheld: 'subtle handheld motion',
}

function colorPhrase(config: GeneratorConfig, dna: BrandDNA): string {
  const picked = config.colorEmphasis
    .map(colorByVar)
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
  if (picked.length === 0) return ''
  const parts = picked.map((c) => `${c.name} (${c.hex})`)
  return `Brand color palette: ${parts.join(', ')}.`
}

/** Build the model-agnostic descriptive core. */
function coreDescription(config: GeneratorConfig, dna: BrandDNA): string {
  const lines: string[] = []

  if (config.mode === 'image') {
    const intent = SUBCATEGORY_INTENT[config.subcategory] ?? 'a brand-aligned visual'
    lines.push(`${dna.name} ${config.subcategory} visual: ${intent}.`)
    lines.push(`Composition: ${config.composition.density} visual density, ${config.composition.orientation} orientation.`)
  } else {
    const shot = SHOT_DESC[config.camera.shot] ?? 'medium shot'
    const move = MOVEMENT_DESC[config.camera.movement] ?? 'static camera'
    lines.push(`${dna.name} ${config.subcategory} video: ${SUBCATEGORY_INTENT[config.subcategory] ?? 'a brand-aligned scene'}.`)
    lines.push(`Camera: ${shot}, ${move}, ${config.camera.motion} motion, ~${config.camera.duration}s.`)
  }

  lines.push(`Lighting: ${LIGHTING_DESC[config.lighting] ?? 'balanced lighting'}.`)

  const color = colorPhrase(config, dna)
  if (color) lines.push(color)

  lines.push(`Mood/voice: ${dna.voice.join(', ')}.`)
  lines.push(`Typography (if any text): ${dna.fonts.display} for display, ${dna.fonts.body} for body.`)
  lines.push(`Avoid: ${dna.negatives.join('; ')}.`)

  return lines.join('\n')
}

// --- Model formatters ---

function formatMidjourney(core: string, config: GeneratorConfig): string {
  const ar = ASPECT_RATIO[config.composition.orientation]
  return `${core}\n\n--ar ${ar} --style raw --v 6`
}

function formatRunway(core: string, config: GeneratorConfig): string {
  return `${core}\n\n[Runway Gen-3] aspect ${ASPECT_RATIO[config.composition.orientation]}, duration ${config.camera.duration}s.`
}

function formatKling(core: string, config: GeneratorConfig): string {
  return `${core}\n\n[Kling] ${ASPECT_RATIO[config.composition.orientation]}, ${config.camera.duration}s, ${config.camera.motion} motion strength.`
}

const FORMATTERS: Record<Model, (core: string, config: GeneratorConfig) => string> = {
  midjourney: formatMidjourney,
  // Flux & Grok prefer rich natural language with no flags.
  flux: (core) => core,
  grok: (core) => core,
  runway: formatRunway,
  kling: formatKling,
}

export function compose(config: GeneratorConfig, dna: BrandDNA): string {
  const core = coreDescription(config, dna)
  const formatter = FORMATTERS[config.model] ?? ((c: string) => c)
  return formatter(core, config).trim()
}
