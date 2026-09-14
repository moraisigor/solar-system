import { useEffect, useRef } from 'react'

import { useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

import { OVERVIEW } from './overview'
import { useCamera } from './use.camera'
import { useNavigate } from './use.navigate'
import { useTarget } from './use.target'

import { useFocus, type ID } from '../Focus'

// prettier-ignore
const isZero = (direction: Vector3) => direction.length() < 1E-6

export const useStart = (
  camera: ReturnType<typeof useCamera>,
  target: ReturnType<typeof useTarget>,
  navigate: ReturnType<typeof useNavigate>,
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
    navigate.current.direction.copy(cam.position).sub(control.target)

    if (isZero(navigate.current.direction)) {
      navigate.current.direction.fromArray(OVERVIEW.position)
    }

    navigate.current.time = 0
    navigate.current.active = true
    navigate.current.direction.normalize()

    control.enabled = false
  }, [])
}
