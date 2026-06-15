'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Search } from 'lucide-react'
import { SectionHeader } from '@mediabubble/design-system'
import {
  BLOG_SEARCH_PLACEHOLDER_COPY,
  searchInsightsPosts,
  trackInsightsSearch,
  useDebounce,
  useExperiment,
} from '@mediabubble/shared/client'
import { useI18n } from '@/lib/i18n/provider'
import { Container } from '@/components/layout/Container'
import {
  INSIGHTS_CATEGORIES,
  INSIGHTS_POSTS,
  type InsightCategory,
  type InsightPost,
} from '@/lib/data/insights-posts'
import { formatReadingTime } from '@/lib/data/insights-utils'

const POSTS_PER_PAGE = 6

function InsightCard({ post, featured = false }: { post: InsightPost; featured?: boolean }) {
  const { t } = useI18n()

  return (
    <article
      className={[
        'group bg-white dark:bg-brand-navy/40 rounded-2xl border border-brand-whisper-border dark:border-brand-light-border',
        'overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col',
        featured ? 'md:col-span-2 md:flex-row md:min-h-[220px]' : '',
      ].join(' ')}
    >
      {post.image && (
        <div
          className={[
            'relative overflow-hidden bg-brand-canvas shrink-0',
            featured ? 'md:w-[45%] aspect-[16/10] md:aspect-auto md:min-h-[220px]' : 'aspect-[16/10] w-full',
          ].join(' ')}
        >
          <OptimizedImage
            src={post.image}
            alt={post.imageAlt ?? post.title}
            fill
            sizes={featured ? '(max-width: 768px) 100vw, 40vw' : '(max-width: 768px) 100vw, 33vw'}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
          />
        </div>
      )}

      <div className={['p-6 sm:p-7 flex flex-col flex-1', featured ? 'md:justify-center' : ''].join(' ')}>
        <span
          className="inline-block text-[11px] font-semibold uppercase tracking-[0.14em] mb-2"
          style={{ color: post.accent }}
        >
          {post.category}
        </span>

        <h3
          className={[
            'font-display font-bold text-brand-navy dark:text-brand-off-white leading-snug mb-2',
            featured ? 'text-[18px] sm:text-[20px]' : 'text-[16px]',
          ].join(' ')}
        >
          {post.title}
        </h3>

        <p className="text-[13px] text-brand-secondary dark:text-brand-muted-steel leading-relaxed mb-4 flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between gap-3 mt-auto">
          <div className="flex items-center gap-1.5 text-[12px] text-brand-secondary/70">
            <Clock size={12} strokeWidth={1.75} aria-hidden="true" />
            <span>{formatReadingTime(post)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.date}</span>
          </div>
          <Link
            href={`/insights/${post.slug}`}
            className="inline-flex items-center gap-1 text-[12px] font-semibold transition-colors duration-150 shrink-0"
            style={{ color: post.accent }}
          >
            {t('blog.readPost', 'Read')}
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export function InsightsGrid() {
  const { t, dir } = useI18n()
  const searchPlaceholderVariant = useExperiment('insightsSearchPlaceholder')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<InsightCategory>('All')
  const [page, setPage] = useState(1)
  const [remotePosts, setRemotePosts] = useState<InsightPost[] | null>(null)
  const [useRemote, setUseRemote] = useState(false)
  const debouncedSearch = useDebounce(search, 300)

  const searchPlaceholder =
    searchPlaceholderVariant === 'action'
      ? t('blog.search.placeholderAction', BLOG_SEARCH_PLACEHOLDER_COPY.action)
      : t('blog.search.placeholder', BLOG_SEARCH_PLACEHOLDER_COPY.default)

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setUseRemote(false)
      setRemotePosts(null)
      return
    }

    const controller = new AbortController()
    const params = new URLSearchParams({ q: debouncedSearch.trim() })
    if (category !== 'All') {
      params.set('category', category)
    }

    fetch(`/api/insights/search?${params.toString()}`, { signal: controller.signal })
      .then(response => {
        if (!response.ok) {
          throw new Error('Blog search request failed')
        }
        return response.json() as Promise<{ posts: InsightPost[]; total: number }>
      })
      .then(data => {
        setRemotePosts(data.posts)
        setUseRemote(true)
        trackInsightsSearch(debouncedSearch, data.total)
      })
      .catch(error => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }
        setUseRemote(false)
        setRemotePosts(null)
      })

    return () => controller.abort()
  }, [debouncedSearch, category])

  const filtered = useMemo(() => {
    if (useRemote && remotePosts) {
      return remotePosts
    }

    return searchInsightsPosts(INSIGHTS_POSTS, {
      query: search,
      category: category === 'All' ? undefined : category,
    }).results
  }, [useRemote, remotePosts, category, search])

  const showFeatured = category === 'All' && !search.trim() && page === 1
  const featuredPosts = showFeatured ? filtered.filter(p => p.featured) : []
  const gridPosts = showFeatured
    ? filtered.filter(p => !p.featured)
    : filtered

  const totalPages = Math.max(1, Math.ceil(gridPosts.length / POSTS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginated = gridPosts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE,
  )

  function selectCategory(next: InsightCategory) {
    setCategory(next)
    setPage(1)
  }

  function onSearchChange(value: string) {
    setSearch(value)
    setPage(1)
  }

  return (
    <section dir={dir} className="py-12 sm:py-20 lg:py-28 bg-brand-canvas" aria-label="Blog posts">
      <Container>
        <SectionHeader
          className="mb-10"
          kicker={t('blog.heading.kicker', 'Insights')}
          title={t('blog.heading.title', 'Marketing Advice You Can Actually Use')}
          intro={t(
            'blog.heading.subtitle',
            'No fluff, no recycled listicles. Practical strategy from the team that does the work every day.',
          )}
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <aside className="lg:w-56 shrink-0 space-y-6">
            <div>
              <label htmlFor="blog-search" className="sr-only">
                {t('blog.search.label', 'Search articles')}
              </label>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute start-3 top-1/2 -translate-y-1/2 text-brand-secondary/60 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="blog-search"
                  type="search"
                  value={search}
                  onChange={e => onSearchChange(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full ps-9 pe-4 py-2.5 rounded-xl border border-brand-input-border bg-white dark:bg-brand-navy/40 dark:border-brand-light-border text-[14px] text-brand-charcoal dark:text-brand-off-white outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/25 focus-visible:border-brand-blue"
                />
              </div>
            </div>

            <nav aria-label={t('blog.categories.label', 'Categories')}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-secondary/70 mb-3">
                {t('blog.categories.title', 'Categories')}
              </p>
              <ul className="flex flex-wrap lg:flex-col gap-2">
                {INSIGHTS_CATEGORIES.map(cat => {
                  const active = category === cat
                  return (
                    <li key={cat}>
                      <button
                        type="button"
                        onClick={() => selectCategory(cat)}
                        aria-current={active ? 'true' : undefined}
                        className={[
                          'w-full text-start px-3 py-2 rounded-lg text-[13px] font-medium transition-colors',
                          active
                            ? 'bg-brand-blue text-white'
                            : 'text-brand-secondary hover:bg-white dark:hover:bg-brand-navy/60 hover:text-brand-navy dark:hover:text-brand-off-white',
                        ].join(' ')}
                      >
                        {cat === 'All' ? t('blog.categories.all', 'All') : cat}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <p className="text-[15px] text-brand-secondary py-12 text-center">
                {t('blog.empty', 'No articles match your search. Try another keyword or category.')}
              </p>
            ) : (
              <>
                {featuredPosts.length > 0 && (
                  <div className="mb-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue mb-4">
                      {t('blog.featured', 'Featured')}
                    </p>
                    <div className="grid grid-cols-1 gap-6">
                      {featuredPosts.map(post => (
                        <InsightCard key={post.slug} post={post} featured />
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginated.map(post => (
                    <InsightCard key={post.slug} post={post} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav
                    className="flex items-center justify-center gap-4 mt-10"
                    aria-label={t('blog.pagination.label', 'Pagination')}
                  >
                    <button
                      type="button"
                      disabled={safePage <= 1}
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium text-brand-navy dark:text-brand-off-white disabled:opacity-40 hover:bg-white dark:hover:bg-brand-navy/60 transition-colors"
                    >
                      <ChevronLeft size={16} />
                      {t('blog.pagination.prev', 'Previous')}
                    </button>
                    <span className="text-[13px] text-brand-secondary tabular-nums">
                      {t('blog.pagination.page', 'Page {current} of {total}')
                        .replace('{current}', String(safePage))
                        .replace('{total}', String(totalPages))}
                    </span>
                    <button
                      type="button"
                      disabled={safePage >= totalPages}
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium text-brand-navy dark:text-brand-off-white disabled:opacity-40 hover:bg-white dark:hover:bg-brand-navy/60 transition-colors"
                    >
                      {t('blog.pagination.next', 'Next')}
                      <ChevronRight size={16} />
                    </button>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
