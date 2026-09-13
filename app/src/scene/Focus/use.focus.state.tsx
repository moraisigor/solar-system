import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { Group } from 'three'

import type { Element } from './element'
import type { FocusState } from './focus.provider'
import type { ID } from './id'

export const useFocusState = (): FocusState => {
  const list = useRef(new Map<ID, Element>())

  const root = useRef<Group | null>(null)

  const origin = useRef<boolean>(false)

  const [current, setCurrent] = useState<ID | null>(null)

  const get = useCallback((id: ID) => list.current.get(id) ?? null, [])

  const add = useCallback((id: ID, element: Element) => list.current.set(id, element), [])

  const remove = useCallback((id: ID) => list.current.delete(id), [])

  const focus = useCallback((id: ID | null) => setCurrent(id), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const { key } = event

      event.preventDefault()

      if (key === 'Escape') {
        focus(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return useMemo(
    () => ({ current, root, origin, get, add, remove, focus }),
    [current, root, origin, get, add, remove, focus]
  )
}
