## Learned User Preferences

- Advance phased implementation work with `next` (or equivalent) rather than re-scoping or re-planning unless the user asks to change direction.
- When executing an attached implementation plan, do not edit the plan file; mark existing plan todos in progress and complete them.
- UI change requests often include a browser DOM path and visual requirements—locate the matching component or section in code before editing.
- For frontend polish and section redesigns, follow attached design skills (`impeccable`, `design-taste-frontend`) when the user invokes them.
- Cross-check external audit or bug reports against the current repo layout before implementing fixes—refactors may already have addressed reported items.
- Apply market-site UI and localization work to both `apps/web-eg` and `apps/web-ae` unless one market is specified; keep Egypt (Masri) and UAE (Khaliji) copy distinct between apps.
- Do not run `scripts/clarify-marketing-ae.mjs` on finalized AE Khaliji locale files—it Masri-swaps EG templates; for targeted Khaliji register fixes on AE `ar` locales use `scripts/apply-khaliji-ae-ar.mjs` instead.

## Learned Workspace Facts

- MediaBubble is an Nx monorepo: market apps `apps/web-eg` (Egypt) and `apps/web-ae` (UAE), plus `apps/brand`; shared packages include `packages/shared` and `packages/design-system`.
- Shared CSP/security headers and middleware helpers live in `packages/shared/*.cjs` and are wired from each app's `middleware.ts` and `next.config.js`.
- In Next.js middleware, `export const config.matcher` must be an inlined literal array in each `middleware.ts`—constants imported from `.cjs` cannot be statically analyzed and trigger `invalid-page-config` / broken dev bundles.
- Dark mode is class-based (`html.dark`) via shared `ThemeProvider` from `@mediabubble/shared/client` with storage key `mediabubble-theme`; `data-theme` is not used.
- Semantic `brand-*` tokens (`bg-brand-surface`, `text-brand-text-muted`, etc.) map to CSS variables in each app's `globals.css` and support `dark:` variants; fixed hex tokens (navy, yellow, blue, red) stay constant across themes.
- `.env.local` stays gitignored; `.env.example` is the committed template for required `NEXT_PUBLIC_*` and related vars.
- Root `package.json` exposes `dev:eg:clean` and `dev:ae:clean` to reset dev (kill port, wipe `.next`/cache, stale PWA workers, restart); use after webpack `Cannot read properties of undefined (reading 'call')` or overlapping prod builds—avoid production builds while dev is running. In the browser: hard refresh, Incognito, or clear site data for `localhost` if the error persists after a clean restart.
- In `'use client'` files, import browser hooks and tracking from `@mediabubble/shared/client` (not the root `@mediabubble/shared` barrel, which can pull HubSpot/Resend/rate-limit into the client bundle and trigger webpack `.call` errors). Import marketing kicker classes from `@mediabubble/shared/ui/marketing-kicker` when `optimizePackageImports` is enabled. Server Components and API routes should use `@mediabubble/shared/server` or package subpaths.
- Live service slugs in each app's `services-data.ts` are five (`seo`, `ppc`, `social`, `branding`, `web`); `content`/`events` are planned in `docs/content/service-component-inventory.md` until routes land.
- Run `pnpm run check:i18n` before merge to verify EG/AE locale key parity.
- Arabic content skills live in `.claude/skills/arabic-*`; Cursor loads them via `.cursor/skills/` symlinks. Re-sync with `bash scripts/sync-cursor-arabic-skills.sh`. Pipeline: strategist → creator → `arabic-qa`. Market apps use client-side i18n via shared `useI18n()` from `@mediabubble/shared/client` (not next-intl): per-app `lib/i18n/*.json` merged with `public/locales/*/translation.json`; `web-eg` uses `ar-masri`, `web-ae` uses `ar` with `ar-khaliji.json`.
- RTL infinite-scroll marquees (e.g. testimonials): keep the animation track `dir="ltr"` for seamless `translateX` loop math; set per-card `dir` for Arabic text; do not mirror row animation direction in RTL.
- Footer and contact phone in RTL: `tel:` href from `resolveMarketSiteConfig().phone` (ASCII E.164); display with `dir="ltr"`, `tabular-nums`, and `unicode-bidi: isolate`; keep Western digits in `ar` locale phone strings.
