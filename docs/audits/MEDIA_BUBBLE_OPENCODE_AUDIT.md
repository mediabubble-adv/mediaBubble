# MediaBubble OpenCode Audit Report

**Date:** 2026-06-15
**Auditor:** OpenCode Senior Auditor (Arabic-first / Middle East Markets)
**Scope:** `apps/web-eg`, `apps/web-ae`, `apps/brand`, `packages/shared`, `packages/design-system`
**Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Nx, i18next (EN + Masri), Vercel

---

## 1. Overview & Risk Assessment

MediaBubble is a bilingual (EN + Egyptian Arabic Masri) marketing agency platform with an Egypt primary site (`web-eg`), a UAE structural clone (`web-ae`), and an interactive brand guidelines app (`brand`). The codebase is architecturally sound — Nx monorepo, shared packages, CSP middleware, ISR, and a working design system — but carries significant **performance, RTL, and conversion debt** that will materially impact Core Web Vitals, Arabic UX, and lead generation in production.

| Risk Category | Severity | Impact |
|---------------|----------|--------|
| Dynamic-rendering root layout | **High** | Every page is server-rendered per-request; kills static optimization, edge caching, and Vercel ISR benefits |
| RTL markup bugs | **High** | `html` tag stays `dir="ltr"` after Arabic switch; floating CTA anchors `right` in RTL; OG image has no Arabic variant |
| GA4 nonce bypass | **Medium** | `useGA` injects scripts via `document.createElement`, bypassing CSP nonce and Next.js `Script` optimization |
| Duplicate service data (460+ lines) | **Medium** | `services-data.ts` is copy-pasted between `web-eg` and `web-ae`; diverges silently, doubles maintenance |
| Client-bundle bloat | **Medium** | Heavy overuse of `'use client'`; page shells, content sections, and layout wrappers that could be Server Components |
| Type-check failure | **Medium** | `shared:typecheck` fails on `process.env.NODE_ENV` dot-access; blocks CI type safety |
| Test runner misconfiguration | **Medium** | `lint-staged` runs `jest --bail` on every commit; `npm test` hangs / times out in practice |
| No GDPR granular consent | **Medium** | Cookie banner is binary Accept/Decline; no analytics-vs-marketing split; no data-deletion flow |
| Conversion gaps | **Medium** | No loading states on route transitions, no mobile exit-intent, no progressive form profiling, no scroll-progress indicator |
| Newsletter timezone bug | **Low** | `hasShownToday()` uses UTC date string; can double-fire across midnight in Cairo/Dubai |

---

## 2. Critical Bugs

### 2.1 `force-dynamic` root layout disables static generation
**File:** `apps/web-eg/app/layout.tsx` (line 54), `apps/web-ae/app/layout.tsx` (line 54)
**Severity:** High

```typescript
export const dynamic = 'force-dynamic'
```

Because the layout reads `headers().get('x-nonce')` for the CSP nonce, every page in both marketing apps is forced into **dynamic rendering**. This nullifies:
- Next.js static optimization (SSG)
- Vercel Edge caching
- ISR benefits for blog, portfolio, and service pages

**Fix:** Use `unstable_after` or move the nonce to a client-side wrapper that reads a meta tag. Alternatively, switch to a **hash-based CSP** (no nonce) so the layout can be static. If nonce is required, consider `generateStaticParams` + `revalidate` at the page level and only make the script tag dynamic via a client component.

### 2.2 TypeScript failure in `shared` package
**File:** `packages/shared/src/hooks/use-dev-service-worker-cleanup.ts` (line 8)
**Severity:** Medium

```typescript
if (process.env.NODE_ENV !== 'development') return
```

`shared:typecheck` fails with:
```
error TS4111: Property 'NODE_ENV' comes from an index signature, so it must be accessed with ['NODE_ENV'].
```

**Fix:** `process.env['NODE_ENV']` or add a typed `env.ts` module in `packages/shared`.

### 2.3 GA4 script injection bypasses CSP nonce and Next.js optimization
**File:** `packages/shared/src/hooks/use-ga.ts` (lines 21–24)
**Severity:** Medium

```typescript
const script = document.createElement('script')
script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
script.async = true
document.head.appendChild(script)
```

