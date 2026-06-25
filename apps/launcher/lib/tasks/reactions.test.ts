import { planReactionToggle, summarizeReactions } from './reactions'

describe('planReactionToggle', () => {
  it('creates when no current reaction', () => {
    expect(planReactionToggle(null, 'like')).toEqual({ action: 'create', emoji: 'like' })
  })

  it('deletes when same emoji clicked', () => {
    expect(planReactionToggle('love', 'love')).toEqual({ action: 'delete', emoji: null })
  })

  it('updates when different emoji clicked', () => {
    expect(planReactionToggle('like', 'happy')).toEqual({ action: 'update', emoji: 'happy' })
  })
})

describe('summarizeReactions', () => {
  it('aggregates counts and includesMe', () => {
    const summary = summarizeReactions(
      [
        { emoji: 'like', user_id: 'a' },
        { emoji: 'like', user_id: 'b' },
        { emoji: 'love', user_id: 'a' },
      ],
      'a',
    )
    expect(summary).toEqual([
      { emoji: 'like', count: 2, userIds: ['a', 'b'], includesMe: true },
      { emoji: 'love', count: 1, userIds: ['a'], includesMe: true },
    ])
  })
})
