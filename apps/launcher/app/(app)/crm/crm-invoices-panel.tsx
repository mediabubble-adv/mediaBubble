'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { FileText, Plus } from 'lucide-react'
import type { ClientRow } from '@/lib/crm/clients'
import type { InvoiceRow } from '@/lib/crm/invoices'
import { CURRENCIES, INVOICE_STATUSES } from '@/lib/crm/schemas'

const STATUS_STYLES: Record<string, string> = {
  Draft: 'bg-muted-foreground/15 text-muted-foreground',
  Sent: 'bg-primary/15 text-primary',
  Paid: 'bg-[#16A34A]/15 text-[#16A34A]',
  Overdue: 'bg-destructive/15 text-destructive',
  Cancelled: 'bg-muted-foreground/15 text-muted-foreground',
}

function defaultDueDate(): string {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() + 14)
  return d.toISOString().slice(0, 10)
}

export function CrmInvoicesPanel({
  initialInvoices,
  clients,
  canManage,
}: {
  initialInvoices: InvoiceRow[]
  clients: ClientRow[]
  canManage: boolean
}) {
  const [invoices, setInvoices] = useState(initialInvoices)
  const [statusFilter, setStatusFilter] = useState<'all' | (typeof INVOICE_STATUSES)[number]>('all')
  const [showForm, setShowForm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const activeClients = useMemo(
    () => clients.filter((c) => c.status === 'active'),
    [clients],
  )

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return invoices
    return invoices.filter((inv) => inv.status === statusFilter)
  }, [invoices, statusFilter])

  async function refreshInvoices(): Promise<void> {
    const res = await fetch('/api/crm/invoices')
    const json = await res.json()
    if (json.status === 200) setInvoices(json.data)
  }

  async function createInvoice(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const res = await fetch('/api/crm/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: fd.get('client_id'),
        currency: fd.get('currency') || 'EGP',
        due_date: fd.get('due_date'),
        discount_percentage: Number(fd.get('discount_percentage') || 0),
        items: [
          {
            description: fd.get('description'),
            quantity: Number(fd.get('quantity') || 1),
            unit_price: Number(fd.get('unit_price')),
          },
        ],
      }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 201) {
      setError(json.message ?? 'Could not create invoice')
      return
    }
    setInvoices((prev) => [json.data, ...prev])
    setShowForm(false)
    e.currentTarget.reset()
  }

  async function markSent(id: string): Promise<void> {
    setBusy(true)
    setError(null)
    const res = await fetch(`/api/crm/invoices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Sent' }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 200) {
      setError(json.message ?? 'Could not update invoice')
      return
    }
    setInvoices((prev) => prev.map((inv) => (inv.id === id ? json.data : inv)))
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-muted-foreground">
          Client-linked invoices with VAT totals and line items.
        </p>
        {canManage ? (
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            <Plus size={16} />
            New invoice
          </button>
        ) : null}
      </div>

      {error ? (
        <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-[13px] text-destructive">
          {error}
        </p>
      ) : null}

      {showForm && canManage ? (
        <form
          onSubmit={createInvoice}
          className="mt-6 grid gap-4 rounded-2xl border border-border bg-card p-5 md:grid-cols-2"
        >
          <label className="block md:col-span-2">
            <span className="text-[12px] font-bold text-muted-foreground">Client</span>
            <select
              name="client_id"
              required
              className="mt-1 w-full rounded-xl border border-border bg-input px-3 py-2 text-[14px] text-foreground"
            >
              <option value="">Select client…</option>
              {activeClients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block md:col-span-2">
            <span className="text-[12px] font-bold text-muted-foreground">Line item</span>
            <input
              name="description"
              required
              placeholder="Monthly retainer — June 2026"
              className="mt-1 w-full rounded-xl border border-border bg-input px-3 py-2 text-[14px] text-foreground"
            />
          </label>
          <label className="block">
            <span className="text-[12px] font-bold text-muted-foreground">Quantity</span>
            <input
              name="quantity"
              type="number"
              min="0.01"
              step="0.01"
              defaultValue="1"
              dir="ltr"
              className="mt-1 w-full rounded-xl border border-border bg-input px-3 py-2 text-[14px] tabular-nums text-foreground"
              style={{ unicodeBidi: 'isolate' }}
            />
          </label>
          <label className="block">
            <span className="text-[12px] font-bold text-muted-foreground">Unit price</span>
            <input
              name="unit_price"
              type="number"
              min="0"
              step="0.01"
              required
              dir="ltr"
              className="mt-1 w-full rounded-xl border border-border bg-input px-3 py-2 text-[14px] tabular-nums text-foreground"
              style={{ unicodeBidi: 'isolate' }}
            />
          </label>
          <label className="block">
            <span className="text-[12px] font-bold text-muted-foreground">Currency</span>
            <select
              name="currency"
              defaultValue="EGP"
              className="mt-1 w-full rounded-xl border border-border bg-input px-3 py-2 text-[14px] text-foreground"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-[12px] font-bold text-muted-foreground">Due date</span>
            <input
              name="due_date"
              type="date"
              required
              defaultValue={defaultDueDate()}
              dir="ltr"
              className="mt-1 w-full rounded-xl border border-border bg-input px-3 py-2 text-[14px] tabular-nums text-foreground"
              style={{ unicodeBidi: 'isolate' }}
            />
          </label>
          <label className="block md:col-span-2">
            <span className="text-[12px] font-bold text-muted-foreground">Discount %</span>
            <input
              name="discount_percentage"
              type="number"
              min="0"
              max="100"
              step="0.01"
              defaultValue="0"
              dir="ltr"
              className="mt-1 w-full rounded-xl border border-border bg-input px-3 py-2 text-[14px] tabular-nums text-foreground"
              style={{ unicodeBidi: 'isolate' }}
            />
          </label>
          <div className="flex items-end gap-2 md:col-span-2">
            <button
              type="submit"
              disabled={busy || activeClients.length === 0}
              className="rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white disabled:opacity-50"
            >
              Save invoice
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
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground"
        >
          <option value="all">All statuses</option>
          {INVOICE_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => void refreshInvoices()}
          className="rounded-xl border border-border px-3 py-2 text-[13px] font-bold text-muted-foreground"
        >
          Refresh
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-[13px]">
          <thead className="border-b border-border bg-background/40 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-bold">Invoice</th>
              <th className="px-4 py-3 font-bold">Client</th>
              <th className="px-4 py-3 font-bold">Total</th>
              <th className="px-4 py-3 font-bold">Due</th>
              <th className="px-4 py-3 font-bold">Status</th>
              {canManage ? <th className="px-4 py-3 font-bold" /> : null}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={canManage ? 6 : 5} className="px-4 py-10 text-center text-muted-foreground">
                  <FileText size={20} className="mx-auto mb-2 opacity-50" />
                  No invoices yet.
                </td>
              </tr>
            ) : (
              filtered.map((inv) => (
                <tr key={inv.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 font-bold text-foreground" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                    {inv.invoice_number}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{inv.client_name}</td>
                  <td className="px-4 py-3 text-foreground" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                    {inv.total.toLocaleString(undefined, { maximumFractionDigits: 2 })} {inv.currency}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                    {inv.due_date}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase ${
                        STATUS_STYLES[inv.status ?? 'Draft'] ?? STATUS_STYLES['Draft']
                      }`}
                    >
                      {inv.status ?? 'Draft'}
                    </span>
                  </td>
                  {canManage ? (
                    <td className="px-4 py-3 text-right">
                      {inv.status === 'Draft' ? (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => void markSent(inv.id)}
                          className="rounded-lg border border-border px-2 py-1 text-[11px] font-bold text-primary disabled:opacity-50"
                        >
                          Mark sent
                        </button>
                      ) : null}
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
