# MediaBubble - Master Development Plan
**Strategic Roadmap: Code Quality + UI/UX Modernization**  
**Generated**: June 13, 2026 | **Duration**: 12 weeks | **Total Effort**: ~240 hours

---

## 📋 Executive Overview

This plan combines:
1. **Code Quality & Security** (from comprehensive audit)
2. **UI/UX Modernization** (high-quality, clean, modern design)
3. **Content Enhancement** (blog imagery, portfolio assets)
4. **Feature Development** (new capabilities)

**Target Result**: MediaBubble website becomes **industry-leading in quality**, performance, and user experience.

---

## 🎯 MASTER ROADMAP

```
Phase 1: Foundation & Security (Weeks 1-2)   [CRITICAL]
├── Security fixes
├── Testing setup
├── Bug fixes
└── Project infrastructure

Phase 2: Architecture & Code Quality (Weeks 3-4)   [HIGH]
├── State management
├── Custom hooks
├── Component refactoring
└── Type safety

Phase 3: UI/UX Modernization (Weeks 5-7)   [HIGH]
├── Design system upgrade
├── Component library
├── Page redesigns
└── Dark mode

Phase 4: Content & Assets (Weeks 8-9)   [MEDIUM]
├── Blog imagery
├── Portfolio photography
├── Case study content
└── SEO optimization

Phase 5: Features & Performance (Weeks 10-11)   [MEDIUM]
├── Blog search
├── A/B testing
├── Analytics dashboard
└── Performance optimization

Phase 6: Polish & Launch (Week 12)   [FINAL]
├── E2E testing
├── Final QA
├── Deployment
└── Monitoring setup
```

---

# PHASE 1: FOUNDATION & SECURITY (Weeks 1-2)

## Week 1: Security & Critical Fixes

### 1.1 Security Issues (Day 1-2)
**Priority**: 🔴 CRITICAL | **Effort**: 4 hours | **Owner**: DevOps/Lead

- [ ] Remove `.env.local` from git tracking
  ```bash
  git rm --cached .env.local
  echo ".env.local" >> .gitignore
  git commit -m "chore: remove env file from tracking"
  ```

- [ ] Fix CSP `'unsafe-inline'` issue
  **File**: `apps/web-eg/next.config.js`
  ```javascript
  // BEFORE (VULNERABLE)
  "script-src 'self' 'unsafe-inline'"
  
  // AFTER (SECURE)
  "script-src 'self' https://www.googletagmanager.com"
  ```

- [ ] Replace wildcard domain with explicit subdomains
  **File**: `apps/web-eg/next.config.js`
  ```javascript
  // BEFORE
  { protocol: 'https', hostname: '**.mediabubble.co' }
  
  // AFTER
  { protocol: 'https', hostname: 'cdn.mediabubble.co' },
  { protocol: 'https', hostname: 'images.mediabubble.co' },
  ```

- [ ] Add security headers validation test
  **Create**: `apps/web-eg/__tests__/security.test.tsx`
  ```typescript
  describe('Security Headers', () => {
    it('should have CSP without unsafe-inline', () => {
      // Test CSP header
    })
    it('should not expose credentials in git', () => {
      // Verify .env.local not in repo
    })
  })
  ```

### 1.2 Bug Fixes (Day 2-3)
**Priority**: 🟡 HIGH | **Effort**: 6 hours

- [ ] Fix GA4 consent race condition
  **File**: `apps/web-eg/components/GoogleAnalytics.tsx`
  ```typescript
  // REFACTOR: Combine effects + add proper state handling
  export function GoogleAnalytics() {
    const [state, dispatch] = useReducer(consentReducer, initialState)
    
    useEffect(() => {
      // Single effect to handle all logic
      const hasConsent = checkConsent()
      dispatch({ type: 'SET_CONSENT', payload: hasConsent })
    }, [])
    
    return state.consented ? <GAScripts /> : null
  }
  ```

- [ ] Add error boundary to root layout
  **Create**: `apps/web-eg/app/error.tsx`
  ```typescript
  'use client'
  
  export default function Error({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1>Something went wrong</h1>
        <button onClick={() => reset()}>Try again</button>
      </div>
    )
  }
  ```

- [ ] Fix localStorage error handling
  **File**: `apps/web-eg/lib/consent.ts` (new file)
  ```typescript
  export function safeGetConsent(): boolean {
    try {
      if (typeof window === 'undefined') return false
      return localStorage.getItem('consent') === 'accepted'
    } catch (e) {
      console.warn('Cannot access localStorage:', e)
      return false
    }
  }
  ```

- [ ] Replace hardcoded metadata with env vars
  **File**: `apps/web-eg/app/layout.tsx`
  ```typescript
  const BUSINESS_PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+20123456789'
  const BUSINESS_EMAIL = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'hello@mediabubble.com'
  ```

### 1.3 Testing Infrastructure (Day 3-4)
**Priority**: 🔴 CRITICAL | **Effort**: 8 hours

- [ ] Install testing dependencies
  ```bash
  npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom ts-jest @types/jest
  ```

- [ ] Create Jest configuration
  **Create**: `jest.config.ts`
  ```typescript
  export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/apps'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/apps/web-eg/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    collectCoverageFrom: [
      'apps/**/src/**/*.{ts,tsx}',
      '!**/*.d.ts',
      '!**/node_modules/**',
    ],
  }
  ```

