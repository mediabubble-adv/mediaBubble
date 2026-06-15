import type { Metadata } from 'next'
import { getAlternates } from '@mediabubble/shared/server'
import { ContactPageContent } from './content'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get your free marketing strategy audit from MediaBubble. Tell us about your business and we will come back with a prioritised plan, no cost, no commitment.',
  alternates: getAlternates('/contact', 'eg'),
  openGraph: {
    title:       'Contact MediaBubble, Free Strategy Audit',
    description: 'Tell us about your business. We will review your current marketing and come back with a prioritised plan.',
    url:         '/contact',
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}
