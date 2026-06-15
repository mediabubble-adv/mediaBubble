import type { InsightPost } from './insights-posts'
import { INSIGHTS_POSTS } from './insights-posts'

const WORDS_PER_MINUTE = 220

export interface TocItem {
  id: string
  label: string
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function estimateReadingTimeMinutes(post: InsightPost): number {
  const body = [
    post.intro,
    ...post.sections.map(s => `${s.heading} ${s.body}`),
    post.cta,
  ].join(' ')
  const words = countWords(body)
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

export function formatReadingTime(post: InsightPost): string {
  const minutes = estimateReadingTimeMinutes(post)
  return `${minutes} min read`
}

export function getTableOfContents(post: InsightPost): TocItem[] {
  return post.sections.map(section => ({
    id: slugifyHeading(section.heading),
    label: section.heading,
  }))
}

export function getRelatedPosts(slug: string, limit = 3): InsightPost[] {
  const current = INSIGHTS_POSTS.find(p => p.slug === slug)
  if (!current) return INSIGHTS_POSTS.filter(p => p.slug !== slug).slice(0, limit)

  const sameCategory = INSIGHTS_POSTS.filter(
    p => p.slug !== slug && p.category === current.category,
  )
  const others = INSIGHTS_POSTS.filter(
    p => p.slug !== slug && p.category !== current.category,
  )

  return [...sameCategory, ...others].slice(0, limit)
}
