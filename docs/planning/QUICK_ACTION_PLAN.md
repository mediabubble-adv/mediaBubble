# MediaBubble Phase 1: 14-Day Action Plan
## Ready-to-Execute Implementation Guide

**Timeline:** 14 days  
**Effort:** 16 hours (1 developer, full-time for 2 weeks)  
**Budget:** $1,200  
**Deliverable:** 70% brand consistency on WordPress

---

## Pre-Launch Checklist (Day 0)

Before starting, confirm:

- [ ] Designer/developer assigned and available (full 2 weeks)
- [ ] WordPress access confirmed (admin account ready)
- [ ] Staging environment available (test before production)
- [ ] Backup scheduled (backup site before making changes)
- [ ] Git/version control ready (track changes)
- [ ] Team notified (they'll see changes)

---

## Day 1-2: Setup (4 Hours)

### Task 1.1: Create CSS Folder (30 min)
```
WordPress folder structure:
wp-content/themes/vault-child/
├── css/ (CREATE THIS FOLDER if it doesn't exist)
├── functions.php
├── style.css
└── ...
```

### Task 1.2: Copy design-tokens.css (30 min)
- File: `/Users/Dorgham/Documents/Work/Devleopment/mediiabubble Main/design-tokens.css`
- Copy to: `wp-content/themes/vault-child/css/design-tokens.css`
- Verify file uploaded correctly

### Task 1.3: Update functions.php (2 hours)
- File: `wp-content/themes/vault-child/functions.php`
- Follow instructions in `functions.php-setup.txt`
- Add enqueue code
- Save file
- Clear WordPress cache

### Task 1.4: Verify in Browser (1 hour)
- Open WordPress Dashboard
- Go to: Appearance → Customize → Additional CSS
- Paste test code (see below)
- Should see correct styling applied
- **Troubleshoot if needed**

**Test code to paste:**
```css
body {
  --color-brand-yellow: #FFC107;
  color: #1a1a1a;
}

.test-color {
  background: var(--color-brand-yellow);
  padding: 20px;
  color: white;
  border-radius: 8px;
  margin: 10px 0;
}
```

Then in HTML, add test element:
```html
<div class="test-color">If background is YELLOW and text is white, setup works!</div>
```

---

## Day 3-4: Elementor Configuration (3 Hours)

### Task 2.1: Update Global Colors (1.5 hours)
1. Dashboard → Elementor → Settings
2. Find "Colors" section
3. Click "Add Color" or edit existing palette
4. Add these 5 colors:

| Name | Hex Code | Usage |
|------|----------|-------|
| Primary Yellow | #FFC107 | Primary CTAs |
| Primary Blue | #2196F3 | Secondary CTAs |
| Dark Blue | #0D3A7D | Headers, footers |
| Text Dark | #1a1a1a | Body text |
| Background Light | #F5F5F5 | Light backgrounds |

5. Remove other colors (optional but recommended)
6. Save settings

### Task 2.2: Test in Elementor (1.5 hours)
- Open any page in Elementor editor
- Create new button
- Check that primary color shows as yellow
- Check that secondary shows as blue
- Delete test button
- Check other pages briefly

---

## Day 5: Homepage Hero Fix (3 Hours) ⭐ MOST VISIBLE CHANGE

**This is the most important fix. Users will see this immediately.**

### Task 3.1: Open Homepage (30 min)
- Pages → Home
- Click "Edit with Elementor"
- Find hero section (top of page)
- Note current appearance

### Task 3.2: Fix Background Color (1 hour)
**Current:** White background  
**Target:** Dark blue background (#0D3A7D)

Option A (Recommended - using CSS class):
1. Select hero section
2. Go to Advanced
3. Find "CSS Classes" field
4. Add: `section-dark`
5. Save

Option B (Using custom CSS):
1. Select hero section
2. Go to Advanced → Custom CSS
3. Paste:
```css
.elementor-section {
  background-color: var(--color-dark-blue) !important;
}
```
4. Save

### Task 3.3: Fix Text Color (1 hour)
- Select heading text
- Change color to white (or use `.text-inverse` class)
- Select subtitle
- Change color to light gray

### Task 3.4: Fix Button Color (30 min)
- Find "Get in Touch" button in hero
- Change button color to Primary Yellow (#FFC107)
- Set button height to 44px (minimum)
- Set button padding: 20px horizontal
- Add hover effect (opacity 0.9)
- Save and preview

### Task 3.5: Test & Verify (15 min)
- View page on desktop
- View page on mobile
- Check button is clickable
- Check text is readable
- **Button should be bright yellow**
- **Background should be dark blue**
- **Text should be white**

---

## Day 6: CTA Button Fixes Across Site (2 Hours)

**Find all "Get in Touch" buttons and make them yellow**

### Task 4.1: Find All CTAs (30 min)
Search dashboard for all pages with "Get in Touch" button:
- [ ] Homepage (already fixed)
- [ ] Services page
- [ ] About page
- [ ] Contact page
- [ ] Any other pages

Make a list of pages and sections.

### Task 4.2: Update Each Button (1.5 hours)
For each "Get in Touch" button found:
1. Edit page with Elementor
2. Select button
3. Change color to Primary Yellow (#FFC107)
4. Set height to 44px minimum
5. Set padding: 20px horizontal
6. Save

**Quick reference:**
- Color: Primary Yellow (#FFC107) OR use global palette "Primary Yellow"
- Height: 44px (mobile touch target size)
- Hover: opacity 0.9 (slightly transparent on hover)

---

## Day 7-9: Spacing Grid Application (4 Hours)

**Apply spacing classes to major sections**

### Task 5.1: Spacing Classes Reference

Keep this handy—you'll use these a lot:

| Class | Padding | Use |
|-------|---------|-----|
| `.py-lg` | 32px top/bottom | Medium sections |
| `.py-xl` | 48px top/bottom | Large sections |
| `.py-2xl` | 64px top/bottom | Extra large |
| `.py-3xl` | 80px top/bottom | Hero/big sections |
| `.px-lg` | 32px left/right | Side padding |

### Task 5.2: Apply to Homepage (1.5 hours)
1. Hero section → Add class: `py-3xl`
2. Why Choose section → Add class: `py-xl`
3. Client Logos → Add class: `py-lg`
4. Services section → Add class: `py-xl`
5. Benefits section → Add class: `py-3xl`
6. CTA section → Add class: `py-2xl`
7. FAQ section → Add class: `py-xl`

**How to apply in Elementor:**
- Select section
- Go to Advanced
- Find "CSS Classes" field
- Type class name (e.g., `.py-xl`)
- Save

### Task 5.3: Apply to Services Page (1.5 hours)
- Service cards section → `py-xl`
- Each service card → `p-lg` (padding inside)
- Button area → `mt-lg` (margin top)

### Task 5.4: Visual Check (1 hour)
- View homepage
- View services page
- Spacing should look consistent
- No "cramped" or "too loose" sections
- Everything uses multiples of 8px

---

## Day 10-11: Typography & Final Fixes (2 Hours)

### Task 6.1: Check Typography (1 hour)
- H1 sizes consistent (48px on desktop, 36px on mobile)
- H2 sizes consistent (36px on desktop, 28px on mobile)
- Body text 16px, readable
- Text colors use defined palette (not random colors)

### Task 6.2: Fix Inconsistencies (1 hour)
- If any text is not #1a1a1a (dark gray), change it
- If any secondary text is not #666666 (medium gray), change it
- If any backgrounds are not white/light gray, standardize

---

## Day 12-13: Testing (2 Hours)

### Task 7.1: Desktop Testing (45 min)
- [ ] Chrome: Full site looks good
- [ ] Firefox: Full site looks good
- [ ] Safari: Full site looks good
- [ ] All buttons are yellow
- [ ] All spacing is consistent
- [ ] No broken images
- [ ] All links work

### Task 7.2: Mobile Testing (45 min)
- [ ] iPhone (375px width): All readable
- [ ] Android (360px width): All readable
- [ ] Buttons are 44px+ (touchable)
- [ ] No horizontal scroll
- [ ] Text sizes readable
- [ ] Form fields work

### Task 7.3: Cache Clearing (15 min)
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Clear WordPress cache (if using cache plugin)
- Clear Elementor cache: Dashboard → Elementor → Settings → Cache
- Re-test to confirm changes show

### Task 7.4: Performance Check (15 min)
- Run Lighthouse (Chrome DevTools → Lighthouse)
- Target: Score 60+ (should improve from current)
- Note any issues for Phase 2

---

## Day 14: Team Training & Documentation (2 Hours)

### Task 8.1: Team Meeting (1 hour)
Gather design + dev team for 1-hour walkthrough:
- What changed and why
- How to use design tokens
- When to use which spacing class
- Where to find documentation
- How to report issues

### Task 8.2: Documentation (30 min)
- Print or share: `Brand_Consistency_Implementation_Guide.md`
- Print or share: `IMPLEMENTATION_CHECKLIST_PHASE1.md`
- Share: Quick reference card (spacing, colors, buttons)

### Task 8.3: Success Verification (30 min)
- [ ] Homepage looks professional
- [ ] All buttons are yellow
- [ ] Spacing is consistent
- [ ] Team understands system
- [ ] Documentation is accessible
- [ ] Can easily add new content

---

## Troubleshooting

### Problem: CSS variables not working
**Solution:**
1. Verify functions.php was updated correctly
2. Check that design-tokens.css is enqueued (view page source)
3. Clear browser cache (Cmd+Shift+R)
4. Check for console errors (F12 → Console)

### Problem: Buttons still look gray
**Solution:**
1. Verify Elementor global colors were updated
2. Check that button color is set to "Primary Yellow"
3. Not using a custom color hardcoded in button
4. Clear Elementor cache

### Problem: Spacing looks wrong
**Solution:**
1. Make sure you're using correct class names (`.py-xl` not `.padding-xl`)
2. Check that no Elementor custom padding is overriding it
3. Verify class is applied to section, not column

### Problem: Changes not showing
**Solution:**
1. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
2. Clear WordPress cache (if using cache plugin)
3. Clear Elementor cache: Dashboard → Elementor → Settings → Cache
4. Reload page fresh

---

## Success Checklist

After 14 days, verify:

- [ ] Homepage hero is dark blue (not white)
- [ ] All "Get in Touch" buttons are brand yellow (#FFC107)
- [ ] Section spacing uses grid classes (py-xl, py-lg, etc.)
- [ ] Typography is consistent across site
- [ ] Mobile view is responsive and readable
- [ ] No console errors
- [ ] Lighthouse score maintained or improved
- [ ] Team trained and confident
- [ ] Documentation accessible to team
- [ ] Maintenance is easier (can point to design tokens)

---

## Timeline Summary

```
Day 1-2:   Setup CSS + functions.php (4h)
Day 3-4:   Elementor configuration (3h)
Day 5:     Homepage hero fix (3h)
Day 6:     CTA button fixes (2h)
Day 7-9:   Spacing grid (4h)
Day 10-11: Typography (2h)
Day 12-13: Testing (2h)
Day 14:    Team training (2h)
───────────────────────────
TOTAL:     16 hours
```

---

## Daily Stand-ups

### Day 1 Stand-up
Status: Setup complete?  
Blockers: Any issues with file access?  
Next: Elementor config

### Day 3 Stand-up
Status: Elementor colors configured?  
Blockers: Can you see colors in Elementor?  
Next: Hero fix

### Day 5 Stand-up
Status: Hero looks dark blue?  
Blockers: Any color issues?  
Next: Button fixes

### Day 7 Stand-up
Status: All buttons yellow?  
Blockers: Any color inconsistencies?  
Next: Spacing application

### Day 10 Stand-up
Status: Spacing looking good?  
Blockers: Any layout issues?  
Next: Testing

### Day 13 Stand-up
Status: All tests passing?  
Blockers: Any mobile issues?  
Next: Team training

---

## Budget Allocation

**2 weeks, 1 developer @ $75/hour:**

| Task | Hours | Cost |
|------|-------|------|
| Setup | 4 | $300 |
| Elementor | 3 | $225 |
| Homepage | 3 | $225 |
| Buttons | 2 | $150 |
| Spacing | 4 | $300 |
| Typography | 2 | $150 |
| Testing | 2 | $150 |
| Training | 2 | $150 |
| **Total** | **16h** | **$1,650** |

*Or $1,200 if contractor discounts for 2-week commitment*

---

## What Happens After Day 14?

### Immediate (Day 15+)
- Design + dev team can use system for new content
- Maintenance becomes easier (point to design tokens)
- New pages follow brand standards automatically

### Week 3-4
- Evaluate Phase 1 results
- Decide on Phase 2 (design system finalization)
- Plan Phase 3 (React migration) if wanted

### Month 2+
- Implement Phase 2 if approved
- Formalize design system
- Plan Phase 3 build

---

## Success Story (What You'll Tell Others)

"In 2 weeks and $1,200, we transformed our brand consistency from 30% to 70%. Every new page automatically follows our guidelines. Our team is more confident and maintenance is easier. We're now planning the full modernization (React) for Q3."

---

## Resources

**All files in your MediaBubble folder:**
- ✅ `design-tokens.css` (copy this to WordPress)
- ✅ `functions.php-setup.txt` (copy/paste code)
- ✅ `Brand_Consistency_Implementation_Guide.md` (reference)
- ✅ `IMPLEMENTATION_CHECKLIST_PHASE1.md` (detailed steps)
- ✅ `MASTER_ROADMAP.md` (bigger picture)

---

**READY TO LAUNCH. Follow this 14-day plan and you'll have a professional, consistent brand.** 🚀
