---
name: arabic-design
description: >
  Arabic Design — graphic and spatial design principles for Arabic-first
  and bilingual (Arabic/Latin) contexts. Covers Arabic-specific
  typographic design (kashida justification, baseline extension,
  calligraphic hierarchy), brand identity design featuring Arabic
  wordmarks, spatial/environmental design (wayfinding, signage,
  exhibition design integrating Arabic script), digital/UI design for
  RTL interfaces, print and publication design using Arabic grid
  systems, and sustainable design integrating vernacular Arab
  architectural principles.
license: MIT
metadata:
  version: "1.0.0"
  domain: design
  triggers: "Arabic design, Arabic graphic design, bilingual design, Arabic brand identity, RTL UI, Arabic typography layout, Arabic wayfinding, Arabic publication design"
  role: specialist
  scope: design-and-specification
  output-format: structured-spec
---

# arabic-design — Arabic Graphic & Spatial Design

## Overview

Arabic design (التصميم العربي) addresses the specific visual, cultural, and technical requirements of designing for Arabic-first and bilingual (Arabic/Latin) audiences. It spans graphic design (print, brand identity, digital), spatial design (wayfinding, exhibition, environmental), and the intersection of traditional Arabic aesthetics with modern design methodology.

## Arabic Graphic Design

### Typographic Layout Principles

Arabic text presents unique layout challenges:

| Consideration | Arabic | English/Latin |
|---------------|--------|---------------|
| Text length | 25–35% longer | Baseline |
| Justification | Kashida (tatweel) stretching or letterspacing | Word spacing only |
| Hyphenation | Not possible (joined script) | Possible |
| Baseline | Floats above; descenders rare | Sits on baseline; ascenders |
| Rags | Ragging right (RTL) | Ragging left (LTR) |
| Hierarchy | Size + weight + color (limited case distinction) | Size + weight + case + color |

**Kashida (Тatweel / كشيدة / تطويل):**
- Stretching specific connector letters (ب ت ث س ش ص ض ط ظ ع غ ف ق ك ل م ن ه ي) for proportional justification
- Must NOT break letterform integrity — only stretch at designated connection points
- Overuse in body text reduces readability; prefers selective use in headings and display

### Arabic Brand Identity

When designing brand systems where Arabic is the primary mark:

| Element | Arabic Consideration |
|---------|---------------------|
| Logo wordmark | Script calligraphy or geometric lettering — not a translated Latin font |
| Tagline | Arabic is 35% longer than English — need layout space |
| Color palette | Cultural meaning: green (Islam), gold (luxury), red (East/Levant traditional), white (purity) |
| Icon direction | Hand, face, eye directionality matters in RTL layout; arrows must point correctly |
| Typography pair | Arabic heading + Latin body (or reverse); must share visual DNA |
| Stationery | RTL alignment for letterhead; business card: Arabic on one side, Latin on the other |

**Brand voice through design:** A brand targeting Arab consumers should not simply "translate" a Latin logo into Arabic. The Arabic mark must be designed independently from the ground up, at the same level of creative rigor as the Latin mark.

### Digital/UI Design for Arabic-First Interfaces

| Component | RTL Convention |
|-----------|----------------|
| Navigation | Menu right-to-left; logo left-aligned (in RTL) |
| Forms | Labels right; inputs left; error messages right |
| Tables | Row direction reversed; headers right-aligned |
| Cards | Content flow right-to-left; images right, text left |
| Icons | Mirror for directionality (arrow ← for back vs →) |
| Progress bars | Fill from right to left |
| Pagination | ← Previous — Next → (in RTL: ← التالي — السابق →) |

**Layout adaptation strategies:**
- Separate layout per locale (not "mirror + translate")
- Test Arabic content at 200% zoom — letter connections can break
- Line height minimum 1.6 for Arabic body text
- Font weight: Regular at 400, Bold at 700 — same scale as Latin
- Form input alignment: Arabic text on right, validation on right

## Spatial & Environmental Design

### Arabic Wayfinding & Signage

| Principle | Application |
|-----------|-------------|
| Script hierarchy | Arabic first (top/right), English translation below/left |
| Font selection | Highly legible Naskh for signage (Cairo, Noto Naskh Arabic) |
| Contrast | Arabic needs higher contrast due to closed-loop letters |
| Viewing distance | Arabic readability at distance: proportionally different from Latin due to letter complexity |
| Material integration | Arabic carved into stone, etched into glass, cast in metal |

### Exhibition Design in the Arab World

- **Museum narrative flow**: adapt to RTL reading for Arabic-first exhibitions
- **Calligraphy as spatial installation**: Arabic text as architectural element (not just label copy)
- **Cultural artifacts display**: lighting sensitivity (Islamic manuscripts: <50 lux); humidity control
- **Interactive exhibits**: bilingual RTL/LTR touchscreens; gesture directionality

### Vernacular Architecture Principles for Modern Design

| Principle | Traditional Application | Modern Translation |
|-----------|----------------------|-------------------|
| Courtyard (حوش/فناء) | Passive cooling, privacy, family gathering | Mixed-use atrium, climate-responsive |
| Mashrabiya (مشربية) | Wooden lattice screen for light/air/privacy | Perforated metal/solar screen, parametric |
| Windcatcher (بالإنجيلية/Rawshan/برجي) | Tower captures wind for cooling | Passive ventilation systems |
| Thick walls (عزل حراري) | Mudbrick/stone thermal mass | High-insulation modern materials, green walls |
| Shading (تظليل/مظلات) | Overhangs, colonnades, awnings | Architectural sun-shading, brise-soleil |

## Publication & Print Design

| Component | Arabic Convention |
|-----------|-------------------|
| Grid system | 10–12 column margins reversed for RTL; inner/outer binding margins |
| Text columns | RTL justified; kashida + letterspacing; hyphenation impossible |
| Flip-book conventions | Arabic book: back cover becomes front cover; content opens in opposite direction |
| Running headers | Section title running right-aligned; page numbers modified for RTL |
| Captions | Right-aligned to images; image ordering reversed (1st image is rightmost) |
| Pull quotes | Right-aligned in larger type; quotation marks reversed (» «) |

## Digital Design Systems for Arabic

For MediaBubble's design infrastructure, the Arabic design token layer must include:

```yaml
design_tokens:
  spacings:
    container-padding: "var(--spacing-8)"
  typography:
    font-arabic: "Cairo"
    font-latin: "Poppins/Inter"
    heading-scale: "2rem / 1.5rem / 1.25rem / 1rem"
    line-height-arabic: 1.6
    line-height-arabic-heading: 1.2
  layout:
    rtl-direction: "rtl"
    grid-columns: "ar-r-12 / ar-l-12"
  icons:
    mirror-directional: true
    exceptions: ["sound", "camera", "video"]
```
