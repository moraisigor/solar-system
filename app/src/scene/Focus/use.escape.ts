import { useEffect } from 'react'

import type { ID } from './id'

const KEY_ESC = 'Escape'

export const useEscape = (focus: (id: ID | null) => void) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const { key } = event

      switch (key) {
        case KEY_ESC:
          event.preventDefault()

          return focus(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [focus])
}
