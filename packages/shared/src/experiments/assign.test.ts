import { getOrAssignVariant } from './assign'

describe('getOrAssignVariant', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.spyOn(Math, 'random').mockReturnValue(0.99)
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('assigns and persists a variant', () => {
    const first = getOrAssignVariant('test-exp', ['control', 'urgency'] as const, [0.5, 0.5])
    const second = getOrAssignVariant('test-exp', ['control', 'urgency'] as const, [0.5, 0.5])

    expect(first).toBe('urgency')
    expect(second).toBe('urgency')
    expect(localStorage.getItem('mb-exp-test-exp')).toBe('urgency')
  })

  it('returns stored variant without re-rolling', () => {
    localStorage.setItem('mb-exp-test-exp', 'control')

    const variant = getOrAssignVariant('test-exp', ['control', 'urgency'] as const, [0.5, 0.5])

    expect(variant).toBe('control')
    expect(Math.random).not.toHaveBeenCalled()
  })
})
