// Redis pub/sub publisher + subscriber for Communication Hub realtime.

import type { CommsEvent } from './events'
import {
  COMMS_GLOBAL_REDIS_KEY,
  parseCommsEvent,
  redisChannelKey,
} from './events'
import { emitCommsHub } from './hub'

type RedisClient = {
  publish(channel: string, message: string): Promise<number>
  psubscribe(pattern: string): Promise<unknown>
  on(event: string, listener: (...args: unknown[]) => void): void
  quit(): Promise<string>
}

let publisher: RedisClient | null = null
let subscriber: RedisClient | null = null
let subscriberStarted = false

function getRedisUrl(): string | undefined {
  const url = process.env['REDIS_URL']?.trim()
  return url || undefined
}

async function loadRedis(): Promise<new (url: string) => RedisClient> {
  const mod = await import('ioredis')
  return mod.default as unknown as new (url: string) => RedisClient
}

async function getPublisher(): Promise<RedisClient | null> {
  const url = getRedisUrl()
  if (!url) return null
  if (!publisher) {
    const Redis = await loadRedis()
    publisher = new Redis(url)
  }
  return publisher
}

export async function publishCommsEvent(event: CommsEvent): Promise<void> {
  emitCommsHub(event)

  const redis = await getPublisher()
  if (!redis) return

  const payload = JSON.stringify(event)
  const key =
    event.type === 'channel.created' ? COMMS_GLOBAL_REDIS_KEY : redisChannelKey(event.channel_id)

  await redis.publish(key, payload)
}

export async function ensureRedisSubscriber(): Promise<void> {
  const url = getRedisUrl()
  if (!url || subscriberStarted) return
  subscriberStarted = true

  const Redis = await loadRedis()
  subscriber = new Redis(url)
  await subscriber.psubscribe('comms:*')
  subscriber.on('pmessage', (_pattern: unknown, channel: unknown, message: unknown) => {
    if (typeof message !== 'string') return
    const event = parseCommsEvent(message)
    if (!event) return
    emitCommsHub(event)
    void channel
  })
}

export async function closeRedisRealtime(): Promise<void> {
  await publisher?.quit()
  await subscriber?.quit()
  publisher = null
  subscriber = null
  subscriberStarted = false
}
