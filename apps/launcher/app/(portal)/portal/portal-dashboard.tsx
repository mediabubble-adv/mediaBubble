'use client'

import { useMemo, useState } from 'react'
import { FileText, LogOut } from 'lucide-react'
import type { InvoiceRow } from '@/lib/crm/invoices'

const STATUS_STYLES: Record<string, string> = {
  Sent: 'bg-primary/15 text-primary',
  Paid: 'bg-[#16A34A]/15 text-[#16A34A]',
  Overdue: 'bg-destructive/15 text-destructive',
}

export function PortalDashboard({
  clientName,
  email,
  invoices,
  invoiceViewEnabled,
}: {
  clientName: string
  email: string
  invoices: InvoiceRow[]
  invoiceViewEnabled: boolean
}) {
  const [busy, setBusy] = useState(false)

  const totals = useMemo(() => {
    const open = invoices.filter((inv) => inv.status !== 'Paid')
    return {
      openCount: open.length,
      openTotal: open.reduce((sum, inv) => sum + inv.total, 0),
    }
  }, [invoices])

  async function signOut(): Promise<void> {
    setBusy(true)
    await fetch('/api/portal/logout', { method: 'POST' })
    window.location.href = '/portal/verify'
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{clientName}</h1>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Signed in as{' '}
              <span dir="ltr" className="tabular-nums" style={{ unicodeBidi: 'isolate' }}>
                {email}
              </span>
            </p>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={() => void signOut()}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-[13px] font-bold text-muted-foreground transition-all duration-200 hover:text-foreground active:scale-[0.98] disabled:opacity-50"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>

        {invoiceViewEnabled ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background/40 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                Open invoices
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-foreground">{totals.openCount}</p>
            </div>
            <div className="rounded-xl border border-border bg-background/40 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                Outstanding total
              </p>
              <p
                className="mt-1 font-display text-2xl font-bold text-foreground"
                dir="ltr"
                style={{ unicodeBidi: 'isolate' }}
              >
                {totals.openTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {invoiceViewEnabled ? (
        <section className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-5 py-4">
            <FileText size={18} className="text-primary" />
            <h2 className="text-[15px] font-bold text-foreground">Invoices</h2>
          </div>
          {invoices.length === 0 ? (
            <p className="px-5 py-10 text-center text-[13px] text-muted-foreground">
              No published invoices yet. Your account manager will notify you when new invoices are ready.
            </p>
          ) : (
            <table className="w-full text-left text-[13px]">
              <thead className="border-b border-border bg-background/40 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-bold">Number</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 font-bold">Due</th>
                  <th className="px-4 py-3 font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 font-bold text-foreground">{invoice.invoice_number}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase ${
                          STATUS_STYLES[invoice.status ?? 'Sent'] ?? STATUS_STYLES['Sent']
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                      {invoice.due_date}
                    </td>
                    <td className="px-4 py-3 text-foreground" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                      {invoice.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}{' '}
                      {invoice.currency ?? 'EGP'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      ) : (
        <p className="rounded-2xl border border-border bg-card px-5 py-10 text-center text-[13px] text-muted-foreground">
          Invoice viewing is not enabled for your account. Contact your MediaBubble account manager.
        </p>
      )}
    </div>
  )
}
