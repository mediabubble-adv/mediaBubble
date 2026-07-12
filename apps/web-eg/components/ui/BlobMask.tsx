'use client'

import { useEffect, useId, useRef } from 'react'

// ─── Geometry ─────────────────────────────────────────────────────────────────

const N = 140
const TAU = Math.PI * 2
const PI = Math.PI

type Pt = [number, number]
type H  = { n: number; amp: number; ph: number }

function makePts(cx: number, cy: number, r: number, hs: H[]): Pt[] {
  return Array.from({ length: N }, (_, i) => {
    const a   = (i / N) * TAU
    let   rad = r
    for (const { n, amp, ph } of hs) rad += amp * Math.sin(n * a + ph)
    rad = Math.max(rad, r * 0.12)
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)]
  })
}

function catmullRom(pts: Pt[], ten = 0.52): string {
  const n = pts.length
  let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const c1x = p1[0] + (p2[0] - p0[0]) * ten / 3
    const c1y = p1[1] + (p2[1] - p0[1]) * ten / 3
    const c2x = p2[0] - (p3[0] - p1[0]) * ten / 3
    const c2y = p2[1] - (p3[1] - p1[1]) * ten / 3
    d += ` C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`
  }
  return d + 'Z'
}

// Smootherstep (Ken Perlin) — zero velocity at both ends
const ease = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)

const lerpPts = (a: Pt[], b: Pt[], t: number): Pt[] =>
  a.map((p, i) => [p[0] + (b[i][0] - p[0]) * t, p[1] + (b[i][1] - p[1]) * t])

// Low-frequency wobble — n=2 and n=3 only → stays bubbly, no spikes
const wobblePts = (ps: Pt[], t: number, amp: number, spd: number): Pt[] =>
  ps.map((p, i) => {
    const a = (i / N) * TAU
    const w = amp * (Math.sin(2 * a + t * spd) * 0.5 + Math.sin(3 * a + t * spd * 0.8) * 0.5)
    return [p[0] + w * Math.cos(a), p[1] + w * Math.sin(a)]
  })

// ─── Shape vocabulary ─────────────────────────────────────────────────────────
// s = Math.min(containerW, containerH) / 200  →  shapes scale with container

type ShapeFn = (cx: number, cy: number, s: number) => Pt[]

