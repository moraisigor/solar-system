import { useContext, useMemo, useRef } from 'react'

import { ClockContext, type ClockState } from './clock.provider'

export const useClock = () => {
  const context = useContext(ClockContext)

  if (context) {
    return context
  }

  throw new Error('the clock provider is not found')
}

export const useClockState = (): ClockState => {
  const value = (Date.now() - Date.UTC(2000, 0, 1, 12, 0, 0)) / 86_400_000

  const time = useRef(value)

  return useMemo(() => ({ time }), [])
}
