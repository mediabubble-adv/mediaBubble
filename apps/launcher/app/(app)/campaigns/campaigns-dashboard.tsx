'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { Megaphone, Plus, Rocket, FileOutput } from 'lucide-react'
import type { ClientRow } from '@/lib/crm/clients'
import type { CampaignRow } from '@/lib/campaigns/campaigns'
import type { ProposalRow } from '@/lib/campaigns/proposals'
import {
  CAMPAIGN_STATUSES,
  MARKETS,
  PROPOSAL_STATUSES,
  SERVICE_CHANNELS,
} from '@/lib/campaigns/schemas'
import { CURRENCIES } from '@/lib/crm/schemas'
import { Input } from '@/components/ui/input'

type HubTab = 'proposals' | 'campaigns'

const TABS: { id: HubTab; label: string }[] = [
  { id: 'proposals', label: 'Proposals' },
  { id: 'campaigns', label: 'Campaigns' },
]

const PROPOSAL_STYLES: Record<string, string> = {
  Draft: 'bg-muted-foreground/15 text-muted-foreground',
  Sent: 'bg-primary/15 text-primary',
  Won: 'bg-[#16A34A]/15 text-[#16A34A]',
  Lost: 'bg-destructive/15 text-destructive',
  Archived: 'bg-muted-foreground/15 text-muted-foreground',
}

const CAMPAIGN_STYLES: Record<string, string> = {
  Planning: 'bg-muted-foreground/15 text-muted-foreground',
  Active: 'bg-[#16A34A]/15 text-[#16A34A]',
  Paused: 'bg-accent/15 text-accent',
  Completed: 'bg-primary/15 text-primary',
  Archived: 'bg-muted-foreground/15 text-muted-foreground',
}

const CHANNEL_LABELS: Record<string, string> = {
  seo: 'SEO',
  ppc: 'PPC',
  social: 'Social',
  branding: 'Branding',
  web: 'Web',
}

