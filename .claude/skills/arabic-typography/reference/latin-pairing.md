# Latin-Arabic Font Pairing Matrix

## Core Principle

Pair fonts by **geometric structure** and **personality**, not by name popularity. An Arabic font's stroke shape, proportion, and rhythm should mirror the Latin font's character.

## Pairing Matrix

| Arabic Font | Latin Font (Headings) | Latin Font (Body) | Personality Match | Best For |
|-------------|----------------------|-------------------|-------------------|----------|
| **Cairo** 700–900 | **Poppins** 600–900 | **Inter** 400–500 | Clean geometric × Clean geometric | Primary brand pair — marketing, web, UI |
| **Cairo** 400–600 | **Inter** 400–600 | **Inter** 400 | Geometric × Swiss utilitarian | Dashboard, data-heavy apps |
| **Noto Naskh Arabic** 400–700 | **Source Serif** 400–700 | **Merriweather** 400 | Traditional Naskh × Serif | Editorial, blog, long-form |
| **Noto Naskh Arabic** 500–700 | **Playfair Display** 600–700 | **Source Serif** 400 | Naskh × Elegant Serif | Premium editorial, thought leadership |
| **Amiri** 400–700 | **Playfair Display** 400–700 | **Source Serif** 400 | Calligraphic × Elegant Serif | Luxury, premium brand moments |
| **Amiri** 600–700 | **Cormorant Garamond** 600–700 | **Lora** 400 | Classical × Classical | Certificates, invitations, print |
| **Changa** 400–800 | **Nunito** 400–800 | **Quicksand** 400 | Rounded Sans × Rounded Sans | Youth campaigns, casual content |
| **Readex Pro** 300–700 | **Inter** 300–700 | **Inter** 300–400 | Variable × Modern Sans | Web-first, performance-critical |
| **IBM Plex Sans Arabic** 400–600 | **IBM Plex Sans** 400–600 | **IBM Plex Sans** 400 | Mono Sans × Mono Sans | Code, technical content, data |
| **Scheherazade New** 400–700 | **Didot** 400–700 | **Lora** 400 | Traditional × Classic Serif | High-end luxury, fashion |

## Primary Pair: Cairo × Poppins × Inter

This is the **recommended default** for MediaBubble and most modern Egyptian brands.

| Role | Arabic | Latin | CSS Class |
|------|--------|-------|-----------|
| Hero / Display | Cairo 800–900 | Poppins 700–900 | `font-arabic-display` |
| Heading 1 | Cairo 700 | Poppins 700 | `font-arabic-h1` |
| Heading 2 | Cairo 600–700 | Poppins 600 | `font-arabic-h2` |
| Heading 3 | Cairo 600 | Poppins 600 | `font-arabic-h3` |
| Body | Cairo 400 | Inter 400 | `font-arabic-body` |
| Small / Caption | Cairo 400 | Inter 400 | `font-arabic-small` |
| CTA Button | Cairo 600–700 | Poppins 600 | `font-arabic-cta` |
| Label / Meta | Cairo 500 | Inter 500 | `font-arabic-label` |

### Visual Weight Matching

Arabic Cairo at a given weight appears **lighter** than Latin Poppins at the same weight.

| Desired Visual Weight | Arabic (Cairo) | Latin (Poppins) |
|-----------------------|---------------|-----------------|
| Thin | 300 | 300 |
| Regular | 500 | 400 |
| Semi-bold | 600 | 500 |
| Bold | 700 | 600 |
| Extra-bold | 800 | 700 |
| Heavy | 900 | 800 |
| Black | 1000 | 900 |

When setting bilingual headings, bump Arabic +1 weight relative to Latin for visual balance:
```
font-weight: 700; /* Latin Poppins */
font-weight: 800; /* Arabic Cairo — same heading, visual match */
```

## Display Sizes (Bilingual Context)

| Context | Latin (Poppins) | Arabic (Cairo) | Line Height |
|---------|----------------|----------------|-------------|
| Desktop hero | 72px / 700 | 64px / 800 | 1.2 |
| Desktop H1 | 48px / 700 | 44px / 800 | 1.3 |
| Desktop H2 | 36px / 600 | 34px / 700 | 1.4 |
| Desktop H3 | 24px / 600 | 22px / 600 | 1.5 |
| Desktop body | 16px / 400 | 16px / 500 | 1.7 |
| Mobile hero | 40px / 700 | 36px / 800 | 1.2 |
| Mobile body | 15px / 400 | 15px / 500 | 1.7 |

## Do's & Don'ts

### Do
- Pair Cairo with Poppins (matching geometric structure)
- Pair Noto Naskh Arabic with Source Serif (matching serif structure)
- Match visual weight, not CSS weight (Arabic needs +1)
- Test both fonts at the same actual size in a bilingual mockup
- Consider x-height: Arabic fonts with larger x-height pair better with Latin fonts with larger x-height

### Don't
- Never pair a geometric Arabic (Cairo) with a serif Latin (Playfair Display)
- Never pair a traditional Arabic (Amiri) with a sans-serif Latin (Inter)
- Never use Poppins or Inter for Arabic text (missing glyphs, poor rendering)
- Never mix Arabic and English fonts within the same word or phrase
- Don't use two Arabic fonts in the same design unless one is UI and one is editorial (with clear separation)
