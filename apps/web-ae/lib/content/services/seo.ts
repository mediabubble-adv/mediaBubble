import type { ServicePageConfig } from './types'

export const seoServiceConfig: ServicePageConfig = {
  slug: 'seo',
  meta: {
    title: 'SEO & Organic Growth | MediaBubble UAE',
    description:
      'SEO for UAE businesses. Average 312% organic traffic increase in 6 months. Technical audits, Dubai local SEO, and content strategy. Get a free audit.',
  },
  hero: {
    kicker: 'SEO & Organic Growth',
    title: 'Rank on Page One — and Stay There',
    subtitle:
      'We help Dubai and UAE businesses dominate local and national search results through technical SEO, keyword strategy, and content that converts.',
    stats: [
      { value: '312%', label: 'Avg. traffic increase' },
      { value: '6 mo', label: 'Median time to page 1' },
      { value: '92%', label: 'Client retention' },
    ],
  },
  sections: [
    'hero',
    'rankingTimeline',
    'localPack',
    'auditChecklist',
    'features',
    'caseStudy',
    'faq',
    'cta',
  ],
  rankingTimeline: {
    kicker: 'Ranking trajectory',
    title: 'How rankings compound over six months',
    intro:
      'SEO is not a one-off fix. This is the typical progression we see for UAE businesses after a technical reset and local strategy.',
    highlights: [
      { value: '4–8 wks', label: 'First measurable lifts' },
      { value: '3–6 mo', label: 'Page-one movement' },
      { value: 'Month 6+', label: 'Stable rankings' },
    ],
    milestones: [
      {
        step: '01',
        signal: 'Foundation',
        title: 'Technical reset',
        description: 'Crawl fixes, Core Web Vitals, indexation cleanup, and baseline keyword tracking.',
      },
      {
        step: '02',
        signal: 'Local signals',
        title: 'Local foundations',
        description: 'Google Business Profile optimisation, NAP consistency, and UAE citation build-out.',
      },
      {
        step: '03',
        signal: 'Early wins',
        title: 'On-page wins',
        description: 'Service pages and landing pages rewritten for intent; early movement on long-tail local terms.',
      },
      {
        step: '04',
        signal: 'Momentum',
        title: 'Content velocity',
        description: 'Monthly articles and FAQ hubs targeting Emirates search demand competitors ignore.',
      },
      {
        step: '05',
        signal: 'Authority',
        title: 'Authority signals',
        description: 'White-hat links and brand mentions that reinforce trust for competitive head terms.',
      },
      {
        step: '06',
        signal: 'Outcome',
        title: 'Page-one stability',
        description: 'Sustained rankings with reporting that ties traffic to enquiries—not vanity metrics.',
      },
    ],
  },
  localPack: {
    kicker: 'Local map pack',
    title: 'Own the Dubai & UAE "near me" results',
    intro:
      'When residents and visitors search on mobile, the map pack decides who gets the call. We optimise every signal Google uses for local prominence.',
    spots: [
      {
        title: 'Google Business Profile',
        description: 'Categories, services, photos, posts, and review strategy tuned for UAE hospitality, retail, and professional services.',
        stat: '3× more calls',
      },
      {
        title: 'Emirate landing pages',
        description: 'Dubai, Abu Dhabi, and Sharjah-specific pages that match how people search across the UAE.',
        stat: '40+ terms',
      },
      {
        title: 'Citation & NAP hygiene',
        description: 'Consistent name, address, and phone across directories so Google trusts your location data.',
        stat: '50+ sources',
      },
    ],
  },
  auditChecklist: {
    kicker: 'Free audit scope',
    title: 'What we inspect before we propose a plan',
    intro:
      'Every engagement starts with a structured audit—no generic PDF. You see exactly what is blocking rankings today.',
    groups: [
      {
        title: 'Technical health',
        items: [
          'Crawl budget and indexation status',
          'Core Web Vitals and mobile usability',
          'Schema markup and site architecture',
          'HTTPS, redirects, and canonical tags',
        ],
      },
      {
        title: 'On-page quality',
        items: [
          'Title tags, meta descriptions, and heading hierarchy',
          'Search intent match per key page',
          'Thin or duplicate content flags',
          'Internal linking and orphan pages',
        ],
      },
      {
        title: 'Off-page & local',
        items: [
          'Backlink profile and toxic link review',
          'Google Business Profile completeness',
          'UAE local citation accuracy',
          'Competitor keyword gap summary',
        ],
      },
    ],
  },
  features: [
    { feature: 'Local SEO & Google Business Profile', description: 'Dominate the Dubai map pack and "near me" searches across the UAE.' },
    { feature: 'Technical SEO audit & fix', description: 'Core Web Vitals, crawlability, schema markup, and site architecture.' },
    { feature: 'Monthly keyword ranking report', description: 'Transparent data every 30 days — no fluff, just rankings and traffic.' },
    { feature: 'Competitor gap analysis', description: 'See exactly which keywords your rivals rank for that you don\'t.' },
    { feature: 'Content strategy & writing', description: 'Blog posts, service pages, and landing pages crafted for search intent.' },
    { feature: 'Link acquisition', description: 'White-hat outreach to earn backlinks that actually move the needle.' },
  ],
  caseStudy: {
    metric: '+280%',
    metricLabel: 'Organic traffic in 6 months',
    description:
      'A Dubai Marina wellness studio was buried on page three. After technical fixes, local keyword targeting, and bilingual content, they now rank on page one for 35+ fitness and spa searches in Dubai.',
    company: 'Marina Wellness Studio',
    href: '/portfolio',
    quote:
      'Our Google enquiries doubled before we spent a dirham more on ads. The monthly reports make it easy to see what is working.',
    author: 'Layla Al Mansoori',
    authorTitle: 'Founder, Marina Wellness Studio',
  },
  faqs: [
    {
      question: 'How long does SEO take to show results?',
      answer:
        'Most clients see meaningful improvements within 3–6 months. Quick wins from technical fixes and local SEO can appear in 4–8 weeks. Long-term rankings compound — the longer we work together, the stronger the moat.',
    },
    {
      question: 'Do you guarantee first-page rankings?',
      answer:
        'No one can ethically guarantee specific rankings — Google\'s algorithm evolves constantly. We do guarantee our process: thorough audits, proven techniques, and fully transparent monthly reporting so you always know what\'s happening and why.',
    },
    {
      question: 'Do you specialise in local SEO for UAE businesses?',
      answer:
        'Yes — local SEO is a core speciality. We optimise your Google Business Profile, build UAE citations, and target location-based and "near me" searches across Dubai, Abu Dhabi, and the wider Emirates.',
    },
    {
      question: 'What does your monthly SEO service include?',
      answer:
        'Every month: technical monitoring, keyword rank tracking, content publishing, link outreach, and a full report with rankings, traffic, and next steps. No fluff — just data and action.',
    },
    {
      question: 'Can you work with our existing website?',
      answer:
        'Yes. We audit and optimise any existing site regardless of platform — WordPress, Shopify, custom-built, or anything else. If a rebuild would significantly improve results, we will tell you honestly.',
    },
  ],
}
