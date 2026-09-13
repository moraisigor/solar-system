import type { FunctionComponent, ReactNode } from 'react'

import { useFocus } from './use.focus'

export const Root: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { root } = useFocus()

  return <group ref={root}>{children}</group>
}
