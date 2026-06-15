# MediaBubble Website Rebuild Strategy
**Document Version:** 1.0  
**Date:** June 2026  
**Owner:** Yasser Dorgham  
**Status:** Active Development Plan

---

## Executive Summary

MediaBubble is rebuilding its digital presence with a **modern, AI-centric website** that:
- ✅ Operates in **English & Egyptian Arabic (Masri)**
- ✅ Features **bilingual AI chat agent** for lead qualification & support
- ✅ Emphasizes **AI & Agents** as core value proposition
- ✅ Builds a **reusable design system** for future MediaBubble apps
- ✅ Improves SEO, performance, and user experience
- ✅ Integrates with existing HubSpot CRM

**Timeline:** 10 phases, ~12-16 weeks  
**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Claude API  
**Deployment:** Vercel (frontend) + Cloud infrastructure

---

## Part 1: Strategic Pillars

### 1. **AI-First Positioning**
MediaBubble's website should showcase **AI and Agents** as the future of marketing:

#### What This Means:
- **Hero messaging** emphasizes AI-powered solutions
- **Services are reframed** around AI implementation (AI-powered SEO, AI content generation, AI campaign optimization)
- **Chat agent on every page** demonstrates AI in action
- **Case studies highlight** AI's role in client success
- **Blog content** focuses on AI trends, implementation, ROI

#### Example Messaging:
> "Marketing Powered by AI Agents  
> We don't just do marketing—we build intelligent systems that work 24/7.  
> From AI-driven SEO to automated lead qualification, MediaBubble deploys agents that deliver results."

### 2. **Bilingual Excellence (English + Egyptian Arabic)**
Support full bilingual experience:

#### English (Primary):
- Formal, professional tone
- International audience focus
- Full feature set

#### Egyptian Arabic / Masri (Secondary):
- Conversational, locally-resonant tone
- Cairo/Hurghada market focus
- Full parity with English (not partial translation)

#### Technical Requirements:
- Next.js `next-intl` for i18n
- Separate content trees for each language
- Language switcher in header
- RTL support for Arabic (automatic with Tailwind)
- Hreflang tags for SEO

### 3. **Design System First**
Build a **reusable component library** that:
- Supports MediaBubble's website
- Scales to internal tools (client dashboards, reporting, CMS)
- Supports future app launches

#### Design System Scope:
- 40+ components (buttons, cards, forms, modals, tables, etc.)
- Design tokens (colors, typography, spacing, shadows)
- Responsive design patterns
- Accessibility standards (WCAG 2.1 AA)
- Dark mode support
- Complete documentation + Storybook

### 4. **AI Chat Agent as Differentiator**
The chat agent is NOT a sidebar—it's a **core product feature**:

#### Agent Capabilities:
- **Lead Qualification:** Ask about business goals, pain points, timeline
- **Service Routing:** Guide customers to right service based on needs
- **Appointment Scheduling:** Book consultations (via Cal.com or similar)
- **FAQ Response:** Answer common questions about services
- **Multilingual:** Seamlessly switch between English/Arabic
- **HubSpot Integration:** Capture leads in CRM automatically
- **24/7 Availability:** Answer outside business hours

#### Conversation Flows:
```
User: "I need help with my website ranking"
Agent: "Great! Let me ask a few questions to find the best solution.
       1. What's your target market? Local, national, or international?
       2. How long have you been focusing on SEO?
       [captures info] → Recommends SEO service
       → Offers consultation booking"
```

---

## Part 2: Technical Architecture

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14+ (App Router) | Modern React framework with SSR |
| **Language** | TypeScript | Type safety, developer experience |
| **Styling** | Tailwind CSS + shadcn/ui | Rapid component development |
| **i18n** | next-intl | English/Arabic support |
| **Database** | PostgreSQL | User sessions, chat history, leads |
| **API** | Next.js API Routes | Backend logic |
| **AI** | Claude API (Anthropic) | Chat agent + content generation |
| **CRM** | HubSpot API | Lead management, sync |
| **Hosting** | Vercel | Frontend deployment |
| **CDN** | Vercel / Cloudflare | Edge caching, performance |
| **Monitoring** | Sentry + Datadog | Error tracking, analytics |
| **Analytics** | Google Analytics 4 + HubSpot | Traffic, conversions, user behavior |

