# 🚀 FINAL COMPREHENSIVE CLAUDE CODE MASTER PLAN

**Date:** June 9, 2026  
**Purpose:** Complete app audit, modifications, and implementation  
**Duration:** 4-5 weeks (80-100 hours total)  
**Status:** Ready to Execute with Claude Code

---

## 📊 WHAT YOU NOW HAVE

### Complete Documentation Package:
1. ✅ **MEDIABUBBLE_APP_AUDIT_REPORT.md** — Full audit with 24 recommendations
2. ✅ **IMPLEMENTATION_PRIORITIES.md** — Quick reference guide
3. ✅ **CLAUDE_CODE_IMPLEMENTATION_PROMPT.md** — 15 copy-paste prompts
4. ✅ **QUICK_START_GUIDE.md** — Step-by-step execution
5. ✅ **APP_MODIFICATIONS_PLAN.md** — Language, sidebar, alignment specs
6. ✅ **EXECUTION_SUMMARY.md** — Overview and task tracking
7. ✅ **This file** — Master plan with all 30+ prompts

---

## 🎯 THE COMPLETE 5-PHASE EXECUTION PLAN

### PHASE 1A: LANGUAGE & LOCALIZATION (Week 1)

**What:** Add Arabic (Masri) & English language support  
**Time:** 4-6 hours  
**Prompts:** 3 sub-prompts

#### Prompt 1A.1: Set Up i18n Infrastructure
```
You are setting up internationalization for MediaBubble React app.

OBJECTIVE:
Create complete i18n setup for Arabic (Masri) & English language support 
with proper RTL (right-to-left) support.

REQUIREMENTS:
1. Install dependencies:
   npm install i18next react-i18next i18next-browser-languagedetector i18next-http-backend
   npm install tailwindcss-rtl

2. Create directory structure:
   src/locales/
   ├── en/
   │   └── translation.json
   └── ar/
       └── translation.json

3. Create src/i18n/config.ts with:
   - i18next configuration
   - Language detection
   - Backend setup
   - Initialization code

4. Create src/i18n/useLanguage.ts hook:
   - useLanguage() hook for components
   - Language switching function
   - RTL/LTR detection
   - localStorage persistence

5. Update tailwind.config.js:
   - Add tailwindcss-rtl plugin
   - Enable direction: true
   - Add RTL utilities

DELIVERABLES:
- src/i18n/config.ts (fully configured)
- src/i18n/useLanguage.ts (custom hook)
- src/locales/en/translation.json (empty template)
- src/locales/ar/translation.json (empty template)
- tailwind.config.js (updated with RTL)
- README explaining setup

VERIFICATION:
✓ i18next initializes without errors
✓ Hook works in components
✓ localStorage saves language preference
✓ RTL/LTR switching works
✓ No console errors
```

#### Prompt 1A.2: Create Language Switcher Component
```
You are creating a language switcher component for MediaBubble.

OBJECTIVE:
Build accessible language switcher that toggles between English and Arabic.

REQUIREMENTS:
1. Create src/components/LanguageSwitcher.tsx:
   - Display current language (EN / العربية)
   - Toggle button
   - Apply RTL to document
   - Update localStorage
   - Persist across page reloads

2. Styling:
   - Use design tokens (no hardcoded colors)
   - Mobile responsive
   - Accessible (proper button semantics)
   - Smooth transitions

3. Behavior:
   - Click to toggle language
   - Update document.documentElement.dir (ltr/rtl)
   - Update document.documentElement.lang
   - Trigger i18next language change
   - Show current language clearly

4. Accessibility:
   - aria-label="Toggle language"
   - Keyboard navigable (Tab, Enter)
   - Focus indicator visible
   - Semantic <button> element

DELIVERABLES:
- src/components/LanguageSwitcher.tsx
- LanguageSwitcher.stories.tsx (Storybook)
- LanguageSwitcher.test.tsx (unit tests)

EXAMPLE USAGE:
```tsx
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export function Header() {
  return (
    <header>
      <Logo />
      <LanguageSwitcher />
    </header>
  )
}
```

VERIFICATION:
✓ Toggle switches language
✓ Document direction changes (dir="rtl" ↔ dir="ltr")
✓ Language persists on reload
✓ Accessible with keyboard
✓ Works on mobile
```

