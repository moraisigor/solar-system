import type { FunctionComponent } from 'react'

import { useFrame } from '@react-three/fiber'

import { STAGE } from '@/scene/constant'

import { Light } from './light'
import { useCameraView } from './use.camera.view'
import { useControl } from './use.control'

export const CameraControl: FunctionComponent = () => {
  const control = useControl()

  const camera = useCameraView(control)

  useFrame(({ gl: web, scene, camera: cam }) => web.render(scene, cam), STAGE.DRAW)

  return <Light camera={camera} />
}