### Project Structure

```
mediabubble-website/
├── app/
│   ├── [locale]/               # i18n routing (en/, ar/)
│   │   ├── page.tsx            # Home
│   │   ├── about/              # About Us
│   │   ├── services/           # Services (4 pillars)
│   │   ├── solutions/          # Solutions
│   │   ├── portfolio/          # Case Studies
│   │   ├── blog/               # Insights/Blog
│   │   ├── contact/            # Contact
│   │   ├── pricing/            # Pricing
│   │   └── layout.tsx          # Locale-specific layout
│   ├── api/
│   │   ├── chat/               # Chat agent endpoint
│   │   ├── leads/              # Lead capture
│   │   └── webhook/            # HubSpot webhooks
│   └── layout.tsx              # Root layout
├── components/
│   ├── common/                 # Shared (Header, Footer, Nav)
│   ├── ui/                     # shadcn/ui + custom
│   ├── sections/               # Page sections (Hero, Features, etc.)
│   └── chat/                   # Chat widget & components
├── lib/
│   ├── i18n.ts                 # i18n config
│   ├── claude.ts               # Claude API wrapper
│   ├── hubspot.ts              # HubSpot API integration
│   ├── db.ts                   # Database client
│   └── utils.ts                # Utilities
├── messages/                   # i18n content (en.json, ar.json)
├── public/                     # Static assets
├── styles/                     # Global styles, design tokens
└── config/                     # Configuration files
```

### Design System Structure

```
design-system/
├── tokens/
│   ├── colors.json            # Color palette
│   ├── typography.json        # Font scales
│   ├── spacing.json           # Spacing scale
│   └── shadows.json           # Shadow scales
├── components/
│   ├── Button/
│   ├── Card/
│   ├── Input/
│   ├── Modal/
│   ├── Navbar/
│   ├── Footer/
│   └── ... (40+ components)
├── patterns/
│   ├── FormLayout.tsx
│   ├── DashboardLayout.tsx
│   └── LandingPageLayout.tsx
├── docs/
│   ├── DESIGN_SYSTEM.md
│   ├── COLORS.md
│   ├── TYPOGRAPHY.md
│   └── ACCESSIBILITY.md
└── storybook/                 # Storybook configuration
```

---

## Part 3: Content Strategy

### Content Pillars

#### 1. **AI & Agents (NEW - FOCUS)**
- Thought leadership: AI trends in marketing
- How-to guides: Implementing AI for your business
- Case studies: AI-powered client results
- Blog series: Agent types, use cases, ROI

#### 2. **Services & Solutions**
- Service pages (SEO, PPC, Social, Content, etc.)
- Problem → Solution mapping
- Feature highlights
- Pricing/packages

#### 3. **Thought Leadership**
- Industry insights & trends
- MediaBubble team expertise
- Client success stories
- Whitepapers & guides

#### 4. **Educational Content**
- Tutorials & guides
- Free tools & resources
- Webinars & events
- FAQs

### Bilingual Content Structure

Each piece of content will have:

1. **English Version**
   - Professional, international audience
   - Full detail
   - SEO-optimized for US/UK audience

2. **Arabic (Masri) Version**
   - Conversational, local tone
   - Cultural context
   - Relevant to Egypt/MENA market
   - Full feature parity

#### Content Creation Process:
```
1. Create English outline
2. Write English version (SEO, keywords, structure)
3. Translate to Arabic (native speaker, not machine)
4. Localize Arabic content (idioms, examples, cultural refs)
5. Optimize both for SEO (different keywords)
6. Publish simultaneously
```

### AI Chat Agent Content

