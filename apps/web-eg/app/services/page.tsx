import type { Metadata } from 'next'
import { getAlternates } from '@mediabubble/shared/server'
import { ServicesPageContent } from './content'

export const revalidate = 1800

export const metadata: Metadata = {
  title: 'Marketing Services',
  description:
    'SEO, paid advertising, social media marketing, branding, web development, content marketing, and events, all from one agency in Hurghada, Egypt.',
  alternates: getAlternates('/services', 'eg'),
  openGraph: {
    title:       'Marketing Services | MediaBubble',
    description: 'Every service your business needs to grow online. One agency, one strategy, total accountability.',
    url:         '/services',
  },
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
