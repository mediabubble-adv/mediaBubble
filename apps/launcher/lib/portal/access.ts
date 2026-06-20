// Client portal access rules — which contacts may receive magic links.

import type { clients } from '@prisma/client'

type ClientContact = Pick<clients, 'primary_contact_email' | 'allowed_domains' | 'client_portal_enabled' | 'status'>

export function isPortalEnabled(client: ClientContact): boolean {
  return client.client_portal_enabled !== false && client.status !== 'inactive'
}

export function emailAllowedForClient(client: ClientContact, email: string): boolean {
  const normalized = email.trim().toLowerCase()
  if (!normalized.includes('@')) return false

  const primary = client.primary_contact_email?.trim().toLowerCase()
  if (primary && primary === normalized) return true

  const domain = normalized.split('@')[1]
  if (!domain) return false

  return client.allowed_domains.some((entry) => entry.trim().toLowerCase() === domain)
}
