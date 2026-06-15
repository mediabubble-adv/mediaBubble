import { act, renderHook, waitFor } from '@testing-library/react'
import { useLocalStorage } from './use-local-storage'

const STORAGE_KEY = 'test-storage-key'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('hydrates from localStorage', async () => {
    localStorage.setItem(STORAGE_KEY, 'saved')

    const { result } = renderHook(() => useLocalStorage(STORAGE_KEY))

    await waitFor(() => {
      expect(result.current.hydrated).toBe(true)
    })

    expect(result.current.value).toBe('saved')
  })

  it('persists updates through the setter', async () => {
    const { result } = renderHook(() => useLocalStorage(STORAGE_KEY))

    await waitFor(() => {
      expect(result.current.hydrated).toBe(true)
    })

    act(() => {
      result.current.setValue('updated')
    })

    expect(result.current.value).toBe('updated')
    expect(localStorage.getItem(STORAGE_KEY)).toBe('updated')
  })

  it('clears values when set to null', async () => {
    localStorage.setItem(STORAGE_KEY, 'remove-me')

    const { result } = renderHook(() => useLocalStorage(STORAGE_KEY))

    await waitFor(() => {
      expect(result.current.hydrated).toBe(true)
    })

    act(() => {
      result.current.setValue(null)
    })

    expect(result.current.value).toBeNull()
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })
})
