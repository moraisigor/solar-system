import { createContext, type ReactNode, type RefObject } from 'react'

import type { Group } from 'three'

import type { Element } from './element'
import type { ID } from './id'

export type FocusState = {
  current: ID | null
  root: RefObject<Group | null>
  origin: RefObject<boolean>
  get: (id: ID) => Element | null
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
