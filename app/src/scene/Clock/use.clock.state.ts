import { useMemo, useRef } from 'react'

import type { ClockState } from './clock.provider'

const DAY = 86_400_000

const EPOCH = Date.UTC(2000, 0, 1, 12, 0, 0)

const START = (Date.now() - EPOCH) / DAY

export const useClockState = (): ClockState => {
  const time = useRef<number>(START)

  return useMemo(() => ({ time }), [])
}
