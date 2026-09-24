import { useEffect, useMemo, type FunctionComponent } from 'react'

import { useFrame, useThree } from '@react-three/fiber'
import { CSS2DRenderer } from 'three/examples/jsm/Addons.js'

import { STAGE } from '@/scene/constant'

import { useFade } from '../Focus'

export const NameLayer: FunctionComponent = () => {
  const web = useThree((state) => state.gl)
  const size = useThree((state) => state.size)

  const render = useMemo(() => {
    const render = new CSS2DRenderer()

    const element = render.domElement
    element.style.inset = '0px'
    element.style.position = 'absolute'
    element.style.pointerEvents = 'none'

    return render
  }, [])

  useFade()

  useEffect(() => render.setSize(size.width, size.height), [size, render])

  useEffect(() => {
    const element = render.domElement

    web.domElement.parentElement?.appendChild(element)

    return () => element.remove()
  }, [])

  useFrame(({ scene, camera }) => render.render(scene, camera), STAGE.LABEL)

  return null
}
