import { useRef, type FunctionComponent } from 'react'

import { useFrame, useLoader } from '@react-three/fiber'
import { SRGBColorSpace, TextureLoader, type Group, type Mesh } from 'three'

import { useClock } from '@/scene/Clock'
import { useFocusTarget } from '@/scene/Focus'
import { Name } from '@/scene/Name'
import { Ring } from '@/scene/Ring'

import { heliocentric, toSceneUnit, URANUS } from '@/astronomy'

const radius = toSceneUnit(URANUS.radius)
const rotation = (Math.PI * 2) / URANUS.rotation
const obliquity = (URANUS.obliquity * Math.PI) / 180

export const Uranus: FunctionComponent = () => {
  const { time } = useClock()

  const mesh = useRef<Mesh>(null)

  const group = useRef<Group>(null)

  const texture = useLoader(TextureLoader, '/image/uranus/uranus.jpg')

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = rotation * time.current
    }

    if (group.current) {
      const [x, y, z] = heliocentric(URANUS, time.current)

      group.current.position.set(toSceneUnit(x), toSceneUnit(y), toSceneUnit(z))
    }
  })

  useFocusTarget('uranus', group, radius, toSceneUnit(URANUS.ring.out))

  const [x, y, z] = heliocentric(URANUS, time.current)

  const position: [number, number, number] = [toSceneUnit(x), toSceneUnit(y), toSceneUnit(z)]

  return (
    <group
      ref={group}
      position={position}
      rotation={[obliquity, 0, 0]}>
      <mesh ref={mesh}>
        <sphereGeometry args={[radius, 96, 64]} />
        <meshStandardMaterial
          metalness={0}
          roughness={0.8}>
          <primitive
            attach='map'
            object={texture}
            anisotropy={8}
            colorSpace={SRGBColorSpace}
          />
        </meshStandardMaterial>
      </mesh>
      <Ring
        list={URANUS.ring.list}
        radius={URANUS.ring.radius}
      />
      <group rotation={[-obliquity, 0, 0]}>
        <Name
          id='uranus'
          name={URANUS.name}
          radius={radius}
        />
      </group>
    </group>
  )
}
