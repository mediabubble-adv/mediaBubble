export interface ServiceData {
  slug: string
  meta: { title: string; description: string }
  hero: {
    kicker: string
    title: string
    subtitle: string
    stats: Array<{ value: string; label: string }>
  }
  problems: Array<{ title: string; description: string }>
  process: Array<{ step: number; title: string; description: string }>
  features: Array<{ feature: string; description: string }>
  caseStudy: {
    metric: string
    metricLabel: string
    description: string
    company: string
    href?: string
    quote: string
    author: string
    authorTitle: string
  }
  faqs: Array<{ question: string; answer: string }>
}

export const SERVICES: Record<string, ServiceData> = {
  seo: {
    slug: 'seo',
    meta: {
      title: 'SEO & Organic Growth | MediaBubble UAE',
      description:
        'SEO for UAE businesses. Average 312% organic traffic increase in 6 months. Technical audits, local SEO, and content strategy. Get a free audit.',
    },
    hero: {
      kicker: 'SEO & Organic Growth',
      title: 'Rank on Page One — and Stay There',
      subtitle:
        'We help UAE businesses dominate local and national search results through technical SEO, keyword strategy, and content that converts.',
      stats: [
        { value: '312%', label: 'Avg. traffic increase' },
        { value: '6 mo', label: 'Median time to page 1' },
        { value: '92%', label: 'Client retention' },
      ],
    },
    problems: [
      {
        title: 'Invisible to Google',
        description:
          'Your competitors show up when customers search — you don\'t. Lost visibility means lost revenue every single day.',
      },
      {
        title: 'Traffic that doesn\'t convert',
        description:
          'You\'re getting clicks but no leads. Generic traffic without search intent is wasted marketing spend.',
      },
      {
        title: 'No idea what\'s working',
        description:
          'You\'ve tried "doing SEO" but there\'s no clear report showing what changed and why. You\'re flying blind.',
      },
    ],
    process: [
      { step: 1, title: 'Technical Audit', description: 'We crawl your site to uncover crawl errors, slow pages, broken links, and structural issues blocking your rankings.' },
      { step: 2, title: 'Keyword Research', description: 'Map high-intent keywords your customers actually use — including local Dubai terms competitors are missing.' },
      { step: 3, title: 'On-Page Optimisation', description: "Rewrite titles, meta descriptions, headings, and content to match Google's quality signals and user intent." },
      { step: 4, title: 'Content & Links', description: 'Publish authoritative content and earn backlinks that signal trust to Google — the long-term moat.' },
    ],
    features: [
      { feature: 'Local SEO & Google Business Profile', description: 'Dominate the Dubai map pack and "near me" searches.' },
      { feature: 'Technical SEO audit & fix', description: 'Core Web Vitals, crawlability, schema markup, and site architecture.' },
      { feature: 'Monthly keyword ranking report', description: 'Transparent data every 30 days — no fluff, just rankings and traffic.' },
      { feature: 'Competitor gap analysis', description: 'See exactly which keywords your rivals rank for that you don\'t.' },
      { feature: 'Content strategy & writing', description: 'Blog posts, service pages, and landing pages crafted for search intent.' },
      { feature: 'Link acquisition', description: 'White-hat outreach to earn backlinks that actually move the needle.' },
    ],
    caseStudy: {
      metric: '+312%',
      metricLabel: 'Organic traffic in 6 months',
      description:
        'Gulf Divers Dubai was invisible on Google. After a full technical overhaul, local keyword strategy, and monthly content, they now own the first page for 40+ dive-related searches in Dubai.',
      company: 'Gulf Divers Dubai',
      href: '/case-studies',
      quote:
        'Within 3 months we were getting more enquiries from Google than all our social media combined. The ROI is undeniable.',
      author: 'Ahmed Hassan',
      authorTitle: 'Owner, Gulf Divers Dubai',
    },
    faqs: [
      {
        question: 'How long does SEO take to show results?',
        answer: 'Most clients see meaningful improvements within 3–6 months. Quick wins from technical fixes and local SEO can appear in 4–8 weeks. Long-term rankings compound — the longer we work together, the stronger the moat.',
      },
      {
        question: 'Do you guarantee first-page rankings?',
        answer: 'No one can ethically guarantee specific rankings — Google\'s algorithm evolves constantly. We do guarantee our process: thorough audits, proven techniques, and fully transparent monthly reporting so you always know what\'s happening and why.',
      },
      {
        question: 'Do you specialise in local SEO for UAE businesses?',
        answer: 'Yes — local SEO is a core speciality. We optimise your Google Business Profile, build local citations, and target location-based and "near me" searches that your customers are already making.',
      },
      {
        question: 'What does your monthly SEO service include?',
        answer: 'Every month: technical monitoring, keyword rank tracking, content publishing, link outreach, and a full report with rankings, traffic, and next steps. No fluff — just data and action.',
      },
      {
        question: 'Can you work with our existing website?',
        answer: 'Yes. We audit and optimise any existing site regardless of platform — WordPress, Shopify, custom-built, or anything else. If a rebuild would significantly improve results, we will tell you honestly.',
      },
    ],
  },

  ppc: {
    slug: 'ppc',
    meta: {
      title: 'Paid Advertising (PPC) | MediaBubble UAE',
      description:
        'Google and Meta ad campaigns for UAE businesses. Average 4.2× ROAS within 90 days. Transparent reporting, no surprises. Get a free audit today.',
    },
    hero: {
      kicker: 'Paid Advertising (PPC)',
      title: 'Ads That Pay for Themselves',
      subtitle:
        'We run Google, Meta, and display campaigns that target buyers at the exact moment they\'re ready — with creative that converts and budgets that scale.',
      stats: [
        { value: '4.2×', label: 'Average ROAS' },
        { value: '38%', label: 'Lower CPL vs. industry avg.' },
        { value: '500+', label: 'Campaigns managed' },
      ],
    },
    problems: [
      {
        title: 'Budget disappearing with nothing to show',
        description:
          'You\'re spending on ads but the leads aren\'t coming. Broad targeting and weak creative burn through money fast.',
      },
      {
        title: 'No visibility into performance',
        description:
          'You can\'t tell which ad, audience, or keyword is driving results. Without data you can\'t optimise.',
      },
      {
        title: 'Agency set-and-forget',
        description:
          'Your current agency launched campaigns months ago and hasn\'t touched them since. Stale ads see declining performance.',
      },
    ],
    process: [
      { step: 1, title: 'Account Audit', description: 'Review existing campaigns, ad spend history, and conversion tracking. Identify waste and quick wins immediately.' },
      { step: 2, title: 'Strategy & Creative', description: 'Build audience segments, keyword lists, and ad creative aligned to your funnel stage and customer intent.' },
      { step: 3, title: 'Launch & Optimise', description: 'Go live with tight budgets, then iterate daily on bids, copy, and audiences using real conversion data.' },
      { step: 4, title: 'Scale Winners', description: 'Once we find what converts, we scale budget into proven campaigns while killing underperformers.' },
    ],
    features: [
      { feature: 'Google Search & Performance Max', description: 'Capture high-intent searches at the moment buyers are ready.' },
      { feature: 'Meta Ads (Facebook & Instagram)', description: 'Prospecting and retargeting across the world\'s largest social graph.' },
      { feature: 'Conversion tracking setup', description: 'Every click, call, and form submission tracked back to spend.' },
      { feature: 'A/B ad creative testing', description: 'Systematic testing of headlines, images, and CTAs to lower your CPL.' },
      { feature: 'Audience research & segmentation', description: 'Custom audiences, lookalikes, and retargeting windows built for your funnel.' },
      { feature: 'Weekly performance reports', description: 'Real numbers — impressions, clicks, conversions, ROAS — every week.' },
    ],
    caseStudy: {
      metric: '4.8×',
      metricLabel: 'Return on ad spend (ROAS)',
      description:
        'Aqua Sports UAE was spending 8,000 AED/month on Meta Ads with minimal bookings. After restructuring campaigns, building retargeting audiences, and refreshing creative, they hit 4.8× ROAS within 60 days.',
      company: 'Aqua Sports UAE',
      href: '/case-studies',
      quote:
        'We were about to give up on Meta Ads entirely. MediaBubble turned the account around in two months. Our cost per booking dropped by half.',
      author: 'Sara Khalil',
      authorTitle: 'Marketing Director, Aqua Sports UAE',
    },
    faqs: [
      {
        question: 'What ad platforms do you manage?',
        answer: 'Google Search, Google Display, Google Shopping, Meta (Facebook & Instagram), and YouTube. We recommend the right mix based on where your customers are and what your budget can support.',
      },
      {
        question: 'What\'s the minimum ad spend to get started?',
        answer: 'We recommend a minimum of 3,000–5,000 AED/month in ad spend. Below that, data accumulates too slowly to optimise effectively and results become inconsistent.',
      },
      {
        question: 'How do you report on campaign performance?',
        answer: 'Weekly performance summaries plus a live dashboard updated daily. ROAS, CPL, impressions, clicks, and conversions — all visible at any time. No waiting for a monthly PDF to know what\'s happening.',
      },
      {
        question: 'Is your management fee separate from the ad spend?',
        answer: 'Yes — always. Our management fee is charged separately, so 100% of your ad budget goes directly to the platforms. We never take a percentage of spend as our fee.',
      },
      {
        question: 'How quickly will I see results from PPC?',
        answer: 'Most clients see meaningful data within the first 30 days. ROAS typically improves significantly in months 2–3 as we optimise based on real conversion data from your specific audience.',
      },
    ],
  },

  social: {
    slug: 'social',
    meta: {
      title: 'Social Media Marketing | MediaBubble UAE',
      description:
        'Social media management for tourism and hospitality brands in the UAE. Content calendars, community management, and paid social. Talk to our team today.',
    },
    hero: {
      kicker: 'Social Media Marketing',
      title: 'Build a Community That Actually Buys',
      subtitle:
        'We manage your social presence end-to-end — strategy, content creation, posting, and community management — so you can focus on running your business.',
      stats: [
        { value: '2.4×', label: 'Avg. engagement rate lift' },
        { value: '10k+', label: 'Followers grown for clients' },
        { value: '30 days', label: 'Content calendar ahead' },
      ],
    },
    problems: [
      {
        title: 'Posting without a strategy',
        description:
          'Random posts get random results. Without a content strategy tied to business goals, social media is just noise.',
      },
      {
        title: 'No time to be consistent',
        description:
          'You know consistency matters but between running the business, social falls off every week.',
      },
      {
        title: 'Followers but no sales',
        description:
          'You have an audience but they\'re not converting. Engagement without conversion is a vanity metric.',
      },
    ],
    process: [
      { step: 1, title: 'Audit & Strategy', description: 'Review current accounts, audience, and competitors. Build a 90-day content strategy aligned to your business goals.' },
      { step: 2, title: 'Content Production', description: 'Design, write, and produce photos, graphics, reels, and captions — a full 30-day calendar approved in advance.' },
      { step: 3, title: 'Publish & Engage', description: 'Post at optimal times, respond to comments and DMs, and actively grow your community.' },
      { step: 4, title: 'Report & Iterate', description: 'Monthly performance report with reach, engagement, follower growth, and content learnings for next month.' },
    ],
    features: [
      { feature: 'Instagram, Facebook & TikTok management', description: 'Platform-native content tailored to each audience.' },
      { feature: 'Professional content creation', description: 'Photography, graphic design, video editing, and copywriting included.' },
      { feature: '30-day content calendar', description: 'Full month of content approved before a single post goes live.' },
      { feature: 'Community management', description: 'Comments and DMs answered promptly to build trust and drive conversions.' },
      { feature: 'Hashtag and SEO strategy', description: 'Optimised discovery so new audiences find you organically.' },
      { feature: 'Monthly analytics report', description: 'Reach, impressions, engagement rate, and follower growth every month.' },
    ],
    caseStudy: {
      metric: '+287%',
      metricLabel: 'Engagement rate in 90 days',
      description:
        'Desert Rose Hotel had 1,200 Instagram followers with near-zero engagement. A consistent visual identity, Reels strategy, and community management drove 287% engagement growth and a 40% increase in direct booking enquiries.',
      company: 'Desert Rose Hotel',
      href: '/case-studies',
      quote:
        'Our Instagram now looks like a proper hotel brand. Guests tell us they booked because of our social — that never happened before.',
      author: 'Mona Farid',
      authorTitle: 'General Manager, Desert Rose Hotel',
    },
    faqs: [
      {
        question: 'Which social media platforms do you manage?',
        answer: 'Instagram, Facebook, TikTok, and LinkedIn. We focus on the platforms where your customers actually spend time — not all of them at once. We will recommend the right mix after reviewing your business and audience.',
      },
      {
        question: 'How many posts per month do you publish?',
        answer: 'Typically 16–20 posts per month across your primary platforms. This includes Reels, Stories, carousels, and static posts — the mix depends on what your audience responds to.',
      },
      {
        question: 'Is content creation included, or just scheduling?',
        answer: 'Everything is included: photography, graphic design, short-form video editing, and copywriting. You get a full content production service, not just a posting tool.',
      },
      {
        question: 'Can I approve content before it goes live?',
        answer: 'Always. We share a complete 30-day content calendar for your review and approval before a single post is published. You have final say on every piece of content.',
      },
      {
        question: 'What does community management cover?',
        answer: 'Responding to comments and DMs, proactively engaging with relevant accounts, flagging reviews, and growing your audience through genuine interaction. We represent your brand online as if we were in-house.',
      },
    ],
  },

  branding: {
    slug: 'branding',
    meta: {
      title: 'Branding & Design | MediaBubble UAE',
      description:
        'Brand strategy, logo design, and visual identity for UAE businesses. 150+ brands created since 2015. Build an identity that commands premium pricing.',
    },
    hero: {
      kicker: 'Branding & Design',
      title: 'A Brand That Works as Hard as You Do',
      subtitle:
        'We build brand identities from strategy through to final assets — logo, colour, typography, tone of voice, and everything in between.',
      stats: [
        { value: '150+', label: 'Brands created' },
        { value: '98%', label: 'Client satisfaction' },
        { value: '3 wks', label: 'Avg. delivery time' },
      ],
    },
    problems: [
      {
        title: 'Looks unprofessional',
        description:
          'Your logo was made in a hurry and your materials don\'t match. Inconsistency signals low quality before you\'ve said a word.',
      },
      {
        title: 'No differentiation',
        description:
          'You look like every other agency or hotel in town. Without a distinct identity, price becomes the only decision factor.',
      },
      {
        title: 'Outdated identity',
        description:
          'Your brand made sense 10 years ago but the market has moved. An outdated look is losing you customers silently.',
      },
    ],
    process: [
      { step: 1, title: 'Discovery Workshop', description: 'Deep-dive into your goals, audience, competitors, and values. We find what makes you genuinely different.' },
      { step: 2, title: 'Strategy & Positioning', description: 'Define your brand positioning, messaging pillars, and tone of voice before touching any design.' },
      { step: 3, title: 'Visual Identity Design', description: 'Logo, colour palette, typography system, and supporting visual language. Three concepts, one refined direction.' },
      { step: 4, title: 'Brand Guidelines & Handover', description: 'Complete brand book with usage rules, file exports in every format, and a 30-day support window.' },
    ],
    features: [
      { feature: 'Brand strategy & positioning', description: 'The thinking behind the look — why you exist and for whom.' },
      { feature: 'Logo design (primary + variations)', description: 'Horizontal, stacked, icon-only, and mono versions.' },
      { feature: 'Colour palette & typography', description: 'A visual system that scales from business cards to billboards.' },
      { feature: 'Brand guidelines document', description: 'The rulebook so every future touchpoint stays on-brand.' },
      { feature: 'Social media templates', description: 'Ready-to-use Canva or Figma templates for consistent posts.' },
      { feature: 'Business stationery design', description: 'Letterhead, business cards, and presentation templates.' },
    ],
    caseStudy: {
      metric: '3×',
      metricLabel: 'Perceived price increase post-rebrand',
      description:
        'Marina View Residences had an outdated identity that undersold their luxury product. After a full rebrand — new logo, photography guidelines, and brand voice — they repositioned as premium and raised rates accordingly.',
      company: 'Marina View Residences',
      href: '/case-studies',
      quote:
        'We were afraid a rebrand would confuse our regulars. Instead, it attracted exactly the higher-value guests we\'d been trying to reach.',
      author: 'Tarek Mansour',
      authorTitle: 'CEO, Marina View Residences',
    },
    faqs: [
      {
        question: 'What\'s included in a brand identity project?',
        answer: 'Discovery workshop, brand strategy document, logo (primary + variations), colour palette, typography system, brand guidelines document, and social media templates. Everything you need to launch consistently from day one.',
      },
      {
        question: 'How long does a branding project take?',
        answer: 'Typically 3–4 weeks from kickoff to final delivery. We present three initial concepts, refine your chosen direction, and hand over all files with a 30-day support window.',
      },
      {
        question: 'I already have a logo — can you just refresh it?',
        answer: 'Yes. We can extend your existing identity with a colour refresh, typography update, and brand guidelines. If your current mark is holding you back, we\'ll tell you honestly and explain why.',
      },
      {
        question: 'What file formats will I receive?',
        answer: 'SVG, PNG (transparent background), PDF, and EPS in all logo variations — horizontal, stacked, icon-only, and single-colour. Everything is export-ready for print, digital, and embroidery.',
      },
      {
        question: 'Do you offer logo design only, without the full brand strategy?',
        answer: 'Yes, though we always recommend strategy-first branding for lasting results. A logo without strategy typically needs redesigning in 2–3 years. We\'ll explain the trade-offs so you can make the right call for your budget.',
      },
    ],
  },

  web: {
    slug: 'web',
    meta: {
      title: 'Web Development | MediaBubble UAE',
      description:
        'Custom websites for UAE businesses. Sub-2s load times, 95+ Lighthouse scores, conversion-optimised design. 200+ sites delivered since 2015.',
    },
    hero: {
      kicker: 'Web Development',
      title: 'A Website That Actually Generates Business',
      subtitle:
        'We build fast, modern websites and e-commerce stores — designed to convert visitors into customers, not just look pretty.',
      stats: [
        { value: '< 2s', label: 'Avg. page load time' },
        { value: '95+', label: 'Lighthouse score' },
        { value: '200+', label: 'Sites delivered' },
      ],
    },
    problems: [
      {
        title: 'Slow and outdated',
        description:
          'A slow site loses visitors before they read your offer. Google penalises slow sites in rankings too — double damage.',
      },
      {
        title: 'Zero leads from the website',
        description:
          'You have a website but it\'s just a brochure. No clear CTAs, no tracking, no optimisation — visitors leave and you never know.',
      },
      {
        title: 'Can\'t update it yourself',
        description:
          'Every small change needs a developer. You\'re held hostage to technical dependency for basic content updates.',
      },
    ],
    process: [
      { step: 1, title: 'Discovery & Wireframes', description: 'Map user journeys, define conversion goals, and sketch page structures before writing a line of code.' },
      { step: 2, title: 'Design', description: 'High-fidelity designs in Figma aligned to your brand — desktop and mobile, approved before development begins.' },
      { step: 3, title: 'Development', description: 'Built on Next.js or WordPress with performance, SEO, and accessibility baked in from day one.' },
      { step: 4, title: 'Launch & Support', description: 'QA across devices, launch to production, and 30 days of post-launch support included.' },
    ],
    features: [
      { feature: 'Mobile-first responsive design', description: 'Looks and works perfectly on every screen size.' },
      { feature: 'Core Web Vitals optimised', description: 'LCP, FID, and CLS all green — for rankings and user experience.' },
      { feature: 'SEO-ready structure', description: 'Semantic HTML, schema markup, and clean URLs from the start.' },
      { feature: 'CMS integration', description: 'Update pages, blog posts, and products yourself — no developer needed.' },
      { feature: 'Analytics & conversion tracking', description: 'GA4, Meta Pixel, and event tracking wired up at launch.' },
      { feature: 'E-commerce (optional)', description: 'Full WooCommerce or custom store with payments, inventory, and orders.' },
    ],
    caseStudy: {
      metric: '+190%',
      metricLabel: 'Conversion rate after rebuild',
      description:
        'Marina Rentals\' old site took 8 seconds to load on mobile. We rebuilt it in Next.js, restructured the property listing UX, and added live booking widgets. Enquiries nearly tripled in the first month.',
      company: 'Marina Rentals',
      href: '/case-studies',
      quote:
        'The old site embarrassed me. The new one I\'m genuinely proud to hand out the URL. And the bookings prove it works.',
      author: 'Karim Youssef',
      authorTitle: 'Founder, Marina Rentals',
    },
    faqs: [
      {
        question: 'What platforms do you build on?',
        answer: 'Primarily Next.js for performance-first sites and WordPress for teams who need to self-manage content. We recommend the right tool based on your needs, not our preference.',
      },
      {
        question: 'How long does a website build take?',
        answer: 'A standard business site takes 4–6 weeks from design to launch. E-commerce and custom functionality typically take 8–12 weeks. We give you a fixed timeline at the start of every project.',
      },
      {
        question: 'Will I be able to update the site myself?',
        answer: 'Yes — every site we build includes a CMS so you can update text, images, blog posts, and products without touching code. We run a handover session so you\'re fully comfortable before we step back.',
      },
      {
        question: 'Does the new site come with SEO set up?',
        answer: 'Yes. Technical SEO is baked in from day one: semantic HTML, schema markup, clean URL structure, fast load times, Core Web Vitals optimisation, and all meta tags configured. You start with a solid foundation.',
      },
      {
        question: 'What happens after the site launches?',
        answer: '30 days of post-launch support is included in every project. After that, we offer ongoing maintenance and hosting packages, or hand over everything — code, credentials, and documentation — so you can self-manage.',
      },
    ],
  },
}

export function getService(slug: string): ServiceData | null {
  return SERVICES[slug] ?? null
}

export const SERVICE_SLUGS = Object.keys(SERVICES)
