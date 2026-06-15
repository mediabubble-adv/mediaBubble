import type { ServicePageConfig } from './types'

export const eventsServiceConfig: ServicePageConfig = {
  slug: 'events',
  meta: {
    title: 'Events & Activations | MediaBubble Hurghada',
    description:
      'Product launches, hotel activations, and venue fills in Hurghada — creative, production, and reporting with clear ROI.',
  },
  hero: {
    kicker: 'Events & Activations',
    title: 'Events That Fill Rooms and Move Product',
    subtitle:
      'From resort launches to seasonal activations — we plan, produce, and promote experiences that generate press, footfall, and measurable leads.',
    stats: [
      { value: '40+', label: 'Activations delivered' },
      { value: '3 wk', label: 'Typical planning lead time' },
      { value: 'Live', label: 'On-site photo + video crew' },
    ],
  },
  sections: [
    'hero',
    'eventTimeline',
    'venueShowcase',
    'features',
    'caseStudy',
    'faq',
    'cta',
  ],
  eventTimeline: {
    kicker: 'Production timeline',
    title: 'Eight weeks from brief to applause',
    intro: 'A proven sequence for hospitality launches and tourism activations in the Red Sea.',
    phases: [
      { step: 'W1', title: 'Brief & KPIs', description: 'Objectives, audience, budget guardrails, and success metrics agreed upfront.' },
      { step: 'W2', title: 'Creative concept', description: 'Theme, run-of-show, and asset list aligned to brand and venue constraints.' },
      { step: 'W3–4', title: 'Production', description: 'Vendors, permits, staging, AV, and collateral — with a single point of contact.' },
      { step: 'W5–6', title: 'Promotion', description: 'Paid social, email invites, influencer seeding, and on-property teaser content.' },
      { step: 'W7', title: 'Rehearsal', description: 'Technical walkthrough, contingency plan, and staff briefing.' },
      { step: 'W8', title: 'Live + recap', description: 'On-site coverage, same-day social clips, and a ROI report within five business days.' },
    ],
  },
  venueShowcase: {
    kicker: 'Formats',
    title: 'Built for Red Sea venues',
    intro: 'Beach clubs, marinas, rooftops, and ballroom spaces — we adapt production to the site, not the other way around.',
    venues: [
      { title: 'Resort launches', description: 'Opening weekends with press, influencers, and booking-linked offers.', capacity: '50–300 guests' },
      { title: 'Seasonal activations', description: 'Winter sun kick-offs, Eid family programmes, and dive-season openings.', capacity: 'Flexible formats' },
      { title: 'Corporate & MICE', description: 'Award nights, partner summits, and branded experiences for tourism boards.', capacity: '20–500 guests' },
      { title: 'Pop-ups & tastings', description: 'F&B collaborations, chef tables, and marina-side sampling drives.', capacity: 'Intimate to mid-size' },
    ],
  },
  features: [
    { feature: 'Concept & creative direction', description: 'Theme, visual language, and run-of-show that matches your brand.' },
    { feature: 'Vendor & venue management', description: 'Single accountable team for production, AV, and on-the-night coordination.' },
    { feature: 'Promotion & paid support', description: 'Pre-event buzz across Meta, email, and local listings.' },
    { feature: 'On-site photo & video', description: 'Same-day clips for social plus edited recap assets for sales teams.' },
    { feature: 'Guest & VIP handling', description: 'Registration flows, seating, and staff scripts for premium hospitality.' },
    { feature: 'Post-event ROI report', description: 'Attendance, leads, press reach, and social metrics in one leadership-ready deck.' },
  ],
  caseStudy: {
    metric: 'Sold out',
    metricLabel: 'Weekend launch — 48 hours',
    description:
      'A new beach club opening in Hurghada needed buzz beyond flyers. We produced a sunset preview for press and creators, ran geo-targeted Meta ads, and live-posted through the night — reservations hit capacity within two days.',
    company: 'Azure Beach Club',
    href: '/portfolio',
    quote:
      'They handled creative, vendors, and the social storm on opening night. Our team could focus on guests — not logistics.',
    author: 'Omar Fathy',
    authorTitle: 'Operations Director, Azure Beach Club',
  },
  faqs: [
    {
      question: 'What types of events do you produce?',
      answer:
        'Hotel and resort launches, seasonal activations, corporate hospitality, F&B pop-ups, influencer evenings, and tourism-board showcases. If it needs an audience in Hurghada, we can scope it.',
    },
    {
      question: 'How far in advance should we book?',
      answer:
        'Three to eight weeks depending on scale. Peak winter season dates fill early — we will flag realistic timelines in the first call.',
    },
    {
      question: 'Do you handle permits and vendors?',
      answer:
        'Yes. We coordinate local vendors, AV, staging, and venue permissions with a documented run-of-show and contingency plan.',
    },
    {
      question: 'Is promotion included?',
      answer:
        'Promotion is scoped per project — typically organic + paid social, email invites, and creator seeding. Paid media budgets are always separate and transparent.',
    },
    {
      question: 'What do we receive after the event?',
      answer:
        'Edited photo/video selects, social-ready clips, attendance and lead summary, and a short ROI report for leadership within five business days.',
    },
  ],
}
