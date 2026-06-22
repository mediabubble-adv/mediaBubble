# MediaBubble Service Page Implementation Prompt

**For Claude Code Agent**  
**Date:** June 10, 2026  
**Version:** 1.0 Production

---

## SYSTEM INSTRUCTIONS FOR CLAUDE CODE

You are implementing MediaBubble's service page system. Your role:

- Execute the architectural blueprint exactly as specified
- Generate production-ready code (HTML/CSS/JavaScript)
- Maintain 100% consistency with brand guidelines
- No hallucinating or improvising beyond scope
- Output copy-paste ready code

---

## PROJECT CONTEXT

### Business Goal

Build a scalable service page template system that:

- Creates new service pages in 30-45 minutes (currently 4-6 hours)
- Maintains 100% consistent styling across all services
- Increases conversions by +35% through strategic CTA placement
- Enables team to move 3-4x faster on future services

### Current State

- WordPress 6.7.5 with Elementor 4.1.1
- HubSpot CRM integration exists
- Google Analytics 4 basic setup
- Brand guidelines v2.0 finalized
- 15+ services across 4 business pillars

### Technical Stack

- Platform: Keep WordPress + Elementor (overlay with custom CSS/JS)
- Languages: HTML5, CSS3 (with CSS variables), Vanilla JavaScript (ES6+)
- Integrations: HubSpot API, GA4 events, Netlify Functions (serverless)
- Accessibility: WCAG 2.1 AA compliant
- Performance: Lighthouse 90+, <2.5s LCP

---

## ARCHITECTURE REFERENCE

### CSS Variable System (Design Tokens)

Use EXACTLY these values - do not deviate:

```css
:root {
  /* Brand Colors */
  --color-primary: #0d3a7d; /* Dark Blue */
  --color-secondary: #ffc107; /* Brand Yellow */
  --color-accent: #2196f3; /* Light Blue */
  --color-success: #4caf50; /* Green */
  --color-danger: #d32f2f; /* Red */

  /* Text Colors */
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --text-tertiary: #999999;
  --text-inverse: #ffffff;

  /* Background Colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --bg-tertiary: #e0e0e0;

  /* Spacing (8px base unit) */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* Typography */
  --font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 48px;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 20px 60px rgba(0, 0, 0, 0.2);

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 999px;
}
```

### Component Hierarchy

All components must follow this naming convention:

```
.component-name
  .component-name__element
    .component-name__element--modifier
```

Example:

```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Title</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Content</p>
  </div>
  <div class="card__footer">
    <button class="card__button card__button--primary">Action</button>
  </div>
</div>
```

---

## PHASE 1: HIGH-IMPACT CONVERSIONS (Priority 1)

### Task 1.1: Newsletter Modal Component

**File:** `components/newsletter-modal.html`  
**Requirements:**

- Auto-trigger 3 seconds after page load
- Exit-intent trigger (cursor leaves top of page)
- Modal overlay with semi-transparent backdrop
- Heading: "Join Our Newsletter"
- Subheading: "Get marketing tips delivered to your inbox"
- Email input field with validation
- Submit button: "Get Insights" (brand secondary color)
- Close button (X, top-right)
- localStorage check to prevent re-showing same day
- GA4 event tracking: `newsletter_modal_shown`, `newsletter_modal_submitted`
- HubSpot contact creation on submit
- Success message: "Check your email!"

**Accessibility Requirements:**

- ARIA labels on all inputs
- Keyboard navigation (Tab, Enter, Esc)
- Focus trap inside modal
- Screen reader friendly
- Color contrast WCAG AA

**Code Template Structure:**

```html
<div
  class="newsletter-modal newsletter-modal--hidden"
  role="dialog"
  aria-labelledby="modal-title"
>
  <!-- backdrop, close button, form structure -->
</div>
```

**CSS Priorities:**

