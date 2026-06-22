---
name: MediaBubble Brand Guidelines
description: Creative Obsidian Studio Dashboard for MediaBubble Brand assets and components.
colors:
  brand-blue: "#2196F3"
  dark-blue: "#1565C0"
  brand-yellow: "#FFC107"
  accent-mint: "#1AD191"
  deep-charcoal: "#0D0F12"
  neutral-bg-dark: "#0D0F12"
  neutral-bg-light: "#FAFAFA"
  neutral-text-dark: "#e5e7eb"
  neutral-text-light: "#333333"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  arabic:
    fontFamily: "Cairo, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.6
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  "2xl": "32px"
components:
  button-primary:
    backgroundColor: "{colors.brand-yellow}"
    textColor: "#0D0F12"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-secondary:
    backgroundColor: "{colors.dark-blue}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
---

# Design System: MediaBubble Brand Guidelines

## 1. Overview

**Creative North Star: "Obsidian Creative Studio"**

MediaBubble is a bold, strategic ally for businesses growing their presence. The visual design system reflects this status with an editorial-inspired dark layout featuring high-contrast colored accents. Rather than defaulting to flat borders or warm cream panels, the Obsidian Creative Studio aesthetic uses deep blue-black spaces (#0D0F12) illuminated by precise structural accents of glowing Brand Blue (#2196F3) and Brand Yellow (#FFC107).

This interface focuses on professional utility, clean information hierarchy, and direct interactive code preview blocks. Spacing strictly aligns to an 8px grid (using 4px increments for micro-adjustments).

**Key Characteristics:**

- Deep obsidian backgrounds paired with crisp borders (`border-white/[0.08]`) to avoid standard gray boxes.
- Precise typography hierarchy, featuring bold geometric headings (Poppins) and highly readable interfaces (Inter, Cairo).
- High visual utility, complete with copy-to-clipboard interactions, keyboard shortcuts, and code previews.
- Rejection of heavy box shadows in favor of solid colored borders or tight, glowing accents.

## 2. Colors

The color palette is divided into high-contrast functional roles. Bold accent colors are used selectively to guide user attention.

### Primary

- **Brand Blue** (#2196F3): Navigation links, primary interactive states, outlines, and text highlights.
- **Dark Blue** (#1565C0): Header tags, sidebar backgrounds, and hover indicators.

### Accent

- **Brand Yellow** (#FFC107): Main Call to Action (CTA) buttons, high-priority highlights, and active/focus states.
- \*\*Accent Mint (#1AD191): Vibrant teal-green accent. Used for premium highlights, secondary accents, and elevated hover states.

### Neutrals

- **Deep Charcoal** (#0D0F12): Dark container fills, dropdowns, and sidebar backgrounds.
- **Canvas White** (#FAFAFA): Light mode background.
- **Canvas Dark** (#0D0F12): Dark mode background.

## 3. Typography

Typography uses Cairo for Arabic text and Poppins/Inter for English text. High contrast between display headings and body copy is maintained.

- **Display (Poppins, Bold, 700)**: Used for main titles and section heros. Characterized by `-0.03em` letter spacing and `1.2` line height to keep titles punchy.
- **Body (Inter, Regular, 400)**: Used for interface copy, paragraphs, and list text. Generous `1.6` line height for readability.
- **Arabic (Cairo, Bold, 700)**: Cairo handles all Masri and Khaliji Arabic copy, styled with native right-to-left classes.

## 4. Elevation

The Obsidian Creative Studio is structurally flat. Elevating components relies on border tinting and high-contrast color fills rather than large blurry shadows.

- **Level 0 (Canvas)**: Background surface (#0D0F12 / #FAFAFA).
- **Level 1 (Card/Container)**: Raised container (#111827 / #FFFFFF) with a thin border (`1px solid var(--brand-whisper-border)`).
- **Active Elevation**: Scale shifts (`hover:-translate-y-0.5`) and glowing borders in the accent color (`border-brand-blue`). No shadow blur exceeds 8px.

## 5. Components

Components are built to be responsive, tactile, and highly functional.

- **Primary Buttons**: Saturated Yellow fill (#FFC107) with Dark Charcoal text (#0D0F12). Fully rounded or rounded-sm (6px) with rapid scale hover animation.
- **Secondary Buttons**: Saturated Blue/Dark Blue fill with white text.
- **Playground Cards**: Monochromatic cards with light border outlines, featuring a header, code preview, and copy CTA.

## 6. Do's and Don'ts

### Do's

- Do check contrast for body copy (ensure light gray text is bumped to #e5e7eb on dark backgrounds).
- Do keep card border radii below 16px (12px is standard for cards, 6px for buttons).
- Do use `text-wrap: balance` on all h1–h3 headings.
- Do keep phone numbers in left-to-right (`dir="ltr"`) layout even in Arabic translation blocks.

### Don'ts

- Don't use gradient text backgrounds.
- Don't use side-stripe borders (e.g. `border-l-4`) for card emphasis.
- Don't pair 1px borders with large blurry shadows (>16px).
- Don't use generic SaaS cream/sand backgrounds.
