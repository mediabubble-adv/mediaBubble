import { hasAtLeast, isAdmin, isRole } from './rbac'

describe('rbac', () => {
  it('ranks roles by privilege', () => {
    expect(hasAtLeast('Admin', 'Manager')).toBe(true)
    expect(hasAtLeast('Manager', 'Manager')).toBe(true)
    expect(hasAtLeast('Contributor', 'Manager')).toBe(false)
    expect(hasAtLeast('Viewer', 'Contributor')).toBe(false)
  })

  it('identifies admins', () => {
    expect(isAdmin('Admin')).toBe(true)
    expect(isAdmin('Manager')).toBe(false)
  })

  it('validates role strings', () => {
    expect(isRole('Contributor')).toBe(true)
    expect(isRole('Employee')).toBe(false)
    expect(isRole(42)).toBe(false)
  })
})
