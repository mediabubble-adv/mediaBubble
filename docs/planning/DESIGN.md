# Design System: MediaBubble Brand Guidelines

## 1. Visual Theme & Atmosphere

A premium, confident interface with **balanced density** and **purposeful asymmetry**. The atmosphere is strategic yet approachable — like stepping into a well-curated studio where every design choice has been earned through clarity and intent. Visual hierarchy flows naturally through strategic use of the yellow accent, generous whitespace, and disciplined typography. The overall feel is **professional yet human**, **energetic yet calm**, designed to inspire confidence in MediaBubble's strategic expertise.

- **Density:** 5/10 (Balanced) — Generous padding and breathing room, no visual clutter
- **Variance:** 6/10 (Intentional Asymmetry) — Offset layouts, strategic use of whitespace, not rigidly symmetric
- **Motion:** 5/10 (Fluid, Restrained) — Smooth spring-physics interactions, perpetual micro-animations on active states, no excessive choreography
- **Creativity:** 8/10 (Premium Curation) — Every element serves a purpose, no filler, no generic AI patterns

## 2. Color Palette & Roles

### Primary Colors
- **Brand Yellow** (#FFC107) — Primary CTA buttons, active states, strategic highlights. High visibility, energetic focal point. Saturation: 97%
- **Brand Blue** (#2196F3) — Secondary actions, links, navigation, supporting CTAs. Professional, trustworthy. Saturation: 86%
- **Dark Blue** (#1565C0) — Text contrast on light backgrounds, depth hierarchy, dark mode primary. Saturation: 89%

### Accent Color
- **Accent Gold** (#E8B506) — Gradient pairings with Yellow, premium decorative moments, hover states. Warm, sophisticated. Saturation: 97%

### Neutral Foundation
- **Canvas White** (#FAFAFA) — Primary page background, soft neutral surface
- **Pure Surface** (#FFFFFF) — Cards, containers, content areas, maximum contrast
- **Charcoal Text** (#333333) — Primary body text, headings, dark UI elements
- **Muted Steel** (#9E9E9E) — Secondary text, placeholders, disabled states, metadata
- **Light Border** (#F5F5F5) — Card backgrounds, section dividers, subtle separation
- **Whisper Border** (#E8E8E8) — Structural lines, card borders, 1px grid separations
- **Deep Charcoal** (#0D0F12) — Sidebar background, dark sections, highest contrast dark areas

### Functional Roles
- No purple, neon, or oversaturated accents. No pure black (#000000) — Charcoal (#333333) is used instead
- Maximum 1 accent color (Yellow for primary actions, Blue for secondary)
- High-contrast pair: Charcoal Ink on Canvas White or Pure Surface for readability

## 3. Typography Rules

### Font Stack
- **Display & Headlines:** Poppins (Weight: 700–900) — Geometric, confident, modern. Track-tight for controlled hierarchy through weight and color, not massive scale
- **Body & UI:** Inter (Weight: 400–600) — Legible, versatile, web-optimized. Relaxed leading (1.6), maximum 65 characters per line for readability
- **Monospace:** JetBrains Mono (Weight: 400–500) — Code snippets, metadata, timestamps, configuration values
- **Arabic:** Cairo (Weight: 400–600) — Full bilingual support, Arabic character support for local context

### Scale Hierarchy
- **Display/H1:** 32–48px, Poppins Bold (700)
- **H2 (Section):** 18px, Poppins Bold (700)
- **H3 (Subsection):** 13–14px, Poppins SemiBold (600)
- **Body:** 13–14px, Inter Regular (400)
- **Small/Metadata:** 10–11px, Inter Regular (400), Muted Steel color
- **Mono/Code:** 10–11px, JetBrains Mono Regular (400)

### Typography Rules
- No generic system fonts for premium contexts — Poppins enforces brand personality in headlines
- Serif fonts BANNED in dashboards and software UIs — only modern serifs (Fraunces, Instrument Serif) if editorial context required
- Controlled, track-tight display spacing — hierarchy through weight and color, not massive oversized text
- Body text always 65 characters maximum per line for comfortable reading

## 4. Component Stylings

### Buttons
- **Primary Button:** Yellow background (#FFC107), Charcoal text (#333333), no outer glow
- **Secondary Button:** Blue background (#2196F3), White text, no outer glow
- **Ghost Button:** White background, Blue border (2px), Blue text
- **Interaction:** Tactile -1px translate on active state (not shadow depth change)
- **Focus Ring:** Accent color outline, 2px width
- **Disabled State:** 50% opacity, no pointer events, Muted Steel text

### Cards
- **Styling:** Generously rounded corners (12–16px), soft 1px border (#E8E8E8), diffused shadow (0 1px 3px rgba(0,0,0,0.05))
- **Usage:** Only when elevation communicates hierarchy or grouping
- **High-Density Override:** Replace cards with border-top dividers or negative space in dense layouts
- **Never:** Nested cards, cards within cards, or stacked card shadows

### Inputs & Forms
- **Label Placement:** Always above input field, bold weight (600)
- **Input Styling:** 1px border, rounded corners (6–8px), 16px padding, focus ring in accent color
- **Helper Text:** Optional, smaller font size (10px), Muted Steel color, positioned below input
- **Error State:** Red text (#DC2626) below input, red border on input field
- **Disabled State:** Light Gray background (#F5F5F5), Muted Steel text, no interactivity

### Badges & Status Indicators
- **Success:** Light green background (#DCFCE7), green text (#16A34A)
- **Warning:** Light yellow background (#FEF9C3), amber text (#CA8A04)
- **Error:** Light red background (#FEE2E2), red text (#DC2626)
- **Info:** Light blue background (#E0F2FE), blue text (#0369A1)

### Loading States
- **Skeletal Loaders:** Match exact layout dimensions, subtle shimmer animation
- **No Spinners:** Circular loading spinners are BANNED — use skeletal loaders or progress bars

### Empty States
- **Composition:** Illustrated, composed layouts indicating how to populate data
- **Text:** Clear call-to-action with primary button to create new content
- **Never:** Generic "No data" or placeholder text only

## 5. Layout Principles

### Grid & Containment
- **CSS Grid First:** Prefer CSS Grid over Flexbox for layout architecture
- **Max-Width Container:** 1400px centered for desktop layouts
- **No Overlapping Elements:** Every element occupies clean spatial zone, no absolute-positioned stacking
- **No calc() Hacks:** Use semantic spacing and grid gaps instead of percentage math

### Spacing System (8px Base Grid)
- **Micro spacing:** 4px (4–8px) — Inline component gaps, text to icon spacing
- **Compact spacing:** 8px (8–12px) — Component internal padding, tight section gaps
- **Internal spacing:** 12px (12–16px) — Card padding, form field spacing
- **Component padding:** 16px (16–24px) — Standard card and container padding
- **Section spacing:** 24px (24–32px) — Vertical gaps between major sections
- **Large spacing:** 28–32px — Hero spacing, large component separation
- **Page sections:** 56px — Top-level section vertical gaps

### Hero Section (Non-Centered)
- **Asymmetric Split:** Left-aligned or offset layouts preferred (variance > 5)
- **Centered Layouts:** BANNED for high-variance projects
- **No Overlapping:** Text must never overlap images or other text elements
- **No Filler Text:** "Scroll to explore", scroll arrows, bouncing chevrons BANNED
- **Single CTA Maximum:** One primary "Schedule a Free Consultation" button, no secondary "Learn More" links

### Feature Rows
- **2-Column Zig-Zag:** Alternating text/image pairs preferred
- **3-Column Equal Cards:** BANNED — use asymmetric grids or 2-column layouts instead
- **Horizontal Scroll:** Reserved for tablet/mobile only, full-width wrap on desktop

### Responsive Collapse (Mobile-First)
- **Below 768px:** All multi-column layouts collapse to single column, no exceptions
- **No Horizontal Scroll:** Horizontal overflow is a critical failure on mobile
- **Typography Scaling:** Headlines scale via `clamp()`, body minimum 1rem (14px)
- **Touch Targets:** All interactive elements minimum 44px tap target (WCAG 2.1)
- **Section Spacing:** Vertical gaps reduce proportionally via `clamp(1.5rem, 4vw, 3rem)`
- **Image Behavior:** Inline images scale and stack naturally below headlines on mobile

## 6. Motion & Interaction Philosophy

### Spring Physics
- **Default Timing:** stiffness: 100, damping: 20 — Premium, weighty feel, natural deceleration
- **Fast Interactions:** stiffness: 150, damping: 25 — Snappy but not twitchy
- **Slow Reveals:** stiffness: 60, damping: 15 — Graceful entrance animations
- **No Linear Easing:** Easing functions must use spring curves, never linear

### Perpetual Micro-Interactions
- **Active States:** Pulse, Float, or Shimmer loops on interactive components
- **Hover Effects:** Subtle scale or shadow changes, never color-only
- **Focus Rings:** Animated entrance, clear visual indication of keyboard focus
- **Loading States:** Continuous shimmer effect on skeletal loaders

### Orchestration & Sequencing
- **Staggered Reveals:** List items cascade with 40–60ms delays, never instant mount
- **Waterfall Effect:** Parent content reveals before child content
- **No Simultaneous Animations:** Coordinate timing to create visual rhythm

### Performance Constraints
- **Hardware Acceleration:** Animate only `transform` and `opacity`, never top/left/width/height
- **60fps Target:** Use GPU-accelerated properties exclusively
- **Client Components:** Isolated motion-heavy components to prevent re-render cascades
- **Grain/Filters:** Noise or texture overlays on fixed pseudo-elements only, not animated

## 7. Sidebar Navigation

### Desktop Sidebar
- **Width:** 220px fixed sidebar on left
- **Background:** Deep Charcoal (#0D0F12)
- **Text Color:** Light neutral (rgba(255,255,255,0.55))
- **Active State:** Yellow left border (3px), yellow text, light yellow background highlight
- **Hover State:** Light neutral background (rgba(255,255,255,0.04))
- **Labels:** Uppercase, small font (10px), letter-spacing for hierarchy
- **Logo:** 36px mark with yellow background, Poppins bold wordmark below

### Mobile Navigation
- **Collapse to hamburger menu below 768px**
- **Full-height overlay or slide-in panel**
- **Same color scheme and typography as desktop**
- **Touch-friendly spacing (48px+ tap targets)**

## 8. Top Navigation Bar

### Desktop Topbar
- **Height:** 46px fixed
- **Background:** Pure White (#FFFFFF)
- **Border:** 1px bottom border (#EBEBEB)
- **Content:** Breadcrumb path showing current page section
- **Font:** 12px secondary text, 13px bold for current section
- **Sticky Position:** Stays at top during scroll

## 9. Anti-Patterns (Banned)

These patterns are explicitly forbidden to maintain premium aesthetic:

- ❌ **Emojis anywhere** — No emoji text, no emoji buttons, emoji-driven communication BANNED
- ❌ **Generic system fonts** — Inter is used, but Helvetica, Arial, sans-serif fallbacks BANNED in primary contexts
- ❌ **Generic serif fonts** — Times New Roman, Georgia, Garamond, Palatino BANNED (use Fraunces or Instrument Serif only if editorial needed)
- ❌ **Pure black (#000000)** — Always use Charcoal (#333333) or Deep Charcoal (#0D0F12)
- ❌ **Neon glows or outer shadows** — No colored glow effects, no neon outlines
- ❌ **Oversaturated accents** — Saturation must stay below 80%
- ❌ **Excessive gradient text** — Gradient text BANNED on large headers
- ❌ **Custom mouse cursors** — Always use default pointer and text cursors
- ❌ **Overlapping elements** — Every element occupies clean spatial zone, no absolute stacking
- ❌ **3-column equal card layouts** — Replace with 2-column zig-zag or asymmetric grid
- ❌ **Generic placeholder names** — "John Doe", "Acme Corp", "Nexus Systems" BANNED
- ❌ **Fake round numbers** — "99.99%", "50%", "1000+" not permitted — use exact or placeholder labels
- ❌ **Fabricated metrics** — No invented data: "124ms AVG RESPONSE", "99.98% UPTIME", "18.5k DEPLOYS" BANNED. Use `[metric]` placeholders instead
- ❌ **Fake system sections** — "SYSTEM PERFORMANCE", "KEY STATISTICS", "BY THE NUMBERS" dashboards filled with invented data BANNED
- ❌ **Label // Year formatting** — "SYSTEM // 2024", "METRICS // 2025" BANNED as lazy convention
- ❌ **AI copywriting clichés** — "Elevate", "Seamless", "Unleash", "Next-Gen", "Synergy" BANNED from headlines
- ❌ **Filler UI text** — "Scroll to explore", "Swipe down", scroll arrows, bouncing chevrons BANNED
- ❌ **Broken image links** — Use `picsum.photos` or SVG placeholders, never Unsplash with dead URLs
- ❌ **Centered Hero sections** — Asymmetric layouts enforced for high-variance designs
- ❌ **No floating labels** — Labels always above inputs, never floating inside inputs
- ❌ **No custom select dropdowns** — Use native select elements, styled with brand colors
- ❌ **No skeleton screens as permanent state** — Skeletal loaders are temporary, never left visible

## 10. Accessibility Standards

### Contrast Ratios (WCAG 2.1 AA minimum)
- **Normal Text:** 4.5:1 contrast minimum (Charcoal #333333 on Light #F5F5F5 = 11.2:1 ✓)
- **Large Text:** 3:1 contrast minimum
- **UI Components:** 3:1 contrast minimum
- **Focus Indicators:** Always visible, high-contrast outline rings

### Keyboard Navigation
- **Tab Order:** Logical tab order matches visual flow
- **Focus Visible:** :focus-visible ring applied to all interactive elements
- **Skip Links:** Skip to main content link available on all pages

### Semantic HTML
- **Heading Hierarchy:** H1 per page, H2 for sections, H3 for subsections (never skip levels)
- **Label Association:** Form labels explicitly associated with inputs via `for` attribute
- **Alt Text:** All images include descriptive alt text
- **Landmarks:** nav, main, footer elements used semantically

## Marketing surfaces (web-eg, web-ae)

Default impeccable register is **brand** (public marketing). These apps share `@mediabubble/design-system` tokens and diverge only where market copy, locale, or URLs require it.

| Surface | Pattern |
|---------|---------|
| Hero | Navy (`brand-navy`) backgrounds, yellow primary CTAs, market-specific headline and proof |
| Trusted-by | Horizontal client logo strip; per-logo `width`/`height` (not one fixed height for all) |
| Footer | Dark navy column layout; `FooterMarketSwitch` (EG/AE flags) under company blurb |
| Typography | EN: Poppins display + Inter body; AR: Cairo via `html[data-dir='rtl']` |
| Motion | GSAP scroll sections where used; GPU-friendly; honor reduced motion |
| Images | `OptimizedImage` / shared presets; WebP, explicit dimensions |
| Locale | `Phase3Provider`, i18n routing, `data-dir` for RTL CSS |

**URLs:** Egypt `mediabubble.co`, UAE `mediabubble.ae` via `getMarketPortalUrl()` and `NEXT_PUBLIC_EG_SITE_URL` / `NEXT_PUBLIC_AE_SITE_URL`.

**Not the default register:** `apps/brand` (guidelines reference UI) uses **product** register when editing that app specifically.

---

## Implementation Notes

This design system prioritizes:
1. **Clarity over decoration** — every visual choice serves communication
2. **Accessibility by default** — WCAG 2.1 AA compliance built in
3. **Performance-first motion** — spring physics with GPU acceleration
4. **Responsive as foundation** — mobile-first design strategy
5. **Brand coherence** — consistent application of yellow accent, typography hierarchy, and spacing system

All pages must enforce these rules consistently. Deviation requires explicit justification tied to brand strategy.
