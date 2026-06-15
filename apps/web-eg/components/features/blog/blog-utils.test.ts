import { BLOG_POSTS } from '@/lib/data/blog-posts'
import {
  estimateReadingTimeMinutes,
  formatReadingTime,
  getRelatedPosts,
  getTableOfContents,
  slugifyHeading,
} from '@/lib/data/blog-utils'

describe('blog-utils', () => {
  const sample = BLOG_POSTS[0]

  it('slugifyHeading produces URL-safe ids', () => {
    expect(slugifyHeading('Start with search intent, not keyword volume')).toBe(
      'start-with-search-intent-not-keyword-volume',
    )
  })

  it('estimateReadingTimeMinutes returns at least 1 minute', () => {
    expect(estimateReadingTimeMinutes(sample)).toBeGreaterThanOrEqual(1)
  })

  it('formatReadingTime returns a min read label', () => {
    expect(formatReadingTime(sample)).toMatch(/^\d+ min read$/)
  })

  it('getTableOfContents mirrors section headings', () => {
    const toc = getTableOfContents(sample)
    expect(toc).toHaveLength(sample.sections.length)
    expect(toc[0].label).toBe(sample.sections[0].heading)
    expect(toc[0].id).toBe(slugifyHeading(sample.sections[0].heading))
  })

  it('getRelatedPosts excludes current slug and prefers same category', () => {
    const related = getRelatedPosts('seo-hurghada-tourism', 3)
    expect(related.every(p => p.slug !== 'seo-hurghada-tourism')).toBe(true)
    expect(related[0]?.category).toBe('SEO')
    expect(related.some(p => p.slug === 'google-business-profile-local-seo')).toBe(true)
  })

  it('getRelatedPosts fills from other categories when same category is sparse', () => {
    const related = getRelatedPosts('branding-small-business-egypt', 3)
    expect(related).toHaveLength(3)
    expect(related.every(p => p.category !== 'Branding')).toBe(true)
  })
})
