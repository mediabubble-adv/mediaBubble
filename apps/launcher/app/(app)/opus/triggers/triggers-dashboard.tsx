'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import type { OpusTriggerRow } from '@/lib/opus/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'

export function OpusTriggersDashboard({ canManage }: { canManage: boolean }) {
  const [triggers, setTriggers] = useState<OpusTriggerRow[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [runs, setRuns] = useState<Array<{ id: string; status: string; started_at: string; error_message: string | null }>>([])
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const selected = triggers.find((t) => t.id === selectedId) ?? null

  const loadTriggers = useCallback(async (): Promise<void> => {
    const res = await fetch('/api/opus/triggers')
    const json = await res.json()
    if (json.status === 200) {
      setTriggers(json.data)
      setSelectedId((prev) => prev ?? json.data[0]?.id ?? null)
    }
  }, [])

  async function loadRuns(id: string): Promise<void> {
    const res = await fetch(`/api/opus/triggers/${id}/runs`)
    const json = await res.json()
    if (json.status === 200) setRuns(json.data)
  }

  useEffect(() => {
    void loadTriggers()
  }, [loadTriggers])

  useEffect(() => {
    if (selectedId) void loadRuns(selectedId)
  }, [selectedId])

  async function runNow(): Promise<void> {
    if (!selectedId || !canManage) return
    setBusy(true)
    setMessage(null)
    const res = await fetch(`/api/opus/triggers/${selectedId}/run`, { method: 'POST' })
    const json = await res.json()
    setBusy(false)
    setMessage(json.message)
    await loadTriggers()
    if (selectedId) await loadRuns(selectedId)
  }

  return (
    <PageFrame>
      <PageHeader
        kicker="OPUS Automation"
        title="Triggers"
        actions={
          <Link href="/opus">
            <Button variant="outline">Back</Button>
          </Link>
        }
      />

        {message ? <p className="mt-4 text-sm text-muted-foreground">{message}</p> : null}

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)] 2xl:gap-6">
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Schedule</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {triggers.map((t) => (
                    <tr
                      key={t.id}
                      className={`cursor-pointer border-b border-border/60 hover:bg-muted/40 ${selectedId === t.id ? 'bg-muted/60' : ''}`}
                      onClick={() => setSelectedId(t.id)}
                    >
                      <td className="px-4 py-3 font-medium">{t.name}</td>
                      <td className="px-4 py-3">{t.type}</td>
                      <td className="px-4 py-3 text-muted-foreground">{t.schedule ?? '—'}</td>
                      <td className="px-4 py-3">
                        <Badge tone={t.enabled ? 'success' : 'neutral'}>{t.enabled ? 'Active' : 'Off'}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-5">
              {selected ? (
                <>
                  <div>
                    <h2 className="font-display font-bold">{selected.name}</h2>
                    <p className="mt-1 text-[12px] text-muted-foreground">Action: {selected.action}</p>
                    <p className="text-[12px] text-muted-foreground">
                      Runs: {selected.execution_count}
                      {selected.last_run_at ? ` · Last: ${new Date(selected.last_run_at).toLocaleString()}` : ''}
                    </p>
                  </div>
                  {canManage ? (
                    <Button onClick={() => void runNow()} disabled={busy || !selected.enabled}>
                      {busy ? 'Running…' : 'Run now'}
                    </Button>
                  ) : (
                    <p className="text-[12px] text-muted-foreground">Manager access required to run triggers.</p>
                  )}
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Recent runs
                    </p>
                    <ul className="mt-2 space-y-2">
                      {runs.slice(0, 5).map((r) => (
                        <li key={r.id} className="text-[12px]">
                          <Badge tone={r.status === 'Completed' ? 'success' : r.status === 'Failed' ? 'danger' : 'blue'}>
                            {r.status}
                          </Badge>{' '}
                          {new Date(r.started_at).toLocaleString()}
                          {r.error_message ? ` — ${r.error_message}` : ''}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Select a trigger</p>
              )}
            </CardContent>
          </Card>
        </div>
    </PageFrame>
  )
}
