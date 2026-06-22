# MediaBubble Internal Dashboard Launcher Architecture

**Status:** Strategic Framework  
**Version:** 1.0.0  
**Date:** June 21, 2026

---

## Executive Summary

The **Launcher** is a unified internal dashboard that orchestrates all MediaBubble workflows. The **Advanced Prompt Generator** sits at the center, acting as a **single source of truth** that powers outputs for 7 departments. Each department reads the generated outputs, applies their own specialized logic, and produces their own deliverables.

**Key Insight:** One prompt → 7 customized outputs → 7 parallel workflows

---

## System Architecture

### Level 1: The Launcher Shell

```
┌─────────────────────────────────────────────────────────────┐
│              MEDIABUBBLE INTERNAL DASHBOARD                 │
│              (Next.js Shell + Shared Context)               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Left Sidebar (Navigation)                                  │
│  ├─ 🎯 Prompt Generator (PRIMARY)                           │
│  ├─ 📝 Content Creation Workspace                           │
│  ├─ 📊 Marketing Workspace                                  │
│  ├─ 💰 Advertising Workspace                                │
│  ├─ 🤝 Sales Workspace                                      │
│  ├─ 🎨 UI/UX Design Workspace                               │
│  ├─ 🛠️  Development Planning Workspace                      │
│  └─ ✨ Vibe Coding Workspace                                │
│                                                              │
│  Header (Shared Context)                                    │
│  ├─ 👤 User / Team Name                                     │
│  ├─ 📁 Current Project                                      │
│  ├─ 🔍 Quick Search (across all workspaces)                │
│  └─ ⚙️  Settings & Integrations                             │
│                                                              │
│  Main Content Area (Active Workspace)                       │
│  └─ [Workspace-specific UI renders here]                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Level 2: Prompt Generator (The Hub)

**Role:** Generate one **core prompt** that becomes input for all 7 departments

```
┌──────────────────────────────────────────────────┐
│    ADVANCED PROMPT GENERATOR                     │
│    (3-Pane Layout: Settings | Preview | Output)  │
├──────────────────────────────────────────────────┤
│                                                  │
│  INPUT (Left Pane)                               │
│  ├─ Mode (Image/Video)                           │
│  ├─ Subject                                      │
│  ├─ Camera Specs                                 │
│  ├─ Lighting                                     │
│  ├─ Brand Color + Intensity                      │
│  ├─ Safe Zones                                   │
│  └─ Mood/Style                                   │
│                                                  │
│  PROCESSING (Center Pane)                        │
│  └─ Real-time preview placeholder                │
│                                                  │
│  OUTPUT (Right Pane)                             │
│  ├─ Prompt Strength Score (0-100)                │
│  ├─ Interactive Chips (Camera, Lighting, etc)    │
│  ├─ Full Prompt Text (copy-to-clipboard)         │
│  └─ [ACTION BUTTONS]                             │
│     ├─ Generate                                  │
│     ├─ Copy Prompt                               │
│     ├─ Save as Draft                             │
│     └─ → Send to [Department]                    │
│                                                  │
└──────────────────────────────────────────────────┘
         ↓ (Single unified prompt)
    [DATABASE: Prompt History]
         ↓
    [7 Department Workspaces Read This]
```

---

## Department Workflow Flows

### The Department Flow Pattern

Each department follows this pattern:

```
1. TRIGGER
   ├─ User opens department workspace from launcher
   ├─ User selects existing prompt from history OR creates new one
   └─ User clicks "Use This Prompt" button

2. INPUT (Pre-filled from Prompt Generator)
   ├─ Core prompt data loads automatically
   └─ Department-specific accordion sections appear

3. PROCESSING
   ├─ Department applies specialized logic
   ├─ Generates department-specific output
   └─ Real-time preview updates

4. OUTPUT
   ├─ Department produces formatted deliverable
   ├─ Export options (PDF, JSON, Markdown, etc)
   └─ Save to project database

5. INTEGRATION
   ├─ Output available to other departments
   ├─ Cross-references tracked in project
   └─ Audit trail maintains lineage
```

---

## Department Workflows (Detailed)

### 1️⃣ Content Creation Workspace

**Entry Point:** `launcher/app/content-creation/page.tsx`

**Flow:**
```
Prompt Generator Output
         ↓
Content Creation Workspace Opens
         ↓
[Auto-filled from Prompt]
├─ Subject: [from prompt]
├─ Camera/Lighting: [inherited]
├─ Brand DNA: [inherited]
└─ Safe Zones: [inherited]
         ↓
[Department-Specific Sections]
├─ Accordion: Story Structure
│  ├─ Opening Hook (auto-suggested from prompt mood)
│  ├─ Character Arc
│  ├─ Climax Moment
│  └─ Call-to-Action Type
├─ Accordion: Format & Duration
│  ├─ Short-form (TikTok/Reels)
│  ├─ Long-form (YouTube)
│  └─ Duration: [30s / 60s / 3min]
├─ Accordion: Production Assets
│  ├─ Required Props
│  ├─ Location Type
│  └─ Talent Brief
└─ Accordion: Call-to-Action
   ├─ CTA Text
   ├─ Landing URL
   └─ Urgency Level
         ↓
[GENERATE] Content Production Brief
         ↓
OUTPUT:
├─ Content Format Specification
├─ Story Structure (Act 1/2/3)
├─ Visual Direction (camera angles, composition)
├─ Production Checklist (7-10 tasks)
├─ Assets Checklist (props, costumes, locations)
└─ Export Options (PDF, Google Doc, Notion)
         ↓
[NEXT STEP BUTTONS]
├─ → Send to Marketing
├─ → Send to Advertising
└─ → Create Production Schedule
```

**Key Integration:**
- Reads prompt subject, camera, lighting, brand DNA
- Produces **production-ready brief** that marketing + advertising consume
- Output links back to prompt (version control)

---

### 2️⃣ Marketing Workspace

**Entry Point:** `launcher/app/marketing/page.tsx`

**Flow:**
```
Prompt Generator Output
         ↓
Marketing Workspace Opens
         ↓
[Auto-filled from Prompt]
├─ Subject: [from prompt]
├─ Brand Color/Intensity: [inherited]
├─ Mood/Style: [inherited]
└─ Safe Zones: [inherited]
         ↓
[Department-Specific Sections]
├─ Accordion: Campaign Strategy
│  ├─ Campaign Goal (awareness/consideration/conversion)
│  ├─ Target Audience (demos, psychographics)
│  ├─ Campaign Duration
│  └─ Budget Allocation
├─ Accordion: Messaging Framework
│  ├─ Value Proposition (from brand DNA)
│  ├─ Key Messages (3-5 pillars)
│  ├─ Tone Variation Mapping
│  └─ Approval Workflow
├─ Accordion: Channel Strategy
│  ├─ Organic (Social, Email, Blog)
│  ├─ Paid (Google, Meta, LinkedIn, TikTok)
│  ├─ Channel Mix %
│  └─ Content Repurposing Rules
└─ Accordion: Performance Goals
   ├─ Reach Target
   ├─ Engagement Target (CTR, Comments, Shares)
   ├─ Conversion Target
   └─ KPI Benchmarks
         ↓
