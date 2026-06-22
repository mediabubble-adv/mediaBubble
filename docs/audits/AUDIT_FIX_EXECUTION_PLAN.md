# MediaBubble Audit Fix Execution Plan

**Created:** June 11, 2026 | **Status:** Ready for Execution in Cursor IDE

---

## 📋 QUICK START - PHASE 1: CRITICAL FIXES (2-3 HOURS)

These must be fixed before anything else. Use the Cursor IDE prompts below.

### CURSOR PROMPT #1: Fix Duplicate next.config.js Files

```
TASK: Clean up duplicate and conflicting configurations in next.config.js

I need to fix critical build issues in MediaBubble. Both apps/web-eg/next.config.js and apps/web-ae/next.config.js have duplicate and conflicting configurations stacked on top of each other (template code + 2 identical production configs).

ACTION:
1. Open apps/web-eg/next.config.js
2. Delete ALL content
3. Replace with ONLY this single, clean configuration:

---START CODE---
const { composePlugins, withNx } = require('@nx/next')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mediabubble/design-system', '@mediabubble/shared'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.mediabubble.co' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  nx: { svgr: false },
}

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://www.googletagmanager.com https://www.google-analytics.com",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ')

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Content-Security-Policy', value: CSP },
]

nextConfig.headers = async () => [{ source: '/(.*)', headers: securityHeaders }]

const plugins = [withNx]
module.exports = composePlugins(...plugins)(nextConfig)
---END CODE---

4. THEN repeat for apps/web-ae/next.config.js (use identical config)
5. Verify: Each file has ONLY ONE module.exports
6. Test: npm run build

CRITICAL: This must complete before proceeding.
```

### CURSOR PROMPT #2: Create Missing i18n JSON Files

```
TASK: Create missing translation files

MediaBubble's i18n system imports en.json and ar-masri.json but these files don't exist.

ACTION - Create these 4 files:

FILE 1: apps/web-eg/lib/i18n/en.json
---START CODE---
{
  "common.brand": "MediaBubble",
  "common.tagline": "Hurghada Marketing Agency",
  "nav.home": "Home",
  "nav.about": "About",
  "nav.services": "Services",
  "nav.portfolio": "Portfolio",
  "nav.blog": "Blog",
  "nav.contact": "Contact",
  "footer.copyright": "© 2015-2026 MediaBubble. All rights reserved.",
  "footer.description": "Full-service marketing agency in Hurghada, Egypt",
  "cookieConsent.title": "We value your privacy",
  "cookieConsent.body": "We use cookies to improve your experience, analyze site traffic, and remember your language preference.",
  "cookieConsent.learnMore": "Learn more",
  "cookieConsent.accept": "Accept",
  "cookieConsent.decline": "Decline",
  "cookieConsent.close": "Close"
}
---END CODE---

FILE 2: apps/web-eg/lib/i18n/ar-masri.json
---START CODE---
{
  "common.brand": "ميديا بابل",
  "common.tagline": "وكالة تسويق في الغردقة",
  "nav.home": "الرئيسية",
  "nav.about": "من نحن",
  "nav.services": "الخدمات",
  "nav.portfolio": "نماذج الأعمال",
  "nav.blog": "المقالات",
  "nav.contact": "التواصل",
  "footer.copyright": "© 2015-2026 ميديا بابل. جميع الحقوق محفوظة.",
  "footer.description": "وكالة تسويق شاملة في الغردقة، مصر",
  "cookieConsent.title": "نحن نقدر خصوصيتك",
  "cookieConsent.body": "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة الموقع وتذكر تفضيل اللغة.",
  "cookieConsent.learnMore": "اعرف المزيد",
  "cookieConsent.accept": "قبول",
  "cookieConsent.decline": "رفض",
  "cookieConsent.close": "إغلاق"
}
---END CODE---

FILE 3: apps/web-ae/lib/i18n/en.json (copy FILE 1)
FILE 4: apps/web-ae/lib/i18n/ar-masri.json (copy FILE 2)

After creating, run: npm run typecheck
Should see no module resolution errors.
```

### CURSOR PROMPT #3: Add Environment Validation

```
TASK: Add env variable validation

ACTION:
1. Open or create packages/shared/src/env.ts
2. Replace with:

---START CODE---
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_GA4_ID: z.string().min(1, 'GA4 ID is required'),
  NEXT_PUBLIC_SITE_URL: z.string().url('SITE_URL must be valid URL').optional(),
})

const parseEnv = () => {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_GA4_ID: process.env.NEXT_PUBLIC_GA4_ID,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  })

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:')
    Object.entries(parsed.error.flatten().fieldErrors).forEach(([key, errors]) => {
      console.error(`  ${key}: ${errors?.join(', ')}`)
    })
    throw new Error('Invalid environment variables')
  }

  return parsed.data
}

export const env = parseEnv()
---END CODE---

3. Update packages/shared/src/index.ts - add:
export { env } from './env'

4. Test: npm run typecheck
```

---

## PHASE 2: HIGH PRIORITY FIXES (3-4 HOURS)

### CURSOR PROMPT #4: Fix GA4 Consent Detection Race Condition

