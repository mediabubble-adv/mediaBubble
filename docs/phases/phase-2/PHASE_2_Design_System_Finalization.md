# Phase 2: Design System Finalization & Storybook

**Timeline:** 4 Weeks (After Phase 1 completion)  
**Effort:** 32 hours  
**Status:** PLANNING  
**Goal:** Document design system + prepare for React migration

---

## Overview

Once Phase 1 is complete (70% brand consistency achieved), Phase 2 focuses on **formalizing the design system** so it's ready for Phase 3 (React migration).

**Key Deliverables:**
1. Design tokens finalized as documentation
2. Component library specs (buttons, cards, sections)
3. Storybook instance (living documentation)
4. Team design system guide
5. React migration architecture ready

---

## Week 1: Design Tokens Documentation

### Task 1: Finalize Token Definitions (4 hours)

**Create:** `DESIGN_TOKENS_REFERENCE.md`

```markdown
# MediaBubble Design Tokens Reference

## Colors

### Brand Colors
- **Primary Yellow:** #FFC107
  - Usage: Primary CTAs, highlights, accents
  - Contrast: ✓ WCAG AAA against dark text
  - Alternatives: None (use only this yellow)

- **Primary Blue:** #2196F3
  - Usage: Secondary CTAs, links, hover states
  - Contrast: ✓ WCAG AAA against white
  - Alternatives: None (use only this blue)

- **Dark Blue:** #0D3A7D
  - Usage: Headers, footers, dark backgrounds, text on light
  - Contrast: ✓ WCAG AAA against white text
  - Alternatives: None (use only this dark blue)

### Semantic Colors
- **Success:** #4CAF50 - Form validation, success messages
- **Warning:** #FF9800 - Warning states, caution
- **Error:** #F44336 - Errors, destructive actions
- **Info:** #2196F3 - Information, help text

## Spacing Scale

All spacing is based on **8px base unit**

| Token | Value | Use Case |
|-------|-------|----------|
| xs | 8px | Micro spacing, icon gaps |
| sm | 16px | Button padding, small gaps |
| md | 24px | Component padding, text gaps |
| lg | 32px | Section padding, card spacing |
| xl | 48px | Large section padding |
| 2xl | 64px | Extra large spacing |
| 3xl | 80px | Hero section padding |

## Typography

### Font Family
- **Base:** System font stack (Inter preferred in React)
- **Mono:** Courier New (code blocks)

### Font Sizes
- H1: 48px (desktop), 36px (mobile)
- H2: 36px (desktop), 28px (mobile)
- H3: 28px
- H4: 24px
- Body: 16px
- Small: 14px
- Caption: 12px

### Line Heights
- Headings: 1.2
- Body: 1.6
- Captions: 1.5

### Font Weights
- Light: 300 (rarely used)
- Normal: 400 (body text)
- Semibold: 600 (headings, emphasis)
- Bold: 700 (strong emphasis)

## Components

### Buttons
- **Primary (Yellow)**
  - Background: #FFC107
  - Text: #1a1a1a
  - Height: 44px
  - Padding: 20px horizontal, 12px vertical
  - Border radius: 8px
  - Shadow: md (normal), lg (hover)

- **Secondary (Blue)**
  - Background: transparent
  - Border: 2px solid #2196F3
  - Text: #2196F3
  - Height: 44px
  - Padding: 20px horizontal, 12px vertical
  - Border radius: 8px

- **Text (No Background)**
  - Background: transparent
  - Text: #2196F3
  - Hover: underline
  - No padding on sides

### Cards
- Background: white
- Border radius: 12px
- Padding: 32px
- Shadow: md (normal), lg (hover)
- Border: none

### Sections
- Padding: 80px top/bottom (xl spacing)
- Mobile: 32px top/bottom (lg spacing)
- Dark sections: #0D3A7D background
- Light sections: #F5F5F5 background

## Breakpoints
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px
```

### Task 2: Create Component Specifications (6 hours)

**Create:** `COMPONENT_SPECIFICATIONS.md`

Document each component with:
- Visual spec (dimensions, spacing)
- Props/variants
- States (normal, hover, active, disabled)
- Accessibility notes
- Code example