- [ ] Create setup file
  **Create**: `jest.setup.ts`
  ```typescript
  import '@testing-library/jest-dom'
  
  // Mock next/navigation
  jest.mock('next/navigation', () => ({
    useRouter() {
      return {
        push: jest.fn(),
        pathname: '/',
      }
    },
    usePathname() {
      return '/'
    },
    useSearchParams() {
      return new URLSearchParams()
    },
  }))
  ```

- [ ] Write first test suite (GoogleAnalytics)
  **Create**: `apps/web-eg/__tests__/components/GoogleAnalytics.test.tsx`
  ```typescript
  import { render } from '@testing-library/react'
  import { GoogleAnalytics } from '@/components/GoogleAnalytics'
  
  describe('GoogleAnalytics', () => {
    it('should not render if no consent', () => {
      const { container } = render(<GoogleAnalytics />)
      expect(container.firstChild).toBeNull()
    })
    
    it('should render GA script with consent', () => {
      // Mock consent + test
    })
  })
  ```

### 1.4 Project Configuration (Day 4-5)
**Priority**: 🟡 HIGH | **Effort**: 4 hours

- [ ] Update ESLint with stricter rules
  **File**: `.eslintrc.json`
  ```json
  {
    "extends": ["next/core-web-vitals"],
    "rules": {
      "react/no-unescaped-entities": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  }
  ```

- [ ] Add npm scripts for testing & quality
  **File**: `package.json`
  ```json
  {
    "scripts": {
      "test": "jest",
      "test:watch": "jest --watch",
      "test:coverage": "jest --coverage",
      "lint": "nx run-many -t lint",
      "typecheck": "nx run-many -t typecheck",
      "quality": "npm run lint && npm run typecheck && npm run test"
    }
  }
  ```

- [ ] Add GitHub Actions for CI
  **Create**: `.github/workflows/quality.yml`
  ```yaml
  name: Code Quality
  on: [push, pull_request]
  jobs:
    quality:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
        - run: npm ci
        - run: npm run lint
        - run: npm run typecheck
        - run: npm run test
        - run: npm run test:coverage
  ```

- [ ] Set up pre-commit hooks
  ```bash
  npm install --save-dev husky lint-staged
  npx husky install
  npx husky add .husky/pre-commit "npx lint-staged"
  ```
  **File**: `.lintstagedrc.json`
  ```json
  {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,md,json}": ["prettier --write"]
  }
  ```

---

## Week 2: Additional Foundation Work

### 2.1 Custom Hooks Library (Day 1-2)
**Priority**: 🟡 HIGH | **Effort**: 6 hours

**Create**: `apps/web-eg/hooks/index.ts`
```typescript
export { useConsent } from './useConsent'
export { useGA } from './useGA'
export { useI18n } from './useI18n'
export { useLocalStorage } from './useLocalStorage'
```

**Create**: `apps/web-eg/hooks/useConsent.ts`
```typescript
import { useCallback, useEffect, useState } from 'react'

const CONSENT_KEY = 'mediabubble-consent'

export function useConsent() {
  const [consent, setConsent] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(CONSENT_KEY) === 'accepted'
    setConsent(stored)
  }, [])

  const grantConsent = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setConsent(true)
    window.dispatchEvent(new Event('consentGranted'))
  }, [])

  const denyConsent = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY)
    setConsent(false)
  }, [])

  return { consent, grantConsent, denyConsent, mounted }
}
```

**Create**: `apps/web-eg/hooks/useGA.ts`
```typescript
import { useConsent } from './useConsent'

export function useGA() {
  const { consent } = useConsent()
  
  const trackEvent = (action: string, label: string, value?: number) => {
    if (!consent || typeof window === 'undefined') return
    
    window.gtag?.('event', action, {
      event_label: label,
      event_value: value,
    })
  }

  return { trackEvent, consent }
}
```

**Create**: `apps/web-eg/hooks/useLocalStorage.ts`
```typescript
import { useState, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }, [key, storedValue])

  return [storedValue, setValue] as const
}
```

### 2.2 Context API Setup (Day 2-3)
**Priority**: 🟡 HIGH | **Effort**: 4 hours

**Create**: `apps/web-eg/contexts/ConsentContext.tsx`
```typescript
'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useConsent as useConsentHook } from '@/hooks/useConsent'

interface ConsentContextType {
  consent: boolean
  grantConsent: () => void
  denyConsent: () => void
  mounted: boolean
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined)

export function ConsentProvider({ children }: { children: ReactNode }) {
  const consent = useConsentHook()

  return (
    <ConsentContext.Provider value={consent}>
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  const context = useContext(ConsentContext)
  if (!context) {
    throw new Error('useConsent must be used within ConsentProvider')
  }
  return context
}
```

**Update**: `apps/web-eg/app/layout.tsx`
```typescript
import { ConsentProvider } from '@/contexts/ConsentContext'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ConsentProvider>
          {children}
        </ConsentProvider>
      </body>
    </html>
  )
}
```

### 2.3 Test Coverage - Initial Target (Day 3-5)
**Priority**: 🔴 CRITICAL | **Effort**: 8 hours | **Target**: 15% coverage

