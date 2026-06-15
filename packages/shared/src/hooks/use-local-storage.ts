'use client'

import { useCallback, useEffect, useState } from 'react'
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '../storage'

/** Hydrates a string value from localStorage with SSR-safe defaults. */
export function useLocalStorage(key: string, initialValue: string | null = null) {
  const [value, setValue] = useState<string | null>(initialValue)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setValue(getLocalStorageItem(key) ?? initialValue)
    setHydrated(true)
  }, [key, initialValue])

  const setStoredValue = useCallback(
    (next: string | null) => {
      if (next === null) {
        removeLocalStorageItem(key)
        setValue(null)
        return
      }

      if (setLocalStorageItem(key, next)) {
        setValue(next)
      }
    },
    [key],
  )

  return { value, setValue: setStoredValue, hydrated }
}
