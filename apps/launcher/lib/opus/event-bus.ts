// In-process OPUS event bus. Pub/sub for workflow orchestration; swap to Redis later.

import { randomUUID } from 'node:crypto'
import type { OpusEvent, OpusEventHandler, OpusEventType } from './types'

const handlers = new Map<OpusEventType, Set<OpusEventHandler>>()
const history: OpusEvent[] = []
const HISTORY_LIMIT = 200

export function subscribe(type: OpusEventType, handler: OpusEventHandler): () => void {
  const set = handlers.get(type) ?? new Set()
  set.add(handler)
  handlers.set(type, set)
  return () => {
    set.delete(handler)
    if (set.size === 0) handlers.delete(type)
  }
}

export async function publish<TPayload extends Record<string, unknown>>(
  event: Omit<OpusEvent<TPayload>, 'occurredAt'>,
): Promise<OpusEvent<TPayload>> {
  const full: OpusEvent<TPayload> = {
    ...event,
    occurredAt: new Date().toISOString(),
  }
  history.unshift(full as OpusEvent)
  if (history.length > HISTORY_LIMIT) history.pop()

  const set = handlers.get(event.type)
  if (set) {
    for (const handler of set) {
      await handler(full as OpusEvent)
    }
  }
  return full
}

export function createCorrelationId(prefix = 'opus'): string {
  return `${prefix}_${randomUUID()}`
}

export function getRecentEvents(limit = 20): OpusEvent[] {
  return history.slice(0, limit)
}

export function resetEventBusForTests(): void {
  handlers.clear()
  history.length = 0
}
