import {
  STORAGE_KEYS,
  getTypedStorageItem,
  removeTypedStorageItem,
  setTypedStorageItem,
} from './storage-keys'

describe('storage-keys', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('round-trips cookie consent values', () => {
    expect(setTypedStorageItem(STORAGE_KEYS.cookieConsent, 'accepted')).toBe(true)
    expect(getTypedStorageItem(STORAGE_KEYS.cookieConsent)).toBe('accepted')
  })

  it('rejects invalid cookie consent payloads', () => {
    localStorage.setItem(STORAGE_KEYS.cookieConsent, 'maybe')
    expect(getTypedStorageItem(STORAGE_KEYS.cookieConsent)).toBeNull()
  })

  it('round-trips sidebar collapsed boolean', () => {
    setTypedStorageItem(STORAGE_KEYS.sidebarCollapsed, false)
    expect(getTypedStorageItem(STORAGE_KEYS.sidebarCollapsed)).toBe(false)
  })

  it('round-trips newsletter shown date', () => {
    const today = '2026-06-13'
    setTypedStorageItem(STORAGE_KEYS.newsletterShownDate, today)
    expect(getTypedStorageItem(STORAGE_KEYS.newsletterShownDate)).toBe(today)
  })

  it('round-trips arabic skill progress ids', () => {
    setTypedStorageItem(STORAGE_KEYS.arabicSkillProgress, ['a', 'b'])
    expect(getTypedStorageItem(STORAGE_KEYS.arabicSkillProgress)).toEqual(['a', 'b'])
  })

  it('removes typed storage keys', () => {
    setTypedStorageItem(STORAGE_KEYS.language, 'ar')
    expect(removeTypedStorageItem(STORAGE_KEYS.language)).toBe(true)
    expect(getTypedStorageItem(STORAGE_KEYS.language)).toBeNull()
  })
})
