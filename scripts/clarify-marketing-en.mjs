#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const root = path.resolve(import.meta.dirname, '..')
const enPath = path.join(root, 'apps/web-eg/public/locales/en/translation.json')
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'))

const CTA = 'Get your free strategy audit'

Object.assign(en.common, {
  getAudit: CTA,
  learnMore: 'See details',
  viewCaseStudies: 'View case studies',
  getStarted: 'Book a free call',
  sendMessage: 'Send message',
  readMore: 'Read article',
})
en.common.actions.submit = 'Send message'

en.nav.getAudit = CTA
en.nav.logoAlt = 'MediaBubble, Hurghada marketing agency'

Object.assign(en.hero.home, {
  subtitle:
    'From strategy to execution, we help Hurghada businesses grow faster, rank higher, and convert better.',
  description:
    'Since 2015, we have helped 200+ brands with SEO, branding, web, and paid ads. We measure outcomes, not just outputs.',
  cta: CTA,
  ctaSecondary: 'View case studies',
})

Object.assign(en.about.hero, {
  title: 'Marketing built for Hurghada businesses',
  subtitle:
    'Full-service agency helping local brands grow with clear strategy and measurable results.',
})
Object.assign(en.about.story, {
  body: 'MediaBubble started in Hurghada in 2015 with one goal: give Red Sea businesses marketing quality on par with Cairo and Dubai, without agency overhead. Today we work with hotels, restaurants, real estate, healthcare, and retail across Egypt and the Gulf.',
  body2:
    'We stay small on purpose. Every client gets a dedicated team, direct access to decision-makers, and reporting you can act on.',
})
Object.assign(en.about.values.creative, {
  def: 'Work that earns attention because it is clear, on-brand, and built to convert.',
})
Object.assign(en.about.values.strategic, {
  def: 'Every decision ties to a goal. We align creative, copy, and media to what you need to achieve.',
})
Object.assign(en.about.values.dataDriven, {
  def: 'We set targets before we spend. Campaigns tie to revenue, leads, or bookings you can track.',
})

en.services.hero.subtitle =
  'SEO, branding, web, content, and paid ads. One team, one plan, clear reporting.'
en.services.web.description =
  'Fast, mobile-first websites built to convert visitors into leads and bookings.'
en.services.content.description =
  'Blog posts, social content, and email that bring the right traffic and keep your audience engaged.'
en.services.events.description =
  'Event branding, promotion, and on-site coverage that fills venues and builds your reputation.'
en.services.seo.description = en.services.seo.description.replace(
  ' on the first page of Google — where',
  ' on the first page of Google, where',
)
en.services.cta.primary = CTA
en.services.cta.secondary = 'View case studies'

Object.assign(en.process.heading, {
  kicker: 'How we work',
  title: 'Four steps from brief to results',
  subtitle:
    'Discovery, strategy, build, and launch. Each step has a clear deliverable and owner.',
})
Object.assign(en.process.step1, {
  title: 'Discovery',
  description:
    'We audit your market, competitors, and current marketing. You get a written brief with priorities and quick wins.',
})
Object.assign(en.process.step2, {
  title: 'Strategy',
  description:
    'We define goals, channels, budget, and KPIs. You approve the plan before we build anything.',
})
Object.assign(en.process.step3, {
  title: 'Build',
  description:
    'Design, content, ads, and development run in parallel with weekly check-ins and shared timelines.',
})
Object.assign(en.process.step4, {
  title: 'Launch and grow',
  description:
    'We go live, track performance, and optimize monthly. You get reports you can use in board meetings.',
})
en.process.footer.tagline = 'Ready to start? Book your free strategy audit.'

Object.assign(en.showcase.heading, {
  kicker: 'Selected work',
  title: 'Recent client results',
  subtitle: 'Three Hurghada businesses. Real metrics from live campaigns.',
})
Object.assign(en.showcase.project1, {
  poeticTitle: 'Coral Bay Resort',
  description:
    'SEO and paid search for a 4-star hotel chain. Direct bookings up 68% in six months.',
  metric: '68% increase in direct bookings',
})
Object.assign(en.showcase.project2, {
  poeticTitle: 'Red Sea Divers',
  description:
    'Local SEO and content marketing. Organic traffic up 340% in eight months.',
  metric: '340% organic traffic growth',
})
Object.assign(en.showcase.project3, {
  poeticTitle: 'Aqua Sports Egypt',
  description:
    'Brand refresh and new website. Lead volume doubled in the first quarter.',
  metric: '2× lead volume in first quarter',
})
en.showcase.cta.explore = 'View case study'
en.showcase.cta.viewAll = 'View all case studies'

