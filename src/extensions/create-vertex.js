import uuid from 'uuid/v1'
import { Vertex } from '../model'

const createVertex = (editor) => {
  const stage = editor.stage
  const graph = editor.graph

  const canCreateVertex = (event) => {
    return event.target === editor.stage && editor.ghostEdge === null && editor.selected.length === 0
  }

  stage.on('dblclick dbltap', (event) => {
    if (canCreateVertex(event)) {
      const name = editor.vertices.length + ''
      const transform = graph
        .getAbsoluteTransform()
        .copy()
        .invert()
      const position = transform.point(stage.getPointerPosition())
      graph.add(new Vertex(uuid(), name, position))
      stage.batchDraw()
    }
  })
}

export default createVertex
