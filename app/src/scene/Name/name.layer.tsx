import { useEffect, useMemo, type FunctionComponent } from 'react'

import { useFrame, useThree } from '@react-three/fiber'
import { CSS2DRenderer } from 'three/examples/jsm/Addons.js'

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

  useFrame(({ scene, camera }) => render.render(scene, camera), 1)

  useEffect(() => render.setSize(size.width, size.height), [size, render])

  useEffect(() => {
    const element = render.domElement

    web.domElement.parentElement?.appendChild(element)

    return () => element.remove()
  }, [])

  return null
}
