import { useEffect, useMemo, useRef } from 'react'

import { useFrame, useThree } from '@react-three/fiber'
import { Line2 } from 'three/addons/lines/Line2.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'

import { MAX_OPACITY, MIN_OPACITY, HOVER_OPACITY } from '@/scene/constant'
import { useFocus } from '@/scene/Focus'
import { useHover } from '@/scene/Hover'

import type { ID, KeplerElement } from '@/type'

import { orbit, toSceneUnit } from '@/astronomy'
import { COLOR } from './color'

type OrbitPathProps = {
  id: Exclude<ID, 'sun'>
  element: KeplerElement
}

const LINE_WIDTH = 1.2
const LINE_WIDTH_HOVER = 2.4

export const OrbitPath = ({ id, element }: OrbitPathProps) => {
  const size = useThree((state) => state.size)

  const { id: pointer } = useHover()

  const { opacity } = useFocus()

  const drawn = useRef({
    hover: false,
    opacity: -1
  })

  const line = useMemo(() => {
    const position = orbit(element, 512).map((e) => toSceneUnit(e))

    const geometry = new LineGeometry()
    geometry.setPositions(position)

    const material = new LineMaterial({
      color: COLOR[id],
      opacity: MAX_OPACITY,
      transparent: true,
      linewidth: LINE_WIDTH
    })

    return new Line2(geometry, material)
  }, [id, element])

  useEffect(() => {
    line.material.resolution.set(size.width, size.height)
  }, [line, size])

  useEffect(() => {
    return () => {
      line.geometry.dispose()
      line.material.dispose()
    }
  }, [line])

  useFrame(() => {
    const hover = id === pointer.current

    if (hover === drawn.current.hover)
      if (opacity.current === drawn.current.opacity) return

    drawn.current = {
      hover,
      opacity: opacity.current
    }

    const value = opacity.current * (hover ? HOVER_OPACITY : MAX_OPACITY)

    line.visible = value > MIN_OPACITY
    line.material.opacity = value
    line.material.linewidth = hover ? LINE_WIDTH_HOVER : LINE_WIDTH
  })

  return <primitive object={line} />
}
