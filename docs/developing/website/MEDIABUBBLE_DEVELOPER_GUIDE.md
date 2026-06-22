# MediaBubble Developer Guide

## Quick Overview

**MediaBubble** is a results-driven marketing agency in Hurghada, Egypt. You're rebuilding the website in React and building AI-powered workflow automation apps.

### Company Structure

- **Services:** Strategic & Creative Marketing → Marketing & Digital Growth → Branding & Printing → Web Solutions
- **Current Tech:** WordPress (Elementor) + HubSpot CRM integration
- **Key Clients:** Aldau, Shal Hasheesh, ERC, Selena, GG, and tourism/hospitality brands
- **Revenue Model:** Project-based consulting + retainer services

### Three Development Pillars

#### 1. Website Rebuild (React)

- Replace WordPress with Next.js + React 18
- Target: Next.js (SSR/SSG) + Tailwind + shadcn/ui
- Hosting: Vercel
- Content: Migrate from WordPress → Sanity or Contentful CMS
- Expected: 8-12 weeks

#### 2. Internal Workflow Apps

1. **Lead & Project Manager** — unified pipeline view
2. **Campaign Manager** — all channels in one dashboard
3. **AI Content Studio** — Claude-powered content generation
4. **Service Intake Portal** — structured onboarding
5. **Analytics Portal** — client + internal reporting

#### 3. AI Agents

1. **Content Publishing** — auto-generate & schedule
2. **Lead Qualification** — score, route, nurture
3. **Report Generation** — auto-compile metrics + insights
4. **Proposal Agent** — auto-generate from intake
5. **Social Media Manager** — schedule, monitor, engage

---

## Current Website Structure

### Pages to Migrate

- **Homepage** → Hero + Services Grid + Client Logos + Why Choose
- **About** → Team + Timeline + Values
- **Solutions** (4 main sections with 10+ sub-services)
  - Strategic & Creative Marketing (3 sub-services)
  - Marketing & Digital Growth (3 sub-services)
  - Branding & Printing Solutions (3 sub-services)
  - Web Solutions (3 sub-services)
- **Portfolio** → Case studies filterable by service/industry
- **Blog/News** → Content management + RSS
- **Contact** → Forms → HubSpot sync
- **Careers** → Job listings + application form
- **Request Quote** → Intake form → HubSpot deal

### Current Tech Stack

| Layer        | Tech                         |
| ------------ | ---------------------------- |
| Platform     | WordPress 6.7.5              |
| Page Builder | Elementor 4.1.1              |
| Theme        | Vault Child Theme            |
| CRM          | HubSpot (forms + tracking)   |
| SEO          | Rank Math WordPress SEO      |
| Hosting      | Self-hosted or WordPress.com |

---

## Development Tech Stack (Recommended)

### Frontend

```
Next.js 15+          (SSR/SSG, API routes, edge functions)
React 18+            (Component library)
TypeScript           (Type safety)
Tailwind CSS         (Styling)
shadcn/ui            (Component primitives)
```

### Backend

```
Node.js + Express    (or Next.js API routes)
PostgreSQL           (Supabase recommended)
Prisma               (ORM)
```

### CMS

```
Sanity or Contentful (Decoupled CMS)
```

### Integrations

```
HubSpot API          (CRM, forms, tracking)
Google Ads API       (Campaign data)
Meta Ads Manager API (Campaign data)
Claude API           (Content generation)
Google Analytics 4   (Analytics)
```

### Hosting

```
Vercel               (Frontend)
Supabase/Railway     (Backend)
Cloudflare           (CDN/DNS, optional)
```

---

## Key Decisions

**Why React over WordPress updates?**

- Better component reusability
- Faster iteration cycles
- Superior performance
- Easy to build custom internal apps
- Future-proof for mobile

**Why Next.js?**

- SSR/SSG for SEO
- Built-in API routes
- Vercel one-click deployment
- Edge functions for real-time

**Why Claude API?**

- Superior text quality + reasoning
- Brand voice consistency via prompt caching
- Function calling for structured outputs
- Cost-effective at scale

**Why Agents?**

- Scale without hiring more people
- 24/7 availability
- Continuous improvement
- Cost-effective (API costs << salaries)

---

## Content Audit

### What You Have

- **AI-Generated Content Files** → /Reference/AI-Content/
  - 1-Home.docx
  - 2-Services-\*.docx (6 service pages)
  - 3-Showcase.docx
  - 4-About Us.docx
  - 5-Contact Us.docx
  - 6-Request a Quotation.docx
  - 7-Vacancies.docx

- **Website Scrape** → /reference/mediabubble-scrape/
  - HTML snapshots of all current pages
  - Images (logos, case studies, service icons)
  - Can be used as reference during migration

### Next Steps

1. Audit content quality (some may be outdated)
2. Decide on CMS migration approach
3. Plan content structure for React components
4. Consider SEO impact + redirects

---

## API Integration Checklist

### Must-Have (Phase 1)

- [ ] HubSpot API (contacts, deals, forms)
- [ ] Google Analytics 4 (web analytics)
- [ ] Email service (Sendgrid/Mailgun for transactional)

