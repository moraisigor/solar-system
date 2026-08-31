import type { FunctionComponent } from 'react'

import { useLoader } from '@react-three/fiber'
import { EquirectangularReflectionMapping, LinearSRGBColorSpace } from 'three'
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'

export const Universe: FunctionComponent = () => {
  const texture = useLoader(EXRLoader, '/image/universe.exr')

  return (
    <primitive
      attach='background'
      object={texture}
      mapping={EquirectangularReflectionMapping}
      colorSpace={LinearSRGBColorSpace}
    />
  )
}