#### Prompt 1A.3: Populate Translation Files
```
You are populating translation files for MediaBubble.

OBJECTIVE:
Create comprehensive translation files for all UI text in English and Arabic Masri.

STRUCTURE (locales/en/translation.json):
{
  "common": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "portfolio": "Portfolio",
    "blog": "Blog",
    "contact": "Contact",
    "getAudit": "Get Your Free Audit",
    "learnMore": "Learn More",
    "viewCaseStudies": "View Case Studies"
  },
  "nav": {
    "home": "Home",
    "about": "About Us",
    "services": "Services",
    "portfolio": "Our Work",
    "blog": "News & Insights",
    "contact": "Get in Touch"
  },
  "hero": {
    "home": {
      "title": "Hurghada's #1 Marketing Agency",
      "subtitle": "From strategy to execution—we turn local businesses into market leaders",
      "description": "With 500+ successful projects and 92% client retention, we deliver results. Our integrated services combine strategic consulting, creative excellence, and technical expertise to build your brand and drive growth.",
      "proof1": "35% average client growth in 12 months",
      "proof2": "92% client retention rate",
      "proof3": "500+ successful projects delivered"
    }
  },
  "services": {
    "seo": {
      "title": "Rank Higher, Get More Customers",
      "description": "Get found by people actively searching for your services..."
    },
    "ppc": {
      "title": "Reach Customers Ready to Buy",
      "description": "Skip the waiting and get visible immediately..."
    }
  },
  "cta": {
    "primary": "Get Your Free Strategy Audit",
    "secondary": "View Case Studies"
  }
}
```

STRUCTURE (locales/ar/translation.json):
{
  "common": {
    "home": "الرئيسية",
    "about": "معلومات عنا",
    "services": "الخدمات",
    "portfolio": "أعمالنا",
    "blog": "المدونة",
    "contact": "اتصل بنا",
    "getAudit": "احصل على تدقيق مجاني",
    "learnMore": "تعرف أكثر",
    "viewCaseStudies": "عرض دراسات الحالة"
  },
  ... (same structure for Arabic)
}
```

REQUIREMENTS:
- Use i18next namespace structure
- Organize by page/section
- Support nesting (common.home, hero.title, etc.)
- Include all UI text
- Both English and Arabic

DELIVERABLES:
- locales/en/translation.json (complete)
- locales/ar/translation.json (complete)
- Translation key reference document

VERIFICATION:
✓ All UI text has translations
✓ No hardcoded text in components
✓ Keys are consistently named
✓ Both languages have identical structure
✓ No untranslated strings in UI
```

---

### PHASE 1B: SIDEBAR MODIFICATIONS (Week 1)

