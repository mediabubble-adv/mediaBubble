# Font Engineering — Arabic Font Loading & Performance

## Font Loading Strategy

### Option A: next/font/google (Current Setup)

```typescript
// lib/fonts.ts
import { Inter, Poppins, JetBrains_Mono, Cairo } from 'next/font/google'

export const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const poppinsFont = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-poppins',
})

export const jetbrainsMonoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const cairoFont = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',           // Critical: prevents invisible text
  preload: true,              // Preload Arabic subset by default
  adjustFontFallback: true,   // Prevent layout shift
})
```

### Option B: Self-Hosted Variable Font (Best Performance)

```css
/* app/fonts.css */
@font-face {
  font-family: 'Cairo';
  src: url('/fonts/Cairo-Variable.woff2') format('woff2-variations');
  font-weight: 200 1000;
  font-display: swap;
  unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF, U+1EE00-1EEFF;
  /* Arabic script Unicode ranges only */
}
```

**Why self-host:**
- Single variable font file (~50KB woff2 subset) replaces 5 individual weight files (~200KB+)
- Full control over caching and CDN delivery
- No external request to Google Fonts
- Unicode-range subsetting loads only Arabic glyphs

### Font Loading Performance Comparison

| Method | File Size | Requests | FCP Impact | Arabic Character Support |
|--------|-----------|----------|------------|------------------------|
| next/font/google (individual weights) | ~200KB (5 weights) | 1-2 | Medium | Full (latin + arabic) |
| next/font/google (variable) | ~80KB | 1 | Low | Full |
| Self-hosted variable (subset) | ~50KB | 1 | Very Low | Arabic only |
| Self-hosted full variable | ~150KB | 1 | Low | Full (latin + arabic) |

## Variable Font Configuration

### Cairo Variable Font
The Cairo typeface is available as a variable font with two axes:
- **Weight:** 200 to 1000 (thin to black)
- No width axis — fixed width per weight

```css
/* CSS variable font syntax */
font-family: 'Cairo Variable', sans-serif;
font-weight: 400; /* or any value 200-1000 */
font-variation-settings: 'wght' 700;
```

### Generating Subset Variable Font

```bash
# Using glyphhanger + fonttools (pyftsubset)
glyphhanger --whitelist="U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF,U+1EE00-1EEFF" --subset=Cairo-Variable.woff2
# Or use google-webfonts-helper for hosted subsets
```

## Preloading Strategy

```html
<!-- In app/layout.tsx head -->
<link
  rel="preload"
  href="/fonts/Cairo-Variable.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>
```

For self-hosted fonts, preload the variable font file early. For next/font/google, the `preload: true` option handles this automatically for Latin subset. Ensure Arabic subset is also preloaded.

## Font Display Strategies

| `font-display` Value | Behavior | Use Case |
|---------------------|----------|----------|
| `swap` | Show fallback immediately, swap when font loads | Recommended for body text |
| `block` | Invisible text until font loads (short timeout) | Only for critical hero text |
| `optional` | Show fallback if font doesn't load in ~100ms | Performance-critical, non-essential text |
| `fallback` | Short block period then swap | Balance between performance and brand |

**Recommendation:** Use `swap` for Arabic body text, `optional` for decorative Arabic elements.

## Core Web Vitals Optimization

### Cumulative Layout Shift (CLS)
Arabic font swap can cause layout shifts because Arabic glyphs differ significantly from Latin fallback glyphs in width.

**Mitigations:**

```css
/* 1. Use size-adjust to match fallback width to Cairo */
@font-face {
  font-family: 'Cairo Fallback';
  src: local('Arial');
  size-adjust: 110%; /* Cairo is wider than Arial */
  ascent-override: 90%;
  descent-override: 25%;
  line-gap-override: 0%;
}

/* 2. Use font-family stack with prepared fallback */
font-family: 'Cairo', 'Cairo Fallback', sans-serif;
```

### Largest Contentful Paint (LCP)
Font loading delays LCP for text-heavy Arabic pages.

**Mitigations:**
1. Preload critical Arabic font
2. Use variable font (single file, faster download)
3. Self-host on CDN with optimal cache headers
4. Serve font from same origin (no DNS lookup)

## Bundle Optimization

### next/font/google Bundle Size

```typescript
// BAD — loads all subsets
const cairo = Cairo({ weight: ['400', '600', '700', '800', '900'] })

// GOOD — Arabic subset only (for Arabic pages)
const cairo = Cairo({
  subsets: ['arabic'],  // Arabic only — smaller download
  weight: ['400', '600', '700', '800', '900'],
})

// GOOD — Arabic + Latin (for mixed content pages, current setup)
const cairo = Cairo({
  subsets: ['arabic', 'latin'],  // Both — larger but supports bilingual
  weight: ['400', '600', '700', '800', '900'],
})
```

### Asset Hints

```html
<!-- Preconnect to Google Fonts origin (if using Google Fonts) -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Preload font CSS (next/font/google handles this, but for self-hosted:) -->
<link
  rel="preload"
  href="/fonts/Cairo-Variable.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

## Font Loading Debugging

```typescript
// browser console — check which fonts are loaded
document.fonts.ready.then(() => {
  console.table([...document.fonts].map(f => ({
    family: f.family,
    weight: f.weight,
    style: f.style,
    status: f.status,
  })))
})
```

## Checklist

- [ ] Variable font used (single file, all weights)
- [ ] Arabic-only subset created (~50KB target)
- [ ] `font-display: swap` or `optional` set
- [ ] Preload tag for critical font
- [ ] Font fallback prepared with `size-adjust` for CLS prevention
- [ ] No external font requests blocking render
- [ ] Font loaded on CDN with immutable cache
- [ ] Tested on 3G connection (simulate slow network)
- [ ] Arabic glyph rendering verified in Chrome, Safari, Firefox
- [ ] Bundle size documented and monitored
