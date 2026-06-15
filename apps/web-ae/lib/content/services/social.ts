import { SERVICES } from '@/lib/services-data'
import type { ServicePageConfig } from './types'

const legacy = SERVICES['social']

export const socialServiceConfig: ServicePageConfig = {
  slug: legacy.slug,
  meta: {
    title: 'Social Media Marketing | MediaBubble UAE',
    description:
      'Social media management for UAE hospitality and lifestyle brands. Content calendars, community management, and paid social. Talk to our team today.',
  },
  hero: {
    ...legacy.hero,
    subtitle:
      'We manage your social presence end-to-end for Dubai and UAE audiences — strategy, content creation, posting, and community management.',
  },
  features: legacy.features,
  caseStudy: {
    ...legacy.caseStudy,
    description:
      'A Dubai hotel had stagnant Instagram engagement. A consistent visual identity, Reels strategy, and community management drove 287% engagement growth and a 40% increase in direct booking enquiries.',
    company: 'Marina Heights Hotel',
    author: 'Mona Farid',
    authorTitle: 'General Manager, Marina Heights Hotel',
  },
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
    intro: 'Every client gets a 30-day calendar approved in advance — themes, formats, and CTAs tied to UAE seasons and campaigns.',
    weeks: [
      { label: 'Week 1 — Brand & trust', themes: ['Property tour Reel', 'Team intro', 'Guest review carousel'] },
      { label: 'Week 2 — Experience', themes: ['Behind the scenes', 'Neighbourhood guide', 'UGC repost'] },
      { label: 'Week 3 — Offer', themes: ['Package promo', 'Limited availability Story', 'FAQ carousel'] },
      { label: 'Week 4 — Community', themes: ['Poll / question sticker', 'User photo feature', 'Month recap'] },
    ],
  },
  platformShowcase: {
    kicker: 'Platforms',
    title: 'Native content per channel',
    intro: 'Same brand, different formats — optimised for how each platform distributes content in the Gulf.',
    platforms: [
      {
        id: 'instagram',
        label: 'Instagram',
        highlights: ['Reels-first discovery', 'Carousel guides for lifestyle', 'Stories for offers and urgency'],
      },
      {
        id: 'facebook',
        label: 'Facebook',
        highlights: ['Event promotion', 'Retargeting-friendly link posts', 'Messenger workflows for enquiries'],
      },
      {
        id: 'tiktok',
        label: 'TikTok',
        highlights: ['Short hooks for experiences', 'Trend-aware edits', 'Creator-style venue tours'],
      },
    ],
  },
}
