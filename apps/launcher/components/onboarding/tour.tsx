'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight, Sparkles, PartyPopper } from 'lucide-react'
import { Button } from '@/components/ui/button'

const TOUR_KEY = 'mb_tour_v1'

// ─── Step definitions ───────────────────────────────────────────────────────

interface Step {
  id: string
  title: string
  description: string
  /** CSS selector for the element to spotlight. null = centered overlay. */
  target: string | null
  position?: 'top' | 'right' | 'bottom' | 'left'
}

const STEPS: Step[] = [
  {
    id: 'welcome',
    title: 'Welcome to Launcher',
    description:
      "Your team's entire ops stack, unified. Let's take a 30-second tour so you can hit the ground running.",
    target: null,
  },
  {
    id: 'modules',
    title: 'Nine modules, one platform',
    description:
      'Tasks, Time, CRM, Finance, Leaderboard — everything your team needs, connected and in sync.',
    target: '[data-tour="modules-grid"]',
    position: 'top',
  },
  {
    id: 'search',
    title: 'Find anything in seconds',
    description:
      'Press ⌘K from anywhere to search across all modules, people, and quick actions.',
    target: '[data-tour="search-bar"]',
    position: 'bottom',
  },
  {
    id: 'sidebar',
    title: 'Navigate with confidence',
    description:
      'Jump between modules here. Collapse the sidebar anytime for more canvas space.',
    target: '[data-tour="sidebar-nav"]',
    position: 'right',
  },
  {
    id: 'settings',
    title: 'Personalize your setup',
    description:
      'Set your timezone, default currency, and email preferences before you start.',
    target: '[data-tour="settings-link"]',
    position: 'right',
  },
  {
    id: 'done',
    title: "You're all set!",
    description:
      "The team is counting on you. Jump in — start with Tasks or check the Leaderboard.",
    target: null,
  },
]

// ─── Spotlight geometry ──────────────────────────────────────────────────────

interface SpotRect {
  top: number
  left: number
  width: number
  height: number
}

const PADDING = 8   // px around the spotlight element
const GAP     = 14  // px between spotlight and tooltip card

function getSpotRect(selector: string): SpotRect | null {
  const el = document.querySelector(selector)
  if (!el) return null
  const r = el.getBoundingClientRect()
  return {
    top:    r.top    - PADDING,
    left:   r.left   - PADDING,
    width:  r.width  + PADDING * 2,
    height: r.height + PADDING * 2,
  }
}

// ─── Tooltip positioning ─────────────────────────────────────────────────────

function tooltipStyle(spot: SpotRect, position: Step['position']): React.CSSProperties {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const CARD_W = 300

  switch (position) {
    case 'right':
      return {
        top:  Math.max(16, Math.min(spot.top + spot.height / 2 - 100, vh - 220)),
        left: spot.left + spot.width + GAP,
      }
    case 'left':
      return {
        top:   Math.max(16, Math.min(spot.top + spot.height / 2 - 100, vh - 220)),
        right: vw - spot.left + GAP,
      }
    case 'bottom':
      return {
        top:  spot.top + spot.height + GAP,
        left: Math.max(16, Math.min(spot.left, vw - CARD_W - 16)),
      }
    case 'top':
    default:
      return {
        bottom: vh - spot.top + GAP,
        left:   Math.max(16, Math.min(spot.left, vw - CARD_W - 16)),
      }
  }
}

// ─── Main component ──────────────────────────────────────────────────────────

