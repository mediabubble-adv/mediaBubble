import { ImageResponse } from 'next/og'
import { CASE_STUDIES, getCaseStudyBySlug } from '@/lib/data/case-studies'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.id }))
}

export default function Image({ params }: { params: { slug: string } }) {
  const cs     = getCaseStudyBySlug(params.slug)
  const tag    = cs?.tag    ?? 'Case Study'
  const title  = cs?.title  ?? 'MediaBubble Portfolio'
  const metric = cs?.metric ?? ''
  const desc   = cs?.desc   ?? ''
  const accent = cs?.accent ?? '#2196F3'

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

        {/* Tag */}
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2, color: accent, textTransform: 'uppercase', marginBottom: 18 }}>
          {tag}
        </div>

        {/* Title */}
        <div style={{ fontSize: 46, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, letterSpacing: -0.5, maxWidth: 860, marginBottom: 22 }}>
          {title}
        </div>

        {/* Metric badge */}
        {metric && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: accent }}>↗</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF' }}>{metric}</span>
          </div>
        )}

        {/* Desc */}
        <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 780, lineHeight: 1.5, marginBottom: 40 }}>
          {desc.length > 100 ? desc.slice(0, 100) + '…' : desc}
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
