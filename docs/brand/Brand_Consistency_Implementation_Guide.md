# MediaBubble Brand Consistency Implementation Guide

**Quick Reference for Immediate Implementation (Phase 1)**

---

## Table of Contents

1. CSS Variables Setup
2. Color Implementation
3. Spacing System
4. Typography System
5. Component Templates
6. Elementor Setup Guide
7. Testing Checklist

---

## 1. CSS Variables Setup

### Step 1: Create Design Tokens CSS File

**File:** `wp-content/themes/vault-child/css/design-tokens.css`

```css
/* ========================================
   MediaBubble Design Tokens
   Updated: June 2026
   ======================================== */

:root {
  /* ---- COLORS ---- */
  /* Primary Brand Colors */
  --color-brand-yellow: #ffc107;
  --color-brand-blue: #2196f3;
  --color-dark-blue: #0d3a7d;

  /* Text Colors */
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666666;
  --color-text-light: #999999;
  --color-text-inverse: #ffffff;

  /* Background Colors */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-bg-dark: #0d3a7d;

  /* State Colors */
  --color-success: #4caf50;
  --color-warning: #ff9800;
  --color-error: #f44336;
  --color-info: #2196f3;

  /* ---- SPACING (8px base unit) ---- */
  --spacing-xs: 8px; /* 1 unit */
  --spacing-sm: 16px; /* 2 units */
  --spacing-md: 24px; /* 3 units */
  --spacing-lg: 32px; /* 4 units */
  --spacing-xl: 48px; /* 6 units */
  --spacing-2xl: 64px; /* 8 units */
  --spacing-3xl: 80px; /* 10 units */

  /* ---- TYPOGRAPHY ---- */
  --font-family-base:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
  --font-family-mono: "Courier New", Courier, monospace;

  /* Font Sizes */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 28px;
  --font-size-4xl: 36px;
  --font-size-5xl: 48px;

  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.6;
  --line-height-loose: 1.8;

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* ---- COMPONENT SIZES ---- */
  --button-height-sm: 36px;
  --button-height-md: 44px;
  --button-height-lg: 52px;
  --button-padding-h-sm: 12px;
  --button-padding-h-md: 20px;
  --button-padding-h-lg: 28px;

  /* Border Radius */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --border-radius-xl: 16px;

  /* ---- SHADOWS ---- */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);

  /* ---- TRANSITIONS ---- */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);

  /* ---- Z-INDEX SCALE ---- */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}

/* ========================================
   UTILITY CLASSES (Enforce Spacing Grid)
   ======================================== */

/* Margins */
.m-xs {
  margin: var(--spacing-xs);
}
.m-sm {
  margin: var(--spacing-sm);
}
.m-md {
  margin: var(--spacing-md);
}
.m-lg {
  margin: var(--spacing-lg);
}
.m-xl {
  margin: var(--spacing-xl);
}
.m-2xl {
  margin: var(--spacing-2xl);
}
.m-3xl {
  margin: var(--spacing-3xl);
}

.mt-xs {
  margin-top: var(--spacing-xs);
}
.mt-sm {
  margin-top: var(--spacing-sm);
}
.mt-md {
  margin-top: var(--spacing-md);
}
.mt-lg {
  margin-top: var(--spacing-lg);
}
.mt-xl {
  margin-top: var(--spacing-xl);
}
.mt-2xl {
  margin-top: var(--spacing-2xl);
}
.mt-3xl {
  margin-top: var(--spacing-3xl);
}

.mb-xs {
  margin-bottom: var(--spacing-xs);
}
.mb-sm {
  margin-bottom: var(--spacing-sm);
}
.mb-md {
  margin-bottom: var(--spacing-md);
}
.mb-lg {
  margin-bottom: var(--spacing-lg);
}
.mb-xl {
  margin-bottom: var(--spacing-xl);
}
.mb-2xl {
  margin-bottom: var(--spacing-2xl);
}
.mb-3xl {
  margin-bottom: var(--spacing-3xl);
}

/* Padding */
.p-xs {
  padding: var(--spacing-xs);
}
.p-sm {
  padding: var(--spacing-sm);
}
.p-md {
  padding: var(--spacing-md);
}
.p-lg {
  padding: var(--spacing-lg);
}
.p-xl {
  padding: var(--spacing-xl);
}
.p-2xl {
  padding: var(--spacing-2xl);
}
.p-3xl {
  padding: var(--spacing-3xl);
}

.px-sm {
  padding-left: var(--spacing-sm);
  padding-right: var(--spacing-sm);
}
.px-md {
  padding-left: var(--spacing-md);
  padding-right: var(--spacing-md);
}
.px-lg {
  padding-left: var(--spacing-lg);
  padding-right: var(--spacing-lg);
}

.py-sm {
  padding-top: var(--spacing-sm);
  padding-bottom: var(--spacing-sm);
}
.py-md {
  padding-top: var(--spacing-md);
  padding-bottom: var(--spacing-md);
}
.py-lg {
  padding-top: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
}
.py-xl {
  padding-top: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
}
.py-2xl {
  padding-top: var(--spacing-2xl);
  padding-bottom: var(--spacing-2xl);
}
.py-3xl {
  padding-top: var(--spacing-3xl);
  padding-bottom: var(--spacing-3xl);
}

/* ========================================
   TEXT & TYPOGRAPHY CLASSES
   ======================================== */

/* Headings */
.text-h1 {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
}

.text-h2 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
}

.text-h3 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
}

.text-h4 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
}

/* Body Text */
.text-body {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-primary);
}

.text-body-small {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
}

.text-caption {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-normal);
  color: var(--color-text-light);
}

/* Color Classes */
.text-primary {
  color: var(--color-text-primary);
}
.text-secondary {
  color: var(--color-text-secondary);
}
.text-muted {
  color: var(--color-text-light);
}
.text-inverse {
  color: var(--color-text-inverse);
}
.text-brand-yellow {
  color: var(--color-brand-yellow);
}
.text-brand-blue {
  color: var(--color-brand-blue);
}

/* ========================================
   COLOR & BACKGROUND CLASSES
   ======================================== */

.bg-primary {
  background-color: var(--color-bg-primary);
}
.bg-secondary {
  background-color: var(--color-bg-secondary);
}
.bg-dark {
  background-color: var(--color-bg-dark);
}
.bg-brand-yellow {
  background-color: var(--color-brand-yellow);
}
.bg-brand-blue {
  background-color: var(--color-brand-blue);
}

.border-brand-yellow {
  border-color: var(--color-brand-yellow);
}
.border-brand-blue {
  border-color: var(--color-brand-blue);
}

/* ========================================
   COMPONENT STYLES
   ======================================== */

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-brand-yellow);
  color: var(--color-text-primary);
  height: var(--button-height-md);
  padding: 0 var(--button-padding-h-md);
}

.btn-primary:hover {
  opacity: 0.9;
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  opacity: 0.8;
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-brand-blue);
  border: 2px solid var(--color-brand-blue);
  height: var(--button-height-md);
  padding: 0 var(--button-padding-h-md);
}

.btn-secondary:hover {
  background-color: #e3f2fd;
}

.btn-text {
  background-color: transparent;
  color: var(--color-brand-blue);
  height: var(--button-height-md);
  padding: 0 8px;
}

.btn-text:hover {
  text-decoration: underline;
}

.btn-sm {
  height: var(--button-height-sm);
  padding: 0 var(--button-padding-h-sm);
  font-size: var(--font-size-sm);
}

.btn-lg {
  height: var(--button-height-lg);
  padding: 0 var(--button-padding-h-lg);
  font-size: var(--font-size-lg);
}

/* Cards */
.card {
  background-color: var(--color-bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
  transition: all var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

.card-header {
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid #eeeeee;
}

.card-body {
  margin-bottom: var(--spacing-md);
}

.card-footer {
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid #eeeeee;
}

/* Sections */
.section {
  padding-top: var(--spacing-3xl);
  padding-bottom: var(--spacing-3xl);
}

.section-dark {
  background-color: var(--color-bg-dark);
  color: var(--color-text-inverse);
}

.section-light {
  background-color: var(--color-bg-secondary);
}

/* ========================================
   RESPONSIVE BREAKPOINTS
   ======================================== */

@media (max-width: 768px) {
  .text-h1 {
    font-size: var(--font-size-4xl);
  }
  .text-h2 {
    font-size: var(--font-size-3xl);
  }
  .text-h3 {
    font-size: var(--font-size-2xl);
  }

  .section {
    padding-top: var(--spacing-2xl);
    padding-bottom: var(--spacing-2xl);
  }

  .py-3xl {
    padding-top: var(--spacing-2xl);
    padding-bottom: var(--spacing-2xl);
  }
  .mt-3xl {
    margin-top: var(--spacing-2xl);
  }
  .mb-3xl {
    margin-bottom: var(--spacing-2xl);
  }
}

@media (max-width: 480px) {
  .text-h1 {
    font-size: var(--font-size-3xl);
  }
  .text-h2 {
    font-size: var(--font-size-2xl);
  }
  .text-h3 {
    font-size: var(--font-size-xl);
  }

  .section {
    padding-top: var(--spacing-lg);
    padding-bottom: var(--spacing-lg);
  }

  .btn {
    width: 100%;
  }
}
```

