import type { Metadata } from 'next'
import { AboutPageContent } from './content'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'MediaBubble is a full-service marketing agency founded in Hurghada, Egypt in 2015. Meet the 22+ person team behind 200+ client success stories.',
  openGraph: {
    title:       'About MediaBubble — Hurghada Marketing Agency Since 2015',
    description: 'We started in Hurghada because local businesses deserved better than generic agencies. Ten years on, we are the region\'s most trusted marketing partner.',
    url:         'https://mediabubble.com/about',
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}
