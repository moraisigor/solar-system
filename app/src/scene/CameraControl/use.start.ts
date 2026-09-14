import { useEffect, useRef } from 'react'

import { useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

import { OVERVIEW } from './overview'
import { useCamera } from './use.camera'
import { useDirection } from './use.direction'
import { useTarget } from './use.target'

import { useFocus, type ID } from '../Focus'

// prettier-ignore
const isZero = (direction: Vector3) => direction.length() < 1E-6

export const useStart = (
  camera: ReturnType<typeof useCamera>,
  target: ReturnType<typeof useTarget>,
  direction: ReturnType<typeof useDirection>,
  control: OrbitControls
) => {
  const cam = useThree((state) => state.camera)

  const { root, origin, current } = useFocus()

  const prev = useRef<ID | null>(current)

  useEffect(() => {
    if (prev.current === current) return
    prev.current = current

    if (root.current) {
      if (origin.current) {
        cam.position.sub(root.current.position)

        root.current.position.set(0, 0, 0)
        origin.current = false

        control.target.sub(root.current.position)
      }
    }

    camera.current.start.copy(cam.position)
    target.current.start.copy(control.target)
    direction.current.direction.copy(cam.position).sub(control.target)

    if (isZero(direction.current.direction)) {
      direction.current.direction.fromArray(OVERVIEW.position)
    }

    direction.current.time = 0
    direction.current.active = true
    direction.current.direction.normalize()

    control.enabled = false
  }, [])
}