### Step 2: Enqueue CSS in Child Theme

**File:** `wp-content/themes/vault-child/functions.php`

```php
<?php

/**
 * Vault Child Theme Setup
 */

// Enqueue parent theme stylesheet
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('vault-parent',
        get_template_directory_uri() . '/style.css'
    );

    // PRIORITY: Add design tokens BEFORE Elementor styles
    wp_enqueue_style('mediabubble-design-tokens',
        get_stylesheet_directory_uri() . '/css/design-tokens.css',
        [],
        '1.0.0',
        'all'
    );

    wp_enqueue_style('vault-child',
        get_stylesheet_directory_uri() . '/style.css',
        ['vault-parent', 'mediabubble-design-tokens']
    );
});

// Load design tokens into Elementor
add_action('elementor/frontend/after_enqueue_styles', function() {
    wp_enqueue_style('mediabubble-design-tokens',
        get_stylesheet_directory_uri() . '/css/design-tokens.css'
    );
});
```

---

## 2. Color Implementation

### Update Elementor Theme Colors

**Steps:**

1. Go to WordPress Dashboard → Appearance → Elementor Global Settings → Colors
2. Set custom colors palette:

| Name           | Value   | Usage                    |
| -------------- | ------- | ------------------------ |
| Primary Yellow | #FFC107 | Primary CTA buttons      |
| Primary Blue   | #2196F3 | Links, secondary buttons |
| Dark Blue      | #0D3A7D | Headers, footers, text   |
| Text Dark      | #1a1a1a | Body text                |
| Text Light     | #F5F5F5 | Backgrounds              |
| Success        | #4CAF50 | Success messages         |
| Warning        | #FF9800 | Warning messages         |
| Error          | #F44336 | Error messages           |