#### System Prompt Template:
```
You are MediaBubble's friendly AI assistant, helping visitors learn about 
AI-powered marketing solutions.

Language: Detect from user input (English or Egyptian Arabic)
Tone: Helpful, professional, conversational
Goal: Qualify leads and book consultations

When user asks about services:
- Explain how AI enhances that service
- Share relevant success metrics
- Offer to schedule consultation

When user provides contact info:
- Confirm capture
- Set expectations for follow-up
- Offer next steps
```

---

## Part 4: Implementation Roadmap

### Phase 1: Design System & Brand Foundation (Weeks 1-2)

**Deliverables:**
- [ ] Color palette (primary, secondary, accent + semantic)
- [ ] Typography system (fonts, scales, line heights)
- [ ] Component specifications (40+ components)
- [ ] Spacing & grid system
- [ ] Icon library style guide
- [ ] Accessibility audit template
- [ ] Figma design system (for designers)
- [ ] Design tokens JSON file

**Key Decisions:**
- Primary font: (Recommend: Inter/Poppins for English, + Cairo (sans-serif) for Arabic)
- Color scheme: (Recommend: Tech-forward + warm accent for AI positioning)
- Component library: shadcn/ui (Headless UI + Tailwind)

### Phase 2: Content Strategy & Bilingual Structure (Weeks 2-3)

**Deliverables:**
- [ ] Content audit of current site
- [ ] Content calendar (12+ months)
- [ ] Bilingual content templates
- [ ] AI-focused messaging framework
- [ ] Service page outlines (English & Arabic)
- [ ] Blog topic list (50+ AI-related topics)
- [ ] Chat agent conversation flows
- [ ] Tone & voice guidelines (both languages)

**Key Tasks:**
- Interview team on AI capabilities & success stories
- Define target audience (startups, SMBs, enterprises)
- Map service pages to AI benefits

### Phase 3: AI Chat Agent Architecture (Weeks 3-4)

**Deliverables:**
- [ ] Agent spec document
- [ ] Conversation flow diagrams (Miro/FigJam)
- [ ] System prompt templates
- [ ] Integration architecture (Claude → HubSpot)
- [ ] Training data for agent
- [ ] Fallback responses & escalation paths
- [ ] Analytics plan (conversations, conversion tracking)

**Key Decisions:**
- Agent platform: Claude API (via Anthropic)
- Conversation persistence: PostgreSQL
- Language detection: Auto-detect from first message
- Lead capture: Email, phone, service interest

### Phase 4: Build React Website Foundation (Weeks 4-5)

**Deliverables:**
- [ ] Next.js project scaffold
- [ ] TypeScript configuration
- [ ] Tailwind CSS + design tokens
- [ ] shadcn/ui setup
- [ ] next-intl configuration (English/Arabic)
- [ ] Folder structure & conventions
- [ ] Git workflow & CI/CD pipeline
- [ ] Environment variables setup
- [ ] SEO setup (metadata, sitemap, robots.txt)

**Commands:**
```bash
# Create project
npx create-next-app@latest mediabubble-website \
  --typescript \
  --tailwind \
  --eslint \
  --app

# Install dependencies
npm install next-intl shadcn-ui @radix-ui/* zod react-hook-form

# Configure i18n
npm install next-intl
```

### Phase 5: Implement Core Pages & Components (Weeks 5-8)

**Home Page:**
- [ ] Hero section (AI messaging, CTA)
- [ ] Services grid with AI highlights
- [ ] Testimonials section
- [ ] Blog preview
- [ ] CTA section + chat widget

**Services Pages:**
- [ ] Service overview (4 pillars)
- [ ] Sub-service detail pages (10+)
- [ ] AI integration highlight on each
- [ ] Pricing/package section
- [ ] CTA + chat widget

**Other Pages:**
- [ ] About Us (team, company story, AI focus)
- [ ] Solutions (problem → solution mapping)
- [ ] Portfolio (case studies with metrics)
- [ ] Blog/Insights (filterable, searchable)
- [ ] Contact (form + chat agent)
- [ ] Privacy, Terms, etc.

