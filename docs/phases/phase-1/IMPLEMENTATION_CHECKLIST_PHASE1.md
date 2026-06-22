# MediaBubble Brand Consistency — Phase 1 Implementation Checklist

**Timeline:** 2 Weeks  
**Effort:** 16 hours  
**Status:** READY TO START  
**Budget:** ~$1,200 (if hiring contractor)

---

## Week 1: CSS Variables & Setup

### Day 1-2: File Setup (2 hours)

- [ ] **Create folder structure**

  ```
  wp-content/themes/vault-child/
  ├── css/
  │   └── design-tokens.css  (← NEW FILE)
  └── functions.php (← UPDATE)
  ```

- [ ] **Copy `design-tokens.css` file**
  - Location: `wp-content/themes/vault-child/css/design-tokens.css`
  - File provided: `design-tokens.css` (in your MediaBubble folder)
  - This file contains ALL color, spacing, typography tokens

- [ ] **Update `functions.php`**
  - Add enqueue code from `functions.php-setup.txt`
  - Ensure design-tokens.css loads BEFORE other stylesheets
  - This is critical for CSS variables to work

- [ ] **Verify in WordPress**
  - Dashboard → Appearance → Customize → Additional CSS
  - Paste test code (see functions.php-setup.txt)
  - Should see correct text color applied

### Day 3-4: Elementor Configuration (2 hours)

