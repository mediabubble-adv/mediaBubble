# Claude Code - Quick Start Reference

**Project:** MediaBubble Website Improvements  
**Status:** Ready for Implementation  
**Last Updated:** June 12, 2026

---

## 📌 Key Context

- **Current Platform:** WordPress + Elementor
- **Child Theme Location:** `/wp-content/themes/[child-theme]/`
- **Sites:** mediabubble.co (EG), mediabubble.ae (AE)
- **Framework:** Vanilla JS (framework agnostic)
- **Browser Support:** Chrome 90+, Firefox 88+, Safari 14+

---

## ⚡ Main Tasks (In Order)

### 1️⃣ Header Scroll Behavior (8-12 hours)

**Files to create:**

- `css/header-scroll.css` ← Copy from CLAUDE_CODE_IMPLEMENTATION_BRIEF.md Task 1.1
- `js/header-scroll.js` ← Copy from Task 1.2
- Update `functions.php` ← Copy code from Task 1.3

**What it does:**

- Hides header while hero visible
- Slides in white background on scroll
- Changes text from white → dark

**Test:** Homepage - scroll down, should see header appear

---

### 2️⃣ Hero Section Sizing (6-10 hours)

**File to create:**

- `css/hero-sizing.css` ← Copy CSS from Task 2.1
- Update `functions.php` ← Add body_class filter from Task 2.1

**What it does:**

- Homepage: 100vh (full screen)
- Services: 55vh
- Blog: 45vh
- About/Portfolio: 50vh
- Contact: 40vh

**Test:** Visit all page types, verify hero sizes

---

### 3️⃣ Image Optimization (4-6 hours)

**Create utility script:**

- `scripts/image-audit.js` ← Copy from Task 3.1

**What it does:**

- Finds images > 250KB
- Checks for missing alt text
- Reports low-resolution images

**No deployment needed** - just generates audit report

---

### 4️⃣ Brand Audit Automation (4-6 hours)

**Create utility script:**

- `scripts/brand-audit.js` ← Copy from Task 4.1

**What it does:**

- Checks if colors match brand
- Verifies typography consistency
- Reports spacing issues
- Identifies missing alt text

**No deployment needed** - just generates audit report

---

### 5️⃣ Copy Improvements (6-10 hours)

**Create utility script:**

- `scripts/copy-audit.js` ← Copy from Task 5.1
- Reference doc: `COPY_IMPROVEMENTS.md`

**What it does:**

- Finds generic headings
- Identifies weak CTAs
- Checks meta descriptions
- Reports issues

**Then manually update copy on pages** (not automated)

---

## 🧪 Testing Each Phase

### After Header Implementation

```bash
# Test in browser console
window.headerScroll.config.debugMode = true;
window.headerScroll.init(); // Reinitialize with debug
```

### After Hero Sizing

- [ ] Visit homepage → should be 100vh
- [ ] Visit service page → should be 55vh
- [ ] Visit blog → should be 45vh
- [ ] Resize window → should adapt

### After Image Audit

```bash
# Run in browser console
auditImages(); // Check console.table output
```

### After Brand Audit

```bash
# Run in browser console
window.brandAudit.audit(); // Check results
```

---

## 📁 File Structure Reference

```
/wp-content/themes/[child-theme]/
├── css/
│   ├── header-scroll.css (NEW)
│   ├── hero-sizing.css (NEW)
│   └── style.css (existing)
├── js/
│   ├── header-scroll.js (NEW)
│   ├── brand-audit.js (NEW)
│   ├── image-audit.js (NEW)
│   ├── copy-audit.js (NEW)
│   └── main.js (existing)
├── functions.php (UPDATE)
└── README.md
```

---

## 💾 WordPress Enqueue Pattern

**Always use this pattern for new files:**

```php
<?php
wp_enqueue_style(
  'handle-name',
  get_stylesheet_directory_uri() . '/css/file.css',
  array(),
  filemtime(get_stylesheet_directory() . '/css/file.css'),
  'all'
);

wp_enqueue_script(
  'handle-name',
  get_stylesheet_directory_uri() . '/js/file.js',
  array(),
  filemtime(get_stylesheet_directory() . '/js/file.js'),
  true // Load in footer
);
?>
```

---

