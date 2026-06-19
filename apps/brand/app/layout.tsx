import type { Metadata } from 'next'
import { getCspNonce, resolveMarketSiteConfig, THEME_INIT_SCRIPT } from '@mediabubble/shared/server'
import { I18nProvider } from '@/lib/i18n/provider'
import { I18nErrorBoundary } from '@/components/I18nErrorBoundary'
import { AppProviders } from '@/components/providers/AppProviders'
import { rootFontClassName } from '@/lib/fonts'
import './globals.css'

const site = resolveMarketSiteConfig('brand')

export const metadata: Metadata = {
  title: {
    template: '%s | MediaBubble Brand',
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
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

/** Per-request CSP nonce from middleware — must not be statically cached. */
export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = await getCspNonce()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          {...(nonce ? { nonce } : {})}
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body className={`${rootFontClassName} font-sans antialiased bg-brand-canvas text-brand-text`}>
        <AppProviders>
          <I18nErrorBoundary>
            <I18nProvider>{children}</I18nProvider>
          </I18nErrorBoundary>
        </AppProviders>
      </body>
    </html>
  )
}
