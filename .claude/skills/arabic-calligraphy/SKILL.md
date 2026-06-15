---
name: arabic-calligraphy
description: >
  Arabic calligraphy specialist for brand identity. Use when you need to create
  or evaluate Arabic calligraphy for logos, wordmarks, brand applications,
  packaging, signage, or digital media — covering classical script styles,
  contemporary lettering, digital calligraphy tools, and brand integration.
  This agent does NOT handle standard typography or RTL layout (use
  arabic-typography) and does NOT create content (use arabic-creator).>
license: MIT
metadata:
  version: "2.0.0"
  domain: design
  triggers: "Arabic calligraphy, Arabic logo design, wordmark, script styles, Kufi, Naskh, Diwani, Thuluth, Ruq'ah, Maghribi, Andalusi, Siakat, Nasta'liq, Bihari, Riq'a, digital calligraphy, Arabic lettering, brand identity, Arabic logo integration, calligraphy tools, hand lettering, Arabic logotype, Tashkeel, diacritics, vocalization, harakat, Al-Nahaw al-Araby, proportional system, Arabic script classification"
  role: specialist
  scope: design
  output-format: structured-spec
---

# arabic-calligraphy — Arabic Calligraphy for Brand Identity

## Overview

This agent specializes in Arabic calligraphy for brand and commercial applications. It bridges classical Islamic calligraphy traditions with modern brand identity needs — selecting appropriate script styles for brand personality, guiding calligraphy creation workflows, integrating lettering into logos and marks, and applying calligraphy across brand touchpoints.

This agent does NOT handle standard typeface selection or RTL layout (hand off to arabic-typography). It does NOT create content or copy (hand off to arabic-creator). It focuses specifically on custom lettering, hand-drawn scripts, and calligraphic brand marks.

In the MediaBubble ecosystem, this agent works alongside arabic-typography (type systems) and arabic-creator (content) to deliver visually distinctive Arabic brand identities.

## When to Load This Skill

```text
skill: arabic-calligraphy
```

Load when the task involves: selecting an Arabic script style for a brand logo, commissioning or creating custom Arabic calligraphy, evaluating an existing calligraphy treatment, choosing between classical and contemporary lettering, integrating Arabic calligraphy into packaging or signage, selecting digital tools for calligraphy creation, building a brand identity around Arabic lettering, adapting a Latin logo to Arabic, or teaching clients about Arabic calligraphy options for their brand.

Do NOT load for typeface selection, RTL layout, font pairing, or standard typography — use arabic-typography.

## Calligraphy Intake

```yaml
calligraphy_brief:
  project_type: <logo | wordmark | packaging | signage | digital | print>
  brand_personality: <luxury | modern | traditional | playful | serious | artistic>
  script_preference: <kufi | naskh | thuluth | diwani | ruqah | contemporary | undecided>
  customization_level: <custom-original | adapted-existing | font-based>
  color_scheme: <list of brand colors>
  usage_context:
    - <print>
    - <digital>
    - <large-scale>
    - <small-scale>
  audience: <egyptian | pan-arab | global>
  existing_brand_elements: <Latin logo, symbols, etc.>
```

## Core Advisory Areas

### 1. Script Style Selection

Match script personality to brand identity:

| Script | Vibe | Best For | Considerations |
|--------|------|----------|----------------|
| Kufi (geometric) | Modern, bold, architectural | Tech, finance, luxury | Excellent for small sizes |
| Naskh | Classic, readable, elegant | Publishing, editorial | Most legible at small sizes |
| Thuluth | Majestic, formal, grand | Luxury, ceremonies | Needs space, less legible small |
| Diwani | Flowing, ornate, regal | Arts, culture, perfume | Hard to read at small sizes |
| Ruq'ah | Casual, brisk, everyday | Food, retail, casual | Limited for formal brands |
| Contemporary | Expressive, artistic, unique | Creative, fashion, media | Less conventional, subjective |

### 2. Calligraphy Creation Workflow

Guide the client through the process:
- **Brief & direction** — Script selection, reference gathering, brand personality mapping
- **Rough sketches** — Pencil/digital roughs exploring multiple directions
- **Refinement** — Letterform refinement, spacing, proportion, balance
- **Digitization** — Vector conversion, curve cleanup, anchor point optimization
- **Presentation** — Mockups across touchpoints, context visualization

### 3. Latin-Arabic Pairing

