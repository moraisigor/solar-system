import type { KeplerElement } from '@/type'

import { ASTRONOMICAL_UNIT } from './constant'

type Position = {
  primary: Vec
  secondary: Vec
}

export type Vec = [number, number, number]

const mod = (radian: number): number => {
  const value = radian % (Math.PI * 2)

  return Math.sign(value) === 1 ? value : value + Math.PI * 2
}

const radian = (degree: number): number => degree * (Math.PI / 180)

const rotateX = ([x, y, z]: Vec, angle: number): Vec => {
  const sin = Math.sin(angle)
  const cos = Math.cos(angle)

  return [x, y * cos - z * sin, y * sin + z * cos]
}

const rotateZ = ([x, y, z]: Vec, angle: number): Vec => {
  const sin = Math.sin(angle)
  const cos = Math.cos(angle)

  return [x * cos - y * sin, x * sin + y * cos, z]
}

const toSceneOrbit = (e: KeplerElement, eccentric: number): Vec => {
  const distance = e.axis * ASTRONOMICAL_UNIT

  const vec: Vec = [
    distance * (Math.cos(eccentric) - e.eccentricity),
    distance * Math.sqrt(1 - e.eccentricity * e.eccentricity) * Math.sin(eccentric),
    0
  ]

  const values = rotateZ(vec, radian(e.longitude.perihelion - e.longitude.ascending))

  const inclination = rotateX(values, radian(e.inclination))

  const [x, y, z] = rotateZ(inclination, radian(e.longitude.ascending))

  return [x, z, y]
}

export const orbit = (e: KeplerElement, values = 360): Float32Array => {
  const array = new Float32Array((values + 1) * 3)

  for (const i of Array.from({ length: values + 1 }).keys()) {
    const [x, y, z] = toSceneOrbit(e, (i / values) * (Math.PI * 2))

    array.set([x, y, z], i * 3)
  }

  return array
}

export const eccentric = (irregularity: number, eccentricity: number): number => {
  const average = mod(irregularity)

  const run = (value: number, step: number): number => {
    if (step < 1) {
      return value
    }

    const correction =
      (value - eccentricity * Math.sin(value) - average) / (1 - eccentricity * Math.cos(value))

    if (Math.abs(correction) < 1e-12) {
      return value - correction
    }

    return run(value - correction, step - 1)
  }

  return run(average, 12)
}

export const barycentric = (center: Vec, position: Vec, fraction: number): Position => {
  return {
    primary: [
      center[0] - position[0] * fraction,
      center[1] - position[1] * fraction,
      center[2] - position[2] * fraction
    ],
    secondary: [
      center[0] + position[0] * (1 - fraction),
      center[1] + position[1] * (1 - fraction),
      center[2] + position[2] * (1 - fraction)
    ]
  }
}

export const heliocentric = (e: KeplerElement, time: number): Vec => {
  const average = e.longitude.average + (360 / e.orbit) * time

  const eccentricity = eccentric(radian(average - e.longitude.perihelion), e.eccentricity)

  return toSceneOrbit(e, eccentricity)
}
