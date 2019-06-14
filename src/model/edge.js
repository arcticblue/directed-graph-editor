import { Arrow, Text } from 'konva'
import Element from './element'

const arrowOptions = {
  stroke: 'black',
  fill: 'black',
  listening: false
}

export default class Edge extends Element {
  constructor(id, name, source, target, points = []) {
    super({ id })
    const arrow = (this._arrow = new Arrow({ ...arrowOptions, points }))
    this._source = source
    this._target = target
    this.add(arrow)
  }

  get source() {
    return this._source
  }

  get target() {
    return this._target
  }

  get points() {
    return this._arrow.points()
  }

  set points(points) {
    this._arrow.points(points)
  }

  get dash() {
    return this._arrow.dash()
  }

  set dash(dash) {
    this._arrow.dash(dash)
  }

  get stroke() {
    return this._arrow.stroke()
  }

  set stroke(color) {
    this._arrow.stroke(color)
  }

  get fill() {
    return this._arrow.fill()
  }

  set fill(color) {
    this._arrow.fill(color)
  }
}
