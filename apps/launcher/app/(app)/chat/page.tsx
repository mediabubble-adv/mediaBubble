import type { Metadata } from 'next'
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from '@/lib/auth/server-session'
import { hasAtLeast } from '@/lib/auth/rbac'
import { channelListWhere } from '@/lib/comms/access'
import { serializeChannel } from '@/lib/comms/channels'
import { messageInclude, serializeMessage } from '@/lib/comms/messages'
import { ChatDashboard } from './chat-dashboard'

export const metadata: Metadata = { title: 'Communication Hub' }
export const dynamic = 'force-dynamic'

export default async function ChatPage() {
  const session = await getServerSession()
  if (!session || !hasAtLeast(session.role, 'Contributor')) {
    return null
  }

  const channels = await prisma.channels.findMany({
    where: channelListWhere(session.id, session.role),
    include: { _count: { select: { messages: { where: { deleted_at: null } } } } },
    orderBy: { created_at: 'asc' },
    take: 200,
  })

  const channelRows = channels.map((row) => serializeChannel(row, row._count.messages))
  const firstChannelId = channelRows[0]?.id ?? null

  const messages = firstChannelId
    ? await prisma.messages.findMany({
        where: { channel_id: firstChannelId, deleted_at: null, thread_id: null },
        include: messageInclude,
        orderBy: { created_at: 'asc' },
        take: 100,
      })
    : []

  return (
    <ChatDashboard
      initialChannels={channelRows}
      initialMessages={messages.map(serializeMessage)}
      initialChannelId={firstChannelId}
      currentUserId={session.id}
    />
  )
}
