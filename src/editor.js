import { Layer, Stage, Transformer } from 'konva'
import { Edge, Vertex } from './model'
import EventHandler from './event/event-handler'

export default class DirectedGraphEditor {
  constructor(id) {
    const container = (this._container = document.getElementById(id))
    const stage = (this._stage = new Stage({
      container: id,
      width: container.offsetWidth,
      height: container.offsetHeight
    }))
    window.addEventListener('resize', () => {
      stage.size({ width: container.offsetWidth, height: container.offsetHeight })
    })
    const graph = (this._graph = new Layer())

    stage.add(graph)
    stage.draw()

    this.eventHandler = new EventHandler(this)
  }

  get container() {
    return this._container
  }

  get stage() {
    return this._stage
  }

  get graph() {
    return this._graph
  }

  get edges() {
    return this.elements.filter((element) => element instanceof Edge)
  }

  get elements() {
    return this.graph
      .find((element) => {
        return element.getType() === 'Group'
      })
      .toArray()
  }

  get vertices() {
    return this.elements.filter((element) => element instanceof Vertex)
  }

  get selected() {
    return this.vertices.filter((vertex) => vertex.selected)
  }

  load = (elements) => {}

  layout = (options) => {
    return {
      run: () => {}
    }
  }

  absolutePosition = (point) => {
    const transform = this.graph
      .getAbsoluteTransform()
      .copy()
      .invert()
    return transform.point(point)
  }

  calculatePosition = () => {
    return this.absolutePosition(this.stage.getPointerPosition())
  }

  calculateVector = (p1, p2) => {
    const transform = this.graph
      .getAbsoluteTransform()
      .copy()
      .invert()
    const sourcePoint = transform.point(p1)
    const targetPoint = transform.point(p2)
    return {
      x: targetPoint.x - sourcePoint.x,
      y: targetPoint.y - sourcePoint.y
    }
  }

  calculateAngle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1)
  }

  calculateDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
  }
}
