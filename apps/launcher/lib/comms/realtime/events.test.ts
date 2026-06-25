import {
  buildChannelCreatedEvent,
  buildMessageCreatedEvent,
  buildMessageDeletedEvent,
  buildMessageUpdatedEvent,
  parseCommsEvent,
} from './events'

describe('comms realtime events', () => {
  const message = {
    id: 'msg-1',
    channel_id: 'ch-1',
    user_id: 'u-1',
    author_name: 'Alex',
    content: 'Hello',
    thread_id: null,
    attachments: null,
    reactions: null,
    edited_at: null,
    created_at: '2026-06-20T12:00:00.000Z',
  }

  it('round-trips message.created through JSON', () => {
    const event = buildMessageCreatedEvent(message)
    const parsed = parseCommsEvent(JSON.stringify(event))
    expect(parsed?.type).toBe('message.created')
    if (parsed?.type === 'message.created') {
      expect(parsed.message).toEqual(message)
    }
  })

  it('builds update and delete envelopes', () => {
    const updated = buildMessageUpdatedEvent({ ...message, content: 'Edited' })
    expect(updated.type).toBe('message.updated')

    const deleted = buildMessageDeletedEvent('ch-1', 'msg-1')
    if (deleted.type === 'message.deleted') {
      expect(deleted.message_id).toBe('msg-1')
    }
  })

  it('builds channel.created envelope', () => {
    const channel = {
      id: 'ch-2',
      name: 'general',
      description: null,
      type: 'Public',
      dm_key: null,
      created_by: 'u-1',
      members: ['u-1'],
      created_at: '2026-06-20T12:00:00.000Z',
      archived_at: null,
    }
    const event = buildChannelCreatedEvent(channel)
    expect(event.type).toBe('channel.created')
    expect(parseCommsEvent(JSON.stringify(event))?.channel_id).toBe('ch-2')
  })
})
