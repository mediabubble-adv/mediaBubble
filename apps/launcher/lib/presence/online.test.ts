import { isOnline } from './online'
import { ONLINE_WINDOW_MS } from './constants'

describe('isOnline', () => {
  const now = new Date('2026-06-25T12:00:00.000Z')

  it('returns true when last_seen is within the 5-minute window', () => {
    const fourMinAgo = new Date(now.getTime() - 4 * 60 * 1000)
    expect(isOnline(fourMinAgo, now)).toBe(true)
  })

  it('returns false when last_seen is outside the window', () => {
    const sixMinAgo = new Date(now.getTime() - 6 * 60 * 1000)
    expect(isOnline(sixMinAgo, now)).toBe(false)
  })

  it('returns false for null last_seen', () => {
    expect(isOnline(null, now)).toBe(false)
  })

  it('uses exactly ONLINE_WINDOW_MS as boundary', () => {
    const atBoundary = new Date(now.getTime() - ONLINE_WINDOW_MS)
    expect(isOnline(atBoundary, now)).toBe(true)
    const pastBoundary = new Date(now.getTime() - ONLINE_WINDOW_MS - 1)
    expect(isOnline(pastBoundary, now)).toBe(false)
  })
})
