import type { FunctionComponent } from 'react'

import { useLoader } from '@react-three/fiber'
import { EquirectangularReflectionMapping, SRGBColorSpace, TextureLoader } from 'three'

export const Universe: FunctionComponent = () => {
  const texture = useLoader(TextureLoader, '/image/universe/universe.webp')

  return (
    <primitive
      attach='background'
      object={texture}
      mapping={EquirectangularReflectionMapping}
      flipY={false}
      colorSpace={SRGBColorSpace}
    />
  )
}
