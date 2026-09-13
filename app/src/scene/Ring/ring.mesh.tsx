import { useEffect, useMemo, type FunctionComponent } from 'react'

import { DoubleSide, RingGeometry, type Texture } from 'three'

import { toSceneUnit } from '@/astronomy'

const create = (inn: number, out: number): RingGeometry => {
  const geometry = new RingGeometry(inn, out, 192, 24)

  const element = geometry.getAttribute('uv')
  const position = geometry.getAttribute('position')

  const span = out - inn

  for (const i of Array.from({ length: position.count }).keys()) {
    const radius = Math.hypot(position.array[i * 3] ?? 0, position.array[i * 3 + 1] ?? 0)

    element.setXY(i, (radius - inn) / span, 0.5)
  }

  element.needsUpdate = true

  return geometry
}

type RingMeshProps = {
  radius: {
    in: number
    out: number
  }
  alpha?: Texture
  texture: Texture
}

export const RingMesh: FunctionComponent<RingMeshProps> = ({ radius, alpha, texture }) => {
  const inn = toSceneUnit(radius.in)
  const out = toSceneUnit(radius.out)

  const geometry = useMemo(() => create(inn, out), [inn, out])

  useEffect(() => {
    return () => geometry.dispose()
  }, [geometry])

  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        transparent
        map={texture}
        side={DoubleSide}
        metalness={0}
        roughness={0.95}
        alphaMap={alpha}
        depthWrite={false}
      />
    </mesh>
  )
}
