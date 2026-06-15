import { env } from './env'

const HUBSPOT_API_BASE = 'https://api.hubapi.com'

export interface HubSpotContactInput {
  email: string
  firstName?: string
  lastName?: string
  name?: string
  phone?: string
  service?: string
  service_interest?: string
}

function toProperties(data: HubSpotContactInput): Record<string, string> {
  const properties: Record<string, string> = { email: data.email }

  if (data.firstName) properties['firstname'] = data.firstName
  if (data.lastName) properties['lastname'] = data.lastName

  if (data.name) {
    const parts = data.name.trim().split(/\s+/)
    properties['firstname'] = parts[0]
    if (parts.length > 1) properties['lastname'] = parts.slice(1).join(' ')
  }

  const serviceNote = data.service ?? data.service_interest
  if (data.phone) properties['phone'] = data.phone
  if (serviceNote) properties['hs_content_membership_notes'] = serviceNote

  return properties
}

export async function upsertContact(
  data: HubSpotContactInput,
): Promise<{ contactId: string }> {
  const apiKey = env.HUBSPOT_API_KEY
  if (!apiKey) throw new Error('HUBSPOT_API_KEY not configured')

  const properties = toProperties(data)

  const res = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ properties }),
  })

  if (res.status === 409) {
    const existing = (await res.json()) as { message?: string }
    const idMatch = existing.message?.match(/ID: (\d+)/)
    const existingId = idMatch?.[1]

    if (existingId) {
      await patchContact(existingId, properties, apiKey)
      return { contactId: existingId }
    }
  }

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? `Failed to create contact (${res.status})`)
  }

  const created = (await res.json()) as { id: string }
  return { contactId: created.id }
}

export async function patchContact(
  contactId: string,
  properties: Record<string, string>,
  apiKey = env.HUBSPOT_API_KEY,
): Promise<void> {
  if (!apiKey) throw new Error('HUBSPOT_API_KEY not configured')

  const res = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${contactId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ properties }),
  })

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? `Failed to update contact (${res.status})`)
  }
}

/** Fire-and-forget CRM sync for contact forms — optional when HubSpot is not configured. */
export async function syncContactToHubSpot(data: HubSpotContactInput): Promise<void> {
  if (!env.HUBSPOT_API_KEY) return
  await upsertContact(data)
}
