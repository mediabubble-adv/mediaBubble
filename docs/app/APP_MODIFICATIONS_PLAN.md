# MediaBubble App Modifications Plan

**Date:** June 9, 2026  
**Changes Required:**
1. Arabic (Masri) & English language support
2. Left sidebar background → Gray
3. Sidebar collapsed by default
4. Increase logo/icons size
5. Refine hero section (all pages)
6. Add short title + long description
7. Proper alignment throughout

---

## 1. LANGUAGE SUPPORT (Arabic Masri & English)

### Implementation Approach

**Option A: i18n Library (Recommended)**
```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

**Structure:**
```
src/
├── locales/
│   ├── en/
│   │   └── translation.json
│   └── ar/
│       └── translation.json
├── i18n/
│   └── config.ts
└── components/
    └── LanguageSwitcher.tsx
```

**locales/en/translation.json:**
```json
{
  "nav": {
    "home": "Home",
    "about": "About Us",
    "services": "Services",
    "portfolio": "Portfolio",
    "blog": "Blog",
    "contact": "Contact"
  },
  "hero": {
    "title": "Hurghada's #1 Marketing Agency",
    "description": "From strategy to execution—we turn local businesses into market leaders."
  },
  "cta": {
    "getAudit": "Get Your Free Audit",
    "learnMore": "View Case Studies"
  }
}
```

**locales/ar/translation.json:**
```json
{
  "nav": {
    "home": "الرئيسية",
    "about": "معلومات عنا",
    "services": "الخدمات",
    "portfolio": "أعمالنا",
    "blog": "المدونة",
    "contact": "اتصل بنا"
  },
  "hero": {
    "title": "أفضل وكالة تسويق في الغردقة",
    "description": "من الإستراتيجية إلى التنفيذ—نحول الشركات المحلية إلى قادة السوق."
  },
  "cta": {
    "getAudit": "احصل على تدقيق مجاني",
    "learnMore": "عرض دراسات الحالة"
  }
}
```

**Language Switcher Component:**
```tsx
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }

  return (
    <button 
      onClick={toggleLanguage}
      className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
    >
      {i18n.language === 'en' ? 'العربية' : 'English'}
    </button>
  )
}
```

**Usage in Components:**
```tsx
import { useTranslation } from 'react-i18next'

export function Header() {
  const { t } = useTranslation()
  
  return (
    <header>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.description')}</p>
    </header>
  )
}
```

---

## 2. SIDEBAR STYLING & BEHAVIOR

### Left Sidebar Changes

**Current:** Dark blue background, always open  
**New:** Gray background, collapsed by default

**Sidebar Component Structure:**
```tsx
import { useState, useEffect } from 'react'

interface SidebarProps {
  isOpen?: boolean
}

