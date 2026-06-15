import type { Metadata } from 'next'
import { ISR_REVALIDATE_SECONDS, getAlternates } from '@mediabubble/shared/server'
import { PortfolioPageContent } from './content'

export const revalidate = ISR_REVALIDATE_SECONDS.listing

export const metadata: Metadata = {
  title: 'Case Studies & Portfolio',
  description:
    'Real results from real MediaBubble clients, 68% more direct bookings, 340% organic traffic growth, 2× lead volume. See how we did it.',
  alternates: getAlternates('/portfolio', 'eg'),
  openGraph: {
    title:       'Case Studies | MediaBubble',
    description: 'Real results from real clients. SEO, branding, paid ads, and web development campaigns that moved the needle.',
    url:         '/portfolio',
  },
}

export default function PortfolioPage() {
  return <PortfolioPageContent />
}
