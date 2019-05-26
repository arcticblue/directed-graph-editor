import { Layer, Stage, Transformer } from 'konva'
import enableExtensions from './extension'
import { Edge, Vertex } from './model'

export default class DirectedGraphEditor {
  constructor(id) {
    this._ghostEdge = null
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
    enableExtensions(this)
    stage.add(graph)
    stage.draw()
  }

  get ghostEdge() {
    return this._ghostEdge
  }

  set ghostEdge(edge) {
    this._ghostEdge = edge
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
}
