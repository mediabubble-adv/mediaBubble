export interface InsightSearchablePost {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  accent: string
  featured?: boolean
  image?: string
  imageAlt?: string
  intro?: string
  sections?: readonly { heading: string; body: string }[]
}

export interface InsightSearchOptions {
  query?: string
  category?: string
  limit?: number
}

export interface InsightSearchResult<T extends InsightSearchablePost> {
  results: T[]
  total: number
}

function matchesCategory<T extends InsightSearchablePost>(post: T, category?: string): boolean {
  if (!category || category === 'All') return true
  return post.category === category
}

function matchesQuery<T extends InsightSearchablePost>(post: T, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true

  const haystack = [
    post.title,
    post.excerpt,
    post.category,
    post.intro ?? '',
    ...(post.sections?.flatMap(section => [section.heading, section.body]) ?? []),
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(q)
}

export function searchInsightsPosts<T extends InsightSearchablePost>(
  posts: readonly T[],
  options: InsightSearchOptions = {},
): InsightSearchResult<T> {
  const filtered = posts.filter(
    post => matchesCategory(post, options.category) && matchesQuery(post, options.query ?? ''),
  )

  const total = filtered.length
  const limit = options.limit

  if (limit !== undefined && limit > 0) {
    return { results: filtered.slice(0, limit), total }
  }

  return { results: filtered, total }
}

export function toInsightSearchSummary<T extends InsightSearchablePost>(
  post: T,
): Omit<T, 'intro' | 'sections'> {
  const { intro: _intro, sections: _sections, ...summary } = post
  return summary
}
