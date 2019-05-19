import uuid from 'uuid/v1'
import { Arrow } from 'konva'
import { Vertex } from '../model'

const createEdge = (editor) => {
  const stage = editor.stage
  const graph = editor.graph

  let sourceVertex = null
  let points = []

  const ghostEdgeOptions = {
    stroke: 'black',
    id: uuid(),
    fill: 'black',
    listening: false
  }

  const mousePointTo = () => {
    const scale = stage.scaleX()
    return [
      stage.getPointerPosition().x / scale - stage.x() / scale,
      stage.getPointerPosition().y / scale - stage.y() / scale
    ]
  }

  const resetEdgeCreation = () => {
    if (editor.ghostEdge !== null) {
      //editor.ghostEdge.destroy()
    }
    sourceVertex = null
    editor.ghostEdge = null
    points = []
    graph.batchDraw()
  }

  const onMouseDown = (event) => {
    if (event.target.parent instanceof Vertex) {
      const vertex = event.target.parent
      if (!vertex.isSelected) {
        sourceVertex = vertex
      } else {
        resetEdgeCreation()
      }
    }
  }

  const onMouseMove = (event) => {
    if (sourceVertex !== null && event.evt.which === 1) {
      if (sourceVertex !== event.target.parent) {
        if (editor.ghostEdge === null) {
          editor.ghostEdge = new Arrow(ghostEdgeOptions)
          points = mousePointTo()
          editor.ghostEdge.points(points)
          graph.add(editor.ghostEdge)
        } else {
          editor.ghostEdge.points(points.concat(mousePointTo()))
        }
        graph.batchDraw()
      }
    } else if (editor.ghostEdge !== null) {
      editor.ghostEdge.points(points.concat(mousePointTo()))
      graph.batchDraw()
    } else {
      resetEdgeCreation()
    }
  }

  const onMouseUp = (event) => {
    if (editor.ghostEdge !== null) {
      if (event.target.parent instanceof Vertex) {
        console.log('create edge')
        resetEdgeCreation()
      } else {
        points.push(...mousePointTo())
      }
    }
  }

  stage.on('click tap', (event) => {
    if (editor.ghostEdge !== null) {
      points.push(...mousePointTo())
    }
  })

  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape' && editor.ghostEdge !== null && editor.ghostEdge.points().length > 4) {
        resetEdgeCreation()
      }
    },
    true
  )

  stage.on('mousedown.edge', onMouseDown)
  stage.on('mousemove.edge', onMouseMove)
  stage.on('mouseup.edge', onMouseUp)
}

export default createEdge
