import type { FunctionComponent } from 'react'

import { SolarSystem } from '@/scene/SolarSystem'

export const App: FunctionComponent = () => {
  return (
    <div class='main'>
      <SolarSystem />
    </div>
  )
}

export default App
