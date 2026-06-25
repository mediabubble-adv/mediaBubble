import type { Metadata } from 'next'
import { getCspNonce, THEME_INIT_SCRIPT } from '@mediabubble/shared/server'
import { rootFontClassName } from '@/lib/fonts'
import { Agentation } from 'agentation'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Launcher',
    default: 'launcher.mediabubble.co',
  },
  description: 'MediaBubble unified internal operations platform.',
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

export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = await getCspNonce()

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          {...(nonce ? { nonce } : {})}
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body
        className={`${rootFontClassName} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        {process.env.NODE_ENV === 'development' && <Agentation />}
      </body>
    </html>
  )
}
