'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { ClipboardList, Plus } from 'lucide-react'
import type { ClientRow } from '@/lib/crm/clients'
import type { QuotationRow } from '@/lib/crm/quotations'
import { CURRENCIES, QUOTATION_STATUSES } from '@/lib/crm/schemas'
import { Input } from '@/components/ui/input'

const STATUS_STYLES: Record<string, string> = {
  Draft: 'bg-muted-foreground/15 text-muted-foreground',
  Sent: 'bg-primary/15 text-primary',
  Approved: 'bg-[#16A34A]/15 text-[#16A34A]',
  Expired: 'bg-[#CA8A04]/15 text-[#CA8A04]',
  Revised: 'bg-muted-foreground/15 text-muted-foreground',
}

function defaultValidUntil(): string {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() + 30)
  return d.toISOString().slice(0, 10)
}

export function CrmQuotationsPanel({
  initialQuotations,
  clients,
  canManage,
}: {
  initialQuotations: QuotationRow[]
  clients: ClientRow[]
  canManage: boolean
}) {
  const [quotations, setQuotations] = useState(initialQuotations)
  const [statusFilter, setStatusFilter] = useState<'all' | (typeof QUOTATION_STATUSES)[number]>('all')
  const [showForm, setShowForm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const activeClients = useMemo(
    () => clients.filter((c) => c.status === 'active'),
    [clients],
  )

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return quotations
    return quotations.filter((q) => q.status === statusFilter)
  }, [quotations, statusFilter])

  async function refreshQuotations(): Promise<void> {
    const res = await fetch('/api/crm/quotations')
    const json = await res.json()
    if (json.status === 200) setQuotations(json.data)
  }

  async function createQuotation(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const res = await fetch('/api/crm/quotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: fd.get('client_id'),
        currency: fd.get('currency') || 'EGP',
        valid_until: fd.get('valid_until') || null,
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
      setError(json.message ?? 'Could not create quotation')
      return
    }
    setQuotations((prev) => [json.data, ...prev])
    setShowForm(false)
    e.currentTarget.reset()
  }

  async function convertToInvoice(id: string): Promise<void> {
    setBusy(true)
    setError(null)
    const res = await fetch(`/api/crm/quotations/${id}/convert`, { method: 'POST' })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 201) {
      setError(json.message ?? 'Could not convert quotation')
      return
    }
    await refreshQuotations()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-muted-foreground">
          Proposals linked to clients — convert approved quotes to draft invoices.
        </p>
        {canManage ? (
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white transition-[transform,opacity] duration-150 ease-[var(--ease-out)] hover:opacity-90 active:scale-[0.98]"
          >
            <Plus size={16} />
            New quotation
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
          onSubmit={createQuotation}
          className="mt-6 grid gap-4 rounded-2xl border border-border bg-card p-5 md:grid-cols-2"
        >
          <label className="block md:col-span-2">
            <span className="text-[12px] font-bold text-muted-foreground">Client</span>
            <select
              name="client_id"
              required
              className="mt-1 text-[14px]"
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
            <span className="text-[12px] font-bold text-muted-foreground">Scope / line item</span>
            <Input
              name="description"
              required
              placeholder="Social + PPC — Q3 proposal"
              className="mt-1 text-[14px]"
            />
          </label>
          <label className="block">
            <span className="text-[12px] font-bold text-muted-foreground">Quantity</span>
            <Input
              name="quantity"
              type="number"
              min="0.01"
              step="0.01"
              defaultValue="1"
              dir="ltr"
              className="mt-1 text-[14px] tabular-nums"
              style={{ unicodeBidi: 'isolate' }}
            />
          </label>
          <label className="block">
            <span className="text-[12px] font-bold text-muted-foreground">Unit price</span>
            <Input
              name="unit_price"
              type="number"
              min="0"
              step="0.01"
              required
              dir="ltr"
              className="mt-1 text-[14px] tabular-nums"
              style={{ unicodeBidi: 'isolate' }}
            />
          </label>
          <label className="block">
            <span className="text-[12px] font-bold text-muted-foreground">Currency</span>
            <select
              name="currency"
              defaultValue="EGP"
              className="mt-1 text-[14px]"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-[12px] font-bold text-muted-foreground">Valid until</span>
            <Input
              name="valid_until"
              type="date"
              defaultValue={defaultValidUntil()}
              dir="ltr"
              className="mt-1 text-[14px] tabular-nums"
              style={{ unicodeBidi: 'isolate' }}
            />
          </label>
          <div className="flex items-end gap-2 md:col-span-2">
            <button
              type="submit"
              disabled={busy || activeClients.length === 0}
              className="rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white disabled:opacity-50"
            >
              Save quotation
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
          {QUOTATION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => void refreshQuotations()}
          className="rounded-xl border border-border px-3 py-2 text-[13px] font-bold text-muted-foreground"
        >
          Refresh
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-[13px]">
          <thead className="border-b border-border bg-background/40 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-bold">Quotation</th>
              <th className="px-4 py-3 font-bold">Client</th>
              <th className="px-4 py-3 font-bold">Total</th>
              <th className="px-4 py-3 font-bold">Valid until</th>
              <th className="px-4 py-3 font-bold">Status</th>
              {canManage ? <th className="px-4 py-3 font-bold" /> : null}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={canManage ? 6 : 5} className="px-4 py-10 text-center text-muted-foreground">
                  <ClipboardList size={20} className="mx-auto mb-2 opacity-50" />
                  No quotations yet.
                </td>
              </tr>
            ) : (
              filtered.map((quo) => (
                <tr key={quo.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 font-bold text-foreground" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                    {quo.quotation_number}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{quo.client_name}</td>
                  <td className="px-4 py-3 text-foreground" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                    {quo.total.toLocaleString(undefined, { maximumFractionDigits: 2 })} {quo.currency}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                    {quo.valid_until ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase ${
                        STATUS_STYLES[quo.status ?? 'Draft'] ?? STATUS_STYLES['Draft']
                      }`}
                    >
                      {quo.status ?? 'Draft'}
                    </span>
                  </td>
                  {canManage ? (
                    <td className="px-4 py-3 text-right">
                      {!quo.converted_to_invoice_id && quo.status !== 'Approved' ? (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => void convertToInvoice(quo.id)}
                          className="rounded-lg border border-border px-2 py-1 text-[11px] font-bold text-primary disabled:opacity-50"
                        >
                          → Invoice
                        </button>
                      ) : quo.converted_to_invoice_id ? (
                        <span className="text-[11px] text-[#16A34A]">Converted</span>
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
