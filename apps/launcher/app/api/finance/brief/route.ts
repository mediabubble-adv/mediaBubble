// POST /api/finance/brief — generate a dynamic AI brief from a finance snapshot.
// Reuses the existing runner (Gemini when key is set, mock otherwise).

import { z } from 'zod'
import { ok, fail, validationError } from '@/lib/api/response'
import { toResponse, readJson } from '@/lib/api/http'
import { getCurrentUser } from '@/lib/auth/session'
import { runPrompt } from '@/lib/ai/runner'
import { formatMoney } from '@/lib/finance/currency'
import type { CurrencyCode } from '@/lib/finance/currency'
import { generateLocalBrief } from '@/lib/finance/brief'

export const runtime = 'nodejs'

const snapshotSchema = z.object({
  currency: z.enum(['USD', 'EGP', 'AED']),
  summary: z.object({
    inflows: z.number(),
    outflows: z.number(),
    net: z.number(),
  }),
  burnRate: z.number(),
  topCategories: z.array(
    z.object({ category: z.string().max(100), total: z.number(), pct: z.number() }),
  ).max(20),
  monthly: z.array(
    z.object({
      month: z.string().max(20),
      label: z.string().max(20),
      inflow: z.number(),
      outflow: z.number(),
    }),
  ).max(36),
  recurringCount: z.number().int().min(0),
  totalTransactions: z.number().int().min(0),
})

type Snapshot = z.infer<typeof snapshotSchema>

function buildPrompt(s: Snapshot): string {
  const cur = s.currency as CurrencyCode
  const fmt = (n: number) => formatMoney(n, cur)

  const monthLines = s.monthly
    .map((m) => `  ${m.label.padEnd(8)} — Inflow ${fmt(m.inflow).padStart(12)}  |  Outflow ${fmt(m.outflow).padStart(12)}  |  Net ${fmt(m.inflow - m.outflow).padStart(12)}`)
    .join('\n')

  const categoryLines = s.topCategories
    .slice(0, 6)
    .map((c, i) => `  ${i + 1}. ${c.category.padEnd(30)} ${String(c.pct.toFixed(0) + '%').padStart(4)}   ${fmt(c.total).padStart(12)}`)
    .join('\n')

  const margin = s.summary.inflows > 0
    ? ((s.summary.net / s.summary.inflows) * 100).toFixed(1)
    : '0.0'

  const trend = (() => {
    const months = s.monthly
    if (months.length < 2) return 'insufficient data'
    const first = months[0]
    const last = months[months.length - 1]
    if (!first || !last) return 'insufficient data'
    const netFirst = first.inflow - first.outflow
    const netLast = last.inflow - last.outflow
    if (netLast > netFirst) return 'improving'
    if (netLast < netFirst) return 'declining'
    return 'flat'
  })()

  return `You are a concise financial analyst for a digital media agency. Analyse the snapshot below and produce a brief covering:

1. Overall financial health (net position, profit margin, key risks)
2. Cash flow trend and burn sustainability
3. Top spending categories and any anomalies or optimisation opportunities
4. 2–3 concrete, actionable recommendations

Rules: under 250 words, plain text (no markdown headers), direct and data-driven, no filler phrases.

--- FINANCIAL SNAPSHOT ---
Display currency: ${s.currency}
Total transactions: ${s.totalTransactions}
Recurring transactions: ${s.recurringCount}
Net margin: ${margin}%
Cash flow trend: ${trend}

Summary (all-time):
  Inflows:   ${fmt(s.summary.inflows)}
  Outflows:  ${fmt(s.summary.outflows)}
  Net:       ${fmt(s.summary.net)}

Average monthly burn rate: ${fmt(s.burnRate)}

Monthly cash flow (${s.monthly.length} months):
${monthLines}

Top outflow categories:
${categoryLines}
---`
}

export async function POST(req: Request): Promise<Response> {
  const me = getCurrentUser(req)
  if (!me) return toResponse(fail('unauthorized', 'Authentication required', 401))

  const body = await readJson(req)
  if (body === undefined) return toResponse(fail('invalid_json', 'Request body must be valid JSON', 400))

  const parsed = snapshotSchema.safeParse(body)
  if (!parsed.success) return toResponse(validationError(parsed.error))

  if (!process.env['GEMINI_API_KEY']) {
    const brief = generateLocalBrief(parsed.data)
    return toResponse(ok({ brief, provider: 'local', model: 'deterministic' }, 'Brief generated'))
  }

  try {
    const prompt = buildPrompt(parsed.data)
    const result = await runPrompt(prompt, {})
    return toResponse(ok({ brief: result.output, provider: result.provider, model: result.model }, 'Brief generated'))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Brief generation failed'
    return toResponse(fail('provider_error', message, 502))
  }
}
