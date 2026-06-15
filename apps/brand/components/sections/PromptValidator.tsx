'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, Eye, Zap, Palette, Type, Layout, Info } from 'lucide-react'

interface PromptValidatorProps {
  prompt: string
}

interface ValidationResult {
  score: number
  compliance: 'excellent' | 'good' | 'fair' | 'poor'
  issues: ValidationIssue[]
  suggestions: string[]
  strengths: string[]
}

interface ValidationIssue {
  type: 'color' | 'typography' | 'layout' | 'component' | 'constraint'
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion: string
}

export const PromptValidator = ({ prompt }: PromptValidatorProps) => {
  const [validation, setValidation] = useState<ValidationResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const brandRules = {
    colors: {
      primary: ['#FFC107', '#FFB300', '#FF8F00'],
      secondary: ['#2196F3', '#1976D2', '#1565C0'],
      text: ['#333333', '#0D0F12'],
      background: ['#FAFAFA', '#FFFFFF'],
      forbidden: ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF']
    },
    typography: {
      displayFonts: ['Poppins', 'poppins'],
      bodyFonts: ['Inter', 'inter'],
      codeFonts: ['JetBrains Mono', 'jetbrains mono', 'monaco', 'consolas'],
      maxLineLength: 65,
      forbiddenFonts: ['arial', 'helvetica', 'times new roman', 'georgia']
    },
    layout: {
      preferred: ['css grid', 'grid layout', 'asymmetric', 'offset'],
      forbidden: ['flexbox only', 'centered layout', '3 column', 'nested cards'],
      spacing: ['8px', '16px', '24px', '32px']
    },
    components: {
      buttons: ['rounded', 'tactile', 'primary button', 'secondary button'],
      cards: ['rounded corners', 'soft border', 'diffused shadow'],
      navigation: ['sidebar', 'navigation', 'menu']
    },
    constraints: {
      required: ['brand yellow', 'brand blue', 'no emojis', 'no pure black'],
      forbidden: ['custom cursor', 'neon', 'gradient text', 'overlapping']
    }
  }

  const analyzePrompt = (promptText: string): ValidationResult => {
    const issues: ValidationIssue[] = []
    const suggestions: string[] = []
    const strengths: string[] = []

    // Normalize prompt for analysis
    const normalizedPrompt = promptText.toLowerCase()

    // Color Analysis
    const hasBrandColors = brandRules.colors.primary.some(color => 
      normalizedPrompt.includes(color.replace('#', '')) || 
      normalizedPrompt.includes(color.toLowerCase())
    ) || brandRules.colors.secondary.some(color => 
      normalizedPrompt.includes(color.replace('#', '')) || 
      normalizedPrompt.includes(color.toLowerCase())
    )

    if (!hasBrandColors) {
      issues.push({
        type: 'color',
        severity: 'warning',
        message: 'No brand colors specified',
        suggestion: 'Include Brand Yellow (#FFC107) for primary CTAs and Brand Blue (#2196F3) for secondary actions'
      })
    } else {
      strengths.push('Brand colors specified')
    }

    // Check for forbidden colors
    const hasForbiddenColors = brandRules.colors.forbidden.some(color => 
      normalizedPrompt.includes(color.replace('#', ''))
    )
    if (hasForbiddenColors) {
      issues.push({
        type: 'color',
        severity: 'error',
        message: 'Forbidden color detected',
        suggestion: 'Avoid pure black (#000000) - use Charcoal (#333333) instead'
      })
    }

    // Typography Analysis
    const hasDisplayFont = brandRules.typography.displayFonts.some(font => 
      normalizedPrompt.includes(font)
    )
    const hasBodyFont = brandRules.typography.bodyFonts.some(font => 
      normalizedPrompt.includes(font)
    )

    if (!hasDisplayFont) {
      issues.push({
        type: 'typography',
        severity: 'warning',
        message: 'No display font specified',
        suggestion: 'Use Poppins Bold for headlines (32-48px)'
      })
    } else {
      strengths.push('Display font specified')
    }

    if (!hasBodyFont) {
      issues.push({
        type: 'typography',
        severity: 'warning',
        message: 'No body font specified',
        suggestion: 'Use Inter Regular for body text (13-14px)'
      })
    }

    // Check for forbidden fonts
    const hasForbiddenFonts = brandRules.typography.forbiddenFonts.some(font => 
      normalizedPrompt.includes(font)
    )
    if (hasForbiddenFonts) {
      issues.push({
        type: 'typography',
        severity: 'warning',
        message: 'Generic font detected',
        suggestion: 'Avoid system fonts - use Poppins/Inter for premium contexts'
      })
    }

    // Layout Analysis
    const hasPreferredLayout = brandRules.layout.preferred.some(term => 
      normalizedPrompt.includes(term)
    )
    const hasForbiddenLayout = brandRules.layout.forbidden.some(term => 
      normalizedPrompt.includes(term)
    )

    if (!hasPreferredLayout) {
      issues.push({
        type: 'layout',
        severity: 'info',
        message: 'Layout preference not specified',
        suggestion: 'Consider asymmetric layouts or CSS Grid for better structure'
      })
    } else {
      strengths.push('Layout preference specified')
    }

    if (hasForbiddenLayout) {
      issues.push({
        type: 'layout',
        severity: 'error',
        message: 'Forbidden layout pattern detected',
        suggestion: 'Avoid centered layouts or nested cards - use asymmetric designs'
      })
    }

    // Component Analysis
    const hasComponents = brandRules.components.buttons.some(term => 
      normalizedPrompt.includes(term)
    ) || brandRules.components.cards.some(term => 
      normalizedPrompt.includes(term)
    )

    if (!hasComponents) {
      issues.push({
        type: 'component',
        severity: 'info',
        message: 'Component standards not specified',
        suggestion: 'Include button styling (rounded 12px, tactile interaction) or card styling'
      })
    } else {
      strengths.push('Component standards specified')
    }

    // Constraint Analysis
    const hasRequiredConstraints = brandRules.constraints.required.some(term => 
      normalizedPrompt.includes(term)
    )
    const hasForbiddenConstraints = brandRules.constraints.forbidden.some(term => 
      normalizedPrompt.includes(term)
    )

    if (!hasRequiredConstraints) {
      issues.push({
        type: 'constraint',
        severity: 'warning',
        message: 'Brand constraints not specified',
        suggestion: 'Include constraints like "no emojis", "no pure black", "WCAG compliance"'
      })
    }

    if (hasForbiddenConstraints) {
      issues.push({
        type: 'constraint',
        severity: 'error',
        message: 'Forbidden elements detected',
        suggestion: 'Avoid custom cursors, neon effects, or overlapping elements'
      })
    }

    // Calculate score
    const errorCount = issues.filter(i => i.severity === 'error').length
    const warningCount = issues.filter(i => i.severity === 'warning').length
    const infoCount = issues.filter(i => i.severity === 'info').length

    const score = Math.max(0, 100 - (errorCount * 20) - (warningCount * 10) - (infoCount * 5))

    let compliance: 'excellent' | 'good' | 'fair' | 'poor'
    if (score >= 90) compliance = 'excellent'
    else if (score >= 75) compliance = 'good'
    else if (score >= 60) compliance = 'fair'
    else compliance = 'poor'

    // Add general suggestions
    if (score < 80) {
      suggestions.push('Consider adding specific brand colors, typography standards, and layout constraints')
    }
    if (errorCount > 0) {
      suggestions.push('Fix critical issues before using this prompt for generation')
    }

    return {
      score,
      compliance,
      issues,
      suggestions,
      strengths
    }
  }

  useEffect(() => {
    if (prompt.trim()) {
      setIsAnalyzing(true)
      // Simulate analysis delay for better UX
      setTimeout(() => {
        const result = analyzePrompt(prompt)
        setValidation(result)
        setIsAnalyzing(false)
      }, 1500)
    } else {
      setValidation(null)
    }
    // Debounced analysis is keyed on prompt text only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt])

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#16A34A]'
    if (score >= 75) return 'text-[#2196F3]'
    if (score >= 60) return 'text-[#CA8A04]'
    return 'text-[#DC2626]'
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-[#16A34A]/[0.1] border-[#16A34A]'
    if (score >= 75) return 'bg-[#2196F3]/[0.1] border-[#2196F3]'
    if (score >= 60) return 'bg-[#CA8A04]/[0.1] border-[#CA8A04]'
    return 'bg-[#DC2626]/[0.1] border-[#DC2626]'
  }

  const renderIssue = (issue: ValidationIssue) => {
    const IconComponent = issue.severity === 'error' ? AlertCircle : 
                         issue.severity === 'warning' ? AlertCircle : Info
    const color = issue.severity === 'error' ? 'text-[#DC2626]' : 
                  issue.severity === 'warning' ? 'text-[#CA8A04]' : 'text-[#2196F3]'
    const bg = issue.severity === 'error' ? 'bg-[#FEF2F2] border-[#FECACA]' :
               issue.severity === 'warning' ? 'bg-[#FFFBEB] border-[#FED7AA]' :
               'bg-[#EFF6FF] border-[#BFDBFE]'

    return (
      <div key={issue.message} className={`p-4 rounded-lg border ${bg}`}>
        <div className="flex items-start gap-3">
          <IconComponent size={16} className={`${color} mt-0.5 flex-shrink-0`} />
          <div className="flex-1">
            <h4 className={`text-[12px] font-semibold ${color} mb-1`}>
              {issue.type.charAt(0).toUpperCase() + issue.type.slice(1)} {issue.severity.toUpperCase()}
            </h4>
            <p className="text-[11px] text-brand-text-muted mb-2">{issue.message}</p>
            <p className="text-[10px] text-[#6B7280]">💡 {issue.suggestion}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!prompt.trim()) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-brand-canvas dark:bg-white/[0.04] rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye size={24} className="text-brand-text-muted" />
        </div>
        <h3 className="text-[16px] font-semibold text-brand-text mb-2">Enter a prompt to validate</h3>
        <p className="text-[14px] text-brand-text-muted">Paste your prompt above to analyze it for MediaBubble brand compliance.</p>
      </div>
    )
  }

  if (isAnalyzing) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-brand-canvas dark:bg-white/[0.04] rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 border-2 border-[#2196F3] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h3 className="text-[16px] font-semibold text-brand-text mb-2">Analyzing prompt...</h3>
        <p className="text-[14px] text-brand-text-muted">Checking for MediaBubble brand compliance and providing recommendations.</p>
      </div>
    )
  }

  if (!validation) return null

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <div className={`bg-[#FFFFFF] border-2 rounded-xl p-6 ${getScoreBg(validation.score)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[16px] font-bold text-brand-text mb-1">Brand Compliance Score</h3>
            <p className="text-[12px] text-brand-text-muted">
              How well this prompt follows MediaBubble brand guidelines
            </p>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(validation.score)}`}>
              {validation.score}%
            </div>
            <div className={`text-[12px] font-medium capitalize ${getScoreColor(validation.score)}`}>
              {validation.compliance}
            </div>
          </div>
        </div>
      </div>

      {/* Issues */}
      {validation.issues.length > 0 && (
        <div>
          <h3 className="text-[14px] font-bold text-brand-text mb-4 flex items-center gap-2">
            <AlertCircle size={16} className="text-[#DC2626]" />
            Issues Found ({validation.issues.length})
          </h3>
          <div className="space-y-3">
            {validation.issues.map(renderIssue)}
          </div>
        </div>
      )}

      {/* Strengths */}
      {validation.strengths.length > 0 && (
        <div>
          <h3 className="text-[14px] font-bold text-brand-text mb-4 flex items-center gap-2">
            <CheckCircle size={16} className="text-[#16A34A]" />
            Brand Strengths ({validation.strengths.length})
          </h3>
          <div className="space-y-2">
            {validation.strengths.map((strength, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 bg-[#F0FDF4] border border-[#86EFAC] rounded-lg">
                <CheckCircle size={12} className="text-[#16A34A] mt-0.5 flex-shrink-0" />
                <span className="text-[11px] text-brand-text">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {validation.suggestions.length > 0 && (
        <div>
          <h3 className="text-[14px] font-bold text-brand-text mb-4 flex items-center gap-2">
            <Info size={16} className="text-[#2196F3]" />
            Improvement Suggestions
          </h3>
          <div className="space-y-2">
            {validation.suggestions.map((suggestion, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg">
                <Info size={12} className="text-[#2196F3] mt-0.5 flex-shrink-0" />
                <span className="text-[11px] text-brand-text">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compliance Summary */}
      <div className="bg-brand-canvas border border-brand-whisper-border dark:border-brand-light-border rounded-xl p-6">
        <h3 className="text-[14px] font-bold text-brand-text mb-3">Brand Compliance Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#16A34A]">
              {validation.issues.filter(i => i.severity === 'error').length === 0 ? '✓' : '✗'}
            </div>
            <div className="text-[10px] text-brand-text-muted">Critical Issues</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#CA8A04]">
              {validation.issues.filter(i => i.severity === 'warning').length}
            </div>
            <div className="text-[10px] text-brand-text-muted">Warnings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#2196F3]">
              {validation.strengths.length}
            </div>
            <div className="text-[10px] text-brand-text-muted">Strengths</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#6B7280]">
              {validation.compliance.toUpperCase()}
            </div>
            <div className="text-[10px] text-brand-text-muted">Overall</div>
          </div>
        </div>
      </div>
    </div>
  )
}