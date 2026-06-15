# Arabic Accessibility — WCAG for Arabic Script & RTL

## Overview

Arabic script has different legibility characteristics from Latin. These guidelines adapt WCAG standards for Arabic and RTL interfaces.

## Color & Contrast

### Arabic-Specific Contrast Considerations

Arabic has more closed-loop characters (ح, ع, غ, ق, etc.) that can fill in at small sizes or low contrast.

| WCAG Criterion | Arabic Consideration | Standard |
|---------------|---------------------|----------|
| 1.4.3 Contrast (Normal) | Body text: minimum 4.5:1. Arabic closed loops need this minimum more urgently. | 4.5:1 |
| 1.4.3 Contrast (Large) | 18px+ bold or 24px+ regular: minimum 3:1. | 3:1 |
| 1.4.6 Contrast (Enhanced) | Preferred for Arabic body text. | 7:1 |

**Recommendation:** Target 5:1 minimum for Arabic body text (stricter than WCAG's 4.5:1) due to closed-loop character fill-in.

## Text Spacing

| WCAG Criterion | Arabic Standard | Notes |
|---------------|-----------------|-------|
| 1.4.12 Line height | **1.6–1.8** (vs 1.4–1.5 for Latin) | Arabic ascenders/descenders need more vertical space |
| Paragraph spacing | 1.5x line height | Prevents text blocks from blending |
| Letter spacing (tracking) | **0px** (do NOT use) | Arabic is cursive — letter-spacing breaks connections |
| Word spacing | Normal or slightly wider | Tight word spacing hurts readability |

### Line Height Comparison

| Context | Latin | Arabic |
|---------|-------|--------|
| Body text (16px) | 1.5 (24px) | 1.7 (27px) |
| Small text (14px) | 1.5 (21px) | 1.8 (25px) |
| Heading (24px) | 1.3 (31px) | 1.4 (34px) |

## Text Resize & Zoom

| WCAG Criterion | Arabic Consideration |
|---------------|---------------------|
| 1.4.4 Resize text | Arabic at 200% can break cursive connections between letters. Test every container. |

**Testing checklist for zoom:**
1. Set browser zoom to 200%
2. Check every text element for:
   - Broken letter connections (Arabic-specific)
   - Overflow or truncation
   - Horizontal scrollbars
   - Overlapping elements
3. Test in both LTR and RTL mode

## Language & Reading Order

| WCAG Criterion | Requirement |
|---------------|-------------|
| 3.1.1 Language of page | `<html lang="ar">` for Arabic pages. Never leave `lang` as `en` on Arabic content. |
| 3.1.2 Language of parts | Wrap English fragments in `<span lang="en">`. Wrap Arabic fragments in English pages in `<span lang="ar">`. |
| 1.3.2 Meaningful sequence | DOM order must match visual reading order. In RTL, this means the DOM should flow RTL, not LTR with visual reordering. |

### Screen Reader Notes

- Arabic has excellent screen reader support in VoiceOver (macOS/iOS) and TalkBack (Android)
- JAWS and NVDA support Arabic on Windows
- Always set `lang="ar"` — screen readers use this to load the correct speech synthesizer
- For mixed content, wrap each language fragment in its correct `lang` attribute

## Focus & Keyboard Navigation

| WCAG Criterion | RTL Consideration |
|---------------|-------------------|
| 2.1.1 Keyboard | Tab order follows DOM order. In RTL layouts, visual order should match tab order. |
| 2.4.3 Focus Order | Focus should move in reading direction (right-to-left in RTL). |
| 2.4.7 Focus Visible | Focus indicators must be visible on both sides of elements. Don't clip focus on LTR or RTL side. |

## Touch Targets

| Criterion | Standard | Arabic Note |
|-----------|----------|-------------|
| Touch target | Minimum 44x44px | Same standard applies. Arabic text is longer — watch for tight button layouts. |
| Target spacing | 8px minimum between targets | Same. |

## Arabic Typography Accessibility Checklist

- [ ] Font size: body text minimum 16px (18px preferred for Arabic)
- [ ] Line height: minimum 1.6 for body text
- [ ] Letter spacing: 0 (never applied to Arabic)
- [ ] Contrast ratio: minimum 5:1 for Arabic body text
- [ ] Language attribute: `lang="ar"` on all Arabic content
- [ ] Direction attribute: `dir="rtl"` on Arabic content
- [ ] Mixed content: English fragments wrapped in `dir="ltr" lang="en"`
- [ ] No images of text (WCAG 1.4.5)
- [ ] Zoom to 200%: no broken connections or overflow
- [ ] Screen reader test: VoiceOver + Arabic voice