const SHAPES: Record<string, ShapeFn> = {
  circle:   (cx, cy, s) => makePts(cx, cy, 92*s, []),
  pebble:   (cx, cy, s) => makePts(cx, cy, 74*s, [{n:2,amp:48*s,ph:PI/2}]),
  pillar:   (cx, cy, s) => makePts(cx, cy, 70*s, [{n:2,amp:52*s,ph:0}]),
  kidney:   (cx, cy, s) => makePts(cx, cy, 80*s, [{n:2,amp:28*s,ph:2.3},{n:1,amp:26*s,ph:1.6}]),
  amoeba:   (cx, cy, s) => makePts(cx, cy, 76*s, [{n:3,amp:18*s,ph:0.4},{n:1,amp:22*s,ph:3.1}]),
  droplet:  (cx, cy, s) => makePts(cx, cy, 80*s, [{n:2,amp:34*s,ph:PI*0.8},{n:1,amp:18*s,ph:2.8}]),
  trefoil:  (cx, cy, s) => makePts(cx, cy, 68*s, [{n:3,amp:34*s,ph:0.7},{n:1,amp:8*s,ph:1.0}]),
  comma:    (cx, cy, s) => makePts(cx, cy, 78*s, [{n:2,amp:22*s,ph:PI*1.3},{n:1,amp:32*s,ph:5.0}]),
  peanut:   (cx, cy, s) => makePts(cx, cy, 72*s, [{n:2,amp:42*s,ph:PI/4},{n:1,amp:14*s,ph:0.5}]),
  crescent: (cx, cy, s) => makePts(cx, cy, 82*s, [{n:2,amp:18*s,ph:PI/2},{n:3,amp:24*s,ph:2.4},{n:1,amp:12*s,ph:4.2}]),
  shelf:    (cx, cy, s) => makePts(cx, cy, 70*s, [{n:2,amp:52*s,ph:PI/2},{n:3,amp:16*s,ph:1.8}]),
  cloud:    (cx, cy, s) => makePts(cx, cy, 84*s, [{n:3,amp:10*s,ph:0.3},{n:2,amp:8*s,ph:1.1},{n:1,amp:14*s,ph:2.4}]),
  biomorph: (cx, cy, s) => makePts(cx, cy, 78*s, [{n:2,amp:26*s,ph:PI*0.4},{n:1,amp:28*s,ph:4.8}]),
  tower:    (cx, cy, s) => makePts(cx, cy, 66*s, [{n:2,amp:56*s,ph:0},{n:1,amp:10*s,ph:0.8}]),
  boulder:  (cx, cy, s) => makePts(cx, cy, 72*s, [{n:2,amp:50*s,ph:PI/2},{n:1,amp:10*s,ph:2.0}]),
  leaf:     (cx, cy, s) => makePts(cx, cy, 74*s, [{n:2,amp:44*s,ph:PI/6}]),
  bulgeL:   (cx, cy, s) => makePts(cx, cy, 76*s, [{n:2,amp:20*s,ph:PI*1.7},{n:1,amp:34*s,ph:2.0}]),
  tearUp:   (cx, cy, s) => makePts(cx, cy, 80*s, [{n:2,amp:28*s,ph:PI*0.2},{n:1,amp:20*s,ph:0.4}]),
  // Gentle near-circle shapes — used by 'orb' sequence
  orb1:     (cx, cy, s) => makePts(cx, cy, 88*s, [{n:2,amp:10*s,ph:PI/4}]),
  orb2:     (cx, cy, s) => makePts(cx, cy, 86*s, [{n:3,amp: 8*s,ph:1.1},{n:2,amp: 6*s,ph:2.4}]),
  orb3:     (cx, cy, s) => makePts(cx, cy, 90*s, [{n:2,amp:12*s,ph:PI/2},{n:3,amp: 6*s,ph:0.6}]),
  orb4:     (cx, cy, s) => makePts(cx, cy, 87*s, [{n:2,amp: 9*s,ph:PI  },{n:3,amp: 7*s,ph:1.8}]),
}

// ─── Named sequences ──────────────────────────────────────────────────────────

const SEQUENCES: Record<string, string[]> = {
  'gravity-pull': ['circle','pebble','trefoil','pillar','amoeba','kidney','cloud'],
  'hurghada':     ['droplet','shelf','kidney','bulgeL','peanut','crescent','boulder'],
  'dubai':        ['tower','circle','leaf','comma','tearUp','biomorph','pillar'],
  'default':      ['circle','pebble','kidney','trefoil','droplet','amoeba','cloud'],
  'vertical':     ['pillar','tower','leaf','tearUp','comma','bulgeL','pillar'],
  'orb':          ['orb1','orb2','orb3','orb4','orb1'],
}

// ─── Component ────────────────────────────────────────────────────────────────

export type BlobSequence = 'gravity-pull' | 'hurghada' | 'dubai' | 'default' | 'vertical' | 'orb'

export interface BlobMaskProps {
  children: React.ReactNode
  sequence?: BlobSequence
  /** CSS class applied to the outermost wrapper (controls size / aspect ratio) */
  className?: string
  /** Milliseconds for each shape transition. Default: 10000 */
  transitionDuration?: number
  /** Color of the traveling neon outline. Default: brand blue */
  outlineColor?: string
  /** Opacity of the crisp outline stroke (0–1). Default 0.55 */
  outlineOpacity?: number
}

