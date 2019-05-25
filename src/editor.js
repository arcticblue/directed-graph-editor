import { Layer, Stage, Transformer } from 'konva'
import { enableExtensions } from './extensions'
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
    return this.vertices.filter((vertex) => vertex.isSelected)
  }

  load = (elements) => {}

  layout = (options) => {
    return {
      run: () => {}
    }
  }
}
