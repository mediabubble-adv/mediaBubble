export const EXPERIMENTS = {
  homeHeroCta: {
    id: 'home-hero-cta-v1',
    variants: ['control', 'urgency'] as const,
    weights: [0.5, 0.5] as const,
  },
  insightsSearchPlaceholder: {
    id: 'blog-search-placeholder-v1',
    variants: ['default', 'action'] as const,
    weights: [0.5, 0.5] as const,
  },
} as const

export type ExperimentKey = keyof typeof EXPERIMENTS

export type ExperimentVariant<K extends ExperimentKey> =
  (typeof EXPERIMENTS)[K]['variants'][number]

export const HOME_HERO_CTA_COPY = {
  control: 'Free audit',
  urgency: 'Book a call',
} as const

export const BLOG_SEARCH_PLACEHOLDER_COPY = {
  default: 'Search articles…',
  action: 'Find marketing tips…',
} as const
