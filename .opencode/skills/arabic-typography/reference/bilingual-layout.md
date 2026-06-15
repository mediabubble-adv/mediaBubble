# Bilingual Layout Strategies

## Two Primary Strategies

### Strategy 1: Locale-Based Routing (Recommended)

Separate pages per language with full RTL for Arabic.

```
/en/about  → LTR, English
/ar/about  → RTL, Arabic
```

**Requirements:**
- `next-intl` or similar i18n framework
- `[locale]/` routing in Next.js App Router
- Separate message files (`en.json`, `ar.json`)
- `dir` attribute on `<html>` per locale
- hreflang tags for SEO

**Best for:** Content-heavy sites, SEO, clean separation, full RTL implementation.

### Strategy 2: Side-by-Side Layout

Same page shows both languages. Common for landing pages.

```
[EN Heading]                 [عنوان عربي]
[EN body text......]         [نص عربي.......]
[EN CTA]                     [الزر بالعربي]
```

**Best for:** Landing pages, product showcases, bilingual marketing materials.

**Challenges:**
- Arabic text is 25-35% longer — hard to align visually
- Responsive behavior is complex (stack on mobile)
- Screen reader confusion — must mark each block with correct `lang`

## Language Switcher UX

### Position

| Device | Position |
|--------|----------|
| Desktop header | Top-right in LTR, top-left in RTL |
| Mobile | In hamburger menu, or as toggle near logo |

### Labels

| Style | English | Arabic |
|-------|---------|--------|
| Full | English | العربية |
| Abbreviated | EN | AR |
| Icon | Globe icon | Globe icon |

### Behavior

- **Auto-detect** — Check `Accept-Language` header, redirect to matching locale
- **Remember** — Store preference in cookie/localStorage
- **Current locale** — Always show the OTHER language option (never navigate to current)

## Responsive Bilingual Layout

### Desktop (≥1024px)

```
┌──────────────────────────────────────────────┐
│  [EN Heading]              [عنوان عربي]       │
│  [EN body text...]         [نص عربي...]       │
│  [EN CTA]                  [الزر بالعربي]     │
└──────────────────────────────────────────────┘
```

### Tablet (768-1023px)

```
┌──────────────────────────────────────┐
│  [EN Heading]     [عنوان عربي]        │
│  [EN body text...]                    │
│  [نص عربي...]                         │
│  [EN CTA]        [الزر بالعربي]       │
└──────────────────────────────────────┘
```

### Mobile (<768px)

```
┌──────────────────────┐
│  [عنوان عربي]         │
│  [نص عربي...]         │
│  [الزر بالعربي]       │
│  ─────────────        │
│  [EN Heading]         │
│  [EN body text...]    │
│  [EN CTA]             │
└──────────────────────┘
```

**Rule:** On mobile, show Arabic first (target market primary), then English.

## RTL + SEO Considerations

### Hreflang Tags

```html
<link rel="alternate" hreflang="en" href="https://mediabubble.com/en/about" />
<link rel="alternate" hreflang="ar" href="https://mediabubble.com/ar/about" />
<link rel="alternate" hreflang="x-default" href="https://mediabubble.com/en/about" />
```

### URL Structure

| Pattern | Example | Best For |
|---------|---------|----------|
| Subdirectory | `domain.com/ar/page` | Most common, easy to manage |
| Subdomain | `ar.domain.com/page` | Separate hosting |
| Parameter | `domain.com/page?lang=ar` | Worst for SEO, avoid |

### Content Parity

Google expects **parity** between language versions. Arabic pages should have equivalent content to English pages. Partial translations rank poorly.

## Mixed Content Handling

When Arabic and English appear on the same page (e.g., brand names, social share buttons):

```html
<p>
  مرحباً بكم في
  <span dir="ltr" lang="en">MediaBubble</span>
</p>
```

```css
[dir="rtl"] .mixed-content {
  /* Arabic text with embedded LTR fragments */
}

.mixed-content span[dir="ltr"] {
  unicode-bidi: embed;
  direction: ltr;
}
```

## Common Bilingual Layout Mistakes

| Mistake | Why It's Wrong | Fix |
|---------|---------------|-----|
| Same font for both | Arabic + Latin need different fonts | Pair Cairo with Poppins/Inter |
| Same weight for both | Arabic 400 looks lighter than Latin 400 | Bump Arabic +1 weight |
| Rigid grid (equal width) | Arabic is 25-35% longer | Use flexible grid or separate layouts |
| Ignoring `dir` on mixed content | Numbers, punctuation misalign | Wrap English fragments in `dir="ltr"` |
| Left-aligning English in RTL page | Inconsistent with page direction | Use `text-align: start` |