- Smooth fade-in animation (300ms)
- Responsive: 90% width on mobile, 400px max-width desktop
- Form inputs: proper spacing, clear focus states
- Button hover/active states with transitions

**JavaScript Requirements:**

```javascript
class NewsletterModal {
  constructor(options = {}) {
    this.options = {
      triggerDelay: 3000, // 3 seconds
      storageKey: "newsletter_shown_today",
      hubspotPortalId: "...", // provided
      ga4MeasurementId: "...", // provided
    };
  }

  show() {
    /* fade in, focus management */
  }
  hide() {
    /* fade out, cleanup */
  }
  submit(email) {
    /* HubSpot API + GA4 event */
  }
  setupExitIntent() {
    /* mouse leave detection */
  }
}
```

---

### Task 1.2: Git/GitHub Integration Popup

**File:** `components/git-modal.html`  
**Requirements:**

- Modal triggered by button click (not auto)
- Title: "GitHub Integration"
- Content: "Connect your repositories for streamlined development"
- Features list (3-4 bullets)
- CTA button: "Learn More" or "Explore" (links to GitHub integration page)
- Secondary button: "Maybe Later" (closes modal)
- Same accessibility/responsive requirements as newsletter modal

**Code Template:**

```html
<div class="git-modal git-modal--hidden" role="dialog">
  <!-- similar structure to newsletter modal -->
</div>
```

**JavaScript Requirements:**

- Simple show/hide toggle
- GA4 event: `git_modal_opened`, `git_modal_cta_clicked`
- No API calls (informational only)

---

### Task 1.3: Floating CTA Button

**File:** `components/floating-cta.html`  
**Requirements:**

