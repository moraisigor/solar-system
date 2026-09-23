import { UNIT } from "@/type"

const MIN_DAY = 2
const MIN_YEAR = 1

const digit = (e: number) => e.toLocaleString('en', { maximumFractionDigits: 2 })

export const time = (e: number) => {
  if (e < MIN_DAY) return `${digit(e)} ${UNIT.time.day}`
  if (e < MIN_YEAR) return `${digit(e)} ${UNIT.time.year}`
  return `${digit(e)} ${UNIT.time.year}`
}

export const degree = (e: number) => `${digit(e)}${UNIT.degree}`

export const distance = (e: number) => `${digit(e)}${UNIT.distance.kilometer}`
