import { useRef } from 'react'

import { Vector3 } from 'three'

export const useCamera = () => {
  return useRef({
    start: new Vector3(),
    destination: new Vector3()
  })
}
