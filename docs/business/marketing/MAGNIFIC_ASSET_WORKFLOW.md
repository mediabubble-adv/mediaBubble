# MediaBubble Design Asset Generation Workflow
## Using Magnific Upscale + AI Image Generation + taste-skill + emil-design-eng

---

## 1. OVERVIEW: The 3-Stage Asset Pipeline

```
Stage 1: GENERATE        Stage 2: ENHANCE          Stage 3: DESIGN
Base Assets             Quality Assets            Integrated Sites
        ↓                      ↓                         ↓
AI Image Gen      →    Magnific 2x/4x    →    taste-skill + emil-design-eng
(Higgsfield)          (Upscale/Enhance)       (Layout + Animation)
```

---

## 2. ASSET INVENTORY FOR MEDIABUBBLE

### Category A: Hero & Primary Visuals
- [ ] **Hero Image (Main)** - 1920x1080, agency/premium B2B aesthetic
- [ ] **Hero Image Variants** - 3 alternatives (different moods, color treatments)
- [ ] **Service Category Visuals** - 9 images (one per service: SEO, Branding, Media, etc.)
- [ ] **Case Study Hero Backgrounds** - 4 images (featured case studies)

### Category B: Feature Cards & Sections
- [ ] **Feature Icons/Illustrations** - 6-8 semi-abstract service icons
- [ ] **Process Step Visuals** - 5 images (our workflow visualization)
- [ ] **Team/Testimonial Backgrounds** - 3 cohesive backgrounds
- [ ] **Client Logo Mockups** - 2-3 context images

### Category C: Social & Secondary
- [ ] **Social Media Hero** - LinkedIn cover, Instagram story backgrounds (3 variants)
- [ ] **Blog Featured Images** - 3 template variations
- [ ] **CTA Section Backgrounds** - 2 images (calls to action)

### Category D: Responsive Variants
- [ ] **Mobile Hero** - 1080x1920 (vertical orientation)
- [ ] **Tablet Hero** - 2048x1536 (iPad landscape)
- [ ] **Wide Desktop** - 3840x2160 (4K ultra-wide)

**TOTAL ASSET COUNT: ~40-50 unique images with variants**

---

## 3. STAGE 1: GENERATE BASE ASSETS (No Upscaling Yet)

### 3.1 Best Practices for AI Image Generation

**Use Higgsfield `generate_image` with these guidelines:**

1. **Model Selection**: Use `marketing_studio_image` (default for commercial/product assets)
2. **Aspect Ratios**: Start with 16:9 (landscape) for flexibility
3. **Batch Efficiency**: Generate 3-4 variations per prompt (count: 3-4)
4. **Prompt Engineering**: Reference brand guidelines + design direction

### 3.2 Example Prompt Structure

```
[BRAND CONTEXT] + [SCENE DESCRIPTION] + [STYLE DIRECTION] + [TECHNICAL SPECS]

Example:
"Premium digital marketing agency aesthetic. 
Minimalist hero composition: tech-forward professional team 
reviewing analytics dashboards in modern office.
Style: clean, aspirational, Linear-inspired minimalism. 
Color palette: dark blue (#0052CC), white, accent cyan. 
Lighting: natural north-facing window light, slightly moody.
Medium: professional photography + subtle CGI blend.
No people faces visible (abstract shot from behind), 
no text overlays, no logos, 16:9 aspect ratio."
```

### 3.3 Generation Batch Plan

**Batch 1: Hero Concepts** (Day 1)
- Main hero (4 variations)
- Service category hero (3 variations)
- **Total: 7 images to generate**

**Batch 2: Feature & Process** (Day 2)
- Feature illustrations (6 variations)
- Process visuals (5 variations)
- **Total: 11 images to generate**

**Batch 3: Secondary Assets** (Day 3)
- Case study backgrounds (4 variations)
- Social backgrounds (3 variations)
- CTA visuals (2 variations)
- **Total: 9 images to generate**

**Total Generation Time: 3 days for ~27 base images**

---

## 4. STAGE 2: ENHANCE WITH MAGNIFIC (Critical Step)

### 4.1 Why Magnific Over Other Upscalers

| Feature | Magnific 2x/4x | Standard Upscaling |
|---------|---|---|
| **Detail Enhancement** | ✓ Adds realistic detail | ✗ Just scales |
| **Quality Preservation** | ✓ Maintains consistency | ✗ Can degrade |
| **Brand Asset Suitable** | ✓ Professional quality | ✗ Synthetic-looking |
| **Performance** | Fast (minutes) | Fast |
| **Cost Efficiency** | Moderate | Low |

### 4.2 Magnific Upscale Strategy

**Scale Selection: 2x vs 4x**
- **2x (Recommended for web)**: 1920x1080 → 3840x2160 (4K)
  - Optimal for web performance + retina displays
  - Excellent detail without excessive file size
  - Use this for primary web assets
  
