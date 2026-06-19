// Shared types for the Prompt Generator.

export type Mode = 'image' | 'video'

export type ImageSubcategory = 'product' | 'character' | 'landscape' | 'marketing'

export type Orientation = 'portrait' | 'landscape' | 'square'
export type Density = 'low' | 'medium' | 'high'
export type Lighting = 'soft' | 'studio' | 'dramatic'

export type VideoShot = 'wide' | 'medium' | 'close-up' | 'aerial'
export type VideoMovement = 'static' | 'pan' | 'dolly' | 'orbit' | 'handheld'
export type MotionIntensity = 'subtle' | 'moderate' | 'dynamic'

export type ImageModel = 'midjourney' | 'flux' | 'grok'
export type VideoModel = 'runway' | 'kling'
export type Model = ImageModel | VideoModel

export interface Composition {
  orientation: Orientation
  density: Density
}

export interface CameraConfig {
  shot: VideoShot
  movement: VideoMovement
  motion: MotionIntensity
  duration: string // seconds, e.g. '5'
}

export interface GeneratorConfig {
  mode: Mode
  subcategory: ImageSubcategory
  composition: Composition
  camera: CameraConfig
  lighting: Lighting
  model: Model
  /** Brand color family ids (cssVar) to emphasise in the prompt. */
  colorEmphasis: string[]
}

export interface SavedTemplate {
  id: string
  name: string
  config: GeneratorConfig
  createdAt: number
}

export interface HistoryEntry {
  id: string
  prompt: string
  model: Model
  mode: Mode
  createdAt: number
}

// --- Validation ---

export type ValidationSeverity = 'error' | 'warning' | 'info'
export type ValidationCategory =
  | 'color'
  | 'typography'
  | 'layout'
  | 'component'
  | 'constraint'

export interface ValidationIssue {
  type: ValidationCategory
  severity: ValidationSeverity
  message: string
  suggestion: string
}

export type Compliance = 'excellent' | 'good' | 'fair' | 'poor'

export interface ValidationResult {
  score: number
  compliance: Compliance
  issues: ValidationIssue[]
  suggestions: string[]
  strengths: string[]
}

// --- Brand DNA (derived from constants.ts) ---

export interface BrandColor {
  name: string
  hex: string
  cssVar: string
  role: string
}

export interface BrandDNA {
  name: string
  tagline: string
  colors: BrandColor[]
  /** Hex strings considered on-brand for emphasis. */
  approvedHexes: string[]
  /** Voice descriptors used as positive prompt cues. */
  voice: string[]
  /** Anti-values used to build negative prompts. */
  negatives: string[]
  fonts: { display: string; body: string; mono: string }
}
