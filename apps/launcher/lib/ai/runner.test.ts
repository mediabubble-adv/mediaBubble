import { applyTemplate } from './template'
import { runPrompt } from './runner'

describe('runPrompt', () => {
  const prev = process.env['GEMINI_API_KEY']

  afterEach(() => {
    if (prev === undefined) delete process.env['GEMINI_API_KEY']
    else process.env['GEMINI_API_KEY'] = prev
  })

  it('returns mock output when no API key is configured', async () => {
    delete process.env['GEMINI_API_KEY']
    const result = await runPrompt('Hello {{name}}', { name: 'Team' })
    expect(result.provider).toBe('mock')
    expect(result.output).toContain('Hello Team')
    expect(result.execution_time_ms).toBeGreaterThanOrEqual(0)
  })

  it('applies variables before execution', () => {
    expect(applyTemplate('{{a}} + {{b}}', { a: '1', b: '2' })).toBe('1 + 2')
  })
})
