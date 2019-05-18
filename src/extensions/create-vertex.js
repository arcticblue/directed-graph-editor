import uuid from 'uuid/v1'
import { Vertex } from '../model'

const createNode = (editor) => {
  const stage = editor.stage
  const graph = editor.graph

  stage.on('click tap', (event) => {
    if (event.target === editor.stage) {
      if (editor.selected.length === 0) {
        const name = editor.vertices.length + ''
        const scale = stage.scaleX()
        const mousePointTo = {
          x: stage.getPointerPosition().x / scale - stage.x() / scale,
          y: stage.getPointerPosition().y / scale - stage.y() / scale
        }
        graph.add(new Vertex(uuid(), name, mousePointTo.x - 24, mousePointTo.y - 24))
        stage.batchDraw()
      }
    }
  })
}

export default createNode
