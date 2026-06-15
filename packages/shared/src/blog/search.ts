export interface BlogSearchablePost {
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

export interface BlogSearchOptions {
  query?: string
  category?: string
  limit?: number
}

export interface BlogSearchResult<T extends BlogSearchablePost> {
  results: T[]
  total: number
}

function matchesCategory<T extends BlogSearchablePost>(post: T, category?: string): boolean {
  if (!category || category === 'All') return true
  return post.category === category
}

function matchesQuery<T extends BlogSearchablePost>(post: T, query: string): boolean {
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

export function searchBlogPosts<T extends BlogSearchablePost>(
  posts: readonly T[],
  options: BlogSearchOptions = {},
): BlogSearchResult<T> {
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

export function toBlogSearchSummary<T extends BlogSearchablePost>(
  post: T,
): Omit<T, 'intro' | 'sections'> {
  const { intro: _intro, sections: _sections, ...summary } = post
  return summary
}
