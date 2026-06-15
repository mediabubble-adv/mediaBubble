import { SERVICES } from '@/lib/services-data'
import type { ServicePageConfig } from './types'

const legacy = SERVICES['branding']

export const brandingServiceConfig: ServicePageConfig = {
  slug: legacy.slug,
  meta: legacy.meta,
  hero: legacy.hero,
  features: legacy.features,
  caseStudy: legacy.caseStudy,
  faqs: legacy.faqs,
  sections: [
    'hero',
    'beforeAfter',
    'identityDeliverables',
    'features',
    'caseStudy',
    'faq',
    'cta',
  ],
  beforeAfter: {
    kicker: 'Transformation',
    title: 'From inconsistent to unmistakable',
    intro: 'Rebrands fail when only the logo changes. We fix positioning, visuals, and voice together.',
    pairs: [
      {
        label: 'Hospitality',
        before: 'Stock photos, mismatched fonts, rates competing on price alone.',
        after: 'Cohesive visual system, premium photography direction, voice that justifies higher ADR.',
      },
      {
        label: 'Local services',
        before: 'Clip-art logo, DIY Canva posts, no differentiation on Google Maps.',
        after: 'Distinct mark, template library, signage-ready files that stand out in Hurghada listings.',
      },
    ],
  },
  identityDeliverables: {
    kicker: 'Deliverables',
    title: 'Everything you need to launch consistently',
    intro: 'Strategy, design, and handover files — not just a PDF deck.',
    items: [
      { title: 'Brand strategy one-pager', description: 'Positioning, audience, and messaging pillars agreed before design.', colSpan: 2 },
      { title: 'Logo system', description: 'Primary, stacked, icon, and mono variants in print-ready formats.' },
      { title: 'Colour & type', description: 'Accessible palette with hierarchy rules for web and print.' },
      { title: 'Brand guidelines', description: 'Usage rules, spacing, photography direction, and tone examples.' },
      { title: 'Social templates', description: 'Figma or Canva kit so every post stays on-brand without us.' },
      { title: 'Stationery pack', description: 'Business cards, letterhead, and presentation cover templates.' },
    ],
  },
}
