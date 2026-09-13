import { useFrame } from '@react-three/fiber'

import { useClock } from './use.clock'

export const ClockControl = () => {
  const { time } = useClock()

  useFrame((_, value) => {
    // 1 second is equivalent to 1 hour
    time.current += (1 / 24) * value
  }, -1)

  return null
}
