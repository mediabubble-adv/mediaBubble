import { CAMPAIGN_STATUSES, PROPOSAL_STATUSES, createCampaignSchema, createProposalSchema } from './schemas'

describe('campaigns schemas', () => {
  it('accepts a proposal with deliverables', () => {
    const parsed = createProposalSchema.safeParse({
      client_id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Q3 Social retainer',
      objectives: ['Grow Instagram reach'],
      deliverables: [{ title: 'Content calendar', description: '12 posts' }],
      budget_estimate: 25000,
    })
    expect(parsed.success).toBe(true)
  })

  it('accepts a campaign with channels', () => {
    const parsed = createCampaignSchema.safeParse({
      client_id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Ramadan push',
      market: 'ae',
      channels: ['social', 'ppc'],
      status: 'Planning',
    })
    expect(parsed.success).toBe(true)
  })

  it('exports status enums', () => {
    expect(PROPOSAL_STATUSES).toContain('Won')
    expect(CAMPAIGN_STATUSES).toContain('Active')
  })
})
