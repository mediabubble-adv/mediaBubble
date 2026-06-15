/** Canonical MediaBubble social profile URLs (footer, schema.org sameAs, etc.). */
export const MEDIABUBBLE_SOCIAL_HREFS = {
  github: 'https://github.com/mediabubble',
  facebook: 'https://www.facebook.com/mediabubble',
  instagram: 'https://www.instagram.com/mediabubble',
  linkedin: 'https://www.linkedin.com/company/mediabubble',
  tiktok: 'https://www.tiktok.com/@mediabubble',
} as const

export type MediabubbleSocialId = keyof typeof MEDIABUBBLE_SOCIAL_HREFS

export const MEDIABUBBLE_SOCIAL_PROFILES = Object.values(MEDIABUBBLE_SOCIAL_HREFS)

/** Footer display order — GitHub first per product request. */
export const FOOTER_SOCIAL_ORDER: MediabubbleSocialId[] = [
  'github',
  'facebook',
  'instagram',
  'linkedin',
  'tiktok',
]
