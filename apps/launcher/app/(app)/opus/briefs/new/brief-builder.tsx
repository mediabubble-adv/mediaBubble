'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { FilePlus } from 'lucide-react'
import type { ClientRow } from '@/lib/crm/clients'
import { OPUS_BRIEF_GOALS } from '@/lib/opus/types'
import { SERVICE_CHANNELS } from '@/lib/campaigns/schemas'
import { CURRENCIES } from '@/lib/crm/schemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'

const CHANNEL_LABELS: Record<string, string> = {
  seo: 'SEO',
  ppc: 'PPC',
  social: 'Social',
  branding: 'Branding',
  web: 'Web',
}

export function OpusBriefBuilder({ clients }: { clients: ClientRow[] }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successId, setSuccessId] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const budget = fd.get('budget')?.toString().trim()
    const channels = SERVICE_CHANNELS.filter((c) => fd.get(`channel_${c}`) === 'on')

    const res = await fetch('/api/opus/briefs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: fd.get('client_id'),
        name: fd.get('name'),
        goal: fd.get('goal') || 'leads',
        audience: fd.get('audience') || null,
        budget: budget ? Number(budget) : null,
        currency: fd.get('currency') || 'EGP',
        channels,
        key_messages: String(fd.get('key_messages') ?? '')
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean),
        platforms: {
          meta: fd.get('platform_meta') === 'on',
          google: fd.get('platform_google') === 'on',
          email: fd.get('platform_email') === 'on',
          linkedin: fd.get('platform_linkedin') === 'on',
        },
        create_campaign: fd.get('create_campaign') === 'on',
      }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status === 201) {
      setSuccessId(json.data.id)
    } else {
      setError(json.message ?? 'Failed to create brief')
    }
  }

  if (successId) {
    return (
      <PageFrame width="narrow">
        <Card>
          <CardContent className="space-y-4 p-6 text-center">
            <p className="font-display text-lg font-bold">Brief saved</p>
            <p className="text-sm text-muted-foreground">OPUS recorded your campaign brief.</p>
            <div className="flex justify-center gap-3">
              <Link href="/opus">
                <Button variant="outline">Back to OPUS</Button>
              </Link>
              <Link href="/campaigns">
                <Button>View campaigns</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </PageFrame>
    )
  }

  return (
    <PageFrame>
      <PageHeader kicker="OPUS Brief" icon={FilePlus} title="New Campaign Brief" />

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="grid gap-6 xl:grid-cols-2 2xl:gap-8">
      <Card>
        <CardContent className="space-y-4 p-5">
          <label className="block space-y-1">
            <span className="text-[12px] font-medium">Client</span>
            <select
              name="client_id"
              required
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="">Select client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1">
            <span className="text-[12px] font-medium">Campaign name</span>
            <Input name="name" required placeholder="Q3 Product Launch" />
          </label>
          <label className="block space-y-1">
            <span className="text-[12px] font-medium">Goal</span>
            <select name="goal" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
              {OPUS_BRIEF_GOALS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1">
            <span className="text-[12px] font-medium">Target audience</span>
            <textarea
              name="audience"
              rows={2}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder="Startup founders, 25–40, tech-savvy"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1">
              <span className="text-[12px] font-medium">Budget</span>
              <Input name="budget" type="number" min={0} placeholder="8500" />
            </label>
            <label className="block space-y-1">
              <span className="text-[12px] font-medium">Currency</span>
              <select name="currency" className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-5">
          <p className="text-[12px] font-medium">Service channels</p>
          <div className="flex flex-wrap gap-3">
            {SERVICE_CHANNELS.map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name={`channel_${c}`} defaultChecked={c === 'social' || c === 'ppc'} />
                {CHANNEL_LABELS[c] ?? c}
              </label>
            ))}
          </div>
          <p className="text-[12px] font-medium">Ad platforms</p>
          <div className="flex flex-wrap gap-3">
            {[
              ['meta', 'Meta'],
              ['google', 'Google'],
              ['email', 'Email'],
              ['linkedin', 'LinkedIn'],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name={`platform_${key}`} defaultChecked={key === 'meta' || key === 'google'} />
                {label}
              </label>
            ))}
          </div>
          <label className="block space-y-1">
            <span className="text-[12px] font-medium">Key messages (one per line)</span>
            <textarea
              name="key_messages"
              rows={3}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder={'Revolutionary new product\nLimited early-bird pricing'}
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="create_campaign" defaultChecked />
            Create linked campaign record
          </label>
        </CardContent>
      </Card>
      </div>

      <div className="flex gap-3">
        <Link href="/opus">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Create Brief'}
        </Button>
      </div>
    </form>
    </PageFrame>
  )
}
