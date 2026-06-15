import { SERVICES } from '@/lib/services-data'
import type { ServicePageConfig } from './types'

const legacy = SERVICES['web']

export const webServiceConfig: ServicePageConfig = {
  slug: legacy.slug,
  meta: {
    title: 'Web Development | MediaBubble UAE',
    description:
      'Custom websites for UAE businesses. Sub-2s load times, 95+ Lighthouse scores, conversion-optimised design. 200+ sites delivered since 2015.',
  },
  hero: {
    ...legacy.hero,
    subtitle:
      'We build fast, modern websites and e-commerce stores for Dubai and UAE brands — designed to convert visitors into customers, not just look pretty.',
  },
  features: legacy.features,
  caseStudy: {
    ...legacy.caseStudy,
    description:
      'A UAE property listings site took 8 seconds to load on mobile. We rebuilt it in Next.js, restructured the listing UX, and added live enquiry widgets. Enquiries nearly tripled in the first month.',
    company: 'Dubai Rentals Hub',
    author: 'Karim Youssef',
    authorTitle: 'Founder, Dubai Rentals Hub',
  },
  faqs: legacy.faqs,
  sections: [
    'hero',
    'techStack',
    'performanceMetrics',
    'launchChecklist',
    'features',
    'caseStudy',
    'faq',
    'cta',
  ],
  techStack: {
    kicker: 'Stack',
    title: 'Built for speed and maintainability',
    intro: 'We pick the stack for your team — performance-first when it matters, CMS-friendly when you need self-serve.',
    tools: [
      { name: 'Next.js', category: 'Framework', why: 'Server components, ISR, and Core Web Vitals out of the box.' },
      { name: 'WordPress', category: 'CMS', why: 'Familiar admin for teams who update content daily.' },
      { name: 'Vercel / managed hosting', category: 'Hosting', why: 'Global CDN, preview deploys, and SSL without ops overhead.' },
      { name: 'GA4 + pixels', category: 'Analytics', why: 'Conversion events wired before launch, not after.' },
      { name: 'Sanity / headless CMS', category: 'Optional', why: 'Structured content for bilingual UAE sites.' },
      { name: 'WooCommerce', category: 'E-commerce', why: 'When you need bookings, deposits, or product sales in one stack.' },
    ],
  },
  performanceMetrics: {
    kicker: 'Performance',
    title: 'Targets we hold every build to',
    intro: 'Fast sites rank better and convert more — especially on mobile networks your visitors use on the go.',
    metrics: [
      { value: '< 2s', label: 'Largest contentful paint', target: 'Green LCP on 4G for primary landing pages' },
      { value: '95+', label: 'Lighthouse performance', target: 'Production build, not local-only scores' },
      { value: '< 0.1', label: 'Cumulative layout shift', target: 'Stable hero and enquiry widgets on load' },
    ],
  },
  launchChecklist: {
    kicker: 'Launch',
    title: 'Nothing ships until this list is green',
    intro: 'QA across devices, markets, and tracking before the first visitor hits production.',
    groups: [
      {
        title: 'Technical',
        items: ['SSL and redirects', 'XML sitemap and robots', 'Schema for local business', '404 and search console'],
      },
      {
        title: 'Content',
        items: ['Mobile typography pass', 'Arabic/English parity if bilingual', 'Form and WhatsApp CTAs tested', 'Privacy and cookie notices'],
      },
      {
        title: 'Measurement',
        items: ['GA4 events firing', 'Meta pixel verified', 'Thank-you page goals', '30-day support window scheduled'],
      },
    ],
  },
}
