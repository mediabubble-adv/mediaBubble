import { portfolioAsset } from './portfolio-paths'

export interface PortfolioImage {
  src: string
  alt: string
  caption?: string
}

export interface BeforeAfterPair {
  before: PortfolioImage
  after: PortfolioImage
  label?: string
}

export interface CaseStudyMetric {
  value: string
  label: string
}

export interface CaseStudy {
  id: string
  tag: string
  title: string
  desc: string
  metric: string
  accent: string
  bg: string
  heroImage?: string
  heroImageAlt?: string
  gallery?: PortfolioImage[]
  beforeAfter?: BeforeAfterPair
  client: string
  duration: string
  technologies: string[]
  keyMetrics: CaseStudyMetric[]
  challenge: string
  approach: string[]
  results: string[]
  service: string
  ctaServiceSlug?: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'coral-bay',
    tag: 'SEO + Paid Advertising',
    title: 'How Coral Bay Resort Grew Direct Bookings by 68%',
    desc: 'Coral Bay was over-reliant on OTA commissions and invisible in organic search. We built an end-to-end strategy: technical SEO, Google Ads, and a conversion-optimised landing page.',
    metric: '68% increase in direct bookings within 6 months',
    accent: '#2196F3',
    bg: '#EBF5FB',
    heroImage: portfolioAsset('coral-bay', 'hero'),
    heroImageAlt: 'Coral Bay Resort pool and sea view at sunset, Dubai',
    gallery: [
      { src: portfolioAsset('coral-bay', 'gallery-1'), alt: 'Resort exterior with palm trees and Arabian Gulf coastline', caption: 'Brand positioning refresh across booking touchpoints' },
      { src: portfolioAsset('coral-bay', 'gallery-2'), alt: 'Guests relaxing by the resort pool', caption: 'Paid campaigns aligned to high-intent seasonal demand' },
      { src: portfolioAsset('coral-bay', 'gallery-3'), alt: 'Aerial view of beachfront resort property', caption: 'Direct booking landing page with OTA price-match messaging' },
    ],
    beforeAfter: {
      label: 'Booking funnel before and after our engagement',
      before: { src: portfolioAsset('coral-bay', 'before'), alt: 'Generic hotel room before repositioning and direct-booking focus' },
      after: { src: portfolioAsset('coral-bay', 'after'), alt: 'Premium resort experience after brand and conversion overhaul' },
    },
    client: 'Coral Bay Resort',
    duration: '6 months',
    technologies: ['Google Ads', 'GA4', 'Google Search Console', 'Next.js', 'Schema.org'],
    keyMetrics: [
      { value: '68%', label: 'Direct booking growth' },
      { value: '41%', label: 'OTA revenue share (down from 78%)' },
      { value: '3.9×', label: 'Google Ads ROAS' },
    ],
    service: 'SEO & Paid Advertising',
    ctaServiceSlug: 'seo',
    challenge:
      'Coral Bay Resort was paying 18 to 25% OTA commission on the majority of its bookings and ranked on page 3+ for every relevant search term. The marketing budget was being split between platforms with no unified strategy and no attribution in place.',
    approach: [
      'Full technical SEO audit: fixed crawl errors, Core Web Vitals, and structured data',
      'Keyword strategy targeting high-intent "book direct" and location + activity queries',
      'Google Ads campaigns with single-theme ad groups and dedicated landing pages per audience segment',
      'Retargeting sequences for OTA visitors redirected to direct booking funnel',
      'GA4 + Google Ads conversion tracking with revenue attribution',
    ],
    results: [
      '68% increase in direct bookings vs. same period prior year',
      'OTA dependency reduced from 78% to 41% of total room revenue',
      'Page 1 rankings for 34 target keywords within 5 months',
      '3.9× ROAS on Google Ads by month 4',
      '62% reduction in effective cost per booking',
    ],
  },
  {
    id: 'gulf-divers',
    tag: 'SEO & Content Marketing',
    title: '340% Organic Traffic Growth for Gulf Divers Dubai',
    desc: "Gulf Divers Dubai had a great product but zero online presence. A 12-month content and technical SEO programme pushed them to page one for every major diving keyword in Dubai.",
    metric: '340% organic traffic growth in 12 months',
    accent: '#072A6B',
    bg: '#EEF2F9',
    heroImage: portfolioAsset('gulf-divers', 'hero'),
    heroImageAlt: 'Scuba diver exploring coral reef in the Arabian Gulf, Dubai',
    gallery: [
      { src: portfolioAsset('gulf-divers', 'gallery-1'), alt: 'Underwater diving scene with vibrant coral', caption: 'Long-form guide hub targeting informational diving queries' },
      { src: portfolioAsset('gulf-divers', 'gallery-2'), alt: 'Rough sea surface before content-led visibility push', caption: 'Pre-engagement: minimal organic footprint' },
      { src: portfolioAsset('gulf-divers', 'gallery-3'), alt: 'Dive boat on calm Arabian Gulf waters', caption: 'Local SEO and review strategy for Dubai map pack' },
    ],
    beforeAfter: {
      label: 'Organic visibility transformation',
      before: { src: portfolioAsset('gulf-divers', 'before'), alt: 'Choppy choppy Gulf conditions symbolising weak search presence' },
      after: { src: portfolioAsset('gulf-divers', 'after'), alt: 'Clear underwater visibility after SEO and content programme' },
    },
    client: 'Gulf Divers Dubai',
    duration: '12 months',
    technologies: ['Ahrefs', 'Google Business Profile', 'WordPress', 'GA4', 'Surfer SEO'],
    keyMetrics: [
      { value: '340%', label: 'Organic session growth' },
      { value: '47', label: 'Page 1 keywords' },
      { value: '28%', label: 'Bookings from organic' },
    ],
    service: 'SEO & Content Marketing',
    ctaServiceSlug: 'seo',
    challenge:
      'Gulf Divers Dubai had 14 years of operating experience but virtually no digital presence. Competitors with inferior product were outranking them on every relevant search. The existing website had duplicate content, missing meta tags, and no internal linking structure.',
    approach: [
      'Complete site architecture rebuild with topic clustering for diving categories',
      'Content calendar targeting 60 keywords across informational and transactional intent',
      '24 long-form guide articles published over 12 months',
      'Local SEO: Google Business Profile optimisation, citation building, and review strategy',
      'Link building through diving industry partnerships and guest content',
    ],
    results: [
      '340% increase in organic sessions year-on-year',
      'Page 1 rankings for 47 target keywords',
      '#1 for "diving Dubai" and "scuba diving Arabian Gulf" within 9 months',
      '28% of online bookings now attributed to organic search (up from 3%)',
      '4.7-star average Google rating with 200+ new reviews',
    ],
  },
  {
    id: 'aqua-sports',
    tag: 'Branding & Web Development',
    title: 'Rebranding Aqua Sports UAE: 2× Lead Volume',
    desc: 'A full rebrand, new website, and CRM integration transformed Aqua Sports from a locally-known operator to a regionally recognised brand. Lead volume doubled in the first quarter.',
    metric: '2× lead volume in the first quarter post-launch',
    accent: '#1565C0',
    bg: '#E8EEF7',
    heroImage: portfolioAsset('aqua-sports', 'hero'),
    heroImageAlt: 'Watersports action shot with kite and wakeboard on Arabian Gulf',
    gallery: [
      { src: portfolioAsset('aqua-sports', 'gallery-1'), alt: 'Branded watersports website hero on mobile and desktop', caption: 'Next.js site with service-specific enquiry flows' },
      { src: portfolioAsset('aqua-sports', 'gallery-2'), alt: 'Legacy watersports collateral before rebrand', caption: 'Inconsistent identity across print and digital' },
      { src: portfolioAsset('aqua-sports', 'gallery-3'), alt: 'Team delivering watersports experience on the beach', caption: 'HubSpot CRM with WhatsApp instant response' },
    ],
    beforeAfter: {
      label: 'Brand and digital presence',
      before: { src: portfolioAsset('aqua-sports', 'before'), alt: 'Outdated watersports branding before redesign' },
      after: { src: portfolioAsset('aqua-sports', 'after'), alt: 'Modern Aqua Sports brand identity and web experience' },
    },
    client: 'Aqua Sports UAE',
    duration: '3 months',
    technologies: ['Next.js', 'HubSpot', 'WhatsApp Business', 'Figma', 'Vercel'],
    keyMetrics: [
      { value: '2×', label: 'Lead volume Q1' },
      { value: '91', label: 'Lighthouse score' },
      { value: '18 min', label: 'Avg. response time' },
    ],
    service: 'Branding & Web Development',
    ctaServiceSlug: 'branding',
    challenge:
      'Aqua Sports had strong word-of-mouth locally but struggled to compete digitally against international operators. Their branding was inconsistent across touchpoints, the website was built on an outdated CMS, and there was no way to capture or track enquiries.',
    approach: [
      'Brand identity: new logo, colour system, typography, and tone-of-voice guidelines',
      'Website redesign on Next.js with dedicated service pages, photo galleries, and booking request forms',
      'CRM integration (HubSpot) with automated follow-up sequences',
      'Conversion rate optimisation: A/B tested hero copy, CTAs, and form layout',
      'WhatsApp Business integration for instant lead response',
    ],
    results: [
      '2× lead volume in Q1 post-launch vs. the prior year equivalent',
      'Average enquiry response time reduced from 6 hours to 18 minutes',
      'Website Lighthouse score improved from 41 to 91',
      '34% increase in average enquiry-to-booking conversion rate',
      'Brand recognition study showed 58% unaided recall among target segment (up from 12%)',
    ],
  },
  {
    id: 'desert-rose',
    tag: 'Social Media Marketing',
    title: 'Desert Rose Hotel: 4.8× Instagram Engagement',
    desc: "We took Desert Rose's social presence from sporadic posts to a consistent, high-engagement content calendar that built a loyal community and drove measurable room enquiries.",
    metric: '4.8× engagement rate vs. industry average',
    accent: '#FFC107',
    bg: '#FFFBEA',
    heroImage: portfolioAsset('desert-rose', 'hero'),
    heroImageAlt: 'Desert Rose Hotel exterior with pool and palm garden',
    gallery: [
      { src: portfolioAsset('desert-rose', 'gallery-1'), alt: 'Luxury hotel pool area at golden hour', caption: 'On-site photography replacing stock imagery' },
      { src: portfolioAsset('desert-rose', 'gallery-2'), alt: 'Hotel room interior with neutral decor', caption: 'Before: generic room shots in feed' },
      { src: portfolioAsset('desert-rose', 'gallery-3'), alt: 'Minimal hotel bedroom before content refresh', caption: 'Content audit baseline' },
    ],
    beforeAfter: {
      label: 'Social content quality shift',
      before: { src: portfolioAsset('desert-rose', 'before'), alt: 'Plain hotel room photo used in old social posts' },
      after: { src: portfolioAsset('desert-rose', 'after'), alt: 'Polished resort imagery after content production' },
    },
    client: 'Desert Rose Hotel',
    duration: '8 months',
    technologies: ['Instagram', 'TikTok', 'Meta Business Suite', 'Canva', 'Later'],
    keyMetrics: [
      { value: '4.8×', label: 'Engagement vs. average' },
      { value: '11.4k', label: 'Instagram followers' },
      { value: '62', label: 'DM booking enquiries (month 6)' },
    ],
    service: 'Social Media Marketing',
    ctaServiceSlug: 'social-media',
    challenge:
      'Desert Rose was posting irregularly with stock photography and generic captions. Follower count was stagnant, reach was declining, and social channels were generating zero measurable bookings. The hotel had no content production process and no budget allocated to social.',
    approach: [
      'Content audit and competitor benchmarking across Instagram, Facebook, and TikTok',
      'Monthly content calendar with 4 content pillars: Experience, Behind the Scenes, Local Life, Offers',
      'On-site photography and videography sessions: 3 shoots in the first 6 months',
      'Community management: responding to every comment and DM within 2 hours',
      'Instagram Stories sequences driving direct message enquiries',
      'Influencer partnerships with 3 travel creators (combined 280k followers)',
    ],
    results: [
      '4.8× engagement rate vs. UAE hotel industry average',
      'Follower growth from 1,200 to 11,400 in 8 months',
      '62 direct booking enquiries attributed to Instagram DMs in month 6',
      'TikTok video reached 340k views organically',
      'Featured in 2 national travel publications via influencer content',
    ],
  },
  {
    id: 'marina-view',
    tag: 'Events & Activations',
    title: 'Marina View Residences Launch: 300 Leads in 48 Hours',
    desc: 'A high-stakes property launch required precision targeting, a purpose-built landing page, and a coordinated Meta campaign. The 48-hour campaign generated 300 qualified leads at a 4.2× ROAS.',
    metric: '300 qualified leads and 4.2× ROAS in 48 hours',
    accent: '#2196F3',
    bg: '#EBF5FB',
    heroImage: portfolioAsset('marina-view', 'hero'),
    heroImageAlt: 'Modern marina-view residential tower at dusk',
    gallery: [
      { src: portfolioAsset('marina-view', 'gallery-1'), alt: 'High-rise marina residences exterior', caption: 'Launch landing page with virtual tour gate' },
      { src: portfolioAsset('marina-view', 'gallery-2'), alt: 'Property development site before launch campaign', caption: 'Pre-launch: construction-phase awareness' },
      { src: portfolioAsset('marina-view', 'gallery-3'), alt: 'Luxury apartment interior with sea view', caption: 'Show-unit photography for Meta ad creative' },
    ],
    beforeAfter: {
      label: 'Launch campaign impact',
      before: { src: portfolioAsset('marina-view', 'before'), alt: 'Residential development under construction' },
      after: { src: portfolioAsset('marina-view', 'after'), alt: 'Completed Marina View tower after launch' },
    },
    client: 'Marina View Residences',
    duration: '48-hour launch + 2-week nurture',
    technologies: ['Meta Ads', 'WhatsApp Business API', 'Next.js', 'HubSpot', 'GA4'],
    keyMetrics: [
      { value: '300', label: 'Qualified leads' },
      { value: '4.2×', label: 'Campaign ROAS' },
      { value: '68%', label: 'Lead-to-appointment rate' },
    ],
    service: 'Events & Paid Advertising',
    ctaServiceSlug: 'paid-ads',
    challenge:
      'Marina View had a 48-hour launch window with a hard inventory constraint. The developer needed to generate enough qualified leads to fill sales appointments for the first weekend. Previous campaigns by another agency had produced low-quality leads at high cost.',
    approach: [
      'Audience strategy: custom audiences from CRM, lookalikes, and layered interest/income targeting',
      'Landing page built specifically for the launch: virtual tour, floor plan download gate, and instant WhatsApp CTA',
      'Lead quality filter: multi-step form with budget qualification before the thank-you page',
      'Real-time lead routing to sales team via WhatsApp Business API',
      'Retargeting for landing page visitors who did not convert within 6 hours',
    ],
    results: [
      '300 qualified leads in 48 hours (vs. 40 leads in 2 weeks from prior campaign)',
      '4.2× ROAS on total campaign spend',
      '68% lead-to-appointment conversion rate (vs. 12% industry benchmark)',
      '14 units reserved in the launch weekend',
      'Cost per qualified lead 71% lower than prior agency benchmark',
    ],
  },
  {
    id: 'marina-rentals',
    tag: 'Web Development + SEO',
    title: 'Marina Rentals: From 8s Load Time to 94 Lighthouse Score',
    desc: 'An outdated, slow website was killing organic rankings and conversion rates. A full rebuild on Next.js, paired with structured data and Core Web Vitals optimisation, reversed both.',
    metric: '94 Lighthouse score and 42% more organic conversions',
    accent: '#072A6B',
    bg: '#EEF2F9',
    heroImage: portfolioAsset('marina-rentals', 'hero'),
    heroImageAlt: 'Modern furnished apartment living room in Dubai',
    gallery: [
      { src: portfolioAsset('marina-rentals', 'gallery-1'), alt: 'Dated apartment listing page before rebuild', caption: 'Legacy PHP site: 8.2s load time' },
      { src: portfolioAsset('marina-rentals', 'gallery-2'), alt: 'Bright modern apartment after redesign', caption: 'Next.js rebuild with WebP image pipeline' },
      { src: portfolioAsset('marina-rentals', 'gallery-3'), alt: 'Spacious rental property interior with natural light', caption: 'Structured data for 2,000+ listings' },
    ],
    beforeAfter: {
      label: 'Site performance and presentation',
      before: { src: portfolioAsset('marina-rentals', 'before'), alt: 'Cluttered apartment interior representing slow legacy site' },
      after: { src: portfolioAsset('marina-rentals', 'after'), alt: 'Clean modern rental listing after Next.js rebuild' },
    },
    client: 'Marina Rentals',
    duration: '4 months',
    technologies: ['Next.js 14', 'Vercel', 'WebP pipeline', 'Schema.org', 'Vercel Analytics'],
    keyMetrics: [
      { value: '94', label: 'Lighthouse score' },
      { value: '1.3s', label: 'LCP (from 6.1s)' },
      { value: '42%', label: 'More organic conversions' },
    ],
    service: 'Web Development & SEO',
    ctaServiceSlug: 'web-development',
    challenge:
      'Marina Rentals had a 9-year-old PHP website with an 8.2-second average load time, Largest Contentful Paint over 6 seconds, and a Lighthouse performance score of 31. The slow site was directly suppressing Google rankings and had a bounce rate exceeding 80%.',
    approach: [
      'Full rebuild on Next.js 14 with App Router and React Server Components',
      'Image optimisation pipeline: WebP conversion, lazy loading, and responsive srcsets for 2,000+ property photos',
      'Structured data (Schema.org) for property listings, breadcrumbs, and local business',
      'Edge caching for property listing pages with ISR revalidation',
      'Core Web Vitals monitoring via Vercel Analytics with weekly reporting',
    ],
    results: [
      'Lighthouse performance score: 31 → 94',
      'LCP reduced from 6.1s to 1.3s',
      'Bounce rate reduced from 83% to 51%',
      '42% increase in organic search conversions (contact form + call click)',
      'Average session duration increased by 74%',
    ],
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find(cs => cs.id === slug)
}
