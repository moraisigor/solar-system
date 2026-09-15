import { useRef, type FunctionComponent } from 'react'

import { useFrame, useLoader } from '@react-three/fiber'
import { SRGBColorSpace, TextureLoader, type Group, type Mesh } from 'three'

import { useClock } from '@/scene/Clock'
import { useFocusTarget } from '@/scene/Focus'
import { Name } from '@/scene/Name'
import { RingImage } from '@/scene/Ring'

import { heliocentric, SATURN, toSceneUnit } from '@/astronomy'

const radius = toSceneUnit(SATURN.radius)
const rotation = (Math.PI * 2) / SATURN.rotation
const obliquity = (SATURN.obliquity * Math.PI) / 180

export const Saturn: FunctionComponent = () => {
  const { time } = useClock()

  const mesh = useRef<Mesh>(null)

  const group = useRef<Group>(null)

  const [ring, texture] = useLoader(TextureLoader, ['/image/saturn/ring.png', '/image/saturn/saturn.jpg'])

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = rotation * time.current
    }

    if (group.current) {
      const [x, y, z] = heliocentric(SATURN, time.current)

      group.current.position.set(toSceneUnit(x), toSceneUnit(y), toSceneUnit(z))
    }
  })

  useFocusTarget('saturn', group, { value: radius, min: toSceneUnit(SATURN.ring.radius.out) })

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
      <RingImage
        radius={SATURN.ring.radius}
        texture={ring}
      />
      <group rotation={[-obliquity, 0, 0]}>
        <Name
          id='saturn'
          name={SATURN.name}
          radius={radius}
        />
      </group>
    </group>
  )
}
