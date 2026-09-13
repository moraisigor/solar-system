import type { RefObject } from 'react'

import type { Object3D } from 'three'

export type Element = {
  object: RefObject<Object3D | null>
  distance: {
    min: number
    inspect: number
  }
}
