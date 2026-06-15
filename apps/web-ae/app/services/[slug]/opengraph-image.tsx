import { ImageResponse } from 'next/og'
import { getService, SERVICE_SLUGS } from '@/lib/services-data'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export default function Image({ params }: { params: { slug: string } }) {
  const service = getService(params.slug)
  const kicker = service?.hero.kicker ?? 'Our Services'
  const title  = service?.hero.title   ?? 'Marketing Services'
  const desc   = service?.meta.description ?? ''

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
        <div style={{ position: 'absolute', top: -100, right: -100, width: 440, height: 440, borderRadius: '50%', background: 'rgba(255,193,7,0.07)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(33,150,243,0.09)' }} />

        {/* Kicker */}
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2, color: '#FFC107', textTransform: 'uppercase', marginBottom: 18 }}>
          {kicker}
        </div>

        {/* Title */}
        <div style={{ fontSize: 52, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: -1, maxWidth: 860, marginBottom: 20 }}>
          {title}
        </div>

        {/* Description */}
        <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.55)', maxWidth: 780, lineHeight: 1.5, marginBottom: 40 }}>
          {desc.length > 120 ? desc.slice(0, 120) + '…' : desc}
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
