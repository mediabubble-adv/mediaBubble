import { parseTemplateSubtasks, templateSubtaskItemSchema } from './templates'

describe('parseTemplateSubtasks', () => {
  it('returns empty for null', () => {
    expect(parseTemplateSubtasks(null)).toEqual([])
  })

  it('parses string titles', () => {
    expect(parseTemplateSubtasks(['Brief review', 'Design draft'])).toEqual([
      { title: 'Brief review' },
      { title: 'Design draft' },
    ])
  })

  it('parses object items with assignee', () => {
    const uuid = '11111111-1111-1111-1111-111111111111'
    expect(
      parseTemplateSubtasks([{ title: 'QA pass', assigned_to: uuid, estimated_hours: 2 }]),
    ).toEqual([{ title: 'QA pass', assigned_to: uuid, estimated_hours: 2 }])
  })

  it('rejects invalid payloads', () => {
    expect(parseTemplateSubtasks([{ nope: true }])).toEqual([])
  })
})

describe('templateSubtaskItemSchema', () => {
  it('requires a title', () => {
    expect(templateSubtaskItemSchema.safeParse({ title: '' }).success).toBe(false)
  })
})
