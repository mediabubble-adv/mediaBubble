# Shared component policy (Phase H)

Prevents drift between `apps/web-eg` and `apps/web-ae` — the root cause of UAE Hurghada copy leaking into shared TSX.

## Rule

**Every PR slice updates both market apps** unless the change is explicitly market-only data (locales, `lib/content/*`, legal bodies).

## Where code lives

| Layer | Location | EG vs AE |
|-------|----------|----------|
| Tokens, primitives | `packages/design-system` | Identical |
| Theme, site config, JSON-LD helpers | `packages/shared` | Market props via `resolveMarketSiteConfig` |
| Marketing sections (byte-identical) | Extract to `packages/shared` or future `@mediabubble/marketing-ui` | Same component; props from market config |
| Page content & SEO copy | `apps/*/lib/content/`, `public/locales/*` | Different per market |
| Legal, contact address, portfolio data | `apps/*/lib/data/*` | Different per market |

## Per-PR drift checklist

Before merging:

1. If you edit `apps/web-eg/components/**`, find the mirror under `apps/web-ae/components/**` or extract to shared.
2. If you add a string in TSX fallbacks, confirm AE fallbacks use UAE geography (no Hurghada / Red Sea / Egypt on `web-ae`).
3. If you add a locale key in EG, add the same key in AE (values may differ; structure must match).
4. Run `tsc --noEmit` on **both** apps.
5. Smoke one route on each dev server after structural changes.

## Extraction order (incremental)

Do not big-bang merge the apps. Extract when touching a file:

1. **F1 done** — primitives in design-system (MetricStrip, TimelineSection, BentoGrid, FaqAccordion, ComparisonTable, TabbedShowcase, LogoMarquee).
2. **Next** — service `sections/*` registry components (identical shell, market copy via config).
3. **Later** — `SiteNav`, `Footer`, testimonial/showcase shells once data lives in `lib/data/*` per app.

## Anti-patterns

- Copy-pasting a section fix to only one app
- Market-specific copy inside shared components without props
- New `bg-brand-*` hex blocks without paired `dark:` classes (see Phase G0 in content polish plan)

## References

- Service section map: [service-component-inventory.md](./service-component-inventory.md)
- Dual-market plan: MediaBubble Content Polish (Cursor plan)