- **4x (For print/archival)**: 1920x1080 → 7680x4320 (8K)
  - Only if assets needed for print/large format
  - File sizes become large (20-50MB each)
  - Skip for web-first strategy

**Recommended Workflow:**
1. Generate base at 1920x1080 (or lower)
2. Upscale ALL to 2x (4K)
3. Use 2x versions for web
4. Archive 4x only for premium print use cases

### 4.3 Magnific Tool Usage

```python
# Using Higgsfield images_upscale
images_upscale(
    creationIdentifier="[image_id_from_generation]",
    scale="2x"  # Use 2x for web, 4x for print
)

# Batch upscale multiple images in parallel
# Process all generated images → Magnific 2x
# Total time: ~5-10 minutes for 27 images (parallel processing)
```

### 4.4 Quality Check Post-Upscale

After Magnific enhancement, evaluate:
- ✓ Detail clarity (no artifacts)
- ✓ Color accuracy (vs original)
- ✓ Brand consistency (still recognizable)
- ✓ File size acceptable (<5MB per image for web)

**Reject if:**
- ✗ Artificial noise/over-processed look
- ✗ Color shift away from brand palette
- ✗ Loss of visual coherence

---

## 5. STAGE 2B: OUTPAINT FOR RESPONSIVE DESIGN

### 5.1 Why Outpainting Matters

**Problem**: Single aspect ratio = cropped/stretched on different devices
**Solution**: Use `outpaint_image` to extend hero backgrounds

### 5.2 Outpaint Strategy for MediaBubble

After Magnific upscale, extend each hero image to 3 aspect ratios:

```
Base (16:9)     →  Mobile (9:16)      →  Ultra-wide (21:9)
3840x2160         1620x2880             4320x1920
(Desktop)         (Mobile Portrait)     (Ultra-wide Desktop)
```

### 5.3 Outpaint Batch Plan

```python
# For each upscaled hero image (7 total):
outpaint_image(
    image_id="[upscaled_image_id]",
    aspect_ratio="9:16"   # First: Mobile
)
# Then:
outpaint_image(
    image_id="[upscaled_image_id]",
    aspect_ratio="21:9"   # Second: Ultra-wide
)

# Total new assets: 7 base × 3 aspect ratios = 21 hero variations
```

**Outpaint Processing Time**: ~2-3 minutes per image = 15-20 minutes total for all hero variants

---

## 6. STAGE 3: DESIGN FRONTEND WITH taste-skill

### 6.1 Design Read (Before Any Code)

**Reading as:** Premium B2B digital marketing agency landing page, 
for C-level decision makers and marketing directors, 
with clean minimalist language, leaning toward Linear-style + Geist design system.

### 6.2 taste-skill Configuration

Set the three dials:
```yaml
DESIGN_VARIANCE: 7      # Premium consumer/brand standard
MOTION_INTENSITY: 6     # Smooth, not overwhelming
VISUAL_DENSITY: 4       # Breathing room, not packed
```

### 6.3 Integration with Upscaled Assets

**Key Principle**: taste-skill designs AROUND the assets, not against them.

```html
<!-- Hero Section Using Upscaled + Outpainted Image -->
<section class="hero">
  <!-- Mobile: Use 9:16 outpainted variant -->
  <picture>
    <source media="(max-width: 768px)" 
            srcset="/assets/hero-mobile-9-16.webp">
    <!-- Tablet: Use 16:9 base -->
    <source media="(max-width: 1024px)" 
            srcset="/assets/hero-tablet-16-9.webp">
    <!-- Desktop: Use 21:9 ultra-wide -->
    <source media="(min-width: 1025px)" 
            srcset="/assets/hero-desktop-21-9.webp">
    <img src="/assets/hero-base.webp" alt="MediaBubble hero">
  </picture>
</section>
```

### 6.4 Asset Integration Checklist

- ✓ All hero images use upscaled 2x/4x versions
- ✓ Responsive picture elements match outpainted aspect ratios
- ✓ Feature card images use 2x upscale (sharp on retina)
- ✓ Case study images maintain 2x quality + outpainted for gallery layouts
- ✓ Social assets optimized for each platform's preferred ratio

---

## 7. STAGE 3B: ENHANCE WITH emil-design-eng

### 7.1 Animation Opportunities

After taste-skill HTML/CSS is in place:

1. **Hero Image Entrance**: Subtle ken-burns zoom + fade
2. **Feature Cards**: Stagger animation on scroll reveal
3. **Testimonial Backgrounds**: Slow parallax on scroll
4. **CTA Section**: Entrance animation with delay

### 7.2 Performance Considerations

- Use will-change sparingly (only on hero + fold)
- Prefer `transform` + `opacity` over `width`/`height`
- Lazy-load below-fold images
- Implement intersection observer for scroll animations

### 7.3 Integration Pattern

```javascript
// Scroll-reveal for feature cards (from emil-design-eng playbook)
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
  observer.observe(card);
});
```

