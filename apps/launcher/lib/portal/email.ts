import { isProduction } from '@/lib/auth/config'

const RESEND_API_KEY = process.env['RESEND_API_KEY']
const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] || 'http://localhost:3003'

export async function sendPortalMagicLinkEmail(
  email: string,
  clientName: string,
  token: string,
): Promise<void> {
  if (!RESEND_API_KEY) {
    if (isProduction()) {
      throw new Error('RESEND_API_KEY is not configured')
    }
    // eslint-disable-next-line no-console
    console.log(`[Email Mock] Portal link for ${clientName} to ${email}: token=${token}`)
    return
  }

  const link = `${SITE_URL}/portal/verify?token=${encodeURIComponent(token)}`
  const html = `
    <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #1f2128; border-radius: 12px; background-color: #121418; color: #e8e8e8;">
      <h2 style="color: #3b82f6; margin-top: 0;">Your MediaBubble client portal</h2>
      <p style="font-size: 14px; line-height: 1.5; color: #a0aec0;">
        You have been invited to view invoices and project updates for <strong>${clientName}</strong>.
        Click below to sign in — the link expires in 24 hours.
      </p>
      <div style="margin: 24px 0; text-align: center;">
        <a href="${link}" style="display: inline-block; padding: 12px 24px; font-size: 14px; font-weight: bold; color: #ffffff; background-color: #3b82f6; border-radius: 8px; text-decoration: none;">
          Open client portal
        </a>
      </div>
      <p style="font-size: 12px; color: #718096; margin-bottom: 0;">
        If the button does not work, copy this link into your browser:
        <br />
        <a href="${link}" style="color: #3b82f6; word-break: break-all;">${link}</a>
      </p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'MediaBubble Launcher <noreply@mediabubble.com>',
      to: [email],
      subject: `Client portal access — ${clientName}`,
      html,
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Resend delivery failed (${res.status}): ${detail}`)
  }
}
