import { NextRequest, NextResponse } from 'next/server'
import {
  checkRateLimit,
  getClientIp,
  searchInsightsPosts,
  toInsightSearchSummary,
} from '@mediabubble/shared/server'
import {
  INSIGHTS_CATEGORIES,
  INSIGHTS_POSTS,
  type InsightCategory,
} from '@/lib/data/insights-posts'

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

  if (category && category !== 'All' && !INSIGHTS_CATEGORIES.includes(category as InsightCategory)) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
  }

  const { results, total } = searchInsightsPosts(INSIGHTS_POSTS, {
    query,
    category: category || undefined,
    limit,
  })

  return NextResponse.json({
    posts: results.map(post => toInsightSearchSummary(post)),
    total,
    query,
    category: category || 'All',
  })
}