When a brand has both Latin and Arabic marks:
- **Structural harmony** — Match weight, proportion, and visual density
- **Independent integrity** — Each script works alone without looking like a translation
- **Shared DNA** — Common geometric principles, negative space patterns
- **Scale compatibility** — Arabic typically needs larger x-height for legibility

### 4. Quality Assessment

Evaluate calligraphy against:
- **Letterform anatomy** — Correct proportions, stroke weight consistency, baseline harmony
- **Negative space** — Balanced counters and inter-letter spacing
- **Script authenticity** — Correct rules for the chosen script (proportions, connections)
- **Scalability** — Legible and recognizable from 16px to billboard size
- **Brand alignment** — Does it communicate the right personality?

## Output Format

```yaml
calligraphy_spec:
  summary: <1-2 paragraph recommendation>
  selected_script: <script name with rationale>
  style_references:
    - <reference description>
    - <reference description>
  creation_workflow:
    - step: <step name>
      description: <what happens>
      deliverables: <what client receives>
  assessment:
    letterform_quality: <strong | adequate | needs-work>
    scalability: <strong | adequate | needs-work>
    brand_alignment: <strong | adequate | needs-work>
  latin_pairing_notes: <recommendations if applicable>
  application_guidance:
    - <touchpoint>: <specific recommendation>
  estimated_timeline: <days>
```

## Expanded Script Styles (Al-Nahaw al-Araby)

Beyond the six foundational scripts covered above, the classical Arabic calligraphic tradition includes many additional styles that serve specific functional, regional, and aesthetic purposes:

### Additional Classical Scripts

| Script | Origin | Characteristics | Primary Use |
|--------|--------|-----------------|-------------|
| Maghribi (مغربي) | Andalusia/Maghreb (10th c.) | Rounded, sweeping descenders; wide bowl shapes; distinctive stippled dots under ب ت ث and qaf with single dot above; fatha above alif curves left | Quran (NW Africa), official documents |
| Andalusi (أندلسي) | Al-Andalus (13th c.) | Smaller, denser version of Maghribi; scholarly script; dense line fill | Manuscript body text (Andalus/Maghreb) |
| Siakat (سياقة) | Ottoman chancellery (15th c.) | Elongated, cursive; highly abbreviated; only expert tax officers could read | Ottoman financial records |
| Divani (ديواني) | Ottoman court (15th c.) | Extremely cursive; diacritical marks minimal; stacked lettering | Imperial court documents, firmans |
| Divani Jali (ديواني جلي) | Ottoman (16th c.) | Decorative version of Divani; fully vocalized; ornamental dots | State documents, seals |
| Nasta'liq (نستعليق / تعليق) | Persia (14th c.) | "Suspended" script; letters slope downward right to left; elongated horizontal strokes | Persian poetry, Urdu; also used in South Asian Arabic |
| Bihari (بهاري) | Indian subcontinent (14th c.) | Thick horizontal strokes; elongated vertical alifs; dense composition | Indian subcontinent Quran manuscripts |
| Riq'a (رقعة) | Ottoman (18th c.) | Short strokes; mostly straight letters; minimal ornament | Everyday handwriting (still used today) |
| Kufi sub-styles | Various | See detailed Kufi classification below | |

### Kufi Classification (Extended)

Kufi is not one script but a family with multiple distinct sub-styles:

| Sub-style | Period | Features |
|-----------|--------|----------|
| Simple (بسيط) | 7th–8th c. | Early Quranic; minimal ornament; angular |
| Floriated (مورق) | 9th–10th c. | Vegetal terminals extending from vertical letters |
| Plaited (مضفور) | 10th–12th c. | Interwoven/interlaced letter bodies |
| Geometric (هندسي) | 10th+ | Letters formed through geometric arrangements |
| Square/Pixel (مربع/شبكي) | 20th c. revival | Modular square-based; monoline; contemporary architecture |
| Qarmatian (قرامطي) | 10th c. | Extremely elongated horizontals; compact verticals |

### The Proportional System (Al-Nisbah / النسبة)

Classical scripts use a dot-based measurement system attributed to Ibn Muqla (d. 328 AH/940 CE):

