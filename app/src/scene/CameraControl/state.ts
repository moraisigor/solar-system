export const STATE = {
  ALL: 1,
  MOVE: 2,
  INSPECT: 3
} as const

export type State = typeof STATE[keyof typeof STATE]
