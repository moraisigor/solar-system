import { useCallback, useMemo, useRef, useState } from 'react'

import type { Group } from 'three'

import type { Element } from './element'
import type { FocusState } from './focus.provider'
import type { ID } from './id'
import { useEscape } from './use.escape'

export const useFocusState = (): FocusState => {
  const list = useRef(new Map<ID, Element>())

  const root = useRef<Group | null>(null)
  const opacity = useRef<number>(1)

  const [current, setCurrent] = useState<ID | null>(null)

  const get = useCallback((id: ID | null) => {
    if (id) return list.current.get(id) ?? null

    return null
  }, [])

  const add = useCallback((id: ID, element: Element) => list.current.set(id, element), [])

  const remove = useCallback((id: ID) => list.current.delete(id), [])

  const focus = useCallback((id: ID | null) => setCurrent(id), [])

  useEscape(focus)

  return useMemo(
    () => ({ current, root, opacity, get, add, remove, focus }),
    [current, root, opacity, get, add, remove, focus]
  )
}
