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

  get points() {
    return this._arrow.points()
  }

  set points(points) {
    this._arrow.points(points)
  }
}
