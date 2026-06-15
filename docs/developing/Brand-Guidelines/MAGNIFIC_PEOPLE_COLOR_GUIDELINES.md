# MediaBubble Magnific People & Color Guidelines
## Ensuring Outfit Colors Match Design System + Visual Consistency

---

## BRAND COLOR PALETTE REFERENCE

### Primary Colors:
- **Bright Yellow**: #FFDE11 (primary accent, energy, optimism)
- **Professional Blue**: #358DCC (trust, expertise, primary structure)
- **Deep Navy**: #005282 (authority, depth, contrast)
- **Cyber Cyan**: #50C4DD (modern, innovation, secondary accent)

### Secondary/Supporting:
- **White**: #FFFFFF (clarity, space, breathing room)
- **Light Gray**: #F8F9FA (subtle backgrounds, testimonials)
- **Dark Gray/Charcoal**: #2C3E50 (text, dark backgrounds)

---

## CRITICAL RULE: NO GENERIC PEOPLE PHOTOS

**Default Position**: 
- **AVOID people in most assets** (heroes, process visuals, feature cards)
- **Use ONLY when strategically valuable** (testimonials, team section, case studies)
- **When people MUST appear**: Strict outfit color requirements apply

**Why avoid**:
✗ Stock photo people look generic, break brand authenticity
✗ Cannot control outfit colors → visual inconsistency
✗ Adds visual noise to architectural/abstract compositions
✗ Brand colors work better in abstract, geometric contexts

---

## WHEN PEOPLE ARE ALLOWED (Only in 3 Contexts)

### Context 1: Testimonial Cards (Optional - Minimal Appearance)
**Usage**: Customer success stories, client testimonials, case studies
**Appearance**: 
- Small circular crop (100-150px diameter)
- Minimal visibility (not full-body)
- Headshot only, neutral background

