import { type ID } from '@/type'

import { degree, distance, time } from '@/astronomy/format'

import { EARTH } from './earth'
import { JUPITER } from './jupiter'
import { MARS } from './mars'
import { MERCURY } from './mercury'
import { NEPTUNE } from './neptune'
import { SATURN } from './saturn'
import { SUN } from './sun'
import { URANUS } from './uranus'
import { VENUS } from './venus'
import { capitalize } from 'lodash-es'

type Format = {
  format: (e: number) => string
}

type Information = {
  name: string
  values: {
    name: string
    value: string
  }[]
}

const PLANET = {
  orbit: { format: time },
  radius: { format: distance },
  rotation: { format: time },
  obliquity: { format: degree }
}

const build = <K extends string>(e: { name: string } & Record<NoInfer<K>, number>, property: Record<K, Format>): Information => {
  const { name } = e

  const values = Object.keys(property).map((key) => {
    const { format } = property[key]

    return {
      name: capitalize(key),
      value: format(e[key])
    }
  })

  return { name, values }
}

export const INFORMATION: Record<ID, Information> = {
  sun: build(SUN, {
    radius: { format: distance },
    rotation: { format: time },
    obliquity: { format: degree },
  }),
  earth: build(EARTH, PLANET),
  jupiter: build(JUPITER, PLANET),
  mars: build(MARS, PLANET),
  mercury: build(MERCURY, PLANET),
  neptune: build(NEPTUNE, PLANET),
  saturn: build(SATURN, PLANET),
  uranus: build(URANUS, PLANET),
  venus: build(VENUS, PLANET)
}
