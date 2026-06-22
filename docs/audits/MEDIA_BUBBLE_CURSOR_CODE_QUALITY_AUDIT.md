# MediaBubble — Cursor Code Quality Audit

**Date:** 2026-06-15  
**Scope:** `apps/web-eg`, `apps/web-ae`, `apps/brand`, `packages/shared`, `packages/design-system`  
**Focus:** `app/`, `components/`, `lib/`, i18n/RTL, data-driven pages, API routes

---

## 1. Overview

MediaBubble is an Nx monorepo with three Next.js 14 App Router apps:

| App      | Purpose                      | Approx. surface                               |
| -------- | ---------------------------- | --------------------------------------------- |
| `web-eg` | Egypt market (Masri Arabic)  | ~36 routes, 3 API routes, ~69 components      |
| `web-ae` | UAE market (Khaliji Arabic)  | Mirror of EG with market-specific copy/config |
| `brand`  | Interactive brand guidelines | Single client page, no API                    |

**What works well**

- Clear **server/client import boundaries**: RSC and API routes use `@mediabubble/shared/server`; client components use `@mediabubble/shared/client` — no root barrel imports in apps.
- **Middleware CSP** is correctly inlined per app (`matcher` literal arrays); shared logic lives in `packages/shared/csp-middleware.cjs`.
- **Data-driven service pages** with exhaustive `switch` + `never` in `ServicePageRenderer`.
- **Accessibility wins** in several places: skip link (`MainLayout`), mobile nav focus trap, FAQ accordion via design-system, testimonial marquee `dir="ltr"` on track with per-card RTL.
- **ISR** on blog/portfolio/service detail routes despite dynamic root layout.

**Top risks (summary)**

| Category                                                       | Severity   | Count (representative)      |
| -------------------------------------------------------------- | ---------- | --------------------------- |
| i18n bugs (Arabic never shown / wrong market copy)             | High       | 6+ user-visible surfaces    |
| API security (error leakage, HTML injection, weak rate limits) | High       | 4                           |
| EG/AE duplication (~69 mirrored components)                    | Medium     | Structural                  |
| Bundle size / eager imports                                    | Medium     | Home + all service sections |
| Dead code                                                      | Low–Medium | 4+ modules                  |

---

## 2. Critical Bugs

### 2.1 Egypt legal pages never render Arabic

**File:** `apps/web-eg/components/features/legal/LegalDocument.tsx`

EG uses locale id `ar-masri`, but the component checks `locale === 'ar'`:

```17:17:apps/web-eg/components/features/legal/LegalDocument.tsx
  const content = locale === 'ar' ? document.ar : document.en
```

**Impact:** Privacy, terms, and cookies pages stay in English when the user selects Arabic on the Egypt site. UAE (`ar`) is unaffected.

**Fix:** Use `dir === 'rtl'`, `locale !== 'en'`, or explicit `['ar', 'ar-masri'].includes(locale)`.

---

### 2.2 Testimonial bodies remain English in Arabic mode

**Files:** `apps/web-eg/lib/data/testimonials.ts`, `apps/web-ae/lib/data/testimonials.ts`, `TestimonialsSection.tsx`

Cards reference keys like `testimonials.1.quote`, but `public/locales/*/translation.json` only defines `testimonials.heading.*`. `t(key, quoteFallback)` always falls back to long English Hurghada/Dubai copy.

**Impact:** Headings translate; all 12 testimonial cards do not — visible bilingual inconsistency on the homepage.

---

### 2.3 `BlogNewsletterCta` is fully hardcoded English (and EG-specific on AE)

**Files:** `apps/web-eg/components/features/blog/BlogNewsletterCta.tsx`, `apps/web-ae/...` (near-identical)

No `useI18n()`. Copy includes _"tourism and hospitality brands in Egypt"_ on **both** market apps.

**Impact:** Blog post sidebar CTA is English-only; AE shows Egypt geography.

---

### 2.4 Cross-market locale persistence breaks Arabic

