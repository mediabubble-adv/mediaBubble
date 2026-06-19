import type { Metadata } from 'next'
import { rootFontClassName } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Launcher',
    default: 'launcher.mediabubble.co',
  },
  description: 'MediaBubble unified internal operations platform.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rootFontClassName} font-sans antialiased bg-brand-canvas text-brand-text`}
      >
        {children}
      </body>
    </html>
  )
}
