import { useContext } from 'react'

import { HoverContext } from './hover.provider'

export const useHover = () => {
  const context = useContext(HoverContext)

  if (context) {
    return context
  }

  throw new Error('the hover provider is not found')
}