### Update Page Styles

**Homepage Hero:**

- Remove white background
- Add dark blue background: `background-color: var(--color-dark-blue);`
- Text color: `color: white;`
- Button: Use "Primary Yellow" color from palette

**Service Cards:**

- Background: `var(--color-bg-primary)`
- Box shadow: `var(--shadow-md)`
- Hover shadow: `var(--shadow-lg)`
- Padding: Use `p-lg` class

**All CTA Buttons:**

- Color: Primary Yellow (#FFC107)
- Height: 44px minimum
- Padding: 20px horizontal, 12px vertical
- Hover: opacity 0.9

---

## 3. Spacing System

### Apply to Key Sections

**Homepage Structure:**

```
Header: py-md (24px padding top/bottom)
↓
Hero: py-3xl (80px padding top/bottom) [CRITICAL: Fix white bg]
↓
Why Choose: py-xl (48px padding top/bottom) + px-lg (32px sides)
↓
Client Logos: py-lg (32px padding top/bottom)
↓
3-Step Approach: py-2xl (64px padding top/bottom)
↓
Services Grid: py-xl (48px padding top/bottom)
↓
Results Section: py-3xl (80px padding top/bottom)
↓
FAQ: py-xl (48px padding top/bottom)
↓
Footer: py-lg (32px padding top/bottom)
```

### Elementor Column Padding

Instead of manually setting padding on each Elementor column:

**Before (Bad):**

```
Column padding: 35px top, 40px bottom, 20px left, 20px right
(Inconsistent, hard to track)
```

**After (Good):**

```
Column CSS class: "py-xl px-lg"
(References design tokens, enforced globally)
```

**How to apply in Elementor:**

1. Select column
2. Go to Advanced → Custom CSS
3. Add: `margin-bottom: var(--spacing-xl);`

OR better:

1. Advanced → CSS Classes
2. Add: `py-xl px-lg`

---

## 4. Typography System

### Define Font Stack

**File:** `wp-content/themes/vault-child/style.css` (top of file)

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

:root {
  --font-family-base:
    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

html,
body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-primary);
}

