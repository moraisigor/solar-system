import { useEffect, useMemo } from 'react'

import { useThree } from '@react-three/fiber'
import type { Camera, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

import { OVERVIEW } from './overview'

const {
  distance: { min, max }
} = OVERVIEW

const create = (web: WebGLRenderer, camera: Camera) => {
  const control = new OrbitControls(camera, web.domElement)
  control.minDistance = min
  control.maxDistance = max
  control.enableDamping = true
  control.dampingFactor = 0.08

  control.target.set(0, 0, 0)

  control.update()

  return control
}

export const useControl = () => {
  const web = useThree((state) => state.gl)
  const camera = useThree((state) => state.camera)

  const control = useMemo(() => create(web, camera), [web, camera])

  useEffect(() => {
    return () => control.dispose()
  }, [control])

  return control
}
