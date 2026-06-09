import type { Metadata } from 'next'
import { BlogPageContent } from './content'

export const metadata: Metadata = {
  title: 'Marketing Blog',
  description:
    'Practical marketing strategy, SEO guides, and campaign insights from the MediaBubble team in Hurghada, Egypt. No fluff — just what works.',
  openGraph: {
    title:       'Marketing Blog | MediaBubble',
    description: 'Practical strategy and honest analysis from the team that runs campaigns every day.',
    url:         'https://mediabubble.com/blog',
  },
}

export default function BlogPage() {
  return <BlogPageContent />
}