[GENERATE] Campaign Launch Brief
         ↓
OUTPUT:
├─ Campaign Overview (elevator pitch)
├─ Messaging Framework (pillars + variations)
├─ Channel Strategy & Allocation
│  ├─ Social Posts (3-5 variations per channel)
│  ├─ Email Sequence (5-email drip)
│  ├─ Blog Angle (1 featured article topic)
│  └─ Paid Copy (per platform: Google, Meta, LinkedIn)
├─ Creative Assets Required
│  ├─ Video specs (from Content Creation WS)
│  ├─ Still images (quantity, dimensions)
│  └─ Copy templates (by channel)
├─ Campaign Timeline (Week 1-4 tasks)
├─ Performance Dashboard Template
└─ Export Options (Markdown, Figma Link, Asana Import)
         ↓
[NEXT STEP BUTTONS]
├─ → Send to Advertising (for paid amplification)
├─ → Send to Content Creation (for asset production)
└─ → Create Campaign Schedule
```

**Key Integration:**
- Reads prompt subject, brand DNA, mood
- Consumes Content Creation brief (video specs)
- Produces messaging + channel strategy
- Hands off to Advertising for paid campaigns

---

### 3️⃣ Advertising (Paid Media) Workspace

**Entry Point:** `launcher/app/advertising/page.tsx`

**Flow:**
```
Prompt Generator Output
         ↓
Advertising Workspace Opens
         ↓
[Auto-filled from Prompt]
├─ Subject: [from prompt]
├─ Brand Color: [for design approval]
└─ Safe Zones: [for creative compliance]
         ↓
[Department-Specific Sections]
├─ Accordion: Ad Platform Configuration
│  ├─ Campaign Type (Awareness/Conversions/Traffic)
│  ├─ Ad Account Selection (Google/Meta/LinkedIn/TikTok)
│  ├─ Budget Cap (daily / total)
│  └─ Campaign Duration
├─ Accordion: Audience Targeting
│  ├─ Demographics (age, location, income)
│  ├─ Interests & Behaviors
│  ├─ Lookalike Audiences (from CRM)
│  ├─ Exclusion Lists
│  └─ Bid Strategy (Manual / Automatic)
├─ Accordion: Creative Variants
│  ├─ Video Creative (from Content Creation WS)
│  ├─ Static Image Fallbacks
│  ├─ Headline Variations (3-5 per platform)
│  ├─ Description Variations (3-5)
│  └─ CTA Button Text (per platform)
├─ Accordion: Performance Targets
│  ├─ CPC Target
│  ├─ ROAS Target (if e-commerce)
│  ├─ Conversion Target
│  └─ Frequency Cap
└─ Accordion: Optimization Rules
   ├─ Auto-pause rules (CPM > $X, ROAS < Y)
   ├─ Bid adjustment rules
   ├─ Creative rotation strategy
   └─ A/B test setup
         ↓
[GENERATE] Paid Media Campaign Specification
         ↓
OUTPUT:
├─ Per-Platform Specifications
│  ├─ [Google Ads]
│  │  ├─ Campaign structure (Search/Display/Shopping)
│  │  ├─ Keywords (40-50 terms)
│  │  ├─ Ad copy templates (headlines + descriptions)
│  │  ├─ Landing page recommendations
│  │  └─ Bid strategy (Smart Bidding recommended)
│  ├─ [Meta (Facebook/Instagram/Threads)]
│  │  ├─ Campaign structure (Conversion/Traffic)
│  │  ├─ Audience JSON (for import)
│  │  ├─ Creative assets (video + static images)
│  │  ├─ Ad copy (per placement: Feed, Stories, Reels)
│  │  └─ Placement strategy
│  ├─ [LinkedIn]
│  │  ├─ Campaign type (B2B / Sponsored Content)
│  │  ├─ Audience targeting (job titles, industries, companies)
│  │  ├─ Ad copy (professional tone)
│  │  └─ CTA options
│  └─ [TikTok]
│     ├─ Creator-friendly brief
│     ├─ Hashtag recommendations
│     ├─ Sound recommendations
│     └─ Hook strategy (first 3 seconds)
├─ Creative Variants (organized by platform)
│  ├─ Video: 15s, 30s, 60s versions
│  ├─ Images: 1:1, 16:9, 4:5 aspect ratios
│  └─ All variants have safe zone compliance ✅
├─ Daily Monitoring Checklist
│  ├─ Metrics to check (impressions, CTR, ROAS)
│  ├─ Alert thresholds
│  └─ Scaling/pausing decision trees
├─ Measurement Framework
│  ├─ UTM parameters (auto-generated)
│  ├─ Conversion pixel placement
│  └─ Attribution model recommendations
└─ Export Options (Google Sheets, Meta CSV, JSON for API)
         ↓
[NEXT STEP BUTTONS]
├─ → Export to Google Ads
├─ → Export to Meta Ads Manager
├─ → View in Analytics Portal
└─ → Launch Campaign
```

**Key Integration:**
- Reads prompt subject, brand colors, safe zones
- Consumes Marketing messaging framework
- Consumes Content Creation video assets
- Feeds performance data back to Analytics Portal
- Output is **directly importable** to ad platforms

---

### 4️⃣ Sales Workspace

**Entry Point:** `launcher/app/sales/page.tsx`

**Flow:**
```
Prompt Generator Output
         ↓
Sales Workspace Opens
         ↓
[Auto-filled from Prompt]
├─ Subject: [from prompt] (e.g., "Product Launch Campaign")
├─ Brand Color/DNA: [for brand consistency in assets]
└─ Mood/Style: [for tone in sales collateral]
         ↓
[Department-Specific Sections]
├─ Accordion: Sales Scenario
│  ├─ Deal Type (ACV: $5K / $25K / $100K+)
│  ├─ Industry Vertical
│  ├─ Company Size (SMB / Mid-Market / Enterprise)
│  └─ Use Case (from prompt subject)
├─ Accordion: Customer Context
│  ├─ Buying Committee (personas: CFO, CMO, COO)
│  ├─ Current Situation (problem statement)
│  ├─ Timeline to Decision (30/60/90 days)
│  └─ Competition Analysis
├─ Accordion: Sales Collateral Type
│  ├─ One-Pager (2-minute read)
│  ├─ Demo Script (discovery call talking points)
│  ├─ ROI Calculator (auto-generate from prompt)
│  ├─ Case Study Angle (similar use case)
│  └─ Pricing Sheet
└─ Accordion: Personalization
   ├─ Company Name (auto-fill from CRM)
   ├─ Prospect Name (auto-fill from CRM)
   ├─ Custom Industry Angle
   └─ Custom Pain Point
         ↓
