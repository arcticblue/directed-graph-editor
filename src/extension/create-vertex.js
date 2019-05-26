import uuid from 'uuid/v1'
import { Vertex } from '../model'

const createVertex = (editor) => {
  const stage = editor.stage
  const graph = editor.graph

  const canCreateVertex = (event) => {
    return event.target === editor.stage && editor.ghostEdge === null && editor.selected.length === 0
  }

  const doCreateVertex = (event) => {
    if (canCreateVertex(event)) {
      const name = editor.vertices.length + ''
      graph.add(new Vertex(uuid(), name, editor.calculatePosition()))
      graph.batchDraw()
    }
  }

  stage.on('dblclick dbltap', doCreateVertex)
}

export default createVertex