**Components to document:**
1. Button (3 variants)
2. Card (basic, elevated)
3. Input/Form field
4. Link
5. Badge
6. Modal/Dialog
7. Navigation (header, footer)
8. Hero section
9. CTA section
10. Testimonial card
11. Service card
12. FAQ item

Example:

```markdown
## Button Component

### Variants
1. Primary (Yellow)
2. Secondary (Blue)
3. Text (No background)

### Sizes
1. Small (36px height)
2. Medium (44px height) - DEFAULT
3. Large (52px height)

### States
- **Normal:** Base styling
- **Hover:** Opacity 0.9, shadow increased
- **Active:** Opacity 0.8
- **Disabled:** Opacity 0.5, cursor: not-allowed
- **Loading:** (React only) Show spinner

### Accessibility
- Minimum 44px touch target (mobile)
- Contrast ratio ≥ 4.5:1
- Focus state: 2px outline, 2px offset
- ARIA: button role, aria-label if icon-only

### Code Example (React)
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Get Started
</Button>
```

### CSS Classes (Elementor)
- `.btn` (base)
- `.btn-primary` (variant)
- `.btn-md` (size)
```

### Task 3: Accessibility Audit (4 hours)

**Create:** `ACCESSIBILITY_AUDIT.md`

Check all components for:
- Color contrast (WCAG AAA)
- Touch targets (44px minimum)
- Focus states
- ARIA labels
- Keyboard navigation
- Screen reader testing

Result: Audit report with pass/fail for each component

### Task 4: Responsive Design Specs (4 hours)

**Create:** `RESPONSIVE_SPECIFICATIONS.md`

Document behavior at each breakpoint:

```markdown
## Responsive Behavior

### Desktop (1024px+)
- Full-width sections
- 3-4 column grids
- Full navigation visible
- Large text sizes

### Tablet (768px - 1023px)
- 2 column grids
- Reduced padding (24px instead of 32px)
- Navigation: hamburger menu
- Text sizes: medium

### Mobile (< 768px)
- 1 column layout
- Minimum padding (16px)
- Full-width buttons
- Text sizes: small to medium
- Large touch targets (44px+)

### Testing
- iPhone 12 (390px)
- iPhone SE (375px)
- iPad (768px)
- iPad Pro (1024px)
```

---

## Week 2: Storybook Setup

### Task 1: Storybook Installation (2 hours)

**For React preparation:**

```bash
# Install Storybook
npx storybook init

# Or with Vite template (recommended for MediaBubble)
npx create-storybook --template vite
```

**Configure:**
- Theme matching brand (dark blue + yellow)
- Addon documentation
- Accessibility addon
- Viewport addon

### Task 2: Component Stories (6 hours)

Create stories for each component:

```typescript
// Button.stories.tsx
import { Button } from '@/components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'text'],
      control: 'radio',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: 'radio',
    },
    disabled: { control: 'boolean' },
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Primary Button',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Secondary Button',
  },
};

export const Text = {
  args: {
    variant: 'text',
    size: 'md',
    children: 'Text Button',
  },
};

export const Disabled = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Disabled Button',
    disabled: true,
  },
};
```

### Task 3: Storybook Documentation (4 hours)

Add to each story:
- Description of purpose
- Usage guidelines
- Do's and don'ts
- Accessibility notes
- Code examples

**Example:**

```markdown
# Button

## Purpose
Primary interactive element for user actions. Available in three variants 
for different hierarchy levels.

## Usage
- **Primary:** Main calls-to-action (yellow)
- **Secondary:** Secondary actions (blue outline)
- **Text:** Tertiary actions (text only)

## Do's
✓ Use consistent sizing across page
✓ Label buttons with action verbs
✓ Provide adequate spacing around buttons
✓ Use primary for most important action

## Don'ts
✗ Don't use multiple primary buttons
✗ Don't resize buttons erratically
✗ Don't use vague labels ("Click here")
✗ Don't rely on color alone for meaning