**Tests to write**:
- [ ] `GoogleAnalytics.test.tsx` (consent tracking)
- [ ] `CookieConsent.test.tsx` (consent grant/deny)
- [ ] `I18nLayoutWrapper.test.tsx` (language switching)
- [ ] `useConsent.test.ts` (hook logic)
- [ ] `useLocalStorage.test.ts` (storage logic)

**Target by end of Week 2**:
- ✅ 15% test coverage
- ✅ All critical components tested
- ✅ CI/CD pipeline working

---

### 📊 Phase 1 Summary
| Item | Status | Hours | Notes |
|------|--------|-------|-------|
| Security fixes | ✓ | 4 | env, CSP, domains |
| Bug fixes | ✓ | 6 | GA, errors, localStorage |
| Testing setup | ✓ | 8 | Jest + React Testing Library |
| Hooks library | ✓ | 6 | useConsent, useGA, useLocalStorage |
| Context API | ✓ | 4 | Global consent management |
| Initial tests | ✓ | 8 | 15% coverage target |
| Config & CI/CD | ✓ | 4 | Linting, pre-commit, GitHub Actions |
| **TOTAL** | | **40 hours** | **2 weeks** |

---

# PHASE 2: ARCHITECTURE & CODE QUALITY (Weeks 3-4)

## Week 3: Component Refactoring & Organization

### 3.1 Reorganize Components (Day 1-2)
**Priority**: 🟡 HIGH | **Effort**: 6 hours

**New Structure**:
```
apps/web-eg/components/
├── primitives/              (Base UI components)
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Badge.tsx
├── shared/                  (Reusable feature components)
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── CTA.tsx
│   └── Newsletter.tsx
├── features/                (Feature-specific)
│   ├── blog/
│   │   ├── BlogCard.tsx
│   │   ├── BlogGrid.tsx
│   │   └── BlogSearch.tsx
│   ├── portfolio/
│   │   ├── PortfolioCard.tsx
│   │   ├── PortfolioGrid.tsx
│   │   └── FilterButtons.tsx
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   └── ContactInfo.tsx
│   └── services/
│       ├── ServiceCard.tsx
│       └── ServiceGrid.tsx
├── layout/                  (Layout-specific)
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── MainLayout.tsx
└── sections/                (Page sections)
    ├── Hero.tsx
    ├── Features.tsx
    ├── Testimonials.tsx
    └── Stats.tsx
```

**Migration Tasks**:
- [ ] Create directory structure
- [ ] Move existing components
- [ ] Update import paths
- [ ] Update tests

### 3.2 Enhance Type Safety (Day 2-3)
**Priority**: 🟡 HIGH | **Effort**: 5 hours

**Create**: `apps/web-eg/types/index.ts`
```typescript
// Schema types
export interface LocalBusinessSchema {
  '@context': 'https://schema.org'
  '@type': ['LocalBusiness', 'MarketingAgency', 'ProfessionalService']
  '@id': string
  name: string
  url: string
  // ... other fields with strict types
}

// Domain types
export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  author: Author
  publishedAt: Date
  updatedAt: Date
  tags: string[]
  image: Image
  readingTime: number
}

export interface Portfolio {
  id: string
  title: string
  description: string
  images: Image[]
  results: string[]
  tools: string[]
  link: string
}

export interface Image {
  src: string
  alt: string
  width: number
  height: number
  placeholder?: string
}

export interface Author {
  name: string
  email: string
  avatar?: string
  bio?: string
}
```

**Add strict TypeScript checks**:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### 3.3 Add Comprehensive JSDoc (Day 3-4)
**Priority**: 🟡 MEDIUM | **Effort**: 6 hours

**Example**:
```typescript
/**
 * GoogleAnalytics component - Tracks page views and events with GDPR consent
 * @component
 * 
 * @example
 * return (
 *   <GoogleAnalytics />
 * )
 * 
 * @remarks
 * - Only loads GA script if user has granted consent
 * - Listens for consent changes via ConsentContext
 * - Anonymizes IP addresses
 * 
 * @returns React component that injects GA script tags
 */
export function GoogleAnalytics() {
  // ...
}

/**
 * Handles user consent for analytics tracking
 * @hook
 * 
 * @returns {Object} Consent state and control functions
 * @returns {boolean} consent - Current consent status
 * @returns {Function} grantConsent - Grant analytics consent
 * @returns {Function} denyConsent - Revoke analytics consent
 * @returns {boolean} mounted - Hydration status
 * 
 * @example
 * const { consent, grantConsent } = useConsent()
 */
export function useConsent() {
  // ...
}
```

### 3.4 More Test Coverage (Day 4-5)
**Priority**: 🔴 CRITICAL | **Effort**: 8 hours | **Target**: 30% coverage

**Tests to add**:
- [ ] All primitive components (Button, Card, Input)
- [ ] Shared components (Navigation, Footer, CTA)
- [ ] Feature components (BlogCard, PortfolioCard)
- [ ] More hook tests

---

## Week 4: Styling & Design System Enhancement

### 4.1 Enhance Tailwind Configuration (Day 1-2)
**Priority**: 🟡 HIGH | **Effort**: 4 hours

**Update**: `apps/web-eg/tailwind.config.ts`
```typescript
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          900: '#0c2d42',
        },
        secondary: {
          50: '#f5f5f5',
          500: '#6b7280',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        display: ['Cairo', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-rtl'),
  ],
}

export default config
```

### 4.2 Create Component Library (Day 2-4)
**Priority**: 🟡 HIGH | **Effort**: 10 hours

