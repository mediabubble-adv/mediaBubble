import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'MediaBubble, UAE Marketing Agency'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          background: '#072A6B',
          padding: '72px 80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative circle top-right */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'rgba(255,193,7,0.07)',
          }}
        />
        {/* Decorative circle bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'rgba(33,150,243,0.08)',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: '#FFC107',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 700,
              color: '#072A6B',
            }}
          >
            M
          </div>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', letterSpacing: -0.5 }}>
            MediaBubble
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: -1,
            maxWidth: 820,
            marginBottom: 20,
          }}
        >
          Marketing That Grows Businesses
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.6)',
            fontWeight: 400,
            marginBottom: 40,
          }}
        >
          Full-service agency in Dubai, UAE. Since 2015.
        </div>

        {/* Bottom pill */}
        <div
          style={{
            display: 'flex',
            gap: 12,
          }}
        >
          {['SEO', 'Paid Ads', 'Social Media', 'Branding', 'Web'].map((s) => (
            <div
              key={s}
              style={{
                padding: '8px 18px',
                borderRadius: 100,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
