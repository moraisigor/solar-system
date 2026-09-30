export type KeplerElement = {
  axis: number
  orbit: number
  inclination: number
  eccentricity: number
  longitude: {
    average: number
    ascending: number
    perihelion: number
  }
}
