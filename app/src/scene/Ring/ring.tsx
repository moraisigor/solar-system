import { useEffect, useMemo, type FunctionComponent } from 'react'

import { CanvasTexture, SRGBColorSpace } from 'three'

import type { Ring as RingType } from '@/type'
import type { Radius } from '@/type/radius'

import { RingMesh } from './ring.mesh'

const MIN = 2
const RADIAL = 4096

const COLOR = { red: 48, green: 44, blue: 40 }

const span = (ring: RingType, radius: Radius): [number, number] => {
  const range = radius.out - radius.in

  const pixel = (kilometer: number) => {
    const t = (kilometer - radius.in) / range

    return Math.min(RADIAL - 1, Math.max(0, Math.round(t * (RADIAL - 1))))
  }

  const mid = ring.width / 2

  const to = pixel(ring.radius + mid)
  const from = pixel(ring.radius - mid)

  if (to - from + 1 >= MIN) return [from, to] as const

  const e = pixel(ring.radius)

  const value = Math.max(0, e - Math.floor(MIN / 2))

  return [value, Math.min(RADIAL - 1, value + MIN - 1)] as const
}

const opacity = (depth: number) => {
  const value = 1 - Math.exp(-depth)

  if (depth >= 0.1) return Math.max(value, 0.35)
  if (depth >= 0.001) return Math.max(value, 0.22)

  return Math.max(value, 0.08)
}

const copy = (array: Float32Array, image: ImageData) => {
  for (const e of array.keys()) {
    const i = e * 4

    image.data[i] = COLOR.red
    image.data[i + 1] = COLOR.green
    image.data[i + 2] = COLOR.blue
    image.data[i + 3] = Math.round((array[e] ?? 0) * 255)
  }

  return image
}

const paint = (list: readonly RingType[], radius: Radius) => {
  const array = new Float32Array(RADIAL)

  for (const ring of list) {
    const [x, y] = span(ring, radius)

    const range = array.subarray(x, y + 1)

    for (const e of range.keys()) {
      range[e] = Math.max(range[e] ?? 0, opacity(ring.depth))
    }
  }

  return array
}

const create = (list: readonly RingType[], radius: Radius) => {
  const canvas = document.createElement('canvas')
  canvas.width = RADIAL
  canvas.height = 1

  const context = canvas.getContext('2d')

  if (context) {
    const image = copy(paint(list, radius), context.createImageData(RADIAL, 1))

    context.putImageData(image, 0, 0)
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.needsUpdate = true

  return texture
}

type RingProps = {
  list: readonly RingType[]
  radius: Radius
}

export const Ring: FunctionComponent<RingProps> = ({ list, radius }) => {
  const texture = useMemo(() => create(list, radius), [list, radius])

  useEffect(() => {
    return () => texture.dispose()
  }, [texture])

  return (
    <RingMesh
      radius={radius}
      texture={texture}
    />
  )
}
