# Workspace Audit — Current Arabic/RTL Issues

## Issue 1: Font Conflict (Cairo vs Almarai)

| Detail | Value |
|--------|-------|
| **Severity** | High |
| **Status** | ✅ FIXED — All Almarai references replaced with Cairo. |
| **Active font** | `Cairo` — loaded via `next/font/google` in `app/layout.tsx`, configured in `tailwind.config.ts` |
| **Legacy font** | `Almarai` — replaced with `Cairo` across all docs |
| **Fix** | Done — updated `PHASE_1_DESIGN_SYSTEM_GUIDE.md`, `brand-voice-guidelines.md`, `.claude/brand-voice-guidelines.md`, `LEADERSHIP_SPECIFICATIONS.md` |

## Issue 2: CSS Variable Mismatch

| Detail | Value |
|--------|-------|
| **Severity** | High |
| **Status** | ✅ FIXED |
| **Fix** | Updated `AssetsPage.tsx` — `--font-arabic` → `--font-cairo` |

## Issue 3: Missing Font Weights

| Detail | Value |
|--------|-------|
| **Severity** | Medium |
| **Status** | ✅ FIXED |
| **Fix** | Added `'800'` and `'900'` to Cairo weight array in `layout.tsx` (Arabic + Latin subsets preserved) |

## Issue 4: No RTL Implementation

| Detail | Value |
|--------|-------|
| **Severity** | High |
| **Files** | `app/layout.tsx`, `app/globals.css` |
| **Current state** | ✅ PARTIALLY FIXED — `dir="ltr"` set on `<html>`, RTL infrastructure in place, `[dir="rtl"]` base styles in `globals.css`. |
| **Remaining** | Dynamic locale switching (requires i18n routing setup — out of scope for this pass) |
| **Fix** | `dir="ltr"` added. `[dir="rtl"]` overrides for text alignment, .skip-link, and .table-row-hover implemented. Full i18n routing is a separate feature. |

## Issue 5: Hardcoded Directional CSS

| Detail | Value |
|--------|-------|
| **Severity** | Medium |
| **Status** | ✅ FIXED — 52 replacements across 19 files |
| **Files** | OverviewSection, ResourcesPage, GettingStartedPage, CollateralPage, LogoPage, ComponentsPage, PageHero, SpacingGridPage, TypographyPage, DigitalAssetsPage, AssetsPage, BrandDNAFoundation, UseCaseExamples, InteractivePromptBuilder, TooltipHint, ColorFamilyCard, MasterSwatch, BrandGuidelinesApp, globals.css |
| **Fix** | `text-left` → `text-start`, `text-right` → `text-end`, `left-0 right-0` → `inset-x-0`, `ml-*` → `ms-*`, `mr-*` → `me-*`, `pl-*` → `ps-*`, `pr-*` → `pe-*`, `left:` → `inset-inline-start:`, `borderLeft/Right` → `borderInlineStart/End`, `paddingLeft/Right` → `paddingInlineStart/End` |

## Issue 6: Missing Tailwind RTL Configuration

| Detail | Value |
|--------|-------|
| **Severity** | Medium |
| **Status** | ✅ NOT APPLICABLE — Tailwind CSS v3.4+ has native `rtl:` and `ltr:` prefixes. No config needed. |
| **Notes** | Project already uses Tailwind v3+. Codebase directives migrated: `ms-*`/`me-*` and `ps-*`/`pe-*` now used throughout instead of `ml-*`/`mr-*` and `pl-*`/`pr-*`. |

## Issue 7: No Arabic Font Variable in globals.css

| Detail | Value |
|--------|-------|
| **Severity** | Low |
| **Status** | ✅ FIXED |
| **Fix** | Added `--font-cairo: 'Cairo', sans-serif;` to `:root` in `globals.css` |

## Issue 8: Strategy Doc Font Reference Contradiction

| Detail | Value |
|--------|-------|
| **Severity** | Low |
| **Status** | ✅ FIXED |
| **Fix** | Updated strategy doc to reference "Cairo (sans-serif)" |

## Remediation Priority

| Priority | Issue | Effort | Status |
|----------|-------|--------|--------|
| P0 | Issue 4 (No RTL) | Large | ✅ Infrastructure in place — full i18n routing is separate feature |
| P0 | Issue 1 (Font conflict) | Small | ✅ FIXED — all references migrated to Cairo |
| P1 | Issue 2 (CSS variable) | Trivial | ✅ FIXED |
| P1 | Issue 3 (Missing weights) | Trivial | ✅ FIXED |
| P1 | Issue 5 (Hardcoded CSS) | Medium | ✅ FIXED — 52 replacements across 19 files |
| P2 | Issue 6 (Tailwind RTL) | Medium | ✅ N/A — Tailwind v3.4+ has native RTL support |
| P2 | Issue 7 (CSS variable) | Trivial | ✅ FIXED |
| P3 | Issue 8 (Strategy doc) | Trivial | ✅ FIXED |
