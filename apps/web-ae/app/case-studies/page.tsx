import type { Metadata } from 'next'
import { getAlternates } from '@mediabubble/shared/server'
import { CaseStudiesPageContent } from './content'

export const revalidate = 1800

export const metadata: Metadata = {
  title: 'Case Studies & Portfolio',
  description:
    'Real results from real MediaBubble clients — 68% more direct bookings, 340% organic traffic growth, 2× lead volume. See how we did it.',
  alternates: getAlternates('/case-studies', 'ae'),
  openGraph: {
    title:       'Case Studies | MediaBubble',
    description: 'Real results from real clients. SEO, branding, paid ads, and web development campaigns that moved the needle.',
    url:         '/case-studies',
  },
}

export default function CaseStudiesPage() {
  return <CaseStudiesPageContent />
}
