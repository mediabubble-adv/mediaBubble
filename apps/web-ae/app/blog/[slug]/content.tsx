'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import type { BlogPost } from '@/lib/data/blog-posts'
import {
  formatReadingTime,
  getRelatedPosts,
  getTableOfContents,
  slugifyHeading,
} from '@/lib/data/blog-utils'
import { Container } from '@/components/layout/Container'
import { CtaSection } from '@/components/sections/CtaSection'
import { MainLayout } from '@/components/layout/MainLayout'
import { BlogTableOfContents } from '@/components/features/blog/BlogTableOfContents'
import { BlogAuthorBio } from '@/components/features/blog/BlogAuthorBio'
import { BlogNewsletterCta } from '@/components/features/blog/BlogNewsletterCta'
import { BlogShareButtons } from '@/components/features/blog/BlogShareButtons'
import { RelatedPostsSection } from '@/components/features/blog/RelatedPostsSection'

const CATEGORY_SERVICE: Record<string, { slug: string; label: string; description: string }> = {
  'SEO':              { slug: 'seo',      label: 'SEO & Organic Growth',   description: 'See exactly how we build rankings for UAE businesses.' },
  'Paid Ads':         { slug: 'ppc',      label: 'Paid Advertising (PPC)', description: 'Find out how we manage Google and Meta campaigns for Dubai businesses.' },
  'Social Media':     { slug: 'social',   label: 'Social Media Marketing', description: 'Explore how we grow and monetise social audiences across the UAE.' },
  'Branding':         { slug: 'branding', label: 'Branding & Design',      description: 'See how we build brand identities that command premium pricing.' },
  'Web Development':  { slug: 'web',      label: 'Web Development',        description: 'Explore our web design and development service for UAE businesses.' },
  'Content Marketing':{ slug: 'seo',      label: 'SEO & Content Strategy', description: 'Content and SEO go hand-in-hand — see how we approach both.' },
}

interface Props { post: BlogPost }

export function BlogPostContent({ post }: Props) {
  const [shareUrl, setShareUrl] = useState('')
  const tocItems = useMemo(() => getTableOfContents(post), [post])
  const relatedPosts = useMemo(() => getRelatedPosts(post.slug, 3), [post.slug])
  const readingTime = formatReadingTime(post)

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  return (
    <MainLayout>

        <div className="pt-24 pb-14 sm:pt-28 sm:pb-16 bg-brand-canvas border-b border-brand-whisper-border">
          <Container>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand-blue hover:text-brand-navy mb-8 transition-colors"
            >
              <ArrowLeft size={14} />
              All posts
            </Link>

            <span
              className="inline-block text-[11px] font-semibold uppercase tracking-[0.14em] mb-4"
              style={{ color: post.accent }}
            >
              {post.category}
            </span>

            <h1 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-brand-navy leading-tight mb-5 max-w-3xl">
              {post.title}
            </h1>

            <div className="flex items-center gap-2 text-[13px] text-brand-secondary/70">
              <Clock size={13} strokeWidth={1.75} />
              <span>{readingTime}</span>
              <span aria-hidden="true">·</span>
              <span>{post.date}</span>
            </div>
          </Container>
        </div>

        <div className="py-10 sm:py-16 bg-white">
          <Container>
            <div className="grid lg:grid-cols-[minmax(0,1fr)_260px] gap-10 xl:gap-14 items-start">

              <article className="min-w-0 max-w-3xl lg:max-w-none">

                {post.image && (
                  <figure className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-10 bg-brand-canvas">
                    <Image
                      src={post.image}
                      alt={post.imageAlt ?? post.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 720px"
                    />
                    {post.imageDescription && (
                      <figcaption className="sr-only">{post.imageDescription}</figcaption>
                    )}
                  </figure>
                )}

                <div className="lg:hidden mb-8">
                  <BlogTableOfContents items={tocItems} />
                </div>

                <p className="text-[17px] text-brand-navy leading-relaxed mb-10 font-medium">
                  {post.intro}
                </p>

                <div className="space-y-10">
                  {post.sections.map((section, i) => {
                    const sectionId = slugifyHeading(section.heading)
                    return (
                      <section key={i} id={sectionId}>
                        <h2 className="font-display text-[20px] font-bold text-brand-navy mb-3 scroll-mt-28">
                          {section.heading}
                        </h2>
                        <p className="text-[15px] text-brand-secondary leading-relaxed">
                          {section.body}
                        </p>
                      </section>
                    )
                  })}
                </div>

                <div
                  className="mt-12 rounded-2xl border p-7"
                  style={{ borderColor: `${post.accent}30`, backgroundColor: `${post.accent}08` }}
                >
                  <p className="text-[15px] font-semibold text-brand-navy mb-4">{post.cta}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
                      style={{ backgroundColor: post.accent }}
                    >
                      Book a free audit
                      <ArrowRight size={14} />
                    </Link>
                    {CATEGORY_SERVICE[post.category] && (
                      <Link
                        href={`/services/${CATEGORY_SERVICE[post.category].slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold border bg-white/60 transition-all duration-150 hover:bg-white active:scale-[0.97]"
                        style={{ borderColor: `${post.accent}60`, color: post.accent }}
                      >
                        See our {CATEGORY_SERVICE[post.category].label} service
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>

                {CATEGORY_SERVICE[post.category] && (
                  <Link
                    href={`/services/${CATEGORY_SERVICE[post.category].slug}`}
                    className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-brand-whisper-border bg-brand-canvas px-6 py-5 hover:border-brand-blue/30 hover:bg-blue-50/30 transition-all duration-150 group"
                  >
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-brand-secondary/60 mb-1">
                        Related service
                      </p>
                      <p className="text-[15px] font-semibold text-brand-navy">
                        {CATEGORY_SERVICE[post.category].label}
                      </p>
                      <p className="text-[13px] text-brand-secondary mt-0.5">
                        {CATEGORY_SERVICE[post.category].description}
                      </p>
                    </div>
                    <ArrowRight
                      size={18}
                      className="shrink-0 text-brand-blue group-hover:translate-x-0.5 transition-transform duration-150"
                      aria-hidden="true"
                    />
                  </Link>
                )}

                <div className="mt-10 space-y-8">
                  <BlogAuthorBio authorId={post.authorId ?? 'yasser'} />
                  <BlogNewsletterCta />
                </div>

                <RelatedPostsSection posts={relatedPosts} />

                {shareUrl && (
                  <div className="mt-10 lg:hidden">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-secondary/70 mb-3">
                      Share
                    </p>
                    <BlogShareButtons title={post.title} url={shareUrl} />
                  </div>
                )}
              </article>

              <aside className="hidden lg:block space-y-6 sticky top-28 self-start">
                <BlogTableOfContents items={tocItems} />
                {shareUrl && (
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-secondary/70 mb-3">
                      Share
                    </p>
                    <BlogShareButtons title={post.title} url={shareUrl} layout="vertical" />
                  </div>
                )}
              </aside>

            </div>
          </Container>
        </div>

        <div className="py-8 bg-brand-canvas border-t border-brand-whisper-border">
          <Container>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-brand-secondary hover:text-brand-navy transition-colors"
              >
                <ArrowLeft size={14} />
                Back to all posts
              </Link>
              <Link
                href="/contact"
                data-ripple=""
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-brand-yellow text-brand-navy hover:bg-[#FFB300] active:scale-[0.97] transition-all duration-150"
              >
                Get a free strategy audit
                <ArrowRight size={14} />
              </Link>
            </div>
          </Container>
        </div>

        <CtaSection />
    </MainLayout>
  )
}
