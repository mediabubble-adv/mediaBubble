/** Safe localStorage read for SSR and private browsing. */
export function getLocalStorageItem(key: string): string | null {
  try {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

/** Safe localStorage write; returns `false` when unavailable. */
export function setLocalStorageItem(key: string, value: string): boolean {
  try {
    if (typeof window === 'undefined') return false
    localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

/** Safe localStorage delete; returns `false` when unavailable. */
export function removeLocalStorageItem(key: string): boolean {
  try {
    if (typeof window === 'undefined') return false
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}
