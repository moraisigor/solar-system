const FLAT = 1e-6

const ease = (t: number) => t * t * (3 - 2 * t)

const zoom = (t: number, span: number) => {
  if (Math.abs(1 - span) < FLAT) return t

  return (1 - span ** t) / (1 - span)
}

export const pace = (t: number, span: number) => zoom(ease(t), span)
