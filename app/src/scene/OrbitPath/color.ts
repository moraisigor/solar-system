import type { ID } from '@/type'

export const COLOR = {
  earth: '#0099cc',
  jupiter: '#da8b72',
  mars: '#9a4e19',
  mercury: '#9768ac',
  neptune: '#708ce3',
  saturn: '#d5c187',
  uranus: '#68ccda',
  venus: '#b07919'
} as const satisfies Record<Exclude<ID, 'sun'>, string>
