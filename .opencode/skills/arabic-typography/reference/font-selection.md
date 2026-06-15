# Arabic Font Selection Guide

## Primary Recommendation: Cairo

**File:** Google Fonts (`next/font/google`)
**Classification:** Geometric Sans-serif
**Designer:** Google (Mohamed Gaber)
**Script support:** Arabic + Latin
**Weight range:** 200–1000 (9 weights)

| Weight | CSS Value | Best For |
|--------|-----------|----------|
| ExtraLight | 200 | Not recommended for Arabic |
| Light | 300 | Not recommended for Arabic |
| Regular | 400 | Body text, UI |
| Medium | 500 | Body text (stronger), UI labels |
| SemiBold | 600 | Subheadings, emphasized body |
| Bold | 700 | Headings (H2–H4), CTA buttons |
| ExtraBold | 800 | H1, hero display, emphasis |
| Black | 900 | Hero display, large headlines |
| ExtraBlack | 1000 | Posters, billboard-sized |

**Minimum weight for readability:** 400. Arabic script needs more stroke weight than Latin at the same size.

## Font Selection Matrix

| Purpose | Primary Font | Alternative | Classification | Best For |
|---------|-------------|-------------|----------------|----------|
| **UI body** | Cairo 400–500 | Noto Naskh Arabic 400 | Geometric Sans / Naskh Serif | Dashboard, app UI, forms |
| **UI headings** | Cairo 600–700 | Readex Pro 600 | Geometric Sans / Variable Sans | Section titles, cards |
| **Hero / Display** | Cairo 800–900 | Noto Kufi Arabic 800 | Bold Geometric / Square Kufic | Hero sections, billboards |
| **Editorial / Blog** | Noto Naskh Arabic 400–700 | Amiri 400–700 | Traditional Naskh Serif | Long-form articles, reading |
| **Luxury / Premium** | Amiri 400–700 | Scheherazade New 400–700 | Classical Naskh | Premium brand moments |
| **Casual / Youth** | Changa 400–800 | Cairo 600 (rounded feel) | Rounded Sans | TikTok, youth content |
| **Monospace / Code** | IBM Plex Sans Arabic 400–600 | — | Sans Mono | Code blocks, data, tables |
| **Variable / Web-first** | Readex Pro 300–700 | — | Variable Sans | Performance-critical, variable font |
| **Decorative / Logo** | Custom or Amiri | Noto Kufi | — | Brand mark, wordmark |

## Font Compatibility with Brand Positioning

| Brand Position | Arabic Font | Why |
|---------------|-------------|-----|
| Modern / Tech | **Cairo** | Clean geometric, matches Inter/Poppins aesthetic |
| Traditional / Trust | **Noto Naskh Arabic** | Classic Naskh, highly readable, authoritative |
| Luxury / Premium | **Amiri** | Calligraphic heritage, elegant |
| Youth / Bold | **Changa** | Rounded, casual, modern |
| Editorial / Content | **Readex Pro** | Variable font, web-optimized |

## When to Use Each Font

### Cairo
- **All primary UI** — navigation, buttons, forms, cards, tables
- **Marketing website** — headings, body, CTA
- **Social media graphics** — text overlays (use ExtraBold 800 for impact)
- **Presentations** — deck content
- **Email templates** — body and headings

### Noto Naskh Arabic
- **Blog long-form** — article body text (more readable at small sizes)
- **E-books / whitepapers** — downloadable content
- **Print** — brochures, flyers, reports
- **Legal / formal documents** — perceived authority

### Amiri
- **Luxury brand moments** — hero text for premium campaigns
- **Certificates / awards** — ceremonial feel
- **Invitations** — event materials
- **Display quotes** — pull quotes, testimonials

### Changa
- **TikTok overlays** — casual, impact at small sizes
- **Youth campaigns** — under-25 targeting
- **Casual social graphics** — Instagram stories
- **Gaming / entertainment** contexts

## Font Loading Strategy (Next.js)

```typescript
// app/[locale]/layout.tsx — Arabic route

// Primary: Cairo (all necessary weights)
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
});

// Optional: Noto Naskh Arabic for editorial content
const notoNaskh = NotoNaskhArabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-naskh',
  display: 'swap',
});

// Tailwind config
export default {
  theme: {
    extend: {
      fontFamily: {
        'arabic': ['var(--font-cairo)', 'system-ui', 'sans-serif'],
        'arabic-editorial': ['var(--font-noto-naskh)', 'serif'],
      },
    },
  },
};
```

## Font Size & Arabic Readability

| Context | Latin Size | Arabic Size | Note |
|---------|-----------|-------------|------|
| Body text | 16px | 16–18px | Same or slightly larger |
| Small text | 14px | 14–16px | Increase for readability |
| Caption | 12px | 12–14px | Arabic below 14px loses detail |
| Micro (legal) | 10px | 12px min | Never below 12px for Arabic |
| H1 | 48px | 44–48px | |
| H2 | 36px | 34–36px | |
| H3 | 24px | 22–24px | |

**Rule of thumb:** If space allows, set Arabic 1–2px larger than Latin counterpart at the same hierarchy level.

## Font Pairing Rules

1. **Match geometry with geometry** — Geometric Arabic (Cairo) + Geometric Latin (Poppins). Naskh Arabic + Serif Latin.
2. **Match weight visually** — Arabic 400 = Latin 400 in perceived weight? No. Arabic 400 often looks lighter. Match by eye, not by CSS value.
3. **Never mix in the same word** — One font per word. If a word contains Arabic letters, render the whole word in an Arabic font.
4. **One Arabic font per brand** — Unless you have an editorial section that justifies a second (e.g., Cairo for UI + Noto Naskh for blog).
