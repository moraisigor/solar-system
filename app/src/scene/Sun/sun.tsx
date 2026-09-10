import { useRef, type FunctionComponent } from 'react'

import { useFrame, useLoader } from '@react-three/fiber'
import { SRGBColorSpace, TextureLoader, type Group, type Mesh } from 'three'

import { useClock } from '@/scene/Clock'
import { useFocusBody } from '@/scene/Focus'
import { PlanetLabel } from '@/scene/PlanetLabel'

import { SUN_LIGHT_COLOR, SUN_LIGHT_INTENSITY } from '@/astronomy/constant'
import { toScene } from '@/astronomy/kepler'
import { SUN } from '@/astronomy/sun'

const radius = toScene(SUN.radius)
const rotation = (Math.PI * 2) / SUN.rotation
const obliquity = (SUN.obliquity * Math.PI) / 180

export const Sun: FunctionComponent = () => {
  const { time } = useClock()

  const mesh = useRef<Mesh>(null)

  const group = useRef<Group>(null)

  const texture = useLoader(TextureLoader, '/image/sun/sun.jpg')

  useFrame(() => {
    const { current } = mesh

    if (current) {
      current.rotation.y = rotation * time.current
    }
  })

  useFocusBody('sun', group, SUN.radius)

  return (
    <group
      ref={group}
      rotation={[obliquity, 0, 0]}>
      <mesh ref={mesh}>
        <sphereGeometry args={[radius, 96, 64]} />
        <meshBasicMaterial toneMapped={false}>
          <primitive
            attach='map'
            object={texture}
            anisotropy={8}
            colorSpace={SRGBColorSpace}
          />
        </meshBasicMaterial>
      </mesh>
      <pointLight
        decay={2}
        color={SUN_LIGHT_COLOR}
        intensity={SUN_LIGHT_INTENSITY}
      />
      <group rotation={[-obliquity, 0, 0]}>
        <PlanetLabel
          id='sun'
          name={SUN.name}
          radius={radius}
        />
      </group>
    </group>
  )
}
