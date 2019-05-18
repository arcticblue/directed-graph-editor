import { Rect, Transformer, Util } from 'konva'
import { Vertex } from '../model'

const transformerOptions = {
  rotateEnabled: false,
  borderEnabled: false,
  padding: 4,
  anchorSize: 5,
  anchorFill: 'black',
  anchorStroke: 'black'
}

const boxOptions = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  stroke: 'black',
  strokeScaleEnabled: false
}

const selectVertex = (editor) => {
  const stage = editor.stage
  const graph = editor.graph
  const transformers = []
  let enableSelectClick = false

  const selectionBox = new Rect(boxOptions)
  selectionBox.listening(false)
  selectionBox.visible(false)
  graph.add(selectionBox)

  const createTransformer = (vertex) => {
    const transformer = new Transformer(transformerOptions)
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
    if (enableSelectClick) {
      console.log(enableSelectClick)
      if (event.target.parent instanceof Vertex) {
        if (!event.evt.shiftKey) {
          destroyTransformers()
        }
        createTransformer(event.target.parent)
        graph.batchDraw()
      } else if (!event.evt.shiftKey) {
        destroyTransformers()
        graph.batchDraw()
      }
    }
  })

  stage.on('mousedown', (event) => {
    enableSelectClick = true
    if (event.target === editor.stage) {
      const scale = stage.scaleX()
      const mousePointTo = {
        x: stage.getPointerPosition().x / scale - stage.x() / scale,
        y: stage.getPointerPosition().y / scale - stage.y() / scale
      }
      selectionBox.position(mousePointTo)
      selectionBox.size({ width: 0, height: 0 })
      selectionBox.visible(true)
    }
  })

  stage.on('mousemove', (event) => {
    enableSelectClick = false
    if (selectionBox.isVisible()) {
      const scale = stage.scaleX()
      const mousePointTo = {
        x: stage.getPointerPosition().x / scale - stage.x() / scale,
        y: stage.getPointerPosition().y / scale - stage.y() / scale
      }
      selectionBox.size({
        width: mousePointTo.x - selectionBox.position().x,
        height: mousePointTo.y - selectionBox.position().y
      })
      stage.batchDraw()
    }
  })

  stage.on('mouseup', (event) => {
    if (selectionBox.isVisible()) {
      const selectionRect = selectionBox.getClientRect()
      editor.vertices.forEach((vertex) => {
        if (Util.haveIntersection(selectionRect, vertex.node.getClientRect())) {
          if (!vertex.isSelected) {
            createTransformer(vertex)
          }
        }
      })
      selectionBox.visible(false)
      stage.batchDraw()
    }
  })
}

export default selectVertex