---

## 8. STAGE 4: VALIDATE & ITERATE

### 8.1 Brand Guidelines Validation

Compare final site against Brand Guidelines v2.0:

| Element | Check | Status |
|---------|-------|--------|
| **Color Palette** | Hero BG matches primary blue, accents correct | ✓ |
| **Typography** | Headlines use brand font stack | ✓ |
| **Spacing** | 8px grid system consistent | ✓ |
| **Asset Quality** | All images 2x upscale minimum | ✓ |
| **Motion** | No jank, <60fps animations | ✓ |
| **Accessibility** | Image alt text, color contrast | ✓ |

### 8.2 Performance Metrics

**Target Benchmarks:**
- [ ] LCP (Largest Contentful Paint): <2.5s
- [ ] CLS (Cumulative Layout Shift): <0.1
- [ ] FID (First Input Delay): <100ms
- [ ] Image file sizes: <500KB per asset (2x upscale + webp)

---

## 9. FULL WORKFLOW SUMMARY

```
Day 1: Generate Base Assets
├─ Generate Batch 1 (7 images) → 20 minutes
├─ Generate Batch 2 (11 images) → 30 minutes  
├─ Generate Batch 3 (9 images) → 25 minutes
└─ Total: ~75 minutes for 27 base images

Day 2: Magnific Enhancement
├─ Upscale all 27 images to 2x → 10 minutes
├─ Quality review & reject bad outputs → 15 minutes
├─ Outpaint 7 hero images to 3 aspect ratios → 20 minutes
└─ Total: ~45 minutes for 21 upscaled images + 21 outpainted

Day 3: Design & Animate
├─ Design frontend with taste-skill → 2-3 hours
│  ├─ Homepage layout
│  ├─ Service pages (3)
│  └─ Case study templates (2)
├─ Add animations with emil-design-eng → 1-2 hours
└─ Total: ~4 hours for full frontend

Day 4: Validation & Refinement
├─ Brand consistency check → 30 minutes
├─ Performance optimization → 30 minutes
├─ Asset updates/regeneration if needed → 30-60 minutes
└─ Total: ~2 hours

TOTAL TIMELINE: 4 days (with parallel processing)
```

---

## 10. TROUBLESHOOTING & BEST PRACTICES

### 10.1 If Magnific Output Looks Over-Processed

**Problem**: Upscaled images have visible artifacts, noise, or artificial sharpening
**Solution**:
1. Try different source image (regenerate base at higher resolution first)
2. Use 2x instead of 4x (less aggressive upscaling)
3. Test outpainting instead to extend boundaries

### 10.2 If Outpaint Looks Inconsistent

**Problem**: Extended background doesn't match original aesthetic
**Solution**:
1. Add reference context to outpaint (describe the original lighting/mood)
2. Only outpaint by max 25% per side (avoid too much extension)
3. Consider manual touch-up in Figma/Photoshop if critical

### 10.3 If taste-skill Layout Feels Generic

**Problem**: Design looks templated despite good assets
**Solution**:
1. Increase DESIGN_VARIANCE dial (try 8-9)
2. Add custom CSS animations beyond defaults
3. Use asymmetric layouts for feature sections
4. Break grid intentionally in 1-2 hero areas

### 10.4 If Emil Animations Cause Jank

**Problem**: Scroll animations stutter, fps drops below 60
**Solution**:
1. Remove will-change declarations (use only on hero)
2. Reduce animation count in fold (above-viewport)
3. Use requestAnimationFrame throttling
4. Profile with Chrome DevTools (Performance tab)

---

## 11. DELIVERABLES CHECKLIST

### Assets
- [ ] 27 base images (generated)
- [ ] 27 upscaled 2x images (Magnific)
- [ ] 14 outpainted 9:16 mobile variants
- [ ] 14 outpainted 21:9 ultra-wide variants
- [ ] **Total**: 82 optimized web-ready images

### Frontend
- [ ] Homepage (responsive, animated)
- [ ] 3 Service landing pages
- [ ] 2 Case study templates
- [ ] 1 Blog/Resources page
- [ ] Reusable component library (cards, buttons, hero template)

### Documentation
- [ ] Updated Brand Guidelines v2.0 (with new asset examples)
- [ ] Asset registry (which image used where)
- [ ] Animation playbook (patterns used in site)
- [ ] Performance report (LCP, CLS, file sizes)

---

## 12. NEXT STEPS

1. **Start**: Review existing MediaBubble assets and finalize Brand Guidelines v2.0
2. **Generate**: Create first batch of base images (7 hero concepts)
3. **Enhance**: Upscale with Magnific 2x
4. **Design**: Build homepage using taste-skill + upscaled assets
5. **Animate**: Add emil-design-eng interactions
6. **Iterate**: Refine based on brand validation

---

**Ready to execute?** Start with Task #1: Audit brand assets.