h1 {
  font-size: var(--font-size-5xl);
}
h2 {
  font-size: var(--font-size-4xl);
}
h3 {
  font-size: var(--font-size-3xl);
}
h4 {
  font-size: var(--font-size-2xl);
}
h5 {
  font-size: var(--font-size-xl);
}
h6 {
  font-size: var(--font-size-lg);
}
```

### Update Elementor Typography

1. Dashboard → Elementor → Settings → Typographies
2. Remove all custom font definitions
3. Create single typography:
   - Font: Inter (from Google Fonts)
   - Weights: 400, 600, 700
   - Size: Use font-size tokens

---

## 5. Component Templates

### Button Component Template

**Elementor > Templates > Saved Templates > Create New**

Name: `MediaBubble Button`

```html
<a href="#" class="btn btn-primary"> Primary Button </a>
```

**Create 3 templates:**

1. **Primary Button** (yellow background)
2. **Secondary Button** (blue outline)
3. **Text Button** (blue text, no background)

### Card Component Template

**Elementor > Templates > Saved Templates > Create New**

Name: `MediaBubble Card`

```html
<div class="card">
  <div class="card-header">
    <h3 class="text-h3">Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content goes here</p>
  </div>
  <div class="card-footer">
    <a href="#" class="btn btn-primary btn-sm">Learn More</a>
  </div>
</div>
```

### Hero Section Template

**Elementor > Templates > Saved Templates > Create New**

Name: `MediaBubble Hero`

```html
<section
  class="section section-dark"
  style="min-height: 600px; display: flex; align-items: center;"
>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <h1 class="text-h1" style="color: white;">Hero Title</h1>
        <p class="text-body" style="color: white; margin-bottom: 32px;">
          Hero subtitle and description
        </p>
        <a href="#" class="btn btn-primary">Call to Action</a>
      </div>
    </div>
  </div>