**Outfit Color Requirements**:
- **Shirt/Top MUST BE**: One of the brand colors
  - Yellow (#FFDE11): Bold, energetic testimonial
  - Blue (#358DCC): Professional, trustworthy testimonial
  - Navy (#005282): Authoritative, executive testimonial
  - Cyan (#50C4DD): Modern, innovative testimonial
- **Contrast**: Outfit color MUST contrast from background
- **Accessories**: Subtle, professional (watch, glasses, jewelry all in silver/gold/neutral)
- **Background**: Neutral (white, light gray, or blurred brand color not matching outfit)

**Magnific Prompt Addition**:
```
"Professional headshot for testimonial card.
Person wearing [COLOR] (#HEX) colored shirt/blazer providing strong contrast.
Neutral background that does NOT match outfit color (use contrasting background).
Headshot composition, professional lighting, clean studio aesthetic.
Focus: Face clarity, outfit color visibility.
No other people, clean professional quality."
```

---

### Context 2: Case Study Imagery (Team/Execution)
**Usage**: Showing team at work, client presentation, collaboration moment
**Appearance**:
- Can be full-body or mid-body shots
- Context showing work (laptop, whiteboard, discussion)
- Multiple people showing collaboration/teamwork

**Outfit Color Requirements**:
- **Primary color worn by 2-3 people**: One brand color (#FFDE11, #358DCC, #50C4DD, or #005282)
- **Secondary colors**: Other people wear complementary colors (white, light gray, dark gray)
- **Coordination**: Outfits create visual unity through brand color dominance
- **Contrast**: At least 60% visual difference between person and background
- **Accessories**: Professional, minimal, supports brand aesthetic

**Magnific Prompt Addition**:
```
"Team collaboration case study photograph.
Multiple people in professional setting (office, meeting room, client presentation).
2-3 people wearing [COLOR] (#HEX) blazers/shirts, others in white/gray/dark tones.
Background: Contrasting to outfit colors (office environment, neutral tones).
Composition: Shows collaboration, teamwork, active engagement.
Professional photography quality, natural lighting preferred.
Focus: Team interaction, outfit color visibility, modern office aesthetic."
```

---

### Context 3: Team/Leadership Section (Limited Use)
**Usage**: Team page, leadership spotlight, "about us" section
**Appearance**:
- Headshots or portrait-style photos
- Individual or grouped presentation
- Professional, polished appearance

**Outfit Color Requirements**:
- **Each person's outfit**: One brand color OR complementary neutral
- **Color distribution**: Spread brand colors across team (not everyone same color)
- **Contrast**: Each person contrasts from their background
- **Professional styling**: Polished, intentional, branded aesthetic
- **Accessories**: Watches, glasses, jewelry in silver/gold only (no colored accessories)

**Magnific Prompt Addition**:
```
"Professional team/leadership headshot for about page.
[NAME/ROLE] wearing [COLOR] (#HEX) blazer/shirt.
Background: Neutral [light/dark] that contrasts outfit color.
Professional studio lighting, polished styling.
Headshot composition, friendly professional expression.
Focus: Outfit color clarity, professional appearance.
Photography quality for premium brand positioning."
```

---

## COLOR COORDINATION MATRIX

### When Using Multiple People in Same Image:

| Person | Outfit Color | Background | Contrast Check |
|--------|--------------|-----------|-----------------|
| Person 1 | Yellow (#FFDE11) | Blue/Navy background | ✓ High contrast |
| Person 2 | Blue (#358DCC) | Light gray/White background | ✓ High contrast |
| Person 3 | Navy (#005282) | Light/White background | ✓ High contrast |
| Person 4 | White/Light gray | Blue/Navy background | ✓ High contrast |

**Rules**:
- No two people wear same outfit color (unless specifically for visual unity statement)
- Every outfit color MUST contrast 60%+ from its background
- No person wears background color (creates visual disappearance)
- Light colors (white, yellow, cyan) on dark backgrounds (navy, blue)
- Dark colors (navy, blue, dark gray) on light backgrounds (white, light gray)

---

## OUTFIT COLOR SWATCHES FOR MAGNIFIC

### Bright Yellow Outfit:
```
"Bright yellow (#FFDE11) blazer/shirt — vibrant, energetic, highly visible.
Contrasts against navy, blue, or dark background.
Professional tailoring, clean lines, premium quality fabric appearance.
Accessorized with silver watch, simple silver jewelry.
No yellow accessories (avoid duplicate yellow)."
```

### Professional Blue Outfit:
```
"Professional blue (#358DCC) blazer/shirt — trustworthy, authoritative, premium.
Contrasts against light gray, white, or light background.
Tailored, polished appearance, high-quality fabric.
Silver or gold accessories only, professional styling.
No blue accessories (avoid duplicate blue)."
```

### Deep Navy Outfit:
```
"Deep navy (#005282) blazer/suit jacket — executive, authoritative, premium.
Contrasts against white, light gray, or light background.
Impeccable tailoring, high-quality appearance, formal-professional.
Silver accessories only, sophisticated styling.
No navy accessories (avoid duplicate navy)."
```

### Cyan/Modern Outfit:
```
"Cyber cyan (#50C4DD) blazer/accent top — modern, innovative, tech-forward.
Contrasts against navy, dark blue, or dark background.
Contemporary tailoring, modern silhouette, premium quality.
Minimal silver accessories, clean professional aesthetic.
No cyan accessories (maintain uniqueness)."
```

### White/Neutral Outfit:
```
"Clean white or light gray (#F8F9FA) shirt/blouse — neutral support color.
Worn by supporting team members (not primary focus).
Contrasts against navy, blue, or dark backgrounds.
Professional, minimalist, allows brand color to dominate.
Silver accessories, simple elegant styling."
```

---

## MAGNIFIC GENERATION SETTINGS FOR PEOPLE IMAGES

### When People ARE Included:

**Magnific AI Settings**:
- **Mode**: Creative (for natural human rendering)
- **Resolution**: 3K minimum (human faces need detail)
- **Creativity**: 65-70/100 (human faces need consistency, not too creative)
- **Upscale**: 2x minimum (detail preservation critical for outfits)

**Why Lower Creativity for People**:
- Too high creativity = unpredictable outfit colors
- 65-70 range: Natural appearance + color control
- Avoids "weird Magnific artifacts" on human faces
- Maintains outfit color accuracy to your specifications

---

## SPECIFIC PROMPTS WITH PEOPLE & COLOR REQUIREMENTS

### Example 1: Testimonial Headshot
**Magnific Prompt**:
```
"Professional business headshot for customer testimonial.
Woman wearing bright yellow (#FFDE11) blazer—vibrant, energetic, stands out.
Background: Deep navy blue (#005282)—strong contrast to outfit.
Studio lighting, professional photography, clean white background or slight blur.
Accessories: Silver watch, simple professional styling.
Headshot framing, warm professional expression.
Focus: Outfit color clarity, face professional appearance.
No other people, polished premium quality.
Target: 3000x3000 (high-detail headshot for testimonial use)."
```

### Example 2: Case Study Team Photo
**Magnific Prompt**:
```
"Professional team collaboration photograph for case study.
Office setting: 3 people in active collaboration (around laptop/whiteboard).
Person 1 (left): Wearing professional blue (#358DCC) blazer.
Person 2 (center): Wearing white/light shirt—supporting color.
Person 3 (right): Wearing deep navy (#005282) blazer.
Background: Modern office environment (white walls, neutral gray furniture).
All outfit colors contrast strongly from background (60%+ contrast).
Accessories: Silver only, professional minimal styling on all people.
Professional photography, natural lighting, collaborative moment captured.
Focus: Team interaction, outfit color differentiation, modern office aesthetic.
No additional people, high-quality professional photography.
Target: 3072x1728 (16:9 for case study feature)."
```

### Example 3: Team Page Headshot
**Magnific Prompt**:
```
"Professional leadership headshot for company team page.
Male executive wearing deep navy (#005282) suit jacket.
Background: Light gray (#F8F9FA) or soft white—strong contrast to navy.
Professional studio lighting, polished executive appearance.
Accessories: Silver cufflinks, simple professional watch (silver).
Headshot framing, confident professional expression.
Premium photography quality, premium brand positioning aesthetic.
Focus: Outfit color clarity, executive professional appearance.
No other people, impeccable professional styling.
Target: 2400x2400 (high-detail team page headshot)."
```

---

## VISUAL CONSISTENCY PRINCIPLES

### Principle 1: Color Harmony Across All Assets
**Implementation**:
- Every asset (with or without people) uses same 4-color palette
- People outfits ONLY in palette colors
- Backgrounds use complementary palette colors
- Overall site maintains visual cohesion

**Check**: 
- Can you identify MediaBubble's colors in every asset?
- Do people outfits feel intentional, not random?
- Does color distribution create unity across pages?

### Principle 2: Outfit Color = Visual Hierarchy
**Implementation**:
- Primary brand color (yellow/blue): Key person/focus
- Secondary color (cyan/navy): Supporting people
- Neutral colors (white/gray): Background team members
- Never: Generic "business casual" (undefined colors)

**Check**:
- Does outfit color immediately identify who to look at?
- Is brand color visibility consistent across all people images?
- Do outfits feel coordinated, not coincidental?

### Principle 3: Contrast = Clarity
**Implementation**:
- 60% minimum contrast between outfit and background
- No outfit color matches background color
- High contrast = high professionalism
- Low contrast = visual confusion, rejected

**Check**:
- Can you clearly see the outfit color?
- Does the person stand out from background?
- Is there visual separation, not merging?

### Principle 4: Consistency in Style
**Implementation**:
- All people images: Professional, polished, intentional
- All accessories: Silver/gold only (not colored)
- All backgrounds: Brand colors or neutrals (never clashing)
- All lighting: Professional studio quality (never harsh shadows)

**Check**:
- Do all people images feel like they're from same brand?
- Would you mistake one person's photo for another company?
- Is quality consistent across all headshots/team photos?

---

## IMPLEMENTATION CHECKLIST

Before submitting Magnific requests with people:

### Pre-Generation:
- [ ] Identify which assets MUST have people (testimonials, team, case studies only)
- [ ] Assign brand colors to each person (use coordination matrix)
- [ ] Choose contrasting background colors (navy for yellow, white for blue, etc.)
- [ ] Write outfit color descriptions (use swatch templates provided)
- [ ] Specify Magnific settings (3K resolution, 65-70 creativity)

### Post-Generation Quality Check:
- [ ] Outfit color matches your specified brand color (#HEX match)
- [ ] Outfit contrasts 60%+ from background
- [ ] No outfit color matches background
- [ ] Accessories are silver/gold only (no color)
- [ ] Lighting is professional, clean, studio-quality
- [ ] Face clarity is sharp and professional
- [ ] Overall image feels intentionally branded, not stock-photo generic
- [ ] Multiple people images feel coordinated, not random
- [ ] All images use same color palette (visual consistency check)

### Magnific Regeneration Triggers:
- ✗ Outfit color doesn't match specified hex
- ✗ Background clashes with outfit
- ✗ Contrast is low (hard to see outfit color)
- ✗ Accessories have color (should be silver/gold)
- ✗ Lighting looks harsh or unflattering
- ✗ Face quality is blurry or AI-artifact visible
- ✗ Generic business casual (colors undefined/unclear)

---

## ASSET INVENTORY WITH PEOPLE GUIDELINES

### Tier 1: Heroes (NO PEOPLE)
All abstract, architectural, geometric. Zero people.
```
✓ Main Hero - Digital Transformation (no people)
✓ Services Discovery (no people)
```

### Tier 2: Service Visuals (NO PEOPLE)
All abstract, metaphorical, visual concepts. Zero people.
```
✓ SEO (no people)
✓ Branding (no people)
✓ Content Marketing (no people)
✓ Media Production (no people)
✓ Social Media (no people)
✓ Analytics (no people)
```

### Tier 3: Process Steps (NO PEOPLE)
Diagram-quality, flowchart aesthetic. Zero people.
```
✓ Step 1-5 Process (no people)
✓ Testimonial backgrounds (subtle, no people)
```

### Tier 4: Case Studies (PEOPLE OPTIONAL - WITH COLOR RULES)
Strategic use only. When included: strict outfit color coordination.
```
✓ Case Study 1: Team collaboration → 2-3 people, brand colors
✓ Case Study 2: Client presentation → 2-3 people, brand colors  
✓ Case Study 3: Before/After → Can be no people (abstract transformation)
✓ Case Study 4: Results showcase → Can be no people (metrics focus)

RULE: Only include people if it adds value. Abstract is often better.
WHEN INCLUDED: All outfits in brand colors, coordinated.
```

### Tier 5: Blog Articles (NO PEOPLE - STICK TO ABSTRACT)
Concept imagery, visual metaphors. Zero people.
```
✓ Strategy Article (no people)
✓ Trends Article (no people)
✓ How-To Article (no people)
```

### Tier 6: Team/Leadership Section (PEOPLE REQUIRED - WITH COLOR RULES)
Team page, about us, leadership spotlight.
```
✓ Team headshot 1 → Yellow (#FFDE11) outfit
✓ Team headshot 2 → Blue (#358DCC) outfit
✓ Team headshot 3 → Navy (#005282) outfit
✓ Team headshot 4 → White/Gray outfit (supporting)

RULE: All headshots distributed across brand colors.
REQUIREMENT: Each outfit color contrasts from background.
STYLE: Professional, polished, consistently premium.
```

### Tier 7: Email/Social (NO PEOPLE)
Platform-optimized, abstract brand visuals. Zero people.
```
✓ LinkedIn Header (no people)
✓ Instagram Post (no people)
✓ Twitter Header (no people)
✓ Email Newsletter (no people)
```

---

## SUMMARY: STRICT RULES FOR ANY PEOPLE IMAGES

### The Four Non-Negotiables:

1. **Outfit Color = Brand Color**
   - Every outfit must be one of: #FFDE11, #358DCC, #50C4DD, #005282
   - No generic "business casual" (undefined colors)
   - Magnific must render exact hex match

2. **Contrast = Visibility**
   - Outfit color must contrast 60%+ from background
   - No outfit matches background
   - Visual separation is non-negotiable

3. **Consistency = Professional**
   - All people images feel intentionally branded
   - Same professional quality across all headshots
   - Accessories silver/gold only (no color)

4. **Palette Unity = Visual Cohesion**
   - Every asset (people or not) uses same 4-color palette
   - No external colors introduced
   - MediaBubble brand colors visible everywhere

### When in Doubt:
**Don't use people.** Abstract, geometric, and architectural compositions work better for:
- Brand consistency
- Scalability (don't date)
- Visual distinctiveness (not stock-photo generic)
- Color control (guaranteed palette match)

---

## NEXT STEPS

1. ✅ Identify which assets actually NEED people (usually fewer than you think)
2. ✅ Use this guide for any people images
3. ✅ Apply Magnific settings specified (3K, 65-70 creativity)
4. ✅ Use outfit color swatches + coordination matrix
5. ✅ Check post-generation quality against checklist
6. ✅ Regenerate immediately if outfit colors don't match

**Recommendation**: For MediaBubble, limit people to:
- Team/Leadership section only (required)
- Case study hero (optional—abstract often better)
- Testimonials (optional—headshots only, minimal)

**Everything else**: Pure abstract, geometric, architectural imagery.

