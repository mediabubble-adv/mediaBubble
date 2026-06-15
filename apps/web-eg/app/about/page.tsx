import type { Metadata } from 'next'
import { AboutPageContent } from './content'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Full-service marketing agency in Hurghada since 2015. 22+ specialists, 200+ clients. Proven results in tourism, hospitality, retail, and real estate.',
  alternates: { canonical: '/about' },
  openGraph: {
    title:       'About MediaBubble, Hurghada Marketing Agency Since 2015',
    description: 'We started in Hurghada because local businesses deserved better than generic agencies. Ten years on, we are the region\'s most trusted marketing partner.',
    url:         '/about',
    type:        'website',
  },
  twitter: {
    title:       'About MediaBubble, Hurghada Marketing Agency Since 2015',
    description: 'We started in Hurghada because local businesses deserved better than generic agencies. Ten years on, we are the region\'s most trusted marketing partner.',
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}
