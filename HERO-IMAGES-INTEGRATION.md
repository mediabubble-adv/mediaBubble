# Hero Images Integration Strategy
## MediaBubble Web-EG (Egypt) Marketing Site

**Last Updated:** 2026-06-27  
**Status:** Strategic Plan  
**Images Location:** `/apps/web-eg/public/assets/hero/`

---

## 📊 Available Hero Images

### Image Inventory (23 images)

**High-Resolution PNG Assets (Professional Quality)**
- `hf_20260627_102125_355b0634-3bfa-4c0d-a7c3-37b2ebbaec63.png` (1.9 MB)
- `hf_20260627_102125_46aecb59-1dba-4f04-a56e-fcb5370baa60.png` (2.3 MB)
- `hf_20260627_102722_5b8fea10-2190-4e9d-aa90-da45501dd11f.png` (1.9 MB)
- `hf_20260627_104137_4a07a87d-6abe-4c98-b5b8-7b406b01c488.png` (2.2 MB)
- `Generated image 1 (4).png` (2.1 MB)
- `Generated image 1 (5).png` (2.1 MB)

**Magnific AI Enhanced Images (JPG Format)**
- `magnific_creation-1_cD6W1ef0eP.jpg` (117 KB)
- `magnific_creation-2_5xhbnL0Kxe.jpg` (127 KB)
- `magnific_creation-5_hEMm4QSvqL.jpg` (117 KB)
- `magnific_i-want-make-photos-all-im_62gNqomiJO.jpg` (677 KB)
- `magnific_i-want-make-photos-all-im_NZl9HRN6D9.jpg` (545 KB)
- `magnific_i-want-make-photos-all-im_PijyE7X42C.jpg` (467 KB)
- `magnific_i-want-make-photos-all-im_cD6WlRn0eP.jpg` (679 KB)
- `magnific_i-want-make-photos-all-im_jSuxBOCLD0.jpg` (500 KB)
- `magnific_use-img1-as-the-source-im_WMNY4AwcXe.jpg` (582 KB)
- `magnific_use-img1-as-the-source-im_swFLuHKl8e.jpg` (900 KB)

**Render Assets (JPG Format)**
- `render.jpg` (710 KB)
- `render (1).jpg` (710 KB)
- `render (2).jpg` (678 KB)
- `render (3).jpg` (610 KB)
- `render (4).jpg` (821 KB)

---

## 🎯 Pages & Hero Integration Map

### **1. Homepage** (`/`)
**Current Config:**
```typescript
image: "/assets/home/hero-main.webp"
layout: "image-right"
size: "full"
```

**Recommendation:** Use premium Magnific enhanced images  
**Suggested Image:** `magnific_use-img1-as-the-source-im_swFLuHKl8e.jpg`  
**Rationale:** High-quality, polished visual that conveys premium agency positioning

**Path Update:**
```typescript
image: "/assets/hero/magnific_use-img1-as-the-source-im_swFLuHKl8e.jpg"
```

---

### **2. About Page** (`/about`)
**Current Config:** Likely using default or placeholder  
**Hero Size:** `medium` (50vh)

**Suggested Image:** `hf_20260627_102125_46aecb59-1dba-4f04-a56e-fcb5370baa60.png`  
**Rationale:** Professional, credible look for company story

**New Config:**
```typescript
image: "/assets/hero/hf_20260627_102125_46aecb59-1dba-4f04-a56e-fcb5370baa60.png"
layout: "image-left"
size: "medium"
```

---

### **3. Services Pages** (`/services`, `/services/[slug]`)

#### Main Services Landing (`/services`)
**Suggested Image:** `magnific_creation-2_5xhbnL0Kxe.jpg`  
**Size:** `medium`  
**Layout:** `image-right`

#### Individual Service Pages (`/services/seo`, `/services/ppc`, etc.)
Use **ServiceHeroSection** component with strategic image rotation:

