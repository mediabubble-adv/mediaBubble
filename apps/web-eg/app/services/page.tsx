import type { Metadata } from 'next'
import { ISR_REVALIDATE_SECONDS } from '@mediabubble/shared/server'
import { ServicesPageContent } from './content'

export const revalidate = ISR_REVALIDATE_SECONDS.listing

export const metadata: Metadata = {
  title: 'Marketing Services',
  description:
    'SEO, paid advertising, social media marketing, branding, web development, content marketing, and events, all from one agency in Hurghada, Egypt.',
  alternates: { canonical: '/services' },
  openGraph: {
    title:       'Marketing Services | MediaBubble',
    description: 'Every service your business needs to grow online. One agency, one strategy, total accountability.',
    url:         '/services',
  },
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
