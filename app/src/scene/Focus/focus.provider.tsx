import { createContext, type ReactNode, type RefObject } from 'react'

import type { Group } from 'three'

import type { Element } from './element'
import type { ID } from './id'

export type FocusState = {
  root: RefObject<Group | null>
  current: ID | null
  get: (id: ID | null) => Element | null
  add: (id: ID, element: Element) => void
  remove: (id: ID) => void
  focus: (id: ID | null) => void
}

export type FocusProviderProps = {
  value: FocusState
  children: ReactNode
}

export const FocusContext = createContext<FocusState | null>(null)

export const FocusProvider = ({ value, children }: FocusProviderProps) => {
  return <FocusContext.Provider value={value}>{children}</FocusContext.Provider>
}
