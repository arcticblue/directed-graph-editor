import { Transformer } from 'konva'
import { Vertex } from '../model'

const transformerOptions = {
  rotateEnabled: false,
  borderEnabled: false,
  padding: 4,
  anchorSize: 5,
  anchorFill: 'black',
  anchorStroke: 'black'
}

const selectVertex = (editor) => {
  const stage = editor.stage
  const graph = editor.graph
  const transformers = []

  const createTransformer = (vertex) => {
    const transformer = new Transformer({ ...transformerOptions })
    transformer.attachTo(vertex.node)
    transformers.push(transformer)
    vertex.select(true)
    vertex.add(transformer)
    graph.fire('select', vertex)
    stage.batchDraw()
  }

  const destroyTransformers = () => {
    transformers.forEach((transformer) => transformer.destroy())
    transformers.length = 0
    editor.selected.forEach((vertex) => {
      vertex.select(false)
      graph.fire('unselect', vertex)
    })
    stage.batchDraw()
  }

  stage.on('click tap', (event) => {
    if (event.target.parent instanceof Vertex) {
      if (!event.evt.shiftKey) {
        destroyTransformers()
      }
      createTransformer(event.target.parent)
      graph.batchDraw()
    } else {
      if (!event.evt.shiftKey) {
        destroyTransformers()
        graph.batchDraw()
      }
    }
  })
}

export default selectVertex
