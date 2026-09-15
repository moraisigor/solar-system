import { useRef, type RefObject } from 'react'

import { Vector3 } from 'three'

export type RefDirection = RefObject<{
  time: number
  active: boolean
  direction: Vector3
}>

export const useDirection = (): RefDirection => {
  return useRef({
    time: 0,
    active: false,
    direction: new Vector3()
  })
}
