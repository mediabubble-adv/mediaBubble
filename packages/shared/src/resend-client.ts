import { env } from './env'

export interface ContactEmailPayload {
  firstName: string
  lastName: string
  email: string
  phone?: string
  service?: string
  message: string
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
