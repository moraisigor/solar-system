import type { Vector3 } from 'three'

// two points closer than this count as the same point
export const MIN_DISTANCE = 1e-6

export type Position = {
  target: Vector3
  current: Vector3
}

export const span = (from: Position, to: Position) => {
  const reach = from.current.distanceTo(from.target)

  if (reach <= MIN_DISTANCE) return 1

  return to.current.distanceTo(to.target) / reach
}
