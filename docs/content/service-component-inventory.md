# Service component inventory

Maps each service slug to registry section IDs, design-system primitives, and sourcing notes for the MediaBubble EG + UAE overhaul.

**Policy:** Every structural change ships on both `apps/web-eg` and `apps/web-ae` in the same PR slice. See [shared-component-policy.md](./shared-component-policy.md).

## Design-system primitives (Phase F1)

| Primitive                 | Package export               | Primary use                                     |
| ------------------------- | ---------------------------- | ----------------------------------------------- |
| `MetricStrip`             | `@mediabubble/design-system` | Home hero stats, service heroes, case studies   |
| `TimelineSection`         | `@mediabubble/design-system` | SEO ranking timeline, Events, About methodology |
| `BentoGrid` / `BentoItem` | `@mediabubble/design-system` | Branding deliverables, Features bento           |
| `FaqAccordion`            | `@mediabubble/design-system` | All service FAQ blocks                          |
| `ComparisonTable`         | `@mediabubble/design-system` | Services index delivery comparison              |
| `TabbedShowcase`          | `@mediabubble/design-system` | Social platforms, PPC channels                  |
| `LogoMarquee`             | `@mediabubble/design-system` | Client logos (optional)                         |

Existing primitives reused: `SectionHeader`, `FeatureCard`, `CaseStudyCard`, `Button`, `Card`, `Badge`.

## Service registry — section IDs

`sections[]` order **must match** between EG and AE for the same slug. Copy lives in per-app `lib/content/services/`; layout IDs are shared.

| Slug       | Section IDs (planned order)                                                         | Exclusive blocks                               |
| ---------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- |
| `seo`      | hero, rankingTimeline, localPack, auditChecklist, features, caseStudy, faq, cta     | rankingTimeline, localPack, auditChecklist     |
| `ppc`      | hero, platformBadges, channelMatrix, budgetFramework, features, caseStudy, faq, cta | platformBadges, channelMatrix, budgetFramework |
| `social`   | hero, contentCalendar, platformShowcase, features, caseStudy, faq, cta              | contentCalendar, platformShowcase              |
| `branding` | hero, beforeAfter, identityDeliverables, features, caseStudy, faq, cta              | beforeAfter, identityDeliverables              |
| `web`      | hero, techStack, performanceMetrics, launchChecklist, features, caseStudy, faq, cta | techStack, performanceMetrics, launchChecklist |
| `content`  | hero, editorialPillars, distributionMap, features, caseStudy, faq, cta              | editorialPillars, distributionMap              |
| `events`   | hero, eventTimeline, venueShowcase, features, caseStudy, faq, cta                   | eventTimeline, venueShowcase                   |

## Component sourcing ladder (Phase B4)

1. **`packages/design-system`** — layout primitives, tables, accordions, metrics
2. **shadcn-style blocks** — only when a primitive does not cover the pattern
3. **Licensed motion** — brand tokens only; document license in this file when added
4. **`components/features/services/sections/`** — service-exclusive sections per app (mirror structure)

## Wired today

| Location                                 | Component                                                                             | Status         |
| ---------------------------------------- | ------------------------------------------------------------------------------------- | -------------- |
| `ServicePageRenderer` (EG + AE)          | All 7 registry slugs (`seo`, `ppc`, `social`, `branding`, `web`, `content`, `events`) | Wired PR 3–4   |
| `ServicePageRenderer` (EG + AE)          | Shared sections: hero, features, caseStudy, faq, cta                                  | Wired PR 3–4   |
| `SeoExclusiveSections.tsx` (EG + AE)     | `rankingTimeline`, `localPack`, `auditChecklist`                                      | Wired PR 3     |
| `ServiceExclusiveSections.tsx` (EG + AE) | PPC, social, branding, web, content, events exclusive blocks                          | Wired PR 4     |
| `app/services/[slug]/` (EG + AE)         | Registry-first routing + `generateStaticParams` merge                                 | Wired PR 3–4   |
| `ServicesSection` (EG + AE)              | Links for legacy + registry slugs (`getRegistrySlugs`)                                | Wired PR 4     |
| `ServicePageTemplate` (EG + AE)          | `FaqAccordion`                                                                        | Wired PR 2     |
| `ServicePageTemplate` (EG + AE)          | `SectionHeader`, `FeatureCard`                                                        | Pre-existing   |
| Home / listing pages                     | `PageHero`, `HeroSection`                                                             | Phase A (PR 1) |

### Registry config files (PR 3–4)

| slug       | EG config                          | AE config                 |
| ---------- | ---------------------------------- | ------------------------- |
| `seo`      | `lib/content/services/seo.ts`      | same path                 |
| `ppc`      | `lib/content/services/ppc.ts`      | same path                 |
| `social`   | `lib/content/services/social.ts`   | same path                 |
| `branding` | `lib/content/services/branding.ts` | same path                 |
| `web`      | `lib/content/services/web.ts`      | same path                 |
| `content`  | `lib/content/services/content.ts`  | same path (registry-only) |
| `events`   | `lib/content/services/events.ts`   | same path (registry-only) |

### SEO registry sections (PR 3)

