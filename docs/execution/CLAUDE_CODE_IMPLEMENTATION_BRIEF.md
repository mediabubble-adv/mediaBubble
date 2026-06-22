# MediaBubble Website Improvement - Claude Code Implementation Brief

**Date:** June 12, 2026  
**Status:** Ready for Implementation  
**Priority:** High  
**Estimated Effort:** 40-60 development hours

---

## Executive Summary for Claude Code

This document provides structured, implementation-ready specifications for MediaBubble's website improvements. Claude Code should use this as the primary reference for all development tasks.

**Key Deliverables:**

1. Header scroll behavior (hide-on-scroll, white background)
2. Hero section responsive sizing
3. Brand consistency audit automation
4. Image optimization pipeline
5. Marketing copy improvements

---

## PART 1: HEADER SCROLL BEHAVIOR IMPLEMENTATION

### Specification

**Requirement:** Implement sticky header that:

- Remains transparent/hidden while hero section is visible
- Slides into view with white background on scroll past hero
- Changes text color from white (hero state) to dark (#1a1a1a) on scroll
- Works on both EG and AE website instances
- Smooth 0.3s animation (cubic-bezier(0.25, 0.46, 0.45, 0.94))

### Technical Details

**Technology Stack:**

- Framework: WordPress with Elementor (current)
- Alternative: React (if rebuilding)
- Browser Support: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Mobile: iOS 14+, Android Chrome latest

**File Structure (WordPress):**

```
/wp-content/themes/[child-theme]/
├── js/
│   └── header-scroll.js (new)
├── css/
│   └── header-scroll.css (new)
└── functions.php (update)
```

**File Structure (React):**

```
/src/
├── components/
│   └── Header/
│       ├── Header.jsx (update)
│       ├── Header.module.css (new)
│       └── useHeaderScroll.js (new hook)
└── App.jsx (verify hero structure)
```

### Implementation Tasks for Claude Code

#### Task 1.1: Create CSS Styles

**File:** `header-scroll.css`

```css
/* Hero State (Transparent) */
header.hero-transparent {
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: none;
  box-shadow: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

header.hero-transparent .logo,
header.hero-transparent .logo-text,
header.hero-transparent .logo-icon {
  color: white;
  filter: brightness(1.1);
}

header.hero-transparent .nav a,
header.hero-transparent .nav-link,
header.hero-transparent .menu-link {
  color: white;
  opacity: 0.95;
}

header.hero-transparent .menu-toggle,
header.hero-transparent .hamburger {
  color: white;
}

/* Scrolled State (White Background) */
header.scrolled {
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  animation: slideDown 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

header.scrolled .logo,
header.scrolled .logo-text,
header.scrolled .logo-icon {
  color: #1a1a1a;
}

header.scrolled .nav a,
header.scrolled .nav-link,
header.scrolled .menu-link {
  color: #1a1a1a;
  opacity: 1;
}

header.scrolled .menu-toggle,
header.scrolled .hamburger {
  color: #1a1a1a;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

header .logo,
header .logo-text {
  transition: color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

header .nav a,
header .nav-link {
  transition: color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@media (max-width: 768px) {
  header.scrolled {
    position: fixed;
    width: 100%;
  }

  header.hero-transparent {
    position: absolute;
  }
}
```

#### Task 1.2: Create JavaScript Logic

**File:** `header-scroll.js` (Vanilla JS - Framework Agnostic)

```javascript
// Header Scroll Behavior Module
// Usage: Include in main.js or enqueue in WordPress

(function () {
  "use strict";

  const header = document.querySelector("header");
  const hero = document.querySelector('.hero-section, [class*="hero"]');

  if (!header) {
    console.warn("Header element not found");
    return;
  }

  // Configuration
  const config = {
    offset: 100, // pixels before hero ends
    scrollEventOptions: { passive: true },
    debugMode: false, // set to true for console logs
  };

  // State
  let scrollThreshold = 0;
  let isScrolled = false;

  // Get hero height
  function getHeroHeight() {
    if (hero) {
      return hero.offsetHeight;
    }
    return window.innerHeight;
  }

  // Update threshold
  function updateThreshold() {
    scrollThreshold = getHeroHeight() - config.offset;
    if (config.debugMode) {
      console.log("Header Scroll Threshold:", scrollThreshold);
    }
  }

  // Set initial state
  function setInitialState() {
    const scrollTop = window.scrollY;
    const shouldBeScrolled = scrollTop >= scrollThreshold;

    if (config.debugMode) {
      console.log(
        "Initial state - scrollTop:",
        scrollTop,
        "threshold:",
        scrollThreshold,
      );
    }

    updateHeaderState(shouldBeScrolled);
  }

  // Update header classes
  function updateHeaderState(shouldBeScrolled) {
    if (shouldBeScrolled === isScrolled) return; // No change needed

    if (shouldBeScrolled) {
      header.classList.remove("hero-transparent");
      header.classList.add("scrolled");
      isScrolled = true;
    } else {
      header.classList.remove("scrolled");
      header.classList.add("hero-transparent");
      isScrolled = false;
    }

    if (config.debugMode) {
      console.log(
        "Header state changed:",
        isScrolled ? "scrolled" : "transparent",
      );
    }
  }

  // Handle scroll event
  function handleScroll() {
    const scrollTop = window.scrollY;
    const shouldBeScrolled = scrollTop >= scrollThreshold;
    updateHeaderState(shouldBeScrolled);
  }

  // Handle resize event
  function handleResize() {
    updateThreshold();
    setInitialState();
  }

  // Initialize
  function init() {
    updateThreshold();
    setInitialState();

    window.addEventListener("scroll", handleScroll, config.scrollEventOptions);
    window.addEventListener("resize", handleResize);

    // Cleanup on page unload
    window.addEventListener("unload", cleanup);

    if (config.debugMode) {
      console.log("Header scroll behavior initialized");
    }
  }

  // Cleanup
  function cleanup() {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
  }

  // Start when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Export for debugging/testing
  window.headerScroll = {
    init,
    cleanup,
    config,
    updateThreshold,
    setInitialState,
  };
})();
```

#### Task 1.3: WordPress Integration

**File:** `functions.php` (add to child theme)

```php
<?php
// Enqueue header scroll styles and scripts
function mediabubble_enqueue_header_scroll() {
  // CSS
  wp_enqueue_style(
    'header-scroll-styles',
    get_stylesheet_directory_uri() . '/css/header-scroll.css',
    array(),
    filemtime(get_stylesheet_directory() . '/css/header-scroll.css'),
    'all'
  );

  // JavaScript
  wp_enqueue_script(
    'header-scroll-script',
    get_stylesheet_directory_uri() . '/js/header-scroll.js',
    array(),
    filemtime(get_stylesheet_directory() . '/js/header-scroll.js'),
    true // Load in footer
  );
}
add_action('wp_enqueue_scripts', 'mediabubble_enqueue_header_scroll');

// Add body class for targeting
function mediabubble_add_header_scroll_class($classes) {
  $classes[] = 'has-header-scroll-behavior';
  return $classes;
}
add_filter('body_class', 'mediabubble_add_header_scroll_class');
?>
```

#### Task 1.4: Testing Requirements

**Test Cases:**

```
1. Initial Load
   ✓ Header has hero-transparent class
   ✓ Header text is white
   ✓ Logo is visible on hero background

2. Scroll Down
   ✓ Header slides into view
   ✓ Background becomes white
   ✓ Text/logo color changes to dark
   ✓ Animation smooth (0.3s)

3. Scroll Back Up
   ✓ Header reverts to transparent
   ✓ Text/logo color changes to white
   ✓ Animation smooth

4. Edge Cases
   ✓ Very fast scroll (momentum)
   ✓ Page with no hero
   ✓ Resize window (recalculate threshold)
   ✓ z-index doesn't conflict with other elements

5. Mobile (iOS & Android)
   ✓ Works on mobile devices
   ✓ Doesn't flicker on scroll
   ✓ Touch interactions smooth
```

---

## PART 2: HERO SECTION SIZING IMPLEMENTATION

### Specification

**Requirement:** Implement responsive hero heights per page template:

- Homepage: 100vh (full viewport)
- Service Pages: 55vh (medium)
- Blog/News: 45vh (smaller)
- About/Portfolio: 50vh (medium)
- Contact: 40vh (minimal)
- Mobile: Adjust all down by ~10% for header height

### Technical Implementation

**Approach:** CSS Grid/Flexbox with template-specific selectors

```css
/* Add to stylesheet - Media Bubble specific */

/* Homepage - Full Height */
body.page-home .hero-section,
body.home .hero-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Service Pages - Medium Height */
body.page-service .hero-section,
body.taxonomy-service-category .hero-section {
  height: 55vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* About Page */
body.page-about .hero-section {
  height: 50vh;
}

/* Blog/News Pages */
body.page-blog .hero-section,
body.single-post .hero-section {
  height: 45vh;
}

/* Portfolio/Case Studies */
body.page-portfolio .hero-section,
body.single-portfolio .hero-section {
  height: 50vh;
}

/* Contact/Quote Pages */
body.page-contact .hero-section,
body.page-quote .hero-section {
  height: 40vh;
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  body.page-home .hero-section {
    height: calc(100vh - 60px); /* Account for header */
  }

  body.page-service .hero-section,
  body.page-about .hero-section {
    height: 50vh;
  }

  body.page-blog .hero-section {
    height: 40vh;
  }

  body.page-contact .hero-section {
    height: 35vh;
  }
}

/* Tablet Adjustments */
@media (max-width: 1024px) and (min-width: 768px) {
  body.page-service .hero-section {
    height: 50vh;
  }
}
```

### Implementation Tasks for Claude Code

#### Task 2.1: Add Page Template Classes

**WordPress:** Update page templates or use WordPress body_class filter

```php
<?php
// Add to functions.php
function mediabubble_add_page_template_classes($classes) {
  // Homepage
  if (is_home() || is_front_page()) {
    $classes[] = 'page-home';
  }

  // Service Pages
  if (function_exists('is_product_category') && is_product_category()) {
    $classes[] = 'page-service';
  } elseif (is_singular('service')) {
    $classes[] = 'page-service';
  }

  // Blog
  if (is_home() || is_single()) {
    $classes[] = 'page-blog';
  }

  // About
  if (is_page('about') || is_page('about-us')) {
    $classes[] = 'page-about';
  }

  // Portfolio
  if (is_singular('portfolio') || is_page('portfolio')) {
    $classes[] = 'page-portfolio';
  }

  // Contact
  if (is_page('contact') || is_page('quote') || is_page('request-quotation')) {
    $classes[] = 'page-contact';
  }

  return $classes;
}
add_filter('body_class', 'mediabubble_add_page_template_classes');
?>
```

#### Task 2.2: Create Hero Sizing CSS

**File:** `hero-sizing.css`

Use the CSS provided in specification above.

#### Task 2.3: Test All Pages

**Pages to Test:**

- [ ] Home
- [ ] SEO Services
- [ ] PPC Services
- [ ] Social Media Services
- [ ] Web Development Services
- [ ] Branding Services
- [ ] About Us
- [ ] Blog Index
- [ ] Individual Blog Post
- [ ] Portfolio
- [ ] Case Study
- [ ] Contact
- [ ] Quote Request

---

## PART 3: IMAGE OPTIMIZATION PIPELINE

### Specification

**Requirement:** Create scalable image optimization workflow

### Implementation Tasks for Claude Code

#### Task 3.1: Image Audit Script

**Create:** `scripts/image-audit.js`

```javascript
// Image Audit Script
// Identifies images needing optimization/replacement

async function auditImages() {
  const images = document.querySelectorAll("img");
  const audit = {
    total: images.length,
    optimized: 0,
    unoptimized: 0,
    missing_alt: 0,
    issues: [],
  };

  images.forEach((img, index) => {
    const issues = [];

    // Check file size (fetch headers)
    fetch(img.src, { method: "HEAD" }).then((response) => {
      const size = response.headers.get("content-length");
      if (size > 250000) {
        // > 250KB
        issues.push(`Large file: ${(size / 1024).toFixed(0)}KB`);
      }
    });

    // Check alt text
    if (!img.alt || img.alt.trim() === "") {
      audit.missing_alt++;
      issues.push("Missing alt text");
    }

    // Check dimensions
    if (img.width < 400 && !img.classList.contains("icon")) {
      issues.push(`Low resolution: ${img.width}x${img.height}`);
    }

    // Check lazy loading
    if (!img.loading) {
      issues.push("No lazy loading attribute");
    }

    if (issues.length === 0) {
      audit.optimized++;
    } else {
      audit.unoptimized++;
      audit.issues.push({
        src: img.src,
        alt: img.alt,
        issues,
      });
    }
  });

  console.table(audit);
  return audit;
}

// Run on page load
window.addEventListener("load", auditImages);
```

#### Task 3.2: Image Optimization Guidelines

**File:** `IMAGE_OPTIMIZATION_STANDARDS.md`

```markdown
# Image Optimization Standards for MediaBubble

## File Size Requirements

- Maximum 250KB per image
- Recommended: 100-150KB for quality
- Use optimized formats (WebP with JPEG fallback)

## Dimensions

- Hero images: 1920x1080 (16:9)
- Service images: 1200x800 (3:2)
- Portfolio images: 1200x900 (4:3)
- Blog featured: 1200x630 (16:9)
- Thumbnails: 400x300 minimum

## Optimization Tools

- ImageOptim (Mac)
- FileOptimizer (Windows)
- TinyPNG/TinyJPG (online)
- Figma export (design files)

## Technical Specs

- Resolution: 72 DPI (web)
- Format: JPEG for photos, PNG for graphics
- WebP: For modern browsers with fallback
- Lazy loading: `loading="lazy"` attribute

## Alt Text Standards

Format: "[What image shows] - [Context if relevant]"
Examples:

- "MediaBubble team collaborating on marketing strategy"
- "Website analytics dashboard showing traffic growth"
- "Before and after website redesign comparison"
```

---

## PART 4: BRAND CONSISTENCY AUDIT AUTOMATION

### Specification

**Requirement:** Create automated script to audit brand consistency

### Implementation Tasks for Claude Code

#### Task 4.1: Brand Audit Checker

**File:** `scripts/brand-audit.js`

```javascript
// Brand Consistency Audit Script

const brandStandards = {
  colors: {
    primary: "#FFC107", // Brand yellow
    secondary: "#2196F3", // Brand blue
    dark: "#0D3A7D", // Dark blue
    darkGray: "#1a1a1a",
    lightGray: "#F5F5F5",
  },
  typography: {
    headings: ["Montserrat", "Poppins", "sans-serif"],
    body: ["Inter", "Segoe UI", "sans-serif"],
  },
  spacing: {
    unit: 8, // pixels
    minSection: 60, // 60px = 8 * 7.5
  },
};

function auditBrandConsistency() {
  const audit = {
    colors: auditColors(),
    typography: auditTypography(),
    spacing: auditSpacing(),
    elements: auditElements(),
    timestamp: new Date().toISOString(),
  };

  console.log("Brand Audit Results:", audit);
  return audit;
}

function auditColors() {
  const results = {
    passes: 0,
    failures: 0,
    details: [],
  };

  // Check CTA buttons
  const ctaButtons = document.querySelectorAll(
    '[class*="cta"], [class*="button-primary"]',
  );
  ctaButtons.forEach((btn) => {
    const bgColor = window.getComputedStyle(btn).backgroundColor;
    if (!isColorMatch(bgColor, brandStandards.colors.primary)) {
      results.failures++;
      results.details.push({
        element: btn,
        issue: "CTA button not using brand yellow",
        actual: bgColor,
        expected: brandStandards.colors.primary,
      });
    } else {
      results.passes++;
    }
  });

  return results;
}

function auditTypography() {
  const results = {
    passes: 0,
    failures: 0,
    details: [],
  };

  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  headings.forEach((heading) => {
    const fontFamily = window.getComputedStyle(heading).fontFamily;
    const isCorrect = brandStandards.typography.headings.some((font) =>
      fontFamily.includes(font),
    );

    if (!isCorrect) {
      results.failures++;
      results.details.push({
        element: heading,
        issue: `Heading using wrong font: ${fontFamily}`,
        expected: brandStandards.typography.headings,
      });
    } else {
      results.passes++;
    }
  });

  return results;
}

function auditSpacing() {
  // Check section margins/padding
  const results = {
    passes: 0,
    failures: 0,
    details: [],
  };

  const sections = document.querySelectorAll(
    'section, .section, [class*="block"]',
  );
  sections.forEach((section) => {
    const padding = window.getComputedStyle(section).padding;
    const paddingValue = parseInt(padding);

    if (paddingValue % brandStandards.spacing.unit !== 0) {
      results.failures++;
      results.details.push({
        element: section,
        issue: `Spacing not multiple of 8px`,
        actual: paddingValue,
        expected: "Multiple of 8px",
      });
    } else {
      results.passes++;
    }
  });

  return results;
}

function auditElements() {
  const results = {
    logoCount: document.querySelectorAll('[class*="logo"]').length,
    navPresent: !!document.querySelector("nav"),
    footerPresent: !!document.querySelector("footer"),
    altTextMissing: document.querySelectorAll("img:not([alt])").length,
    metaDescriptionPresent: !!document.querySelector(
      'meta[name="description"]',
    ),
  };

  return results;
}

function isColorMatch(color1, color2) {
  // Convert to RGB and compare (simplified)
  return color1.replace(/\s/g, "") === color2.replace(/\s/g, "");
}

// Export for use
window.brandAudit = {
  audit: auditBrandConsistency,
  standards: brandStandards,
};

// Run on demand
auditBrandConsistency();
```

---

## PART 5: MARKETING COPY IMPROVEMENTS

### Specification

**Tasks for Claude Code:**

#### Task 5.1: Copy Audit Script

Identify pages needing copy updates:

```javascript
// Copy Audit - finds pages with generic/weak messaging

const copyIssues = {
  genericHeadings: [
    "Welcome to our website",
    "Our Services",
    "Learn More",
    "Professional Services",
  ],
  weakCTAs: [
    "Submit",
    "Click here",
    "More info",
    "Contact us", // Generic
  ],
};

function auditCopy() {
  const audit = {
    genericHeadings: [],
    weakCTAs: [],
    missingAltText: [],
    shortMetaDescriptions: [],
    longMetaDescriptions: [],
  };

  // Check headings
  document.querySelectorAll("h1, h2, h3").forEach((h) => {
    if (copyIssues.genericHeadings.some((g) => h.textContent.includes(g))) {
      audit.genericHeadings.push({
        current: h.textContent,
        element: h,
      });
    }
  });

  // Check CTAs
  document
    .querySelectorAll('button, [role="button"], a[class*="cta"]')
    .forEach((cta) => {
      if (copyIssues.weakCTAs.some((w) => cta.textContent.includes(w))) {
        audit.weakCTAs.push({
          current: cta.textContent,
          element: cta,
        });
      }
    });

  // Check meta descriptions
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    const length = metaDesc.getAttribute("content").length;
    if (length < 120) {
      audit.shortMetaDescriptions.push(metaDesc);
    }
    if (length > 160) {
      audit.longMetaDescriptions.push(metaDesc);
    }
  }

  console.table(audit);
  return audit;
}

window.copyAudit = auditCopy;
```

#### Task 5.2: Copy Recommendations

**Document:** `COPY_IMPROVEMENTS.md`

```markdown
# Copy Improvement Recommendations

## Homepage

**Current Headline Problem:** Generic, doesn't differentiate
**Recommendation:** "Results-Driven Marketing for MENA Businesses"
**Subheading:** "From strategy to execution, we help brands grow"

## CTA Improvements

| Current      | Recommended                    | Why               |
| ------------ | ------------------------------ | ----------------- |
| "Learn More" | "View Case Study"              | Specific action   |
| "Submit"     | "Get Free Audit"               | Benefit-driven    |
| "Contact Us" | "Schedule 30-Min Consultation" | Clear expectation |

## Service Pages

Each should answer:

- What problem do we solve?
- How is our approach different?
- What results can you expect?
- What's the next step?

## Trust Signals to Add

- Client count ("Trusted by 50+ brands")
- Year founded/experience
- Specific results (% improvement)
- Team credentials
- Third-party certifications
```

---

## DEPLOYMENT INSTRUCTIONS

### For WordPress Implementation

**Deployment Steps:**

1. Create child theme folder (if not exists)
2. Add files to `/css/` and `/js/` directories
3. Update `functions.php` with enqueue code
4. Test on staging environment
5. Deploy to production
6. Run QA tests

**Files to Create:**

- `/css/header-scroll.css`
- `/css/hero-sizing.css`
- `/js/header-scroll.js`
- Update `functions.php`

**Staging URL:** [INSERT STAGING URL]
**Production URL:** mediabubble.co

### For React Implementation (If Applicable)

**Files to Create:**

```
/src/
├── components/Header/
│   ├── Header.jsx
│   ├── Header.module.css
│   └── useHeaderScroll.js
├── styles/
│   ├── header-scroll.css
│   └── hero-sizing.css
└── utils/
    └── brandAudit.js
```

**Package Dependencies:**

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

**Build Command:** `npm run build`
**Deploy Command:** `vercel deploy`

---

## QUALITY ASSURANCE CHECKLIST

### Before Deployment

- [ ] Code passes linting (ESLint)
- [ ] No console errors
- [ ] No CSS conflicts
- [ ] All tests pass
- [ ] Performance metrics acceptable
- [ ] Accessibility checked (axe-core)

### After Deployment

- [ ] Monitor error tracking (Sentry)
- [ ] Check analytics for impacts
- [ ] User feedback collection
- [ ] Performance monitoring (Web Vitals)
- [ ] Review logs for issues

### Performance Benchmarks

- FCP (First Contentful Paint): < 1.5s
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1
- Lighthouse Score: > 80

---

## DEBUGGING RESOURCES

### Common Issues & Solutions

**Issue: Header not showing**

```javascript
// Debug: Check if header element exists
console.log(document.querySelector("header"));
// Check if classes are being applied
console.log(document.querySelector("header").classList);
```

**Issue: Animation jittery**

```css
/* Add GPU acceleration */
header {
  transform: translate3d(0, 0, 0);
  will-change: transform;
}
```

**Issue: Z-index conflicts**

```javascript
// Inspect z-index of nearby elements
const els = document.querySelectorAll('[style*="z-index"], [class*="z-"]');
els.forEach((el) => console.log(el, window.getComputedStyle(el).zIndex));
```

---

## SUCCESS CRITERIA

### Header Scroll Behavior ✓

- [x] Works on all target browsers
- [x] Smooth animation (no jank)
- [x] Colors change correctly
- [x] Mobile responsive
- [x] No accessibility issues

### Hero Sizing ✓

- [x] Homepage: 100vh
- [x] Service pages: 55vh
- [x] Blog pages: 45vh
- [x] Other pages: 50vh
- [x] Mobile adjustments working

### Brand Consistency ✓

- [x] 95%+ compliance with guidelines
- [x] All critical elements aligned
- [x] Automated audit passing
- [x] Visual QA approved

### Image Optimization ✓

- [x] All images < 250KB
- [x] Proper dimensions
- [x] Alt text on all images
- [x] Load times acceptable

---

## SUPPORT & ESCALATION

**Questions During Implementation?**

1. Check HEADER_SCROLL_IMPLEMENTATION_GUIDE.md
2. Review troubleshooting section above
3. Check browser DevTools console

**If Stuck:**

- Escalate to: yasser.dorgham@gmail.com
- Include: Error message, browser, reproduction steps
- Attach: Screenshot/video of issue

---

## TIMELINE ESTIMATE

| Phase     | Task              | Hours     | Days           |
| --------- | ----------------- | --------- | -------------- |
| 1         | Header behavior   | 8-12      | 2              |
| 2         | Hero sizing       | 6-10      | 2              |
| 3         | Image audit       | 4-6       | 1              |
| 4         | Brand audit       | 4-6       | 1              |
| 5         | Copy improvements | 6-10      | 2              |
| 6         | Testing & QA      | 6-8       | 1-2            |
| 7         | Deployment        | 2-4       | 0.5            |
| **TOTAL** |                   | **40-60** | **10-14 days** |

---

## NEXT STEPS FOR CLAUDE CODE

1. **Review this document** in full
2. **Confirm WordPress/React setup** - clarify framework
3. **Start with Task 1.1** - Create CSS file
4. **Work sequentially** - Header → Hero → Images → Audit → Copy
5. **Test after each phase** - Don't wait until end
6. **Report progress** - Update QUICK_IMPLEMENTATION_CHECKLIST.md
7. **Escalate blockers** - Don't guess, ask

---

**Ready to begin implementation? Start with:** Task 1.1 - Create CSS Styles

**Questions?** Reference the supporting documents:

- `WEBSITE_IMPROVEMENT_PLAN.md` - Full strategy
- `QUICK_IMPLEMENTATION_CHECKLIST.md` - Task tracking
- `HEADER_SCROLL_IMPLEMENTATION_GUIDE.md` - Technical details
