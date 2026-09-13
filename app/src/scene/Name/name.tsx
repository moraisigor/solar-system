import { useEffect, useMemo, type FunctionComponent } from 'react'

import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

import { useFocus, type ID } from '../Focus'

type NameProps = {
  id: ID
  name: string
  radius: number
}

export const Name: FunctionComponent<NameProps> = ({ id, name, radius }) => {
  const { focus, current } = useFocus()

  const object = useMemo(() => {
    const element = document.createElement('span')

    element.className = 'planet-label-anchor'

    const span = document.createElement('span')

    span.className = 'planet-label'
    span.textContent = name

    element.appendChild(span)

    return new CSS2DObject(element)
  }, [name])

  useEffect(() => {
    return () => object.element.remove()
  }, [object])

  useEffect(() => {
    const element = object.element.querySelector('.planet-label')

    if (element instanceof HTMLElement) {
      const onClick = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        focus(id)
      }

      element.addEventListener('click', onClick)

      return () => element.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <primitive
      object={object}
      visible={current === null}
      position={[0, radius * 1.25, 0]}
    />
  )
}
