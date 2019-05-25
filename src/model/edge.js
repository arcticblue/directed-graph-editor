import { Arrow, Group, Text } from 'konva'

const options = {}

const arrowOptions = {
  stroke: 'black',
  fill: 'black',
  listening: false
}

export default class Edge extends Group {
  constructor(id, name, source, target) {
    super({ ...options, id })
    const arrow = (this._arrow = new Arrow({ ...arrowOptions }))
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