[GENERATE] Sales Kit Package
         ↓
OUTPUT:
├─ Discovery Package (for first call)
│  ├─ Discovery Call Agenda (15-30 min)
│  ├─ Qualification Questions (MEDDIC-style)
│  ├─ Industry Benchmarks (proof points)
│  └─ Conversation Starters (3-5 open-ended Qs)
├─ Demo Package (for second/third meeting)
│  ├─ Demo Script (5-7 minutes)
│  ├─ Key Features to Demo (ranked by persona)
│  ├─ Objection Handling Guide
│  ├─ Screenshot/video links (from Content Creation WS)
│  └─ Live Demo Talking Points
├─ Proof Assets
│  ├─ One-Pager (PDF-ready, brand-compliant)
│  ├─ ROI Calculator
│  │  ├─ Assumptions (customizable)
│  │  ├─ 1-year savings projection
│  │  └─ Payback period
│  └─ Case Study Summary (from similar verticals)
├─ Follow-Up Sequences
│  ├─ Email 1 (Thank you + next steps)
│  ├─ Email 2 (Value reinforcement + ROI)
│  ├─ Email 3 (Proof point + case study)
│  ├─ Email 4 (Limited-time offer or urgency)
│  └─ Email 5 (Final close opportunity)
├─ Presentation Deck
│  ├─ Slide 1: Problem (their pain)
│  ├─ Slide 2: Impact (quantified)
│  ├─ Slide 3: Solution (your product)
│  ├─ Slide 4: Why Us (competitive advantage)
│  ├─ Slide 5: Customer Success Stories
│  ├─ Slide 6: Pricing & Packages
│  └─ Slide 7: Next Steps
├─ Quick Reference Card (1-page, laminate-ready)
│  ├─ Unique Value Prop (headline)
│  ├─ Top 3 Benefits
│  ├─ Proof Point
│  └─ CTA + Contact Info
└─ Export Options (Google Slides, PDF, Word, Email Template)
         ↓
[NEXT STEP BUTTONS]
├─ → Send Collateral Package to Prospect (email)
├─ → Schedule Follow-Up (Google Calendar integration)
├─ → Log to HubSpot Deal
└─ → Track Performance (opens, clicks, conversion)
```

**Key Integration:**
- Reads prompt subject (deal/use case), brand, tone
- Consumes Content Creation assets (demo videos)
- Exports directly to email, CRM, presentation tools
- Tracks performance back to CRM (open rates, click-throughs)

---

### 5️⃣ UI/UX Design Workspace

**Entry Point:** `launcher/app/design/page.tsx`

**Flow:**
```
Prompt Generator Output
         ↓
UI/UX Design Workspace Opens
         ↓
[Auto-filled from Prompt]
├─ Brand Color: [as primary color]
├─ Mood/Style: [design tone: playful, minimalist, luxury]
├─ Safe Zones: [for layout constraints]
└─ Subject: [design context]
         ↓
