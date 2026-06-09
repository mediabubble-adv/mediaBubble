export interface CaseStudy {
  id:              string
  tag:             string
  title:           string
  desc:            string
  metric:          string
  accent:          string
  bg:              string
  // Full detail fields
  challenge:       string
  approach:        string[]
  results:         string[]
  service:         string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id:      'coral-bay',
    tag:     'SEO + Paid Advertising',
    title:   'How Coral Bay Resort Grew Direct Bookings by 68%',
    desc:    'Coral Bay was over-reliant on OTA commissions and invisible in organic search. We built an end-to-end strategy — technical SEO, Google Ads, and a conversion-optimised landing page.',
    metric:  '68% increase in direct bookings within 6 months',
    accent:  '#2196F3',
    bg:      '#EBF5FB',
    service: 'SEO & Paid Advertising',
    challenge:
      "Coral Bay Resort was paying 18–25% OTA commission on the majority of its bookings and ranked on page 3+ for every relevant search term. The marketing budget was being split between platforms with no unified strategy and no attribution in place.",
    approach: [
      'Full technical SEO audit — fixed crawl errors, Core Web Vitals, and structured data',
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
    id:      'red-sea-divers',
    tag:     'SEO & Content Marketing',
    title:   '340% Organic Traffic Growth for Red Sea Divers',
    desc:    "Red Sea Divers had a great product but zero online presence. A 12-month content and technical SEO programme pushed them to page one for every major diving keyword in Hurghada.",
    metric:  '340% organic traffic growth in 12 months',
    accent:  '#072A6B',
    bg:      '#EEF2F9',
    service: 'SEO & Content Marketing',
    challenge:
      "Red Sea Divers had 14 years of operating experience but virtually no digital presence. Competitors with inferior product were outranking them on every relevant search. The existing website had duplicate content, missing meta tags, and no internal linking structure.",
    approach: [
      'Complete site architecture rebuild with topic clustering for diving categories',
      'Content calendar targeting 60 keywords across informational and transactional intent',
      '24 long-form guide articles published over 12 months',
      'Local SEO — Google Business Profile optimisation, citation building, and review strategy',
      'Link building through diving industry partnerships and guest content',
    ],
    results: [
      '340% increase in organic sessions year-on-year',
      'Page 1 rankings for 47 target keywords',
      '#1 for "diving Hurghada" and "scuba diving Red Sea" within 9 months',
      '28% of online bookings now attributed to organic search (up from 3%)',
      '4.7-star average Google rating with 200+ new reviews',
    ],
  },
  {
    id:      'aqua-sports',
    tag:     'Branding & Web Development',
    title:   'Rebranding Aqua Sports Egypt: 2× Lead Volume',
    desc:    "A full rebrand, new website, and CRM integration transformed Aqua Sports from a locally-known operator to a regionally recognised brand. Lead volume doubled in the first quarter.",
    metric:  '2× lead volume in the first quarter post-launch',
    accent:  '#1565C0',
    bg:      '#E8EEF7',
    service: 'Branding & Web Development',
    challenge:
      "Aqua Sports had strong word-of-mouth locally but struggled to compete digitally against international operators. Their branding was inconsistent across touchpoints, the website was built on an outdated CMS, and there was no way to capture or track enquiries.",
    approach: [
      'Brand identity — new logo, colour system, typography, and tone-of-voice guidelines',
      'Website redesign on Next.js with dedicated service pages, photo galleries, and booking request forms',
      'CRM integration (HubSpot) with automated follow-up sequences',
      'Conversion rate optimisation — A/B tested hero copy, CTAs, and form layout',
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
    id:      'desert-rose',
    tag:     'Social Media Marketing',
    title:   'Desert Rose Hotel: 4.8× Instagram Engagement',
    desc:    "We took Desert Rose's social presence from sporadic posts to a consistent, high-engagement content calendar that built a loyal community and drove measurable room enquiries.",
    metric:  '4.8× engagement rate vs. industry average',
    accent:  '#FFC107',
    bg:      '#FFFBEA',
    service: 'Social Media Marketing',
    challenge:
      "Desert Rose was posting irregularly with stock photography and generic captions. Follower count was stagnant, reach was declining, and social channels were generating zero measurable bookings. The hotel had no content production process and no budget allocated to social.",
    approach: [
      'Content audit and competitor benchmarking across Instagram, Facebook, and TikTok',
      'Monthly content calendar with 4 content pillars: Experience, Behind the Scenes, Local Life, Offers',
      'On-site photography and videography sessions — 3 shoots in the first 6 months',
      'Community management — responding to every comment and DM within 2 hours',
      'Instagram Stories sequences driving direct message enquiries',
      'Influencer partnerships with 3 travel creators (combined 280k followers)',
    ],
    results: [
      '4.8× engagement rate vs. Hurghada hotel industry average',
      'Follower growth from 1,200 to 11,400 in 8 months',
      '62 direct booking enquiries attributed to Instagram DMs in month 6',
      'TikTok video reached 340k views organically',
      'Featured in 2 national travel publications via influencer content',
    ],
  },
  {
    id:      'marina-view',
    tag:     'Events & Activations',
    title:   'Marina View Residences Launch: 300 Leads in 48 Hours',
    desc:    "A high-stakes property launch required precision targeting, a purpose-built landing page, and a coordinated Meta campaign. The 48-hour campaign generated 300 qualified leads at a 4.2× ROAS.",
    metric:  '300 qualified leads and 4.2× ROAS in 48 hours',
    accent:  '#2196F3',
    bg:      '#EBF5FB',
    service: 'Events & Paid Advertising',
    challenge:
      "Marina View had a 48-hour launch window with a hard inventory constraint. The developer needed to generate enough qualified leads to fill sales appointments for the first weekend. Previous campaigns by another agency had produced low-quality leads at high cost.",
    approach: [
      'Audience strategy — custom audiences from CRM, lookalikes, and layered interest/income targeting',
      'Landing page built specifically for the launch: virtual tour, floor plan download gate, and instant WhatsApp CTA',
      'Lead quality filter — multi-step form with budget qualification before the thank-you page',
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
    id:      'hurghada-rentals',
    tag:     'Web Development + SEO',
    title:   'Hurghada Rentals: From 8s Load Time to 94 Lighthouse Score',
    desc:    "An outdated, slow website was killing organic rankings and conversion rates. A full rebuild on Next.js, paired with structured data and Core Web Vitals optimisation, reversed both.",
    metric:  '94 Lighthouse score and 42% more organic conversions',
    accent:  '#072A6B',
    bg:      '#EEF2F9',
    service: 'Web Development & SEO',
    challenge:
      "Hurghada Rentals had a 9-year-old PHP website with an 8.2-second average load time, Largest Contentful Paint over 6 seconds, and a Lighthouse performance score of 31. The slow site was directly suppressing Google rankings and had a bounce rate exceeding 80%.",
    approach: [
      'Full rebuild on Next.js 14 with App Router and React Server Components',
      'Image optimisation pipeline — WebP conversion, lazy loading, and responsive srcsets for 2,000+ property photos',
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
