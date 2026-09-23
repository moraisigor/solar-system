import { UNIT } from "@/type"

const DAY = 2
const YEAR = 365

const digit = (e: number) => e.toLocaleString('en', { maximumFractionDigits: 2 })

export const time = (e: number) => {
  if (e < DAY) return `${digit(e * 24)} ${UNIT.time.hour}`
  if (e < YEAR) return `${digit(e)} ${UNIT.time.day}`
  return `${digit(e / YEAR)} ${UNIT.time.year}`
}

export const degree = (e: number) => `${digit(e)}${UNIT.degree}`

export const distance = (e: number) => `${digit(e)} ${UNIT.distance.kilometer}`
