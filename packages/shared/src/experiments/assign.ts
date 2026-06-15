const EXPERIMENT_STORAGE_PREFIX = 'mb-exp-'

function experimentStorageKey(experimentId: string): string {
  return `${EXPERIMENT_STORAGE_PREFIX}${experimentId}`
}

function pickWeightedVariant<V extends string>(
  variants: readonly V[],
  weights?: readonly number[],
): V {
  if (!weights || weights.length !== variants.length) {
    const index = Math.floor(Math.random() * variants.length)
    return variants[index] ?? variants[0]
  }

  const total = weights.reduce((sum, weight) => sum + weight, 0)
  let roll = Math.random() * total

  for (let index = 0; index < variants.length; index += 1) {
    roll -= weights[index] ?? 0
    if (roll <= 0) {
      return variants[index] ?? variants[0]
    }
  }

  return variants[variants.length - 1] ?? variants[0]
}

export function getOrAssignVariant<V extends string>(
  experimentId: string,
  variants: readonly V[],
  weights?: readonly number[],
): V {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(experimentStorageKey(experimentId))
    if (stored && (variants as readonly string[]).includes(stored)) {
      return stored as V
    }
  }

  const variant = pickWeightedVariant(variants, weights)

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(experimentStorageKey(experimentId), variant)
    } catch {
      // Storage may be unavailable in private mode or when quota is exceeded.
    }
  }

  return variant
}
