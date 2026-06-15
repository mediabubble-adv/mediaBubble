import type { Metadata } from 'next'
import { ISR_REVALIDATE_SECONDS, getAlternates } from '@mediabubble/shared/server'
import { InsightsPageContent } from './content'

export const revalidate = ISR_REVALIDATE_SECONDS.listing

export const metadata: Metadata = {
  title: 'Marketing Blog',
  description:
    'Practical marketing strategy, SEO guides, and campaign insights from the MediaBubble team in Hurghada, Egypt. No fluff, just what works.',
  alternates: getAlternates('/insights', 'eg'),
  openGraph: {
    title:       'Marketing Blog | MediaBubble',
    description: 'Practical strategy and honest analysis from the team that runs campaigns every day.',
    url:         '/insights',
  },
}

export default function InsightsPage() {
  return <InsightsPageContent />
}
