'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { Building2, Link2, Plus, Search, Trash2 } from 'lucide-react'
import type { ClientRow } from '@/lib/crm/clients'
import type { InvoiceRow } from '@/lib/crm/invoices'
import type { QuotationRow } from '@/lib/crm/quotations'
import { CONTRACT_TYPES } from '@/lib/crm/schemas'
import { CrmInvoicesPanel } from './crm-invoices-panel'
import { CrmQuotationsPanel } from './crm-quotations-panel'
import { Input } from '@/components/ui/input'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'

export type { ClientRow }

type CrmTab = 'clients' | 'invoices' | 'quotations'

const TABS: { id: CrmTab; label: string }[] = [
  { id: 'clients', label: 'Clients' },
  { id: 'invoices', label: 'Invoices' },
  { id: 'quotations', label: 'Quotations' },
]

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-[#16A34A]/15 text-[#16A34A]',
  inactive: 'bg-muted-foreground/15 text-muted-foreground',
}

const CONTRACT_LABELS: Record<string, string> = {
  retainer: 'Retainer',
  hourly: 'Hourly',
  project: 'Project',
}

export function CrmDashboard({
  initialClients,
  initialInvoices,
  initialQuotations,
  canManage,
}: {
  initialClients: ClientRow[]
  initialInvoices: InvoiceRow[]
  initialQuotations: QuotationRow[]
  canManage: boolean
}) {
  const [tab, setTab] = useState<CrmTab>('clients')
  const [clients, setClients] = useState(initialClients)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [showForm, setShowForm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [portalLink, setPortalLink] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return clients.filter((c) => {
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter
      if (!q) return matchesStatus
      const haystack = [c.name, c.primary_contact_name, c.primary_contact_email]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return matchesStatus && haystack.includes(q)
    })
  }, [clients, query, statusFilter])

  async function refreshClients(): Promise<void> {
    const res = await fetch('/api/crm/clients')
    const json = await res.json()
    if (json.status === 200) setClients(json.data)
  }

  async function createClient(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const monthly = fd.get('monthly_budget')?.toString().trim()
    const res = await fetch('/api/crm/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fd.get('name'),
        primary_contact_name: fd.get('primary_contact_name') || null,
        primary_contact_email: fd.get('primary_contact_email') || null,
        primary_contact_phone: fd.get('primary_contact_phone') || null,
        contract_type: fd.get('contract_type') || 'retainer',
        monthly_budget: monthly ? Number(monthly) : null,
        status: fd.get('status') || 'active',
      }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 201) {
      setError(json.message ?? 'Could not create client')
      return
    }
    setClients((prev) => [...prev, json.data].sort((a, b) => a.name.localeCompare(b.name)))
    setShowForm(false)
    e.currentTarget.reset()
  }

  async function sendPortalLink(client: ClientRow): Promise<void> {
    const email = client.primary_contact_email?.trim()
    if (!email) {
      setError('Add a primary contact email before sending a portal link.')
      return
    }
    setBusy(true)
    setError(null)
    setPortalLink(null)
    const res = await fetch('/api/portal/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: client.id, email }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 201) {
      setError(json.message ?? 'Could not send portal link')
      return
    }
    if (json.data?.portalToken) {
      setPortalLink(`/portal/verify?token=${encodeURIComponent(json.data.portalToken)}`)
    }
  }

  async function archiveClient(id: string): Promise<void> {
    if (!confirm('Archive this client?')) return
    setBusy(true)
    setError(null)
    const res = await fetch(`/api/crm/clients/${id}`, { method: 'DELETE' })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 200) {
      setError(json.message ?? 'Could not archive client')
      return
    }
    setClients((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <PageFrame>
      <PageHeader
        icon={Building2}
        title="CRM"
        description="Clients, invoices, and quotations in one workspace."
        actions={
          canManage && tab === 'clients' ? (
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white transition-[transform,opacity] duration-150 ease-[var(--ease-out)] hover:opacity-90 active:scale-[0.98]"
            >
              <Plus size={16} />
              Add client
            </button>
          ) : null
        }
      />

        {portalLink ? (
          <p className="mt-4 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-[13px] text-foreground">
            Dev portal link:{' '}
            <a href={portalLink} className="font-bold text-primary underline">
              open client portal
            </a>
          </p>
        ) : null}

        {error ? (
          <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-[13px] text-destructive">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2 border-b border-border pb-3">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-xl px-4 py-2 text-[13px] font-bold transition-[transform,background-color,color,border-color,opacity] duration-150 ease-[var(--ease-out)] active:scale-[0.98] ${
                tab === item.id
                  ? 'bg-primary text-white'
                  : 'border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === 'clients' ? (
          <>
        {showForm && canManage ? (
          <form
            onSubmit={createClient}
            className="mt-6 grid gap-4 rounded-2xl border border-border bg-card p-5 md:grid-cols-2"
          >
            <label className="block md:col-span-2">
              <span className="text-[12px] font-bold text-muted-foreground">Client name</span>
              <Input
                name="name"
                required
                className="mt-1 text-[14px]"
              />
            </label>
            <label className="block">
              <span className="text-[12px] font-bold text-muted-foreground">Contact name</span>
              <Input
                name="primary_contact_name"
                className="mt-1 text-[14px]"
              />
            </label>
            <label className="block">
              <span className="text-[12px] font-bold text-muted-foreground">Contact email</span>
              <Input
                name="primary_contact_email"
                type="email"
                className="mt-1 text-[14px]"
              />
            </label>
            <label className="block">
              <span className="text-[12px] font-bold text-muted-foreground">Phone</span>
              <Input
                name="primary_contact_phone"
                dir="ltr"
                className="mt-1 text-[14px] tabular-nums"
                style={{ unicodeBidi: 'isolate' }}
              />
            </label>
            <label className="block">
              <span className="text-[12px] font-bold text-muted-foreground">Contract</span>
              <select
                name="contract_type"
                defaultValue="retainer"
                className="mt-1 text-[14px]"
              >
                {CONTRACT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {CONTRACT_LABELS[t] ?? t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-[12px] font-bold text-muted-foreground">Monthly budget (EGP)</span>
              <Input
                name="monthly_budget"
                type="number"
                min="0"
                step="0.01"
                dir="ltr"
                className="mt-1 text-[14px] tabular-nums"
                style={{ unicodeBidi: 'isolate' }}
              />
            </label>
            <label className="block">
              <span className="text-[12px] font-bold text-muted-foreground">Status</span>
              <select
                name="status"
                defaultValue="active"
                className="mt-1 text-[14px]"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <div className="flex items-end gap-2 md:col-span-2">
              <button
                type="submit"
                disabled={busy}
                className="rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white disabled:opacity-50"
              >
                Save client
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-border px-4 py-2 text-[13px] font-bold text-muted-foreground"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search clients…"
              className="w-full rounded-xl border border-border bg-card py-2 pl-9 pr-3 text-[14px] text-foreground"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            type="button"
            onClick={() => void refreshClients()}
            className="rounded-xl border border-border px-3 py-2 text-[13px] font-bold text-muted-foreground"
          >
            Refresh
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-border bg-background/40 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-bold">Client</th>
                <th className="px-4 py-3 font-bold">Contact</th>
                <th className="px-4 py-3 font-bold">Contract</th>
                <th className="px-4 py-3 font-bold">Budget</th>
                <th className="px-4 py-3 font-bold">Status</th>
                {canManage ? <th className="px-4 py-3 font-bold" /> : null}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={canManage ? 6 : 5} className="px-4 py-10 text-center text-muted-foreground">
                    No clients yet. {canManage ? 'Add one to get started.' : 'Ask a manager to add clients.'}
                  </td>
                </tr>
              ) : (
                filtered.map((client) => (
                  <tr key={client.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 font-bold text-foreground">{client.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <div>{client.primary_contact_name ?? '—'}</div>
                      {client.primary_contact_email ? (
                        <div dir="ltr" className="tabular-nums" style={{ unicodeBidi: 'isolate' }}>
                          {client.primary_contact_email}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">
                      {CONTRACT_LABELS[client.contract_type ?? ''] ?? client.contract_type ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                      {client.monthly_budget != null
                        ? client.monthly_budget.toLocaleString(undefined, { maximumFractionDigits: 0 })
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase ${
                          STATUS_STYLES[client.status ?? 'active'] ?? STATUS_STYLES['active']
                        }`}
                      >
                        {client.status ?? 'active'}
                      </span>
                    </td>
                    {canManage ? (
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => void sendPortalLink(client)}
                            className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-50"
                            aria-label={`Send portal link to ${client.name}`}
                            title="Send client portal link"
                          >
                            <Link2 size={16} />
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => void archiveClient(client.id)}
                            className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                            aria-label={`Archive ${client.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
          </>
        ) : null}

        {tab === 'invoices' ? (
          <CrmInvoicesPanel
            initialInvoices={initialInvoices}
            clients={clients}
            canManage={canManage}
          />
        ) : null}

        {tab === 'quotations' ? (
          <CrmQuotationsPanel
            initialQuotations={initialQuotations}
            clients={clients}
            canManage={canManage}
          />
        ) : null}
    </PageFrame>
  )
}