### Phase 6: Integrate AI Chat Agent (Weeks 8-9)

**Deliverables:**
- [ ] Chat widget component
- [ ] Claude API integration
- [ ] Language detection & switching
- [ ] Conversation history (PostgreSQL)
- [ ] HubSpot lead sync
- [ ] Admin dashboard (agent monitoring)
- [ ] Analytics integration
- [ ] Rate limiting & abuse prevention
- [ ] Mobile responsiveness

**Testing:**
- [ ] Test conversations (both languages)
- [ ] Lead capture verification
- [ ] HubSpot sync validation
- [ ] Performance under load

### Phase 7: Performance, SEO & Accessibility (Weeks 9-10)

**Deliverables:**
- [ ] Image optimization
- [ ] Code splitting & lazy loading
- [ ] Core Web Vitals optimization
- [ ] Schema.org structured data
- [ ] Hreflang tags (bilingual SEO)
- [ ] Sitemap + robots.txt (both languages)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring

**Targets:**
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- Lighthouse: 90+

### Phase 8: Testing & QA (Weeks 10-11)

**Deliverables:**
- [ ] Unit tests (React components)
- [ ] Integration tests (pages, flows)
- [ ] E2E tests (critical journeys)
- [ ] Bilingual content QA
- [ ] Chat agent QA
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Accessibility testing
- [ ] Security testing

### Phase 9: Migration & Deployment (Week 11-12)

**Deliverables:**
- [ ] Production environment setup (Vercel)
- [ ] DNS/domain configuration
- [ ] Redirect mapping (old URLs)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Monitoring & alerting
- [ ] Runbooks & troubleshooting guides

### Phase 10: Design System Documentation (Week 12+)

**Deliverables:**
- [ ] Storybook deployment
- [ ] Component documentation (40+ components)
- [ ] Design tokens documentation
- [ ] Design system contribution guide
- [ ] Team onboarding documentation
- [ ] Versioning & release process

---

## Part 5: Key Implementation Details

### AI Chat Agent Implementation

#### 1. Chat Widget Component
```tsx
// components/ChatWidget.tsx
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const locale = useLocale(); // English or Arabic
  
  return (
    <>
      <ChatButton onClick={() => setOpen(true)} />
      {open && (
        <ChatModal onClose={() => setOpen(false)} locale={locale}>
          <ChatInterface locale={locale} />
        </ChatModal>
      )}
    </>
  );
}
```

#### 2. Claude API Integration
```typescript
// lib/claude.ts
import Anthropic from "@anthropic-sdk/sdk";

const client = new Anthropic();

export async function chatWithAgent(
  messages: Message[],
  locale: "en" | "ar"
) {
  const systemPrompt = 
    locale === "en" ? ENGLISH_SYSTEM_PROMPT : ARABIC_SYSTEM_PROMPT;
  
  const response = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages.map(m => ({
      role: m.role,
      content: m.content
    }))
  });
  
  return response.content[0].type === "text" ? response.content[0].text : "";
}
```

#### 3. HubSpot Lead Capture
```typescript
// lib/hubspot.ts
export async function createHubSpotLead(leadData: {
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  serviceInterest?: string;
}) {
  const response = await fetch(
    "https://api.hubapi.com/crm/v3/objects/contacts",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUBSPOT_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        properties: {
          email: leadData.email,
          phone: leadData.phone,
          firstname: leadData.firstName,
          lastname: leadData.lastName,
          service_interest: leadData.serviceInterest
        }
      })
    }
  );
  
  return response.json();
}
```

### Bilingual i18n Setup

