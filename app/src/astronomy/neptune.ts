export const NEPTUNE = {
  name: 'Neptune',
  axis: 30.06992276,
  orbit: 60190.03,
  radius: 24622,
  rotation: 0.67125,
  obliquity: 28.32,
  inclination: 1.77004347,
  eccentricity: 0.00859048,
  ring: {
    list: [
      { width: 2_000, depth: 0.00008, radius: 41_900 },
      { width: 113, depth: 0.0062, radius: 53_200 },
      { width: 4_000, depth: 0.00015, radius: 55_200 },
      { width: 100, depth: 0.00015, radius: 57_200 },
      { width: 35, depth: 0.011, radius: 62_933 }
    ],
    radius: {
      in: 40_900,
      out: 62_958
    }
  },
  longitude: {
    average: -55.12002969,
    ascending: 131.78422574,
    perihelion: 44.96476227
  }
} as const
