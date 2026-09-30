import { useCallback, useMemo, useRef } from 'react'

import type { ID } from '@/type'

import type { HoverState } from './hover.provider'

export const useHoverState = (): HoverState => {
  const current = useRef<ID | null>(null)

  const hover = useCallback((id: ID | null) => current.current = id, [])

  return useMemo(() => ({ current, hover }), [current, hover])
}
