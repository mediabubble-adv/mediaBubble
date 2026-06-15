import type { ServicePageConfig } from './types'

export const eventsServiceConfig: ServicePageConfig = {
  slug: 'events',
  meta: {
    title: 'Events & Activations | MediaBubble UAE',
    description:
      'Product launches, venue activations, and corporate events in Dubai and the UAE — creative, production, and reporting with clear ROI.',
  },
  hero: {
    kicker: 'Events & Activations',
    title: 'Events That Create Buzz and Measurable Pipeline',
    subtitle:
      'From brand launches to seasonal activations — we plan, produce, and promote experiences that generate press, footfall, and qualified leads.',
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
    intro: 'A proven sequence for UAE launches, hospitality openings, and corporate activations.',
    phases: [
      { step: 'W1', title: 'Brief & KPIs', description: 'Objectives, audience, budget guardrails, and success metrics agreed upfront.' },
      { step: 'W2', title: 'Creative concept', description: 'Theme, run-of-show, and asset list aligned to brand and venue constraints.' },
      { step: 'W3–4', title: 'Production', description: 'Vendors, permits, staging, AV, and collateral — with a single point of contact.' },
      { step: 'W5–6', title: 'Promotion', description: 'Paid social, email invites, influencer seeding, and on-venue teaser content.' },
      { step: 'W7', title: 'Rehearsal', description: 'Technical walkthrough, contingency plan, and staff briefing.' },
      { step: 'W8', title: 'Live + recap', description: 'On-site coverage, same-day social clips, and a ROI report within five business days.' },
    ],
  },
  venueShowcase: {
    kicker: 'Formats',
    title: 'Built for UAE venues',
    intro: 'Hotels, rooftops, malls, and waterfront spaces — we adapt production to the site, not the other way around.',
    venues: [
      { title: 'Brand launches', description: 'Opening nights with press, creators, and offer-linked registration flows.', capacity: '50–300 guests' },
      { title: 'Seasonal activations', description: 'National day programmes, festive campaigns, and tourism showcases.', capacity: 'Flexible formats' },
      { title: 'Corporate & MICE', description: 'Award nights, partner summits, and branded experiences for enterprise clients.', capacity: '20–500 guests' },
      { title: 'Pop-ups & tastings', description: 'F&B collaborations, chef tables, and sampling drives in high-footfall locations.', capacity: 'Intimate to mid-size' },
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
    metricLabel: 'Launch weekend — 48 hours',
    description:
      'A new waterfront venue in Dubai needed buzz beyond invitations. We produced a preview for press and creators, ran geo-targeted Meta ads, and live-posted through the night — reservations hit capacity within two days.',
    company: 'Azure Marina Lounge',
    href: '/case-studies',
    quote:
      'They handled creative, vendors, and the social coverage on opening night. Our team could focus on guests — not logistics.',
    author: 'Omar Fathy',
    authorTitle: 'Operations Director, Azure Marina Lounge',
  },
  faqs: [
    {
      question: 'What types of events do you produce?',
      answer:
        'Brand launches, hotel openings, corporate hospitality, F&B pop-ups, influencer evenings, and tourism showcases across the UAE. If it needs an audience, we can scope it.',
    },
    {
      question: 'How far in advance should we book?',
      answer:
        'Three to eight weeks depending on scale. Peak season dates fill early — we will flag realistic timelines in the first call.',
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
