'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import type { BlogPost } from '@/lib/data/blog-posts'
import { Container } from '@/components/marketing/Container'
import { CtaSection } from '@/components/marketing/CtaSection'
import { SiteNav } from '@/components/marketing/SiteNav'
import { SiteFooter } from '@/components/marketing/SiteFooter'

interface Props { post: BlogPost }

export function BlogPostContent({ post }: Props) {
  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1}>

        {/* Hero */}
        <div className="pt-24 pb-14 sm:pt-28 sm:pb-16 bg-gradient-to-br from-[#EBF5FB] via-[#F4F8FE] to-white">
          <Container>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#2196F3] hover:text-[#1976D2] mb-8 transition-colors"
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

            <h1 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-[#072A6B] leading-tight mb-5 max-w-3xl">
              {post.title}
            </h1>

            <div className="flex items-center gap-2 text-[13px] text-[#999]">
              <Clock size={13} strokeWidth={1.75} />
              <span>{post.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{post.date}</span>
            </div>
          </Container>
        </div>

        {/* Article body */}
        <div className="py-10 sm:py-16 bg-white">
          <Container>
            <div className="max-w-3xl">

              {/* Intro */}
              <p className="text-[17px] text-[#333] leading-relaxed mb-10 font-medium">
                {post.intro}
              </p>

              {/* Sections */}
              <div className="space-y-10">
                {post.sections.map((section, i) => (
                  <section key={i}>
                    <h2 className="font-display text-[20px] font-bold text-[#072A6B] mb-3">
                      {section.heading}
                    </h2>
                    <p className="text-[15px] text-[#444] leading-relaxed">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>

              {/* Article CTA */}
              <div
                className="mt-12 rounded-2xl border p-7"
                style={{ borderColor: `${post.accent}30`, backgroundColor: `${post.accent}08` }}
              >
                <p className="text-[15px] font-semibold text-[#333] mb-4">{post.cta}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
                  style={{ backgroundColor: post.accent }}
                >
                  Book a free audit
                  <ArrowRight size={14} />
                </Link>
              </div>

            </div>
          </Container>
        </div>

        {/* Pagination bar */}
        <div className="py-8 bg-[#FAFAFA] border-t border-[#E8E8E8]">
          <Container>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#555] hover:text-[#072A6B] transition-colors"
              >
                <ArrowLeft size={14} />
                Back to all posts
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-[#FFC107] text-[#072A6B] hover:bg-[#FFB300] active:scale-[0.97] transition-all duration-150"
              >
                Get a free strategy audit
                <ArrowRight size={14} />
              </Link>
            </div>
          </Container>
        </div>

        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
