export interface BlogPost {
  slug:      string
  category:  string
  title:     string
  excerpt:   string
  readTime:  string
  date:      string
  accent:    string
  featured?: boolean
  image?:    string
  imageAlt?: string
  imageDescription?: string
  authorId?: string
  // Full content
  intro:     string
  sections:  { heading: string; body: string }[]
  cta:       string
}

export const BLOG_CATEGORIES = [
  'All',
  'SEO',
  'Paid Ads',
  'Social Media',
  'Branding',
  'Web Development',
  'Content Marketing',
] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

export const BLOG_POSTS: BlogPost[] = [
  {
    slug:     'seo-dubai-tourism',
    category: 'SEO',
    title:    'SEO for Dubai Tourism Businesses: The 2025 Playbook',
    excerpt:  "Tourism searches in Dubai are seasonal, multilingual, and intensely competitive. Here's the exact strategy we use to put our hospitality clients on page one.",
    readTime: '8 min read',
    date:     'May 2025',
    accent:   '#2196F3',
    featured: true,
    image:    '/assets/blog/seo-dubai-tourism.webp',
    imageAlt: 'Resort pool overlooking the Arabian Gulf at sunset in Dubai',
    imageDescription: 'Featured image for SEO strategies targeting Dubai tourism businesses.',
    authorId: 'omar',
    intro:
      "Dubai's tourism market is one of the most competitive in the MENA region online. German travellers search in German. Russian visitors use Yandex as much as Google. British tourists compare on TripAdvisor before they ever visit your website. Getting SEO right here is not just about picking the right keywords, it requires a multilingual, multi-platform strategy that most generic agencies do not know how to build.",
    sections: [
      {
        heading: 'Start with search intent, not keyword volume',
        body:    "The mistake most tourism businesses make is targeting high-volume keywords with no booking intent. 'Dubai' gets 500k+ monthly searches but almost none of those people are ready to book. Instead, target layered intent: 'family-friendly hotels Dubai' or 'best diving site near Dubai' captures someone 48 to 72 hours from a decision.",
      },
      {
        heading: 'Multilingual SEO is non-negotiable',
        body:    "German, Russian, and Italian tourists represent the three largest inbound segments to Dubai. If your website is English-only, you are invisible to them in their native-language searches. The minimum viable approach: hreflang-tagged subdirectory versions in DE, RU, and IT, with properly localised copy, not Google Translate.",
      },
      {
        heading: 'Technical SEO for tourism sites',
        body:    "Large photo galleries, booking widgets, and seasonal content updates create specific technical challenges. Key priorities: image compression (WebP, lazy loading), canonical tags for date-filtered booking pages, and structured data (Hotel, TouristAttraction, LocalBusiness schema) to earn rich snippets.",
      },
      {
        heading: 'Local SEO and Google Business Profile',
        body:    "Your Google Business Profile is often the first contact point for a traveller searching with local intent. Keep it complete, accurate, and actively managed: respond to all reviews within 24 hours, post weekly updates during peak season, and upload fresh photos monthly. The difference between a 4.2 and 4.7 average rating is measurable in click-through rate.",
      },
      {
        heading: 'Seasonal content planning',
        body:    "Dubai has three distinct booking seasons: winter sun (Oct–Feb), spring break (Mar–May), and summer family (Jun–Sep). Build a content calendar that anticipates demand by 8 to 12 weeks. A 'best Dubai hotels for winter sun' guide published in August will have time to rank before the October surge.",
      },
    ],
    cta: 'Want us to run this strategy for your business? Book a free SEO audit.',
  },
  {
    slug:     'google-ads-roas-uae-hotels',
    category: 'Paid Ads',
    title:    'Why Most Google Ads Campaigns for Arabian Gulf Hotels Waste Budget',
    excerpt:  "The three most common Google Ads mistakes we see from hospitality clients, and the fixes that pushed average ROAS from 1.8× to 4.3×.",
    readTime: '6 min read',
    date:     'April 2025',
    accent:   '#072A6B',
    featured: true,
    image:    '/assets/blog/google-ads-roas-uae-hotels.webp',
    imageAlt: 'Luxury hotel lobby with guests checking in',
    imageDescription: 'Featured image for Google Ads ROAS guidance for UAE hospitality brands.',
    authorId: 'sara',
    intro:
      "We have audited more than 60 Google Ads accounts for hotels and tourism businesses in the UAE. The same three mistakes appear in almost every one. They are not difficult to fix, but they are costing these businesses tens of thousands of pounds in wasted spend every year.",
    sections: [
      {
        heading: 'Mistake 1: Broad match everything',
        body:    "Broad match keywords look efficient on the surface, low CPCs, high volume. But when you check the search terms report, you find your hotel ads appearing for 'cheap hostels near me', 'UAE weather today', and 'free diving tutorials'. Every one of those clicks is a wasted pound. Start with exact and phrase match for your core terms. Layer in broad match only after you have built a robust negative keyword list.",
      },
      {
        heading: 'Mistake 2: One campaign for all audiences',
        body:    "A tourist who is six months from a decision and one who is booking for next week need completely different messaging and landing pages. Segment your campaigns by audience temperature: awareness-stage visitors get inspiration-led creative; decision-stage visitors get specific room types, price, and availability. The conversion rate difference between a generic ad and a segmented one is typically 3 to 5×.",
      },
      {
        heading: 'Mistake 3: Sending all traffic to the homepage',
        body:    "The homepage is designed to introduce your brand. It is not designed to convert a specific search query into a booking. Every ad group should point to a dedicated landing page that mirrors the ad's promise. If someone searched 'family all-inclusive Dubai', they should land on a page about family rooms with a prominent booking form, not your homepage with a full-screen video of the lobby.",
      },
      {
        heading: 'The fix that moved the needle most',
        body:    "Across our client accounts, the single highest-impact change was implementing value-based bidding with revenue data passed back to Google Ads via offline conversions. When Google's algorithm knows the actual booking value, not just the form submission, it optimises toward bookings that are actually worth money. This alone improved average ROAS from 1.8× to 3.1× within 90 days.",
      },
    ],
    cta: 'Running Google Ads with disappointing results? We offer a free account audit.',
  },
  {
    slug:     'social-media-uae-2025',
    category: 'Social Media',
    title:    'Social Media in the UAE 2025: What Platform, What Format, What Frequency',
    excerpt:  "UAE's social landscape shifted dramatically in 2024. Our breakdown of which platforms drive results for which business types, with data from 40+ accounts.",
    readTime: '10 min read',
    date:     'March 2025',
    accent:   '#1565C0',
    image:    '/assets/blog/social-media-uae-2025.webp',
    imageAlt: 'Social media app icons on a smartphone screen',
    imageDescription: 'Featured image for the UAE social media platform strategy in 2025.',
    authorId: 'sara',
    intro:
      "We manage social media for 40+ businesses in the UAE across tourism, hospitality, real estate, retail, and professional services. The platform mix that worked in 2022 is not the same one that works now. Here is what our 2024 data actually shows.",
    sections: [
      {
        heading: 'Facebook is not dead, for certain audiences',
        body:    "Facebook remains the highest-reach platform for audiences over 35 in the UAE. For real estate, healthcare, and financial services businesses targeting established professionals, Facebook still outperforms Instagram on cost per lead by 20 to 35%. The format that works: short video (under 60 seconds) with hard-cut subtitles and a specific, single offer.",
      },
      {
        heading: 'Instagram dominates tourism and hospitality',
        body:    "For hotels, resorts, restaurants, and tourism operators, Instagram is the primary discovery platform. The Explore algorithm rewards consistent posting (5 to 7 times per week), high-resolution imagery, and Reels with original audio. Carousel posts about 'what to do in Dubai' consistently outperform promotional content by 3 to 4× on reach.",
      },
      {
        heading: 'TikTok: high risk, high reward',
        body:    "TikTok in the UAE has 23 million monthly active users and is growing fastest among the 18 to 30 demographic. For tourism businesses, a single organic video reaching 100k+ views is achievable with the right hook. The risk: it requires authentic, behind-the-scenes content that many businesses are not comfortable producing. Polished promotional content performs poorly.",
      },
      {
        heading: 'LinkedIn for B2B in the UAE',
        body:    "If you sell to businesses, event planning, corporate travel, B2B services, LinkedIn is underused in the UAE relative to its potential. The ad CPCs are 4 to 6× higher than Facebook, but lead quality for B2B services is significantly better. Organic LinkedIn content from individual founders outperforms company page posts by roughly 8:1 on reach.",
      },
      {
        heading: 'The posting frequency myth',
        body:    "More posts do not mean more results. Across our 40+ accounts, the highest-performing ones post 4 to 5 times per week on Instagram and 2 to 3 times on Facebook, with every piece of content serving a clear purpose. Posting daily with filler content actively suppresses reach as the algorithm deprioritises low-engagement posts.",
      },
    ],
    cta: 'Want a platform-by-platform strategy for your business? Let us build one.',
  },
  {
    slug:     'branding-small-business-uae',
    category: 'Branding',
    title:    'Branding on a Budget: How Small UAE Businesses Can Look Premium',
    excerpt:  "You don't need a 6-figure budget to have a brand that commands trust. The five investments that move the needle most, and the four that rarely do.",
    readTime: '7 min read',
    date:     'February 2025',
    accent:   '#FFC107',
    image:    '/assets/blog/branding-small-business-egypt.webp',
    imageAlt: 'Designer reviewing brand colour swatches on a desk',
    imageDescription: 'Featured image for premium branding on a small business budget.',
    authorId: 'yasser',
    intro:
      "Most small business owners either skip branding entirely or spend money in the wrong places. After working with 200+ UAE businesses across ten years, we have a clear picture of which branding investments deliver returns and which ones are effectively decorative.",
    sections: [
      {
        heading: 'Investment 1: A proper logo (not a Canva template)',
        body:    "A logo built on a template looks like a template. Your logo appears on everything, business cards, your website, social profiles, signage. A professionally designed mark costs between AED 3,000 to 8,000 from a local designer. It is the single highest-leverage branding investment a small business can make.",
      },
      {
        heading: 'Investment 2: A consistent colour palette (2 to 3 colours)',
        body:    "Pick two primary brand colours and one accent, then use them everywhere. Consistency matters more than the specific colours you choose. Businesses that apply their palette consistently across all touchpoints are perceived as more trustworthy and established, regardless of how long they have been operating.",
      },
      {
        heading: 'Investment 3: Professional photography',
        body:    "Stock photos signal inauthenticity immediately. A single half-day shoot with a local photographer, producing 40 to 60 usable images, will transform your website and social media. For food businesses, retail, and hospitality this is non-negotiable. Budget AED 2,000 to 5,000.",
      },
      {
        heading: 'What not to spend on yet',
        body:    "Custom packaging, printed brochures, and exhibition stands are expensive and difficult to update. Until you have validated your core brand identity and messaging, do not lock it into physical materials. Digital first, test, refine, then print.",
      },
    ],
    cta: 'Ready to build a brand that actually converts? Talk to us about our branding packages.',
  },
  {
    slug:     'website-conversion-rate-optimisation',
    category: 'Web Development',
    title:    'The 12-Point CRO Checklist We Run on Every New Client Website',
    excerpt:  "A website that ranks but doesn't convert is money left on the table. This is our exact audit checklist, the same one that doubled Aqua Sports' leads.",
    readTime: '9 min read',
    date:     'January 2025',
    accent:   '#2196F3',
    image:    '/assets/blog/website-conversion-rate-optimisation.webp',
    imageAlt: 'Analytics dashboard showing website conversion metrics',
    imageDescription: 'Featured image for the 12-point website CRO audit checklist.',
    authorId: 'omar',
    intro:
      "We run this checklist on every new client website before we touch their SEO or paid campaigns. A slow, confusing, or untrustworthy website makes every other marketing investment less effective. Fix the foundation first.",
    sections: [
      {
        heading: 'Speed and Core Web Vitals',
        body:    "Target LCP under 2.5 seconds, CLS under 0.1, INP under 200ms. Run PageSpeed Insights and address the highest-impact issues first: image format (WebP), render-blocking JavaScript, and server response time. A 1-second improvement in LCP typically increases conversion rate by 8 to 12%.",
      },
      {
        heading: 'Above-the-fold value proposition',
        body:    "Within 3 seconds of landing, a visitor should be able to answer: what do you do, who is it for, and why should I trust you? Test your homepage with someone unfamiliar with your business. If they cannot answer these three questions immediately, the hero section needs work.",
      },
      {
        heading: 'Single, clear call to action per page',
        body:    "Every page should have one primary CTA, not four competing buttons. Secondary links (portfolio, services, etc.) are fine as navigation, but the primary conversion action should be visually dominant and repeated 2 to 3 times down the page.",
      },
      {
        heading: 'Social proof placement',
        body:    "Client logos, review scores, or testimonials should appear above the fold on service and landing pages. Visitors make trust decisions in the first 10 seconds. Social proof that appears only at the bottom of the page never gets seen by the majority of your visitors.",
      },
      {
        heading: 'Contact form friction audit',
        body:    "Every additional field in a contact form reduces completion rate by approximately 5 to 10%. Do you actually need the company size, how they heard about you, and their preferred contact time right now? Remove everything you do not immediately use. Name, email, and a brief message is sufficient for most first-contact forms.",
      },
    ],
    cta: 'Want us to run this audit on your website? We offer a free CRO review.',
  },
  {
    slug:     'content-marketing-roi',
    category: 'Content Marketing',
    title:    'How to Measure Content Marketing ROI Without Guessing',
    excerpt:  "Most agencies talk about 'brand awareness.' We talk about pipeline. Here's the attribution model we use to tie every blog post to a bottom-line number.",
    readTime: '7 min read',
    date:     'December 2024',
    accent:   '#072A6B',
    image:    '/assets/blog/content-marketing-roi.webp',
    imageAlt: 'Team reviewing content marketing performance on a laptop',
    imageDescription: 'Featured image for measuring content marketing ROI with attribution.',
    authorId: 'omar',
    intro:
      "Content marketing has a measurement problem. Blog posts and guides generate traffic, but connecting that traffic to revenue requires an attribution model most businesses do not have. Here is the setup we use with our clients, simple enough to implement, accurate enough to make decisions from.",
    sections: [
      {
        heading: 'The first-touch vs. last-touch problem',
        body:    "Most analytics show you the last thing someone did before converting, typically a direct visit or a branded search. This makes content marketing look useless, because a blog post read three months ago does not appear in last-touch attribution. You need a model that gives credit to earlier interactions in the journey.",
      },
      {
        heading: 'Setting up content attribution in GA4',
        body:    "Enable Google Analytics 4's data-driven attribution model and create a custom exploration that shows the full conversion path. For each conversion, you can see every touchpoint, including which blog posts were read, in what order, and over what time period. This typically shows content contributing to 30 to 50% of conversions that last-touch attribution assigns entirely to paid or direct.",
      },
      {
        heading: 'The metric that actually matters: content-influenced pipeline',
        body:    "Create a segment in GA4 for users who engaged with at least one blog post or guide before converting. Compare their conversion rate, average deal size, and time to close against users who did not read any content. In our client data, content-influenced leads convert at 2.3× the rate of non-content-influenced leads and close 40% faster.",
      },
      {
        heading: 'Simple monthly reporting that proves value',
        body:    "Each month: (1) total organic sessions from content, (2) conversion rate for content-touched visitors, (3) estimated value of content-influenced leads. Take 3 months to accumulate meaningful data, then set a baseline. If content-influenced pipeline is growing month-on-month, the investment is working.",
      },
    ],
    cta: 'Want a content strategy built around measurable pipeline growth? Let us talk.',
  },
  {
    slug:     'google-business-profile-local-seo',
    category: 'SEO',
    title:    'Google Business Profile for Dubai: The Local SEO Checklist',
    excerpt:  'Your GBP listing is often the first impression for travellers. Here is how to optimise photos, categories, posts, and reviews for Dubai searches.',
    readTime: '6 min read',
    date:     'June 2025',
    accent:   '#2196F3',
    image:    '/assets/blog/google-business-profile-local-seo.webp',
    imageAlt: 'Business team planning local SEO on a whiteboard',
    imageDescription: 'Featured image for Google Business Profile optimisation in Dubai.',
    authorId: 'omar',
    intro:
      'When someone searches "diving centre Dubai" or "restaurant near Marina", Google often shows the map pack before organic results. Your Google Business Profile (GBP) is the asset that wins those clicks — or loses them to a competitor with better photos and fresher reviews.',
    sections: [
      {
        heading: 'Choose the right primary category',
        body:    'Pick the single category that best matches what you sell. Hotels should not use "Travel Agency" as primary; dive shops should not default to "Tour Operator" if "Scuba Tour Agency" is available. Secondary categories can broaden reach, but the primary category drives most map-pack relevance.',
      },
      {
        heading: 'Photos that convert, not just decorate',
        body:    'Upload exterior, reception, rooms, food, and activity shots monthly during peak season. Google rewards freshness. Avoid watermarks and heavy filters — travellers want an honest preview. Businesses that add 10+ quality photos see materially higher direction requests and website clicks.',
      },
      {
        heading: 'Posts and offers during booking windows',
        body:    'Use GBP posts for seasonal packages, Eid offers, and last-minute availability. Schedule posts 8–12 weeks before peak demand (winter sun, spring break). Each post should have one clear CTA: call, book, or learn more — not three competing links.',
      },
      {
        heading: 'Review velocity and response quality',
        body:    'Respond to every review within 24 hours, in the language the guest used when possible. Ask happy guests for reviews at checkout — not via bulk SMS blasts. A steady flow of recent 5-star reviews beats a high average rating with nothing new in six months.',
      },
    ],
    cta: 'Want us to audit and manage your Google Business Profile? Book a free local SEO review.',
  },
  {
    slug:     'email-marketing-tourism',
    category: 'Content Marketing',
    title:    'Email Marketing for Tourism: Sequences That Actually Book Rooms',
    excerpt:  'Abandoned browse, post-stay upsell, and seasonal campaigns — the three email flows that pay for themselves for UAE hospitality brands.',
    readTime: '7 min read',
    date:     'May 2025',
    accent:   '#1565C0',
    image:    '/assets/blog/email-marketing-tourism.webp',
    imageAlt: 'Marketer drafting a promotional email on a laptop',
    imageDescription: 'Featured image for tourism email marketing automation sequences.',
    authorId: 'sara',
    intro:
      'Social algorithms change every quarter. Your email list is the audience you own. For hotels and tour operators in Dubai, three automated sequences consistently outperform one-off newsletters: welcome + offer, abandoned interest recovery, and post-stay re-engagement.',
    sections: [
      {
        heading: 'Welcome sequence with a single offer',
        body:    'New subscribers get three emails over 10 days: brand story, social proof (reviews + UGC), then one time-bound offer (early booking discount or free transfer). One offer only — multiple discounts train subscribers to wait for the next sale.',
      },
      {
        heading: 'Abandoned browse and quote follow-up',
        body:    'If someone viewed room types or requested a quote but did not book, trigger a 3-email recovery flow at 24h, 72h, and 7 days. Include availability urgency only when it is true. Fake scarcity erodes trust fast in tourism.',
      },
      {
        heading: 'Post-stay re-engagement',
        body:    'Seven days after checkout, send a review request. Thirty days later, share a "plan your return" guide with seasonal activities. Guests who had a great stay are your cheapest acquisition channel for repeat bookings and referrals.',
      },
      {
        heading: 'Measure revenue, not open rates',
        body:    'Track bookings and revenue per campaign in GA4 or your PMS integration. Open rates are vanity; attributed room nights are the metric that justifies the ESP subscription.',
      },
    ],
    cta: 'Need help wiring email flows to your booking stack? Talk to our performance team.',
  },
  {
    slug:     'whatsapp-marketing-uae',
    category: 'Social Media',
    title:    'WhatsApp Marketing in the UAE: Compliance, Templates, and Conversion',
    excerpt:  'WhatsApp is the default channel for UAE consumers — but broadcast blasts kill deliverability. Here is how to use WhatsApp Business API properly.',
    readTime: '8 min read',
    date:     'April 2025',
    accent:   '#25D366',
    image:    '/assets/blog/whatsapp-marketing-egypt.webp',
    imageAlt: 'WhatsApp conversation on a mobile phone',
    imageDescription: 'Featured image for WhatsApp Business marketing in the UAE.',
    authorId: 'sara',
    intro:
      'In UAE, WhatsApp is where bookings get confirmed, questions get answered, and complaints get escalated. Treating it like SMS blast marketing gets numbers blocked and reviews tanked. The businesses that win treat WhatsApp as a conversational sales and support channel with clear opt-in and template discipline.',
    sections: [
      {
        heading: 'Opt-in before you message',
        body:    'Only message users who explicitly opted in on your website, at reception, or via a QR code. Document consent language in Arabic and English. Cold outreach via scraped numbers is both ineffective and risky for Meta account quality.',
      },
      {
        heading: 'Template messages vs. session messages',
        body:    'Outside the 24-hour customer service window, you must use pre-approved WhatsApp templates. Plan templates for booking confirmations, payment reminders, and pre-arrival info — not promotional spam. Promotional templates exist but should be rate-limited and segmented.',
      },
      {
        heading: 'Human handoff for high-value queries',
        body:    'Automate FAQs (hours, location, transfer pricing) with quick replies or a lightweight bot. Route wedding groups, corporate retreats, and complaints to a human within minutes. Response time under 5 minutes correlates with conversion on high-ticket enquiries.',
      },
      {
        heading: 'Integrate with CRM and booking tools',
        body:    'Log WhatsApp conversations in HubSpot or your PMS so sales and front desk see the same history. Duplicate conversations across staff erode trust and lose context when shifts change.',
      },
    ],
    cta: 'Want WhatsApp wired into your lead capture and booking flow? We can implement it end-to-end.',
  },
  {
    slug:     'landing-page-anatomy',
    category: 'Web Development',
    title:    'Anatomy of a High-Converting Tourism Landing Page',
    excerpt:  'Hero, proof, offer, FAQ, and sticky CTA — the five blocks every paid campaign landing page needs before you scale ad spend.',
    readTime: '6 min read',
    date:     'March 2025',
    accent:   '#072A6B',
    image:    '/assets/blog/landing-page-anatomy.webp',
    imageAlt: 'Website landing page layout wireframe on a monitor',
    imageDescription: 'Featured image for tourism landing page structure and conversion design.',
    authorId: 'yasser',
    intro:
      'Sending paid traffic to your homepage is the most common waste we see in hospitality accounts. A campaign-specific landing page mirrors the ad promise, removes navigation noise, and gives Google Ads a clear conversion signal. Here is the block order we use for UAE clients.',
    sections: [
      {
        heading: 'Hero: match the ad verbatim',
        body:    'Headline should repeat or closely echo the ad hook. Subhead clarifies who it is for and the primary benefit. One primary CTA above the fold — "Check availability" or "Get a quote", not five equal buttons.',
      },
      {
        heading: 'Proof block within the first scroll',
        body:    'TripAdvisor score, Google rating, guest photos, or client logos immediately after the hero. Trust decisions happen in seconds; proof buried at the footer never helps paid traffic.',
      },
      {
        heading: 'Offer and objection handling',
        body:    'Spell out what is included, cancellation policy, and what makes you different from the hotel next door. An FAQ accordion reduces support load and improves conversion on mobile.',
      },
      {
        heading: 'Sticky mobile CTA',
        body:    'On mobile, pin a slim bar with phone and WhatsApp after the user scrolls past the hero. Most Dubai bookings still start with a message or call — make that one tap away.',
      },
    ],
    cta: 'Launching a new campaign? We build landing pages that match your ads and track conversions properly.',
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug)
}
