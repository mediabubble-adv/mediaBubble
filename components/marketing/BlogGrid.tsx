'use client'

import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { Container } from './Container'
import { BLOG_POSTS } from '@/lib/data/blog-posts'

export function BlogGrid() {
  const { t, dir } = useI18n()

  return (
    <section dir={dir} className="py-10 sm:py-16 lg:py-20 bg-[#FAFAFA]" aria-label="Blog posts">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2196F3] mb-3">
            {t('blog.heading.kicker', 'Insights')}
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[#072A6B] leading-tight mb-4">
            {t('blog.heading.title', 'Marketing Advice You Can Actually Use')}
          </h2>
          <p className="text-[16px] text-[#666] leading-relaxed">
            {t('blog.heading.subtitle', "No fluff, no recycled listicles. Practical strategy from the team that does the work every day.")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] transition-all duration-200 flex flex-col"
            >
              <div className="px-7 pt-6 pb-0">
                <span
                  className="inline-block text-[11px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: post.accent }}
                >
                  {post.category}
                </span>
              </div>

              <div className="p-7 pt-3 flex flex-col flex-1">
                <h3 className="font-display text-[16px] font-bold text-[#1A1A2E] leading-snug mb-3">
                  {post.title}
                </h3>

                <p className="text-[13px] text-[#666] leading-relaxed mb-5 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#999]">
                    <Clock size={12} strokeWidth={1.75} />
                    <span>{post.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.date}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-[12px] font-semibold transition-colors duration-150 group"
                    style={{ color: post.accent }}
                  >
                    {t('blog.readPost', 'Read')}
                    <ArrowRight
                      size={12}
                      className="transition-transform duration-150 group-hover:translate-x-[2px]"
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
