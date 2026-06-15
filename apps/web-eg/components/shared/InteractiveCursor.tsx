'use client'

import { useEffect, useRef } from 'react'

export function InteractiveCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const isHovering = useRef(false)
  const frameId = useRef(0)

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return

    const dot = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    document.body.classList.add('cursor-custom')

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      isHovering.current = !!target.closest(
        'a[href], button, [role="button"], input, textarea, select, label[for]'
      )
    }

    const tick = () => {
      dot.style.transform = `translate(${mouse.current.x}px,${mouse.current.y}px) translate(-50%,-50%)`

      ring.current.x += (mouse.current.x - ring.current.x) * 0.14
      ring.current.y += (mouse.current.y - ring.current.y) * 0.14
      ringEl.style.transform = `translate(${ring.current.x}px,${ring.current.y}px) translate(-50%,-50%)`

      if (isHovering.current) {
        ringEl.classList.add('cursor-ring--hover')
      } else {
        ringEl.classList.remove('cursor-ring--hover')
      }

      frameId.current = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    frameId.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(frameId.current)
      document.body.classList.remove('cursor-custom')
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