- **SEO Service:** `render.jpg` (technical, data-driven appearance)
- **PPC Service:** `render (1).jpg` (modern, dynamic)
- **Social Media Service:** `render (2).jpg` (creative, engaging)
- **Branding:** `magnific_creation-1_cD6W1ef0eP.jpg` (elegant, professional)
- **Web Development:** `render (4).jpg` (technical excellence)

---

### **4. Case Studies** (`/case-studies`, `/case-studies/[slug]`)

#### Case Studies Grid Page
**Suggested Image:** `magnific_i-want-make-photos-all-im_swFLuHKl8e.jpg`  
**Size:** `medium`  
**Layout:** `image-right`

#### Individual Case Study Pages
**Use:** `CaseStudyHero` component  
**Images:** Rotate through the magnific collection (high-quality showcase)

---

### **5. Insights/Blog** (`/insights`, `/insights/[slug]`)

#### Insights Landing
**Suggested Image:** `hf_20260627_102722_5b8fea10-2190-4e9d-aa90-da45501dd11f.png`  
**Size:** `small` (45vh)  
**Layout:** `image-right`

#### Individual Blog Posts
**Use:** Default/minimal hero or metadata image from article data

---

### **6. Contact Page** (`/contact`)
**Suggested Image:** `magnific_i-want-make-photos-all-im_62gNqomiJO.jpg`  
**Size:** `compact` (40vh)  
**Layout:** `default` (minimal imagery)

---

### **7. Legal Pages** (`/privacy`, `/terms`, `/cookies`)
**Configuration:** No image required (use standard legal layout)

---

## 📋 Implementation Checklist

### Phase 1: Preparation
- [ ] Organize hero images with semantic naming (optional but recommended)
- [ ] Create image optimization task (WebP conversion for faster load)
- [ ] Document fallback images for each page

### Phase 2: Homepage
- [ ] Update `/app/content.tsx` with hero image path
- [ ] Test rendering on desktop/mobile/tablet
- [ ] Verify fallback behavior

### Phase 3: About Page
- [ ] Create or update `/app/about/page.tsx` content file
- [ ] Integrate HeroSection with selected image
- [ ] Test page rendering

### Phase 4: Services Pages
- [ ] Update main `/app/services/page.tsx`
- [ ] Update each service landing (`/services/[slug]/content.tsx`)
- [ ] Apply image rotation strategy
- [ ] Test all service pages

### Phase 5: Case Studies & Insights
- [ ] Update case studies pages
- [ ] Update insights/blog pages
- [ ] Implement image fallback strategy

### Phase 6: Contact & Legal
- [ ] Update contact page
- [ ] Verify legal pages don't need hero changes
- [ ] Final QA across all pages

### Phase 7: Optimization & Testing
- [ ] Performance testing (Lighthouse)
- [ ] Image loading optimization
- [ ] Cross-browser testing
- [ ] Mobile responsiveness validation

---

## 🎨 Design Principles for Image Selection

1. **Brand Consistency**: All images should align with MediaBubble's professional, modern aesthetic
2. **Color Harmony**: Ensure hero images complement the navy/blue color scheme
3. **Aspect Ratios**: Use 4/5 ratio for portrait-oriented images (BlobMask requirement)
4. **Loading Speed**: Prioritize optimized formats (WebP preferred, JPG fallback)
5. **Accessibility**: Ensure sufficient contrast for text overlay

---

## 📦 Recommended Optimizations

### Image Organization
```
/apps/web-eg/public/assets/hero/
├── premium/          (High-quality showcase)
├── professional/     (Brand, about, services)
├── modern/          (Render-based technical)
└── social/          (Social media focused)
```

### Performance Improvements
1. Convert PNG → WebP with PNG fallback
2. Implement responsive image sizes (srcset)
3. Add lazy loading where appropriate
4. Use Next.js Image optimization

---

## 🔄 Next Steps

**Immediate Actions:**
1. Decide on image naming/organization strategy
2. Choose which images for each page
3. Prepare migration timeline

**Ready to execute on:**
- Homepage integration
- Services page updates
- Full site rollout

---

**Note:** This plan is flexible. We can prioritize high-traffic pages first and roll out progressively.