export function OnboardingTour() {
  const [mounted,   setMounted]   = useState(false)
  const [active,    setActive]    = useState(false)
  const [stepIdx,   setStepIdx]   = useState(0)
  const [spotRect,  setSpotRect]  = useState<SpotRect | null>(null)
  // visible = false during the brief cross-fade between steps
  const [visible,   setVisible]   = useState(false)
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Only check localStorage after hydration
  useEffect(() => {
    setMounted(true)
    if (!localStorage.getItem(TOUR_KEY)) {
      setActive(true)
      setVisible(true)
    }
  }, [])

  const step = STEPS[stepIdx]
  const isCentered = !step?.target

  // Measure the spotlight element
  const measure = useCallback(() => {
    if (!step?.target) { setSpotRect(null); return }
    setSpotRect(getSpotRect(step.target))
  }, [step?.target])

  // On step change: fade out → remeasure → fade in
  useEffect(() => {
    if (!active) return
    if (transitionRef.current) clearTimeout(transitionRef.current)
    setVisible(false)
    transitionRef.current = setTimeout(() => {
      measure()
      setVisible(true)
    }, 180)
    return () => {
      if (transitionRef.current) clearTimeout(transitionRef.current)
    }
  }, [stepIdx, active, measure])

  // Re-measure on window resize (sidebar collapse reflows layout)
  useEffect(() => {
    if (!active) return
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active, measure])

  const dismiss = useCallback(() => {
    setVisible(false)
    setTimeout(() => setActive(false), 200)
    localStorage.setItem(TOUR_KEY, '1')
    fetch('/api/onboarding/complete', { method: 'POST' }).catch(() => {})
  }, [])

  const next = useCallback(() => {
    if (stepIdx < STEPS.length - 1) setStepIdx((i) => i + 1)
    else dismiss()
  }, [stepIdx, dismiss])

  const prev = useCallback(() => {
    if (stepIdx > 0) setStepIdx((i) => i - 1)
  }, [stepIdx])

  if (!mounted || !active) return null

  // ── Render ────────────────────────────────────────────────────────────────

  const isFirst = stepIdx === 0
  const isLast  = stepIdx === STEPS.length - 1

  return createPortal(
    <>
      {/* ── Centered overlay steps (welcome / done) ── */}
      {isCentered && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-6"
          style={{
            background: 'rgba(0,0,0,0.65)',
            transition: 'opacity 200ms',
            opacity: visible ? 1 : 0,
          }}
        >
          <TourCard
            step={step!}
            stepIdx={stepIdx}
            total={STEPS.length}
            isFirst={isFirst}
            isLast={isLast}
            onNext={next}
            onPrev={prev}
            onSkip={dismiss}
            size="lg"
          />
        </div>
      )}

      {/* ── Spotlight steps ── */}
      {!isCentered && spotRect && (
        <>
          {/* Ring — box-shadow IS the full-screen backdrop */}
          <div
            className="pointer-events-none fixed z-[200]"
            style={{
              top:       spotRect.top,
              left:      spotRect.left,
              width:     spotRect.width,
              height:    spotRect.height,
              borderRadius: 12,
              boxShadow: '0 0 0 9999px rgba(0,0,0,0.65), 0 0 0 2px hsl(210 88% 54% / 0.5)',
              transition: 'opacity 200ms',
              opacity:   visible ? 1 : 0,
            }}
          />

          {/* Tooltip card */}
          <div
            className="pointer-events-none fixed z-[201]"
            style={{
              ...tooltipStyle(spotRect, step!.position),
              transition: 'opacity 200ms',
              opacity:   visible ? 1 : 0,
            }}
          >
            <TourCard
              step={step!}
              stepIdx={stepIdx}
              total={STEPS.length}
              isFirst={isFirst}
              isLast={isLast}
              onNext={next}
              onPrev={prev}
              onSkip={dismiss}
              size="sm"
            />
          </div>
        </>
      )}
    </>,
    document.body,
  )
}

// ─── Tour card ───────────────────────────────────────────────────────────────

function TourCard({
  step,
  stepIdx,
  total,
  isFirst,
  isLast,
  onNext,
  onPrev,
  onSkip,
  size,
}: {
  step:    Step
  stepIdx: number
  total:   number
  isFirst: boolean
  isLast:  boolean
  onNext:  () => void
  onPrev:  () => void
  onSkip:  () => void
  size:    'sm' | 'lg'
}) {
  const isLg = size === 'lg'

  return (
    <div
      className={[
        'pointer-events-auto relative rounded-xl border border-border bg-card text-foreground shadow-2xl shadow-black/40',
        isLg ? 'w-full max-w-md p-8' : 'w-[300px] p-5',
      ].join(' ')}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Dismiss × */}
      <button
        type="button"
        onClick={onSkip}
        aria-label="Skip tour"
        className="absolute right-3.5 top-3.5 rounded-md p-1 text-muted-foreground transition-[background-color,color] hover:bg-secondary hover:text-foreground"
      >
        <X size={14} />
      </button>

      {/* Progress dots */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className="inline-block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-out)]"
              style={{
                width:      i === stepIdx ? 16 : 6,
                background: i === stepIdx
                  ? 'hsl(var(--primary))'
                  : i < stepIdx
                  ? 'hsl(var(--primary) / 0.35)'
                  : 'hsl(var(--border))',
              }}
            />
          ))}
        </div>
        <span className="text-[11px] font-medium text-muted-foreground">
          {stepIdx + 1} / {total}
        </span>
      </div>

      {/* Icon — only for first and last steps */}
      {isFirst && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles size={20} className="text-primary" />
        </div>
      )}
      {isLast && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15">
          <PartyPopper size={20} className="text-accent" />
        </div>
      )}

      {/* Text */}
      <h3 className={['font-display font-bold text-foreground', isLg ? 'text-xl' : 'text-[15px]'].join(' ')}>
        {step.title}
      </h3>
      <p className={['mt-2 leading-relaxed text-muted-foreground', isLg ? 'text-[14px]' : 'text-[13px]'].join(' ')}>
        {step.description}
      </p>

      {/* Actions */}
      <div className="mt-5 flex items-center justify-between gap-3">
        {/* Skip / spacer */}
        {!isLast ? (
          <button
            type="button"
            onClick={onSkip}
            className="text-[12px] text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
          >
            Skip tour
          </button>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-2">
          {!isFirst && (
            <Button variant="ghost" size="sm" onClick={onPrev}>
              <ChevronLeft size={14} />
              Back
            </Button>
          )}
          <Button size={isLg ? 'default' : 'sm'} onClick={onNext}>
            {isLast ? 'Get started' : 'Next'}
            {!isLast && <ChevronRight size={14} />}
          </Button>
        </div>
      </div>
    </div>
  )
}
