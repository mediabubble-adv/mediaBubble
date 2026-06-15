import { SERVICES } from '@/lib/services-data'
import type { ServicePageConfig } from './types'

const legacy = SERVICES['ppc']

export const ppcServiceConfig: ServicePageConfig = {
  slug: legacy.slug,
  meta: legacy.meta,
  hero: legacy.hero,
  features: legacy.features,
  caseStudy: legacy.caseStudy,
  faqs: legacy.faqs,
  sections: [
    'hero',
    'platformBadges',
    'channelMatrix',
    'budgetFramework',
    'features',
    'caseStudy',
    'faq',
    'cta',
  ],
  platformBadges: {
    kicker: 'Platforms',
    title: 'Every channel that drives bookings',
    intro: 'We match spend to intent — search when buyers are ready, social when they are discovering, remarketing when they are deciding.',
    platforms: [
      { name: 'Google Search', description: 'High-intent keywords for hotels, tours, and local services in Hurghada.' },
      { name: 'Performance Max', description: 'Automated placements across Search, Display, YouTube, and Discover.' },
      { name: 'Meta Ads', description: 'Prospecting and retargeting on Facebook and Instagram with creative that converts.' },
      { name: 'YouTube & Display', description: 'Awareness and remarketing for longer consideration cycles.' },
    ],
  },
  channelMatrix: {
    kicker: 'Channel fit',
    title: 'Where each channel wins',
    intro: 'No single platform does everything. We allocate budget by funnel stage and measurable ROAS.',
    columns: ['Google Search', 'Meta Ads', 'Display'],
    rows: [
      { label: 'High purchase intent', values: [true, false, false] },
      { label: 'Visual storytelling', values: [false, true, true] },
      { label: 'Retargeting warm visitors', values: [true, true, true] },
      { label: 'Seasonal tourism pushes', values: [true, true, false] },
      { label: 'Weekly optimisation cadence', values: [true, true, true] },
    ],
  },
  budgetFramework: {
    kicker: 'Budget tiers',
    title: 'A sensible path to scale',
    intro: 'Start lean, prove ROAS, then scale winners — typical progression for Red Sea hospitality accounts.',
    tiers: [
      { label: 'Test', spend: '3–5k EGP / mo', focus: 'Conversion tracking, 2–3 ad sets, landing page fixes' },
      { label: 'Grow', spend: '8–15k EGP / mo', focus: 'Retargeting, creative testing, search term sculpting' },
      { label: 'Scale', spend: '20k+ EGP / mo', focus: 'Winner campaigns, lookalikes, seasonal budget shifts' },
    ],
  },
}