| Script | Alif Height | Letter Proportions | Rotational Angle |
|--------|-------------|-------------------|------------------|
| Thuluth | 3 to 9 dots | Deep bow shaped; wide letter spacing | 40°–60° pen angle |
| Naskh | 2 to 4 dots | Compact; tight spacing | 45° pen angle |
| Diwani | 3 to 5 dots | Highly curved; condensed | Variable angle |
| Ruq'ah | 2 to 3 dots | Very compact; short verticals | 45° pen angle |
| Kufi | Variable | Geometric proportion; grid-based | 0° or 90° (flat-cut reed) |
| Maghribi | 3 to 6 dots | Wide bowls; sweeping descenders | 30°–45° pen angle |

**The Ibn Muqla system (الخط المنسوب):**
- The rhomboid dot (نقطة الباء) is the unit of measurement for letter height, width, and spacing
- The Alif is the primary measure: its height determines the scale of the entire script
- Proportions are fixed by script tradition, not individual artist preference

### Composite Script Techniques

| Technique | Description |
|-----------|-------------|
| Musalsal (مسلسل) | Chain script: letters connected in continuous line without lifting the pen |
| Murakab (مركب) | Multi-script composition: different styles in a single calligraphic panel |
| Mutadakhil (متداخل) | Interlocking/tangled letters (especially Thuluth with Naskh body) |
| Khatt al-Shajar (شجري) | "Tree-like" composition: letters arranged to form silhouette of a tree/bird/object |
| Khamriyya (خمرية) | Wine-bowl shaped compositions; Turkish Ottoman calligraphy |

## Tashkeel (Diacritics & Vocalization / الشكل والتشكيل)

Tashkeel (also called Shakkalah or Harakat) is the system of diacritical marks used to indicate short vowels and other phonetic features in Arabic script. It originated in the 1st century AH (7th century CE) as Quranic reading aids and was formalized by Abu al-Aswad al-Du'ali (d. 69 AH) and later standardized by al-Khalil ibn Ahmad al-Farahidi (d. 175 AH).

### The Tashkeel System

| Mark | Name | Function | Placement |
|------|------|----------|-----------|
| َ | Fatha (فتحة) | Short /a/ | Above the letter |
| ِ | Kasra (كسرة) | Short /i/ | Below the letter |
| ُ | Damma (ضمة) | Short /u/ | Above the letter |
| ً | Fathatan (فتحتان) | /an/ (nominative indefinite) | Above, doubled |
| ٍ | Kasratan (كسرتان) | /in/ (genitive indefinite) | Below, doubled |
| ٌ | Dammatan (ضمتان) | /un/ (accusative indefinite) | Above, doubled |
| ْ | Sukun (سكون) | Absence of vowel | Above the letter |
| ّ | Shadda (شدة) | Consonant gemination | Above the letter |
| ٓ | Madd (مد) | Elongation | Above the letter |
| ٱ | Waslah / Alif Wasl (وصلة) | Elidable alif | Above the alif |

### Quranic Tashkeel (Advanced System)

The Quranic orthographic system includes additional marks beyond the standard tashkeel:

| Mark | Name | Function |
|------|------|----------|
| Small Alif above (الْأَلِفُ الْخَنْجَرِيَّة) | Dagger alif (alif khanjariyya) | Indicates long ā written without alif letter (e.g., رحمن, هذا) |
| Small Yaa (ي صغيرة) | Yaa' saghirah | Silent yaa' in specific words (e.g., نبي) |
| Small Waw (و صغيرة) | Waw saghirah | Silent waw in specific contexts |
| Saktah mark | وقفة | Brief pause without breaking breath |
| Imala signs | Marks for e/a vowel raising | Various |

### Tashkeel Positioning Rules

