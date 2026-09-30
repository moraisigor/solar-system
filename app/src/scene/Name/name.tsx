import './name.css'

import { useEffect, useMemo, useRef, type FunctionComponent } from 'react'

import { useFrame } from '@react-three/fiber'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'

import { MIN_OPACITY } from '@/scene/constant'

import type { ID } from '@/type'

import { useFocus } from '../Focus'
import { useHover } from '../Hover'

type NameProps = {
  id: ID
  name: string
  radius: number
}

const HEIGHT = 1.5

export const Name: FunctionComponent<NameProps> = ({ id, name, radius }) => {
  const { hover } = useHover()
  const { opacity, focus } = useFocus()

  const progress = useRef<number>(-1)

  const object = useMemo(() => {
    const element = document.createElement('div')
    element.className = 'name event'
    element.textContent = name

    return new CSS2DObject(element)
  }, [name])

  useEffect(() => {
    return () => object.element.remove()
  }, [object])

  useEffect(() => {
    const onExit = () => hover(null)
    const onEnter = () => hover(id)

    const onClick = (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()

      focus(id)
    }

    const { element } = object

    element.addEventListener('click', onClick)
    element.addEventListener('pointerenter', onEnter)
    element.addEventListener('pointerleave', onExit)

    return () => {
      element.removeEventListener('click', onClick)
      element.removeEventListener('pointerenter', onEnter)
      element.removeEventListener('pointerleave', onExit)

      hover(null)
    }
  }, [id, name, object, hover, focus])

  useFrame(() => {
    if (progress.current === opacity.current) return
    progress.current = opacity.current

    object.visible = opacity.current > MIN_OPACITY
    object.element.style.opacity = String(opacity.current)
  })

  return (
    <primitive
      object={object}
      position={[0, radius * HEIGHT, 0]}
    />
  )
}