export function BlobMask({
  children,
  sequence = 'default',
  className = '',
  transitionDuration = 10000,
  outlineColor = '#2196F3',
  outlineOpacity = 0.55,
}: BlobMaskProps) {
  const uid        = useId().replace(/:/g, '')
  const clipId     = `bc-${uid}`
  const filterId   = `bf-${uid}`

  const containerRef = useRef<HTMLDivElement>(null)
  const clipRef      = useRef<SVGPathElement>(null)
  const glowRef      = useRef<SVGPathElement>(null)
  const crispRef     = useRef<SVGPathElement>(null)
  const sparkRef     = useRef<SVGPathElement>(null)
  const sizeRef      = useRef({ w: 500, h: 375 })
  const rafRef       = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Keep sizeRef in sync without triggering re-renders
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width  > 0) sizeRef.current.w = width
      if (height > 0) sizeRef.current.h = height
    })
    ro.observe(container)
    sizeRef.current = {
      w: container.offsetWidth  || 500,
      h: container.offsetHeight || 375,
    }

    const seq = SEQUENCES[sequence] ?? SEQUENCES['default']

    // Cache keyframes; rebuild only when container size changes
    let cachedFrames: Pt[][] = []
    let cacheKey = ''

    function getFrames(w: number, h: number): Pt[][] {
      const key = `${Math.round(w)},${Math.round(h)}`
      if (key === cacheKey) return cachedFrames
      const cx = w / 2
      const cy = h / 2
      const s  = Math.min(w, h) / 200
      cachedFrames = seq.map(name => (SHAPES[name] ?? SHAPES['circle'])(cx, cy, s))
      cacheKey = key
      return cachedFrames
    }

    let startTime: number | null = null
    let sparkOffset = 0

    function tick(now: number) {
      if (!startTime) startTime = now

      const { w, h } = sizeRef.current
      const frames   = getFrames(w, h)
      const total    = frames.length

      const elapsed  = now - startTime
      const cycle    = elapsed % (transitionDuration * total)
      const rawIdx   = cycle / transitionDuration
      const fromIdx  = Math.floor(rawIdx) % total
      const toIdx    = (fromIdx + 1) % total
      const t        = ease(rawIdx - Math.floor(rawIdx))

      const wobbleAmp = Math.min(w, h) * 0.006
      const morphed   = lerpPts(frames[fromIdx], frames[toIdx], t)
      const final     = wobblePts(morphed, now / 1000, wobbleAmp, 0.35)

      const d = catmullRom(final)

      clipRef.current?.setAttribute('d', d)
      glowRef.current?.setAttribute('d', d)
      crispRef.current?.setAttribute('d', d)

      if (sparkRef.current) {
        sparkRef.current.setAttribute('d', d)
        const pathLen = sparkRef.current.getTotalLength()
        if (pathLen > 0) {
          const dash = Math.min(pathLen * 0.07, 55)
          sparkOffset = (sparkOffset - 1.8) % (-pathLen)
          sparkRef.current.setAttribute('stroke-dasharray', `${dash} ${pathLen}`)
          sparkRef.current.setAttribute('stroke-dashoffset', String(sparkOffset))
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [sequence, transitionDuration])

  return (
    <div ref={containerRef} className={`relative ${className}`}>

      {/* ── Hidden SVG: clip-path definition only ─────────────────────────── */}
      <svg
        aria-hidden
        focusable="false"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path ref={clipRef} />
          </clipPath>
          {/* Glow blur filter */}
          <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* ── Clipped image container ───────────────────────────────────────── */}
      <div style={{ clipPath: `url(#${clipId})`, width: '100%', height: '100%' }}>
        {children}
      </div>

      {/* ── Visible SVG overlay: glow outline + traveling spark ───────────── */}
      <svg
        aria-hidden
        focusable="false"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      >
        {/* Outer bloom */}
        <path
          ref={glowRef}
          fill="none"
          stroke={outlineColor}
          strokeWidth="22"
          opacity="0.09"
          filter={`url(#${filterId})`}
        />
        {/* Mid glow */}
        <path
          fill="none"
          stroke={outlineColor}
          strokeWidth="4"
          opacity="0.18"
          ref={undefined}
          /* shares same d via glowRef — set separately below */
        />
        {/* Crisp 1.3px edge */}
        <path
          ref={crispRef}
          fill="none"
          stroke={outlineColor}
          strokeWidth="1.3"
          opacity={outlineOpacity}
        />
        {/* Traveling neon spark */}
        <path
          ref={sparkRef}
          fill="none"
          stroke={outlineColor}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.95"
        />
      </svg>
    </div>
  )
}
