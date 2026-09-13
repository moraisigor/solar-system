import { useEffect, useMemo } from 'react'

import { BufferAttribute, BufferGeometry, Line, LineBasicMaterial } from 'three'

import { useFocus } from '@/scene/Focus'

import type { KeplerElement } from '@/type'

import { orbit, toSceneUnit } from '@/astronomy'

type OrbitPathProps = {
  element: KeplerElement
}

export const OrbitPath = ({ element }: OrbitPathProps) => {
  const { current } = useFocus()

  const line = useMemo(() => {
    const position = orbit(element, 512).map((e) => toSceneUnit(e))

    const geometry = new BufferGeometry()

    geometry.setAttribute('position', new BufferAttribute(position, 3))

    const material = new LineBasicMaterial({ color: 0x9aa3ad, opacity: 0.55, transparent: true })

    return new Line(geometry, material)
  }, [element])

  useEffect(() => {
    return () => {
      line.geometry.dispose()
      line.material.dispose()
    }
  }, [line])

  return (
    <primitive
      object={line}
      visible={current === null}
    />
  )
}
