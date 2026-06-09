import type { Metadata } from 'next'
import { PortfolioPageContent } from './content'

export const metadata: Metadata = {
  title: 'Case Studies & Portfolio',
  description:
    'Real results from real MediaBubble clients — 68% more direct bookings, 340% organic traffic growth, 2× lead volume. See how we did it.',
  openGraph: {
    title:       'Case Studies | MediaBubble',
    description: 'Real results from real clients. SEO, branding, paid ads, and web development campaigns that moved the needle.',
    url:         'https://mediabubble.com/portfolio',
  },
}

export default function PortfolioPage() {
  return <PortfolioPageContent />
}
