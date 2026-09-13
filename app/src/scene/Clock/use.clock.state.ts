import { useMemo, useRef } from 'react'

import type { ClockState } from './clock.provider'

export const useClockState = (): ClockState => {
  const value = (Date.now() - Date.UTC(2000, 0, 1, 12, 0, 0)) / 86_400_000

  const time = useRef(value)

  return useMemo(() => ({ time }), [])
}