[Department-Specific Sections]
├─ Accordion: Design Challenge
│  ├─ Feature/Page to Design (from prompt subject)
│  ├─ User Goal (what are they trying to do?)
│  ├─ Current Problem (what's broken?)
│  └─ Success Metrics
├─ Accordion: Visual Direction
│  ├─ Brand Color Palette (auto-generated from prompt brand color)
│  ├─ Typography System (headings, body, labels)
│  ├─ Spacing System (8px grid)
│  ├─ Radius & Borders (design tokens)
│  └─ Shadows & Depth
├─ Accordion: Component Scope
│  ├─ Components to Design (checkboxes)
│  │  ├─ ☐ Buttons (primary, secondary, tertiary)
│  │  ├─ ☐ Input Fields (text, number, email)
│  │  ├─ ☐ Cards & Panels
│  │  ├─ ☐ Modals & Popovers
│  │  ├─ ☐ Navigation (tabs, breadcrumbs, sidebar)
│  │  └─ ☐ Data Tables
│  ├─ States to Cover (default, hover, active, disabled, error, loading)
│  └─ Accessibility Checklist (color contrast, touch targets)
├─ Accordion: Development Handoff
│  ├─ Design Token Format (JSON / CSS Variables / Tailwind)
│  ├─ Figma Component Structure (for dev import)
│  ├─ Responsive Breakpoints (mobile / tablet / desktop)
│  └─ Animation Specs (duration, easing, triggers)
└─ Accordion: Animation & Interaction
   ├─ Micro-interactions (hover states, transitions)
   ├─ Loading States (spinners, skeletons, progress)
   ├─ Error States (validation, alerts, recovery)
   └─ Gesture Support (mobile swipe, desktop hover)
         ↓
[GENERATE] Design System Specification
         ↓
OUTPUT:
├─ Design Brief (executive summary)
│  ├─ Feature Overview
│  ├─ User Personas
│  ├─ Success Metrics
│  └─ Timeline & Milestones
├─ Color Palette
│  ├─ Primary (brand color from prompt)
│  ├─ Secondary (complementary)
│  ├─ Semantic (success, warning, error, info)
│  ├─ Neutral (grays for UI structure)
│  └─ Dark Mode Variants (auto-generated)
├─ Typography System
│  ├─ Font Families (with fallbacks)
│  ├─ Scale (h1-h6 sizes, weights, line-heights)
│  ├─ Usage Guide (when to use h2 vs h3, etc)
│  └─ Code Snippet (CSS / Tailwind)
├─ Spacing System
│  ├─ Scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
│  ├─ Usage Rules (section padding, card margins, component gaps)
│  └─ Tailwind Classes (p-2 = 8px, etc)
├─ Border Radius & Corners
│  ├─ Options (sm: 4px, md: 8px, lg: 12px, full: 999px)
│  ├─ When to Use (buttons get md, cards get lg, avatars get full)
│  └─ Code Snippet
├─ Shadows & Depth
│  ├─ Options (none, sm, md, lg)
│  ├─ Elevation Rules (cards use md, modals use lg)
│  └─ Code Snippet
├─ Component Library
│  ├─ Button (primary, secondary, tertiary, icon, sizes)
│  ├─ Input (text, email, password, number, states)
│  ├─ Card (elevated, outlined, filled)
│  ├─ Modal (dialog structure, sizing, animation)
│  ├─ Navigation (tabs, breadcrumbs, sidebar)
│  ├─ Alerts & Notifications (success, error, warning, info)
│  ├─ Badges & Tags
│  ├─ Avatars (user, team, status indicators)
│  └─ Data Table (headers, rows, pagination)
├─ Interaction States
│  ├─ Default (how component looks at rest)
│  ├─ Hover (visual feedback for pointer)
│  ├─ Active (pressed/selected state)
│  ├─ Focus (keyboard accessibility ring)
│  ├─ Disabled (unavailable state)
│  ├─ Loading (async operation feedback)
│  └─ Error (validation failure feedback)
├─ Animation Library
│  ├─ Transitions (200ms ease-in-out)
│  ├─ Entrance Animations (fade-in, slide-up, scale)
│  ├─ Exit Animations (fade-out, slide-down)
│  ├─ Loading Spinners (rotation animation)
│  └─ Code Snippet (CSS Keyframes / Tailwind animate)
├─ Accessibility Requirements
│  ├─ WCAG 2.1 AA Compliance
│  ├─ Color Contrast Ratios (4.5:1 minimum)
│  ├─ Touch Targets (44x44px minimum)
│  ├─ Focus Indicators (visible ring, 2px offset)
│  ├─ Keyboard Navigation (Tab order, Escape to close)
│  └─ Screen Reader Hints (aria-labels, semantic HTML)
├─ Design Tokens (Choose Your Format)
│  ├─ JSON Format (for design tools)
│  │  ```json
│  │  {
│  │    "color": {
│  │      "primary": { "50": "#f0f9ff", "500": "#3b82f6", "900": "#1e3a8a" }
│  │    }
│  │  }
│  │  ```
│  ├─ CSS Variables (for frontend)
│  │  ```css
│  │  --color-primary: #3b82f6;
│  │  --space-md: 1rem;
│  │  ```
│  ├─ Tailwind Config (for rapid development)
│  │  ```ts
│  │  colors: { primary: '#3b82f6' }
│  │  ```
│  └─ TypeScript (for type-safe code)
│     ```ts
│     export const TOKENS = { colors: { primary: '#3b82f6' } }
│     ```
├─ Component Specs (Detailed)
│  ├─ Button Component
│  │  ├─ Props (label, variant, size, disabled, loading)
│  │  ├─ Layout (44x44px minimum hit area)
│  │  ├─ States (4 variants shown: primary, secondary, tertiary, ghost)
│  │  ├─ Animation (200ms fade + scale on hover)
│  │  └─ Code Link (Figma component + React component)
│  └─ [Similar for 5-7 more key components]
├─ Responsive Breakpoints
│  ├─ Mobile (< 640px)
│  ├─ Tablet (640px - 1024px)
│  ├─ Desktop (> 1024px)
│  └─ Responsive Rules (when to stack, when to hide)
├─ Handoff Checklist (for developers)
│  ├─ ☑ Figma file organized (components, variants, auto-layout)
│  ├─ ☑ Design tokens exported (JSON, CSS, Tailwind)
│  ├─ ☑ Specifications documented (width, height, padding, fonts)
│  ├─ ☑ Interactions annotated (transitions, animations)
│  ├─ ☑ Accessibility verified (color contrast, focus states)
│  └─ ☑ Redlines & measurements ready
└─ Export Options (Figma Link, Design Tokens JSON, Spec PDF)
         ↓
[NEXT STEP BUTTONS]
├─ → Export to Figma (create component library)
├─ → Export Design Tokens (for dev)
├─ → Send to Development Planning
└─ → View in UI Library Preview
```

**Key Integration:**
- Reads prompt subject, brand color, mood, safe zones
- Produces a **complete design system** (tokens + components)
- Exports design tokens that Development Planning consumes
- Figma component library auto-syncs to React component library

---

### 6️⃣ Development Planning Workspace

**Entry Point:** `launcher/app/development/page.tsx`

**Flow:**
```
Prompt Generator Output
         ↓
Development Planning Workspace Opens
         ↓
[Auto-filled from Prompt]
├─ Subject: [feature/project from prompt]
├─ Mood/Style: [technical approach implications]
└─ Safe Zones: [layout constraints → responsive design requirements]
         ↓
[Department-Specific Sections]
├─ Accordion: Project Scope
│  ├─ Feature Overview (from prompt subject)
│  ├─ Success Definition (what does "done" mean?)
│  ├─ Out of Scope (what are we NOT doing?)
│  └─ Constraints (time, budget, tech stack)
├─ Accordion: Requirements
│  ├─ Functional Reqs (user can do X)
│  ├─ Non-Functional Reqs (performance, accessibility)
│  ├─ Data Requirements (what data structures needed?)
│  └─ Integration Requirements (APIs to connect)
├─ Accordion: Development Approach
│  ├─ Architecture (frontend/backend/database)
│  ├─ Tech Stack (Next.js, React, TypeScript, Tailwind, shadcn/ui)
│  ├─ Design System Integration (read from Design WS)
│  ├─ API Design (REST / GraphQL endpoints)
│  └─ Database Schema (tables, relationships)
├─ Accordion: Constraints & Risks
│  ├─ Technical Risks (complexity, performance, integrations)
│  ├─ Resource Risks (team size, skill gaps)
│  ├─ Time Risks (dependencies, unknowns)
│  ├─ Mitigation Strategies
│  └─ Escalation Criteria
└─ Accordion: Quality & Testing
   ├─ Testing Strategy (unit, integration, e2e)
   ├─ Code Quality (linting, type checking, coverage targets)
   ├─ Performance Targets (Lighthouse >90)
   ├─ Accessibility (WCAG AA compliance)
   └─ Monitoring Plan (error tracking, performance monitoring)
         ↓
[GENERATE] Development Sprint Plan
         ↓
OUTPUT:
├─ Project Overview
│  ├─ High-level Description
│  ├─ Success Metrics (measurable)
│  └─ Timeline (13 weeks = 3 months)
├─ Feature Breakdown & Estimation
│  ├─ Feature 1: [Main Feature]
│  │  ├─ Stories (S1.1, S1.2, S1.3 - user stories)
│  │  ├─ Estimates (3 story points each)
│  │  ├─ Dependencies (design system tokens required)
│  │  └─ Acceptance Criteria
│  ├─ Feature 2: [Secondary Feature]
│  │  └─ [Same structure]
│  └─ Feature 3: [Polish & QA]
│     └─ [Same structure]
├─ Sprint Roadmap (13 Weeks = 3 Sprints)
│  ├─ Sprint 1 (Weeks 1-4): Foundation & Core Features
│  │  ├─ Week 1: Setup, design token integration, API design
│  │  ├─ Week 2-3: Core backend + frontend components
│  │  ├─ Week 4: Feature testing, bug fixes
│  │  └─ Sprint Goal: Minimum Viable Product (MVP) complete
│  │
│  ├─ Sprint 2 (Weeks 5-8): Secondary Features & Integration
│  │  ├─ Week 5-6: Additional features, API integrations
│  │  ├─ Week 7: Cross-feature testing, optimization
│  │  ├─ Week 8: Performance testing, accessibility audit
│  │  └─ Sprint Goal: Feature complete + performance optimized
│  │
│  └─ Sprint 3 (Weeks 9-13): Polish & Launch Prep
│     ├─ Week 9-10: Bug fixes, documentation, monitoring setup
│     ├─ Week 11-12: Staging deployment, user testing
│     ├─ Week 13: Final QA, deployment to production
│     └─ Sprint Goal: Production ready + launch checklist passed
├─ Risk & Mitigation
│  ├─ Technical Risks
│  │  ├─ Risk: Complex state management with 7 departments
│  │  ├─ Likelihood: Medium
│  │  ├─ Impact: High (blocks feature shipping)
│  │  └─ Mitigation: Use shared context API early, test integration weekly
│  ├─ Resource Risks
│  │  ├─ Risk: Designer/developer dependency (UI/UX WS → Dev WS)
│  │  ├─ Likelihood: High
│  │  └─ Mitigation: Parallelize, use component specs from Design WS
│  └─ Timeline Risks
│     ├─ Risk: Unknown complexity in API integrations
│     ├─ Likelihood: Medium
│     └─ Mitigation: Spike on integration points Week 1
├─ Dependencies
│  ├─ Internal: Design System (from UI/UX WS), Content assets (from Content WS)
│  ├─ External: HubSpot API, Claude API, Google Ads API (for Advertising WS)
│  └─ Blockers: None identified
├─ Team Allocation
│  ├─ Frontend: 1 senior engineer + 1 mid-level engineer
│  ├─ Backend: 1 senior engineer (shared with other projects)
│  ├─ QA: 1 QA engineer (part-time, shared)
│  └─ Design: Consuming output from UI/UX WS (no dev resource needed)
├─ Definition of Done
│  ├─ Code Review: 2 approvals minimum
│  ├─ Tests: Unit + integration tests (>80% coverage)
│  ├─ Documentation: Code comments + README updated
│  ├─ Performance: Lighthouse >90, page load <2s
│  ├─ Accessibility: WCAG AA audit passed
│  └─ Deployment: Staging tested, ready for production
├─ Weekly Checkpoint Schedule
│  ├─ Monday 10am: Sprint Planning (1 hour)
│  ├─ Wednesday 2pm: Mid-sprint Sync (30 min)
│  ├─ Friday 4pm: Sprint Review & Demo (1 hour)
│  ├─ Friday 5pm: Retrospective (30 min)
│  └─ Office Hours: Tuesday/Thursday 3pm (async support)
├─ Measurement Metrics
│  ├─ Velocity (story points completed per sprint)
│  ├─ Burndown (are we on track?)
│  ├─ Code Quality (test coverage, lint warnings)
│  ├─ Performance (Lighthouse scores, load times)
│  └─ Defect Rate (bugs per 100 lines of code)
└─ Export Options (Markdown, Jira Import, Linear Import, Asana Import)
         ↓
[NEXT STEP BUTTONS]
├─ → Create Jira Epics & Stories
├─ → Create Linear Project
├─ → Invite Team Members
└─ → Start Sprint 1
```

**Key Integration:**
- Reads prompt subject (what are we building?), tone/constraints
- Consumes Design System tokens/specs (from UI/UX WS)
- Consumes Content Creation assets (for demo content)
- Produces tech specs that developers execute

---

### 7️⃣ Vibe Coding Workspace

**Entry Point:** `launcher/app/vibe-coding/page.tsx`

**Flow:**
```
Prompt Generator Output
         ↓
Vibe Coding Workspace Opens
         ↓
[Auto-filled from Prompt]
├─ Mood/Style: [core brand voice tone]
├─ Brand DNA: [cultural positioning]
└─ Subject: [context for voice]
         ↓
[Department-Specific Sections]
├─ Accordion: Brand Voice Profile
│  ├─ Brand Personality (Human / Innovative / Professional / Creative / Trusted)
│  ├─ Brand Archetype (Sage / Everyman / Hero / Caregiver / etc)
│  ├─ Voice Pillars (3-5 core traits)
│  └─ Origin Story (why this voice?)
├─ Accordion: Vocabulary & Language
│  ├─ Preferred Words (words we use)
│  ├─ Forbidden Words (words we avoid)
│  ├─ Jargon Rules (when technical language is OK)
│  ├─ Regional Considerations (US English vs British, etc)
│  └─ Industry Terminology
├─ Accordion: Tone Context
│  ├─ Tone Variants by Scenario
│  │  ├─ Marketing Copy (enthusiastic, benefit-focused)
│  │  ├─ Sales Collateral (persuasive, ROI-focused)
│  │  ├─ Support Documentation (helpful, clear, patient)
│  │  ├─ Error Messages (friendly, solution-oriented)
│  │  ├─ Celebrations (delighted, genuine)
│  │  └─ Bad News (empathetic, constructive)
│  ├─ Sentence Structure (short vs complex)
│  ├─ Formality Level (casual, conversational, formal)
│  └─ Audience Adaptation (B2B vs B2C, executive vs individual contributor)
└─ Accordion: Quality Gates
   ├─ Voice Authenticity Scoring (1-10 self-assessment)
   ├─ Tone Consistency Checklist
   ├─ Terminology Compliance (vocab adherence)
   ├─ Common Pitfalls to Avoid
   └─ Brand Voice Training Data (examples)
         ↓
[GENERATE] Brand Voice Specification & Tone Library
         ↓
OUTPUT:
├─ Core Voice Definition
│  ├─ Voice Statement (2-3 sentences describing WHO we are)
│  ├─ Tone Statement (2-3 sentences describing HOW we speak)
│  ├─ Voice Pillars (ranked by importance)
│  │  ├─ Pillar 1: Professional
│  │  │  ├─ Definition: We are experts, competent, reliable
│  │  │  ├─ In Practice: Use data, avoid hype, be thorough
│  │  │  ├─ Example: "Our platform has processed 10M+ transactions with 99.99% uptime"
│  │  │  └─ Counter-Example: "Our platform is AMAZING!!!"
│  │  ├─ Pillar 2: Creative
│  │  │  ├─ Definition: We are imaginative, resourceful, forward-thinking
│  │  │  ├─ In Practice: Fresh metaphors, playful wordplay (when appropriate)
│  │  │  ├─ Example: "Imagine a marketing dashboard that actually gets you"
│  │  │  └─ Counter-Example: Overly quirky, loses professionalism
│  │  ├─ Pillar 3: Human
│  │  │  ├─ Definition: We are relatable, empathetic, genuine
│  │  │  ├─ In Practice: Use "we" not "one", show vulnerability
│  │  │  ├─ Example: "We've made mistakes too. Here's how we fixed them."
│  │  │  └─ Counter-Example: Corporate-speak, "synergize our paradigms"
│  │  ├─ Pillar 4: Innovative
│  │  │  ├─ Definition: We lead the industry, think differently
│  │  │  ├─ In Practice: Reference future state, challenge status quo
│  │  │  ├─ Example: "AI is changing marketing. We're leading the charge."
│  │  │  └─ Counter-Example: Outdated references, me-too thinking
│  │  └─ Pillar 5: Trusted
│  │     ├─ Definition: We are reliable, transparent, accountable
│  │     ├─ In Practice: Admit limitations, show proof, no false claims
│  │     ├─ Example: "Here's what works. Here's what doesn't. Here's why."
│  │     └─ Counter-Example: Overpromising, hidden caveats
├─ Tone Variants by Scenario
│  ├─ [Marketing Copy]
│  │  ├─ Tone: Enthusiastic, benefit-focused, benefit-driven
│  │  ├─ Formality: Casual to conversational
│  │  ├─ Examples:
│  │  │  ├─ ✅ "Stop wasting time on manual reporting. Our AI does it in minutes."
│  │  │  └─ ❌ "Reporting solutions are available."
│  │  ├─ Sentence Structure: Short, punchy, active voice
│  │  └─ Typical Length: 1-3 sentences
│  │
│  ├─ [Sales Collateral]
│  │  ├─ Tone: Persuasive, ROI-focused, solution-oriented
│  │  ├─ Formality: Professional but approachable
│  │  ├─ Examples:
│  │  │  ├─ ✅ "Your team saves 8 hours/week. That's $50K/year in productivity."
│  │  │  └─ ❌ "This is a great solution for your business."
│  │  ├─ Sentence Structure: Clear, logical, evidence-supported
│  │  └─ Typical Length: 1-2 paragraphs
│  │
│  ├─ [Support Documentation]
│  │  ├─ Tone: Helpful, clear, patient, never condescending
│  │  ├─ Formality: Friendly and accessible
│  │  ├─ Examples:
│  │  │  ├─ ✅ "Don't worry, this is a common question. Here's how to..."
│  │  │  └─ ❌ "Users sometimes have trouble with this step."
│  │  ├─ Sentence Structure: Imperative (you do this), then (this happens)
│  │  └─ Typical Length: Step-by-step, as needed
│  │
│  ├─ [Error Messages]
│  │  ├─ Tone: Friendly, solution-oriented, not blaming
│  │  ├─ Formality: Casual, avoid jargon
│  │  ├─ Examples:
│  │  │  ├─ ✅ "Oops! That email didn't work. Let's try a different one."
│  │  │  └─ ❌ "Error 404: Invalid input parameter."
│  │  ├─ Sentence Structure: Problem → Solution
│  │  └─ Structure Rule: Never say "Error." Say what happened + how to fix it.
│  │
│  ├─ [Celebrations (Success Messages)]
│  │  ├─ Tone: Delighted, genuine, celebratory but not over-the-top
│  │  ├─ Formality: Playful within brand bounds
│  │  ├─ Examples:
│  │  │  ├─ ✅ "🎉 Campaign live! Your audience is about to see something amazing."
│  │  │  └─ ❌ "Deployment successful. Process completed."
│  │  ├─ Sentence Structure: Exclamatory, active voice
│  │  └─ Typical Length: 1-2 short sentences
│  │
│  └─ [Bad News / Disappointment]
│     ├─ Tone: Empathetic, constructive, ownership-focused
│     ├─ Formality: Warm but honest
│     ├─ Examples:
│     │  ├─ ✅ "Your campaign paused because the budget hit $0. Let's increase it."
│     │  └─ ❌ "Error: Campaign paused. Check budget."
│     ├─ Sentence Structure: Empathize → Explain → Fix
│     └─ Typical Length: 2-3 sentences (acknowledge + action)
├─ Vocabulary & Terminology
│  ├─ Preferred Words (ALWAYS use these)
│  │  ├─ "orchestrate" instead of "manage"
│  │  ├─ "powerful" instead of "robust"
│  │  ├─ "at a glance" instead of "visualization"
│  │  ├─ "your results" instead of "metrics"
│  │  └─ [20-30 more core terms]
│  ├─ Forbidden Words (NEVER use these)
│  │  ├─ "synergize" (corporate cliché)
│  │  ├─ "leverage" (overused, vague)
│  │  ├─ "literally" (often misused, confusing)
│  │  ├─ "obviously" (condescending)
│  │  └─ [10-20 more]
│  ├─ Technical Jargon
│  │  ├─ OK in: Product specs, API docs, internal channels
│  │  ├─ NOT OK in: Marketing, support docs, error messages
│  │  ├─ Explain When Used: Always pair jargon with plain English
│  │  └─ Examples:
│  │     ├─ ✅ "Use the webhook API (a way to trigger actions automatically) to..."
│  │     └─ ❌ "Configure the REST endpoint payload structure."
│  ├─ Regional Considerations
│  │  ├─ Default: US English
│  │  ├─ Spelling: color (US) not colour (UK)
│  │  ├─ Date Format: MM/DD/YYYY
│  │  └─ Measurement: dollars, not pounds
│  └─ Industry Terminology
│     ├─ Marketing Terms: campaign, audience, conversion, CTR, ROAS
│     ├─ Sales Terms: pipeline, deal, close, qualified lead, ACV
│     ├─ Content Terms: brief, asset, deliverable, version control
│     └─ Design Terms: layout, component, design token, responsive
├─ Audience Adaptations
│  ├─ B2B / Enterprise
│  │  ├─ Formality: Professional, evidence-based
│  │  ├─ Focus: ROI, risk mitigation, compliance
│  │  ├─ Example: "A Fortune 500 company saved $2M annually. You could too."
│  │  └─ Voice Pillar Emphasis: Professional + Trusted
│  │
│  ├─ B2C / Startup
│  │  ├─ Formality: Friendly, relatable
│  │  ├─ Focus: Ease of use, speed, delight
│  │  ├─ Example: "Your marketing just got a lot smarter (and easier)."
│  │  └─ Voice Pillar Emphasis: Human + Creative
│  │
│  ├─ Internal Communications
│  │  ├─ Formality: Casual, collaborative
│  │  ├─ Focus: Transparency, context, "we" language
│  │  ├─ Example: "We shipped a thing! Here's why it matters."
│  │  └─ Voice Pillar Emphasis: Human + Innovative
│  │
│  ├─ Executive Stakeholders
│  │  ├─ Formality: Formal but not stuffy
│  │  ├─ Focus: Strategic impact, risk, opportunity
│  │  ├─ Example: "This positions us for market leadership in Q2."
│  │  └─ Voice Pillar Emphasis: Professional + Trusted
│  │
│  └─ Individual Contributors
│     ├─ Formality: Friendly, collaborative
│     ├─ Focus: Empowerment, learning, shared ownership
│     ├─ Example: "You now have a tool that changes how you work."
│     └─ Voice Pillar Emphasis: Human + Creative
├─ Common Pitfalls to Avoid
│  ├─ Pitfall 1: Losing "Human" tone
│  │  ├─ Watch for: Overly formal, corporate-speak, "one does this"
│  │  ├─ Fix: Read it aloud. Does it sound like you're talking to a friend?
│  │  └─ Example:
│  │     ├─ ❌ "The utilization of said platform facilitates optimization of workflow"
│  │     └─ ✅ "This platform helps you work smarter."
│  │
│  ├─ Pitfall 2: Overpromising ("Innovative" tone overreach)
│  │  ├─ Watch for: "Revolutionary," "game-changing," "only solution"
│  │  ├─ Fix: Back it up with proof. Say what's different, not how amazing.
│  │  └─ Example:
│  │     ├─ ❌ "Revolutionary AI-powered magical solution"
│  │     └─ ✅ "AI handles 80% of manual reporting. You focus on strategy."
│  │
│  ├─ Pitfall 3: Losing professionalism (Creative tone overreach)
│  │  ├─ Watch for: Excessive emojis, slang, in-jokes
│  │  ├─ Fix: Save playfulness for social media. Keep docs professional.
│  │  └─ Example:
│  │     ├─ ❌ "Yo fam, ur campaigns are lit 🔥🔥🔥"
│  │     └─ ✅ "Your campaign is performing 3x above average. 🎉"
│  │
│  ├─ Pitfall 4: Jargon without explanation
│  │  ├─ Watch for: Standalone technical terms (webhook, payload, REST)
│  │  ├─ Fix: Always explain before using, or use plain English.
│  │  └─ Example:
│  │     ├─ ❌ "Configure the webhook payload."
│  │     └─ ✅ "Set up a webhook (automatic notification when X happens)."
│  │
│  └─ Pitfall 5: Inconsistent tone across channels
│     ├─ Watch for: Professional docs, juvenile marketing copy (or vice versa)
│     ├─ Fix: Use tone variants, but keep core pillars consistent.
│     └─ Example:
│        ├─ ❌ Documentation: sterile; Marketing: silly; Support: cold
│        └─ ✅ All channels: professional but human, with appropriate warmth
├─ Brand Voice Training Data
│  ├─ Real Examples (from actual content)
│  │  ├─ [Marketing Email Example - full email]
│  │  ├─ [Sales One-Pager Example - full text]
│  │  ├─ [Support Article Example - full article]
│  │  ├─ [Error Message Examples - 3-5 real errors]
│  │  └─ [Social Media Post Examples - 3-5 real posts]
│  └─ What Makes Each Example Work
│     ├─ Emotion evoked (trust, delight, clarity, etc)
│     ├─ Voice pillars at play
│     ├─ Tone variant used
│     └─ Vocabulary choices that stand out
├─ Vibe Coding Checklist (self-assessment)
│  ├─ ☐ Does this sound like "us"?
│  ├─ ☐ Does it match the mood/style from the prompt?
│  ├─ ☐ Are all voice pillars represented or is one overused?
│  ├─ ☐ Does the tone match the scenario?
│  ├─ ☐ Is there any forbidden vocabulary?
│  ├─ ☐ Would our audience feel seen and valued?
│  ├─ ☐ Is the formality level right for the audience?
│  ├─ ☐ Does it sound authentic or try-hard?
│  └─ SCORE: ___ / 10 (target: 8+)
├─ Brand Voice Training (for team)
│  ├─ Guidelines Document (download as PDF)
│  ├─ Workshop Slides (Figma link)
│  ├─ Video Examples (YouTube playlist)
│  └─ Slack Bot (tag @voicecheck to scan a message)
└─ Export Options (PDF Handbook, Notion Doc, Google Doc, Slack Reminders)
         ↓
[NEXT STEP BUTTONS]
├─ → Send to All Teams (publish guidelines)
├─ → Test on Sample Content (run audit)
└─ → Train the Team (schedule workshop)
```

**Key Integration:**
- Reads prompt mood/style, brand DNA
- Produces **tone library** that all other departments reference
- Sets the "how we speak" for Marketing, Sales, Content, Support
- Ensures consistent brand voice across all outputs

---

## The Cross-Department Flow (Real Example)

### Scenario: "Launch Q4 Holiday Campaign"

**User starts at Prompt Generator:**

1. **Generate Prompt**
   - Subject: "Holiday campaign celebrating customer wins"
   - Mode: Video
   - Camera: Cinematic, 24mm
   - Lighting: Warm, golden-hour
   - Brand Color: Gold + navy (premium)
   - Mood: Celebratory but genuine, not cheesy
   - Safe Zones: Top & bottom 15% (for text overlay)
   - **Result:** Unified prompt saved to database

2. **Content Creation Reads It**
   - Opens workspace, sees pre-filled subject/mood/brand
   - Adds: Story structure (customer journey), 60-second video
   - Outputs: "Content Production Brief" with script, shot list, props
   - **Status:** Brief sent to production team

3. **Marketing Reads It**
   - Opens workspace, sees pre-filled subject/mood
   - Adds: Campaign strategy (reach 100K), messaging pillars
   - Consumes: Content Production Brief (now knows video is 60s, cinematic)
   - Outputs: "Campaign Launch Brief" with 5 social variations, email sequence
   - **Status:** Messaging ready for all channels

4. **Advertising Reads It**
   - Opens workspace, sees pre-filled subject/brand colors
   - Consumes: Marketing messaging, Content video (once shot)
   - Adds: Audience targeting (holiday shoppers), platform specs
   - Outputs: "Paid Media Spec" with Meta/Google/TikTok setup, creative variants
   - **Status:** Ads ready to launch once video is produced

5. **Sales Reads It**
   - Opens workspace, sees campaign subject
   - Adds: Sales scenario (holiday upsell), deal types
   - Consumes: Marketing messaging (talking points), content assets
   - Outputs: "Sales Kit" with one-pager, ROI calculator, follow-up sequence
   - **Status:** Sales team armed with collateral

6. **Design Reads It**
   - Opens workspace, sees brand color (gold), mood (celebratory)
   - Adds: Components for holiday campaign landing page
   - Consumes: Vibe Coding tone library (how to celebrate authentically)
   - Outputs: "Design System Spec" with holiday component variants
   - **Status:** Design system ready for dev

7. **Development Reads It**
   - Opens workspace, sees project scope (holiday campaign)
   - Consumes: Design tokens/components, all department outputs
   - Adds: Sprint plan, tech architecture
   - Outputs: "Sprint Plan" with 4-week timeline
   - **Status:** Dev work begins

8. **Vibe Coding Guides It All**
   - Tone library already read by all departments
   - Every piece of copy (Marketing, Sales, Support) follows same pillars
   - **Result:** Unified brand voice across campaign

---

## Key Architectural Features

### 1. Shared Context (Launcher Level)

```typescript
// launcher/lib/context.ts
export interface SharedContext {
  user: User;           // Authenticated user
  team: Team;           // Current team
  project: Project;     // Current project
  prompt?: Prompt;      // Current active prompt (if any)
  workspaceRoute: string;  // Which workspace user is in
}

// Available in ALL workspaces via React Context
export const useSharedContext = () => useContext(SharedContext);

// Example usage in any workspace:
const { project, prompt } = useSharedContext();
// Pre-fill form with current prompt data
```

### 2. Prompt History Database

```typescript
// Database schema (simplified)
interface PromptRecord {
  id: string;
  teamId: string;
  projectId: string;
  promptData: PromptData;  // Core prompt from generator
  createdAt: Date;
  createdBy: User;
  departmentOutputs: {
    contentCreation?: ContentOutput;
    marketing?: MarketingOutput;
    advertising?: AdvertisingOutput;
    sales?: SalesOutput;
    design?: DesignOutput;
    development?: DevelopmentOutput;
    vibeCoding?: VibeCodingOutput;
  };
  version: number;         // Track iterations
  published: boolean;      // Ready for team consumption
}
```

### 3. Department Integration Points

Each workspace has a `usePromptData()` hook that:
- Fetches the current/selected prompt
- Pre-fills forms with prompt data
- Allows department to extend/specialize
- Saves outputs back to database under `departmentOutputs[departmentName]`

```typescript
// Example: Marketing Workspace
const { prompt, saveOutput } = usePromptData('marketing');

// Form pre-fills from prompt
const [formData, setFormData] = useState({
  subject: prompt?.subject || '',
  brandColor: prompt?.brandColor || '',
  // ... department-specific fields
});

// Save when done
const handleGenerate = async () => {
  const output = await generateMarketingBrief(formData);
  await saveOutput('marketing', output);
  // Output now available to other departments
};
```

### 4. Cross-Department References

```typescript
// In Advertising Workspace, reference Marketing's output
const { getDepartmentOutput } = usePromptData('advertising');

const marketingOutput = getDepartmentOutput('marketing');
// Use messaging pillars from marketing in ad copy
// Messaging is now connected, versioned, tracked
```

---

## Deployment Structure

```
launcher/
├── app/
│  ├── layout.tsx              # Main dashboard shell
│  ├── page.tsx                # Dashboard home
│  ├── components/
│  │  ├── Sidebar.tsx          # Navigation to all 7 workspaces
│  │  ├── Header.tsx           # Shared context display
│  │  └── PromptSelector.tsx   # "Which prompt are you using?"
│  │
│  ├── prompt-generator/       # Workspace 1
│  │  └── page.tsx
│  ├── content-creation/       # Workspace 2
│  │  └── page.tsx
│  ├── marketing/              # Workspace 3
│  │  └── page.tsx
│  ├── advertising/            # Workspace 4
│  │  └── page.tsx
│  ├── sales/                  # Workspace 5
│  │  └── page.tsx
│  ├── design/                 # Workspace 6
│  │  └── page.tsx
│  ├── development/            # Workspace 7
│  │  └── page.tsx
│  └── vibe-coding/            # Workspace 8 (Master Tone Library)
│     └── page.tsx
│
├── components/
│  ├── PromptGenerator/        # Reuse from previous deliverable
│  ├── ContentCreationWS/
│  ├── MarketingWS/
│  ├── AdvertisingWS/
│  ├── SalesWS/
│  ├── DesignWS/
│  ├── DevelopmentWS/
│  └── VibeCodingWS/
│
├── lib/
│  ├── context.ts             # Shared context provider
│  ├── hooks.ts               # useSharedContext, usePromptData
│  ├── types.ts               # All TypeScript interfaces
│  ├── db.ts                  # Database functions (save/load prompts)
│  └── generators/            # Output generation logic per department
│     ├── contentCreation.ts
│     ├── marketing.ts
│     ├── advertising.ts
│     ├── sales.ts
│     ├── design.ts
│     ├── development.ts
│     └── vibeCoding.ts
│
└── api/
   ├── prompts/
   │  ├── route.ts            # Create/read prompts
   │  └── [id].ts             # Get specific prompt version
   ├── outputs/
   │  └── route.ts            # Save department outputs
   └── generate/
      ├── marketing/          # Generate marketing brief
      ├── advertising/        # Generate ad spec
      └─ [etc for each dept]
```

---

## Data Flow Diagram

```
User logs into launcher
         ↓
┌─────────────────────────────┐
│  SharedContext Loaded       │
│  ├─ User ID                 │
│  ├─ Team ID                 │
│  ├─ Project ID              │
│  └─ Current Prompt (if any) │
└─────────────────────────────┘
         ↓
User navigates to Prompt Generator
         ↓
[Generates unified prompt] → Database saved with timestamp
         ↓
User can now open ANY department workspace
         ↓
Each Department Workspace:
  1. Fetches prompt from database (via SharedContext)
  2. Pre-fills form with prompt data
  3. User adds department-specific customizations
  4. Generates department output (Marketing Brief, Design Spec, etc)
  5. Saves output to database under departmentOutputs[departmentName]
  6. Output now available to OTHER departments
         ↓
Other departments can:
  ├─ Reference previous department's output
  ├─ Read marketing messaging (for sales)
  ├─ Read design tokens (for dev)
  ├─ Read content specs (for ads)
  └─ Read vibe coding guidelines (for all)
         ↓
Team tracks lineage:
  ├─ Prompt v1.0 (generated by user@mediabubble.co)
  ├─ → Marketing output v1.0
  ├─ → Content creation output v1.0
  ├─ → Design output v1.0
  └─ → All other department outputs v1.0
         ↓
Audit trail maintains version control
         ↓
Campaign launches with unified source of truth
```

---

## Success Criteria

**The Launcher succeeds when:**

1. ✅ **One prompt generates 7 outputs** (single source of truth)
2. ✅ **Department workflows are sequential but not blocking** (parallel when possible)
3. ✅ **Cross-department dependencies are tracked** (design spec → dev knows it's ready)
4. ✅ **Team members can see what other departments produced** (read-only view)
5. ✅ **Version history is maintained** (if marketing v2, design v1 still shows v2 was used)
6. ✅ **No data silos** (all outputs live in one database, queryable by project/prompt/date)
7. ✅ **Team saves 40+ hours/month** (because they don't recreate specs manually)

---

## Next Steps

Ready for me to build:

1. **launcher-app.tsx** — The main dashboard shell + sidebar navigation
2. **context-providers.ts** — SharedContext provider for team/project/prompt
3. **hooks.ts** — usePromptData(), useDepartmentOutput() hooks
4. **database-schema.ts** — TypeScript interfaces for prompt + all outputs
5. **Each workspace integration** — How each workspace reads + extends the prompt

Or do you want to clarify anything else about how the 7 departments interact first?