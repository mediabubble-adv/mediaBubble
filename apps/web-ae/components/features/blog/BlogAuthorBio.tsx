import Image from 'next/image'
import { getBlogAuthor } from '@/lib/data/blog-authors'

interface Props {
  authorId: string
}

export function BlogAuthorBio({ authorId }: Props) {
  const author = getBlogAuthor(authorId)

  return (
    <aside className="rounded-2xl border border-brand-whisper-border bg-brand-canvas p-6 flex gap-4">
      {author.avatar && (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
          <Image
            src={author.avatar}
            alt={`${author.name}, ${author.title}`}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
      )}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-secondary/70 mb-1">
          Written by
        </p>
        <p className="font-display text-[16px] font-bold text-brand-navy">{author.name}</p>
        <p className="text-[13px] font-medium text-brand-blue mb-2">{author.title}</p>
        <p className="text-[14px] text-brand-secondary leading-relaxed">{author.bio}</p>
      </div>
    </aside>
  )
}