| sectionId       | file path (EG)                                                   | file path (AE) | primitives used          |
| --------------- | ---------------------------------------------------------------- | -------------- | ------------------------ |
| rankingTimeline | `components/features/services/sections/SeoExclusiveSections.tsx` | same           | `TimelineSection`        |
| localPack       | `components/features/services/sections/SeoExclusiveSections.tsx` | same           | `BentoGrid`, `BentoItem` |
| auditChecklist  | `components/features/services/sections/SeoExclusiveSections.tsx` | same           | `SectionHeader`          |

### Non-SEO exclusive sections (PR 4)

| sectionId                                      | file path (EG)                 | file path (AE) | primitives used                                 |
| ---------------------------------------------- | ------------------------------ | -------------- | ----------------------------------------------- |
| platformBadges, channelMatrix, budgetFramework | `ServiceExclusiveSections.tsx` | same           | `SectionHeader`, `BentoGrid`, `ComparisonTable` |
| contentCalendar, platformShowcase              | `ServiceExclusiveSections.tsx` | same           | `TimelineSection`, `TabbedShowcase`             |
| beforeAfter, identityDeliverables              | `ServiceExclusiveSections.tsx` | same           | `ComparisonTable`, `BentoGrid`                  |
| techStack, performanceMetrics, launchChecklist | `ServiceExclusiveSections.tsx` | same           | `BentoGrid`, `MetricStrip`, `TimelineSection`   |
| editorialPillars, distributionMap              | `ServiceExclusiveSections.tsx` | same           | `BentoGrid`, `SectionHeader`                    |
| eventTimeline, venueShowcase                   | `ServiceExclusiveSections.tsx` | same           | `TimelineSection`, `TabbedShowcase`             |

### D2b starter (PR 4)

Per-app `lib/content/case-studies.ts` and `lib/content/blog-posts.ts` exist under EG and AE. Full market-specific copy audit (e.g. AE Hurghada leakage) is deferred to **PR 8** per plan.

## Phase C + F2 — Page dedup (PR 5)

| Page                         | Section order / change                                                                         | Component                                                                         |
| ---------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Home** (`app/content.tsx`) | Hero → Features → Showcase → Services → ClientLogos → WhyUsStrip → Testimonials → `CtaSection` | Removed `ProcessSection`, `StatsBar`, `ServicesCtaSection` (duplicate yellow CTA) |
| **About**                    | `AboutMethodologySection` replaces `ProcessSection`                                            | `TimelineSection` (vertical, light)                                               |
| **Services index**           | Grid → `ServicesDeliverySection` → logos → testimonials → `CtaSection`                         | `ComparisonTable`; removed `ProcessSection`, `StatsBar`, `ServicesCtaSection`     |

| Section                   | file path (EG + AE)                               | primitives                         |
| ------------------------- | ------------------------------------------------- | ---------------------------------- |
| `WhyUsStrip`              | `components/sections/WhyUsStrip.tsx`              | Local layout (3 pillars)           |
| `AboutMethodologySection` | `components/sections/AboutMethodologySection.tsx` | `TimelineSection`                  |
| `ServicesDeliverySection` | `components/sections/ServicesDeliverySection.tsx` | `SectionHeader`, `ComparisonTable` |

## Phase D1 — i18n wiring (PR 6)

| Surface              | file path (EG + AE)                                           | locale keys                  |
| -------------------- | ------------------------------------------------------------- | ---------------------------- |
| `FloatingCta`        | `components/features/contact/FloatingCta.tsx`                 | `floatingCta.*`              |
| `ServiceCtaSection`  | `components/features/services/sections/ServiceCtaSection.tsx` | `serviceCta.*`               |
| `NotFoundContent`    | `components/features/errors/NotFoundContent.tsx`              | `errors.404.*`, `nav.*`      |
| `OfflineContent`     | `components/features/errors/OfflineContent.tsx`               | `offline.*`                  |
| `error.tsx`          | `app/error.tsx`                                               | `errors.500.*`               |
| `LegalLayout` chrome | `components/layout/LegalLayout.tsx`                           | `legal.*` (body copy → D4)   |
| Short CTAs           | `cta.short.primary` / `cta.short.secondary`                   | `Free audit` / `Book a call` |

Metadata gap documented in `docs/content/metadata-locale-gap.md`.

## Planned extractions (Phase B / H)

| Current location                   | Target                           | Notes                                     |
| ---------------------------------- | -------------------------------- | ----------------------------------------- |
| `ServicePageTemplate` process grid | `TimelineSection`                | Replace inline process on service pages   |
| `StatsBar`                         | `MetricStrip` variant `dark-bar` | Services / about proof band               |
| `PageHero` stats row               | `MetricStrip` variant `hero`     | Optional consolidation                    |
| Services index                     | `ComparisonTable`                | `ServicesDeliverySection` (Phase C, PR 5) |
| `TestimonialsSection` marquee      | `LogoMarquee`                    | Optional; keep RTL logic in app wrapper   |

## Log new components here

When adding a service-exclusive section, append a row:

```
| sectionId | file path (EG) | file path (AE) | primitives used | license |
```
