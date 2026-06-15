# Metadata vs client locale gap (D1c)

## Summary

Market apps (`web-eg`, `web-ae`) render **page metadata in English at build/request time** via Next.js `generateMetadata` / static `metadata` exports. **In-page UI** can switch to Arabic through the client `I18nProvider` (language toggle + `localStorage`).

Until URL-based locales exist (e.g. `/ar/...`), **`<title>`, Open Graph, and Twitter tags do not follow the Arabic toggle.**

## Current behavior

| Layer | Locale source | Updates when user toggles AR? |
|-------|---------------|-------------------------------|
| `generateMetadata` / `metadata` | Market config + English `translation.json` `meta.*` keys (server) | No |
| Visible page copy (`t()`) | Client `I18nProvider` (`en` vs `ar-masri` / `ar`) | Yes |
| `html[lang]` / `dir` | Set by `I18nProvider` on locale change | Yes |
| Legal page body | Hardcoded English sections in route files (D4) | No |

## Why it happens

1. Next.js metadata is resolved on the **server** during static generation or the initial RSC pass.
2. The language toggle only updates **client state** (`mediabubble-language` in `localStorage`); it is not sent as a request header or path segment.
3. Shared `t()` in `@mediabubble/shared` is **client-only** and does not participate in `generateMetadata`.

## Per-market metadata today

Both apps define `meta.*` titles/descriptions in `public/locales/en/translation.json` and read them from market-specific layout/page metadata helpers. Arabic equivalents exist under the same keys in `public/locales/ar/translation.json` but are **not wired into `generateMetadata`** yet.

## Recommended follow-up (post PR 6)

1. **Short term (documented):** Accept EN metadata + AR UI for bilingual toggle; ensure social previews stay English unless market is UAE/EG Arabic-first.
2. **Medium term:** Locale-prefixed routes (`/ar/services/...`) with middleware redirect from `Accept-Language` or cookie, and `generateMetadata` keyed off `params.locale`.
3. **Long term:** Align `meta.*` AR strings with Masri (EG) vs Khaliji (AE) registers separately from UI copy audits.

## PR 6 scope

PR 6 wires **chrome and CTA strings** to `t()` and standardizes short CTA labels (`cta.short.primary` / `cta.short.secondary`). It does **not** change metadata generation. This document satisfies D1c minimum deliverable.

## Verification checklist

- [ ] Toggle AR on `/contact` → visible headings/buttons change; browser tab title stays English.
- [ ] View source / social debugger → `og:title` matches English `meta.*` for that route.
- [ ] After locale routes ship → re-run checklist expecting AR metadata on `/ar/*`.
