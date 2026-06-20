// Fire-and-forget realtime broadcast from comms API routes.

import type { ChannelRow } from '@/lib/comms/channels'
import type { MessageRow } from '@/lib/comms/messages'
import {
  buildChannelCreatedEvent,
  buildMessageCreatedEvent,
  buildMessageDeletedEvent,
  buildMessageUpdatedEvent,
} from '@/lib/comms/realtime/events'
import { publishCommsEvent } from '@/lib/comms/realtime/publisher'

export function broadcastMessageCreated(message: MessageRow): void {
  void publishCommsEvent(buildMessageCreatedEvent(message)).catch((err) => {
    console.error('[comms] publish message.created failed', err)
  })
}

export function broadcastMessageUpdated(message: MessageRow): void {
  void publishCommsEvent(buildMessageUpdatedEvent(message)).catch((err) => {
    console.error('[comms] publish message.updated failed', err)
  })
}

export function broadcastMessageDeleted(channelId: string, messageId: string): void {
  void publishCommsEvent(buildMessageDeletedEvent(channelId, messageId)).catch((err) => {
    console.error('[comms] publish message.deleted failed', err)
  })
}

export function broadcastChannelCreated(channel: ChannelRow): void {
  void publishCommsEvent(buildChannelCreatedEvent(channel)).catch((err) => {
    console.error('[comms] publish channel.created failed', err)
  })
}
