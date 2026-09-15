import { Suspense, type ReactNode } from 'react'

import { Scene } from './scene'

type SceneErrorProps = {
  children: ReactNode
}

export const SceneError = ({ children }: SceneErrorProps) => {
  return (
    <Scene>
      <Suspense fallback={null}>{children}</Suspense>
    </Scene>
  )
}
