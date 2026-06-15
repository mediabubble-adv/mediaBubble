# Technical SEO — Arabic-Specific Settings

## Arabic URL Slug Strategy

### Option A: English Transliteration Slugs (Recommended)
Use English transliteration of the Arabic content title.

**Pros:** Clean, shareable, works across all systems, intuitive for bilingual users
**Cons:** Doesn't include Arabic keywords in URL (minimal SEO impact)

```
/cairo-dentist
/egypt-best-hospitals
/back-pain-causes-treatment
/book-doctor-appointment
```

### Option B: Arabic Script Slugs
Use Arabic text in the URL.

**Pros:** Keyword in URL, purely Arabic experience
**Cons:** URL encoding issues, long URLs, copy-paste problems, some systems mishandle

```
/%D8%AF%D9%83%D8%AA%D9%88%D8%B1-%D8%A3%D8%B3%D9%86%D8%A7%D9%86-%D8%A7%D9%84%D9%82%D8%A7%D9%87%D8%B1%D8%A9
```

### Recommendation
Use English transliteration for most content. Arabic URLs are not a ranking factor and the usability cost outweighs the benefit. Exception: highly competitive Masri content where every signal counts. Always test Arabic URLs before launch.

### Slug Rules
- Lowercase only
- Hyphens between words
- No stop words (و, في, من, على, ال, etc.)
- Include primary keyword in transliteration
- Keep under 60 characters
- Consistent pattern per content type

| Content Type | Slug Pattern | Example |
|-------------|-------------|---------|
| Doctor page | /doctor/[name]-[specialty] | /doctor/ahmed-saleh-dentist |
| Article | /[topic]-[subtopic] | /back-pain-causes-treatment |
| Location | /[city]/[specialty] | /cairo/dentist |
| Service | /[service-type] | /medical-tourism-egypt |
| Guide | /guide/[topic] | /guide/choosing-hospital |

---

## Hreflang for Bilingual Content

### Implementation
When content exists in both Arabic and English:

```html
<!-- Arabic (Egypt) version -->
<link rel="alternate" hreflang="ar-EG" href="https://mediabubble.eg/طبيب-أسنان" />

<!-- Arabic (general) version -->
<link rel="alternate" hreflang="ar" href="https://mediabubble.eg/طبيب-أسنان" />

<!-- English version -->
<link rel="alternate" hreflang="en" href="https://mediabubble.com/dentist" />

<!-- Default -->
<link rel="alternate" hreflang="x-default" href="https://mediabubble.eg/طبيب-أسنان" />
```

### Content Mapping Rules

| Content | Arabic URL | English URL | Hreflang |
|---------|-----------|-------------|----------|
| Arabic-only | /دكتور-أسنان | — | ar-EG, ar |
| English-only | — | /dentist | en, x-default |
| Bilingual | /دكتور-أسنان | /dentist | ar-EG, ar, en, x-default |

### Common Mistakes
- Missing self-referencing hreflang tag
- Inconsistent URL patterns between language versions
- Using hreflang when content is significantly different (use canonical instead)
- Forgetting x-default tag

---

## RTL & Google Crawling

### How Google Handles Arabic
- Google fully supports Arabic script crawling and indexing
- BERT and MUM models understand Arabic context (including Masri)
- RTL vs LTR doesn't affect crawlability
- No special technical setup needed for RTL

### Rendering Concerns
- Arabic web fonts can slow down page render (use font-display: swap)
- Ensure content is visible without JavaScript (Google renders JS but content should work without it)
- Test with Google's Mobile-Friendly Test for RTL pages
- Verify rendered content matches source (Google Search Console URL Inspection)

---

## Arabic Sitemaps

### Best Practices
- Include all Arabic URLs in the sitemap
- Use Arabic script URLs as-is (no need to encode)
- Set correct lastmod dates per content update
- Separate sitemap for Arabic content if > 10,000 URLs
- Include hreflang annotations in sitemap (alternative approach)

### Sitemap Entry Example

```xml
<url>
  <loc>https://mediabubble.eg/طبيب-أسنان-في-القاهرة</loc>
  <lastmod>2026-01-15</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
  <xhtml:link rel="alternate" hreflang="en" href="https://mediabubble.com/cairo-dentist"/>
  <xhtml:link rel="alternate" hreflang="ar-EG" href="https://mediabubble.eg/طبيب-أسنان-في-القاهرة"/>
</url>
```

---

## Page Speed for Arabic Content

### Arabic-Specific Speed Factors

| Factor | Impact | Mitigation |
|--------|--------|------------|
| Arabic web fonts (Cairo, weights 400-900) | Major — multiple font files | Variable font (single file), subset Arabic-only glyphs, font-display: swap |
| Arabic glyph complexity | Minor — same as Latin rendering | No special action needed |
| RTL CSS properties | Minor — logical properties same as physical | No additional cost |
| Image-heavy content (clinic photos, diagrams) | Major | WebP format, lazy loading, CDN, proper sizing |

### Font Loading Strategy

```html
<link rel="preload" href="/fonts/Cairo-Variable.woff2" as="font" type="font/woff2" crossorigin>
```

```css
@font-face {
  font-family: 'Cairo';
  src: url('/fonts/Cairo-Variable.woff2') format('woff2-variations');
  font-weight: 200 1000;
  font-display: swap; /* Critical for Core Web Vitals */
}
```

### Core Web Vitals Targets
| Metric | Target | Arabic-Specific Note |
|--------|--------|---------------------|
| LCP | < 2.5s | Font loading is biggest factor on text-heavy Arabic pages |
| FID / INP | < 100ms | No Arabic-specific concern |
| CLS | < 0.1 | Arabic text reflow on font swap. Set size-ascent/descent in @font-face |

---

## Canonical URLs

### Rules for Arabic Content
- Each Arabic page must have a self-referencing canonical
- For near-duplicate Arabic/English content, canonical to the preferred version
- Don't canonical Arabic to English or vice versa for different content
- Use canonical for Arabic pagination series (page 1 canonical for series)

```html
<!-- Arabic doctor page -->
<link rel="canonical" href="https://mediabubble.eg/دكتور-أحمد-السيد" />

<!-- Paginated Arabic article series -->
<link rel="canonical" href="https://mediabubble.eg/دليل-اختيار-المستشفى" />
<link rel="prev" href="https://mediabubble.eg/دليل-اختيار-المستشفى?page=1" />
<link rel="next" href="https://mediabubble.eg/دليل-اختيار-المستشفى?page=2" />
```
