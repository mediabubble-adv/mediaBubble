import { ImageResponse } from 'next/og'
import { INSIGHTS_POSTS, getInsightPostBySlug } from '@/lib/data/insights-posts'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return INSIGHTS_POSTS.map((p) => ({ slug: p.slug }))
}

export default function Image({ params }: { params: { slug: string } }) {
  const post    = getInsightPostBySlug(params.slug)
  const category = post?.category ?? 'Blog'
  const title    = post?.title    ?? 'MediaBubble Blog'
  const excerpt  = post?.excerpt  ?? ''
  const readTime = post?.readTime ?? ''
  const accent   = post?.accent   ?? '#2196F3'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          background: '#072A6B',
          padding: '64px 80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: -100, right: -100, width: 420, height: 420, borderRadius: '50%', background: 'rgba(255,193,7,0.06)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(33,150,243,0.08)' }} />

        {/* Category pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ padding: '6px 16px', borderRadius: 100, background: `${accent}22`, border: `1px solid ${accent}55`, fontSize: 14, fontWeight: 700, color: accent, letterSpacing: 1, textTransform: 'uppercase' }}>
            {category}
          </div>
          {readTime && (
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
              {readTime}
            </span>
          )}
        </div>

        {/* Title */}
        <div style={{ fontSize: 48, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, letterSpacing: -0.5, maxWidth: 900, marginBottom: 20 }}>
          {title}
        </div>

        {/* Excerpt */}
        <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.5)', maxWidth: 800, lineHeight: 1.5, marginBottom: 40 }}>
          {excerpt.length > 110 ? excerpt.slice(0, 110) + '…' : excerpt}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#FFC107', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: '#072A6B' }}>M</div>
          <span style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>mediabubble.com</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
