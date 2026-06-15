import type { Metadata } from 'next'
import { headers } from 'next/headers'
import {
  resolveMarketSiteConfig,
  buildMarketJsonLd,
  serializeJsonLd,
  THEME_INIT_SCRIPT,
  DEV_SW_CLEANUP_SCRIPT,
} from '@mediabubble/shared/server'
import { AppProviders } from '@/components/providers/AppProviders'
import { rootFontClassName } from '@/lib/fonts'
import './globals.css'

const site = resolveMarketSiteConfig('eg')

export const metadata: Metadata = {
  title: {
    template: '%s | MediaBubble',
    default: site.defaultTitle,
  },
  description: site.description,
  metadataBase: new URL(site.siteUrl),
  icons: {
    icon: [
      { url: '/assets/Logo/logo-favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/Logo/logo-favicon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/assets/Logo/logo-favicon.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    siteName:    'MediaBubble',
    locale:      'en_US',
    type:        'website',
    title:       site.openGraphTitle,
    description: site.openGraphDescription,
    // Place a 1200\u00d7630 branded card at /public/og.jpg to activate social previews
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'MediaBubble \u2014 Hurghada Marketing Agency' }],
  },
  twitter: {
    card:    'summary_large_image',
    site:    '@mediabubble',
    creator: '@mediabubble',
    images:  ['/og.jpg'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

/** Per-request nonce from middleware requires dynamic rendering. */
export const dynamic = 'force-dynamic'


const jsonLd = buildMarketJsonLd(site, {
  slogan: "Hurghada's #1 Marketing Agency",
  businessDescription:
    'Full-service marketing agency in Hurghada, Egypt. SEO, paid advertising, branding, web development, and social media management for tourism, hospitality, and retail brands. Founded 2015.',
  websiteDescription:
    "Hurghada's #1 full-service marketing agency — SEO, ads, branding, web, and social.",
  areaServed: [
    { '@type': 'City', name: 'Hurghada' },
    { '@type': 'Country', name: 'Egypt' },
    { '@type': 'Country', name: 'United Arab Emirates' },
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 27.2579,
    longitude: 33.8116,
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nonce = headers().get('x-nonce') ?? undefined

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === 'development' && (
          <script dangerouslySetInnerHTML={{ __html: DEV_SW_CLEANUP_SCRIPT }} />
        )}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(jsonLd),
          }}
        />
        {/* Preconnect to origins loaded at runtime */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body className={`${rootFontClassName} font-sans`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