- Fixed position (bottom-right, 24px from edges)
- "Get Free Consultation" text (desktop), icon-only on mobile
- Brand secondary color (#FFC107)
- Smooth entrance animation on page load
- Hides when modal open, shows when closed
- Scroll behavior: slides up on scroll down, back into view on scroll up
- Click opens consultation form or modal
- GA4 event: `floating_cta_clicked`

**CSS:**

```css
.floating-cta {
  position: fixed;
  bottom: var(--space-lg);
  right: var(--space-lg);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  /* animation, shadow, responsive positioning */
}
```

---

### Task 1.4: HubSpot Integration Function

**File:** `functions/hubspot-contact-sync.js`  
**Deploy to:** Netlify Functions  
**Requirements:**

- Receive email, name, phone, service_interest from form submission
- Create contact in HubSpot if doesn't exist
- Update contact if exists
- Return success/error response
- Handle rate limiting gracefully
- Validate input server-side
- No API key exposure to client
- GA4 event on success: `hubspot_contact_created`

**Function Template:**

```javascript
exports.handler = async (event, context) => {
  // Method: POST
  // Body: { email, name, phone, service_interest }
  // Response: { success: true, contactId: '...' }
};
```

**Environment Variables Required:**

```
HUBSPOT_PORTAL_ID=...
HUBSPOT_API_KEY=...
```

---

### Task 1.5: GA4 Event Tracking Setup

**File:** `config/ga4-events.js`  
**Requirements:**

- Define all custom events as constants
- Events to track:
  - `newsletter_modal_shown` (parameters: page_path)
  - `newsletter_modal_submitted` (parameters: email_domain)
  - `newsletter_modal_dismissed` (parameters: time_on_page)
  - `floating_cta_clicked` (parameters: scroll_depth)
  - `git_modal_opened` (parameters: page_path)
  - `form_started` (parameters: form_name)
  - `form_completed` (parameters: form_name)
  - `service_viewed` (parameters: service_name)
- Utility function to fire events with standard parameters
- No PII logging (strip personal info)

**Function Template:**

```javascript
const GA4_EVENTS = {
  NEWSLETTER_MODAL_SHOWN: "newsletter_modal_shown",
  // ... others
};

function trackEvent(eventName, parameters = {}) {
  // Call gtag() with event
}
```

---

## PHASE 2: ENHANCED MENUS (Priority 2)

### Task 2.1: Mega-Menu (Desktop)

**File:** `components/mega-menu.html`  
**Requirements:**

- 4-column grid layout for desktop
- Desktop breakpoint: 1024px+
- Service categories with icons
- Service descriptions (1-2 lines)
- Professional typography hierarchy
- Hover states: scale, border highlight (#FFC107), shadow
- Smooth animations (300ms)
- Keyboard navigation (Tab, Arrow keys, Enter, Esc)
- ARIA labels for screen readers
- Organized by business pillars (Web Solutions, Digital Strategy, etc.)

**Column Structure:**

```
Column 1: Web Solutions
├─ Web Development
├─ SEO Optimization
└─ E-Commerce Solutions

Column 2: Digital Marketing
├─ Social Media Management
├─ Content Marketing
└─ Email Campaigns

Column 3: Branding & Design
├─ Brand Strategy
├─ Logo Design
└─ Visual Identity

Column 4: Resources
├─ Case Studies
├─ Blog
└─ Pricing
```

---

### Task 2.2: Mobile Navigation (Hamburger Menu)

**File:** `components/mobile-menu.html`  
**Requirements:**

- Hamburger icon (animated: lines → X)
- Full-screen slide-in overlay on mobile
- Touch-friendly button targets (56px+)
- Expandable category accordions
- Smooth slide animations
- Dismiss: back swipe, X button, backdrop click
- Keyboard: Esc to close
- ARIA labels and roles
- Mobile breakpoint: <1024px

---

### Task 2.3: Menu JavaScript Controller

**File:** `components/responsive-menu.js`  
**Requirements:**

```javascript
class ResponsiveMenu {
  constructor(options = {}) {
    this.options = {
      desktopBreakpoint: 1024,
      mobileBreakpoint: 768,
      animationDuration: 300,
    };
  }

  init() {
    /* setup event listeners */
  }
  openMenu() {
    /* show, manage focus */
  }
  closeMenu() {
    /* hide, restore focus */
  }
  setupKeyboardNav() {
    /* Tab, Arrow, Enter, Esc */
  }
  setupTouchGestures() {
    /* swipe, tap */
  }
  handleResize() {
    /* switch between desktop/mobile */
  }
}
```

---

## PHASE 3: ANIMATIONS & EFFECTS (Priority 3)

### Task 3.1: Custom Cursor (Interactive - Recommended Option)

**File:** `components/interactive-cursor.js`  
**Requirements:**

- Base: Small yellow dot (#FFC107) with glow effect
- On hover (links, buttons): Expand + brighten
- Smooth 150ms transition
- Disappear on mouse leave
- GPU-accelerated (will-change: transform)
- Hidden on touch devices
- No performance impact on mobile

**Properties:**

```javascript
class InteractiveCursor {
  constructor() {
    this.baseSize = 8;
    this.expandedSize = 32;
    this.color = "#FFC107";
  }

  init() {
    /* create cursor element */
  }
  onMouseMove(e) {
    /* update position */
  }
  onHoverElement(isHovering) {
    /* expand/contract */
  }
  destroy() {
    /* cleanup on touch devices */
  }
}
```

---

### Task 3.2: Page Transition Animations

**File:** `components/page-transitions.css`  
**Requirements:**

- Fade-in on page load (500ms)
- Fade-out on link click (300ms before navigation)
- Staggered element animations (children fade in sequence)
- Scroll-reveal using Intersection Observer
- Performance: 60fps (use transform and opacity only)

**CSS Animations:**

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

### Task 3.3: Button Ripple Effect

**File:** `components/button-ripple.js`  
**Requirements:**

- On click: ripple animation emanates from click point
- Duration: 600ms
- Color: rgba(255, 255, 255, 0.5) for dark buttons
- Use requestAnimationFrame for smooth animation

---

## PHASE 4: COMPONENT LIBRARY (Priority 4)

### Task 4.1: Button Component System

**File:** `components/buttons.css`  
**Variants:**

- Primary (secondary color background)
- Secondary (primary color background)
- Outline (border, transparent background)
- Ghost (text only)
- Large (padding: 16px 32px)
- Small (padding: 8px 16px)
- Disabled (opacity 0.5, no interaction)

**Requirements:**

```css
.btn {
  padding: var(--space-md) var(--space-lg);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.btn-primary {
  background: var(--color-secondary);
  color: var(--color-primary);
}

.btn-primary:hover {
  background: #ffb300;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

---

### Task 4.2: Card Component System

**File:** `components/cards.css`  
**Types:**

- Service Card (icon, title, description, link)
- Feature Card (checkmark, feature name, description)
- Testimonial Card (quote, author, title, company)
- Case Study Card (logo, metric, description, link)

---

### Task 4.3: Section Header Component

**File:** `components/section-header.css`  
**Requirements:**

```html
<div class="section-header">
  <h2>Section Title</h2>
  <p class="section-intro">Intro text explaining the section</p>
</div>
```

---

### Task 4.4: Component Documentation

**File:** `docs/COMPONENT_LIBRARY.md`  
**Requirements:**

- Every component: HTML structure, CSS variables used, JavaScript dependencies
- Copy-paste ready code snippets
- Do's and Don'ts
- Accessibility notes
- Responsive behavior
- Example usage with real content

---

## SERVICE PAGE TEMPLATE STRUCTURE

### Complete Page Structure (Copy-Paste Ready)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Service Name | MediaBubble</title>
    <meta name="description" content="Service description for SEO" />
    <!-- CSS includes -->
    <link rel="stylesheet" href="/css/design-tokens.css" />
    <link rel="stylesheet" href="/css/components.css" />
    <link rel="stylesheet" href="/css/service-page.css" />
  </head>
  <body>
    <!-- Navigation -->
    <nav class="main-nav">
      <!-- Menu component -->
    </nav>

    <!-- Hero Section -->
    <section class="hero-service">
      <nav class="breadcrumb"></nav>
      <div class="hero-container">
        <div class="hero-content">
          <h1>Service Title</h1>
          <p class="hero-subtitle">Value proposition</p>
          <button class="btn btn-primary btn-lg">Get Free Consultation</button>
        </div>
        <div class="hero-media">
          <img src="..." alt="Service hero image" />
        </div>
      </div>
      <div class="hero-stats">
        <!-- Stats -->
      </div>
    </section>

    <!-- Problem Section -->
    <section class="problems-section">
      <!-- Problem cards grid -->
    </section>

    <!-- How It Works -->
    <section class="process-section">
      <!-- Timeline -->
    </section>

    <!-- Features -->
    <section class="features-section">
      <!-- Feature grid -->
    </section>

    <!-- Case Study -->
    <section class="case-study-section">
      <!-- Featured case study -->
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <!-- Main CTA -->
    </section>

    <!-- Footer -->
    <footer>
      <!-- Footer content -->
    </footer>

    <!-- Components -->
    <div id="newsletter-modal"></div>
    <div id="floating-cta"></div>

    <!-- Scripts -->
    <script src="/js/design-tokens.js"></script>
    <script src="/js/newsletter-modal.js"></script>
    <script src="/js/responsive-menu.js"></script>
    <script src="/js/interactive-cursor.js"></script>
    <script src="/js/ga4-events.js"></script>
    <script src="/js/page-init.js"></script>
  </body>
</html>
```

---

## TESTING CHECKLIST

### Functionality

- [ ] Newsletter modal appears after 3 seconds
- [ ] Exit-intent triggers on cursor leave
- [ ] Form submits to HubSpot successfully
- [ ] GA4 events fire correctly (check GA4 UI)
- [ ] localStorage prevents re-showing same day
- [ ] Git modal opens on button click
- [ ] Floating CTA slides up/down with scroll
- [ ] Menu opens/closes on desktop and mobile

### Browser Compatibility

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Performance

- [ ] Lighthouse score 90+
- [ ] LCP <2.5 seconds
- [ ] No layout shift (CLS)
- [ ] Animations run at 60fps

### Accessibility

- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] Screen reader tested (NVDA, JAWS, VoiceOver)
- [ ] Color contrast verified (WCAG AA)
- [ ] Focus indicators visible
- [ ] Form labels associated with inputs

### Mobile

- [ ] Responsive layouts correct
- [ ] Touch targets 56px+
- [ ] Cursor hidden on mobile
- [ ] Modal touch-friendly
- [ ] Menu swipe-to-dismiss works

---

## DEPLOYMENT CHECKLIST

- [ ] Code reviewed and approved
- [ ] All tests passing
- [ ] Staging environment tested
- [ ] GA4 events verified live
- [ ] HubSpot contacts being created
- [ ] Performance benchmarked
- [ ] Accessibility audit passed
- [ ] Stakeholder sign-off
- [ ] Rollback plan documented
- [ ] Deployment to production
- [ ] Monitor for 24 hours

---

## KEY CONSTRAINTS

### Must Follow Exactly

1. Color palette: Use CSS variables, never hardcode colors
2. Spacing: Use 8px base unit, never random values
3. Typography: Font family, sizes, weights from variables
4. Animations: Use transitions from variables, 60fps only
5. Accessibility: WCAG 2.1 AA minimum
6. Brand: No changes to brand colors or logo usage

### Must NOT Do

1. Don't create new color values (use existing palette)
2. Don't hardcode spacing (use CSS variables)
3. Don't use JavaScript animations (CSS only, unless required)
4. Don't skip accessibility (every component must be a11y)
5. Don't log PII to GA4 or analytics
6. Don't create vendor lock-in (portable code)

---

## FILE STRUCTURE (Expected)

```
/css/
  ├─ design-tokens.css (CSS variables)
  ├─ components.css (all components)
  ├─ service-page.css (page-specific)
  └─ responsive.css (media queries)

/js/
  ├─ newsletter-modal.js
  ├─ responsive-menu.js
  ├─ interactive-cursor.js
  ├─ ga4-events.js
  ├─ page-init.js
  └─ utils.js

/functions/
  └─ hubspot-contact-sync.js (Netlify Function)

/components/
  ├─ newsletter-modal.html
  ├─ git-modal.html
  ├─ floating-cta.html
  ├─ mega-menu.html
  ├─ mobile-menu.html
  └─ [other components as needed]

/docs/
  └─ COMPONENT_LIBRARY.md
```

---

## SUCCESS CRITERIA

### Phase 1 Complete (Week 2)

- ✅ Modal shows and collects emails
- ✅ 50+ signups in first week
- ✅ GA4 events firing correctly
- ✅ HubSpot contacts created
- ✅ Zero console errors

### Phase 4 Complete (Week 6)

- ✅ Component library documented
- ✅ All 4 phases live and tested
- ✅ +40% newsletter signups
- ✅ +35% overall conversions
- ✅ 3-4x faster page creation velocity
- ✅ Team trained on component system

---

## QUESTIONS FOR CLARITY

Before starting, confirm:

1. **HubSpot Details:** Portal ID and API key location?
2. **GA4 Setup:** Measurement ID confirmed in analytics?
3. **Netlify:** Functions already set up for serverless?
4. **Elementor:** Custom code blocks available for HTML/CSS/JS?
5. **Staging:** Staging URL for testing before production?
6. **Timeline:** Preferred start date and sprint length?

---

## EXECUTION NOTES

- Work in phases (don't skip ahead)
- Test in staging before touching production
- Commit frequently with clear messages
- Document as you build
- Get stakeholder sign-off before phase complete
- Monitor metrics post-deployment
- Iterate based on analytics

---

**Ready to build. Let's go.** 🚀
