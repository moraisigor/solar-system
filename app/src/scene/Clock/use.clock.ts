import { useContext } from 'react'

import { ClockContext } from './clock.provider'

export const useClock = () => {
  const context = useContext(ClockContext)

  if (context) {
    return context
  }

  throw new Error('the clock provider is not found')
}
