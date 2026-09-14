import { useRef } from 'react'

import { Vector3 } from 'three'

export const useNavigate = () => {
  return useRef({
    time: 0,
    active: false,
    direction: new Vector3()
  })
}
