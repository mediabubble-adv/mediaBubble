# MediaBubble Repository — Master Context File

**Purpose:** Single handoff document for AI assistants, collaborators, and future sessions.  
**Owner:** Yasser Dorgham (yasser.dorgham@gmail.com)  
**Last updated:** June 22, 2026  
**Repo:** [mediabubble-adv/mediaBubble](https://github.com/mediabubble-adv/mediaBubble) (private GitHub) — Nx monorepo: `web-eg`, `web-ae`, `brand` apps + shared packages

> **How to use with other AI tools:** Upload or paste this file first. Then add `docs/website/README.md` for website work, `docs/getting-started/START_HERE.md` for OpenCode agents, or `docs/developing/Brand-Guidelines/BRAND_GUIDELINES_V2.0.md` for brand rules.

---

## 1. What this repository is

MediaBubble is a **full-service marketing agency in Hurghada, Egypt** (est. 2015). This repo is the **digital platform workspace** — not just a single app:

| Layer                         | What it is                                                 | Status                                                           |
| ----------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------- |
| **Marketing website (Egypt)** | `apps/web-eg` → mediabubble.co                             | Built — ~70% of planned v1                                       |
| **Marketing website (UAE)**   | `apps/web-ae` → mediabubble.ae (structural clone of EG)    | Scaffolded — Khaliji i18n stub; content via pipeline             |
| **Brand guidelines app**      | `apps/brand` → brand.mediabubble.co (root route)           | Built — feature-complete                                         |
| **MediaBubble Launcher**      | `apps/launcher` → launcher.mediabubble.co                  | Phase 1 complete — team internal operations platform             |
| **Design system**             | `packages/design-system` — UI primitives + Tailwind preset | Built — Rollup dist                                              |
| **Shared lib**                | `packages/shared` — env, API clients, i18n factory         | Built                                                            |
| **Content pipeline**          | `packages/content-pipeline` — UAE localization             | Stub                                                             |
| **Planning corpus**           | Strategy, audits, roadmaps under `docs/`                   | Extensive — organized under docs/ launcher, website, brand, etc. |
| **AI agent ecosystem**        | Arabic-first OpenCode/Claude skills & agents               | Specified — consolidation not finished                           |
| **Business operations docs**  | HR, finance, org, AI sales strategy                        | Documented — not code                                            |

**Production target:** Replace legacy WordPress/Elementor site with bilingual (English + Egyptian Arabic Masri), conversion-focused Next.js on Vercel, HubSpot CRM, GA4, optional AI chat agent.

---

## 2. Progress at a glance

### Implemented in code (done)

- **Nx monorepo** — `npm run build` runs `nx run-many -t build` (design-system, web-eg, web-ae, brand)
- **Marketing routes** (`apps/web-eg`, `apps/web-ae`): `/`, `/about`, `/services`, `/services/[slug]`, `/portfolio`, `/portfolio/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/privacy`, `/terms`, `/cookies`
- **Brand guidelines** (`apps/brand` at `/`): 14 sections, sidebar nav, search, copy-to-clipboard, skill tree, AI prompt tools
- **i18n:** English + Arabic (Masri) via i18next, RTL (`tailwindcss-rtl`), `LanguageSwitcher`
- **Design tokens:** Tailwind `brand-*` colors, fonts (Inter, Poppins, Cairo, JetBrains Mono)
- **UI components:** Button, Card, HeroSection, ServicePageTemplate, SiteNav, SiteFooter, etc. — see `docs/app/COMPONENT_LIBRARY.md`
- **Phase 1 conversion UI:** NewsletterModal, FloatingCta, CookieConsent (global via `I18nLayoutWrapper`)
- **Phase 3 UX:** InteractiveCursor, Phase3Provider (global)
- **Content data:** 5 service detail pages (`seo`, `ppc`, `social`, `branding`, `web`), 6 blog posts, 6 case studies — in `apps/web-eg/lib/data/` and `apps/web-eg/lib/services-data.ts`
- **API routes:** `/api/contact` (Resend email + HubSpot upsert), `/api/hubspot` (newsletter)
- **SEO:** `sitemap.ts`, `robots.ts`, per-page metadata, JSON-LD LocalBusiness schema, OG images
- **CI:** `.github/workflows/ci.yml` (push/PR to `master`, `workflow_dispatch`); private-repo README uses static shields.io badge
- **Docs organization:** All planning moved under `docs/`; root `README.md` is the canonical onboarding guide (badges, architecture, env, packages, i18n, Vercel, CI)
- **CSP middleware:** `createCspMiddleware` from `@mediabubble/shared/csp-middleware` in each app `middleware.ts`; path alias in `tsconfig.base.json` + per-app `tsconfig.json`

### Partially done

- **HubSpot / Resend:** API wired; needs `.env.local` keys (`HUBSPOT_API_KEY`, `RESEND_API_KEY`) — see `.env.example`
- **GA4:** `GoogleAnalytics` component; needs `NEXT_PUBLIC_GA4_ID`
- **Service page template:** Architecture doc exists; 5 of 15+ planned services have data
- **Mega-menu / cursor effects:** `InteractiveCursor` started; full mega-menu per `docs/website/MENU_AND_CURSOR_EFFECTS.md` not complete
- **GitModal:** Component exists; page-triggered, not global
- **Accessibility / WCAG AA:** Claimed in brand docs; formal audit not completed
- **Tests:** Jest + Testing Library in root `package.json`; Husky lint-staged runs related tests on staged TS/TSX; Storybook not configured

### Planned but not built

- **AI chat agent** (Claude, 24/7 lead qualification) — spec: `docs/business/ai-agents/AI_CHAT_AGENT_SPECIFICATION.md`
- **OpenCode consolidation** (45 → 12 agents) — plan: `docs/opencode/OPENCODE_REORGANIZATION_PLAN.md`
- **Open-source launch** (@mediabubble/design-system NPM, website template, nezam) — `docs/business/strategy/COMPLETE_STRATEGY_SUMMARY.md`
- **40+ blog posts, 10+ live case studies** (content strategy)
- **Lighthouse 95+, full SEO content program**
- **Storybook + full shadcn/ui component library** (40+ components in design system guide)

### Rough completion vs plans

| Plan                                        | Scope                                    | Est. complete   |
| ------------------------------------------- | ---------------------------------------- | --------------- |
| Website Jun 2026 bundle                     | Conversions, menus, service architecture | ~55%            |
| Next.js app (audit roadmap)                 | Tokens, components, onboarding, a11y     | ~40%            |
| 12-week website rebuild (business strategy) | Full marketing platform + AI             | ~25%            |
| 52-week transformation (3 pillars)          | Website + OSS + revenue                  | ~20%            |
| OpenCode agent consolidation                | 10-week execution pack                   | ~5% (docs only) |

---

## 3. Repository folder structure

```
mediabubble Main/
├── README.md                 # Canonical monorepo guide (onboarding, architecture, CI, packages)
├── AGENTS.md                 # Cursor/agent workspace memory (preferences + facts)
├── package.json              # @mediabubble/workspace (npm workspaces + Nx scripts)
├── nx.json, tsconfig.base.json, .eslintrc.json
├── .env.example              # GA4, Resend, HubSpot (shared across apps)
├── .github/workflows/ci.yml
├── scripts/clone-eg-to-ae.ts # Structural UAE clone from web-eg
│
├── apps/
│   ├── web-eg/               # Egypt marketing → mediabubble.co
│   ├── web-ae/               # UAE marketing → mediabubble.ae
│   ├── brand/                # Brand guidelines → brand.mediabubble.co
│   └── launcher/             # MediaBubble Launcher → launcher.mediabubble.co
├── packages/
│   ├── design-system/        # @mediabubble/design-system
│   ├── shared/               # @mediabubble/shared
│   └── content-pipeline/     # UAE localization tooling
└── docs/                     # ALL documentation (see §5)
```

### Hidden / tooling folders (not app code)

| Path              | Purpose                                                         |
| ----------------- | --------------------------------------------------------------- |
| `.opencode/`      | 14 Arabic-focused agent definitions + skills                    |
| `.claude/skills/` | 38 Claude Code skills (Arabic linguistics, design, Quran, etc.) |
| `.kilocode/`      | Secondary agent tooling config                                  |
| `.remember/`      | Session memory logs (local)                                     |
| `node_modules/`   | Dependencies                                                    |

---

## 4. Application structure (code)

### 4.1 Apps and domains

| App        | Path            | Domain                  | Dev                            | Arabic locale       |
| ---------- | --------------- | ----------------------- | ------------------------------ | ------------------- |
| `web-eg`   | `apps/web-eg`   | mediabubble.co          | `npm run dev:eg` (:3000)       | `ar-masri`          |
| `web-ae`   | `apps/web-ae`   | mediabubble.ae          | `npm run dev:ae` (:3001)       | `ar` (Khaliji stub) |
| `brand`    | `apps/brand`    | brand.mediabubble.co    | `npm run dev:brand` (:3002)    | `ar-masri`          |
| `launcher` | `apps/launcher` | launcher.mediabubble.co | `npm run dev:launcher` (:3003) | —                   |

Re-sync UAE structure after Egypt changes: `npx tsx scripts/clone-eg-to-ae.ts` then re-apply UAE metadata/i18n deltas in `apps/web-ae`.

### 4.2 Marketing routes (`apps/web-eg`, `apps/web-ae`)

| Route                                                      | Notes                                        |
| ---------------------------------------------------------- | -------------------------------------------- |
| `/`, `/about`, `/services`, `/services/[slug]`             | Marketing pages                              |
| `/portfolio`, `/portfolio/[slug]`, `/blog`, `/blog/[slug]` | Content                                      |
| `/contact`, `/privacy`, `/terms`, `/cookies`               | Conversion + legal                           |
| `/api/contact`, `/api/hubspot`                             | Resend + HubSpot (via `@mediabubble/shared`) |

**Service slugs:** `seo`, `ppc`, `social`, `branding`, `web`  
**Portfolio slugs:** `coral-bay`, `red-sea-divers`, `aqua-sports`, `desert-rose`, `marina-view`, `hurghada-rentals`  
**Blog slugs:** `seo-hurghada-tourism`, `google-ads-roas-red-sea`, `social-media-egypt-2025`, `branding-small-business-egypt`, `website-conversion-rate-optimisation`, `content-marketing-roi`

### 4.3 Packages

| Package                         | Path                        | Exports                                                                                                                         |
| ------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `@mediabubble/design-system`    | `packages/design-system`    | Button, Card, MasterSwatch, SectionHeader, `mbPreset`                                                                           |
| `@mediabubble/shared`           | `packages/shared`           | `client`, `server`, `csp-middleware`, hubspot/resend clients, env, rate-limit, ga4-events, i18n factory, `security-headers.cjs` |
| `@mediabubble/content-pipeline` | `packages/content-pipeline` | `localizeForUAE`, `nx run content-pipeline:localize`                                                                            |

**Module boundary:** packages must not import from `apps/*` (enforced in `.eslintrc.json`).

### 4.4 Middleware & security (all Next apps)

Each app (`web-eg`, `web-ae`, `brand`) has `middleware.ts` that:

1. Imports `createCspMiddleware` from `@mediabubble/shared/csp-middleware` (not a relative path into `packages/`).
2. Inlines `export const config = { matcher: [...] }` — matcher arrays cannot be imported from `.cjs` helpers (Next.js static analysis).
3. Pairs with `security-headers.cjs` in `next.config.js` for production CSP headers.

**TypeScript:** Apps override `compilerOptions.paths` in their own `tsconfig.json`. Any `@mediabubble/shared/*` alias from `tsconfig.base.json` must be repeated there (e.g. `csp-middleware` → `../../packages/shared/csp-middleware.cjs`).

### 4.5 Brand app (`apps/brand`)

- Entry: `app/page.tsx` → `BrandGuidelinesApp`
- Brand-only: `components/sections/`, `skill-tree/`, `constants.ts`, `lib/data/arabic-taxonomy.ts`
- Shared UI from `@mediabubble/design-system`; brand UI (`ColorFamilyCard`, etc.) stays in `apps/brand/components/ui/`

### 4.6 Environment variables (`.env.example`)

| Variable               | Purpose                         |
| ---------------------- | ------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL              |
| `NEXT_PUBLIC_GA4_ID`   | Google Analytics 4              |
| `RESEND_API_KEY`       | Contact form email delivery     |
| `CONTACT_EMAIL`        | Inbox for form submissions      |
| `HUBSPOT_API_KEY`      | CRM contact upsert + newsletter |

---

## 5. Documentation map (`docs/`)

All planning lives under `docs/`. **Index:** `docs/README.md`

```
docs/
├── CONTEXT.md                  ← THIS FILE (master AI handoff)
├── README.md                   # Doc index
│
├── website/                    # Jun 2026 website transformation (START HERE for site work)
│   ├── README.md               # Overview + links to all website guides
│   ├── WEBSITE_IMPROVEMENT_PLAN.md
│   ├── WEBSITE_AUDIT_AND_IMPROVEMENT_PLAN.md
│   ├── PHASE_1_IMPLEMENTATION_GUIDE.md
│   ├── SERVICE_PAGE_ARCHITECTURE.md
│   ├── MENU_AND_CURSOR_EFFECTS.md
│   ├── BEFORE_AFTER_COMPARISON.md
│   └── QUICK_START_SUMMARY.md
│
├── launcher/                   # MediaBubble Launcher (internal ops)
│   ├── LAUNCHER_COMPREHENSIVE_GUIDE.md # Consolidated guide containing all 26 docs
│   ├── LAUNCHER_README.md      # Launcher readme & dashboard spec
│   ├── LAUNCHER_PLAN_V2.md     # Single source of truth for Phase 1-2
│   ├── LAUNCHER_ARCHITECTURE.md
│   ├── WORKSPACE_ECOSYSTEM.md
│   ├── ADVANCED_LAUNCHER_ORCHESTRATION.md
│   ├── PROJECT_SUMMARY.md      # Monorepo app specs
│   ├── LAUNCHER_DATABASE_SCHEMA.sql # Prisma schema
│   └── (Checklists, roadmap visuals, technical pivot roadmaps)
│
├── opus/                       # OPUS autonomous marketing platform
│   ├── README.md
│   ├── product/                # PRD, delivery summary, who/pain/value
│   ├── architecture/           # System design, scalability
│   ├── development/            # Implementation guides by workstream
│   ├── integrations/           # Meta, Google, HubSpot strategy
│   ├── roadmap/                # 3-year plan
│   ├── session/                # Planning session synthesis
│   ├── RETHINK_CLEAN_ARCHITECTURE.md
│   └── STRATEGIC_DECISION_ANALYSIS.md
│
├── tools/                      # Internal tool prototypes
│   └── prompt-generator/       # Advanced Prompt Generator UI + integration guide
│
├── operations/                 # Deployment checklists, adoption frameworks
│   ├── DEPLOYMENT_CHECKLIST.md
│   └── ADOPTION_ACCOUNTABILITY_SYSTEM.md
│
├── app/                        # Next.js app audits & implementation
│   ├── MEDIABUBBLE_APP_AUDIT_REPORT.md
│   ├── EXECUTION_SUMMARY.md
│   ├── IMPLEMENTATION_PRIORITIES.md
│   ├── COMPONENT_LIBRARY.md
│   ├── APP_MODIFICATIONS_PLAN.md
│   ├── SIDEBAR_IMPLEMENTATION_GUIDE.md
│   ├── HEADER_SCROLL_IMPLEMENTATION_GUIDE.md
│   └── IMPLEMENTATION_SUMMARY.md
│
├── getting-started/            # OpenCode / agent consolidation entry & guides
│   ├── START_HERE.md
│   ├── QUICK_DECISION_GUIDE.md
│   ├── QUICK_START_GUIDE.md
│   ├── QUICK_START_SUMMARY.md
│   ├── README_START_HERE.md
│   ├── EXECUTION_START_HERE.md
│   ├── CURSOR_IDE_EXECUTION_GUIDE.md
│   ├── CLAUDE_CODE_QUICK_START.md
│   ├── QUICK_IMPLEMENTATION_CHECKLIST.md
│   ├── QUICK_REFERENCE.md
│   └── README_PLAN_OVERVIEW.md
│
├── audits/                     # Codebase & plan audit reports
│   ├── COMPREHENSIVE_AUDIT_REPORT.md
│   ├── AUDIT_FIX_EXECUTION_PLAN.md
│   ├── AUDIT_SUMMARY_QUICK_START.md
│   ├── BUGS_VERIFICATION_REPORT.md
│   ├── PLAN_VERIFICATION_REPORT.md
│   ├── MEDIA_BUBBLE_ANTIGRAVITY_AUDIT.md
│   └── MEDIA_BUBBLE_OPENCODE_AUDIT.md
│
├── opencode/                   # Agent consolidation architecture
│   ├── OPENCODE_REORGANIZATION_PLAN.md
│   ├── ENHANCED_SKILLS_ARCHITECTURE.md
│   ├── FINAL_CLAUDE_CODE_MASTER_PLAN.md
│   ├── ADVANCED_CONSOLIDATION_PLAN.md
│   ├── ADVANCED_SUMMARY.md
│   ├── CONSOLIDATION_COMPARISON.md
│   ├── ENHANCED_ARCHITECTURE_SUMMARY.md
│   └── SKILL_POWER_LEVELS.md
│
├── execution/                  # Copy-paste Claude Code prompts & briefs
│   ├── CLAUDE_CODE_EXECUTION_PACK.md
│   ├── CLAUDE_CODE_IMPLEMENTATION_BRIEF.md
│   └── CLAUDE_CODE_IMPLEMENTATION_PROMPT.md
│
├── agents/                     # Skill definitions, agent specs, audits
├── phases/                     # Phased deliverables
│
├── planning/                   # Roadmaps, master checklists, briefs
│   ├── MASTER_ROADMAP.md
│   ├── MASTER_DEVELOPMENT_PLAN.md
│   ├── IMPLEMENTATION_CHECKLIST.md
│   ├── EXECUTIVE_SUMMARY.md
│   ├── QUICK_ACTION_PLAN.md
│   └── QUICK_REFERENCE.md
│
├── brand/                      # Brand audits, consistency, specs
│   ├── BRAND_AUDIT_REPORT.md
│   ├── BRAND_IMPROVEMENT_ROADMAP.md
│   ├── Brand_Consistency_Implementation_Guide.md
│   ├── MediaBubble_Brand_Consistency_Audit.md
│   ├── PRODUCT.md              # Brand guidelines product spec
│   └── DESIGN.md               # Brand guidelines creative config
│
├── business/                   # Business strategy, AI agents, HR, finance, marketing
│   ├── strategy/               # 52-week strategy summaries
│   ├── ai-agents/              # AI chatbot agent specifications
│   ├── mediabubble-digital-presence-directory.md
│   ├── mediabubble_complete_org_structure.md
│   └── marketing/              # AI workflows, asset lists, generation logs
│       ├── MAGNIFIC_ASSET_WORKFLOW.md
│       ├── MAGNIFIC_GENERATION_WORKFLOW.md
│       ├── ACTUAL_GENERATION_WORKFLOW.md
│       ├── ENHANCED_ASSET_LIST_WITH_PROMPTS.md
│       ├── BATCH_1_GENERATION_LOG.md
│       ├── BATCH_1_REIMAGINED_PROMPTS.md
│       ├── GENERATION_STATUS_UPDATE.md
│       └── QUICK_GENERATION_GUIDE.md
│
├── developing/                 # Rebuild specs & brand guidelines
│   ├── website/                # Developer guides & rebuild strategy
│   ├── Design-System/          # Design system specs
│   ├── Brand-Guidelines/       # Brand voice & color guidelines
│   │   ├── BRAND_GUIDELINES_V2.0.md
│   │   ├── MediaBubble_Brand_Guidelines.md
│   │   ├── brand-voice-guidelines.md
│   │   └── MAGNIFIC_PEOPLE_COLOR_GUIDELINES.md
│   └── IMAGE_OPTIMIZATION_STANDARDS.md
│
├── content/                    # Site copy drafts & improvements
│   └── COPY_IMPROVEMENTS.md
│
├── reference/                  # Legacy WordPress scrape, logos, taxonomy YAML
├── assets/                     # design-tokens.css, diagrams, shared assets
└── archive/                    # Superseded docs
```

---

## 6. What we were planning (strategic tracks)

### Track A — Website transformation (Jun 2026, highest priority for code)

**Goal:** High-converting bilingual marketing site.

**Pillars:**

1. Conversion optimization — newsletter modal, floating CTA, exit intent
2. Scalable architecture — `ServicePageTemplate`, reusable components
3. Modern UX — mega-menu, cursor effects, animations

**Phases (6 weeks in docs):**

- Phase 1 (weeks 1–2): Newsletter + popups + floating CTA — **partially in code**
- Phase 2 (weeks 3–4): Mega-menu + cursor — **started**
- Phase 3 (weeks 5–6): Service template rollout — **5 services done**

**Key doc:** `docs/website/README.md`

---

### Track B — 12-week website rebuild (business strategy)

**Goal:** AI-powered marketing site → $50K+/month leads.

**Includes:** Design system (40+ components), bilingual site, AI chat agent, SEO 95+, 40+ blog posts.

**Key doc:** `docs/business/strategy/PROJECT_KICKOFF_SUMMARY.md`, `docs/developing/website/MEDIABUBBLE_WEBSITE_REBUILD_STRATEGY.md`

---

### Track C — 52-week full transformation

**Goal:** WordPress agency → AI-powered open-source platform.

**Three pillars:**

1. Website rebuild (weeks 1–12)
2. Open source launch — design-system NPM, website template, nezam (weeks 13–16)
3. Revenue & community scaling (ongoing)

**Key doc:** `docs/business/strategy/COMPLETE_STRATEGY_SUMMARY.md`

---

### Track D — OpenCode / Arabic AI agents

**Goal:** Consolidate ~45 scattered agents/skills into ~12 focused agents with tiered skills (Arabic-first).

**Status:** Extensive specs; `.opencode/agents/` has 14 agents; `.claude/skills/` has 38 skills; **consolidation not executed**.

**Key docs:** `docs/getting-started/START_HERE.md`, `docs/opencode/OPENCODE_REORGANIZATION_PLAN.md`, `docs/execution/CLAUDE_CODE_EXECUTION_PACK.md`

---

### Track E — Brand guidelines product

**Goal:** Industry-leading interactive brand system for internal team + clients.

**Status:** `apps/brand` (brand.mediabubble.co) is the main deliverable; educational content and developer resources still expanding per audits.

**Key docs:** `docs/developing/Brand-Guidelines/BRAND_GUIDELINES_V2.0.md`, `docs/brand/BRAND_AUDIT_REPORT.md`

---

## 7. Brand & design system (quick reference)

| Token            | Value                 | Use                |
| ---------------- | --------------------- | ------------------ |
| Brand Yellow     | `#FFC107`             | CTAs, accents      |
| Brand Blue       | `#2196F3`             | Links, interactive |
| Dark Blue / Navy | `#1565C0` / `#072A6B` | Headings, sidebars |
| Deep Charcoal    | `#0D0F12`             | Dark surfaces      |
| Canvas           | `#FAFAFA`             | Page backgrounds   |

**Fonts:** Inter (body), Poppins (display), Cairo (Arabic), JetBrains Mono (code)

**Voice:** Professional, outcome-focused, Hurghada/local expertise, bilingual EN + Masri Arabic.

---

## 8. Recent organizational work

Completed June 2026:

1. **Nx monorepo migration** — `apps/web-eg`, `apps/web-ae`, `apps/brand` + `packages/design-system`, `shared`, `content-pipeline`
2. Removed root monolith (`app/`, `components/`, `lib/`); marketing and brand are separate deployable apps
3. **Clone-and-diverge** — `scripts/clone-eg-to-ae.ts` + `content-pipeline:localize` for UAE
4. Moved **57+ markdown files** from repository root → `docs/` subfolders
5. CI builds all four Nx projects via `nx run-many -t build`

---

## 9. Commands & verification

```bash
npm install
npm run dev:eg       # Egypt marketing → http://localhost:3000
npm run dev:ae       # UAE marketing → http://localhost:3001
npm run dev:brand    # Brand guidelines → http://localhost:3002
npm run dev:launcher # MediaBubble Launcher → http://localhost:3003
npm run build        # NX_DAEMON=false recommended: nx run-many -t build
npm run db:migrate   # Run Prisma migrate for Launcher
npm run db:seed      # Seed Launcher database
npx nx graph         # Dependency graph
npx tsx scripts/clone-eg-to-ae.ts
npx nx run content-pipeline:localize
```

**Deploy:** Three Vercel projects (root directory per app: `apps/web-eg`, `apps/web-ae`, `apps/brand`). Each app has `vercel.json`. Set env vars from `.env.example`.

---

## 10. Recommended reading order for AI assistants

| If the task is…                | Read first                                                                       |
| ------------------------------ | -------------------------------------------------------------------------------- |
| Understand entire repo         | **This file** (`docs/CONTEXT.md`)                                                |
| Website features / conversions | `docs/website/README.md`                                                         |
| Fix or extend marketing site   | `apps/web-eg/` (or `web-ae`) + `docs/app/COMPONENT_LIBRARY.md`                   |
| Brand / colors / typography    | `apps/brand/` + `docs/brand/PRODUCT.md`                                          |
| Fix or extend Launcher app     | `apps/launcher/` + `docs/launcher/LAUNCHER_COMPREHENSIVE_GUIDE.md`               |
| Shared UI / tokens             | `packages/design-system/`                                                        |
| Service page content           | `apps/web-eg/lib/services-data.ts` + `docs/website/SERVICE_PAGE_ARCHITECTURE.md` |
| OpenCode / agents              | `docs/getting-started/START_HERE.md`                                             |
| Business / revenue strategy    | `docs/business/strategy/COMPLETE_STRATEGY_SUMMARY.md`                            |
| AI chat agent (future)         | `docs/business/ai-agents/AI_CHAT_AGENT_SPECIFICATION.md`                         |
| HubSpot / contact form         | `apps/web-eg/app/api/contact/route.ts`, `packages/shared`, `.env.example`        |

---

## 11. Known gaps & next priorities

1. **Vercel** — create four projects (web-eg, web-ae, brand, launcher) with correct root directories
2. **Fill `.env.local`** — GA4, Resend, HubSpot, and Supabase database URLs for production (per app / domain)
3. **UAE content** — run `content-pipeline:localize` with `OPENAI_API_KEY` for real Khaliji copy
4. **Complete remaining service pages** — 10+ services in nav but only 5 in `services-data.ts`
5. **Mega-menu** — per `MENU_AND_CURSOR_EFFECTS.md`
6. **AI chat agent** — largest unbuilt strategic feature
7. **OpenCode consolidation** — execute `CLAUDE_CODE_EXECUTION_PACK` phases
8. **Test runner** — wire Vitest or remove orphan test files
9. **Accessibility audit** — WCAG 2.1 AA verification
10. **Content** — expand blog/case studies from seed data to full CMS or MDX

---

## 12. Contact & ownership

- **Owner:** Yasser Dorgham — yasser.dorgham@gmail.com
- **Agency:** MediaBubble, Hurghada, Egypt
- **Live legacy site:** mediabubble.com (WordPress — being replaced by this repo)

---

_End of context file. For doc index see `docs/README.md`. For app quick start see root `README.md`._
