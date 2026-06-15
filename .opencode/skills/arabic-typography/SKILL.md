---
name: arabic-typography
description: >
  Arabic typography, font pairing, and RTL (Right-to-Left) UI design specialist.
  Use when designing Arabic interfaces, selecting Arabic fonts, implementing
  RTL layouts, fixing RTL CSS issues, pairing Arabic and Latin typefaces, or
  auditing a codebase for Arabic/RTL correctness. Provides authoritative
  guidance backed by typographic best practices and workspace-specific audits.
license: MIT
metadata:
  version: "1.0.0"
  domain: design
  triggers: Arabic typography, RTL UI, Arabic fonts, bilingual layout, Cairo font,
    Arabic-Latin pairing, right-to-left CSS, logical properties, Arabic numerals,
    Arabic accessibility, Arabic responsive design
  role: specialist
  scope: design
  output-format: structured-spec
---

# arabic-typography — Arabic Typography & RTL UI Designer

## Overview

The design authority of the Arabic content ecosystem. Provides authoritative guidance for Arabic typography selection, Latin-Arabic font pairing, RTL layout principles, and technical CSS implementation. Also serves as the workspace auditor — identifies and documents existing Arabic/RTL implementation errors in the codebase and prescribes fixes.

**This agent does not generate content or code files directly.** It outputs specifications and guidance that designers and developers implement.

## When to Load This Skill

```text
skill: arabic-typography
```

Use when:
- Selecting Arabic fonts for a new project or component
- Pairing Arabic and Latin typefaces in a bilingual layout
- Implementing RTL CSS for an Arabic interface
- Auditing a codebase for Arabic/RTL correctness
- Designing Arabic UI components (nav, forms, cards, tables)
- Setting up Arabic typographic hierarchy
- Handling Arabic numerals, dates, or currency in UI
- Testing RTL accessibility

## Modules

This skill is organized into 5 modules. Reference the relevant module based on your task:

### Module 1: Font Selection & Pairing

Guide for choosing Arabic fonts and pairing them with Latin typefaces.

**Primary recommendation for this workspace:** Cairo (Google Fonts) — geometric sans-serif, matches Poppins+Inter for the brand's clean modern aesthetic.

**Selection criteria:**
- Purpose (UI body, display hero, editorial long-form, luxury, casual)
- Latin pairing compatibility (geometry, x-height, weight matching)
- Performance (Google Fonts CDN, next/font/google, subsetting)
- Arabic glyph quality (Naskh vs Kufic vs Modern, character set completeness)
- Weight range availability (thin to black)

See `reference/font-selection.md` for the complete font guide with specimens.
See `reference/latin-pairing.md` for the pairing matrix with rationale.

### Module 2: RTL Layout & CSS

Implementation patterns for Right-to-Left interfaces.

**Golden rule:** Never use `left`/`right` in CSS. Always use logical properties:
- `inset-inline-start` / `inset-inline-end` (not `left` / `right`)
- `margin-inline-start` / `margin-inline-end` (not `margin-left` / `margin-right`)
- `padding-inline-start` / `padding-inline-end` (not `padding-left` / `padding-right`)
- `border-inline-start` / `border-inline-end` (not `border-left` / `border-right`)

See `reference/rtl-patterns.md` for complete layout patterns, CSS examples, Tailwind utilities, and component-level guidance.

### Module 3: Bilingual Layout Strategy

How to structure layouts that serve both English and Arabic audiences.

**Two primary strategies:**

1. **Locale-based routing** (`/en/...` and `/ar/...`) — Separate pages per language, full RTL for Arabic. Best for content-heavy sites, SEO, and clean separation.

2. **Side-by-side** — Same page shows both languages. Common for landing pages, product showcases. Requires careful spacing — Arabic is 25-35% longer than English.

See `reference/bilingual-layout.md` for layout patterns, language switcher UX, responsive strategies, and SEO implications.

### Module 4: Numerical & Cultural Conventions

How to handle Arabic numerals, dates, times, currency, and phones in UI.

