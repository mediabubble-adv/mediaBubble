import type { Metadata } from 'next'
import { Inter, Poppins, JetBrains_Mono, Cairo } from 'next/font/google'
import { resolveMarketSiteConfig } from '@mediabubble/shared/server'
import { I18nProvider } from '@/lib/i18n/provider'
import { I18nErrorBoundary } from '@/components/I18nErrorBoundary'
import './globals.css'

const site = resolveMarketSiteConfig('brand')

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-poppins',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-cairo',
})

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} ${cairo.variable}`}
    >
      <body className="font-sans antialiased bg-brand-canvas text-brand-charcoal">
        <I18nErrorBoundary>
          <I18nProvider>{children}</I18nProvider>
        </I18nErrorBoundary>
      </body>
    </html>
  )
}
