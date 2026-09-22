import { Vector3, type Object3D, type PerspectiveCamera } from 'three'
import type { OrbitControls } from 'three/examples/jsm/Addons.js'

import { MOVE_DURATION } from '@/scene/constant'

import { pace } from './ease'
import { OVERVIEW } from './overview'
import { MIN_DISTANCE, span, type Position } from './position'
import { STATE, type StateAction, type State } from './state'

import { type Element, type FocusState, type ID } from '../Focus'

const MAX_WAIT = 1.5

const MAX_STEP = 1 / 30

const MAX_DISTANCE_FACTOR = 24

const NEAR_FACTOR = 0.15

export class CameraView {
  private cam: PerspectiveCamera
  private control: OrbitControls
  private get: FocusState['get']
  private focus: FocusState['focus']

  // every state goes here
  private readonly list: Record<State, StateAction> = {
    [STATE.ALL]: {
      frame: () => this.control.update(),
      enter: () => {
        const { near, distance: { min, max } } = OVERVIEW

        this.enable(min, max, near)
      }
    },
    [STATE.MOVE]: {
      frame: (id, time) => this.move(id, time),
      enter: () => {
        this.wait = 0
        this.elapse = 0

        this.control.enabled = false
      }
    },
    [STATE.INSPECT]: {
      frame: () => this.track()
    }
  }

  private state: StateAction = this.list[STATE.ALL]

  private wait = 0
  private elapse = 0

  private to: Position = { target: new Vector3(), current: new Vector3() }
  private from: Position = { target: new Vector3(), current: new Vector3() }

  private prev = new Vector3()
  private scratch = new Vector3()
  private direction = new Vector3()

  private element: Element | null = null

  constructor(
    cam: PerspectiveCamera,
    control: OrbitControls,
    get: FocusState['get'],
    focus: FocusState['focus']
  ) {
    this.cam = cam
    this.control = control
    this.get = get
    this.focus = focus
  }

  get object() {
    return this.element?.object.current ?? null
  }

  start(id: ID | null) {
    this.element = this.get(id)

    this.capture()
    this.approach()

    this.go(STATE.MOVE)

    this.aim()
  }

  frame(id: ID | null, time: number) {
    this.element = this.get(id)

    this.state.frame(id, time)
  }

  private get isArrive() {
    return this.elapse >= MOVE_DURATION
  }

  private go(id: State) {
    this.state = this.list[id]

    this.state.enter?.()
  }

  // on start
  private capture() {
    this.from.target.copy(this.control.target)
    this.from.current.copy(this.cam.position)
  }

  // on start
  private approach() {
    this.direction.copy(this.from.current).sub(this.from.target)

    if (this.direction.lengthSq() < MIN_DISTANCE ** 2) this.direction.fromArray(OVERVIEW.position)

    this.direction.normalize()
  }

  private aim() {
    if (this.element) {
      if (this.object) {
        return this.close(this.object, this.element)
      }
    }

    this.to.target.set(0, 0, 0)
    this.to.current.fromArray(OVERVIEW.position)
  }

  // return the element poisiton
  private close(object: Object3D, element: Element) {
    const position = object.getWorldPosition(this.scratch)

    this.to.target.copy(position)
    this.to.current.copy(position).addScaledVector(this.direction, element.distance.inspect)

    return position
  }

  private enable(min: number, max: number, near: number) {
    this.control.enabled = true
    this.control.minDistance = min
    this.control.maxDistance = max

    this.cam.near = near

    this.cam.updateProjectionMatrix()
  }

  private move(id: ID | null, time: number) {
    if (this.element) {
      if (this.object) {
        this.wait = 0

        const position = this.close(this.object, this.element)

        this.progress(time)

        if (this.isArrive) return this.arrive(this.element, position)
      }
    }

    if (id) return this.stall(time)

    this.progress(time)

    if (this.isArrive) this.go(STATE.ALL)
  }

  private progress(time: number) {
    this.elapse += Math.min(time, MAX_STEP)

    const progress = Math.min(1, this.elapse / MOVE_DURATION)

    const ease = pace(progress, span(this.from, this.to))

    this.cam.position.lerpVectors(this.from.current, this.to.current, ease)
    this.control.target.lerpVectors(this.from.target, this.to.target, ease)

    this.cam.lookAt(this.control.target)
  }

  private arrive(element: Element, position: Vector3) {
    const { distance: { min, inspect } } = element

    this.control.target.copy(position)

    if (this.cam.position.distanceTo(position) < min) this.cam.position.copy(position).addScaledVector(this.direction, inspect)

    this.cam.lookAt(this.control.target)

    this.prev.copy(position)

    this.enable(min, inspect * MAX_DISTANCE_FACTOR, Math.min(OVERVIEW.near, min * NEAR_FACTOR))

    this.go(STATE.INSPECT)
  }

  private stall(time: number) {
    this.wait += time

    if (this.wait < MAX_WAIT) return

    this.wait = 0

    this.go(STATE.ALL)

    this.focus(null)
  }

  private track() {
    this.control.update()

    if (this.object) {
      const position = this.object.getWorldPosition(this.scratch)

      this.cam.position.sub(this.prev).add(position)
      this.control.target.sub(this.prev).add(position)

      this.prev.copy(position)
    }
  }
}
