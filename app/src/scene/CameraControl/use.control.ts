import { useEffect, useMemo } from 'react'

import { useThree } from '@react-three/fiber'
import type { Camera } from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

import { OVERVIEW } from './overview'

const create = (camera: Camera) => {
  const control = new OrbitControls(camera)

  control.minDistance = OVERVIEW.distance.min
  control.maxDistance = OVERVIEW.distance.max

  control.enableDamping = true
  control.dampingFactor = 0.08

  return control
}

export const useControl = () => {
  const web = useThree((state) => state.gl)
  const camera = useThree((state) => state.camera)

  const control = useMemo(() => create(camera), [camera])

  useEffect(() => {
    control.connect(web.domElement)

    return () => control.dispose()
  }, [web, control])

  return control
}
