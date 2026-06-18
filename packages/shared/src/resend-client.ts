import { env } from './env'

export interface ContactEmailPayload {
  firstName: string
  lastName: string
  email: string
  phone?: string
  service?: string
  message: string
}

const MAX_EMAIL_LENGTH = 254

function containsWhitespace(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) <= 32) return true
  }
  return false
}

/** Linear-time check for contact-form emails (avoids ReDoS-prone regex). */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > MAX_EMAIL_LENGTH) return false

  const at = email.indexOf('@')
  if (at <= 0 || at !== email.lastIndexOf('@')) return false

  const local = email.slice(0, at)
  const domain = email.slice(at + 1)
  if (!local || !domain) return false
  if (containsWhitespace(local) || containsWhitespace(domain)) return false

  const dot = domain.lastIndexOf('.')
  if (dot <= 0 || dot === domain.length - 1) return false

  return true
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function sendContactEmail(payload: ContactEmailPayload): Promise<void> {
  const apiKey = env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  const toEmail = env.CONTACT_EMAIL

  const safeFirstName = escapeHtml(payload.firstName)
  const safeLastName = escapeHtml(payload.lastName)
  const safeEmail = escapeHtml(payload.email)
  const safePhone = payload.phone ? escapeHtml(payload.phone) : '—'
  const safeService = payload.service ? escapeHtml(payload.service) : '—'
  const safeMessage = escapeHtml(payload.message)

  const html = `
    <h2>New enquiry from mediabubble.com</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      <tr><td><strong>Name</strong></td><td>${safeFirstName} ${safeLastName}</td></tr>
      <tr><td><strong>Email</strong></td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
      <tr><td><strong>Phone</strong></td><td>${safePhone}</td></tr>
      <tr><td><strong>Service</strong></td><td>${safeService}</td></tr>
    </table>
    <h3 style="margin-top:20px">Message</h3>
    <p style="white-space:pre-wrap">${safeMessage}</p>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'MediaBubble Website <noreply@mediabubble.com>',
      to: [toEmail],
      replyTo: payload.email,
      subject: `New enquiry from ${payload.firstName} ${payload.lastName}`,
      html,
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Resend delivery failed (${res.status}): ${detail}`)
  }
}
