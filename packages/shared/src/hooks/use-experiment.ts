'use client'

import { useEffect, useState } from 'react'
import { getOrAssignVariant } from '../experiments/assign'
import {
  EXPERIMENTS,
  type ExperimentKey,
  type ExperimentVariant,
} from '../experiments/config'
import { trackExperimentExposure } from '../ga4-events'

export function useExperiment<K extends ExperimentKey>(
  key: K,
): ExperimentVariant<K> {
  const definition = EXPERIMENTS[key]
  const [variant, setVariant] = useState<ExperimentVariant<K>>(definition.variants[0])

  useEffect(() => {
    const assigned = getOrAssignVariant(
      definition.id,
      definition.variants,
      definition.weights,
    )
    setVariant(assigned)
    trackExperimentExposure(definition.id, assigned)
  }, [definition.id])

  return variant
}