- [ ] **Update Elementor Global Colors**
  - Dashboard → Elementor → Settings → Colors
  - Add these 5 colors:
    - [ ] Color 1: Primary Yellow (#FFC107)
    - [ ] Color 2: Primary Blue (#2196F3)
    - [ ] Color 3: Dark Blue (#0D3A7D)
    - [ ] Color 4: Text Dark (#1a1a1a)
    - [ ] Color 5: Background Light (#F5F5F5)
  - Remove unnecessary colors (force consistency)
  - Save settings

- [ ] **Test in Elementor Editor**
  - Open any page
  - Create new button
  - Check that primary color shows as yellow
  - Check that secondary shows as blue

### Day 5: Homepage Hero Fix (3 hours)

**CRITICAL: This is the most visible change**

- [ ] **Edit Homepage**
  - Pages → Home (Elementor edit)

- [ ] **Find Hero Section**
  - Usually top of page
  - Currently has white background

- [ ] **Fix Hero Background**
  - Remove white background color
  - Add custom CSS: `background-color: var(--color-dark-blue);`

  OR in Elementor:
  - Advanced → Custom CSS
  - Paste: `.elementor-section { background-color: var(--color-dark-blue); }`

- [ ] **Fix Hero Text Color**
  - Select heading
  - Set text color to white
  - Set subtitle text color to light gray

- [ ] **Fix CTA Button**
  - Select "Get in Touch" button
  - Change to Primary Yellow color (#FFC107)
  - Height: 44px minimum
  - Padding: 20px horizontal
  - Font: Semibold

- [ ] **Test on Desktop**
  - View page
  - Hero should have dark blue background
  - Text should be white/light
  - Button should be bright yellow
  - Button should have hover effect (slight transparency)

- [ ] **Test on Mobile**
  - View on mobile (resize browser)
  - Should be readable
  - Button should be touchable (44px+ height)
  - No horizontal scroll

- [ ] **Save and Publish**
  - Publish changes
  - Check live site (may need cache clear)

---

## Week 2: Apply to All Pages & Refinements

### Day 6-7: Services Section (2 hours)

- [ ] **Edit Services Section**
  - Find services cards area
  - Add CSS class: `py-xl` to section
  - This adds 48px padding top/bottom

- [ ] **Fix Service Cards**
  - Each card should have:
    - [ ] White background
    - [ ] Box shadow (medium)
    - [ ] 32px padding inside (p-lg)
    - [ ] 12px border-radius
    - [ ] Hover: larger shadow

- [ ] **Fix Service Card Buttons**
  - Should be: Secondary button (blue outline)
  - Color: Primary Blue (#2196F3)
  - Not yellow (yellow = primary CTA only)

- [ ] **Test**
  - Hover over cards (shadow should increase)
  - Buttons should look consistent

### Day 8: Button Fixes Site-wide (2 hours)

**Find and fix ALL "Get in Touch" buttons**

- [ ] **Homepage buttons**
  - [ ] Hero CTA
  - [ ] Why Choose section CTA (if exists)
  - [ ] Bottom CTA section

- [ ] **Services Page buttons**
  - [ ] All service card buttons
  - [ ] Bottom CTA

- [ ] **Other Pages**
  - [ ] About page CTA
  - [ ] Contact page (button if exists)
  - [ ] Footer CTA (if exists)

**Button fixes:**

- Primary CTAs → Yellow (#FFC107)
- Secondary CTAs → Blue outline (#2196F3)
- All buttons → 44px height minimum
- All buttons → 20px horizontal padding

### Day 9-10: Section Spacing Fixes (3 hours)

Apply spacing grid to all sections:

- [ ] **Hero Section**
  - Apply: `py-3xl` (80px top/bottom padding)

- [ ] **Why Choose Section**
  - Apply: `py-xl` (48px top/bottom padding)
  - Apply: `px-lg` (32px left/right padding)

- [ ] **Client Logos Section**
  - Apply: `py-lg` (32px top/bottom padding)

- [ ] **Services Section**
  - Apply: `py-xl` (48px top/bottom padding)

- [ ] **Results/Benefits Section**
  - Apply: `py-3xl` (80px top/bottom padding)

- [ ] **FAQ Section**
  - Apply: `py-xl` (48px top/bottom padding)

- [ ] **CTA Section**
  - Apply: `py-2xl` (64px top/bottom padding)

**How to apply classes in Elementor:**

1. Select section
2. Go to Advanced
3. Find "CSS Classes" field
4. Add class (e.g., `py-xl`)
5. Save

### Day 11: Typography Fixes (2 hours)

**Ensure consistent text hierarchy**

- [ ] **Headings**
  - H1: Should be 48px (check with browser dev tools)
  - H2: Should be 36px
  - H3: Should be 28px

- [ ] **Body Text**
  - Standard text: 16px
  - Small text: 14px

- [ ] **Text Colors**
  - Primary text: #1a1a1a (dark gray)
  - Secondary text: #666666 (medium gray)
  - Light text: #999999 (light gray)
  - Inverse text: #FFFFFF (white on dark backgrounds)

**How to fix:**

- Select text element
- Go to Style
- Set font size and color
- OR add CSS class: `.text-h1`, `.text-h2`, etc.

### Day 12: Testing & QA (1.5 hours)

- [ ] **Visual Consistency Check**
  - [ ] All CTA buttons are yellow
  - [ ] All secondary buttons are blue
  - [ ] Button heights are consistent (44px)
  - [ ] Section spacing follows grid (multiples of 8px)
  - [ ] Typography hierarchy is clear
  - [ ] Card shadows are consistent
  - [ ] Hero background is dark blue

- [ ] **Mobile Testing**
  - [ ] Hero is readable on mobile
  - [ ] Buttons are 44px+ height (touch-friendly)
  - [ ] Text sizes are readable
  - [ ] No horizontal scroll
  - [ ] Sections have proper padding on mobile

- [ ] **Browser Testing**
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Mobile Safari (iPhone)
  - [ ] Chrome Mobile (Android)

- [ ] **Cache Clearing**
  - [ ] Clear browser cache
  - [ ] Clear WordPress cache (if using cache plugin)
  - [ ] Clear Elementor cache (Dashboard → Elementor → Settings → Cache)

- [ ] **Final Check**
  - [ ] No console errors
  - [ ] No broken images
  - [ ] All links work
  - [ ] Forms work correctly

### Day 13-14: Team Handoff (1.5 hours)

- [ ] **Document Changes**
  - What was changed
  - Why it was changed
  - How to maintain consistency going forward

- [ ] **Train Team**
  - Share design-tokens.css overview
  - Explain CSS variables concept
  - Show how to use spacing classes
  - Explain button variants
  - Share quick reference (in Brand_Consistency_Implementation_Guide.md)

- [ ] **Create Guidelines Document for Team**
  - [ ] When to use primary vs secondary buttons
  - [ ] Which spacing class to use
  - [ ] How to test changes
  - [ ] How to report brand issues

- [ ] **Create Feedback Process**
  - Where to report inconsistencies
  - Who to escalate to
  - How often to review

---

## Files You'll Need

### 1. `design-tokens.css`

- **Location:** `wp-content/themes/vault-child/css/design-tokens.css`
- **What it is:** All CSS variables for colors, spacing, typography
- **Provided:** ✅ (in your MediaBubble folder)

### 2. `functions.php` Updates

- **Location:** `wp-content/themes/vault-child/functions.php`
- **What to add:** Enqueue code from `functions.php-setup.txt`
- **Provided:** ✅ (see functions.php-setup.txt)

### 3. Reference Documents

- **Brand_Consistency_Implementation_Guide.md** - Step-by-step details
- **MediaBubble_Brand_Consistency_Audit.md** - Full context & rationale
- **IMPLEMENTATION_CHECKLIST_PHASE1.md** - This file!

---

## Quick Reference: CSS Classes

### Spacing Classes

```
.py-lg    → 32px padding top/bottom
.py-xl    → 48px padding top/bottom
.py-2xl   → 64px padding top/bottom
.py-3xl   → 80px padding top/bottom
.px-lg    → 32px padding left/right
.mb-md    → 24px margin bottom
```

### Button Classes

```
.btn-primary    → Yellow button
.btn-secondary  → Blue outline button
.btn-text       → Text-only button
.btn-sm         → Small button (36px)
.btn-md         → Medium button (44px)
.btn-lg         → Large button (52px)
```

### Text Classes

```
.text-h1        → 48px heading
.text-h2        → 36px heading
.text-h3        → 28px heading
.text-body      → 16px body text
.text-primary   → Dark gray text
.text-inverse   → White text
```

### Section Classes

```
.section        → Standard section with padding
.section-dark   → Dark blue background + white text
.section-light  → Light gray background
```

---

## Common Issues & Fixes

### Issue: Buttons Still Gray After Changes

**Solution:**

1. Verify functions.php was updated
2. Clear browser cache (Cmd+Shift+R)
3. Clear WordPress cache if using cache plugin
4. Check page source to see if design-tokens.css is loaded
5. Remove any Elementor inline button color styles

### Issue: Spacing Doesn't Look Right

**Solution:**

1. Make sure you're using correct class names (.py-xl not .padding-xl)
2. Remove any Elementor custom padding on the section
3. Check mobile breakpoints (may be different on mobile)
4. Verify CSS classes are applied to correct element (section, not column)

### Issue: Hero Background Still White

**Solution:**

1. Select hero section
2. Remove any background color in Elementor style panel
3. Add CSS class: `section-dark`
4. Or add custom CSS: `background-color: var(--color-dark-blue);`
5. Clear cache and refresh

### Issue: Colors Don't Match Brand Palette

**Solution:**

1. Check that design-tokens.css is loaded (view page source)
2. Don't use custom colors in Elementor (use global palette)
3. Always pick "Primary Yellow" for CTAs, not custom color
4. Never hardcode colors—use CSS variables

---

## Success Metrics

After Phase 1, you should see:

| Metric              | Before    | After                      |
| ------------------- | --------- | -------------------------- |
| Color consistency   | ~30%      | >90%                       |
| Button appearance   | Varied    | Consistent (all yellow)    |
| Spacing consistency | Ad-hoc    | Grid-based (8px multiples) |
| Time to edit page   | 4 hours   | 1.5 hours                  |
| Brand feel          | Scattered | Cohesive                   |

---

## Budget Breakdown

| Task                   | Hours        | Cost (@$75/hr) |
| ---------------------- | ------------ | -------------- |
| Setup & configuration  | 4            | $300           |
| Homepage fixes         | 3            | $225           |
| Services section       | 2            | $150           |
| Button fixes site-wide | 2            | $150           |
| Spacing fixes          | 3            | $225           |
| Typography             | 2            | $150           |
| Testing & QA           | 1.5          | $112.50        |
| Team handoff           | 1.5          | $112.50        |
| **TOTAL**              | **16 hours** | **$1,425**     |

_If doing in-house, adjust hourly rate accordingly_

---

## Next Steps After Phase 1

✅ Phase 1 Complete (2 weeks) → 70% brand improvement

**Then move to Phase 2:**

- Finalize design tokens documentation
- Create Storybook for component library
- Document for team
- Plan React migration

**Timeline:** Next 4 weeks

---

## Questions?

Refer to:

1. **brand_consistency_implementation_guide.md** - Details for each task
2. **mediabubble_brand_consistency_audit.md** - Why each change matters
3. **design-tokens.css** - All token definitions
4. **functions.php-setup.txt** - Code snippets ready to copy/paste

---

## Sign-Off

**Phase 1 Status:** 🟢 READY TO IMPLEMENT  
**Start Date:** [TODAY]  
**Target Completion:** [14 DAYS]  
**Owner:** [YOUR NAME]  
**Stakeholder:** Yasser Dorgham

---

**Let's make MediaBubble's brand consistent! 🚀**
