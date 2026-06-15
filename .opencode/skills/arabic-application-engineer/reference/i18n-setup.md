# i18n Setup — Bilingual Routing & Locale Configuration

## Framework: Next.js App Router

### Option A: Middleware-Based Routing (Recommended)

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'ar-EG']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage?.startsWith('ar')) return 'ar-EG'
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
```

### Option B: next-intl Library

```bash
npm install next-intl
```

```typescript
// i18n/request.ts
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
  timeZone: locale === 'ar-EG' ? 'Africa/Cairo' : 'America/New_York',
}))

// i18n/routing.ts
import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['en', 'ar-EG'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: true,
})

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
```

### Directory Structure

```
app/
├── [locale]/
│   ├── layout.tsx       ← locale-aware layout with dir switching
│   ├── page.tsx
│   ├── services/
│   │   └── page.tsx
│   └── about/
│       └── page.tsx
├── layout.tsx           ← root layout
├── middleware.ts        ← locale detection & routing
└── globals.css
```

## Locale-Aware Root Layout

```typescript
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { cairoFont, interFont, poppinsFont } from '@/lib/fonts'

const localeDirections: Record<string, string> = {
  en: 'ltr',
  'ar-EG': 'rtl',
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!routing.locales.includes(locale as any)) notFound()

  const messages = await getMessages()
  const dir = localeDirections[locale] || 'ltr'

  return (
    <html lang={locale} dir={dir}>
      <body className={`${interFont.variable} ${poppinsFont.variable} ${cairoFont.variable} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

## Locale Detection Priority

1. **URL prefix** — `/ar-EG/services` → Arabic, `/en/services` → English
2. **Cookie** — If user previously selected a locale, store in cookie
3. **Accept-Language header** — Browser preference (first visit)
4. **Default** — English (fallback)

## URL Structure Strategies

### Strategy A: Subpath (Recommended)
```
/en/services
/ar-EG/services
```

**Pros:** Best SEO (Google treats each as separate content), clean, works with all hosting, no DNS config needed
**Cons:** Longer URLs for Arabic

### Strategy B: Subdomain
```
en.mediabubble.eg
ar.mediabubble.eg
```

**Pros:** Clear language separation
**Cons:** More DNS config, separate SEO authority per subdomain, harder to maintain

### Strategy C: Domain
```
mediabubble.com (English)
mediabubble.eg (Arabic)
```

**Pros:** Strong country signal for Arabic
**Cons:** Need two domains, split SEO authority, more infrastructure

## Hreflang Implementation (Next.js)

```typescript
// app/[locale]/layout.tsx — in metadata
export async function generateMetadata({ params: { locale } }: {
  params: { locale: string }
}) {
  return {
    alternates: {
      canonical: `https://mediabubble.eg/${locale}/services`,
      languages: {
        'en': 'https://mediabubble.eg/en/services',
        'ar-EG': 'https://mediabubble.eg/ar-EG/services',
        'x-default': 'https://mediabubble.eg/en/services',
      },
    },
  }
}
```

## Sitemap for Bilingual Content

```typescript
// app/sitemap.ts
import { routing } from '@/i18n/routing'

const baseUrl = 'https://mediabubble.eg'

export default async function sitemap() {
  const routes = ['', '/services', '/about', '/doctors']

  const entries = routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${baseUrl}/${l}${route}`])
        ),
      },
    }))
  )

  return entries
}
```

## Locale Switching Component

```typescript
// components/LocaleSwitcher.tsx
'use client'

import { usePathname, useRouter } from '@/i18n/routing'
import { useLocale } from 'next-intl'

export function LocaleSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = useLocale()

  const toggleLocale = () => {
    const next = currentLocale === 'en' ? 'ar-EG' : 'en'
    router.replace(pathname, { locale: next })
  }

  return (
    <button onClick={toggleLocale} dir="ltr">
      {currentLocale === 'en' ? 'AR' : 'EN'}
    </button>
  )
}
```