export function Sidebar({ isOpen = false }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(isOpen === false)

  // Persist state
  useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed')
    if (saved !== null) {
      setCollapsed(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed))
  }, [collapsed])

  return (
    <aside 
      className={`
        fixed left-0 top-0 h-screen
        bg-gray-100 transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
        shadow-lg z-40
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full p-4 hover:bg-gray-200"
      >
        {collapsed ? '→' : '←'}
      </button>

      {/* Navigation */}
      <nav className="mt-8 space-y-4 px-4">
        {/* Links only show text when expanded */}
        {collapsed ? (
          // Icon only
          <div className="text-2xl">🏠</div>
        ) : (
          // Icon + Text
          <a href="/" className="flex items-center gap-3">
            <span>🏠</span>
            <span>Home</span>
          </a>
        )}
        {/* Repeat for other nav items */}
      </nav>
    </aside>
  )
}
```

**Tailwind CSS for Sidebar:**
```css
/* Sidebar gray background */
.sidebar {
  @apply bg-gray-100 dark:bg-gray-900;
}

/* Sidebar text color */
.sidebar a {
  @apply text-gray-700 dark:text-gray-300;
}

/* Active link styling */
.sidebar a.active {
  @apply bg-gray-200 dark:bg-gray-800 text-blue-600;
}
```

---

## 3. LOGO & ICONS SIZE INCREASE

### Current vs. New Sizes

```tsx
export const ICON_SIZES = {
  // Old
  xs: '16px',  // New: 20px
  sm: '20px',  // New: 24px
  md: '24px',  // New: 32px
  lg: '32px',  // New: 40px
  xl: '40px',  // New: 48px
  
  // Logo specific
  logo: {
    header: '48px',  // New: 64px
    sidebar: '40px', // New: 56px
    footer: '32px',  // New: 40px
  }
}

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Logo image */}
      <img 
        src="/logo.svg" 
        alt="MediaBubble" 
        className="w-16 h-16" {/* Increased from 12 to 16 */}
      />
      
      {/* Logo text */}
      <span className="text-2xl font-bold">MediaBubble</span>
    </div>
  )
}
```

**Header Logo:**
```tsx
<header className="flex items-center justify-between p-6 bg-blue-dark">
  <div className="flex items-center gap-4">
    {/* Logo - increased to 64px */}
    <img 
      src="/logo.svg" 
      alt="MediaBubble" 
      className="w-16 h-16 object-contain"
    />
    <h1 className="text-3xl font-bold text-white">MediaBubble</h1>
  </div>
</header>
```

**Navigation Icons:**
```tsx
<nav className="flex gap-8 items-center">
  {navItems.map(item => (
    <a 
      key={item.id}
      href={item.href}
      className="flex items-center gap-2 hover:text-blue-600"
    >
      {/* Icon size increased from 24px to 32px */}
      <Icon name={item.icon} size={32} />
      <span className="hidden sm:inline">{item.label}</span>
    </a>
  ))}
</nav>
```

---

## 4. HERO SECTION REFINEMENT

### Hero Section Template (All Pages)

**Current Problem:**
```
❌ No clear hierarchy
❌ Short title only
❌ Missing context paragraph
❌ Poor alignment
```

**New Structure:**
```
✓ Eye-catching short title
✓ Descriptive paragraph (benefits)
✓ Proof points / statistics
✓ Clear CTAs
✓ Perfect alignment
```

### Hero Component

```tsx
interface HeroProps {
  title: string          // Short, punchy title
  subtitle: string       // Benefit-focused subtitle
  description: string    // Long, detailed paragraph
  image?: string         // Optional hero image
  ctaButtons: {
    primary: { label: string; href: string }
    secondary?: { label: string; href: string }
  }
  proofPoints?: string[] // Optional stats/proof points
}

export function HeroSection({
  title,
  subtitle,
  description,
  image,
  ctaButtons,
  proofPoints
}: HeroProps) {
  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Text */}
          <div className="space-y-8">
            
            {/* Title */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl text-blue-600 font-semibold">
              {subtitle}
            </p>
            
            {/* Description Paragraph */}
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
              {description}
            </p>
            
            {/* Proof Points */}
            {proofPoints && (
              <ul className="space-y-3">
                {proofPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            )}
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                {ctaButtons.primary.label}
              </button>
              {ctaButtons.secondary && (
                <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
                  {ctaButtons.secondary.label}
                </button>
              )}
            </div>
          </div>
          
          {/* Right side - Image */}
          {image && (
            <div className="hidden lg:block">
              <img 
                src={image} 
                alt={title}
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
```

### Usage Example

```tsx
<HeroSection
  title="Grow Your Business 2-3X in 12 Months"
  subtitle="Proven Strategy + Expert Execution"
  description="From strategy to execution—we turn local businesses into market leaders using data-driven campaigns that deliver measurable ROI. Our integrated services combine strategic consulting, creative excellence, and technical expertise to build your brand and drive growth."
  image="/hero-image.jpg"
  proofPoints={[
    "35% average client growth in 12 months",
    "92% client retention rate",
    "500+ successful projects delivered"
  ]}
  ctaButtons={{
    primary: { label: "Get Your Free Strategy Audit", href: "/audit" },
    secondary: { label: "View Case Studies", href: "/portfolio" }
  }}
/>
```

---

## 5. ALIGNMENT & SPACING

### Spacing System (8px grid)

```css
/* Tailwind utilities using 8px base */
.space-xs { gap: 4px; }   /* 0.5 units */
.space-sm { gap: 8px; }   /* 1 unit */
.space-md { gap: 16px; }  /* 2 units */
.space-lg { gap: 24px; }  /* 3 units */
.space-xl { gap: 32px; }  /* 4 units */
.space-xxl { gap: 48px; } /* 6 units */
```

### Alignment Classes

```tsx
// Center everything
const alignCenter = "flex items-center justify-center"

// Vertical center + horizontal space-between
const alignSpaceBetween = "flex items-center justify-between"

// Grid alignment
const gridAlign = "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"

// Text alignment (respect RTL)
const textAlignStart = "text-left dir-ltr:text-left dir-rtl:text-right"
```

### Container Max Width

```tsx
// All sections should use consistent container
<div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
  {/* Content here */}
</div>
```

### Full Alignment Example

```tsx
<section className="py-20 px-6">
  <div className="container mx-auto max-w-6xl">
    
    {/* Section heading - center aligned */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Our Services
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Everything your business needs to succeed online
      </p>
    </div>
    
    {/* Service cards - aligned grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map(service => (
        <div 
          key={service.id}
          className="p-8 rounded-lg border border-gray-200 hover:shadow-lg transition"
        >
          {/* Card content centered */}
          <div className="text-center">
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {service.description}
            </p>
            <a 
              href={service.link}
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Learn More
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## 6. RTL SUPPORT (For Arabic)

### Tailwind RTL Configuration

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    direction: true, // Enable RTL
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}
```

### RTL-Aware Components

```tsx
// Instead of hardcoded direction:
<div className="text-left">❌ Wrong - doesn't work in RTL</div>

// Use directional Tailwind utilities:
<div className="text-start">✓ Correct - works in LTR and RTL</div>

// Padding examples:
<div className="ps-6">Padding-start (left in LTR, right in RTL)</div>
<div className="pe-6">Padding-end (right in LTR, left in RTL)</div>

// Margin examples:
<div className="ms-4">Margin-start</div>
<div className="me-4">Margin-end</div>

// Border examples:
<div className="border-s-4">Border-start</div>
<div className="border-e-4">Border-end</div>

// Flex direction:
<div className="flex flex-row-reverse lg:flex-row">
  {/* In RTL: will be row-reverse, in LTR: will be row */}
</div>
```

### Layout Configuration

```tsx
// App wrapper
<html dir={language === 'ar' ? 'rtl' : 'ltr'} lang={language}>
  <body className={language === 'ar' ? 'rtl' : 'ltr'}>
    {/* App content */}
  </body>
</html>
```

---

## 7. IMPLEMENTATION CHECKLIST

### Phase 1: Foundation
- [ ] Install i18next dependencies
- [ ] Create locales/en and locales/ar
- [ ] Set up i18n config
- [ ] Create LanguageSwitcher component
- [ ] Update HTML dir attribute for RTL
- [ ] Install tailwindcss-rtl

### Phase 2: Sidebar
- [ ] Change sidebar background to gray-100
- [ ] Add collapsed state (default: collapsed)
- [ ] Create toggle button
- [ ] Save/restore state in localStorage
- [ ] Update responsive behavior

### Phase 3: Logo & Icons
- [ ] Update logo sizes (12w/h → 16w/h header)
- [ ] Update nav icon sizes (24px → 32px)
- [ ] Update sidebar icon sizes
- [ ] Update footer logo sizes

### Phase 4: Hero Section
- [ ] Create HeroSection component
- [ ] Add title + subtitle + description
- [ ] Add proof points
- [ ] Add CTA buttons
- [ ] Make image responsive
- [ ] Test on mobile

### Phase 5: Alignment & Spacing
- [ ] Apply 8px grid system to all components
- [ ] Center all section headings
- [ ] Use container max-width (6xl)
- [ ] Fix padding/margin consistency
- [ ] Test responsive alignment

### Phase 6: Testing
- [ ] Test language switching (EN ↔ AR)
- [ ] Test RTL layout
- [ ] Test sidebar collapse/expand
- [ ] Test hero section on all pages
- [ ] Test alignment on mobile/tablet/desktop

---

## 8. QUICK FILE REPLACEMENTS

You can use Claude Code with these exact prompts to implement each section:

**Prompt 1:**
```
Create i18n language support for MediaBubble app (English & Arabic Masri).
Create locales/en/translation.json and locales/ar/translation.json
Create i18n/config.ts with i18next setup
Create components/LanguageSwitcher.tsx
Setup RTL support in tailwind.config.js
```

**Prompt 2:**
```
Refactor Sidebar component:
- Change background color to gray-100
- Add collapsed state (default: false/collapsed)
- Show only icons when collapsed
- Add toggle button
- Save state to localStorage
- Update colors from dark blue to gray
```

**Prompt 3:**
```
Update all logo and icon sizes throughout the app:
- Header logo: 12 → 16 (64px)
- Navigation icons: 20 → 32px
- Sidebar icons: increase to match
- Footer logo: 8 → 10
Apply consistently across all pages
```

**Prompt 4:**
```
Create and refactor HeroSection component:
- Add title (short, punchy)
- Add subtitle (benefit-focused)
- Add long description paragraph
- Add proof points (array of strings)
- Add CTA buttons (primary + optional secondary)
- Add optional image
- Make responsive
- Ensure perfect alignment
- Center text on mobile
```

**Prompt 5:**
```
Apply alignment and spacing system:
- Use 8px grid for all spacing (p-4, p-8, gap-6, etc.)
- Center all section headings
- Set container max-width to 6xl (1152px)
- Consistent padding all sections
- Use flexbox for centering
- Test alignment on 3 screen sizes
```

---

## Next Steps

1. **Share your app structure** (src/ directory tree) so I can see your actual files
2. **Or use Claude Code directly** with the prompts above
3. **Or send me specific file names** you want me to modify

Once I see your actual app files, I can make all these changes directly.

