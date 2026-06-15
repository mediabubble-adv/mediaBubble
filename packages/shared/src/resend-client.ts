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

export async function sendContactEmail(payload: ContactEmailPayload): Promise<void> {
  const apiKey = env.RESEND_API_KEY
  const toEmail = env.CONTACT_EMAIL

  const html = `
    <h2>New enquiry from mediabubble.com</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      <tr><td><strong>Name</strong></td><td>${payload.firstName} ${payload.lastName}</td></tr>
      <tr><td><strong>Email</strong></td><td><a href="mailto:${payload.email}">${payload.email}</a></td></tr>
      <tr><td><strong>Phone</strong></td><td>${payload.phone ?? '—'}</td></tr>
      <tr><td><strong>Service</strong></td><td>${payload.service ?? '—'}</td></tr>
    </table>
    <h3 style="margin-top:20px">Message</h3>
    <p style="white-space:pre-wrap">${payload.message}</p>
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
