// In-process fan-out for SSE subscribers in the same Node runtime.

import type { CommsEvent } from './events'

type HubListener = (event: CommsEvent) => void

interface HubState {
  channelListeners: Map<string, Set<HubListener>>
  globalListeners: Set<HubListener>
}

const HUB_KEY = '__mediabubble_comms_hub__'

function getHub(): HubState {
  const g = globalThis as typeof globalThis & { [HUB_KEY]?: HubState }
  if (!g[HUB_KEY]) {
    g[HUB_KEY] = { channelListeners: new Map(), globalListeners: new Set() }
  }
  return g[HUB_KEY]
}

export function subscribeCommsHub(
  channelId: string | null,
  listener: HubListener,
): () => void {
  const hub = getHub()
  if (channelId) {
    const set = hub.channelListeners.get(channelId) ?? new Set()
    set.add(listener)
    hub.channelListeners.set(channelId, set)
    return () => {
      set.delete(listener)
      if (set.size === 0) hub.channelListeners.delete(channelId)
    }
  }

  hub.globalListeners.add(listener)
  return () => hub.globalListeners.delete(listener)
}

export function emitCommsHub(event: CommsEvent): void {
  const hub = getHub()
  const channelSet = hub.channelListeners.get(event.channel_id)
  channelSet?.forEach((listener) => listener(event))
  hub.globalListeners.forEach((listener) => listener(event))
}
