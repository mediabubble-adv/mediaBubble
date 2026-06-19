// Brand-compliance scoring, ported from the legacy PromptValidator component.
// Pure function: validate(promptText) -> ValidationResult. Scoring model:
// score = 100 - errors*20 - warnings*10 - infos*5 (clamped to [0, 100]).

import type { Compliance, ValidationIssue, ValidationResult } from './types'

const brandRules = {
  colors: {
    primary: ['#FFC107', '#FFB300', '#FF8F00'],
    secondary: ['#2196F3', '#1976D2', '#1565C0'],
    forbidden: ['#000000', '#FF0000', '#00FF00', '#0000FF'],
  },
  typography: {
    displayFonts: ['poppins'],
    bodyFonts: ['inter'],
    forbiddenFonts: ['arial', 'helvetica', 'times new roman', 'georgia'],
  },
  constraints: {
    required: ['brand yellow', 'brand blue', 'no emojis', 'no pure black', 'avoid'],
    forbidden: ['custom cursor', 'neon', 'gradient text', 'overlapping'],
  },
}

const includesAny = (text: string, terms: string[]) =>
  terms.some((term) => text.includes(term.replace('#', '').toLowerCase()))

// Words that, when they appear just before a term, mean the prompt is telling
// the AI to AVOID it (e.g. "no neon", "avoid pure black") — not using it.
const NEGATORS = ['no ', 'non-', 'avoid', 'without', 'never', 'not ', "n't"]

/**
 * True only if a forbidden term appears at least once WITHOUT a nearby negation.
 * Prevents anti-value instructions ("no neon", "no pure black") from being
 * mis-scored as violations.
 */
const usedPositively = (text: string, terms: string[]) =>
  terms.some((term) => {
    const t = term.replace('#', '').toLowerCase()
    let idx = text.indexOf(t)
    while (idx !== -1) {
      const prefix = text.slice(Math.max(0, idx - 14), idx)
      if (!NEGATORS.some((n) => prefix.includes(n))) return true
      idx = text.indexOf(t, idx + t.length)
    }
    return false
  })

export function validate(promptText: string): ValidationResult {
  const issues: ValidationIssue[] = []
  const suggestions: string[] = []
  const strengths: string[] = []
  const text = promptText.toLowerCase()

  // Color
  const hasBrandColors =
    includesAny(text, brandRules.colors.primary) ||
    includesAny(text, brandRules.colors.secondary)
  if (!hasBrandColors) {
    issues.push({
      type: 'color',
      severity: 'warning',
      message: 'No brand colors specified',
      suggestion: 'Include Brand Yellow (#FFC107) or Brand Blue (#2196F3).',
    })
  } else {
    strengths.push('Brand colors specified')
  }
  if (usedPositively(text, brandRules.colors.forbidden)) {
    issues.push({
      type: 'color',
      severity: 'error',
      message: 'Forbidden color detected',
      suggestion: 'Avoid pure black (#000000) — use Charcoal (#333333).',
    })
  }

  // Typography
  if (!includesAny(text, brandRules.typography.displayFonts)) {
    issues.push({
      type: 'typography',
      severity: 'info',
      message: 'No display font specified',
      suggestion: 'Use Poppins for display type.',
    })
  } else {
    strengths.push('Display font specified')
  }
  if (includesAny(text, brandRules.typography.forbiddenFonts)) {
    issues.push({
      type: 'typography',
      severity: 'warning',
      message: 'Generic font detected',
      suggestion: 'Avoid system fonts — use Poppins/Inter.',
    })
  }

  // Constraints
  if (!includesAny(text, brandRules.constraints.required)) {
    issues.push({
      type: 'constraint',
      severity: 'warning',
      message: 'Brand constraints not specified',
      suggestion: 'Include anti-values such as "no emojis", "no pure black".',
    })
  } else {
    strengths.push('Brand constraints specified')
  }
  if (usedPositively(text, brandRules.constraints.forbidden)) {
    issues.push({
      type: 'constraint',
      severity: 'error',
      message: 'Forbidden elements detected',
      suggestion: 'Remove neon, gradient text, or overlapping elements.',
    })
  }

  const errorCount = issues.filter((i) => i.severity === 'error').length
  const warningCount = issues.filter((i) => i.severity === 'warning').length
  const infoCount = issues.filter((i) => i.severity === 'info').length

  const score = Math.max(
    0,
    100 - errorCount * 20 - warningCount * 10 - infoCount * 5,
  )

  let compliance: Compliance
  if (score >= 90) compliance = 'excellent'
  else if (score >= 75) compliance = 'good'
  else if (score >= 60) compliance = 'fair'
  else compliance = 'poor'

  if (score < 80) {
    suggestions.push('Add brand colors, typography, and explicit anti-values.')
  }
  if (errorCount > 0) {
    suggestions.push('Fix critical issues before using this prompt.')
  }

  return { score, compliance, issues, suggestions, strengths }
}
