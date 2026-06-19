// Derives a typed BrandDNA from the single source of truth (constants.ts).
// No hardcoded hexes live here — everything traces back to the brand palette.

import { brand, colorFamilies } from '@/components/constants'
import type { BrandColor, BrandDNA } from './types'

const colors: BrandColor[] = colorFamilies.map((family) => ({
  name: family.name,
  hex: family.hex,
  cssVar: family.cssVar,
  role: family.role,
}))

// Voice cues + anti-values. Sourced from the Voice & Tone register
// ("Confident, visionary, partnership-oriented" / "Energetic, punchy") and the
// brand's documented slop filter (hype words to avoid).
const voice = [
  'confident',
  'visionary',
  'partnership-oriented',
  'clear',
  'action-oriented',
  'results-driven',
]

const negatives = [
  'no hype',
  'no clichés',
  'no jargon',
  'no condescension',
  'no pure black',
  'no neon',
  'no gradient text',
  'no emojis',
  'no overlapping elements',
]

export const brandDNA: BrandDNA = {
  name: brand.name,
  tagline: brand.tagline,
  colors,
  approvedHexes: colors.map((c) => c.hex.toLowerCase()),
  voice,
  negatives,
  fonts: { display: 'Poppins', body: 'Inter', mono: 'JetBrains Mono' },
}

/** Look up a brand color by its cssVar id. */
export const colorByVar = (cssVar: string): BrandColor | undefined =>
  brandDNA.colors.find((c) => c.cssVar === cssVar)

/** Default color emphasis: Brand Blue (primary) + Brand Yellow (accent). */
export const defaultColorEmphasis = brandDNA.colors
  .filter((c) => c.name === 'Brand Blue' || c.name === 'Brand Yellow')
  .map((c) => c.cssVar)
