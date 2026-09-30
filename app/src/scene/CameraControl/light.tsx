import { Fragment, useMemo, useRef, type FunctionComponent } from 'react'

import { useFrame } from '@react-three/fiber'
import { Vector3, type AmbientLight, type DirectionalLight } from 'three'

import { STAGE } from '@/scene/constant'

import type { ID } from '@/type'

import { SUN_LIGHT_COLOR } from '@/astronomy'

import type { CameraView } from './camera.view'

import { useFocus } from '../Focus'

export type LightProps = {
  camera: CameraView
}

const DIM = 0.1
const INTENSITY = Math.PI

const force = (id: ID | null, opacity: number) => {
  if (id) {
    if (id === 'sun') return 0

    return 1 - opacity
  }

  return 0
}

export const Light: FunctionComponent<LightProps> = ({ camera }) => {
  const { current, opacity } = useFocus()

  const drawn = useRef({
    intensity: -1
  })

  const subject = useRef<ID | null>(null)

  const ambient = useRef<AmbientLight | null>(null)
  const direction = useRef<DirectionalLight | null>(null)

  const position = useMemo(() => new Vector3(), [])

  useFrame(({ camera: cam }) => {
    if (ambient.current === null) return
    if (direction.current === null) return

    if (current) subject.current = current

    const intensity = force(subject.current, opacity.current)

    if (intensity > 0) {
      direction.current.position.copy(cam.position)

      const { object } = camera

      if (object) {
        direction.current.target.position.copy(object.getWorldPosition(position))

        direction.current.target.updateMatrixWorld()
      }
    }

    if (intensity === drawn.current.intensity) return
    drawn.current.intensity = intensity

    ambient.current.intensity = INTENSITY * intensity
    direction.current.intensity = DIM + (INTENSITY - DIM) * intensity
  }, STAGE.LIGHT)

  return (
    <Fragment>
      <ambientLight
        ref={ambient}
        color={SUN_LIGHT_COLOR}
      />
      <directionalLight
        ref={direction}
        color={SUN_LIGHT_COLOR}
      />
    </Fragment>
  )
}