### Should-Have (Phase 2)

- [ ] Google Ads API (campaign reporting)
- [ ] Meta Ads Manager API (campaign reporting)
- [ ] Claude API (content generation)

### Nice-to-Have (Phase 3)

- [ ] SEMrush or Ahrefs API (SEO monitoring)
- [ ] Buffer or Later API (social scheduling)
- [ ] Slack API (notifications/reporting)

---

## Component Library Blueprint

### Core Components

```
Layout/
  - Header (sticky navbar with mega-menu)
  - Footer (multi-column, newsletter signup)
  - Container (responsive grid wrapper)
  - Grid (flexible layout system)

Navigation/
  - MegaMenu (4-column services dropdown)
  - Breadcrumb
  - Pagination
  - TabNavigation

Hero/
  - HeroSection (full-width with CTA)
  - HeroImage (optimized images)
  - GradientOverlay

Services/
  - ServiceCard (icon + title + description + link)
  - ServiceGrid (responsive 3-4 col)
  - ServiceAccordion (expandable categories)

Content/
  - RichText (Markdown → HTML)
  - BlogCard (featured image + excerpt + date)
  - Testimonial (quote + avatar + name/title)
  - StatBox (number + label, for social proof)

Forms/
  - InputField (text, email, phone)
  - SelectField (dropdowns)
  - TextArea (multi-line)
  - FormSubmit (HubSpot integration)
  - FormSuccess (confirmation)

Buttons/
  - CTAButton (primary, secondary variants)
  - SocialLink (icon link to social profiles)

Portfolio/
  - CaseStudyCard (image + title + services)
  - CaseStudyFilter (by service/industry)
  - CaseStudyDetail (full case study page)
```

---

## Content Migration Strategy

### Phase 1: Inventory

- [ ] Audit all pages on current site
- [ ] List all content assets (images, videos, documents)
- [ ] Identify SEO value (rankings, traffic sources)
- [ ] Plan URL structure & redirects

### Phase 2: Structure

- [ ] Define content model (pages, blog posts, portfolio, team)
- [ ] Set up CMS (Sanity/Contentful)
- [ ] Create content templates
- [ ] Plan taxonomy (categories, tags)

### Phase 3: Migration

- [ ] Extract content from WordPress
- [ ] Clean & normalize formatting
- [ ] Populate CMS
- [ ] Create redirects (301s for old URLs)
- [ ] Test internal links

### Phase 4: Go-Live

- [ ] DNS switchover
- [ ] Monitor 404s and broken links
- [ ] Track SEO impact
- [ ] Update Google Search Console

---

## Performance Targets

| Metric                 | Target               |
| ---------------------- | -------------------- |
| Lighthouse Score       | >90 (all categories) |
| Core Web Vitals (LCP)  | <2.5s                |
| Core Web Vitals (FID)  | <100ms               |
| Core Web Vitals (CLS)  | <0.1                 |
| First Contentful Paint | <1.5s                |
| Time to Interactive    | <3.5s                |
| SEO Ranking (branded)  | Position 1           |

---

## Immediate Next Steps

1. **Design System** → Define color palette, typography, spacing (use Figma)
2. **Sitemap** → Finalize URL structure and page hierarchy
3. **Content Audit** → Review existing content, identify gaps
4. **Dev Setup** → Initialize Next.js repo, set up Vercel
5. **CMS Setup** → Create Sanity/Contentful project, define schema
6. **HubSpot Integration** → Document API requirements, set up webhook handlers
7. **Component Library** → Build core components (header, footer, buttons, cards)

---

## Useful Commands (When Ready)

```bash
# Initialize Next.js project
npx create-next-app@latest mediabubble --typescript --tailwind

# Install dependencies
npm install @sanity/client @sanity/image-url axios zod

# Start dev server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel deploy

# Database setup (Supabase)
# Already set up via web dashboard
```

---

## Resources & Links

- **Website:** https://mediabubble.co
- **Current Platform:** WordPress (Elementor)
- **Services:** https://mediabubble.co/marketing-solutions/ (mega-menu structure)
- **Portfolio:** https://mediabubble.co/all-portfolio/
- **Contact:** https://mediabubble.co/contact/

---

## Questions to Answer

1. **Brand Colors** — What's the official color palette? (Current site uses white/dark gradients)
2. **Typography** — Preferred fonts? (Currently Inter + Manrope via Google Fonts)
3. **Target Audience** — B2B or B2C? Decision makers? Budgets?
4. **Competitor Positioning** — Who are main competitors in Hurghada?
5. **Timeline** — Hard deadline for launch?
6. **Budget** — Available for external contractors/tools?
7. **Analytics Goals** — What KPIs matter most? (Traffic, leads, conversions?)

---

## Notes for Future Sessions

- All development strategy saved to `/memory/` folder
- Company profile includes service taxonomy and current tech stack
- Focus on component reusability (key advantage over WordPress)
- HubSpot integration is critical for lead tracking
- Claude API will power content generation agents
- Start with website MVP, then build internal apps iteratively
