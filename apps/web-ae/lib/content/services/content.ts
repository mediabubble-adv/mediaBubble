import type { ServicePageConfig } from './types'

export const contentServiceConfig: ServicePageConfig = {
  slug: 'content',
  meta: {
    title: 'Content Marketing | MediaBubble UAE',
    description:
      'Editorial content for UAE brands — blogs, guides, email, and SEO articles that drive enquiries. Strategy, production, and distribution.',
  },
  hero: {
    kicker: 'Content Marketing',
    title: 'Content That Ranks, Educates, and Converts',
    subtitle:
      'We plan and produce editorial content for Dubai and UAE businesses — aligned to search intent, campaigns, and the channels you already use.',
    stats: [
      { value: '12+', label: 'Articles / month (avg.)' },
      { value: '3', label: 'Languages supported' },
      { value: '8 wk', label: 'Typical time to rank long-tail' },
    ],
  },
  sections: [
    'hero',
    'editorialPillars',
    'distributionMap',
    'features',
    'caseStudy',
    'faq',
    'cta',
  ],
  editorialPillars: {
    kicker: 'Editorial pillars',
    title: 'Three content lanes that compound',
    intro: 'Random posts do not build authority. We anchor every piece to pillars that match how UAE audiences research and decide.',
    pillars: [
      {
        title: 'Category guides',
        description: 'Evergreen hubs that capture informational search and internal-link to money pages.',
        examples: ['Dubai neighbourhood guides', 'Free-zone vs. mainland explainers', 'Hospitality trend round-ups'],
      },
      {
        title: 'Offer & proof',
        description: 'Campaign landing support, case snippets, and comparison content that shortens the decision.',
        examples: ['Seasonal package explainers', 'Service tier comparisons', 'Client story spotlights'],
      },
      {
        title: 'Trust & expertise',
        description: 'FAQ hubs, policy explainers, and expert-authored pieces that answer objections before sales calls.',
        examples: ['Compliance and licensing explainers', 'Sustainability initiatives', 'Leadership thought leadership'],
      },
    ],
  },
  distributionMap: {
    kicker: 'Distribution',
    title: 'One brief, many surfaces',
    intro: 'Every article is planned with reuse in mind — site, email, social, and local listings.',
    channels: [
      { channel: 'Website / blog', format: 'Long-form + FAQ blocks', cadence: '2–4 posts / month' },
      { channel: 'Email', format: 'Digest + offer modules', cadence: 'Bi-weekly or monthly' },
      { channel: 'Social', format: 'Carousels + Reels scripts', cadence: 'Repurpose per calendar' },
      { channel: 'Google Business', format: 'Posts + Q&A seeds', cadence: 'Weekly' },
      { channel: 'Sales enablement', format: 'PDF one-pagers', cadence: 'Per campaign' },
    ],
  },
  features: [
    { feature: 'Editorial strategy & calendar', description: 'Quarterly plan tied to campaigns, offers, and SEO gaps.' },
    { feature: 'SEO-informed briefs', description: 'Keyword intent, structure, and internal links baked into every outline.' },
    { feature: 'Copywriting & localisation', description: 'English and Arabic support for UAE and Gulf audiences.' },
    { feature: 'Visual direction', description: 'Shot lists and design pairing so posts look as strong as they read.' },
    { feature: 'Content refresh programme', description: 'Update legacy pages that still get traffic but under-convert.' },
    { feature: 'Performance reporting', description: 'Rankings, traffic, and assisted conversions — not vanity word counts.' },
  ],
  caseStudy: {
    metric: '+214%',
    metricLabel: 'Organic blog traffic in 9 months',
    description:
      'A Dubai hospitality group had thin blog content and weak internal linking. We rebuilt pillar pages, published bilingual guides, and synced posts to email — organic enquiries from content rose 214% year-on-year.',
    company: 'Palm Vista Hotels',
    href: '/case-studies',
    quote:
      'Content used to be an afterthought. Now our guides rank and sales recognises leads who discovered us through the blog.',
    author: 'Nadia El-Sayed',
    authorTitle: 'Marketing Manager, Palm Vista Hotels',
  },
  faqs: [
    {
      question: 'How is content marketing different from social media management?',
      answer:
        'Social is cadence and community on platforms you do not own. Content marketing builds durable assets on your site (and email) that rank in search and nurture leads over months. We often do both, but the goals and metrics differ.',
    },
    {
      question: 'Do you write in Arabic as well as English?',
      answer:
        'Yes — we produce bilingual or Arabic-first content for UAE audiences, with hreflang and RTL considerations handled in the brief.',
    },
    {
      question: 'Can you work with our in-house creative team?',
      answer:
        'Absolutely. We provide shot lists and art direction; your team captures assets and we handle post-production pairing in the layout.',
    },
    {
      question: 'How do you measure content ROI?',
      answer:
        'We track rankings, organic traffic, assisted conversions, and enquiry sources. Monthly reports tie articles to measurable outcomes — not just published word counts.',
    },
    {
      question: 'Do you repurpose blog content for social?',
      answer:
        'Yes — every long-form piece includes a repurpose plan (carousels, Reels scripts, email snippets) so production cost is amortised across channels.',
    },
  ],
}
