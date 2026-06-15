import type { Metadata } from 'next'
import { AboutPageContent } from './content'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Full-service marketing agency in Dubai since 2015. 22+ specialists, 200+ clients. Proven results in tourism, hospitality, retail, and real estate.',
  alternates: { canonical: '/about' },
  openGraph: {
    title:       'About MediaBubble — UAE Marketing Agency Since 2015',
    description: 'We bring the same team and systems that have delivered results for 200+ businesses across the UAE and the Gulf.',
    url:         '/about',
    type:        'website',
  },
  twitter: {
    title:       'About MediaBubble — UAE Marketing Agency Since 2015',
    description: 'We bring the same team and systems that have delivered results for 200+ businesses across the UAE and the Gulf.',
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}
