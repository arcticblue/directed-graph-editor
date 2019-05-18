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
  let transformers = []
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

  const destroyTransformer = (vertex) => {
    transformers = transformers.filter((transformer) => {
      if (transformer.node().parent === vertex) {
        transformer.destroy()
        vertex.select(false)
        graph.fire('unselect', vertex)
        return false
      }
      return true
    })
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
      if (event.target.parent instanceof Vertex) {
        const vertex = event.target.parent
        if (!event.evt.shiftKey) {
          destroyTransformers()
        }
        if (!vertex.isSelected) {
          createTransformer(vertex)
        } else {
          destroyTransformer(vertex)
        }
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
    if (Math.abs(event.evt.movementX) > 5 || Math.abs(event.evt.movementY) > 5) {
      enableSelectClick = false
    }
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
      if (!event.evt.shiftKey) {
        destroyTransformers()
      }
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
