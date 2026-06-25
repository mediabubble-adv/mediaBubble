import { parseMentionedUserIds, segmentNoteContent } from './mentions'

describe('dashboard mentions', () => {
  const members = [
    { id: 'u1', name: 'Yasser Dorgham' },
    { id: 'u2', name: 'Sara Ali' },
  ]

  it('parses mentioned user ids from note content', () => {
    const ids = parseMentionedUserIds('Hey @Sara Ali please review @Yasser Dorgham', members)
    expect(ids.sort()).toEqual(['u1', 'u2'])
  })

  it('segments note content for rendering', () => {
    const segments = segmentNoteContent('Ping @Sara Ali today', members)
    expect(segments).toEqual([
      { type: 'text', value: 'Ping ' },
      { type: 'mention', value: 'Sara Ali', userId: 'u2' },
      { type: 'text', value: ' today' },
    ])
  })
})