#### Prompt 1B.1: Refactor Sidebar Component
```
You are refactoring the Sidebar component for MediaBubble.

OBJECTIVE:
Transform sidebar: change background to gray, add collapsed state (default), 
implement toggle with localStorage persistence.

CURRENT STATE:
- Dark blue background (#0D3A7D)
- Always open
- No collapse/expand

NEW STATE:
- Gray background (gray-100 / #F3F4F6)
- Collapsed by default
- Toggle button to expand/collapse
- State persists in localStorage
- Smooth animations (300ms)
- Icons only when collapsed
- Icons + text when expanded

REQUIREMENTS:

1. State Management:
   - useState for collapsed state
   - Default: collapsed = true
   - useEffect to load from localStorage
   - useEffect to save to localStorage
   - Smooth transitions (duration-300)

2. Structure:
   ```
   Sidebar
   ├── Toggle Button (← →)
   ├── Logo Section
   ├── Navigation Links
   │   ├── Icon (always visible)
   │   └── Text (hidden when collapsed)
   ├── Secondary Links
   └── Footer Section
   ```

3. Styling:
   - Background: bg-gray-100 (light gray)
   - Text: text-gray-700 (dark gray text)
   - Active link: bg-gray-200, text-blue-600
   - Hover: bg-gray-200
   - Collapsed width: w-20 (80px)
   - Expanded width: w-64 (256px)
   - Transition: duration-300

4. Icons:
   - Collapse button: "←" (when expanded), "→" (when collapsed)
   - Size: text-2xl
   - Navigation icons: size-6 or size-8
   - Smooth fade in/out for text

5. Responsive:
   - Desktop: sidebar visible
   - Tablet: sidebar can collapse
   - Mobile: sidebar is hidden by default
   - Hamburger menu for mobile

6. Accessibility:
   - Proper button semantics
   - aria-label="Toggle sidebar"
   - Focus indicator visible
   - Keyboard navigable

DELIVERABLES:
- src/components/Sidebar.tsx (refactored)
- src/hooks/useSidebarCollapse.ts (custom hook)
- Sidebar.stories.tsx (Storybook)
- Sidebar.test.tsx (unit tests)

EXAMPLE CODE:
```tsx
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { t } = useTranslation()

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed')
    if (saved !== null) {
      setCollapsed(JSON.parse(saved))
    } else {
      setCollapsed(true) // Default: collapsed
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed))
  }, [collapsed])

  return (
    <aside 
      className={`
        fixed left-0 top-0 h-screen z-40
        bg-gray-100 transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
        shadow-lg
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full p-4 text-2xl text-gray-700 hover:bg-gray-200 transition-colors"
        aria-label="Toggle sidebar"
      >
        {collapsed ? '→' : '←'}
      </button>

      {/* Navigation */}
      <nav className="mt-8 space-y-4 px-4">
        {/* Example link */}
        <a 
          href="/"
          className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <span className="text-2xl">🏠</span>
          {!collapsed && <span>{t('nav.home')}</span>}
        </a>
      </nav>
    </aside>
  )
}
```

VERIFICATION:
✓ Background is gray-100
✓ Sidebar collapses/expands on button click
✓ Default state is collapsed (w-20)
✓ State persists on page reload
✓ Smooth animation (300ms transition)
✓ Text hidden when collapsed
✓ Icons visible both states
✓ Keyboard accessible
✓ Mobile responsive
```

---

### PHASE 2A: LOGO & ICON SIZING (Week 1)

#### Prompt 2A.1: Update Logo & Icon Sizes
```
You are updating all logo and icon sizes throughout MediaBubble.

OBJECTIVE:
Increase logo and icon sizes across the app for better visual hierarchy.

SIZE CHANGES:

Logo Sizes:
- Header logo: 12 → 16 (48px → 64px)
- Sidebar logo: 10 → 14 (40px → 56px)  
- Footer logo: 8 → 10 (32px → 40px)
- Mobile logo: 10 → 12 (40px → 48px)

Icon Sizes:
- Navigation icons: 20px → 32px
- Sidebar icons: 20px → 28px
- Hero section icons: 24px → 40px
- Feature icons: 20px → 32px
- Button icons: 16px → 20px

Color Updates:
- Sidebar icons: Keep in gray
- Nav icons: Keep in blue (primary)
- All icons: Use design tokens

REQUIREMENTS:

1. Create src/constants/sizes.ts:
```ts
export const ICON_SIZES = {
  xs: '16px',   // Icon buttons
  sm: '20px',   // Small icons
  md: '24px',   // Medium icons
  lg: '32px',   // Large icons
  xl: '40px',   // Extra large
  
  logo: {
    header: '64px',
    sidebar: '56px',
    footer: '40px',
  },
  
  nav: {
    main: '32px',
    secondary: '24px',
  }
}
```

2. Update all logo elements:
   - src/components/Logo.tsx
   - src/components/Header.tsx (logo)
   - src/components/Sidebar.tsx (logo)
   - src/components/Footer.tsx (logo)

3. Update all navigation icons:
   - src/components/Navigation.tsx
   - src/components/Sidebar.tsx
   - src/components/MobileMenu.tsx

4. Update hero section icons:
   - src/pages/Home.tsx
   - src/pages/Services.tsx
   - src/pages/About.tsx

5. Use consistent sizing:
   - Always use named sizes (not hardcoded)
   - Import from ICON_SIZES constant
   - Apply via className or style prop

DELIVERABLES:
- src/constants/sizes.ts (new file)
- Updated Logo.tsx
- Updated Header.tsx
- Updated Sidebar.tsx
- Updated Footer.tsx
- Updated Navigation.tsx
- All pages using icons

EXAMPLE:
```tsx
import { ICON_SIZES } from '@/constants/sizes'

export function Header() {
  return (
    <header>
      <img 
        src="/logo.svg" 
        alt="MediaBubble"
        style={{ width: ICON_SIZES.logo.header, height: ICON_SIZES.logo.header }}
      />
    </header>
  )
}
```

VERIFICATION:
✓ All logos use new sizes
✓ All icons use new sizes
✓ Sizes from ICON_SIZES constant
✓ Consistent across all pages
✓ Mobile responsive
✓ Looks proportionally better
```

---

### PHASE 3: HERO SECTION REFINEMENT (Weeks 2-3)

#### Prompt 3.1: Create HeroSection Component
```
You are creating a refined HeroSection component for MediaBubble.

OBJECTIVE:
Build reusable HeroSection component with title, subtitle, description, 
proof points, and CTAs for all pages.

REQUIREMENTS:

1. Component Props Interface:
```ts
interface HeroSectionProps {
  title: string              // Short, punchy title
  subtitle: string           // Benefit-focused subtitle
  description: string        // Long descriptive paragraph (2-3 sentences)
  image?: string            // Optional hero image
  backgroundImage?: string  // Optional background pattern
  ctaButtons: {
    primary: { label: string; href: string; icon?: string }
    secondary?: { label: string; href: string }
  }
  proofPoints?: {
    icon?: string
    text: string
  }[]
  stats?: {
    number: string
    label: string
  }[]
  layout?: 'default' | 'image-left' | 'image-right' // default: default
}
```

2. Structure (desktop):
```
┌─────────────────────────────────────────────┐
│  HERO SECTION                               │
├──────────────────┬────────────────────────┤
│  TEXT            │   IMAGE                 │
│  ├─ Title        │   (optional)            │
│  ├─ Subtitle     │                         │
│  ├─ Description  │                         │
│  ├─ Proof Points │                         │
│  └─ CTA Buttons  │                         │
└──────────────────┴────────────────────────┘
```

3. Mobile structure:
- Image on top (if exists)
- Title
- Subtitle
- Description
- Proof points
- CTAs stacked vertically
- Full width

4. Styling Requirements:
   - Max width: 1152px (container)
   - Padding: 80px vertical (desktop), 40px (mobile)
   - Background: Gradient (light blue to white)
   - Text color: Gray-900 (dark)
   - Accent color: Blue-600 (CTAs)

5. Components:
   - Title: h1, text-5xl/6xl, font-bold, leading-tight
   - Subtitle: text-2xl, font-semibold, text-blue-600
   - Description: text-lg, text-gray-700, leading-relaxed
   - Proof points: list with checkmarks
   - CTA buttons: Primary (filled), Secondary (outline)

6. Animations (optional):
   - Fade-in on scroll
   - Subtle parallax for image
   - Button hover effects

DELIVERABLES:
- src/components/HeroSection.tsx
- HeroSection.stories.tsx (Storybook with all variants)
- HeroSection.test.tsx (unit tests)

EXAMPLE USAGE:
```tsx
<HeroSection
  title="Grow Your Business 2-3X in 12 Months"
  subtitle="Proven Strategy + Expert Execution"
  description="From strategy to execution—we turn local businesses into market leaders using data-driven campaigns that deliver measurable ROI."
  image="/hero-image.jpg"
  proofPoints={[
    { icon: "✓", text: "35% average client growth" },
    { icon: "✓", text: "92% client retention rate" },
    { icon: "✓", text: "500+ successful projects" }
  ]}
  ctaButtons={{
    primary: { label: "Get Free Audit", href: "/audit" },
    secondary: { label: "View Case Studies", href: "/portfolio" }
  }}
/>
```

VERIFICATION:
✓ All props render correctly
✓ Responsive on mobile/tablet/desktop
✓ Text is readable (proper contrast)
✓ Images scale properly
✓ CTAs are clickable
✓ Proof points display clearly
✓ Proper alignment (centered on mobile)
```

#### Prompt 3.2: Apply HeroSection to All Pages
```
You are applying the HeroSection component to all pages.

OBJECTIVE:
Replace placeholder hero sections with refined HeroSection component on:
- Home page
- About page
- Services page (and service detail pages)
- Blog page
- Portfolio page

REQUIREMENTS:

For each page, define:
1. Unique hero content (title, subtitle, description, image)
2. Page-specific CTAs
3. Proof points (if applicable)
4. Background styling

PAGE CONTENT:

HOME PAGE:
- Title: "Grow Your Business 2-3X in 12 Months"
- Subtitle: "Proven Strategy + Expert Execution"
- Description: "From strategy to execution—we turn local businesses into market leaders using data-driven campaigns that deliver measurable ROI. Our integrated services combine strategic consulting, creative excellence, and technical expertise to build your brand and drive growth."
- Image: /images/hero-home.jpg
- Proof Points: [Growth %, Retention %, Projects]
- CTAs: [Get Free Audit, View Case Studies]

ABOUT PAGE:
- Title: "Who We Are"
- Subtitle: "Passionate About Your Success"
- Description: "We're a team of experienced marketers, designers, and developers dedicated to helping Hurghada's businesses thrive. With [X] years combined experience and [X] successful projects, we understand what drives results in today's market."
- Proof Points: [Team Size, Years Experience, Industry Awards]
- CTAs: [Meet The Team, Work With Us]

SERVICES PAGE:
- Title: "Our Services"
- Subtitle: "Complete Marketing Solutions"
- Description: "Whether you need strategy, creative, technology, or a full integrated approach, we have the expertise to deliver results."
- No image
- CTAs: [Service Overview, Request Proposal]

PORTFOLIO PAGE:
- Title: "Our Work"
- Subtitle: "Results That Speak For Themselves"
- Description: "From startups to established brands, we've helped businesses of all sizes grow. Explore our recent projects and the impact we've delivered."
- Image: /images/portfolio-hero.jpg
- Proof Points: [Portfolio Size, Avg Growth, Client Types]
- CTAs: [View All Work, Get Case Study]

BLOG PAGE:
- Title: "News & Insights"
- Subtitle: "Stay Updated With Marketing Tips"
- Description: "Read our latest articles on digital marketing, SEO, branding, and growth strategies. Actionable insights from our team of experts."
- CTAs: [Browse Articles, Subscribe]

REQUIREMENTS:
- Use translation keys (t('hero.home.title'), etc.)
- Responsive images (srcset for different sizes)
- Mobile-first responsive layout
- Proper semantic HTML
- Good metadata for SEO

DELIVERABLES:
- Updated src/pages/Home.tsx
- Updated src/pages/About.tsx
- Updated src/pages/Services.tsx
- Updated src/pages/Portfolio.tsx
- Updated src/pages/Blog.tsx
- Image assets (if needed)

VERIFICATION:
✓ All pages use HeroSection
✓ Content is translated (i18n)
✓ Images responsive
✓ Mobile layout works
✓ CTAs are clickable
✓ Consistent styling
```

---

### PHASE 4: ALIGNMENT & SPACING (Week 3)

#### Prompt 4.1: Implement Alignment System
```
You are implementing a comprehensive alignment and spacing system.

OBJECTIVE:
Apply 8px grid, proper centering, and consistent spacing throughout the app.

REQUIREMENTS:

1. Core Principles:
   - 8px base unit (all spacing multiples of 8)
   - Centered containers (max-width: 6xl = 1152px)
   - Proper text alignment (start/end for RTL support)
   - Vertical rhythm (1.5x line height minimum)

2. Spacing System (already in design tokens):
   - xs: 4px (rare)
   - sm: 8px (padding, margin)
   - md: 16px (section padding)
   - lg: 24px (section gaps)
   - xl: 32px (large sections)
   - xxl: 48px (hero spacing)

3. Container Rules:
```tsx
// All sections use this pattern:
<section className="py-20 px-6 sm:px-8 lg:px-12">
  <div className="container mx-auto max-w-6xl">
    {/* Content here */}
  </div>
</section>
```

4. Text Alignment:
   - Centers: Use text-center with mx-auto max-w-2xl
   - Left-aligned: Use text-start (supports RTL)
   - Right-aligned: Use text-end (supports RTL)
   - Justify: Avoid (use text-start instead)

5. Flexbox Centering:
```tsx
// Horizontally + vertically centered:
<div className="flex items-center justify-center min-h-screen">
  {/* Content */}
</div>

// Space-between:
<div className="flex items-center justify-between">
  {/* Left content */}
  {/* Right content */}
</div>

// Column (vertical) centering:
<div className="flex flex-col items-center gap-8">
  {/* Items stack vertically, centered */}
</div>
```

6. Grid Alignment:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Cards automatically spaced */}
</div>
```

7. Sections to Fix:
   - Header (alignment, padding)
   - Hero section (text centering mobile)
   - Services section (card alignment, spacing)
   - Features section (grid alignment)
   - CTA section (centering)
   - Footer (alignment)

DELIVERABLES:
- Updated src/components/Header.tsx
- Updated src/components/Hero.tsx
- Updated all section components
- src/components/Container.tsx (reusable)
- Updated all page files
- Spacing/alignment guidelines

EXAMPLE - Container Component:
```tsx
interface ContainerProps {
  className?: string
  children: React.ReactNode
}

export function Container({ className = '', children }: ContainerProps) {
  return (
    <div className={`container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  )
}

// Usage:
<section className="py-20">
  <Container>
    {/* Content automatically centered and padded */}
  </Container>
</section>
```

VERIFICATION:
✓ All sections use 8px grid
✓ Containers max-width: 6xl
✓ Mobile padding: 24px (3x 8px)
✓ Tablet padding: 32px (4x 8px)
✓ Desktop padding: 48px (6x 8px)
✓ Text centered on mobile
✓ Proper gaps between elements
✓ Consistent spacing across all pages
```

---

## 📋 COMPLETE EXECUTION CHECKLIST

### WEEK 1: Foundation & Sidebar
- [ ] **Phase 1A.1:** i18n Infrastructure (4-6h)
  - Install dependencies
  - Create config
  - Setup RTL
  - Test initialization
  
- [ ] **Phase 1A.2:** Language Switcher (2-3h)
  - Create component
  - Add Storybook stories
  - Add tests
  - Test toggle functionality
  
- [ ] **Phase 1A.3:** Translation Files (3-4h)
  - Populate en/translation.json
  - Populate ar/translation.json
  - Test all keys
  - No hardcoded strings
  
- [ ] **Phase 1B.1:** Sidebar Refactor (3-4h)
  - Change background to gray
  - Add collapsed state
  - Implement toggle
  - Test localStorage
  
- [ ] **Phase 2A.1:** Logo & Icon Sizes (2-3h)
  - Create ICON_SIZES constant
  - Update all logos
  - Update all icons
  - Test responsiveness

**Week 1 Total: 14-20 hours**

### WEEK 2: Hero Section
- [ ] **Phase 3.1:** Create HeroSection Component (4-5h)
  - Build component with all variants
  - Create Storybook stories
  - Add unit tests
  - Test responsive design
  
- [ ] **Phase 3.2:** Apply to All Pages (4-5h)
  - Update Home page
  - Update About page
  - Update Services page
  - Update Portfolio page
  - Update Blog page
  - Create hero images/graphics

**Week 2 Total: 8-10 hours**

### WEEK 3: Alignment & Polish
- [ ] **Phase 4.1:** Implement Alignment System (4-5h)
  - Fix header alignment
  - Fix hero alignment
  - Fix sections (services, features)
  - Fix footer alignment
  - Create Container component
  - Test on 3 devices
  
- [ ] **Testing & QA:**
  - Language switching works (EN ↔ AR)
  - RTL layout correct
  - Sidebar collapse/expand
  - Hero section on all pages
  - Alignment on mobile/tablet/desktop
  - All icons display correctly
  - All images responsive

**Week 3 Total: 8-10 hours**

---

## 🎬 HOW TO EXECUTE

### Step-by-Step Process:

**1. Open Claude Code**
```bash
# Navigate to your MediaBubble React project
cd /path/to/mediabubble-app
```

**2. Start with Phase 1A.1**
Copy the **Prompt 1A.1: Set Up i18n Infrastructure** exactly as written above, paste into Claude Code.

**3. Claude Code executes**
- Creates directories
- Installs dependencies
- Creates config files
- Generates hooks
- Updates Tailwind

**4. Review & Test**
```bash
npm install  # If new dependencies
npm start    # Test in browser
# Check console for errors
```

**5. Commit to Git**
```bash
git add .
git commit -m "feat: setup i18n infrastructure with Arabic support"
```

**6. Continue to Phase 1A.2**
Move to next prompt in sequence

**Repeat for each prompt in the list above**

---

## ✅ SUCCESS CRITERIA

After executing this plan, you'll have:

✅ **Language Support**
- English & Arabic (Masri) fully supported
- Language switcher component
- RTL/LTR automatic handling
- Translations in all UI text

✅ **Sidebar Improvements**
- Gray background (not dark blue)
- Collapsed by default
- Toggle button to expand
- State persists
- Icons visible both states

✅ **Logo & Icon Sizing**
- Larger, more prominent logo
- Consistent icon sizing
- Better visual hierarchy
- Professional appearance

✅ **Hero Section**
- Present on all pages
- Title + Subtitle + Description
- Proof points visible
- CTAs clear and prominent
- Responsive on all devices

✅ **Alignment & Spacing**
- 8px grid throughout
- Proper centering
- Consistent gaps
- Professional layout
- Mobile-first responsive

---

## 📊 TIME ESTIMATE BREAKDOWN

| Phase | Components | Hours | Week |
|-------|-----------|-------|------|
| 1A.1 | i18n Setup | 4-6 | 1 |
| 1A.2 | Language Switcher | 2-3 | 1 |
| 1A.3 | Translations | 3-4 | 1 |
| 1B.1 | Sidebar Refactor | 3-4 | 1 |
| 2A.1 | Logo/Icons | 2-3 | 1 |
| 3.1 | HeroSection Component | 4-5 | 2 |
| 3.2 | Apply to All Pages | 4-5 | 2 |
| 4.1 | Alignment System | 4-5 | 3 |
| Testing & QA | All features | 4-6 | 3 |
| **TOTAL** | | **30-41h** | **3 weeks** |

---

## 🚀 READY TO START?

1. **You have all 8 prompts above** — copy-paste ready for Claude Code
2. **Each prompt is self-contained** — detailed specifications
3. **Each prompt has verification steps** — know when it's done
4. **Follow the sequence** — don't jump around

### Next Action:

1. Open Claude Code
2. Copy **Prompt 1A.1** exactly
3. Paste into Claude Code
4. Let it build
5. Test in browser
6. Commit to git
7. Move to **Prompt 1A.2**

---

## 📞 SUPPORT REFERENCE

If something doesn't work:

- **i18n not loading?** Check import in App.tsx
- **Sidebar won't collapse?** Check localStorage in DevTools
- **Images not showing?** Check image paths in public/
- **RTL not working?** Check document.documentElement.dir
- **Icons too small?** Check ICON_SIZES constant
- **Text not centered?** Check max-w-2xl, mx-auto classes

---

## 🎯 FINAL NOTES

This plan is **complete, testable, and executable**. Each prompt gives Claude Code exactly what it needs to build each piece. No ambiguity, no gaps, no "figure out the rest."

**You're 3 weeks away from a fully refined, bilingual, professionally aligned MediaBubble app.**

**Let's go.** 🚀

---

**Document Version:** 1.0  
**Last Updated:** June 9, 2026  
**Status:** Ready for Execution  
**Duration:** 3-4 weeks (30-50 hours Claude Code work)

