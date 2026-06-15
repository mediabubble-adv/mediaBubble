import { SERVICES } from '@/lib/services-data'
import type { ServicePageConfig } from './types'

const legacy = SERVICES['social']

export const socialServiceConfig: ServicePageConfig = {
  slug: legacy.slug,
  meta: legacy.meta,
  hero: legacy.hero,
  features: legacy.features,
  caseStudy: legacy.caseStudy,
  faqs: legacy.faqs,
  sections: [
    'hero',
    'contentCalendar',
    'platformShowcase',
    'features',
    'caseStudy',
    'faq',
    'cta',
  ],
  contentCalendar: {
    kicker: 'Content rhythm',
    title: 'A month planned before you post',
    intro: 'Every client gets a 30-day calendar approved in advance — themes, formats, and CTAs tied to booking seasons.',
    weeks: [
      { label: 'Week 1 — Brand & trust', themes: ['Property tour Reel', 'Team intro', 'Guest review carousel'] },
      { label: 'Week 2 — Experience', themes: ['Behind the scenes', 'Local guide spotlight', 'UGC repost'] },
      { label: 'Week 3 — Offer', themes: ['Package promo', 'Limited availability Story', 'FAQ carousel'] },
      { label: 'Week 4 — Community', themes: ['Poll / question sticker', 'User photo feature', 'Month recap'] },
    ],
  },
  platformShowcase: {
    kicker: 'Platforms',
    title: 'Native content per channel',
    intro: 'Same brand, different formats — optimised for how each platform actually distributes content.',
    platforms: [
      {
        id: 'instagram',
        label: 'Instagram',
        highlights: ['Reels-first discovery', 'Carousel guides for itineraries', 'Stories for offers and urgency'],
      },
      {
        id: 'facebook',
        label: 'Facebook',
        highlights: ['Event promotion and groups', 'Retargeting-friendly link posts', 'Review and messenger workflows'],
      },
      {
        id: 'tiktok',
        label: 'TikTok',
        highlights: ['Short hooks for experiences', 'Trend-aware edits without losing brand', 'Creator-style property tours'],
      },
    ],
  },
}
