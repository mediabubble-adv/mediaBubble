'use client'

import { useState, useEffect, useCallback } from 'react'
import { countLeaves, taxonomyTree } from '@/data/arabic-taxonomy'

const STORAGE_KEY = 'mb-arabic-skill-progress'

function loadProgress(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    return new Set(JSON.parse(raw) as string[])
  } catch {
    return new Set()
  }
}

function saveProgress(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)))
  } catch { /* quota exceeded — silently ignore */ }
}

export function useProgress() {
  const [completedIds, setCompletedIds] = useState<Set<string>>(loadProgress)

  useEffect(() => {
    saveProgress(completedIds)
  }, [completedIds])

  const toggle = useCallback((id: string) => {
    setCompletedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setCompletedIds(new Set())
  }, [])

  const totalLeaves = countLeaves(taxonomyTree)
  const completed = completedIds.size
  const percent = totalLeaves > 0 ? Math.round((completed / totalLeaves) * 100) : 0

  return { completedIds, toggle, reset, completed, totalLeaves, percent }
}