**Core Primitives** (`apps/web-eg/components/primitives/`):

**Button.tsx** - Multiple variants, sizes, states
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border-2 border-blue-600 text-blue-600',
    ghost: 'hover:bg-gray-100 text-gray-900',
  }
  
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`rounded-lg font-semibold transition ${variants[variant]} ${sizes[size]}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
```

**Card.tsx** - Flexible card component
```typescript
interface CardProps {
  children: React.ReactNode
  hover?: boolean
  className?: string
}

export function Card({ children, hover, className }: CardProps) {
  return (
    <div
      className={`
        rounded-lg border border-gray-200 bg-white p-6
        ${hover ? 'hover:shadow-lg hover:border-gray-300 transition-all' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
```

**Input.tsx** - Form input with validation
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <input
        className={`
          w-full px-4 py-2 rounded-lg border-2 
          ${error ? 'border-red-500' : 'border-gray-300'}
          focus:outline-none focus:border-blue-500
        `}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
```

**Badge.tsx** - Status indicators
```typescript
interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'error'
  children: React.ReactNode
}

export function Badge({ variant = 'primary', children }: BadgeProps) {
  const variants = {
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  }

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm ${variants[variant]}`}>
      {children}
    </span>
  )
}
```

### 4.3 Layout Components (Day 4-5)
**Priority**: 🟡 MEDIUM | **Effort**: 6 hours

**Create**: `apps/web-eg/components/layout/Header.tsx`
```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Button } from '@/components/primitives/Button'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="MediaBubble" className="h-8 w-8" />
          <span className="font-bold text-xl">MediaBubble</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/services">Services</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <Button variant="primary" size="sm">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          ☰
        </button>
      </div>
    </header>
  )
}
```

---

### 📊 Phase 2 Summary
| Item | Hours | Status |
|------|-------|--------|
| Component reorganization | 6 | ✓ |
| Type safety enhancements | 5 | ✓ |
| JSDoc documentation | 6 | ✓ |
| Test coverage (target 30%) | 8 | ✓ |
| Tailwind configuration | 4 | ✓ |
| Primitive components | 10 | ✓ |
| Layout components | 6 | ✓ |
| **TOTAL** | **45 hours** | **2 weeks** |

---

# PHASE 3: UI/UX MODERNIZATION (Weeks 5-7)

## Week 5: Design System & Component Library

### 5.1 Design System Foundation
**Priority**: 🟢 HIGH | **Effort**: 8 hours

**Create**: `packages/design-system/src/components.ts`
```typescript
// Export all components with versions
export { Button } from './Button'
export { Card } from './Card'
export { Input } from './Input'
export { Badge } from './Badge'
// ... more exports
```

### 5.2 Hero Section Redesign
**Priority**: 🟢 HIGH | **Effort**: 6 hours

**Create**: `apps/web-eg/components/sections/Hero.tsx`
```typescript
export function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center">
      <div className="container mx-auto px-4 py-16 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Elevate Your Brand's Digital Presence
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Full-service marketing agency in Hurghada. We help businesses grow through 
              strategic SEO, paid advertising, branding, and web development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg">Get Started</Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative h-96 md:h-full">
            <Image
              src="/hero-image.jpg"
              alt="Marketing team working"
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
```

### 5.3 Features Section
**Priority**: 🟡 MEDIUM | **Effort**: 5 hours

**Create**: `apps/web-eg/components/sections/Features.tsx`
```typescript
const FEATURES = [
  {
    icon: '🎯',
    title: 'Strategic Planning',
    description: 'Data-driven strategies tailored to your business goals',
  },
  {
    icon: '📈',
    title: 'Growth Marketing',
    description: 'Proven methods to scale your business sustainably',
  },
  {
    icon: '🎨',
    title: 'Creative Design',
    description: 'Award-winning design that captivates your audience',
  },
  {
    icon: '📊',
    title: 'Analytics & Insights',
    description: 'Real-time tracking and actionable performance metrics',
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MediaBubble</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We combine creativity with data to deliver measurable results for your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature) => (
            <Card key={feature.title} hover>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 5.4 Services Showcase
**Priority**: 🟡 MEDIUM | **Effort**: 6 hours

**Create**: `apps/web-eg/components/sections/Services.tsx`
```typescript
const SERVICES = [
  {
    id: 'seo',
    title: 'SEO & Organic Growth',
    description: 'Increase visibility and drive qualified traffic through search',
    image: '/services/seo.jpg',
    highlights: ['Keyword Research', 'On-page Optimization', 'Link Building'],
  },
  {
    id: 'ads',
    title: 'Paid Advertising',
    description: 'Reach your target audience with precision-targeted campaigns',
    image: '/services/ads.jpg',
    highlights: ['Google Ads', 'Facebook Ads', 'Campaign Optimization'],
  },
  // ... more services
]

export function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-16">Our Services</h2>
        
        <div className="space-y-16">
          {SERVICES.map((service, index) => (
            <div key={service.id} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-cols-2 md:direction-reverse' : ''}`}>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center">
                      <span className="text-blue-500 mr-3">✓</span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="primary">Learn More</Button>
              </div>
              <div className="relative h-96">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 5.5 Dark Mode Support
**Priority**: 🟡 MEDIUM | **Effort**: 4 hours

**Update**: All components with dark mode support
```typescript
// Example: Card component with dark mode
export function Card({ children, hover, className }: CardProps) {
  return (
    <div
      className={`
        rounded-lg border bg-white text-gray-900
        dark:bg-gray-800 dark:text-white dark:border-gray-700
        ${hover ? 'hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
```

---

## Week 6-7: Page Redesigns & New Components

### 6.1 Blog Page Redesign
**Priority**: 🟢 HIGH | **Effort**: 8 hours

**UI Improvements**:
- [ ] Modern blog grid with featured posts
- [ ] Better post card design (image, excerpt, tags, reading time)
- [ ] Sidebar with categories and recent posts
- [ ] Search functionality (frontend + backend integration)
- [ ] Featured articles banner
- [ ] Pagination or infinite scroll

**Create**: `apps/web-eg/components/features/blog/BlogCard.tsx`
```typescript
interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card hover className="overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 w-full mb-4">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex gap-2 mb-3">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="primary">{tag}</Badge>
          ))}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">{post.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
          <span>{post.author.name}</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>

      <Link href={`/blog/${post.slug}`} className="mt-4">
        <Button variant="outline" className="w-full">Read More</Button>
      </Link>
    </Card>
  )
}
```

**Create**: `apps/web-eg/components/features/blog/BlogSearch.tsx`
```typescript
'use client'

