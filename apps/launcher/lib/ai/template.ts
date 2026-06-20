// {{variable}} substitution for prompt templates.

const VARIABLE_PATTERN = /\{\{\s*([a-zA-Z_][\w]*)\s*\}\}/g

export function extractVariableNames(template: string): string[] {
  const names = new Set<string>()
  for (const match of template.matchAll(VARIABLE_PATTERN)) {
    const name = match[1]
    if (name) names.add(name)
  }
  return [...names]
}

export function applyTemplate(template: string, variables: Record<string, string>): string {
  return template.replace(VARIABLE_PATTERN, (_full, key: string) => {
    const value = variables[key]
    return value !== undefined && value !== '' ? value : `{{${key}}}`
  })
}
