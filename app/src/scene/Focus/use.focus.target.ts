import { useEffect, type RefObject } from 'react'

import type { Object3D } from 'three'

import { CLOSE_VIEW_DISTANCE_RADII } from '@/astronomy'

import type { ID } from './id'
import { useFocus } from './use.focus'

type Radius = {
  min: number
  value: number
}

export const useFocusTarget = (id: ID, object: RefObject<Object3D | null>, radius: Radius) => {
  const { add, remove } = useFocus()

  const distance = {
    min: radius.min * 1.2,
    inspect: radius.value * CLOSE_VIEW_DISTANCE_RADII
  }

  useEffect(() => {
    add(id, { object, distance })

    return () => remove(id)
  }, [id, object, distance, add, remove])
}