## Accessibility
- Minimum 44px height for touch
- Clear focus state
- Label text must be descriptive
- No keyboard traps
```

---

## Week 3: Component Library Documentation

### Task 1: Create Usage Guide (6 hours)

**Create:** `COMPONENT_USAGE_GUIDE.md`

For designers and developers:

```markdown
# Component Usage Guide

## When to Use Each Component

### Button Component
- Primary action on a page (yellow)
- Secondary action (blue)
- Tertiary action (text)

### Card Component
- Display related content
- Group similar items
- Show preview information

### Section Component
- Define content boundaries
- Control spacing between sections
- Dark vs light background choice

### Hero Component
- Page introduction
- Large visual impact
- Primary CTA

### Form Fields
- Text input
- Email input
- Textarea
- Select dropdown
- Checkbox/Radio

## Best Practices

### Spacing
- Never hardcode spacing—use token scale
- Mobile: reduce by one size (lg → md)
- Desktop: can use larger (xl → 2xl)

### Colors
- Never use custom colors
- Always pick from brand palette
- Yellow = primary only
- Blue = secondary actions

### Typography
- Use hierarchy consistently
- Don't skip heading levels (H1 → H3 is bad)
- Maintain line height (1.6 for body)
- Consider contrast on all backgrounds

### Buttons
- Label with action verb ("Submit", "Learn More")
- 44px minimum height
- Consistent padding
- Never place multiple primary buttons
```

### Task 2: Design System Principles Document (4 hours)

**Create:** `DESIGN_SYSTEM_PRINCIPLES.md`

```markdown
# MediaBubble Design System Principles

## 1. Consistency
Every component follows the same rules. Colors, spacing, and typography
are predictable across the entire site.

## 2. Scalability
The system grows with the product. New components follow existing patterns,
not create exceptions.

## 3. Accessibility First
All components are designed for WCAG AAA compliance. Colors have sufficient
contrast, touch targets are 44px+, keyboard navigation works.

## 4. Intentional Spacing
All spacing uses the 8px grid. No random padding/margins. Consistency = 
predictability = professionalism.

## 5. Semantic Naming
Component names describe purpose, not appearance. "Primary Button" not 
"Yellow Button". "Error Message" not "Red Box".

## 6. Mobile-First Design
Design mobile first, enhance for desktop. Every component works on the
smallest screen.

## 7. Performance Matters
Design system aids performance. Reusable components = smaller bundle size.
CSS variables = dynamic themes without rebuilding.

## 8. Documentation Over Configuration
System is documented so anyone can use it. Not memorized configuration.
```

---

## Week 4: Team Training & Handoff

### Task 1: Create Team Playbook (4 hours)

**Create:** `DESIGN_SYSTEM_PLAYBOOK.md`

Practical guide for team:

```markdown
# Design System Playbook

## For Designers

### When Building a Page
1. Use Figma library with components
2. Build with tokens (not custom colors)
3. Respect spacing grid (8px multiples)
4. Check accessibility (contrast, size)
5. Test on mobile view
6. Handoff to developer with specs

### Common Tasks
- **Creating a new page:** Start with hero template
- **Adding a CTA:** Use primary button (yellow)
- **Grouping content:** Use card component
- **Dark section:** Use dark blue background
- **Large text area:** Use hero section

## For Developers

### When Building a Component
1. Import from component library
2. Use design tokens (never hardcode colors)
3. Use spacing classes (.py-xl not custom padding)
4. Test keyboard navigation
5. Test on multiple devices
6. Add accessibility attributes

### Common Tasks
- **Styling a button:** Use .btn-primary
- **Section padding:** Use .py-3xl
- **Text color:** Use --color-text-primary
- **Spacing between elements:** Use .mb-lg
- **Card styling:** Use .card class

## For PMs/Stakeholders

### Understanding the System
- **Design tokens:** Reusable design building blocks
- **Component library:** Pre-built, tested pieces
- **Storybook:** Living documentation of all components
- **Playbook:** How to use the system correctly

