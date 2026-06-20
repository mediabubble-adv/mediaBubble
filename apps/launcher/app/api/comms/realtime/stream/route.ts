// GET /api/comms/realtime/stream — SSE fallback when the WS bridge is unavailable.

import { fail } from '@/lib/api/response'
import { toResponse } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { canAccessChannel } from '@/lib/comms/access'
import type { CommsEvent } from '@/lib/comms/realtime/events'
import { subscribeCommsHub } from '@/lib/comms/realtime/hub'
import { ensureRedisSubscriber } from '@/lib/comms/realtime/publisher'
import { prisma } from '@/lib/db/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))
  if (!hasAtLeast(me.role, 'Contributor')) {
    return toResponse(fail('forbidden', 'Contributor access required', 403))
  }

  const channelId = new URL(req.url).searchParams.get('channel_id')?.trim() ?? null
  if (channelId) {
    const channel = await prisma.channels.findUnique({ where: { id: channelId } })
    if (!channel || !canAccessChannel(channel, me.id, me.role)) {
      return toResponse(fail('not_found', 'Channel not found', 404))
    }
  }

  await ensureRedisSubscriber()

  const encoder = new TextEncoder()
  let unsubscribe: (() => void) | null = null
  let closed = false

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(': connected\n\n'))

      const send = (event: CommsEvent) => {
        if (closed) return
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
      }

      unsubscribe = subscribeCommsHub(channelId, (event) => {
        if (!channelId || event.channel_id === channelId || event.type === 'channel.created') {
          send(event)
        }
      })
    },
    cancel() {
      closed = true
      unsubscribe?.()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