This bypasses:
1. The CSP nonce generated in `csp-middleware.cjs`
2. Next.js `next/script` deduplication, preloading, and loading strategy
3. `unsafe-inline` is not needed for this script, but since it's injected imperatively, some strict CSP configs may block it.

**Fix:** Replace with `next/script` inside a client component, passing the nonce from the server via a data attribute or context.

### 2.4 Newsletter `hasShownToday` uses UTC date
**File:** `apps/web-eg/components/shared/NewsletterModal.tsx` (lines 25–31)
**Severity:** Low

```typescript
return stored === new Date().toISOString().slice(0, 10)
```

`toISOString()` is UTC. A user in Cairo (UTC+2) who sees the modal at 1:00 AM local time will see it again at 2:00 AM because the UTC date rolled over.

**Fix:** Use `new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Cairo' })` or store a timestamp and compare `> 24h`.

### 2.5 Floating CTA uses `right-6` instead of logical `end-6`
**File:** `apps/web-eg/components/features/contact/FloatingCta.tsx` (line 75)
**Severity:** Medium

```typescript
'fixed bottom-6 right-6 z-[200]'
```

In RTL, this button stays pinned to the **physical right** (which is the start edge in Arabic). This is a direct RTL violation.

**Fix:** `end-6` (Tailwind logical property) instead of `right-6`.

### 2.6 `html` tag stays `lang="en" dir="ltr"` after Arabic switch
**File:** `apps/web-eg/app/layout.tsx` (line 83), `apps/web-ae/app/layout.tsx` (line 81)
**Severity:** High

The root `<html>` tag is hardcoded to `lang="en" dir="ltr"`. When a user switches to Arabic (Masri), the `dir` attribute on the `<html>` element does **not** update. The page relies on `data-dir='rtl'` CSS and per-component `dir={dir}`, but:
- Screen readers announce the page as English
- Browser auto-translation may trigger incorrectly
- RTL scrollbars and default layout direction remain LTR at the document level
- `text-wrap: balance` and other document-level typographic settings may misbehave

**Fix:** Make the `I18nProvider` update `document.documentElement.lang` and `document.documentElement.dir` on locale change. Or use a server-side locale cookie + `middleware.ts` rewrite to serve the correct `lang`/`dir` from the server.

---

## 3. Performance & Core Web Vitals Issues

### 3.1 Every page is dynamic (no static HTML)
**Root cause:** `force-dynamic` in layout (see §2.1).
**Impact:** TTFB will be ~200–500ms higher than necessary on Vercel. LCP will suffer because the HTML cannot be served from the edge.

### 3.2 `main` element has entrance animation causing layout shift
**File:** `apps/web-eg/app/globals.css` (lines 513–515)

```css
main {
  animation: page-enter 0.5s var(--ease-out-quart) both;
}
```

This animates the **entire page content** on every navigation. It causes:
- CLS (layout shift) during the 500ms animation
- Janky transitions on low-end devices
- Potential issues with `content-visibility` and IntersectionObserver

**Fix:** Remove the `main` animation. Use page-level transitions via `next-view-transitions` or AnimatePresence only on specific elements.

### 3.3 Testimonial avatars use raw `<img>`, not `next/image`
**File:** `apps/web-eg/components/sections/TestimonialsSection.tsx` (line 39)

```typescript
<img src={item.photo} alt={...} className="w-20 h-20 rounded-full" loading="lazy" />
```

Missing WebP/AVIF conversion, responsive sizing, and blur placeholder.

**Fix:** Use `next/image` with `sizes="80px"` and `placeholder="blur"` where possible.

### 3.4 Heavy overuse of `'use client'`
**Files:** `content.tsx`, `MainLayout.tsx`, `ServicePageTemplate.tsx`, `ContactSection.tsx`, etc.

Many page shells and layout wrappers are marked `'use client'` when they only need client behavior for:
- i18n context (can be hydrated)
- Scroll listeners (can be isolated to a small hook component)
- Theme toggle (can be a small island)

**Impact:** Every `'use client'` boundary forces the **entire subtree** into client-side hydration, increasing JS bundle and TTI.

**Fix:** Convert `MainLayout`, `PageHero`, `ServicePageTemplate`, and `ContactSection` to Server Components. Extract only the interactive parts (form state, modal logic, scroll listeners) into small `'use client'` islands.

