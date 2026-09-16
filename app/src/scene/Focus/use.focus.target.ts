import { useEffect, useMemo, type RefObject } from 'react'

import type { Object3D } from 'three'

import { CAMERA_INSPECT } from '@/scene/constant'

import type { ID } from './id'
import { useFocus } from './use.focus'

type Radius = {
  min?: number
  value: number
}

const MARGIN = 1.2

export const useFocusTarget = (id: ID, object: RefObject<Object3D | null>, radius: Radius) => {
  const { add, remove } = useFocus()

  const { min, value } = radius

  const distance = useMemo(() => {
    return {
      min: (min ?? value) * MARGIN,
      inspect: value * CAMERA_INSPECT
    }
  }, [min, value])

  useEffect(() => {
    add(id, { object, distance })

    return () => remove(id)
  }, [id, object, distance, add, remove])
}
