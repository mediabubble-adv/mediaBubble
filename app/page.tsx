import type { Metadata } from 'next'
import { HomePageContent } from './content'

export const metadata: Metadata = {
  title: "Hurghada's #1 Marketing Agency",
  description:
    "MediaBubble is a full-service marketing agency in Hurghada, Egypt. We help businesses grow through SEO, paid advertising, branding, web development, and social media — since 2015.",
  openGraph: {
    title:       "MediaBubble — Hurghada's #1 Marketing Agency",
    description: "Full-service marketing for Hurghada businesses. SEO, ads, branding, web, social — all from one team.",
    url:         'https://mediabubble.com',
  },
}

export default function HomePage() {
  return <HomePageContent />
}
