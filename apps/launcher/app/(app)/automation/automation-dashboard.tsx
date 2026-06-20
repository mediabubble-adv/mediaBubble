'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Play, Plus, RefreshCw, Workflow, Zap } from 'lucide-react'
import type { ExecutionRow, TemplateRow, WorkflowRow } from '@/lib/automation/workflows'
import { ACTION_CATALOG, TRIGGER_CATALOG } from '@/lib/automation/catalog'

const STATUS_STYLES: Record<string, string> = {
  Completed: 'bg-brand-success/15 text-brand-success',
  Failed: 'bg-brand-red/15 text-brand-red',
  Running: 'bg-brand-yellow/15 text-brand-yellow',
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function AutomationDashboard({
  initialWorkflows,
  initialTemplates,
}: {
  initialWorkflows: WorkflowRow[]
  initialTemplates: TemplateRow[]
}) {
  const [workflows, setWorkflows] = useState(initialWorkflows)
  const [templates] = useState(initialTemplates)
  const [selectedId, setSelectedId] = useState<string | null>(initialWorkflows[0]?.id ?? null)
  const [executions, setExecutions] = useState<ExecutionRow[]>([])
  const [showForm, setShowForm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [testOutput, setTestOutput] = useState<string | null>(null)
  const [triggerDataJson, setTriggerDataJson] = useState('{}')

  const selected = useMemo(
    () => workflows.find((w) => w.id === selectedId) ?? null,
    [workflows, selectedId],
  )

  useEffect(() => {
    if (!selectedId) {
      setExecutions([])
      return
    }
    void loadExecutions(selectedId)
  }, [selectedId])

  async function loadExecutions(workflowId: string): Promise<void> {
    const res = await fetch(`/api/automation/workflows/${workflowId}/executions`)
    const json = await res.json()
    if (json.status === 200) setExecutions(json.data)
  }

  async function refreshWorkflows(): Promise<void> {
    const res = await fetch('/api/automation/workflows')
    const json = await res.json()
    if (json.status === 200) setWorkflows(json.data)
  }

  async function createWorkflow(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const res = await fetch('/api/automation/workflows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fd.get('name'),
        description: fd.get('description') || null,
        trigger: { type: fd.get('trigger') || 'manual' },
        steps: [
          {
            action: fd.get('action') || 'log_message',
            params: { message: String(fd.get('message') ?? 'Workflow step') },
          },
        ],
        enabled: fd.get('enabled') === 'on',
      }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 201) {
      setError(json.message ?? 'Could not create workflow')
      return
    }
    setWorkflows((prev) => [json.data, ...prev])
    setSelectedId(json.data.id)
    setShowForm(false)
    e.currentTarget.reset()
  }

  async function applyTemplate(templateId: string): Promise<void> {
    setBusy(true)
    setError(null)
    const res = await fetch(`/api/automation/templates/${templateId}/use`, { method: 'POST' })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 201) {
      setError(json.message ?? 'Could not use template')
      return
    }
    setWorkflows((prev) => [json.data, ...prev])
    setSelectedId(json.data.id)
  }

  async function toggleEnabled(): Promise<void> {
    if (!selected) return
    setBusy(true)
    setError(null)
    const res = await fetch(`/api/automation/workflows/${selected.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: !selected.enabled }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 200) {
      setError(json.message ?? 'Could not update workflow')
      return
    }
    setWorkflows((prev) => prev.map((w) => (w.id === json.data.id ? json.data : w)))
  }

  async function runTest(): Promise<void> {
    if (!selected) return
    setBusy(true)
    setError(null)
    setTestOutput(null)
    let trigger_data: Record<string, unknown> = {}
    try {
      trigger_data = JSON.parse(triggerDataJson || '{}') as Record<string, unknown>
    } catch {
      setBusy(false)
      setError('trigger_data must be valid JSON')
      return
    }
    const res = await fetch(`/api/automation/workflows/${selected.id}/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trigger_data }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 200 && json.status !== 422) {
      setError(json.message ?? 'Test run failed')
      return
    }
    const lines = (json.data?.results ?? [])
      .map((r: { ok: boolean; action: string; detail: string }) =>
        `${r.ok ? '✓' : '✗'} ${r.action}: ${r.detail}`,
      )
      .join('\n')
    setTestOutput(lines || json.message)
    await refreshWorkflows()
    if (selectedId) await loadExecutions(selectedId)
  }

  return (
    <div className="px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-yellow/[0.16]">
              <Workflow size={20} className="text-brand-yellow" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-brand-text">Workflow Automation</h1>
              <p className="text-[13px] text-brand-text-muted">
                Triggers, actions, and execution logs — event hooks and scheduling deferred.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2 text-[13px] font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            <Plus size={16} />
            New workflow
          </button>
        </div>

        {error ? (
          <p className="mt-4 rounded-xl border border-brand-red/30 bg-brand-red/10 px-4 py-3 text-[13px] text-brand-red">
            {error}
          </p>
        ) : null}

        {showForm ? (
          <form
            onSubmit={createWorkflow}
            className="mt-6 rounded-2xl border border-brand-border bg-brand-surface p-5"
          >
            <h2 className="mb-4 font-display text-lg font-bold text-brand-text">Create workflow</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-[12px] font-medium text-brand-text-muted">
                Name
                <input
                  name="name"
                  required
                  className="mt-1 w-full rounded-xl border border-brand-border bg-brand-input px-3 py-2 text-[13px] text-brand-text"
                />
              </label>
              <label className="block text-[12px] font-medium text-brand-text-muted">
                Trigger
                <select
                  name="trigger"
                  defaultValue="manual"
                  className="mt-1 w-full rounded-xl border border-brand-border bg-brand-input px-3 py-2 text-[13px] text-brand-text"
                >
                  {TRIGGER_CATALOG.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-[12px] font-medium text-brand-text-muted sm:col-span-2">
                Description
                <input
                  name="description"
                  className="mt-1 w-full rounded-xl border border-brand-border bg-brand-input px-3 py-2 text-[13px] text-brand-text"
                />
              </label>
              <label className="block text-[12px] font-medium text-brand-text-muted">
                First action
                <select
                  name="action"
                  defaultValue="log_message"
                  className="mt-1 w-full rounded-xl border border-brand-border bg-brand-input px-3 py-2 text-[13px] text-brand-text"
                >
                  {ACTION_CATALOG.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-[12px] font-medium text-brand-text-muted">
                Action message / note
                <input
                  name="message"
                  defaultValue="Workflow step executed"
                  className="mt-1 w-full rounded-xl border border-brand-border bg-brand-input px-3 py-2 text-[13px] text-brand-text"
                />
              </label>
              <label className="flex items-center gap-2 text-[12px] text-brand-text-muted sm:col-span-2">
                <input type="checkbox" name="enabled" defaultChecked className="rounded" />
                Enabled on create
              </label>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                disabled={busy}
                className="rounded-xl bg-brand-blue px-4 py-2 text-[13px] font-bold text-white active:scale-[0.98]"
              >
                Save workflow
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-brand-border px-4 py-2 text-[13px] text-brand-text-muted"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : null}

        <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-2xl border border-brand-border bg-brand-surface p-3">
            <div className="mb-2 flex items-center justify-between px-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">
                Workflows
              </span>
              <button
                type="button"
                onClick={() => void refreshWorkflows()}
                className="text-brand-text-muted hover:text-brand-text"
                aria-label="Refresh workflows"
              >
                <RefreshCw size={14} />
              </button>
            </div>
            <ul className="space-y-1">
              {workflows.map((w) => (
                <li key={w.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(w.id)}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] transition-all duration-200 active:scale-[0.98] ${
                      selectedId === w.id
                        ? 'bg-brand-blue/15 text-brand-blue'
                        : 'text-brand-text hover:bg-brand-input'
                    }`}
                  >
                    <Zap size={14} />
                    <span className="truncate">{w.name}</span>
                    {!w.enabled ? (
                      <span className="ml-auto text-[10px] text-brand-text-muted">off</span>
                    ) : null}
                  </button>
                </li>
              ))}
              {workflows.length === 0 ? (
                <li className="px-3 py-4 text-[12px] text-brand-text-muted">No workflows yet.</li>
              ) : null}
            </ul>

            {templates.length > 0 ? (
              <div className="mt-4 border-t border-brand-border pt-3">
                <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">
                  Templates
                </p>
                <ul className="space-y-1">
                  {templates.map((t) => (
                    <li key={t.id}>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void applyTemplate(t.id)}
                        className="w-full rounded-xl px-3 py-2 text-left text-[12px] text-brand-text-muted hover:bg-brand-input hover:text-brand-text"
                      >
                        {t.name}
                        {t.category ? (
                          <span className="ml-1 text-[10px] opacity-70">({t.category})</span>
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>

          <section className="rounded-2xl border border-brand-border bg-brand-surface p-5">
            {selected ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-bold text-brand-text">{selected.name}</h2>
                    {selected.description ? (
                      <p className="mt-1 text-[13px] text-brand-text-muted">{selected.description}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void toggleEnabled()}
                      className="rounded-xl border border-brand-border px-3 py-1.5 text-[12px] text-brand-text-muted hover:border-brand-blue/40"
                    >
                      {selected.enabled ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void runTest()}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-brand-blue px-3 py-1.5 text-[12px] font-bold text-white active:scale-[0.98]"
                    >
                      <Play size={14} />
                      Test run
                    </button>
                  </div>
                </div>

                <dl className="mt-4 grid gap-3 text-[12px] sm:grid-cols-2">
                  <div>
                    <dt className="text-brand-text-muted">Trigger</dt>
                    <dd className="font-medium text-brand-text">{selected.trigger.type}</dd>
                  </div>
                  <div>
                    <dt className="text-brand-text-muted">Runs</dt>
                    <dd className="font-medium text-brand-text" dir="ltr">
                      {selected.success_count}/{selected.execution_count} ok
                    </dd>
                  </div>
                </dl>

                <div className="mt-4">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">
                    Steps
                  </p>
                  <ol className="space-y-2">
                    {selected.steps.map((step, i) => (
                      <li
                        key={`${step.action}-${i}`}
                        className="rounded-xl border border-brand-border bg-brand-input/40 px-3 py-2 text-[12px] text-brand-text"
                      >
                        <span className="font-bold">{step.action}</span>
                        {Object.keys(step.params ?? {}).length > 0 ? (
                          <pre className="mt-1 overflow-x-auto text-[11px] text-brand-text-muted">
                            {JSON.stringify(step.params, null, 2)}
                          </pre>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </div>

                <label className="mt-4 block text-[12px] text-brand-text-muted">
                  Test trigger_data (JSON)
                  <textarea
                    value={triggerDataJson}
                    onChange={(e) => setTriggerDataJson(e.target.value)}
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-brand-border bg-brand-input px-3 py-2 font-mono text-[11px] text-brand-text"
                  />
                </label>

                {testOutput ? (
                  <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-brand-border bg-brand-input/30 p-3 text-[11px] text-brand-text">
                    {testOutput}
                  </pre>
                ) : null}

                <div className="mt-6">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">
                    Recent executions
                  </p>
                  {executions.length === 0 ? (
                    <p className="text-[12px] text-brand-text-muted">No runs yet.</p>
                  ) : (
                    <ul className="space-y-2">
                      {executions.map((ex) => (
                        <li
                          key={ex.id}
                          className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-brand-border px-3 py-2 text-[12px]"
                        >
                          <span className={STATUS_STYLES[ex.status] ?? 'text-brand-text-muted'}>
                            {ex.status}
                          </span>
                          <span className="text-brand-text-muted">{formatTime(ex.created_at)}</span>
                          <span className="w-full text-brand-text-muted">
                            {ex.steps_executed} step(s)
                            {ex.error_message ? ` — ${ex.error_message}` : ''}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <p className="text-[13px] text-brand-text-muted">
                Select a workflow or create one from a template.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
