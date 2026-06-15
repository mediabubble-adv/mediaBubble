import type { BlogPost } from './blog-posts'
import { BLOG_POSTS } from './blog-posts'

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

export function estimateReadingTimeMinutes(post: BlogPost): number {
  const body = [
    post.intro,
    ...post.sections.map(s => `${s.heading} ${s.body}`),
    post.cta,
  ].join(' ')
  const words = countWords(body)
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

export function formatReadingTime(post: BlogPost): string {
  const minutes = estimateReadingTimeMinutes(post)
  return `${minutes} min read`
}

export function getTableOfContents(post: BlogPost): TocItem[] {
  return post.sections.map(section => ({
    id: slugifyHeading(section.heading),
    label: section.heading,
  }))
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = BLOG_POSTS.find(p => p.slug === slug)
  if (!current) return BLOG_POSTS.filter(p => p.slug !== slug).slice(0, limit)

  const sameCategory = BLOG_POSTS.filter(
    p => p.slug !== slug && p.category === current.category,
  )
  const others = BLOG_POSTS.filter(
    p => p.slug !== slug && p.category !== current.category,
  )

  return [...sameCategory, ...others].slice(0, limit)
}
