import { useEffect, type FunctionComponent } from 'react'

import { SRGBColorSpace, type Texture } from 'three'

import { RingMesh } from './ring.mesh'

type RingImageProps = {
  radius: {
    in: number
    out: number
  }
  texture: Texture
}

export const RingImage: FunctionComponent<RingImageProps> = ({ radius, texture }) => {
  useEffect(() => {
    texture.anisotropy = 8
    texture.colorSpace = SRGBColorSpace
  }, [texture])

  return (
    <RingMesh
      radius={radius}
      alpha={texture}
      texture={texture}
    />
  )
}
