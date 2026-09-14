import { useRef } from 'react'

import { Vector3 } from 'three'

export const useTarget = () => {
  return useRef({
    start: new Vector3(),
    destination: new Vector3()
  })
}
