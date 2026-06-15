import type { Metadata } from 'next'
import { ISR_REVALIDATE_SECONDS } from '@mediabubble/shared/server'
import { BlogPageContent } from './content'

export const revalidate = ISR_REVALIDATE_SECONDS.listing

export const metadata: Metadata = {
  title: 'Marketing Blog',
  description:
    'Practical marketing strategy, SEO guides, and campaign insights from the MediaBubble team in Hurghada, Egypt. No fluff, just what works.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title:       'Marketing Blog | MediaBubble',
    description: 'Practical strategy and honest analysis from the team that runs campaigns every day.',
    url:         '/blog',
  },
}

export default function BlogPage() {
  return <BlogPageContent />
}
