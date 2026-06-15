'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  getTypedStorageItem,
  setTypedStorageItem,
  STORAGE_KEYS,
} from '@mediabubble/shared/client'
import { countLeaves, taxonomyTree } from '@/lib/data/arabic-taxonomy'

function loadProgress(): Set<string> {
  const ids = getTypedStorageItem(STORAGE_KEYS.arabicSkillProgress)
  return ids ? new Set(ids) : new Set()
}

function saveProgress(ids: Set<string>) {
  setTypedStorageItem(STORAGE_KEYS.arabicSkillProgress, Array.from(ids))
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