import { useState, useCallback } from 'react'
import { Input } from '@/components/primitives/Input'
import { useGA } from '@/hooks/useGA'

interface BlogSearchProps {
  onSearch: (query: string) => void
}

export function BlogSearch({ onSearch }: BlogSearchProps) {
  const [query, setQuery] = useState('')
  const { trackEvent } = useGA()

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    onSearch(newQuery)
    trackEvent('blog_search', 'query', newQuery.length)
  }, [onSearch, trackEvent])

  return (
    <div className="mb-8">
      <Input
        placeholder="Search blog posts..."
        value={query}
        onChange={handleSearch}
        className="w-full"
      />
    </div>
  )
}
```

### 6.2 Portfolio Page Redesign
**Priority**: 🟢 HIGH | **Effort**: 8 hours

**UI Improvements**:
- [ ] Modern portfolio grid layout
- [ ] High-quality case study images
- [ ] Filter by category/technology
- [ ] Enhanced portfolio cards with hover effects
- [ ] Case study detail pages
- [ ] Client testimonials integration

**Create**: `apps/web-eg/components/features/portfolio/PortfolioCard.tsx`
```typescript
interface PortfolioCardProps {
  project: Portfolio
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0)

  return (
    <Link href={`/portfolio/${project.id}`}>
      <Card hover className="overflow-hidden cursor-pointer h-full">
        {/* Image Carousel */}
        <div className="relative h-64 w-full mb-4 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={project.images[hoveredImageIndex].src}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          
          {/* Image dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {project.images.map((_, i) => (
              <button
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === hoveredImageIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
                }`}
                onMouseEnter={() => setHoveredImageIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{project.description}</p>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Results:</p>
          <ul className="space-y-1">
            {project.results.slice(0, 2).map((result, i) => (
              <li key={i} className="text-sm text-gray-600">✓ {result}</li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-2">
          {project.tools.slice(0, 3).map((tool) => (
            <Badge key={tool} variant="secondary">{tool}</Badge>
          ))}
        </div>
      </Card>
    </Link>
  )
}
```

### 6.3 Contact Form Enhancement
**Priority**: 🟡 MEDIUM | **Effort**: 4 hours

**Create**: `apps/web-eg/components/features/contact/ContactForm.tsx`
```typescript
'use client'

import { useState } from 'react'
import { useGA } from '@/hooks/useGA'
import { Button } from '@/components/primitives/Button'
import { Input } from '@/components/primitives/Input'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const { trackEvent } = useGA()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    trackEvent('contact_form_submit', 'initiated')

    try {
      // Send to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', company: '', message: '' })
        trackEvent('contact_form_submit', 'success')
      } else {
        setStatus('error')
        trackEvent('contact_form_submit', 'error')
      }
    } catch (error) {
      setStatus('error')
      trackEvent('contact_form_submit', 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <Input
        label="Full Name"
        placeholder="John Doe"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <Input
        label="Email"
        type="email"
        placeholder="john@example.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <Input
        label="Company"
        placeholder="Acme Inc."
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
      />

      <div>
        <label className="block text-sm font-medium mb-2">Message</label>
        <textarea
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={5}
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <Button type="submit" variant="primary" size="lg" isLoading={status === 'loading'}>
        {status === 'success' ? '✓ Message Sent' : 'Send Message'}
      </Button>

      {status === 'error' && (
        <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
      )}
      {status === 'success' && (
        <p className="text-green-500 text-center">Thanks for reaching out! We'll be in touch soon.</p>
      )}
    </form>
  )
}
```

---

### 📊 Phase 3 Summary
| Item | Hours | Components |
|------|-------|-----------|
| Design system foundation | 8 | All primitives |
| Hero section redesign | 6 | Hero + CTA |
| Features section | 5 | FeatureCard |
| Services showcase | 6 | ServiceCard |
| Dark mode support | 4 | All components |
| Blog page redesign | 8 | BlogCard, BlogSearch, BlogGrid |
| Portfolio page redesign | 8 | PortfolioCard, PortfolioGrid |
| Contact form enhancement | 4 | ContactForm |
| **TOTAL** | **49 hours** | **3 weeks** |

---

# PHASE 4: CONTENT & ASSETS (Weeks 8-9)

## Week 8: Blog Content Enhancement

### 8.1 Blog Post Images
**Priority**: 🟢 HIGH | **Effort**: 12 hours

**Tasks**:
- [ ] Create/source 10+ high-quality blog post featured images
- [ ] Optimize images for web (compression, responsive sizes)
- [ ] Add image metadata (alt text, descriptions)
- [ ] Create placeholder system for missing images
- [ ] Set up image CDN (Cloudinary or similar)

**Image Specifications**:
- Featured image: 1200 x 630 px (OG size)
- Blog card thumbnail: 600 x 400 px
- Format: WebP + JPEG fallback
- Max file size: 100 KB (compressed)

**Update blog posts with image data**:
```typescript
const blogPosts = [
  {
    slug: 'seo-strategy-2024',
    title: '2024 SEO Strategy Guide',
    image: {
      src: '/blog/seo-2024.webp',
      alt: 'SEO strategy diagram showing ranking factors',
      width: 1200,
      height: 630,
      placeholder: 'data:image/...',
    },
  },
  // ... more posts
]
```

### 8.2 Blog Post Content Improvements
**Priority**: 🟡 MEDIUM | **Effort**: 8 hours

**Updates for existing posts**:
- [ ] Add table of contents for longer articles
- [ ] Add reading time estimate
- [ ] Add related posts section
- [ ] Add author bio + social links
- [ ] Add newsletter signup CTA
- [ ] Add social sharing buttons
- [ ] Ensure all posts have proper meta descriptions

---

## Week 9: Portfolio & Case Studies

### 9.1 Portfolio Project Images
**Priority**: 🟢 HIGH | **Effort**: 16 hours

**Tasks**:
- [ ] Gather/create 3-5 portfolio projects with multiple images each
- [ ] Screenshot-based: Project overview, results, tools used
- [ ] Create mockup images of websites/apps
- [ ] Create before/after comparison images
- [ ] Optimize all images for web

**Portfolio project structure**:
```typescript
const portfolioProjects = [
  {
    id: 'luxury-resort-marketing',
    title: 'Luxury Resort SEO & Branding',
    description: 'Transformed a 3-star resort into a top-ranked vacation destination',
    images: [
      { src: '/portfolio/resort-homepage.jpg', alt: 'Resort website redesign' },
      { src: '/portfolio/resort-booking.jpg', alt: 'Booking page conversion optimization' },
      { src: '/portfolio/resort-seo-results.jpg', alt: 'SEO ranking improvements' },
    ],
    results: [
      '300% increase in organic traffic',
      'Top 3 ranking for 50+ keywords',
      '45% increase in booking conversion rate',
    ],
    tools: ['SEO', 'Content Strategy', 'Web Design', 'Analytics'],
    link: 'https://example-resort.com',
  },
  // ... more projects
]
```

### 9.2 Case Study Pages
**Priority**: 🟡 MEDIUM | **Effort**: 8 hours

**Create**: `apps/web-eg/app/portfolio/[id]/page.tsx`
```typescript
export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const project = portfolioProjects.find(p => p.id === params.id)

  if (!project) return <NotFound />

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{project.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl">{project.description}</p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {project.images.map((image, i) => (
              <div key={i} className="relative h-96">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Results</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {project.results.map((result, i) => (
              <Card key={i}>
                <p className="text-lg font-semibold text-gray-900">{result}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tools & Technologies</h2>
          <div className="flex flex-wrap gap-4">
            {project.tools.map((tool) => (
              <Badge key={tool} variant="primary">{tool}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <Button variant="primary">Get Your Free Consultation</Button>
        </div>
      </section>
    </main>
  )
}
```

---

### 📊 Phase 4 Summary
| Item | Hours | Notes |
|------|-------|-------|
| Blog featured images | 12 | 10+ posts, optimized |
| Blog content enhancements | 8 | TOC, reading time, CTA |
| Portfolio project images | 16 | 5 projects, 3-5 images each |
| Case study pages | 8 | Dynamic routing, detailed layout |
| **TOTAL** | **44 hours** | **2 weeks** |

---

# PHASE 5: FEATURES & PERFORMANCE (Weeks 10-11)

## Week 10: Feature Implementation

### 10.1 Blog Search (Day 1-3)
**Priority**: 🟢 MEDIUM | **Effort**: 8 hours

**Frontend**: Already done in Phase 3 (BlogSearch component)

**Backend API** - `apps/web-eg/app/api/search/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { blogPosts } from '@/lib/blog'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.toLowerCase() || ''

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  const results = blogPosts.filter(post => 
    post.title.toLowerCase().includes(query) ||
    post.description.toLowerCase().includes(query) ||
    post.tags.some(tag => tag.toLowerCase().includes(query))
  )

  return NextResponse.json({ results })
}
```

### 10.2 A/B Testing Framework (Day 3-5)
**Priority**: 🟡 MEDIUM | **Effort**: 8 hours

**Create**: `apps/web-eg/lib/experiments.ts`
```typescript
type ExperimentVariant = 'control' | 'variant'

interface Experiment {
  id: string
  name: string
  description: string
  variants: {
    control: string
    variant: string
  }
  splitPercentage: number
  active: boolean
}

const EXPERIMENTS: Record<string, Experiment> = {
  'cta-button-color': {
    id: 'cta-button-color',
    name: 'CTA Button Color',
    description: 'Testing blue vs red CTA buttons',
    variants: { control: 'Blue', variant: 'Red' },
    splitPercentage: 50,
    active: true,
  },
}

export function getExperimentVariant(experimentId: string, userId: string): ExperimentVariant {
  const experiment = EXPERIMENTS[experimentId]
  if (!experiment?.active) return 'control'

  const hash = generateHash(`${userId}-${experimentId}`)
  return hash % 100 < experiment.splitPercentage ? 'variant' : 'control'
}

function generateHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}
```

**Use in components**:
```typescript
export function HeroSection() {
  const userId = useUserId() // or from analytics
  const variant = getExperimentVariant('cta-button-color', userId)
  const buttonColor = variant === 'variant' ? 'bg-red-600' : 'bg-blue-600'

  return <Button className={buttonColor}>Get Started</Button>
}
```

## Week 11: Performance Optimization

### 11.1 Font Optimization (Day 1-2)
**Priority**: 🟡 MEDIUM | **Effort**: 3 hours

**Update**: `apps/web-eg/app/layout.tsx`
```typescript
// Load fonts with display swap to prevent layout shift
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap', // Critical: prevent layout shift
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
  variable: '--font-cairo',
})

// Load fonts conditionally based on language
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale() // from i18n
  
  return (
    <html lang={locale} className={locale === 'ar' ? cairo.variable : inter.variable}>
      {children}
    </html>
  )
}
```

### 11.2 Image Optimization (Day 2-3)
**Priority**: 🟡 MEDIUM | **Effort**: 4 hours

**Create**: `apps/web-eg/lib/image-loader.ts`
```typescript
export const imageLoader = ({ src, width, quality }: any) => {
  // Use Cloudinary or similar service
  if (src.startsWith('http')) return src
  
  return `https://res.cloudinary.com/mediabubble/image/fetch/w_${width},q_${quality || 75}/https://mediabubble.co${src}`
}
```

**Use in Next.js config**:
```typescript
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    formats: ['image/avif', 'image/webp', 'image/jpeg'],
  },
}
```

### 11.3 Service Worker & Offline Support (Day 3-5)
**Priority**: 🟡 MEDIUM | **Effort**: 6 hours

**Install package**:
```bash
npm install next-pwa
```

**Update**: `apps/web-eg/next.config.js`
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/images\./i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\./i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'fonts-cache',
      },
    },
  ],
})

module.exports = withPWA(nextConfig)
```

### 11.4 ISR for Blog Posts (Day 5)
**Priority**: 🟡 MEDIUM | **Effort**: 2 hours

**Update**: `apps/web-eg/app/blog/[slug]/page.tsx`
```typescript
export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug)
  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      image: post?.image.src,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug)
  return <BlogPostContent post={post} />
}
```

---

### 📊 Phase 5 Summary
| Item | Hours | Status |
|------|-------|--------|
| Blog search | 8 | ✓ |
| A/B testing framework | 8 | ✓ |
| Font optimization | 3 | ✓ |
| Image optimization | 4 | ✓ |
| Service worker & PWA | 6 | ✓ |
| ISR setup | 2 | ✓ |
| **TOTAL** | **31 hours** | **2 weeks** |

---

# PHASE 6: POLISH & LAUNCH (Week 12)

## Final Week: QA, Testing & Deployment

### 6.1 E2E Testing (Day 1-2)
**Priority**: 🟡 HIGH | **Effort**: 6 hours

**Install Playwright**:
```bash
npm install --save-dev @playwright/test
```

**Create**: `apps/web-eg/e2e/homepage.spec.ts`
```typescript
import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load and render hero section', async ({ page }) => {
    await page.goto('/')
    
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    await expect(heading).toContainText('Digital Presence')
  })

  test('should navigate to services page', async ({ page }) => {
    await page.goto('/')
    
    const servicesLink = page.locator('a[href="/services"]')
    await servicesLink.click()
    
    await expect(page).toHaveURL('/services')
  })

  test('should open contact form', async ({ page }) => {
    await page.goto('/')
    
    const contactBtn = page.locator('button', { hasText: /Get Started/i })
    await contactBtn.click()
    
    const form = page.locator('form')
    await expect(form).toBeVisible()
  })

  test('should submit contact form', async ({ page }) => {
    await page.goto('/')
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('textarea', 'Test message')
    
    const submitBtn = page.locator('button[type="submit"]')
    await submitBtn.click()
    
    const success = page.locator('text=Message Sent')
    await expect(success).toBeVisible()
  })
})
```

### 6.2 Performance Testing (Day 2-3)
**Priority**: 🟡 MEDIUM | **Effort**: 4 hours

**Bundle Analysis**:
```bash
npm install --save-dev @next/bundle-analyzer

# In next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
```

**Run**: `ANALYZE=true npm run build`

**Performance Audit Checklist**:
- [ ] Lighthouse score >90 (all categories)
- [ ] Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- [ ] Bundle size <200KB gzipped
- [ ] First Paint <2s
- [ ] First Contentful Paint <3s

### 6.3 Final QA & Testing (Day 3-4)
**Priority**: 🔴 CRITICAL | **Effort**: 6 hours

**QA Checklist**:
- [ ] All pages load without errors
- [ ] Mobile responsive (all breakpoints)
- [ ] Forms submit correctly
- [ ] Links all work
- [ ] Images load properly
- [ ] Dark mode works everywhere
- [ ] RTL (Arabic) layout correct
- [ ] Analytics tracking works
- [ ] Error pages display correctly
- [ ] 404 pages work
- [ ] Sitemap.xml generates
- [ ] robots.txt configured

**Browser Testing**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 6.4 Monitoring Setup (Day 4-5)
**Priority**: 🟡 MEDIUM | **Effort**: 4 hours

**Sentry Setup** - Error tracking:
```bash
npm install @sentry/nextjs
```

**Configure**: `apps/web-eg/sentry.server.config.ts`
```typescript
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
})
```

**Web Vitals Monitoring**:
```typescript
// pages/_app.tsx
import { reportWebVitals } from 'next/vitals'

export function reportWebVitals(metric: any) {
  // Send to analytics
  console.log(metric)
}
```

### 6.5 Deployment (Day 5)
**Priority**: 🔴 CRITICAL | **Effort**: 2 hours

**Steps**:
- [ ] Final security audit
- [ ] Final performance check
- [ ] Deploy to staging
- [ ] Run full E2E tests on staging
- [ ] Deploy to production
- [ ] Monitor for errors (first 24 hours)
- [ ] Celebrate! 🎉

**Vercel Deployment**:
```bash
vercel --prod
```

---

### 📊 Phase 6 Summary
| Item | Hours | Status |
|------|-------|--------|
| E2E testing | 6 | ✓ |
| Performance testing | 4 | ✓ |
| Final QA | 6 | ✓ |
| Monitoring setup | 4 | ✓ |
| Deployment | 2 | ✓ |
| **TOTAL** | **22 hours** | **1 week** |

---

# 📊 MASTER TIMELINE SUMMARY

```
Phase 1: Foundation & Security      (Weeks 1-2)    40 hours  ████
Phase 2: Architecture & Quality    (Weeks 3-4)    45 hours  ████
Phase 3: UI/UX Modernization       (Weeks 5-7)    49 hours  █████
Phase 4: Content & Assets          (Weeks 8-9)    44 hours  ████
Phase 5: Features & Performance    (Weeks 10-11)  31 hours  ███
Phase 6: Polish & Launch           (Week 12)      22 hours  ██

TOTAL: 12 weeks | 231 hours | ~6 weeks full-time or 12 weeks part-time
```

---

# 🎯 SUCCESS METRICS BY PHASE

## Phase 1 Completion Criteria
- ✅ 0 security vulnerabilities
- ✅ 0 hardcoded credentials in git
- ✅ Testing infrastructure in place
- ✅ 15% test coverage
- ✅ CI/CD pipeline working

## Phase 2 Completion Criteria
- ✅ Components organized by feature
- ✅ 100% TypeScript strict mode
- ✅ All exports documented with JSDoc
- ✅ 30% test coverage
- ✅ Global state management working

## Phase 3 Completion Criteria
- ✅ Design system complete (30+ components)
- ✅ All pages redesigned (modern, clean, high-quality)
- ✅ Dark mode working everywhere
- ✅ Responsive on all breakpoints
- ✅ Lighthouse score >85

## Phase 4 Completion Criteria
- ✅ 10+ blog posts with optimized images
- ✅ 5+ portfolio projects with case studies
- ✅ All images WebP + JPEG optimized
- ✅ All content properly structured
- ✅ SEO metadata complete

## Phase 5 Completion Criteria
- ✅ Blog search fully functional
- ✅ A/B testing framework live
- ✅ Service worker installed
- ✅ ISR working for blog posts
- ✅ Lighthouse score >90

## Phase 6 Completion Criteria
- ✅ 100% E2E test coverage (critical paths)
- ✅ Core Web Vitals all green
- ✅ Bundle size <200KB gzipped
- ✅ Error tracking live
- ✅ Production deployment successful

---

# 📋 RESOURCE REQUIREMENTS

**Team Size**: 2-3 people
- 1 Frontend Engineer (primary)
- 1 UI/UX Designer (Phase 3-4)
- 1 Content Manager (Phase 4)

**Tools & Services**:
- Testing: Jest, Playwright, React Testing Library
- Monitoring: Sentry, Vercel Analytics
- Images: Cloudinary or similar CDN
- Design: Figma for mockups
- Project Management: Linear/Jira

---

# 🚀 GETTING STARTED TODAY

1. **Immediately (Today)**
   ```bash
   git rm --cached .env.local
   echo ".env.local" >> .gitignore
   git commit -m "chore: remove env from git"
   ```

2. **This Week**
   - Fix CSP `'unsafe-inline'` issue
   - Fix GA consent race condition
   - Add error boundaries
   - Install Jest testing framework

3. **Next 2 Weeks**
   - Write initial tests (15% coverage)
   - Extract custom hooks
   - Implement Context API
   - Reorganize components

4. **Next 4 Weeks**
   - Complete UI modernization
   - Design system in place
   - Page redesigns done
   - All components documented

---

**Status**: Ready to execute
**Timeline**: 12 weeks
**Team**: 2-3 people
**Outcome**: Industry-leading, modern, secure, performant website

Let's build something amazing! 🚀
