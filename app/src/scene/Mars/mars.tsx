import { useRef, type FunctionComponent } from 'react'

import { useFrame, useLoader } from '@react-three/fiber'
import { SRGBColorSpace, TextureLoader, type Group, type Mesh } from 'three'

import { useClock } from '@/scene/Clock'
import { useFocusTarget } from '@/scene/Focus'
import { Name } from '@/scene/Name'

import { heliocentric, MARS, toSceneUnit } from '@/astronomy'
import type { Vec } from '@/astronomy/kepler'

const radius = toSceneUnit(MARS.radius)
const rotation = (Math.PI * 2) / MARS.rotation
const obliquity = (MARS.obliquity * Math.PI) / 180

export const Mars: FunctionComponent = () => {
  const { time } = useClock()

  const mesh = useRef<Mesh>(null)

  const group = useRef<Group>(null)

  const texture = useLoader(TextureLoader, '/image/mars/mars.jpg')

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = rotation * time.current
    }

    if (group.current) {
      const [x, y, z] = heliocentric(MARS, time.current)

      group.current.position.set(toSceneUnit(x), toSceneUnit(y), toSceneUnit(z))
    }
  })

  useFocusTarget('mars', group, radius)

  const [x, y, z] = heliocentric(MARS, time.current)

  const position: Vec = [toSceneUnit(x), toSceneUnit(y), toSceneUnit(z)]

  return (
    <group
      ref={group}
      position={position}
      rotation={[obliquity, 0, 0]}>
      <mesh ref={mesh}>
        <sphereGeometry args={[radius, 96, 64]} />
        <meshStandardMaterial
          metalness={0}
          roughness={0.95}>
          <primitive
            attach='map'
            object={texture}
            anisotropy={8}
            colorSpace={SRGBColorSpace}
          />
        </meshStandardMaterial>
      </mesh>
      <group rotation={[-obliquity, 0, 0]}>
        <Name
          id='mars'
          name={MARS.name}
          radius={radius}
        />
      </group>
    </group>
  )
}