</section>
```

---

## 6. Elementor Setup Guide

### Step 1: Update Global Colors

Dashboard → Elementor → Global Settings

```
Color 1: Primary Yellow (#FFC107)
Color 2: Primary Blue (#2196F3)
Color 3: Dark Blue (#0D3A7D)
Color 4: Text Dark (#1a1a1a)
Color 5: Background Light (#F5F5F5)
Color 6: Success (#4CAF50)
Color 7: Warning (#FF9800)
Color 8: Error (#F44336)
```

### Step 2: Define Global Typography

Dashboard → Elementor → Global Settings → Typographies

```
H1:
- Family: Inter
- Size: 48px (desktop), 36px (mobile)
- Weight: 700
- Line Height: 1.2

H2:
- Family: Inter
- Size: 36px (desktop), 28px (mobile)
- Weight: 700
- Line Height: 1.3

Body:
- Family: Inter
- Size: 16px
- Weight: 400
- Line Height: 1.6
```

### Step 3: Create Component Library

Dashboard → Elementor → Saved Templates

Create:

1. **Buttons Library**
   - Primary Button (large)
   - Primary Button (medium)
   - Primary Button (small)
   - Secondary Button
   - Text Button

2. **Cards Library**
   - Service Card
   - Testimonial Card
   - Case Study Card

3. **Sections Library**
   - Hero Section
   - CTA Section
   - Testimonials Section
   - FAQ Section

4. **Navigation Components**
   - Header (with logo + menu)
   - Footer (with links + CTA)

### Step 4: Lock Templates

For each template:

1. Edit template
2. Right-click element → Lock
3. This prevents accidental modifications

---

## 7. Testing Checklist

### Visual Consistency Test

- [ ] Homepage hero has dark blue background (not white)
- [ ] All CTA buttons are brand yellow (#FFC107)
- [ ] All secondary buttons are brand blue (#2196F3)
- [ ] Button heights are consistent (44px minimum)
- [ ] Section spacing follows grid (multiples of 8px)
- [ ] Typography hierarchy is consistent (H1 > H2 > H3)
- [ ] Card shadows are consistent (shadow-md on normal, shadow-lg on hover)
- [ ] Border radius is consistent (8px for buttons, 12px for cards)

### Mobile Responsiveness Test

- [ ] Hero section is readable on mobile
- [ ] Buttons are 44px+ height (touch target size)
- [ ] Text sizes are readable (16px minimum)
- [ ] Sections have reduced padding on mobile (32px instead of 80px)
- [ ] No horizontal scroll on any viewport

### Accessibility Test

- [ ] Color contrast ratio ≥ 4.5:1 for normal text
- [ ] Color contrast ratio ≥ 3:1 for large text
- [ ] Buttons have visible focus state
- [ ] Links are underlined or otherwise distinguished from text
- [ ] Form inputs have visible labels
- [ ] All images have alt text

### Browser Test

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Quick Implementation Checklist

**Week 1 - Colors & Spacing:**

- [ ] Create CSS variables file
- [ ] Enqueue CSS in child theme
- [ ] Update Elementor global colors
- [ ] Fix homepage hero background (dark blue)
- [ ] Update all CTA buttons to brand yellow
- [ ] Test on 3 browsers

**Week 2 - Typography & Components:**

- [ ] Update Elementor typography settings
- [ ] Create button component templates
- [ ] Create card component templates
- [ ] Update services section cards
- [ ] Update testimonials section
- [ ] Create FAQ component template

**Ongoing:**

- [ ] Team trains on using design tokens
- [ ] New pages use component templates (not custom styling)
- [ ] Regular brand consistency audits (monthly)

---

## Common Mistakes to Avoid

❌ **Don't:**

- Hardcode colors (e.g., `background: #FFC107`)
- Use Elementor inline styles
- Create custom buttons without templates
- Ignore mobile spacing/padding
- Use different font sizes on similar elements
- Forget to apply CSS classes

✓ **Do:**

- Use CSS variables: `background: var(--color-brand-yellow)`
- Use utility classes: `py-lg`, `px-md`
- Use component templates
- Test on mobile first
- Use consistent typography scale
- Apply design tokens everywhere

---

## Questions?

For help with:

- **CSS variables:** Check `design-tokens.css` file
- **Elementor setup:** See Elementor documentation or contact support
- **Component templates:** Use provided HTML templates as starting point
- **Team training:** Share this guide with your design/dev team
