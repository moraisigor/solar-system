import { Fragment, useMemo, useRef, type FunctionComponent } from 'react'

import { useFrame } from '@react-three/fiber'
import { Vector3, type AmbientLight, type DirectionalLight } from 'three'

import { STAGE } from '@/scene/constant'

import { SUN_LIGHT_COLOR } from '@/astronomy'

import type { CameraView } from './camera.view'

import { useFocus, type ID } from '../Focus'

export type LightProps = {
  camera: CameraView
}

const DIM = 0.1
const INTENSITY = Math.PI

const get = (prev: ID | null, opacity: number) => {
  if (prev) {
    if (prev === 'sun') return 0

    return 1 - opacity
  }

  return 0
}

export const Light: FunctionComponent<LightProps> = ({ camera }) => {
  const { current, opacity } = useFocus()

  const prev = useRef<ID | null>(null)

  const progress = useRef<number>(-1)

  const ambient = useRef<AmbientLight | null>(null)

  const direction = useRef<DirectionalLight | null>(null)

  const position = useMemo(() => new Vector3(), [])

  useFrame(({ camera: cam }) => {
    if (ambient.current === null) return
    if (direction.current === null) return

    if (current) {
      prev.current = current
    }

    const intensity = get(prev.current, opacity.current)

    if (intensity > 0) {
      direction.current.position.copy(cam.position)

      const { object } = camera

      if (object) {
        direction.current.target.position.copy(object.getWorldPosition(position))

        direction.current.target.updateMatrixWorld()
      }
    }

    if (progress.current === intensity) return
    progress.current = intensity

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
