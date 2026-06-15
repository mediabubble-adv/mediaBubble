import { Inter, Poppins, JetBrains_Mono, Cairo } from 'next/font/google'

/** Body + UI — preloaded for first paint. */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

/** Display headings — preloaded with Inter. */
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

/** Code blocks only — deferred until `font-mono` is used. */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})

/** Arabic / RTL locale — deferred until `[data-dir="rtl"]` applies Cairo. */
export const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
  preload: false,
})

export const rootFontClassName = [
  inter.variable,
  poppins.variable,
  jetbrainsMono.variable,
  cairo.variable,
].join(' ')

export const FONT_LOAD_STRATEGY = {
  preloaded: ['inter', 'poppins'] as const,
  lazy: ['jetbrainsMono', 'cairo'] as const,
}