**File:** `packages/shared/src/i18n/I18nProvider.tsx`

Shared `localStorage` key `mediabubble-language` stores `ar-masri` (EG) or `ar` (AE). The other app’s dictionary does not include that locale id → **silent fallback to English** on first visit after switching markets.

---

### 2.5 HubSpot API returns raw error messages to clients

**File:** `apps/web-eg/app/api/hubspot/route.ts` (byte-identical in AE)

```65:67:apps/web-eg/app/api/hubspot/route.ts
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 500 })
```

**Impact:** HubSpot API internals may leak to the browser (and newsletter form surfaces them via `BlogNewsletterCta`).

---

### 2.6 Resend contact emails: unescaped user HTML

**File:** `packages/shared/src/resend-client.ts`

User fields are interpolated into HTML without escaping:

```20:29:packages/shared/src/resend-client.ts
  const html = `
    <h2>New enquiry from mediabubble.com</h2>
    ...
      <tr><td><strong>Name</strong></td><td>${payload.firstName} ${payload.lastName}</td></tr>
    ...
    <p style="white-space:pre-wrap">${payload.message}</p>
```

**Impact:** HTML/script injection into admin notification inboxes (not end-user XSS on site, but operational risk).

---

### 2.7 SSR / hydration: wrong initial `lang` and `dir`

**Files:** `apps/web-eg/app/layout.tsx`, `apps/web-ae/app/layout.tsx`

```83:83:apps/web-eg/app/layout.tsx
    <html lang="en" dir="ltr" suppressHydrationWarning>