```typescript
// lib/i18n.ts
import { createSharedPathnamesNavigationIntl } from 'next-intl/navigation';

export const locales = ['en', 'ar'] as const;
export type Locale = typeof locales[number];

export const pathnames = {
  '/': '/',
  '/about': {
    en: '/about',
    ar: '/about'
  },
  '/services': {
    en: '/services',
    ar: '/services'
  }
} as const;

// messages/en.json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "services": "Services"
  },
  "hero": {
    "title": "Marketing Powered by AI Agents",
    "subtitle": "We don't just do marketing—we build intelligent systems that work 24/7"
  }
}

// messages/ar.json
{
  "nav": {
    "home": "الرئيسية",
    "about": "من نحن",
    "services": "الخدمات"
  },
  "hero": {
    "title": "التسويق مدفوع بوكلاء ذكيين",
    "subtitle": "لا نقتصر على التسويق فقط—نبني أنظمة ذكية تعمل ٢٤/٧"
  }
}
```

### Design System Example Components

```typescript
// components/ui/Button.tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold rounded-lg transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
        ghost: "hover:bg-gray-100"
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg"
      }
    },
    defaultVariants: { variant: "primary", size: "md" }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
```

---

## Part 6: Success Metrics

### Business Metrics
- **Lead Generation:** 50+ qualified leads/month from chat agent
- **Conversion Rate:** 5%+ contact form completion
- **Chat Engagement:** 80%+ visitor chat initiation rate
- **Consultation Booking:** 30%+ of chat leads → booked consultations

### Technical Metrics
- **Performance:** Lighthouse score 95+, LCP < 2.5s
- **SEO:** #1-3 rankings for target keywords (both English & Arabic)
- **Availability:** 99.9% uptime
- **Accessibility:** WCAG 2.1 AA compliance 100%

### User Metrics
- **Mobile Traffic:** 60%+ of total traffic
- **Return Visitors:** 40%+ returning within 30 days
- **Blog Engagement:** 3+ min avg. time on page
- **Bilingual Usage:** 30%+ Arabic language traffic from Egypt/MENA

---

## Part 7: Maintenance & Scaling

### Post-Launch (Monthly)
- [ ] Monitor performance & analytics
- [ ] Update blog with new AI insights
- [ ] Optimize chat agent based on conversations
- [ ] Update portfolio with new case studies
- [ ] Security updates & dependency upgrades

### Quarterly
- [ ] A/B test landing page variations
- [ ] Quarterly content audit & refresh
- [ ] Chat agent training data updates
- [ ] Design system component additions
- [ ] SEO performance analysis

### Design System for Future Apps
Once validated on the website, this design system will power:
1. **Client Dashboard** (project tracking, analytics)
2. **Internal CMS** (content management)
3. **Campaign Manager** (unified advertising view)
4. **Analytics Portal** (client reporting)
5. **Team Collaboration App** (feedback, approvals)

---

## Part 8: Team & Resources

### Required Roles
- **Product Manager** (1) - Strategy, prioritization
- **Frontend Developers** (2-3) - React/Next.js
- **Backend/API Developer** (1) - Node.js, integrations
- **UI/UX Designer** (1) - Design system, components
- **Content Strategist** (1) - Bilingual content
- **QA Engineer** (1) - Testing, QA
- **DevOps/Infra** (0.5) - Deployment, monitoring

### External Resources
- AI Integration: Claude API (Anthropic)
- CRM: HubSpot
- Hosting: Vercel
- CDN: Cloudflare (optional)
- Analytics: Google Analytics 4 + HubSpot

---

## Part 9: Budget Considerations

### Development Costs (Estimated)
- Design System: $15K-20K
- Website Build: $30K-40K
- Chat Agent Integration: $10K-15K
- Testing & QA: $5K-8K
- Deployment & Infrastructure: $2K-3K
- **Total: $62K-86K**

### Ongoing Costs (Monthly)
- Hosting (Vercel): $50-200
- Claude API: $100-500 (based on usage)
- HubSpot: $50-500 (based on contacts)
- Analytics tools: $50-200
- **Total: ~$300-1,400/month**

---

## Next Steps

1. **Approve this strategy** ✅
2. **Assemble team** (designers, developers, content)
3. **Start Phase 1** (Design System)
4. **Set up development environment**
5. **Begin content planning** (Phase 2)
6. **Launch with Phase 9** (Production deployment)

---

**Questions? Contact:** yasser.dorgham@gmail.com
