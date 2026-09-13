import { useContext } from 'react'

import { FocusContext } from './focus.provider'

export const useFocus = () => {
  const context = useContext(FocusContext)

  if (context) {
    return context
  }

  throw new Error('the focus provider is not found')
}
