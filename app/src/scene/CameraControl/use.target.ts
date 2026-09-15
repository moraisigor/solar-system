import { useRef, type RefObject } from 'react'

import { Vector3 } from 'three'

export type RefTarget = RefObject<{
  start: Vector3
  destination: Vector3
}>

export const useTarget = (): RefTarget => {
  return useRef({
    start: new Vector3(),
    destination: new Vector3()
  })
}