### 3.5 `optimizePackageImports` only covers `lucide-react`
**File:** `apps/web-eg/next.config.js` (line 16)

`lucide-react` is optimized, but `react-icons`, `@mediabubble/design-system`, and `@mediabubble/shared` are not. `react-icons` in particular is known for bloating bundles when imported via barrel files.

**Fix:** Add `react-icons` and `@mediabubble/shared` to `optimizePackageImports`. Audit bundle with `@next/bundle-analyzer`.

### 3.6 No `loading.tsx` or `error.tsx` for route transitions
**Files:** Missing in `apps/web-eg/app/`

Users navigating between pages experience a **blank flash** while Next.js fetches the new route. This is especially bad on slower networks in Egypt/UAE.

**Fix:** Add `loading.tsx` at the root and per-segment (e.g., `services/loading.tsx`). Use skeleton screens matching the final layout.

### 3.7 PWA caches aggressively in dev
**File:** `packages/shared/src/hooks/use-dev-service-worker-cleanup.ts`

The cleanup hook runs `navigator.serviceWorker.getRegistrations()` and `caches.keys()` on **every mount** in development. This is unnecessary work and can cause FOUC during hot reload.

**Fix:** Run cleanup once per session (e.g., `sessionStorage` flag) rather than every `useEffect`.

---

## 4. Code Quality & Technical Debt

### 4.1 `services-data.ts` duplicated verbatim between EG and AE
**Files:** `apps/web-eg/lib/services-data.ts` (457 lines), `apps/web-eg/lib/services-data.ts` (457 lines)

Only the market names (Hurghada → Dubai, EGP → AED, Red Sea Divers → Gulf Divers Dubai) differ. This is a 914-line maintenance bomb. When the agency adds a new service, both files must be updated.

**Fix:** Extract a `createServiceData(market: 'eg' | 'ae')` factory in `packages/shared` or `packages/content-pipeline`. Keep market-specific overrides (case study names, currency, geo) in a small JSON file per app.

### 4.2 `content.tsx` pattern forces `'use client'` on every page
**Files:** `apps/web-eg/app/content.tsx`, `apps/web-eg/app/services/page.tsx`, etc.

The pattern of `page.tsx` (server) → `content.tsx` (client) is used to export `metadata` from the server file while keeping the UI in a client file. However, the `content.tsx` files import many sections that could be Server Components.

**Fix:** Keep `page.tsx` as a Server Component that passes translated strings as props. Only use `'use client'` for the interactive shell (e.g., form state, modals).

### 4.3 No centralized error boundary for client components
**Files:** `apps/web-eg/components/providers/I18nLayoutWrapper.tsx`

The `I18nErrorBoundary` exists but only wraps i18n. A global client error boundary for the entire app shell is missing.

**Fix:** Add an `ErrorBoundary` around `AppProviders` in `layout.tsx` (or in a client wrapper).

### 4.4 `mapServerError` in contact form is fragile
**File:** `apps/web-eg/components/features/contact/ContactSection.tsx` (lines 33–45)

```typescript
if (lower.includes('name')) { return { firstName: message, lastName: message } }
```

This string-matching error mapping is brittle. If the server error message changes, the form field mapping breaks silently.

**Fix:** Return structured error codes from `/api/contact` (e.g., `{ code: 'FIRST_NAME_REQUIRED' }`) and map them on the client.

### 4.5 Test runner hangs / is misconfigured
**File:** `package.json` (line 81)

```json
"*.{ts,tsx}": ["eslint --fix --max-warnings=0", "jest --bail --findRelatedTests --passWithNoTests --config jest.config.cjs"]
```

Running `npm test` timed out. The `jest.config.cjs` is at the root but only covers `packages/shared`. Test files in `apps/web-eg` (e.g., `HeroSection.test.tsx`, `OptimizedImage.test.tsx`) are orphaned.

**Fix:**
1. Configure Vitest per-app (or a single Vitest workspace config) for fast, modern testing.
2. Remove `jest` from `lint-staged` — it blocks commits for minutes.
3. Move tests next to source files or into a `__tests__` pattern that the runner actually picks up.

