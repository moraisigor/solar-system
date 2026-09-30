import { createContext, type ReactNode, type RefObject } from 'react'

import type { ID } from '@/type'

export type HoverState = {
  id: RefObject<ID | null>
  hover: (id: ID | null) => void
}

export type HoverProviderProps = {
  value: HoverState
  children: ReactNode
}

export const HoverContext = createContext<HoverState | null>(null)

export const HoverProvider = ({ value, children }: HoverProviderProps) => (
  <HoverContext.Provider value={value}>{children}</HoverContext.Provider>
)
