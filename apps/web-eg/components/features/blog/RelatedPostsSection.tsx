import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import type { BlogPost } from '@/lib/data/blog-posts'
import { formatReadingTime } from '@/lib/data/blog-utils'

interface Props {
  posts: BlogPost[]
}

export function RelatedPostsSection({ posts }: Props) {
  if (posts.length === 0) return null

  return (
    <section aria-labelledby="related-posts-heading" className="mt-14 pt-10 border-t border-brand-whisper-border">
      <h2
        id="related-posts-heading"
        className="font-display text-[22px] font-bold text-brand-navy mb-6"
      >
        Related articles
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(related => (
          <Link
            key={related.slug}
            href={`/blog/${related.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-brand-whisper-border bg-white hover:border-brand-blue/30 hover:shadow-sm transition-all duration-150"
          >
            {related.image && (
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-canvas">
                <Image
                  src={related.image}
                  alt={related.imageAlt ?? related.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-5">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2"
                style={{ color: related.accent }}
              >
                {related.category}
              </span>
              <h3 className="font-display text-[15px] font-bold text-brand-navy leading-snug mb-2 group-hover:text-brand-blue transition-colors">
                {related.title}
              </h3>
              <p className="text-[13px] text-brand-secondary line-clamp-2 mb-3 flex-1">
                {related.excerpt}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[12px] text-brand-secondary/70">
                <Clock size={12} aria-hidden="true" />
                {formatReadingTime(related)}
                <ArrowRight
                  size={14}
                  className="ml-auto text-brand-blue opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
