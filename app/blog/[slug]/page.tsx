import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BLOG_POSTS, getBlogPostBySlug } from '@/lib/data/blog-posts'
import { BlogPostContent } from './content'

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
    openGraph: {
      title:       `${post.title} | MediaBubble`,
      description: post.excerpt,
      url:         `https://mediabubble.com/blog/${slug}`,
      type:        'article',
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()
  return <BlogPostContent post={post} />
}
