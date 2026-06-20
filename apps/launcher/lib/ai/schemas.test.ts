import { PROMPT_CATEGORIES, createPromptSchema, runPromptSchema } from './schemas'

describe('createPromptSchema', () => {
  it('accepts a minimal prompt', () => {
    const parsed = createPromptSchema.safeParse({
      name: 'SEO brief',
      template: 'Write meta for {{brand}} targeting {{keyword}}.',
    })
    expect(parsed.success).toBe(true)
  })

  it('validates categories', () => {
    expect(PROMPT_CATEGORIES).toContain('content')
    const parsed = createPromptSchema.safeParse({
      name: 'Brief',
      template: 'Hello',
      category: 'seo',
    })
    expect(parsed.success).toBe(true)
  })
})

describe('runPromptSchema', () => {
  it('accepts variable map', () => {
    const parsed = runPromptSchema.safeParse({ variables: { brand: 'MediaBubble' } })
    expect(parsed.success).toBe(true)
  })
})
