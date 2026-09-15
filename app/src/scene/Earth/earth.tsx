import { useRef, type FunctionComponent } from 'react'

import { useFrame, useLoader } from '@react-three/fiber'
import { SRGBColorSpace, TextureLoader, type Group, type Mesh } from 'three'

import { useClock } from '@/scene/Clock'
import { useFocusTarget } from '@/scene/Focus'
import { Name } from '@/scene/Name'

import { EARTH, heliocentric, toSceneUnit } from '@/astronomy'

const radius = toSceneUnit(EARTH.radius)
const rotation = (Math.PI * 2) / EARTH.rotation
const obliquity = (EARTH.obliquity * Math.PI) / 180

export const Earth: FunctionComponent = () => {
  const { time } = useClock()

  const mesh = useRef<Mesh>(null)

  const group = useRef<Group>(null)

  const texture = useLoader(TextureLoader, '/image/earth/earth.jpg')

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = rotation * time.current
    }

    if (group.current) {
      const [x, y, z] = heliocentric(EARTH, time.current)

      group.current.position.set(toSceneUnit(x), toSceneUnit(y), toSceneUnit(z))
    }
  })

  useFocusTarget('earth', group, { value: radius })

  return (
    <group
      ref={group}
      rotation={[obliquity, 0, 0]}>
      <mesh ref={mesh}>
        <sphereGeometry args={[radius, 96, 64]} />
        <meshStandardMaterial
          metalness={0}
          roughness={0.85}>
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
          id='earth'
          name={EARTH.name}
          radius={radius}
        />
      </group>
    </group>
  )
}