## 🎯 Priority Matrix

| Task          | Impact     | Effort | Priority     |
| ------------- | ---------- | ------ | ------------ |
| Header Scroll | ⭐⭐⭐⭐⭐ | 8h     | 🔴 DO FIRST  |
| Hero Sizing   | ⭐⭐⭐⭐   | 6h     | 🔴 DO SECOND |
| Image Audit   | ⭐⭐⭐     | 4h     | 🟡 DO THIRD  |
| Brand Audit   | ⭐⭐⭐     | 4h     | 🟡 DO FOURTH |
| Copy Audit    | ⭐⭐⭐⭐   | 6h     | 🟡 DO LAST   |

---

## 🚀 Deployment Checklist

### Before Staging

- [ ] Code passes ESLint
- [ ] No console errors
- [ ] No CSS conflicts
- [ ] All selectors match HTML
- [ ] Mobile tested

### Before Production

- [ ] QA approval
- [ ] Performance benchmarks met
- [ ] Accessibility check (axe-core)
- [ ] Backup created
- [ ] Rollback plan ready

---

## 🐛 Common Issues & Quick Fixes

### Header not appearing

```javascript
// Check if hero element exists
const hero = document.querySelector('.hero-section, [class*="hero"]');
console.log("Hero element:", hero);
console.log("Hero height:", hero?.offsetHeight);

// Force reinitialize
window.headerScroll.init();
```

### Hero sizing not working

```javascript
// Check if body class is present
console.log("Body classes:", document.body.className);

// Verify CSS is loaded
console.log(
  window.getComputedStyle(document.querySelector(".hero-section")).height,
);
```

### Animation jittery

```css
/* Add to header.scrolled */
transform: translate3d(0, 0, 0);
will-change: transform;
backface-visibility: hidden;
```

---

## 📊 Success Metrics

**When complete, verify:**

- ✅ Header scrolls smoothly on all pages
- ✅ Hero sizes match spec on all page types
- ✅ All images have alt text
- ✅ Brand colors used consistently
- ✅ Copy is benefit-driven (not generic)
- ✅ Mobile responsive everywhere
- ✅ No console errors
- ✅ Lighthouse score > 80

---

## 📞 Need Help?

**Reference Documents:**

1. **Full Strategy:** `WEBSITE_IMPROVEMENT_PLAN.md`
2. **Implementation Details:** `CLAUDE_CODE_IMPLEMENTATION_BRIEF.md`
3. **Header Technical Spec:** `HEADER_SCROLL_IMPLEMENTATION_GUIDE.md`
4. **Task Tracking:** `QUICK_IMPLEMENTATION_CHECKLIST.md`

**Escalation:**

- Email: yasser.dorgham@gmail.com
- Include: Error message, browser, steps to reproduce

---

## ⏱️ Time Tracking

| Phase         | Estimate   | Start | End | Actual |
| ------------- | ---------- | ----- | --- | ------ |
| Header Scroll | 8-12h      |       |     |        |
| Hero Sizing   | 6-10h      |       |     |        |
| Image Audit   | 4-6h       |       |     |        |
| Brand Audit   | 4-6h       |       |     |        |
| Copy Audit    | 6-10h      |       |     |        |
| Testing       | 6-8h       |       |     |        |
| Deployment    | 2-4h       |       |     |        |
| **TOTAL**     | **40-60h** |       |     |        |

---

## 🎓 Learning Resources

**CSS:**

- Flexbox: https://flexboxfroggy.com
- CSS Grid: https://cssgridgarden.com

**JavaScript:**

- Event Listeners: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
- DOM Manipulation: https://developer.mozilla.org/en-US/docs/Web/API/Document

**WordPress:**

- Enqueue Scripts: https://developer.wordpress.org/plugins/javascript/
- Body Class: https://developer.wordpress.org/reference/hooks/body_class/

---

## 📝 Notes for Implementation

**Remember:**

- Test after EACH phase, not just at end
- Use passive event listeners (already in code)
- Mobile-first approach
- No breaking changes to existing functionality
- Document any customizations made

**Questions during implementation?**
Refer back to supporting documents before escalating.

---

**Start with:** Task 1.1 in CLAUDE_CODE_IMPLEMENTATION_BRIEF.md

Good luck! 🚀
