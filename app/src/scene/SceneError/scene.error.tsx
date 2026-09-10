import { Suspense, type ReactNode } from 'react'

import { Error } from './error'

type SceneErrorProps = {
  children: ReactNode
}

export const SceneError = ({ children }: SceneErrorProps) => {
  return (
    <Error>
      <Suspense fallback={null}>{children}</Suspense>
    </Error>
  )
}