en.portfolio.empty.body =
  'We are preparing new case studies. Check back soon or contact us to discuss your project.'
en.portfolio.cta.primary = CTA

en.blog.hero.subtitle =
  'Practical marketing advice for Hurghada and Red Sea businesses. No fluff.'
en.blog.newsletter.body =
  'Monthly tips, local case studies, and strategy breakdowns in your inbox. No spam.'
en.blog.empty.body = 'Check back soon. We publish new content every week.'

Object.assign(en.contact.hero, {
  subtitle:
    'Tell us about your business. We will review your marketing and reply within one business day.',
})
Object.assign(en.contact.form, {
  submit: 'Send message',
  submitting: 'Sending…',
  sending: 'Sending…',
  required: 'Please fill in this field',
  invalidEmail: 'Enter a valid email address',
  successHeading: "We'll be in touch soon",
  successBody: 'Thanks for reaching out. We typically respond within one business day.',
  errorHeading: 'Something went wrong',
  errorBody: "We couldn't send your message. Try again or email us directly.",
  optional: 'optional',
  firstNamePlaceholder: 'First name',
  lastNamePlaceholder: 'Last name',
  emailPlaceholder: 'you@yourbusiness.com',
  phonePlaceholder: '+20 1xx xxx xxxx',
  serviceLabel: 'What can we help with?',
  servicePlaceholder: 'Select a service',
  messagePlaceholder: 'Tell us about your business and goals',
  error: {
    required: 'Please fill in this field',
    email: 'Enter a valid email address',
  },
})
Object.assign(en.contact.info, {
  kicker: "Let's talk",
  title: CTA,
  subtitle:
    'Tell us about your business. We will review your current marketing and reply with a prioritised plan. Free, no commitment.',
  emailLabel: 'Email',
  phoneLabel: 'Phone',
  addressLabel: 'Office',
  hoursLabel: 'Hours',
  hours: 'Sunday to Thursday, 9 AM to 6 PM (EET)',
})
en.contact.error = {
  title: 'Something went wrong',
  body: "We couldn't send your message. Try again or email us directly.",
  retry: 'Try again',
}
en.contact.success = {
  title: "We'll be in touch soon",
  body: 'Thanks for reaching out. We typically respond within one business day.',
}

en.footer.company.tagline =
  'Hurghada marketing agency. SEO, branding, web, and ads with results you can measure.'

Object.assign(en.seo.home, {
  title: 'MediaBubble | Hurghada Marketing Agency',
  description:
    'Full-service marketing agency in Hurghada, Egypt. SEO, branding, web development, and paid advertising for Red Sea businesses.',
})
en.seo.home.description = en.seo.home.description.replace(' — ', ', ')
en.seo.about.description =
  'Meet the MediaBubble team. Hurghada marketing experts helping Red Sea businesses grow since 2015.'

Object.assign(en.errors['404'], {
  heading: 'This page moved or never existed',
  body: 'The page you are looking for may have moved or been removed. Head back to the homepage.',
})
en.errors.form.required = 'Please fill in this field'
en.errors.form.email = 'Enter a valid email address'

Object.assign(en.cta, {
  primary: CTA,
  secondary: 'View case studies',
  audit: CTA,
})

en.cookieConsent = {
  title: 'We use cookies',
  body: 'We use cookies to improve your experience, analyze traffic, and remember your language preference.',
  learnMore: 'Cookie policy',
  accept: 'Accept',
  decline: 'Decline',
  close: 'Close',
}

function stripEmDashInStrings(obj) {
  if (typeof obj === 'string') {
    return obj
      .replace(/\s*[—–]\s*/g, (m) => (m.includes('–') && /\d/.test(obj) ? ' to ' : ', '))
      .replace(/ — /g, ', ')
      .replace(/—/g, ', ')
      .replace(/–/g, ' to ')
  }
  if (Array.isArray(obj)) return obj.map(stripEmDashInStrings)
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) obj[k] = stripEmDashInStrings(obj[k])
  }
  return obj
}

// Light em-dash cleanup on remaining strings (preserve budget ranges like $500 – $1,000)
const cleaned = stripEmDashInStrings(en)
// Fix double commas from aggressive replace
const json = JSON.stringify(cleaned, null, 2).replace(/, ,/g, ', ') + '\n'
fs.writeFileSync(enPath, json)
console.log('Wrote', enPath)
