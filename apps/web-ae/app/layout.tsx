import type { Metadata } from 'next'
import {
  resolveMarketSiteConfig,
  buildMarketJsonLd,
  serializeJsonLd,
  THEME_INIT_SCRIPT,
  DEV_SW_CLEANUP_SCRIPT,
  LANG_INIT_SCRIPT,
  getAlternates,
  getCspNonce,
} from '@mediabubble/shared/server'
import { AppProviders } from '@/components/providers/AppProviders'
import { rootFontClassName } from '@/lib/fonts'
import './globals.css'

const site = resolveMarketSiteConfig('ae')

export const metadata: Metadata = {
  title: {
    template: '%s | MediaBubble',
    default: site.defaultTitle,
  },
  description: site.description,
  metadataBase: new URL(site.siteUrl),
  alternates: getAlternates('/', 'ae'),
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
    // Place a 1200×630 branded card at /public/og.jpg to activate social previews
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'MediaBubble — UAE Marketing Agency' }],
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

const jsonLd = buildMarketJsonLd(site, {
  slogan: "UAE's Leading Marketing Agency",
  businessDescription:
    'Full-service marketing agency in Dubai, UAE. SEO, paid advertising, branding, web development, and social media management for tourism, hospitality, and retail brands. Founded 2015.',
  websiteDescription:
    "UAE's #1 full-service marketing agency — SEO, ads, branding, web, and social.",
  areaServed: [
    { '@type': 'City', name: 'Dubai' },
    { '@type': 'Country', name: 'United Arab Emirates' },
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.2048,
    longitude: 55.2708,
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nonce = getCspNonce()

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: LANG_INIT_SCRIPT }} />
        {process.env.NODE_ENV === 'development' && (
          <script nonce={nonce} dangerouslySetInnerHTML={{ __html: DEV_SW_CLEANUP_SCRIPT }} />
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
