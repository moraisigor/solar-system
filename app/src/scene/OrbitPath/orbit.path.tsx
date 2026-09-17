import { useEffect, useMemo, useRef } from 'react'

import { useFrame } from '@react-three/fiber'
import { BufferAttribute, BufferGeometry, Line, LineBasicMaterial } from 'three'

import { MAX_OPACITY, MIN_OPACITY } from '@/scene/constant'
import { useFocus } from '@/scene/Focus'

import type { KeplerElement } from '@/type'

import { orbit, toSceneUnit } from '@/astronomy'

type OrbitPathProps = {
  element: KeplerElement
}

export const OrbitPath = ({ element }: OrbitPathProps) => {
  const { opacity } = useFocus()

  const progress = useRef<number>(-1)

  const line = useMemo(() => {
    const position = orbit(element, 512).map((e) => toSceneUnit(e))

    const geometry = new BufferGeometry()

    geometry.setAttribute('position', new BufferAttribute(position, 3))

    const material = new LineBasicMaterial({ color: 0x9aa3ad, opacity: MAX_OPACITY, transparent: true })

    return new Line(geometry, material)
  }, [element])

  useEffect(() => {
    return () => {
      line.geometry.dispose()
      line.material.dispose()
    }
  }, [line])

  useFrame(() => {
    if (opacity.current === progress.current) return
    progress.current = opacity.current

    const value = opacity.current * MAX_OPACITY

    line.visible = value > MIN_OPACITY
    line.material.opacity = value
  })

  return <primitive object={line} />
}
