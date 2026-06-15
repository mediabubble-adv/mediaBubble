'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// ─── Scroll-reveal ────────────────────────────────────────────────────────────

function revealElement(el: HTMLElement, observer: IntersectionObserver) {
  const delay = el.dataset['revealDelay'] ?? '0'
  el.style.transitionDelay = `${delay}ms`
  el.classList.add('reveal-visible')
  observer.unobserve(el)
}

function revealAllPending() {
  document.querySelectorAll<HTMLElement>('[data-reveal]:not(.reveal-visible)').forEach((el) => {
    el.style.transitionDelay = '0ms'
    el.classList.add('reveal-visible')
  })
}

function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect()
  const viewHeight = window.innerHeight || document.documentElement.clientHeight
  return rect.top < viewHeight * 0.92 && rect.bottom > 0
}

function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let frameId = 0
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null
    let mutationTimer: ReturnType<typeof setTimeout> | null = null
    let mutationObserver: MutationObserver | null = null

    const armReveal = () => {
      document.documentElement.classList.add('reveal-armed')
    }

    const setup = () => {
      observer?.disconnect()

      const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.reveal-visible)')
      if (!els.length) {
        armReveal()
        return
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || !observer) return
            revealElement(entry.target as HTMLElement, observer)
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
      )

      els.forEach((el) => {
        if (isInViewport(el)) {
          revealElement(el, observer!)
          return
        }
        observer!.observe(el)
      })

      armReveal()
    }

    const scheduleSetup = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(setup)
    }

    scheduleSetup()

    const onLoad = () => scheduleSetup()
    window.addEventListener('load', onLoad)

    fallbackTimer = setTimeout(revealAllPending, 1000)

    mutationObserver = new MutationObserver(() => {
      if (mutationTimer) clearTimeout(mutationTimer)
      mutationTimer = setTimeout(scheduleSetup, 150)
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(frameId)
      observer?.disconnect()
      window.removeEventListener('load', onLoad)
      if (fallbackTimer) clearTimeout(fallbackTimer)
      if (mutationTimer) clearTimeout(mutationTimer)
      mutationObserver?.disconnect()
      document.documentElement.classList.remove('reveal-armed')
    }
  }, [pathname])

  return null
}

// ─── Button ripple ────────────────────────────────────────────────────────────

function RippleProvider() {
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const btn = (e.target as Element).closest('[data-ripple]') as HTMLElement | null
      if (!btn) return

      btn.classList.add('ripple-host')

      const rect = btn.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      const wave = document.createElement('span')
      wave.className = 'ripple-wave'
      wave.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`
      btn.appendChild(wave)

      wave.addEventListener('animationend', () => wave.remove(), { once: true })
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return null
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function Phase3Provider() {
  return (
    <>
      <ScrollReveal />
      <RippleProvider />
    </>
  )
}