| Convention | Arabic UI Rule | Example |
|-----------|---------------|---------|
| Body text numbers | Eastern Arabic numerals | ١٢٣٤٥ |
| Code/tech numbers | Western numerals | 12345 |
| Date format | dd/mm/yyyy | ١٥/٠٣/٢٠٢٦ |
| Time | 12h with ص/م | ٣:٠٠ م |
| Currency | جنيه or EGP + amount | ١٬٥٠٠ ج.م |

See `reference/numerical-conventions.md` for the complete guide with UI implementation patterns.

### Module 5: Accessibility & Testing

WCAG considerations specific to Arabic script and RTL interfaces.

| Criterion | Arabic Consideration |
|-----------|---------------------|
| Contrast (1.4.3) | Arabic closed loops (ح, ع, etc.) may need higher contrast |
| Line height (1.4.12) | Minimum 1.6 for Arabic body text |
| Zoom (1.4.4) | Test Arabic at 200% — letter connections can break |
| Language (3.1.1) | Must set `lang="ar"` on Arabic content |
| Reading order (1.3.2) | DOM order must match visual RTL order |

See `reference/accessibility.md` for the complete WCAG checklist for Arabic.
See `reference/component-specs.md` for RTL-optimized component specifications.

## Workspace Audit

When loaded in this workspace, `arabic-typography` audits existing Arabic/RTL implementation and reports issues. See `reference/workspace-audit.md` for the current audit findings and remediation plan for this codebase.

Known issues include:
- Font conflict: Cairo (active in app) vs Almarai (legacy in design docs) ✅ FIXED
- CSS variable mismatch: `--font-arabic` → `--font-cairo` in AssetsPage.tsx ✅ FIXED
- Missing font weights 800/900 added to layout.tsx ✅ FIXED
- RTL infrastructure: `dir` on `<html>`, `[dir="rtl"]` base styles in globals.css ✅ PARTIAL
- Hardcoded directional CSS: 52 replacements across 19 files ✅ FIXED
- `--font-cairo` variable added to globals.css :root ✅ FIXED
- CSS variable mismatch: `--font-arabic` vs `--font-cairo`
- Missing font weights (800/900 not loaded despite being specified in guidelines)
- No RTL implementation in the Next.js app
- Hardcoded directional CSS instead of logical properties

## Output Format

```yaml
spec:
  type: "font_selection" | "rtl_implementation" | "bilingual_layout" | "workspace_audit"
  context: "marketing_website" | "dashboard" | "social_media" | "print"

  # For font_selection:
  font_spec:
    primary_arabic:
      family: "Cairo"
      weights: ["400", "600", "700", "800", "900"]
      source: "Google Fonts (next/font/google)"
      design_tokens:
        - "--font-cairo: Cairo"
        - "--font-heading-arabic: Cairo 700"
        - "--font-body-arabic: Cairo 400"
    pairing_latin:
      headings: "Poppins (600-900)"
      body: "Inter (400-600)"

  # For rtl_implementation:
  css_spec:
    direction: "html[dir='rtl'] { direction: rtl; text-align: right; }"
    logical_properties: true
    icon_mirroring: true
    tailwind_rtl_prefixes: "rtl:, ltr:"
    components_needing_adjustment:
      - navbar
      - sidebar
      - forms
      - cards
      - progress_bars
      - carousels
      - data_tables

  # For workspace_audit:
  audit:
    issues_found: 7
    severity:
      high: 3
      medium: 3
      low: 1
    fixes_required: ["See reference/workspace-audit.md"]
```

## Reference Files

See `reference/font-selection.md` — Complete Arabic font selection guide with specimens
See `reference/latin-pairing.md` — Arabic-Latin font pairing matrix
See `reference/rtl-patterns.md` — RTL layout patterns with CSS, Tailwind, component examples
See `reference/bilingual-layout.md` — Side-by-side and stacked bilingual layout strategies
See `reference/numerical-conventions.md` — Numbers, dates, time, currency, phones
See `reference/accessibility.md` — WCAG checklist for Arabic script and RTL
See `reference/workspace-audit.md` — Current codebase audit + remediation plan
See `reference/component-specs.md` — RTL-optimized component design specs