### 4.6 `getAllServiceSlugs` mixes static and registry slugs
**File:** `apps/web-eg/app/services/[slug]/page.tsx` (lines 14–20)

```typescript
function getAllServiceSlugs(): string[] {
  return Array.from(new Set([...SERVICE_SLUGS, ...getRegistrySlugs()]))
}
```

The `content` and `events` slugs are in the registry but have no corresponding `ServiceData` in `services-data.ts`. This means `generateStaticParams` will generate params for pages that don't exist, causing build errors or 404s unless handled.

**Fix:** Ensure `services-data.ts` and the registry are always in sync. Add a build-time check.

---

## 5. Bilingual & RTL-Specific Findings

### 5.1 `html` lang/dir not updated on language switch
**Impact:** Screen readers, search engines, and browser features treat the Arabic page as English.
**Fix:** Update `document.documentElement.lang` and `document.documentElement.dir` in the i18n provider. Add `hreflang` tags in metadata (`en`, `ar-EG` for web-eg; `en`, `ar-AE` for web-ae).

### 5.2 OG image is English-only
**File:** `apps/web-eg/app/opengraph-image.tsx`

The social preview card is hardcoded in English with "Hurghada, Egypt. Since 2015." Arabic shares on Facebook/LinkedIn/Twitter will show English text.

**Fix:** Generate an Arabic OG image variant or accept a `locale` param and render Arabic text + Cairo font.

### 5.3 Newsletter modal is hardcoded in English
**File:** `apps/web-eg/components/shared/NewsletterModal.tsx`

All copy ("Join Our Newsletter", "Monthly tips...", "Get Insights") is hardcoded English with no `useI18n`.

**Fix:** Wrap all strings with `t()` and add keys to `ar-masri.json`.

### 5.4 `global-error.tsx` is English-only
**File:** `apps/web-eg/app/global-error.tsx`

No i18n context is available in the global error boundary. Arabic users see "Something went wrong" in English.

**Fix:** Use a minimal RTL-aware fallback with Arabic strings baked in, or render a static error page that doesn't depend on the i18n context.

### 5.5 RTL marquee track uses `dir="ltr"` for math, but cards have `dir={dir}` — correct
**File:** `apps/web-eg/components/sections/TestimonialsSection.tsx`

This is actually **correct** per the AGENTS.md rule: "keep the animation track `dir="ltr"` for seamless `translateX` loop math; set per-card `dir` for Arabic text." No action needed.

### 5.6 Missing `hreflang` and `lang` alternates
**File:** `apps/web-eg/app/layout.tsx` metadata

The metadata does not declare `alternates` with language variants. For SEO in bilingual markets, Google needs:
```html
<link rel="alternate" hreflang="en" href="https://mediabubble.co/" />
<link rel="alternate" hreflang="ar" href="https://mediabubble.co/?lang=ar" />
```

**Fix:** Add `alternates.languages` to the metadata object.

### 5.7 `ar-masri.json` only covers brand guidelines strings
**File:** `apps/web-eg/lib/i18n/ar-masri.json`

The file is 1019 lines but many marketing strings (home page hero, service descriptions, CTA labels) are not fully translated or fall back to English. The `fallback` parameter in `useI18n` is overused, masking missing translations.

**Fix:** Run a coverage audit to identify all `fallback` values that are not overridden in `ar-masri.json`. Prioritize home page, contact form, and service pages.

---

## 6. UX / Conversion Optimization Gaps

### 6.1 No `loading.tsx` for route transitions
Users see a blank page while navigating. **Fix:** Add skeleton screens.

### 6.2 No scroll-progress indicator
Long service pages (FAQ, case studies) have no visual progress indicator. **Fix:** Add a thin top bar (`reading-progress`) to the nav.

### 6.3 No mobile exit-intent
The newsletter modal uses `mouseleave` on `document` (desktop only). Mobile users never see exit intent. **Fix:** Add a scroll-up threshold or back-button interception for mobile.

### 6.4 Contact form lacks social proof
The form page has no testimonials, trust badges, or "we typically reply in 24h" message near the submit button. **Fix:** Add a micro-testimonial or office-open status badge above the form.

### 6.5 No progressive form profiling
The contact form asks for 6 fields immediately. **Fix:** Consider a 2-step form (step 1: name + email; step 2: service + message) to reduce friction.

