import { useMemo, type FunctionComponent } from 'react'

import { Canvas } from '@react-three/fiber'
import { ACESFilmicToneMapping } from 'three'

import { EARTH, JUPITER, MARS, MERCURY, NEPTUNE, SATURN, URANUS, VENUS } from '@/astronomy'
import { INFORMATION } from '@/astronomy/information'

import { CameraControl, OVERVIEW } from '../CameraControl'
import { ClockControl, ClockProvider, useClockState } from '../Clock'
import { Earth } from '../Earth'
import { FocusProvider, Root, useFocusState } from '../Focus'
import { Jupiter } from '../Jupiter'
import { Mars } from '../Mars'
import { Mercury } from '../Mercury'
import { NameLayer } from '../Name'
import { Neptune } from '../Neptune'
import { OrbitPath } from '../OrbitPath'
import { Panel } from '../Panel'
import { Saturn } from '../Saturn'
import { SceneError } from '../SceneError'
import { Sun } from '../Sun'
import { Universe } from '../Universe'
import { Uranus } from '../Uranus'
import { Venus } from '../Venus'

const ORBIT = [
  ['mercury', MERCURY],
  ['venus', VENUS],
  ['earth', EARTH],
  ['mars', MARS],
  ['jupiter', JUPITER],
  ['saturn', SATURN],
  ['uranus', URANUS],
  ['neptune', NEPTUNE]
] as const

const ELEMENT = [
  ['sun', Sun],
  ['mercury', Mercury],
  ['venus', Venus],
  ['earth', Earth],
  ['mars', Mars],
  ['jupiter', Jupiter],
  ['saturn', Saturn],
  ['uranus', Uranus],
  ['neptune', Neptune]
] as const

export const SolarSystem: FunctionComponent = () => {
  const clock = useClockState()
  const focus = useFocusState()

  const { current } = focus

  const information = useMemo(() => {
    if (current) return INFORMATION[current]

    return null
  }, [current])

  return (
    <div class='solar'>
      <Canvas
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          logarithmicDepthBuffer: true
        }}
        dpr={[1, 2]}
        camera={{
          fov: OVERVIEW.fov,
          far: OVERVIEW.far,
          near: OVERVIEW.near,
          position: OVERVIEW.position
        }}>
        <ClockProvider value={clock}>
          <FocusProvider value={focus}>
            <NameLayer />
            <ClockControl />
            <CameraControl />
            <SceneError>
              <Universe />
            </SceneError>
            <Root>
              {ORBIT.map(([id, orbit]) => (
                <SceneError key={id}>
                  <OrbitPath element={orbit} />
                </SceneError>
              ))}
              {ELEMENT.map(([id, Element]) => (
                <SceneError key={id}>
                  <Element />
                </SceneError>
              ))}
            </Root>
          </FocusProvider>
        </ClockProvider>
      </Canvas>
      {information && <Panel information={information} />}
    </div>
  )
}
