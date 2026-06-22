'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { Bot, Play, Plus, Search, Sparkles } from 'lucide-react'
import type { PromptRow } from '@/lib/ai/prompts'
import { PROMPT_CATEGORIES } from '@/lib/ai/schemas'
import { extractVariableNames } from '@/lib/ai/template'
import { Input } from '@/components/ui/input'
import { PageFrame, PageHeader } from '@/components/layout/page-frame'

const STATUS_STYLES: Record<string, string> = {
  Draft: 'bg-muted-foreground/15 text-muted-foreground',
  Active: 'bg-[#16A34A]/15 text-[#16A34A]',
  Archived: 'bg-muted-foreground/15 text-muted-foreground',
}

const CATEGORY_LABELS: Record<string, string> = {
  content: 'Content',
  seo: 'SEO',
  sales: 'Sales',
  ops: 'Ops',
  other: 'Other',
}

export function AiDashboard({
  initialPrompts,
  canManage,
}: {
  initialPrompts: PromptRow[]
  canManage: boolean
}) {
  const [prompts, setPrompts] = useState(initialPrompts)
  const [selectedId, setSelectedId] = useState<string | null>(initialPrompts[0]?.id ?? null)
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [runOutput, setRunOutput] = useState<string | null>(null)
  const [runProvider, setRunProvider] = useState<string | null>(null)
  const [variableValues, setVariableValues] = useState<Record<string, string>>({})

  const selected = useMemo(
    () => prompts.find((p) => p.id === selectedId) ?? null,
    [prompts, selectedId],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return prompts
    return prompts.filter((p) =>
      [p.name, p.description, p.category].filter(Boolean).join(' ').toLowerCase().includes(q),
    )
  }, [prompts, query])

  const variableNames = useMemo(() => {
    if (!selected) return [] as string[]
    const fromTemplate = extractVariableNames(selected.template)
    const declared = selected.variables.map((v) => v.name)
    return [...new Set([...declared, ...fromTemplate])]
  }, [selected])

  async function refreshPrompts(): Promise<void> {
    const res = await fetch('/api/ai/prompts')
    const json = await res.json()
    if (json.status === 200) setPrompts(json.data)
  }

  async function createPrompt(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const res = await fetch('/api/ai/prompts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fd.get('name'),
        description: fd.get('description') || null,
        category: fd.get('category') || 'other',
        template: fd.get('template'),
        status: 'Active',
        is_public: canManage && fd.get('is_public') === 'on',
      }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 201) {
      setError(json.message ?? 'Could not create prompt')
      return
    }
    setPrompts((prev) => [json.data, ...prev])
    setSelectedId(json.data.id)
    setShowForm(false)
    e.currentTarget.reset()
  }

  async function runSelected(): Promise<void> {
    if (!selected) return
    setBusy(true)
    setError(null)
    setRunOutput(null)
    const res = await fetch(`/api/ai/prompts/${selected.id}/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variables: variableValues }),
    })
    const json = await res.json()
    setBusy(false)
    if (json.status !== 200) {
      setError(json.message ?? 'Run failed')
      return
    }
    setRunOutput(json.data.execution.output_text)
    setRunProvider(`${json.data.provider} · ${json.data.model}`)
  }

  return (
    <PageFrame>
      <PageHeader
        icon={Bot}
        title="AI Tools"
        description="Prompt Studio — build templates, fill variables, run and log outputs."
        actions={
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white transition-[transform,opacity] duration-150 ease-[var(--ease-out)] hover:opacity-90 active:scale-[0.98]"
          >
            <Plus size={16} />
            New prompt
          </button>
        }
      />

        {error ? (
          <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-[13px] text-destructive">
            {error}
          </p>
        ) : null}

        {showForm ? (
          <form
            onSubmit={createPrompt}
            className="mt-6 grid gap-4 rounded-2xl border border-border bg-card p-5"
          >
            <label className="block">
              <span className="text-[12px] font-bold text-muted-foreground">Name</span>
              <Input
                name="name"
                required
                className="mt-1 text-[14px]"
              />
            </label>
            <label className="block">
              <span className="text-[12px] font-bold text-muted-foreground">Category</span>
              <select
                name="category"
                defaultValue="content"
                className="mt-1 text-[14px]"
              >
                {PROMPT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_LABELS[c] ?? c}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-[12px] font-bold text-muted-foreground">Description</span>
              <Input
                name="description"
                className="mt-1 text-[14px]"
              />
            </label>
            <label className="block">
              <span className="text-[12px] font-bold text-muted-foreground">
                Template <span className="font-normal">(use {'{{variable}}'} syntax)</span>
              </span>
              <textarea
                name="template"
                required
                rows={5}
                placeholder="Write a LinkedIn post for {{brand}} promoting {{offer}} in {{market}}."
                className="mt-1 font-mono text-[13px]"
              />
            </label>
            {canManage ? (
              <label className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <Input name="is_public" type="checkbox" className="rounded" />
                Share with team (public)
              </label>
            ) : null}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={busy}
                className="rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white disabled:opacity-50"
              >
                Save prompt
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

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] 2xl:gap-8">
          <div>
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search prompts…"
                className="w-full rounded-xl border border-border bg-card py-2 pl-9 pr-3 text-[14px] text-foreground"
              />
            </div>
            <div className="space-y-2">
              {filtered.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-border px-4 py-10 text-center text-[13px] text-muted-foreground">
                  No prompts yet. Create one to get started.
                </p>
              ) : (
                filtered.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(prompt.id)
                      setRunOutput(null)
                      setVariableValues({})
                    }}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition-[transform,background-color,color,border-color,opacity] duration-150 ease-[var(--ease-out)] active:scale-[0.99] ${
                      selectedId === prompt.id
                        ? 'border-primary/50 bg-primary/10'
                        : 'border-border bg-card hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-foreground">{prompt.name}</p>
                        <p className="mt-0.5 text-[12px] text-muted-foreground">
                          {CATEGORY_LABELS[prompt.category ?? 'other'] ?? prompt.category} · v
                          {prompt.version ?? 1}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          STATUS_STYLES[prompt.status ?? 'Draft'] ?? STATUS_STYLES['Draft']
                        }`}
                      >
                        {prompt.status ?? 'Draft'}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
            <button
              type="button"
              onClick={() => void refreshPrompts()}
              className="mt-3 rounded-xl border border-border px-3 py-2 text-[13px] font-bold text-muted-foreground"
            >
              Refresh
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            {!selected ? (
              <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                <Sparkles size={24} className="opacity-50" />
                <p className="mt-3 text-[14px] font-bold text-foreground">Select a prompt</p>
                <p className="mt-1 text-[13px]">Pick a template from the list to test it.</p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-lg font-bold text-foreground">{selected.name}</h2>
                {selected.description ? (
                  <p className="mt-1 text-[13px] text-muted-foreground">{selected.description}</p>
                ) : null}
                <pre className="mt-4 max-h-40 overflow-auto rounded-xl border border-border bg-background/50 p-3 font-mono text-[12px] text-muted-foreground whitespace-pre-wrap">
                  {selected.template}
                </pre>

                <div className="mt-4 space-y-3">
                  {variableNames.length === 0 ? (
                    <p className="text-[12px] text-muted-foreground">No variables — run as-is.</p>
                  ) : (
                    variableNames.map((name) => (
                      <label key={name} className="block">
                        <span className="text-[12px] font-bold text-muted-foreground">{name}</span>
                        <Input
                          value={variableValues[name] ?? ''}
                          onChange={(e) =>
                            setVariableValues((prev) => ({ ...prev, [name]: e.target.value }))
                          }
                          className="mt-1 text-[14px]"
                        />
                      </label>
                    ))
                  )}
                </div>

                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void runSelected()}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[13px] font-bold text-white disabled:opacity-50"
                >
                  <Play size={14} />
                  Run prompt
                </button>

                {runOutput ? (
                  <div className="mt-4 rounded-xl border border-border bg-background/40 p-4">
                    {runProvider ? (
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                        {runProvider}
                      </p>
                    ) : null}
                    <pre className="max-h-64 overflow-auto whitespace-pre-wrap font-mono text-[12px] text-foreground">
                      {runOutput}
                    </pre>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
    </PageFrame>
  )
}
