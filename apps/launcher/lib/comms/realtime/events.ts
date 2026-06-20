// Realtime event envelope for Communication Hub (Redis pub/sub + WebSocket).

import type { ChannelRow } from '@/lib/comms/channels'
import type { MessageRow } from '@/lib/comms/messages'

export const COMMS_WS_KIND = 'comms_ws' as const

export const COMMS_EVENT_TYPES = [
  'message.created',
  'message.updated',
  'message.deleted',
  'channel.created',
] as const

export type CommsEventType = (typeof COMMS_EVENT_TYPES)[number]

export type CommsEvent =
  | { type: 'message.created'; channel_id: string; at: string; message: MessageRow }
  | { type: 'message.updated'; channel_id: string; at: string; message: MessageRow }
  | { type: 'message.deleted'; channel_id: string; at: string; message_id: string }
  | { type: 'channel.created'; channel_id: string; at: string; channel: ChannelRow }

export function redisChannelKey(channelId: string): string {
  return `comms:channel:${channelId}`
}

export const COMMS_GLOBAL_REDIS_KEY = 'comms:global'

export function parseCommsEvent(raw: string): CommsEvent | null {
  try {
    const parsed = JSON.parse(raw) as CommsEvent
    if (!parsed?.type || !parsed.channel_id) return null
    if (!(COMMS_EVENT_TYPES as readonly string[]).includes(parsed.type)) return null
    switch (parsed.type) {
      case 'message.created':
      case 'message.updated':
        return parsed.message ? parsed : null
      case 'message.deleted':
        return parsed.message_id ? parsed : null
      case 'channel.created':
        return parsed.channel ? parsed : null
      default:
        return null
    }
  } catch {
    return null
  }
}

export function buildMessageCreatedEvent(message: MessageRow): CommsEvent {
  return {
    type: 'message.created',
    channel_id: message.channel_id,
    at: new Date().toISOString(),
    message,
  }
}

export function buildMessageUpdatedEvent(message: MessageRow): CommsEvent {
  return {
    type: 'message.updated',
    channel_id: message.channel_id,
    at: new Date().toISOString(),
    message,
  }
}

export function buildMessageDeletedEvent(channelId: string, messageId: string): CommsEvent {
  return {
    type: 'message.deleted',
    channel_id: channelId,
    at: new Date().toISOString(),
    message_id: messageId,
  }
}

export function buildChannelCreatedEvent(channel: ChannelRow): CommsEvent {
  return {
    type: 'channel.created',
    channel_id: channel.id,
    at: new Date().toISOString(),
    channel,
  }
}