### Benefits
- Faster page builds (50% time reduction)
- Consistent brand experience
- Easier maintenance (update once, changes everywhere)
- Better quality (tested components)
- Faster onboarding for new team members
```

### Task 2: Create Training Materials (4 hours)

**Create:**
- Slide deck (PDF/Keynote)
- Video walkthroughs (optional)
- Quick reference cards
- FAQ document

**Topics:**
- What is a design system?
- How to use the tokens
- How to build with components
- When to create new component vs use existing
- How to request changes
- Accessibility checklist

### Task 3: Setup Design System Repository (2 hours)

Create folder structure:

```
mediabubble-design-system/
├── README.md
├── CONTRIBUTING.md
├── tokens/
│   ├── colors.json
│   ├── spacing.json
│   ├── typography.json
│   └── theme.json
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   └── Button.md
│   ├── Card/
│   ├── ...
├── docs/
│   ├── DESIGN_TOKENS_REFERENCE.md
│   ├── COMPONENT_SPECIFICATIONS.md
│   ├── DESIGN_SYSTEM_PRINCIPLES.md
│   ├── ACCESSIBILITY_AUDIT.md
│   └── PLAYBOOK.md
└── storybook/
    ├── .storybook/
    ├── stories/
    └── preview.js
```

### Task 4: Team Launch Meeting (2 hours)

Hold 1-2 hour meeting with design + dev team:
- [ ] Overview of design system
- [ ] Demo of Storybook
- [ ] Walkthrough of playbook
- [ ] Q&A
- [ ] Assign design system owner
- [ ] Set feedback/update process

---

## Deliverables Checklist

### Documentation (6 documents)
- [ ] DESIGN_TOKENS_REFERENCE.md (colors, spacing, typography)
- [ ] COMPONENT_SPECIFICATIONS.md (button, card, form, etc.)
- [ ] ACCESSIBILITY_AUDIT.md (WCAG compliance report)
- [ ] RESPONSIVE_SPECIFICATIONS.md (breakpoint behavior)
- [ ] DESIGN_SYSTEM_PRINCIPLES.md (philosophy)
- [ ] DESIGN_SYSTEM_PLAYBOOK.md (how to use)

### Storybook Instance
- [ ] Installed and configured
- [ ] All components have stories
- [ ] All stories documented
- [ ] Accessibility addon enabled
- [ ] Deployed (GitHub Pages or Vercel)

### Training Materials
- [ ] Slide deck (PDF)
- [ ] Video walkthroughs (optional)
- [ ] Quick reference cards
- [ ] FAQ document

### Team Readiness
- [ ] Team trained on system
- [ ] Design system owner assigned
- [ ] Feedback process established
- [ ] Update schedule defined

---

## Success Metrics

| Metric | Goal |
|--------|------|
| Design system documentation | 100% of components documented |
| Storybook coverage | 100% of components have stories |
| Team adoption | 80%+ using system for new work |
| Consistency | >95% adherence to tokens/components |
| Time savings | 40% faster page builds |

---

## Budget

| Task | Hours | Cost (@$75/hr) |
|------|-------|----------------|
| Token documentation | 8 | $600 |
| Component specs | 10 | $750 |
| Accessibility audit | 4 | $300 |
| Storybook setup | 12 | $900 |
| Team documentation | 8 | $600 |
| Training materials | 4 | $300 |
| **TOTAL** | **32 hours** | **$2,400** |

---

## Timeline

```
Week 1: Design Tokens Documentation
├── Token definitions (4h)
├── Component specs (6h)
├── Accessibility audit (4h)
└── Responsive specs (4h)

Week 2: Storybook Setup
├── Install & configure (2h)
├── Component stories (6h)
└── Storybook docs (4h)

Week 3: Component Library Documentation
├── Usage guide (6h)
└── Principles document (4h)

Week 4: Team Training
├── Playbook (4h)
├── Training materials (4h)
├── Repository setup (2h)
└── Launch meeting (2h)
```

---

## Next: Phase 3 (React Migration)

After Phase 2 complete, you'll have:
- ✅ Documented design system
- ✅ Team trained
- ✅ Storybook as reference
- ✅ Component specs ready
- ✅ Architecture planned

**Ready to start React build in Phase 3!**

See: `PHASE_3_REACT_MIGRATION.md`
