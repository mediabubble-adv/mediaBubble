import { NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth/server-session'
import { prisma } from '@/lib/db/prisma'

// Welcome email HTML — Day 0 of the nurture sequence.
// Days 3 and 7 are triggered by a cron job (see /api/cron/email-nurture).
const welcomeHtml = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Launcher</title>
</head>
<body style="margin:0;padding:0;background:#0D0F12;font-family:'Inter',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#111418;border-radius:12px;border:1px solid #1f2128;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="padding:32px 40px 24px;border-bottom:1px solid #1f2128;">
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:32px;height:32px;background:rgba(33,150,243,0.12);border-radius:8px;display:flex;align-items:center;justify-content:center;">
                <span style="font-size:18px;">🚀</span>
              </div>
              <span style="font-size:14px;font-weight:700;color:#e8e8e8;letter-spacing:-0.01em;">MediaBubble Launcher</span>
            </div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;">
            <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#e8e8e8;letter-spacing:-0.02em;">
              Hey ${name}, you're in! 👋
            </h1>
            <p style="margin:0 0 24px;font-size:15px;color:#9e9e9e;line-height:1.6;">
              Your Launcher account is ready. Here's how to get the most out of it this week:
            </p>

            <!-- Step list -->
            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                { n: '01', title: 'Create your first task',   body: 'Head to <strong style="color:#e8e8e8">Tasks</strong> and log what you\'re working on. It keeps the whole team aligned.' },
                { n: '02', title: 'Log your hours',           body: 'The <strong style="color:#e8e8e8">Time</strong> module tracks billable hours, leave, and capacity — one place for everything.' },
                { n: '03', title: 'Check the leaderboard',    body: 'Earn XP for completing tasks. The <strong style="color:#e8e8e8">Leaderboard</strong> resets every month.' },
                { n: '04', title: 'Set your timezone',        body: 'Pop into <strong style="color:#e8e8e8">Settings → Workspace</strong> to set your timezone and currency so due dates line up correctly.' },
              ].map(({ n, title, body }) => `
              <tr>
                <td style="padding:0 0 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="36" valign="top" style="padding-top:2px;">
                        <div style="width:28px;height:28px;background:rgba(33,150,243,0.1);border-radius:6px;text-align:center;line-height:28px;font-size:11px;font-weight:700;color:#2196F3;">${n}</div>
                      </td>
                      <td style="padding-left:12px;">
                        <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#e8e8e8;">${title}</p>
                        <p style="margin:0;font-size:13px;color:#9e9e9e;line-height:1.5;">${body}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>`).join('')}
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
              <tr>
                <td>
                  <a href="https://launcher.mediabubble.co/tasks"
                     style="display:inline-block;background:#2196F3;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:8px;">
                    Open Launcher →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #1f2128;">
            <p style="margin:0;font-size:12px;color:#666;line-height:1.5;">
              You're receiving this because you just completed the Launcher onboarding tour.
              <br />MediaBubble · Cairo, Egypt
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`

export async function POST() {
  const session = await getServerSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Look up the user's name for the personalised email
  const user = await prisma.users.findUnique({
    where: { id: session.id },
    select: { name: true, email: true },
  })

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const firstName = user.name.split(/\s+/)[0] ?? 'there'

  // Send welcome email via Resend HTTP API — non-blocking, best-effort
  if (process.env['RESEND_API_KEY']) {
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env['RESEND_API_KEY']}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Launcher <onboarding@launcher.mediabubble.co>',
        to: user.email,
        subject: `Welcome to Launcher, ${firstName} — your ops hub is ready`,
        html: welcomeHtml(firstName),
      }),
    }).catch(() => {}) // fire-and-forget
  }

  return NextResponse.json({ ok: true })
}
