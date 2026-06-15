import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from './storage'
import type { ThemePreference } from './theme/theme-utils'

export type { ThemePreference } from './theme/theme-utils'

/** Canonical localStorage keys used across MediaBubble apps. */
export const STORAGE_KEYS = {
  cookieConsent: 'mediabubble-cookie-consent',
  language: 'mediabubble-language',
  theme: 'mediabubble-theme',
  sidebarCollapsed: 'sidebarCollapsed',
  newsletterShownDate: 'mb_newsletter_shown_date',
  arabicSkillProgress: 'mb-arabic-skill-progress',
} as const

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]

export type CookieConsentValue = 'accepted' | 'declined'

type StorageValueTypes = {
  'mediabubble-cookie-consent': CookieConsentValue
  'mediabubble-language': string
  'mediabubble-theme': ThemePreference
  sidebarCollapsed: boolean
  'mb_newsletter_shown_date': string
  'mb-arabic-skill-progress': string[]
}

function serialize<K extends StorageKey>(key: K, value: StorageValueTypes[K]): string {
  if (key === STORAGE_KEYS.sidebarCollapsed || key === STORAGE_KEYS.arabicSkillProgress) {
    return JSON.stringify(value)
  }
  return String(value)
}

function deserialize<K extends StorageKey>(key: K, raw: string): StorageValueTypes[K] | null {
  try {
    if (key === STORAGE_KEYS.cookieConsent) {
      if (raw === 'accepted' || raw === 'declined') {
        return raw as StorageValueTypes[K]
      }
      return null
    }

    if (key === STORAGE_KEYS.theme) {
      if (raw === 'light' || raw === 'dark' || raw === 'system') {
        return raw as StorageValueTypes[K]
      }
      return null
    }

    if (key === STORAGE_KEYS.sidebarCollapsed) {
      const parsed: unknown = JSON.parse(raw)
      return (typeof parsed === 'boolean' ? parsed : null) as StorageValueTypes[K] | null
    }

    if (key === STORAGE_KEYS.arabicSkillProgress) {
      const parsed: unknown = JSON.parse(raw)
      return (
        Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')
          ? (parsed as string[])
          : null
      ) as StorageValueTypes[K] | null
    }

    return raw as StorageValueTypes[K]
  } catch {
    return null
  }
}

/** Read a typed value for a known storage key, or `null` when missing or invalid. */
export function getTypedStorageItem<K extends StorageKey>(
  key: K,
): StorageValueTypes[K] | null {
  const raw = getLocalStorageItem(key)
  if (raw === null) {
    return null
  }
  return deserialize(key, raw)
}

/** Persist a typed value for a known storage key. Returns `false` when storage is unavailable. */
export function setTypedStorageItem<K extends StorageKey>(
  key: K,
  value: StorageValueTypes[K],
): boolean {
  return setLocalStorageItem(key, serialize(key, value))
}

/** Remove a known storage key. Returns `false` when storage is unavailable. */
export function removeTypedStorageItem(key: StorageKey): boolean {
  return removeLocalStorageItem(key)
}
