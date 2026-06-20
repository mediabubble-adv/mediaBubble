import { emailAllowedForClient, isPortalEnabled } from './access'

describe('portal access', () => {
  const base = {
    primary_contact_email: 'Client@Example.com',
    allowed_domains: ['partner.co'],
    client_portal_enabled: true,
    status: 'active',
  }

  it('allows primary contact email (case-insensitive)', () => {
    expect(emailAllowedForClient(base, 'client@example.com')).toBe(true)
  })

  it('allows email on an allowed domain', () => {
    expect(emailAllowedForClient(base, 'anyone@partner.co')).toBe(true)
  })

  it('rejects unknown email domains', () => {
    expect(emailAllowedForClient(base, 'other@unknown.io')).toBe(false)
  })

  it('detects disabled portal', () => {
    expect(isPortalEnabled({ ...base, client_portal_enabled: false })).toBe(false)
    expect(isPortalEnabled({ ...base, status: 'inactive' })).toBe(false)
  })
})