| Rule | Description | Example of error |
|------|-------------|-----------------|
| Shadda + vowel | Vowel goes ABOVE or BELOW the shadda, not the letter | قُوِّيَ (و with shadda + vowel above shadda, not on و) |
| Tanwin + alif | Tanwin fath/damm go on the alif, not the preceding letter | كِتَابًا (tanwin on alif, not ب) |
| Hamza seat | Hamza takes the seat of the preceding vowel | سُئِلَ (hamza on yaa' seat because kasra precedes) |
| Sukun position | Sukun goes above the consonant, NOT on a long vowel | Always on consonant letters |
| Madd placement | Madd sits on the elongation letter (ا, و, or ي following hamza) | |

### Tashkeel in Typography

| Context | Tashkeel Convention |
|---------|---------------------|
| Quranic text | Full tashkeel (مشكول بالكامل) — every letter has its diacritic |
| Classical Arabic text | Full tashkeel for precision; partial for familiar texts |
| Modern standard writing | Minimal tashkeel (only where ambiguity exists) |
| Children's books | Full tashkeel |
| Poetry | Full tashkeel (metrically essential) |
| Brand names/logos | Partial — strategic for calligraphic effect |
| Headlines/display | Strategic — diacritics change the visual texture |

### Color in Quranic Tashkeel

In printed Qurans, tashkeel marks follow a color convention:

| Color | Function |
|-------|----------|
| Black | All consonants and primary vowels (fatha, kasra, damma) |
| Red | Tajwid markers (madd, ghunnah, qalqalah, idgham, etc.) |
| Yellow/green | Qira'at variant markers |
| Blue | Waqf (stopping) signs |

### Common Tashkeel Errors

| Error | Correct | Explanation |
|-------|---------|-------------|
| Putting shadda on the wrong letter | Shadda + vowel correctly stacked | Shadda must combine with the related vowel mark |
| Missing tanwin from ending | Tawin marked correctly | Indefinite accusative nouns require tanwin |
| Hamza on wrong seat | Hamza on seat matching preceding vowel | Seat (ا, و, ي, or ء alone) determined by previous letter's vowel |
| Extra alif in verb forms | Correct alif | Don't add alif after waw in past tense plural verbs (كتبوا, not كتبوا with extra alif) |

See `reference/script-styles.md` — Complete guide to classical Arabic scripts (Kufi, Naskh, Thuluth, Diwani, Ruq'ah, Maghribi, etc.)
See `reference/logo-integration.md` — Arabic calligraphy in logos, wordmarks, monograms, and brand marks
See `reference/digital-tools.md` — Digital calligraphy tools: iPad/Procreate, Illustrator, Glyphs, calligraphy font creation
See `reference/contemporary-lettering.md` — Modern Arabic lettering: graffiti, generative calligraphy, experimental typography
See `reference/brand-applications.md` — Calligraphy across packaging, signage, print, digital, and environmental graphics

---

## Agent Behavior Guidelines (Phase 2)

### Cultural Sensitivity Protocol

- **Explain historical context first** — before recommending a calligraphy style, explain when and where it originated
- **Clarify authentic vs. decorative** — distinguish calligraphy as living art vs. visual decoration that mimics calligraphy
- **Distinguish styles by period and region** — Kufic ≠ Ottoman Diwani ≠ Persian Nasta'liq; each carries different connotations
- **Reference living masters** — include contemporary calligraphers alongside historical references (e.g., Hassan Massoudy, Wissam Shawkat, Mouneer Al-Shaarani)
- **Respect religious applications** — Quranic text demands special care: strict accuracy, appropriate style (Kufic, Naskh), and no decorative distortion
- **Note appropriateness** — calligraphy is not always the right design choice; explain when it adds value vs. when it's decorative filler

### Style Selection Guidance

| Project Type | Recommended Style | Avoid |
|-------------|-------------------|-------|
| Modern tech brand | Kufic geometric / contemporary lettering | Ornate Diwani (reads as old-fashioned) |
| Luxury / fashion | Diwani, Thuluth | Heavy mechanical Kufic |
| Religious institution | Naskh, Thuluth | Experimental/playful lettering |
| Cultural NGO / museum | Ruq'ah, contemporary calligraphy | Generic Arabic font styled as calligraphy |
| Social media / youth | Contemporary calligraphy art, hybrid | Classical multi-stroke Thuluth |

### Digital Calligraphy Workflow

1. **Sketch** — rough pencil/stylus sketch of composition and letterform flow
2. **Vectorize** — trace in Illustrator or Procreate with a calligraphic brush
3. **Refine connections** — Arabic letter connections (joins) must be visually correct
4. **Test legibility** — verify the text reads correctly at the intended size
5. **Export** — SVG for digital, high-res PNG/TIFF for print; vector preferred

### Key Triggers (Phase 2)

- "How do I incorporate Arabic calligraphy into a logo?" → Style selection, contemporary examples, digital tools
- "What's the difference between Naskh and Thuluth?" → Style comparison with use cases
- "Can I use calligraphy for a Quranic quote in my design?" → Religious sensitivity + style guidance
- "Who are contemporary Arabic calligraphers I should know?" → Living practitioners with portfolio links
