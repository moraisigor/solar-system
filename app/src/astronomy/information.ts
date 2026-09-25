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

type Property<K extends string> = {
  key: K
  format: (e: number) => string
}

type Information = {
  name: string
  values: {
    name: string
    value: string
  }[]
}

const PLANET = [
  { key: 'orbit', format: time },
  { key: 'radius', format: distance },
  { key: 'rotation', format: time },
  { key: 'obliquity', format: degree }
] as const

const build = <K extends string>(
  element: { name: string } & Record<NoInfer<K>, number>,
  list: readonly Property<K>[]
): Information => {
  const { name } = element

  const values = list.map((e) => {
    const { key, format } = e

    return {
      name: capitalize(key),
      value: format(element[key])
    }
  })

  return { name, values }
}

export const INFORMATION: Record<ID, Information> = {
  sun: build(SUN, [
    { key: 'radius', format: distance },
    { key: 'rotation', format: time },
    { key: 'obliquity', format: degree }
  ]),
  earth: build(EARTH, PLANET),
  jupiter: build(JUPITER, PLANET),
  mars: build(MARS, PLANET),
  mercury: build(MERCURY, PLANET),
  neptune: build(NEPTUNE, PLANET),
  saturn: build(SATURN, PLANET),
  uranus: build(URANUS, PLANET),
  venus: build(VENUS, PLANET)
}
