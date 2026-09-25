export const URANUS = {
  name: 'Uranus',
  axis: 19.18916464,
  orbit: 30687.401444,
  radius: 25362,
  rotation: 0.71833,
  obliquity: 97.77,
  inclination: 0.77263783,
  eccentricity: 0.04725744,
  ring: {
    radius: {
      in: 37_850,
      out: 51_197
    },
    list: [
      { width: 3_500, depth: 0.004, radius: 39_600 },
      { width: 2, depth: 0.22, radius: 41_840 },
      { width: 3, depth: 0.33, radius: 42_230 },
      { width: 3, depth: 0.23, radius: 42_580 },
      { width: 10, depth: 0.5, radius: 44_720 },
      { width: 10, depth: 0.28, radius: 45_670 },
      { width: 2, depth: 0.2, radius: 47_190 },
      { width: 4, depth: 0.8, radius: 47_630 },
      { width: 6, depth: 0.45, radius: 48_290 },
      { width: 2, depth: 0.15, radius: 50_020 },
      { width: 58, depth: 1.5, radius: 51_149 }
    ]
  },
  longitude: {
    average: 313.23810451,
    ascending: 74.01692503,
    perihelion: 170.9542763
  }
} as const
