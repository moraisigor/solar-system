import { useEffect, useRef } from 'react'

import { useFrame } from '@react-three/fiber'

import { MOVE_DURATION, STAGE } from '@/scene/constant'

import type { ID } from './id'
import { useFocus } from './use.focus'

const FADE_IN_START = 0.35
const FADE_IN_FINISH = 0.8

const FADE_OUT_START = 0.5
const FADE_OUT_FINISH = 0.85

export const useFade = () => {
  const { current, opacity } = useFocus()

  const prev = useRef<ID | null>(current)

  const origin = useRef<number>(opacity.current)

  const duration = useRef<number>(MOVE_DURATION)

  useEffect(() => {
    if (prev.current === current) return
    prev.current = current

    origin.current = opacity.current
    duration.current = 0
  }, [current])

  useFrame((_, time) => {
    duration.current = Math.min(duration.current + time, MOVE_DURATION)

    const pass = duration.current / MOVE_DURATION

    const start = current === null ? FADE_IN_START : FADE_OUT_START

    const finish = current === null ? FADE_IN_FINISH : FADE_OUT_FINISH

    const progress = Math.min(1, Math.max(0, (pass - start) / (finish - start)))

    const value = current === null ? 1 : 0

    opacity.current = origin.current + (value - origin.current) * progress
  }, STAGE.TIME)
}
