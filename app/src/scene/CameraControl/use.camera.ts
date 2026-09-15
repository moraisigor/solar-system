import { useRef, type RefObject } from 'react'

import { Vector3 } from 'three'

export type RefCamera = RefObject<{
  start: Vector3
  destination: Vector3
}>

export const useCamera = (): RefCamera => {
  return useRef({
    start: new Vector3(),
    destination: new Vector3()
  })
}
