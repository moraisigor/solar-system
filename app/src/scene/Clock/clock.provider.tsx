import { createContext, type ReactNode, type RefObject } from 'react'

export type ClockState = {
  time: RefObject<number>
}

export type ClockProviderProps = {
  value: ClockState
  children: ReactNode
}

export const ClockContext = createContext<ClockState | null>(null)

export const ClockProvider = ({ value, children }: ClockProviderProps) => (
  <ClockContext.Provider value={value}>{children}</ClockContext.Provider>
)
