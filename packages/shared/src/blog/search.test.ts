import { searchBlogPosts, toBlogSearchSummary } from './search'

const SAMPLE_POSTS = [
  {
    slug: 'seo-guide',
    category: 'SEO',
    title: 'SEO Basics for Tourism',
    excerpt: 'Practical SEO advice for hotels.',
    date: 'May 2025',
    accent: '#2196F3',
    intro: 'Search intent matters for booking pages.',
    sections: [{ heading: 'Technical SEO', body: 'Use structured data for hotels.' }],
  },
  {
    slug: 'branding-guide',
    category: 'Branding',
    title: 'Branding on a Budget',
    excerpt: 'Look premium without overspending.',
    date: 'April 2025',
    accent: '#9C27B0',
    intro: 'Consistency beats expensive production.',
    sections: [{ heading: 'Visual identity', body: 'Start with typography and color.' }],
  },
] as const

describe('searchBlogPosts', () => {
  it('returns all posts when query and category are empty', () => {
    const { results, total } = searchBlogPosts(SAMPLE_POSTS)
    expect(total).toBe(2)
    expect(results).toHaveLength(2)
  })

  it('filters by category', () => {
    const { results, total } = searchBlogPosts(SAMPLE_POSTS, { category: 'SEO' })
    expect(total).toBe(1)
    expect(results[0]?.slug).toBe('seo-guide')
  })

  it('searches intro and section body text', () => {
    const { results, total } = searchBlogPosts(SAMPLE_POSTS, { query: 'structured data' })
    expect(total).toBe(1)
    expect(results[0]?.slug).toBe('seo-guide')
  })

  it('applies limit after filtering', () => {
    const { results, total } = searchBlogPosts(SAMPLE_POSTS, { limit: 1 })
    expect(total).toBe(2)
    expect(results).toHaveLength(1)
  })
})

describe('toBlogSearchSummary', () => {
  it('removes full-content fields from API payloads', () => {
    const summary = toBlogSearchSummary(SAMPLE_POSTS[0])
    expect(summary).toMatchObject({
      slug: 'seo-guide',
      title: 'SEO Basics for Tourism',
    })
    expect(summary).not.toHaveProperty('intro')
    expect(summary).not.toHaveProperty('sections')
  })
})
