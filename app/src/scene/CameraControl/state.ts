import type { ID } from '@/type'

export const STATE = {
  ALL: 1,
  MOVE: 2,
  INSPECT: 3
} as const

export type State = typeof STATE[keyof typeof STATE]

export type StateAction = {
  frame: (id: ID | null, time: number) => void
  enter?: () => void
}
