import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ISR_REVALIDATE_SECONDS, getAlternates, buildInsightPostJsonLd, serializeJsonLd, resolveMarketSiteConfig } from '@mediabubble/shared/server'
import { INSIGHTS_POSTS, getInsightPostBySlug } from '@/lib/data/insights-posts'
import { InsightPostContent } from './content'

export const revalidate = ISR_REVALIDATE_SECONDS.blog

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return INSIGHTS_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getInsightPostBySlug(slug)
  if (!post) return {}
  return {
    title:       post.title,
    description: post.excerpt,
    alternates:  getAlternates(`/insights/${slug}`, 'eg'),
    openGraph: {
      title:       `${post.title} | MediaBubble`,
      description: post.excerpt,
      url:         `/insights/${slug}`,
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

export default async function InsightPostPage({ params }: Props) {
  const { slug } = await params
  const post = getInsightPostBySlug(slug)
  if (!post) notFound()

  const site = resolveMarketSiteConfig('eg')
  const jsonLd = buildInsightPostJsonLd({
    slug: `/insights/${slug}`,
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
      <InsightPostContent post={post} />
    </>
  )
}