```
TASK: Fix analytics consent detection

The GA4 script won't load if users accept cookies but don't refocus the window.

ACTION 1: Update apps/web-eg/components/GoogleAnalytics.tsx

Replace entire file with:

---START CODE---
'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID
const CONSENT_KEY = 'mediabubble-cookie-consent'

function hasConsent(): boolean {
  try {
    return typeof window !== 'undefined' && localStorage.getItem(CONSENT_KEY) === 'accepted'
  } catch {
    return false
  }
}

export function GoogleAnalytics() {
  const [consented, setConsented] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (hasConsent()) {
      setConsented(true)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleConsentGranted = () => {
      if (hasConsent()) {
        setConsented(true)
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY && e.newValue === 'accepted') {
        setConsented(true)
      }
    }

    window.addEventListener('cookieConsentGranted', handleConsentGranted)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('cookieConsentGranted', handleConsentGranted)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [mounted])

  if (!mounted || !GA_ID || !consented) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            send_page_view: true,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  )
}
---END CODE---

ACTION 2: Update apps/web-eg/components/CookieConsent.tsx

Find handleChoice function and update to:

---START CODE---
const handleChoice = (choice: 'accepted' | 'declined') => {
  localStorage.setItem(CONSENT_KEY, choice)
  setStatus(choice)
  setVisible(false)

  if (choice === 'accepted') {
    window.dispatchEvent(new Event('cookieConsentGranted'))
  }
}
---END CODE---

ACTION 3: Repeat both changes for apps/web-ae/

Test: Accept cookies → GA4 should load immediately
```

### CURSOR PROMPT #5: Optimize Fonts & Images

```
TASK: Optimize font loading and add remote image patterns

ACTION 1: Update apps/web-eg/app/layout.tsx

Find Cairo font definition:
const cairo = Cairo({ subsets: ['arabic', 'latin'], weight: ['400', '600', '700', '800', '900'], ... })

Replace with:
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
  variable: '--font-cairo'
})

ACTION 2: Update apps/web-ae/app/layout.tsx (same change)

ACTION 3: next.config.js already has remotePatterns from Prompt #1, verify it includes:
{
  protocol: 'https',
  hostname: 'images.unsplash.com',
}

Test: npm run build (should show no image optimization warnings)
```

---

## PHASE 3: MEDIUM PRIORITY IMPROVEMENTS (2-3 HOURS)

### CURSOR PROMPT #6: Fix Z-Index Management

```
TASK: Use CSS variables instead of hardcoded z-index

ACTION: Update CookieConsent.tsx (both apps)

Find this line:
className={`fixed inset-x-0 bottom-0 z-[9999] flex ...`}

Replace z-[9999] with z-[var(--z-tooltip)]:
className={`fixed inset-x-0 bottom-0 z-[var(--z-tooltip)] flex ...`}

This uses the design token from globals.css instead of breaking the z-index scale.

Test: npm run build
```

### CURSOR PROMPT #7: Add Error Boundary for i18n

```
TASK: Create error boundary so i18n failures don't crash the page

ACTION 1: Create apps/web-eg/components/I18nErrorBoundary.tsx

---START CODE---
'use client'

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class I18nErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('i18n initialization failed:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'system-ui' }}>
          <h1>Translation Error</h1>
          <p>We encountered an issue loading translations. Please refresh the page.</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      )
    }

    return this.props.children
  }
}
---END CODE---

ACTION 2: Update apps/web-eg/components/I18nLayoutWrapper.tsx

Add import:
import { I18nErrorBoundary } from './I18nErrorBoundary'

Wrap provider:
return (
  <I18nErrorBoundary>
    <I18nProvider>
      {children}
      <CookieConsent />
      <Phase1Provider />
      <Phase3Provider />
    </I18nProvider>
  </I18nErrorBoundary>
)

ACTION 3: Repeat for apps/web-ae/

Test: npm run typecheck
```

### CURSOR PROMPT #8: Add Cache-Control Headers

```
TASK: Add caching headers to improve performance

ACTION: Update apps/web-eg/next.config.js and apps/web-ae/next.config.js

In the nextConfig.headers assignment, add these header configurations:

---START CODE---
nextConfig.headers = async () => [
  // Security headers
  {
    source: '/(.*)',
    headers: securityHeaders,
  },
  // Cache fonts for 1 year
  {
    source: '/fonts/:path*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
    ],
  },
  // Cache images for 1 week
  {
    source: '/images/:path*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=604800' },
    ],
  },
  // Cache static assets for 1 year
  {
    source: '/assets/:path*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
    ],
  },
  // No caching for HTML
  {
    source: '/:path((?!_next/static|fonts|images|assets).*)',
    headers: [
      { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
    ],
  },
]
---END CODE---

Test: npm run build
```

---

## VERIFICATION CHECKLIST

After each phase, verify:

**Phase 1 Complete?**

- [ ] npm run build succeeds
- [ ] npm run typecheck passes
- [ ] No module resolution errors

**Phase 2 Complete?**

- [ ] GA4 loads when cookies accepted
- [ ] No image optimization warnings
- [ ] npm run build succeeds

**Phase 3 Complete?**

- [ ] Cookie banner renders correctly
- [ ] No z-index conflicts
- [ ] Cache headers present

---

## EXECUTION ORDER

**Copy these prompts into Cursor IDE in this exact order:**

1. **CURSOR PROMPT #1** - Fix duplicate configs
2. **CURSOR PROMPT #2** - Create i18n files
3. **CURSOR PROMPT #3** - Add env validation
4. Test: `npm run build && npm run typecheck`
5. **CURSOR PROMPT #4** - Fix GA4 consent
6. **CURSOR PROMPT #5** - Optimize fonts/images
7. Test: `npm run build`
8. **CURSOR PROMPT #6** - Fix z-index
9. **CURSOR PROMPT #7** - Add error boundary
10. **CURSOR PROMPT #8** - Add cache headers
11. Final test: `npm run build && npm run typecheck`

---

**Total Execution Time:** 8-10 hours over 1-2 days  
**Status:** Ready to execute immediately in Cursor IDE

**Last Updated:** June 11, 2026
