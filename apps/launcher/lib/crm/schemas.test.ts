import {
  CLIENT_STATUSES,
  CONTRACT_TYPES,
  createClientSchema,
  listClientsQuerySchema,
  updateClientSchema,
} from './schemas'

describe('createClientSchema', () => {
  it('accepts a minimal client name', () => {
    const parsed = createClientSchema.safeParse({ name: 'Cairo Retail Group' })
    expect(parsed.success).toBe(true)
  })

  it('rejects empty names', () => {
    const parsed = createClientSchema.safeParse({ name: '   ' })
    expect(parsed.success).toBe(false)
  })

  it('validates contract type and status enums', () => {
    expect(CONTRACT_TYPES).toContain('retainer')
    expect(CLIENT_STATUSES).toContain('active')
    const parsed = createClientSchema.safeParse({
      name: 'Acme',
      contract_type: 'hourly',
      status: 'inactive',
    })
    expect(parsed.success).toBe(true)
  })
})

describe('updateClientSchema', () => {
  it('requires at least one field', () => {
    expect(updateClientSchema.safeParse({}).success).toBe(false)
    expect(updateClientSchema.safeParse({ status: 'inactive' }).success).toBe(true)
  })
})

describe('listClientsQuerySchema', () => {
  it('accepts search and status filters', () => {
    const parsed = listClientsQuerySchema.safeParse({ q: 'cairo', status: 'active' })
    expect(parsed.success).toBe(true)
  })
})