### 6.6 Cookie consent is binary (no granular choices)
**File:** `apps/web-eg/components/providers/CookieConsent.tsx`

Only "Accept" and "Decline" exist. Users cannot opt into analytics but decline marketing. This is non-compliant with GDPR ePrivacy and limits data collection.

**Fix:** Implement a 3-tier consent model (Essential / Analytics / Marketing) and wire `hasAnalyticsConsent` and a new `hasMarketingConsent` flag.

### 6.7 No A/B testing instrumentation beyond stubs
The `useExperiment` hook exists but the assignment logic is basic. There is no integration with an A/B testing platform (e.g., PostHog, Optimizely, VWO). For a conversion-heavy site, this is a strategic gap.

### 6.8 No sticky mobile CTA below the viewport
The floating CTA appears only after scroll. On mobile, the primary nav CTA is hidden in the hamburger menu. **Fix:** Add a bottom-bar CTA on mobile (`< 768px`) that is always visible.

### 6.9 `not-found.tsx` is not translated
**File:** `apps/web-eg/app/not-found.tsx`

The 404 page is a Server Component that renders `NotFoundContent` (a Client Component). The metadata title is hardcoded "Page Not Found" with no Arabic variant.

**Fix:** Move metadata into a bilingual dictionary or use a locale-based metadata helper.

---

## 7. Security & Compliance

### 7.1 CSP `style-src` includes `unsafe-inline`
**File:** `packages/shared/security-headers.cjs` (line 44)

```
style-src 'self' 'unsafe-inline'
```

Required for Next.js/Tailwind inline styles, but weakens XSS protection. Consider using a **hash-based CSP** or `strict-dynamic` with nonce for scripts, and evaluate if `unsafe-inline` for styles can be reduced by moving critical CSS to external files.

### 7.2 `.env.local` credentials risk
From the `BUGS_VERIFICATION_REPORT.md`: `.env.local` may contain production credentials. Ensure `.env.local` is in `.gitignore` and `.env.example` is the only committed template.

### 7.3 No rate-limiting on newsletter modal
The newsletter modal POSTs to `/api/hubspot` which has rate limiting, but the client-side `handleSubmit` does not debounce or disable the button quickly enough. A double-click can fire two requests.

**Fix:** Disable the submit button immediately on first click.

### 7.4 `dangerouslySetInnerHTML` for JSON-LD and scripts
**Files:** `apps/web-eg/app/layout.tsx` (lines 86, 90, 95)

JSON-LD and theme init scripts are injected via `dangerouslySetInnerHTML`. The data is currently trusted (server-generated), but this pattern is risky if any user input is ever interpolated.

**Fix:** Use `next/script` with `strategy="beforeInteractive"` for the theme script, and validate JSON-LD schemas with a Zod schema before serialization.

### 7.5 No GDPR data-deletion flow
Users cannot request deletion of their contact data. The privacy policy (`/privacy`) is a static page with no self-service mechanism.

**Fix:** Add a "Request data deletion" form that emails the DPO, or build a HubSpot workflow for GDPR deletion.

### 7.6 `robots.ts` blocks `/brand/` but `/brand` is not a route
**File:** `apps/web-eg/app/robots.ts` (line 12)

```typescript
disallow: ['/api/', '/brand/']
```

The `/brand/` path does not exist in the marketing app (the brand app is a separate deployable). This is harmless but confusing.

**Fix:** Remove `/brand/` from `robots.ts` or add a comment explaining the brand app is separate.

---

## 8. Recommendations by Priority

### High Priority

1. **Remove `force-dynamic` from root layout** — implement static layout with nonce passed via meta tag or switch to hash-based CSP. This is the single biggest performance win.
2. **Fix `html` `lang` and `dir` on locale change** — update `document.documentElement` in the i18n provider. Add `hreflang` metadata.
3. **Fix Floating CTA RTL anchor** — `right-6` → `end-6`.
4. **Fix TypeScript error in `use-dev-service-worker-cleanup.ts`** — `process.env['NODE_ENV']`.
5. **Replace GA4 script injection with `next/script`** — respect CSP nonce and loading strategy.
6. **Add `loading.tsx` skeletons** for route transitions.

### Medium Priority

