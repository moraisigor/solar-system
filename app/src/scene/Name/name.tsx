import './name.css'

import { useEffect, useMemo, useRef, type FunctionComponent } from 'react'

import { useFrame } from '@react-three/fiber'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

import { MIN_OPACITY } from '@/scene/constant'

import type { ID } from '@/type'

import { useFocus } from '../Focus'

type NameProps = {
  id: ID
  name: string
  radius: number
}

const HEIGHT = 1.25

export const Name: FunctionComponent<NameProps> = ({ id, name, radius }) => {
  const { opacity, focus } = useFocus()

  const progress = useRef<number>(-1)

  const { span, object } = useMemo(() => {
    const element = document.createElement('span')
    element.className = 'content'

    const span = document.createElement('span')
    span.className = 'name'
    span.textContent = name

    element.appendChild(span)

    return { span, object: new CSS2DObject(element) }
  }, [name])

  useEffect(() => {
    return () => object.element.remove()
  }, [object])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()

      focus(id)
    }

    span.addEventListener('click', onClick)

    return () => span.removeEventListener('click', onClick)
  }, [id, name, focus])

  useFrame(() => {
    if (opacity.current === progress.current) return
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
