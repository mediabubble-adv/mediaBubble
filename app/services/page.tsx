import type { Metadata } from 'next'
import { ServicesPageContent } from './content'

export const metadata: Metadata = {
  title: 'Marketing Services',
  description:
    'SEO, paid advertising, social media marketing, branding, web development, content marketing, and events — all from one agency in Hurghada, Egypt.',
  openGraph: {
    title:       'Marketing Services | MediaBubble',
    description: 'Every service your business needs to grow online. One agency, one strategy, total accountability.',
    url:         'https://mediabubble.com/services',
  },
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
