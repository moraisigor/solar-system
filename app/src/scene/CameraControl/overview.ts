import { ASTRONOMICAL_UNIT, MERCURY, NEPTUNE, toSceneUnit } from '@/astronomy'
import type { Vec } from '@/astronomy/kepler'

const MERCURY_RADIUS = toSceneUnit(MERCURY.radius)

const NEPTUNE_APHELION = toSceneUnit(NEPTUNE.axis * ASTRONOMICAL_UNIT * (1 + NEPTUNE.eccentricity))

export const OVERVIEW = {
  fov: 45,
  far: NEPTUNE_APHELION * 8,
  near: MERCURY_RADIUS * 0.5,
  position: [NEPTUNE_APHELION * 0.15, NEPTUNE_APHELION * 0.7, NEPTUNE_APHELION * 1.2] as Vec,
  distance: {
    min: MERCURY_RADIUS * 3,
    max: NEPTUNE_APHELION * 4
  }
}
