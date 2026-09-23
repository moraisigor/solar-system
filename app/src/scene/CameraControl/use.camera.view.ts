import { useEffect, useMemo, useRef } from 'react'

import { useFrame, useThree } from '@react-three/fiber'
import type { PerspectiveCamera } from 'three'
import type { OrbitControls } from 'three/examples/jsm/Addons.js'

import { STAGE } from '@/scene/constant'

import type { ID } from '@/type'

import { CameraView } from './camera.view'

import { useFocus } from '../Focus'

export const useCameraView = (control: OrbitControls) => {
  const cam = useThree((state) => state.camera as PerspectiveCamera)

  const { current, get, focus } = useFocus()

  const prev = useRef<ID | null>(current)

  const camera = useMemo(() => new CameraView(cam, control, get, focus), [cam, control, get, focus])

  useEffect(() => {
    if (prev.current === current) return
    prev.current = current

    camera.start(current)
  }, [current, camera])

  useFrame((_, time) => camera.frame(current, time), STAGE.CAMERA)

  return camera
}
