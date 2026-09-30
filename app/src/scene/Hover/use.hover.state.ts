import { useCallback, useMemo, useRef } from 'react'

import type { ID } from '@/type'

import type { HoverState } from './hover.provider'

export const useHoverState = (): HoverState => {
  const value = useRef<ID | null>(null)

  const hover = useCallback((id: ID | null) => {
    value.current = id
  }, [])

  return useMemo(() => ({ id: value, hover }), [value, hover])
}
