#!/usr/bin/env node
/**
 * Communication Hub WebSocket bridge.
 * Subscribes to Redis pub/sub and forwards events to authenticated browser clients.
 *
 * Env: REDIS_URL, JWT_SECRET, COMMS_WS_PORT (default 3004)
 * Run: pnpm run ws:launcher
 */

import { createServer } from 'node:http'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Redis from 'ioredis'
import { WebSocketServer } from 'ws'

const COMMS_WS_KIND = 'comms_ws'
const __dirname = dirname(fileURLToPath(import.meta.url))

function loadEnvLocal() {
  const envPath = resolve(__dirname, '../.env.local')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnvLocal()

const REDIS_URL = process.env.REDIS_URL?.trim()
const JWT_SECRET = process.env.JWT_SECRET?.trim()
const PORT = Number(process.env.COMMS_WS_PORT ?? 3004)

if (!REDIS_URL) {
  console.error('REDIS_URL is required for the comms WebSocket bridge.')
  process.exit(1)
}
if (!JWT_SECRET) {
  console.error('JWT_SECRET is required for the comms WebSocket bridge.')
  process.exit(1)
}

function sign(data, secret) {
  return createHmac('sha256', secret).update(data).digest('base64url')
}

function verifyJwt(token, secret) {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [header, body, signature] = parts
  const expected = sign(`${header}.${body}`, secret)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  let claims
  try {
    claims = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
  } catch {
    return null
  }
  if (typeof claims.exp !== 'number' || claims.exp < Math.floor(Date.now() / 1000)) return null
  return claims
}

function parseTicketClaims(claims) {
  if (!claims || claims.kind !== COMMS_WS_KIND) return null
  if (typeof claims.sub !== 'string' || typeof claims.role !== 'string') return null
  if (!Array.isArray(claims.channels)) return null
  const channels = claims.channels.filter((id) => typeof id === 'string')
  return { userId: claims.sub, role: claims.role, channels }
}

function parseEvent(raw) {
  try {
    const event = JSON.parse(raw)
    if (!event?.type || !event.channel_id) return null
    return event
  } catch {
    return null
  }
}

const redisSub = new Redis(REDIS_URL)
const server = createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('MediaBubble comms WebSocket bridge\n')
})

const wss = new WebSocketServer({ server })

/** @type {Map<string, Set<import('ws').WebSocket>>} */
const channelSockets = new Map()

function addSocket(channelId, socket) {
  const set = channelSockets.get(channelId) ?? new Set()
  set.add(socket)
  channelSockets.set(channelId, set)
}

function removeSocket(channelId, socket) {
  const set = channelSockets.get(channelId)
  if (!set) return
  set.delete(socket)
  if (set.size === 0) channelSockets.delete(channelId)
}

function fanout(channelId, payload) {
  const set = channelSockets.get(channelId)
  if (!set) return
  for (const socket of set) {
    if (socket.readyState === socket.OPEN) socket.send(payload)
  }
}

wss.on('connection', (socket) => {
  /** @type {{ userId: string, role: string, channels: string[] } | null} */
  let session = null
  /** @type {Set<string>} */
  const subscriptions = new Set()

  socket.on('message', (raw) => {
    let msg
    try {
      msg = JSON.parse(String(raw))
    } catch {
      socket.send(JSON.stringify({ type: 'error', message: 'Invalid JSON' }))
      return
    }

    if (msg.type === 'auth') {
      const claims = verifyJwt(String(msg.ticket ?? ''), JWT_SECRET)
      const parsed = parseTicketClaims(claims)
      if (!parsed) {
        socket.send(JSON.stringify({ type: 'error', message: 'Invalid ticket' }))
        socket.close()
        return
      }
      session = parsed
      socket.send(JSON.stringify({ type: 'auth_ok', user_id: parsed.userId }))
      return
    }

    if (!session) {
      socket.send(JSON.stringify({ type: 'error', message: 'Authenticate first' }))
      return
    }

    if (msg.type === 'subscribe') {
      const channelId = String(msg.channel_id ?? '')
      if (!channelId || !session.channels.includes(channelId)) {
        socket.send(JSON.stringify({ type: 'error', message: 'Channel not allowed' }))
        return
      }
      if (!subscriptions.has(channelId)) {
        subscriptions.add(channelId)
        addSocket(channelId, socket)
      }
      socket.send(JSON.stringify({ type: 'subscribed', channel_id: channelId }))
      return
    }

    if (msg.type === 'unsubscribe') {
      const channelId = String(msg.channel_id ?? '')
      subscriptions.delete(channelId)
      removeSocket(channelId, socket)
      socket.send(JSON.stringify({ type: 'unsubscribed', channel_id: channelId }))
    }
  })

  socket.on('close', () => {
    for (const channelId of subscriptions) removeSocket(channelId, socket)
  })
})

redisSub.psubscribe('comms:*', (err) => {
  if (err) {
    console.error('Redis subscribe failed:', err)
    process.exit(1)
  }
  console.log(`Comms WS bridge listening on ws://localhost:${PORT}`)
  console.log(`Redis: ${REDIS_URL.replace(/:[^:@]+@/, ':***@')}`)
})

redisSub.on('pmessage', (_pattern, channel, message) => {
  const event = parseEvent(message)
  if (!event) return

  const payload = JSON.stringify({ type: 'event', event })

  if (channel === 'comms:global') {
    for (const client of wss.clients) {
      if (client.readyState === client.OPEN) client.send(payload)
    }
    return
  }

  const prefix = 'comms:channel:'
  if (typeof channel === 'string' && channel.startsWith(prefix)) {
    const channelId = channel.slice(prefix.length)
    fanout(channelId, payload)
  }
})

server.listen(PORT)

process.on('SIGINT', () => {
  redisSub.quit()
  wss.close()
  server.close()
  process.exit(0)
})
