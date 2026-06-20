// Prompt execution — offline mock by default; Gemini when GEMINI_API_KEY is set.

import { applyTemplate } from '@/lib/ai/template'

export interface RunPromptResult {
  output: string
  provider: string
  model: string
  execution_time_ms: number
}

async function runWithGemini(prompt: string): Promise<string> {
  const apiKey = process.env['GEMINI_API_KEY']
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured')

  const model = process.env['GEMINI_MODEL'] ?? 'gemini-2.0-flash'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Gemini request failed (${res.status}): ${detail.slice(0, 200)}`)
  }

  const json = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
  }
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Gemini returned an empty response')
  return text
}

function runMock(filledPrompt: string): string {
  return [
    '**Prompt Studio (offline mode)**',
    '',
    'Add `GEMINI_API_KEY` to `apps/launcher/.env.local` for live Gemini responses.',
    '',
    '---',
    '',
    filledPrompt,
  ].join('\n')
}

export async function runPrompt(
  template: string,
  variables: Record<string, string>,
): Promise<RunPromptResult> {
  const started = Date.now()
  const filled = applyTemplate(template, variables)

  if (process.env['GEMINI_API_KEY']) {
    const output = await runWithGemini(filled)
    return {
      output,
      provider: 'gemini',
      model: process.env['GEMINI_MODEL'] ?? 'gemini-2.0-flash',
      execution_time_ms: Date.now() - started,
    }
  }

  return {
    output: runMock(filled),
    provider: 'mock',
    model: 'prompt-studio-offline',
    execution_time_ms: Date.now() - started,
  }
}