7. **Consolidate `services-data.ts`** into a shared factory with market overrides.
8. **Reduce `'use client'` surface** — convert page shells, heroes, and static sections to Server Components.
9. **Fix test runner** — replace Jest with Vitest, remove from `lint-staged`, wire app-level tests.
10. **Translate Newsletter Modal** — add i18n keys and Masri copy.
11. **Add Arabic OG image variant** or generate dynamically with locale.
12. **Implement granular cookie consent** (Analytics / Marketing / Essential).
13. **Add mobile exit-intent** for newsletter modal.
14. **Fix testimonial avatars** to use `next/image`.
15. **Add `optimizePackageImports`** for `react-icons` and `@mediabubble/shared`.

### Low Priority

16. **Fix newsletter UTC date bug** (`hasShownToday`).
17. **Remove `main` entrance animation** to eliminate CLS.
18. **Add scroll-progress indicator** to nav.
19. **Add social proof near contact form submit button.**
20. **Add 2-step contact form** for progressive profiling.
21. **Add GDPR data-deletion request flow.**
22. **Add error codes** to `/api/contact` instead of string-matching.
23. **Sync `services-data.ts` with registry** (`content`/`events` slugs).

---

## 9. Suggested Implementation Order

### Week 1: Foundation & RTL
1. Fix `force-dynamic` → static layout + nonce strategy
2. Fix `html` `lang`/`dir` update in i18n provider
3. Fix Floating CTA `end-6` and any other RTL hardcoded directional classes
4. Fix TypeScript error in `shared`
5. Add `loading.tsx` skeletons

### Week 2: Performance & Architecture
6. Convert `MainLayout`, `PageHero`, `ServicePageTemplate` to Server Components
7. Consolidate `services-data.ts` into shared factory
8. Replace GA4 injection with `next/script` + nonce
9. Add `optimizePackageImports` for remaining libraries
10. Fix testimonial `img` → `next/image`

### Week 3: Conversion & Compliance
11. Translate Newsletter Modal and OG image
12. Implement granular cookie consent
13. Add mobile exit-intent
14. Add scroll-progress indicator
15. Add social proof on contact form

### Week 4: Testing & Polish
16. Fix test runner (Vitest migration)
17. Add `hreflang` and metadata alternates
18. Add GDPR deletion flow
19. Remove `main` page-enter animation
20. Add structured error codes to API routes

### Ongoing
- Run `npm run check:i18n` weekly (currently passing — keep it green)
- Run `pnpm run check:i18n` before every merge (per AGENTS.md)
- Audit bundle size monthly with `@next/bundle-analyzer`
- Conduct formal WCAG 2.1 AA audit with axe-core or Lighthouse

---

## Appendix: File Reference Map

| Issue | Primary File(s) |
|-------|----------------|
| `force-dynamic` | `apps/web-eg/app/layout.tsx`, `apps/web-ae/app/layout.tsx` |
| RTL `html` tag | `apps/web-eg/app/layout.tsx`, `packages/shared/src/i18n/I18nProvider.tsx` |
| Floating CTA RTL | `apps/web-eg/components/features/contact/FloatingCta.tsx` |
| GA4 nonce bypass | `packages/shared/src/hooks/use-ga.ts` |
| Type error | `packages/shared/src/hooks/use-dev-service-worker-cleanup.ts` |
| Duplicate services | `apps/web-eg/lib/services-data.ts`, `apps/web-ae/lib/services-data.ts` |
| Newsletter i18n | `apps/web-eg/components/shared/NewsletterModal.tsx` |
| OG image i18n | `apps/web-eg/app/opengraph-image.tsx` |
| Cookie consent | `apps/web-eg/components/providers/CookieConsent.tsx` |
| Contact form | `apps/web-eg/components/features/contact/ContactSection.tsx` |
| Test runner | `package.json`, `jest.config.cjs` |
| `main` animation | `apps/web-eg/app/globals.css` |
| Testimonial images | `apps/web-eg/components/sections/TestimonialsSection.tsx` |
| CSP headers | `packages/shared/security-headers.cjs`, `packages/shared/csp-middleware.cjs` |
| `robots.ts` | `apps/web-eg/app/robots.ts` |

---

*End of audit. For implementation tracking, create issues from the High and Medium priority items above.*
