import { createContext, type ReactNode, type RefObject } from 'react'

import type { Group } from 'three'

import type { ID } from '@/type'

import type { Element } from './element'

export type FocusState = {
  current: ID | null
  root: RefObject<Group | null>
  opacity: RefObject<number>
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