```

Locale is applied in `useEffect` in `I18nProvider`. Returning Arabic users see **LTR + Latin fonts** until hydration — flash of incorrect direction and typography.

---

### 2.8 Blog article shell largely English in Arabic mode

**File:** `apps/web-eg/app/blog/[slug]/content.tsx` (and AE twin)

No i18n on category promos, back links, reading-time labels, and related chrome. Listing pages use `t()`; detail pages do not.

---

## 3. Code Quality & Technical Debt

### 3.1 Massive EG/AE duplication

~69 mirrored components. **Byte-identical** between markets:

- `middleware.ts`
- All three API route files per app (6 files total, 3 unique implementations)
- `ServicePageRenderer.tsx`, `InteractiveCursor.tsx`, `Phase3Provider.tsx`, many service sections

Maintenance cost: every fix ships twice; drift is inevitable (already visible in legal locale check, newsletter copy, test coverage).

### 3.2 Dual service content pipelines

Three overlapping sources for the same five live slugs (`seo`, `ppc`, `social`, `branding`, `web`):

1. `lib/services-data.ts` (~457 lines, monolithic)
2. `lib/content/services/*.ts` registry (`ServicePageConfig`)
3. `ServicesSection.tsx` local `SERVICES` array

`ppc.ts` imports from legacy `services-data`; `seo.ts` duplicates strings. `ServicePageTemplate` fallback path is **unused** for all live slugs because configs exist — dead branch.

Planned slugs `content` / `events` exist in the registry but not in `SERVICE_SLUGS` or `opengraph-image` generation — incomplete product surface.

### 3.3 Dead or orphaned modules

| Module                                    | Evidence                                                       |
| ----------------------------------------- | -------------------------------------------------------------- |
| `components/layout/Sidebar.tsx`           | Zero imports in market apps; uses react-i18next, not `useI18n` |
| `components/shared/InteractiveCursor.tsx` | Defined, never mounted                                         |
| `components/shared/GitModal.tsx`          | Only mentioned in `Phase1Provider` comment                     |
| `components/layout/Navigation.tsx`        | Used only in tests, not production (`SiteNav` is live)         |

### 3.4 Oversized components (single-responsibility violations)

| File                           | ~Lines | Issue                                                                  |
| ------------------------------ | ------ | ---------------------------------------------------------------------- |
| `SiteNav.tsx`                  | 720    | Mega menu, mobile drawer, scroll RAF, focus trap, swipe, smooth scroll |
| `ServiceExclusiveSections.tsx` | 474    | 14+ sections in one file                                               |
| `HeroSection.tsx`              | 372    | Many optional layout modes                                             |
| `BrandGuidelinesApp.tsx`       | 325    | Shell + resize + search + tab routing                                  |
| `ContactSection.tsx`           | 348    | Form + info + four UI states                                           |

### 3.5 Type safety gaps

- `apps/brand/.../InteractivePromptBuilder.tsx`: multiple `as any` on union state
- `Locale = string` in shared i18n — no per-app branded locale unions
- `ServiceHeroSection` accepts unused `slug` prop
- Non-null assertions in `app/services/[slug]/page.tsx` after partial checks

### 3.6 Inconsistent naming and navigation product logic

- `Phase1Provider` / `Phase3Provider` — opaque names
- Mega menu: "Content Marketing" → `/services/social`, "E-Commerce" → `/services/web` (misleading hrefs vs `ServicesSection` slugs)
- Mega menu labels hardcoded English (not `t()`)

### 3.7 Test coverage imbalance

`web-eg`: 13+ component/unit tests. `web-ae`: 2 tests. Identical routing/API/components get no regression safety on AE.

### 3.8 `check:i18n` blind spots

`scripts/check-i18n-parity.mjs` only compares `public/locales/en` ↔ `ar` **within each app**. It does **not**:

- Validate `lib/i18n/*.json` flat keys (~836 keys)
- Detect missing `t()` keys (e.g. testimonials)
- Lint dialect (Masri markers in AE)
- Catch `locale === 'ar'` vs `ar-masri` bugs

---

## 4. Performance Issues

### 4.1 Root layout `force-dynamic`

```54:54:apps/web-eg/app/layout.tsx
export const dynamic = 'force-dynamic'
```

Required for CSP nonce via `headers()`. Side effect: entire app tree opts out of static root caching; ISR on child routes fights this pattern.

**Direction:** Scope dynamic behavior to layouts that need nonce, or move nonce to middleware-only injection patterns compatible with static shells.

### 4.2 No `next/dynamic` for below-fold sections

**File:** `apps/web-eg/app/content.tsx`

All homepage sections imported eagerly (`HeroSection`, `TestimonialsSection`, `ShowcaseSection`, etc.). Same pattern on service pages: `ServicePageRenderer` statically imports **every** exclusive section component for all slugs.

**Impact:** Large client JS for routes that only use a subset of sections.

### 4.3 `react-icons` not in `optimizePackageImports`

`next.config.js` lists `lucide-react` only. Footer/social paths using `react-icons/fa6` may pull a larger chunk.

### 4.4 Fat i18n client bundles

`lib/i18n/provider.tsx` merges full `en.json` + `ar-masri.json` / `ar-khaliji.json` (~836 flat keys, mostly brand-guidelines heritage) with `public/locales` at module scope. Most marketing UI uses dotted `public` keys only — **dead dictionary weight** in market bundles.

### 4.5 Global `MutationObserver` on every page

**File:** `Phase3Provider.tsx`

`ScrollReveal` attaches a `MutationObserver` on `document.body` to discover `[data-reveal]` nodes. Runs on all routes; no `prefers-reduced-motion` gate (unlike testimonial marquee).

### 4.6 In-memory rate limiting (serverless)

**File:** `packages/shared/src/rate-limit.ts`

Per-instance `Map` — limits reset per lambda/worker; determined attackers can bypass via concurrency or IP rotation. Documented as intentional but weak for production CRM/email abuse.

### 4.7 Brand app: four Google font families

`apps/brand/app/layout.tsx` loads more font weight than market apps — heavier LCP for a single-page tool.

### 4.8 Testimonials: raw `<img>` for photos

`TestimonialsSection` uses `<img>` instead of `next/image` / `OptimizedImage` — no automatic sizing, possible layout shift.

---

## 5. Refactoring Opportunities

### 5.1 Legal document locale check (Critical)

**Before:**

```tsx
const { locale } = useI18n();
const content = locale === "ar" ? document.ar : document.en;
```

**After:**

```tsx
const { locale, dir } = useI18n();
const isArabic = dir === "rtl" || locale === "ar" || locale === "ar-masri";
const content = isArabic ? document.ar : document.en;
```

Prefer `dir === 'rtl'` as the single source of truth for “which document variant” when RTL locales are only Arabic.

---

### 5.2 Sanitize Resend HTML (Critical)

**Before:**

```ts
const html = `<p>${payload.message}</p>`;
```

**After:**

```ts
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const html = `<p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>`;
// Apply escapeHtml to all user-controlled fields
```

Or use a small HTML builder / Resend’s text-only path for the admin notification.

---

### 5.3 HubSpot API error responses (Critical)

**Before:**

```ts
return NextResponse.json({ error: message }, { status: 500 });
```

**After:**

```ts
console.error("[hubspot]", err);
return NextResponse.json(
  { error: "Unable to save your details. Please try again later." },
  { status: 500 },
);
```

Log server-side; never forward vendor messages to clients.

---

### 5.4 Consolidate duplicate API routes (High)

**Before:** Identical `apps/web-eg/app/api/contact/route.ts` and `apps/web-ae/app/api/contact/route.ts`.

**After:** Single shared handler in `packages/shared` or a thin re-export:

```ts
// apps/web-eg/app/api/contact/route.ts
export { POST } from "@mediabubble/shared/api/contact";
```

Market-specific behavior (email copy, HubSpot pipeline) belongs in env/config, not duplicated files.

---

### 5.5 `BlogNewsletterCta` i18n + market-aware copy (High)

**Before:**

```tsx
<h3>Get marketing insights in your inbox</h3>
<p>Practical guides for tourism and hospitality brands in Egypt — no fluff, no spam.</p>
```

**After:**

```tsx
const { t } = useI18n()
const market = resolveMarketSiteConfig('eg') // or from context

<h3>{t('blog.newsletter.title', 'Get marketing insights in your inbox')}</h3>
<p>{t('blog.newsletter.body', market.newsletterBlurb)}</p>
```

Add keys to **both** `public/locales` trees; AE body must reference UAE/Gulf, not Egypt.

---

### 5.6 Dynamic import service sections (High)

**Before** (`ServicePageRenderer.tsx`):

```tsx
import { VenueShowcaseSection, TechStackSection, ... } from './sections/ServiceExclusiveSections'

case 'venueShowcase':
  return <VenueShowcaseSection ... />
```

**After:**

```tsx
import dynamic from "next/dynamic";

const VenueShowcaseSection = dynamic(() =>
  import("./sections/ServiceExclusiveSections").then((m) => ({
    default: m.VenueShowcaseSection,
  })),
);

// Or split ServiceExclusiveSections.tsx into per-section files for cleaner chunks
```

Apply to exclusive sections not used on every slug (events, web, branding blocks).

---

### 5.7 Collapse service content to one pipeline (High)

**Before:** `services-data.ts` + per-file configs + `ppc.ts` importing legacy.

**After:**

```ts
// lib/content/services/ppc.ts — single source
export const ppcServiceConfig: ServicePageConfig = {
  slug: 'ppc',
  meta: { title: '...', description: '...' },
  hero: { ... },
  sections: ['hero', 'platformBadges', ...],
  // ...
}

// lib/services-data.ts — derive for backwards compat OR delete
export const SERVICES = Object.fromEntries(
  SERVICE_REGISTRY.map(c => [c.slug, toLegacyServiceData(c)]),
)
```

Remove `ServicePageTemplate` path once migration is verified.

---

### 5.8 Server-side initial locale on `<html>` (Medium)

**Before:**

```tsx
<html lang="en" dir="ltr" suppressHydrationWarning>
```

**After (sketch):**

```tsx
import { cookies } from 'next/headers'
import { getInitialLocale } from '@/lib/i18n/server'

export default function RootLayout({ children }) {
  const locale = getInitialLocale(cookies())
  const dir = locale.startsWith('ar') || locale === 'ar-masri' ? 'rtl' : 'ltr'
  const lang = dir === 'rtl' ? 'ar' : 'en'

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
```

Align SSR with `I18nProvider` default/read from same cookie before paint.

---

### 5.9 Cross-market locale normalization (Medium)

**Before:** EG saves `ar-masri`, AE saves `ar` — incompatible across apps.

**After:** In `I18nProvider` init:

```ts
function normalizeStoredLocale(
  saved: string,
  dictionaries: Record<string, TranslationDict>,
) {
  if (dictionaries[saved]) return saved;
  if (saved === "ar-masri" && dictionaries["ar"]) return "ar";
  if (saved === "ar" && dictionaries["ar-masri"]) return "ar-masri";
  return defaultLocale;
}
```

Or use a canonical storage value (`ar`) plus per-app `rtlLocales` mapping.

---

### 5.10 Delete or wire dead modules (Medium)

**Action list:**

- Remove `Sidebar.tsx`, `Navigation.tsx` (or merge test utilities), `InteractiveCursor.tsx` if not on roadmap
- Either mount `GitModal` from pages that need it or delete tracking hooks dead path
- Extract `SiteNav` mega-menu columns to i18n keys + shared package between EG/AE

---

## 6. Bilingual / RTL Improvements

### 6.1 Locale and dialect hygiene

| Issue                                           | Location                                        | Recommendation                                                                                       |
| ----------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `ar-khaliji.json` ≈ Masri clone                 | `apps/web-ae/lib/i18n/`                         | Regenerate from Khaliji source; run `scripts/apply-khaliji-ae-ar.mjs` on AE `public/locales/ar` only |
| Egypt geography in AE copy                      | e.g. `services.seo.features` mentioning الغردقة | Market-specific overrides in AE locales                                                              |
| Unused `ar-masri.json` in AE app                | `apps/web-ae/lib/i18n/ar-masri.json`            | Delete or document why it exists                                                                     |
| 836-key `lib/i18n` flat files in market bundles | Both market providers                           | Split brand-only dictionaries to `apps/brand` only                                                   |

### 6.2 Missing translation coverage

Add to `public/locales` (both markets, market-appropriate copy):

- `testimonials.1.quote` through `testimonials.12.*`
- `blog.newsletter.*`
- Blog detail chrome keys
- High-traffic `aria-label` strings (nav, logos, service sections)

Extend `check:i18n` to grep `t('...')` keys against merged dictionaries.

### 6.3 RTL CSS and interaction

**Working today**

- `html[data-dir='rtl']` Cairo font stack in `globals.css`
- `tailwindcss-rtl` preset; logical properties (`text-start`, `ms-*`)
- Icon mirroring via `[dir="rtl"] .icon-chevron-right`
- Testimonial marquee: track `dir="ltr"`, cards `dir={dir}`
- Footer phone: `dir="ltr"`, `tabular-nums`, `unicode-bidi: isolate`

**Gaps**

| Gap                                  | Fix                                                          |
| ------------------------------------ | ------------------------------------------------------------ |
| Mega menu keyboard                   | Open on Enter/Space; Esc closes desktop menu; not hover-only |
| `SiteNav` smooth scroll              | Respect `prefers-reduced-motion: reduce`                     |
| `Phase3Provider` scroll reveal       | Disable or instant-reveal when reduced motion preferred      |
| `LogoMarquee` (design-system)        | Add `dir="ltr"` on track if used in market apps              |
| `LanguageSwitcher` aria              | Translate switch labels                                      |
| Brand `ColorsPage` clickable `<div>` | `role="button"`, `tabIndex={0}`, keyboard handlers           |

### 6.4 Accessibility in Arabic mode

Many `aria-label` values are hardcoded English across service exclusive sections and `ClientLogosSection`. Screen reader users in Arabic mode hear English labels — treat as i18n bugs, not optional polish.

---

## 7. Prioritized Refactoring List

Priorities balance user impact, security, and maintainability. Effort: **S** = small (hours), **M** = medium (1–2 days), **L** = large (multi-day).

| P      | Item                                                                           | Effort | Impact               |
| ------ | ------------------------------------------------------------------------------ | ------ | -------------------- |
| **P0** | Fix `LegalDocument` `ar-masri` check (EG legal Arabic)                         | S      | Compliance / trust   |
| **P0** | Escape HTML in `resend-client.ts`                                              | S      | Security             |
| **P0** | Generic 500 errors on `/api/hubspot`                                           | S      | Security / UX        |
| **P0** | i18n-wrap `BlogNewsletterCta`; fix AE Egypt copy                               | S      | Bilingual UX         |
| **P1** | Add testimonial keys to locales (remove English fallbacks)                     | M      | Bilingual UX         |
| **P1** | Normalize cross-market `localStorage` locale                                   | S      | Bilingual UX         |
| **P1** | SSR `lang`/`dir` from cookie on `<html>`                                       | M      | RTL flash / CLS      |
| **P1** | Field max lengths on `/api/contact`                                            | S      | Abuse resistance     |
| **P2** | Extract shared API routes + middleware to `packages/shared`                    | M      | DX / drift           |
| **P2** | Single service content pipeline; deprecate `services-data` monolith            | L      | Maintainability      |
| **P2** | `dynamic()` for below-fold home + unused service sections                      | M      | Performance          |
| **P2** | Add `react-icons` to `optimizePackageImports`                                  | S      | Performance          |
| **P2** | Extend `check:i18n` (lib/i18n parity, `t()` key grep, AE dialect lint)         | M      | CI / quality         |
| **P2** | Khaliji pass on AE `ar` locales + regenerate `ar-khaliji.json`                 | M      | Market correctness   |
| **P3** | Split `SiteNav` / extract shared marketing UI package for EG+AE                | L      | Maintainability      |
| **P3** | Remove dead modules (`Sidebar`, `InteractiveCursor`, `GitModal`, `Navigation`) | S      | Clarity              |
| **P3** | `loading.tsx` / segment `error.tsx` on `/blog`, `/services`                    | M      | Resilience           |
| **P3** | Distributed rate limiting (Upstash/Vercel KV)                                  | M      | Production hardening |
| **P3** | AE test parity with EG for shared components                                   | M      | Regression safety    |
| **P3** | Brand app: CSP nonce in layout, `not-found`, SEO routes                        | M      | Parity / security    |
| **P4** | Revisit root `force-dynamic` vs static shell + nonce strategy                  | L      | Performance          |
| **P4** | `Phase3Provider` reduced-motion + observer scope reduction                     | S      | A11y / perf          |
| **P4** | Mega menu i18n + keyboard behavior                                             | M      | A11y                 |
| **P4** | Trim unused `lib/i18n` keys from market bundles                                | M      | Bundle size          |

---

## Appendix: Key file index

```
apps/web-eg/app/layout.tsx
apps/web-eg/app/content.tsx
apps/web-eg/app/api/{contact,hubspot,blog/search}/route.ts
apps/web-eg/components/features/legal/LegalDocument.tsx
apps/web-eg/components/features/blog/BlogNewsletterCta.tsx
apps/web-eg/components/features/services/ServicePageRenderer.tsx
apps/web-eg/components/layout/SiteNav.tsx
apps/web-eg/components/shared/Phase3Provider.tsx
apps/web-eg/lib/services-data.ts
apps/web-eg/lib/content/services/
apps/web-eg/lib/i18n/provider.tsx
packages/shared/src/i18n/I18nProvider.tsx
packages/shared/src/rate-limit.ts
packages/shared/src/resend-client.ts
packages/shared/csp-middleware.cjs
scripts/check-i18n-parity.mjs
scripts/apply-khaliji-ae-ar.mjs
```

---

_Audit produced via static analysis and targeted file review of the MediaBubble monorepo. Re-run after major refactors or before release hardening._
