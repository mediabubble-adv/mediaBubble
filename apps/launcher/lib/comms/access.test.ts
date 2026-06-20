import { canAccessChannel, uniqueMemberIds } from './access'

describe('comms access', () => {
  const channel = {
    id: 'ch-1',
    name: 'general',
    description: null,
    type: 'Public',
    created_by: 'user-a',
    members: ['user-a'],
    created_at: new Date(),
    archived_at: null,
  }

  it('allows contributors into public channels', () => {
    expect(canAccessChannel(channel, 'user-b', 'Contributor')).toBe(true)
  })

  it('blocks private channels for non-members', () => {
    const privateChannel = { ...channel, type: 'Private', members: ['user-a'] }
    expect(canAccessChannel(privateChannel, 'user-b', 'Contributor')).toBe(false)
    expect(canAccessChannel(privateChannel, 'user-a', 'Contributor')).toBe(true)
  })

  it('dedupes channel members with creator', () => {
    expect(uniqueMemberIds('user-a', ['user-b', 'user-a'])).toEqual(['user-a', 'user-b'])
  })
})
