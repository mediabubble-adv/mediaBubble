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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${rootFontClassName} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  )
}
