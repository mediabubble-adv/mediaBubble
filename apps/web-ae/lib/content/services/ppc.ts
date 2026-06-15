import { SERVICES } from '@/lib/services-data'
import type { ServicePageConfig } from './types'

const legacy = SERVICES['ppc']

export const ppcServiceConfig: ServicePageConfig = {
  slug: legacy.slug,
  meta: {
    title: 'Paid Advertising (PPC) | MediaBubble UAE',
    description:
      'Google and Meta ad campaigns for UAE businesses. Average 4.2× ROAS within 90 days. Transparent reporting, no surprises. Get a free audit today.',
  },
  hero: {
    ...legacy.hero,
    subtitle:
      'We run Google, Meta, and display campaigns for Dubai and UAE brands — targeting buyers at the moment they are ready, with creative that converts and budgets that scale.',
  },
  features: legacy.features,
  caseStudy: {
    ...legacy.caseStudy,
    description:
      'A UAE leisure brand was spending heavily on Meta with weak attribution. After restructuring campaigns, building retargeting audiences, and refreshing creative, they hit 4.8× ROAS within 60 days.',
    company: 'Gulf Leisure Co.',
    author: 'Sara Khalil',
    authorTitle: 'Marketing Director, Gulf Leisure Co.',
  },
  faqs: legacy.faqs.map((faq) =>
    faq.question.includes('minimum ad spend')
      ? {
          ...faq,
          answer:
            'We recommend a minimum of AED 3,000–5,000/month in ad spend. Below that, data accumulates too slowly to optimise effectively and results become inconsistent.',
        }
      : faq
  ),
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
    title: 'Every channel that drives qualified leads',
    intro: 'We match spend to intent — search when buyers are ready, social when they are discovering, remarketing when they are deciding.',
    platforms: [
      { name: 'Google Search', description: 'High-intent keywords for real estate, hospitality, and professional services in the UAE.' },
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
      { label: 'Expo & seasonal pushes', values: [true, true, false] },
      { label: 'Weekly optimisation cadence', values: [true, true, true] },
    ],
  },
  budgetFramework: {
    kicker: 'Budget tiers',
    title: 'A sensible path to scale',
    intro: 'Start lean, prove ROAS, then scale winners — typical progression for UAE growth accounts.',
    tiers: [
      { label: 'Test', spend: 'AED 3–5k / mo', focus: 'Conversion tracking, 2–3 ad sets, landing page fixes' },
      { label: 'Grow', spend: 'AED 8–15k / mo', focus: 'Retargeting, creative testing, search term sculpting' },
      { label: 'Scale', spend: 'AED 20k+ / mo', focus: 'Winner campaigns, lookalikes, seasonal budget shifts' },
    ],
  },
}
