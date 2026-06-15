import { NextRequest, NextResponse } from 'next/server'
import {
  checkRateLimit,
  getClientIp,
  searchBlogPosts,
  toBlogSearchSummary,
} from '@mediabubble/shared/server'
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  type BlogCategory,
} from '@/lib/data/blog-posts'

export async function GET(req: NextRequest) {
  const ip = getClientIp(req.headers)
  const rate = checkRateLimit(`blog-search:${ip}`, 60, 60 * 1000)
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before searching again.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rate.resetAt - Date.now()) / 1000)),
        },
      },
    )
  }

  const query = req.nextUrl.searchParams.get('q') ?? ''
  const category = req.nextUrl.searchParams.get('category') ?? ''
  const limitParam = req.nextUrl.searchParams.get('limit')
  const parsedLimit = limitParam ? Number.parseInt(limitParam, 10) : undefined
  const limit =
    parsedLimit !== undefined && Number.isFinite(parsedLimit)
      ? Math.min(50, Math.max(1, parsedLimit))
      : undefined

  if (category && category !== 'All' && !BLOG_CATEGORIES.includes(category as BlogCategory)) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
  }

  const { results, total } = searchBlogPosts(BLOG_POSTS, {
    query,
    category: category || undefined,
    limit,
  })

  return NextResponse.json({
    posts: results.map(post => toBlogSearchSummary(post)),
    total,
    query,
    category: category || 'All',
  })
}