export function CampaignsDashboard({
  initialProposals,
  initialCampaigns,
  clients,
  canManage,
}: {
  initialProposals: ProposalRow[]
  initialCampaigns: CampaignRow[]
  clients: ClientRow[]
  canManage: boolean
}) {
  const [tab, setTab] = useState<HubTab>('proposals')
  const [proposals, setProposals] = useState(initialProposals)
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [showForm, setShowForm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const activeClients = useMemo(
    () => clients.filter((c) => c.status === 'active'),
    [clients],
  )

  async function refreshProposals(): Promise<void> {
    const res = await fetch('/api/campaigns/proposals')
    const json = await res.json()
    if (json.status === 200) setProposals(json.data)
  }

  async function refreshCampaigns(): Promise<void> {
    const res = await fetch('/api/campaigns/campaigns')
    const json = await res.json()
    if (json.status === 200) setCampaigns(json.data)
  }

  async function createProposal(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const budget = fd.get('budget_estimate')?.toString().trim()
    const res = await fetch('/api/campaigns/proposals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: fd.get('client_id'),
        title: fd.get('title'),
        summary: fd.get('summary') || null,
        currency: fd.get('currency') || 'EGP',
        timeline_weeks: Number(fd.get('timeline_weeks') || 12),
        budget_estimate: budget ? Number(budget) : null,
        objectives: [String(fd.get('objective') ?? '').trim()].filter(Boolean),
        deliverables: [
          {
            title: String(fd.get('deliverable_title') ?? 'Scope package'),
            description: String(fd.get('deliverable_desc') ?? '').trim() || undefined,
          },
        ],
      }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 201) {
      setError(json.message ?? 'Could not create proposal')
      return
    }
    setProposals((prev) => [json.data, ...prev])
    setShowForm(false)
    e.currentTarget.reset()
  }

  async function createCampaign(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const channels = SERVICE_CHANNELS.filter((c) => fd.get(`ch_${c}`) === 'on')
    const budget = fd.get('budget')?.toString().trim()
    const res = await fetch('/api/campaigns/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: fd.get('client_id'),
        name: fd.get('name'),
        brief: fd.get('brief') || null,
        market: fd.get('market') || 'eg',
        channels,
        currency: fd.get('currency') || 'EGP',
        budget: budget ? Number(budget) : null,
        status: 'Planning',
      }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 201) {
      setError(json.message ?? 'Could not create campaign')
      return
    }
    setCampaigns((prev) => [json.data, ...prev])
    setShowForm(false)
    e.currentTarget.reset()
  }

  async function launchProposal(id: string): Promise<void> {
    setBusy(true)
    setError(null)
    const res = await fetch(`/api/campaigns/proposals/${id}/launch`, { method: 'POST' })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 201) {
      setError(json.message ?? 'Could not launch campaign')
      return
    }
    await Promise.all([refreshProposals(), refreshCampaigns()])
    setTab('campaigns')
  }

  async function proposalToQuotation(id: string): Promise<void> {
    setBusy(true)
    setError(null)
    const res = await fetch(`/api/campaigns/proposals/${id}/to-quotation`, { method: 'POST' })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 201) {
      setError(json.message ?? 'Could not create quotation')
      return
    }
    await refreshProposals()
  }

  return (
    <div className="px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/[0.16]">
              <Megaphone size={20} className="text-destructive" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Campaign & Proposal</h1>
              <p className="text-[13px] text-muted-foreground">
                Pitch proposals, launch client campaigns, and hand off to CRM quotations.
              </p>
            </div>
          </div>
          {canManage ? (
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white transition-[transform,opacity] duration-150 ease-[var(--ease-out)] hover:opacity-90 active:scale-[0.98]"
            >
              <Plus size={16} />
              New {tab === 'proposals' ? 'proposal' : 'campaign'}
            </button>
          ) : null}
        </div>

        <div className="mt-6 flex gap-2 border-b border-border pb-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTab(t.id)
                setShowForm(false)
              }}
              className={`rounded-lg px-4 py-2 text-[13px] font-bold transition-[transform,background-color,color,border-color,opacity] duration-150 ease-[var(--ease-out)] active:scale-[0.98] ${
                tab === t.id
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {error ? (
          <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-[13px] text-destructive">
            {error}
          </p>
        ) : null}

        {showForm && canManage ? (
          <form
            onSubmit={tab === 'proposals' ? createProposal : createCampaign}
            className="mt-6 rounded-2xl border border-border bg-card p-5"
          >
            <h2 className="mb-4 font-display text-lg font-bold text-foreground">
              {tab === 'proposals' ? 'New proposal' : 'New campaign'}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-[12px] font-medium text-muted-foreground">
                Client
                <select
                  name="client_id"
                  required
                  className="mt-1 text-[13px]"
                >
                  {activeClients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-[12px] font-medium text-muted-foreground">
                Currency
                <select
                  name="currency"
                  defaultValue="EGP"
                  className="mt-1 text-[13px]"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              {tab === 'proposals' ? (
                <>
                  <label className="block text-[12px] font-medium text-muted-foreground sm:col-span-2">
                    Title
                    <Input
                      name="title"
                      required
                      className="mt-1 text-[13px]"
                    />
                  </label>
                  <label className="block text-[12px] font-medium text-muted-foreground sm:col-span-2">
                    Summary
                    <textarea
                      name="summary"
                      rows={2}
                      className="mt-1 text-[13px]"
                    />
                  </label>
                  <label className="block text-[12px] font-medium text-muted-foreground">
                    Objective
                    <Input
                      name="objective"
                      className="mt-1 text-[13px]"
                    />
                  </label>
                  <label className="block text-[12px] font-medium text-muted-foreground">
                    Timeline (weeks)
                    <Input
                      name="timeline_weeks"
                      type="number"
                      min={1}
                      defaultValue={12}
                      className="mt-1 text-[13px]"
                    />
                  </label>
                  <label className="block text-[12px] font-medium text-muted-foreground">
                    Budget estimate
                    <Input
                      name="budget_estimate"
                      type="number"
                      min={0}
                      className="mt-1 text-[13px]"
                    />
                  </label>
                  <label className="block text-[12px] font-medium text-muted-foreground">
                    Deliverable title
                    <Input
                      name="deliverable_title"
                      defaultValue="Monthly retainer scope"
                      className="mt-1 text-[13px]"
                    />
                  </label>
                  <label className="block text-[12px] font-medium text-muted-foreground sm:col-span-2">
                    Deliverable notes
                    <Input
                      name="deliverable_desc"
                      className="mt-1 text-[13px]"
                    />
                  </label>
                </>
              ) : (
                <>
                  <label className="block text-[12px] font-medium text-muted-foreground sm:col-span-2">
                    Campaign name
                    <Input
                      name="name"
                      required
                      className="mt-1 text-[13px]"
                    />
                  </label>
                  <label className="block text-[12px] font-medium text-muted-foreground sm:col-span-2">
                    Brief
                    <textarea
                      name="brief"
                      rows={2}
                      className="mt-1 text-[13px]"
                    />
                  </label>
                  <label className="block text-[12px] font-medium text-muted-foreground">
                    Market
                    <select
                      name="market"
                      defaultValue="eg"
                      className="mt-1 text-[13px]"
                    >
                      {MARKETS.map((m) => (
                        <option key={m} value={m}>
                          {m.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-[12px] font-medium text-muted-foreground">
                    Budget
                    <Input
                      name="budget"
                      type="number"
                      min={0}
                      className="mt-1 text-[13px]"
                    />
                  </label>
                  <div className="sm:col-span-2">
                    <p className="text-[12px] font-medium text-muted-foreground">Channels</p>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {SERVICE_CHANNELS.map((ch) => (
                        <label key={ch} className="flex items-center gap-2 text-[12px] text-foreground">
                          <Input type="checkbox" name={`ch_${ch}`} className="rounded" />
                          {CHANNEL_LABELS[ch] ?? ch}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                disabled={busy}
                className="rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white active:scale-[0.98]"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-border px-4 py-2 text-[13px] text-muted-foreground"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : null}

        {tab === 'proposals' ? (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="min-w-full text-left text-[13px]">
              <thead className="border-b border-border bg-input/40 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Proposal</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Budget</th>
                  <th className="px-4 py-3">Status</th>
                  {canManage ? <th className="px-4 py-3">Actions</th> : null}
                </tr>
              </thead>
              <tbody>
                {proposals.map((p) => (
                  <tr key={p.id} className="border-b border-border/60">
                    <td className="px-4 py-3">
                      <p className="font-bold text-foreground">{p.title}</p>
                      <p className="text-[11px] text-muted-foreground" dir="ltr">
                        {p.proposal_number}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.client_name}</td>
                    <td className="px-4 py-3 tabular-nums" dir="ltr">
                      {p.budget_estimate != null
                        ? `${p.currency ?? 'EGP'} ${p.budget_estimate.toLocaleString()}`
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-lg px-2 py-0.5 text-[11px] font-bold ${
                          PROPOSAL_STYLES[p.status ?? 'Draft'] ?? PROPOSAL_STYLES['Draft']
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    {canManage ? (
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {!p.quotation_id ? (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => void proposalToQuotation(p.id)}
                              className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground"
                            >
                              <FileOutput size={12} />
                              To quote
                            </button>
                          ) : null}
                          {!p.campaign_id ? (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => void launchProposal(p.id)}
                              className="inline-flex items-center gap-1 rounded-lg bg-primary/15 px-2 py-1 text-[11px] font-bold text-primary"
                            >
                              <Rocket size={12} />
                              Launch
                            </button>
                          ) : null}
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))}
                {proposals.length === 0 ? (
                  <tr>
                    <td colSpan={canManage ? 5 : 4} className="px-4 py-8 text-center text-muted-foreground">
                      No proposals yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
            <table className="min-w-full text-left text-[13px]">
              <thead className="border-b border-border bg-input/40 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Campaign</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Market</th>
                  <th className="px-4 py-3">Channels</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} className="border-b border-border/60">
                    <td className="px-4 py-3 font-bold text-foreground">{c.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.client_name}</td>
                    <td className="px-4 py-3 uppercase text-muted-foreground">{c.market}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {c.channels.length > 0
                        ? c.channels.map((ch) => CHANNEL_LABELS[ch] ?? ch).join(', ')
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-lg px-2 py-0.5 text-[11px] font-bold ${
                          CAMPAIGN_STYLES[c.status ?? 'Planning'] ?? CAMPAIGN_STYLES['Planning']
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      No campaigns yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'proposals' ? (
          <p className="mt-3 text-[11px] text-muted-foreground">
            Statuses: {PROPOSAL_STATUSES.join(' · ')}
          </p>
        ) : (
          <p className="mt-3 text-[11px] text-muted-foreground">
            Statuses: {CAMPAIGN_STATUSES.join(' · ')}
          </p>
        )}
      </div>
    </div>
  )
}
