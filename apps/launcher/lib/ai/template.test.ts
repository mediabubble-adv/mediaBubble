import { extractVariableNames, applyTemplate } from './template'

describe('prompt template helpers', () => {
  it('extracts variable names from a template', () => {
    expect(extractVariableNames('Hello {{ client_name }}, budget {{budget_egp}}')).toEqual([
      'client_name',
      'budget_egp',
    ])
  })

  it('substitutes provided variables', () => {
    const template = 'Draft for {{client_name}} in {{market}}.'
    expect(applyTemplate(template, { client_name: 'Acme', market: 'UAE' })).toBe(
      'Draft for Acme in UAE.',
    )
  })

  it('leaves missing variables as placeholders', () => {
    expect(applyTemplate('Hi {{name}}', {})).toBe('Hi {{name}}')
  })
})
