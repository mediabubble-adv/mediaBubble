import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ISR_REVALIDATE_SECONDS, getAlternates, buildBlogPostJsonLd, serializeJsonLd, resolveMarketSiteConfig } from '@mediabubble/shared/server'
import { BLOG_POSTS, getBlogPostBySlug } from '@/lib/data/blog-posts'
import { BlogPostContent } from './content'

export const revalidate = ISR_REVALIDATE_SECONDS.blog

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title:       post.title,
    description: post.excerpt,
    alternates:  getAlternates(`/blog/${slug}`, 'ae'),
    openGraph: {
      title:       `${post.title} | MediaBubble`,
      description: post.excerpt,
      url:         `/blog/${slug}`,
      type:        'article',
      authors:     ['MediaBubble'],
      tags:        [post.category],
    },
    twitter: {
      title:       `${post.title} | MediaBubble`,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const site = resolveMarketSiteConfig('ae')
  const jsonLd = buildBlogPostJsonLd({
    slug: `/blog/${slug}`,
    title: post.title,
    description: post.excerpt,
    datePublished: post.date,
    imageUrl: post.image,
    authorName: 'MediaBubble',
  }, site.siteUrl)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <BlogPostContent post={post} />
    </>
  )
}
