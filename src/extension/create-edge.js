import uuid from 'uuid/v1'
import { Edge, Vertex } from '../model'

const createEdge = (editor) => {
  const stage = editor.stage
  const graph = editor.graph

  let source = null
  let points = []

  const mousePointTo = () => {
    const scale = stage.scaleX()
    return [
      stage.getPointerPosition().x / scale - stage.x() / scale,
      stage.getPointerPosition().y / scale - stage.y() / scale
    ]
  }

  const resetEdgeCreation = () => {
    if (editor.ghostEdge !== null) {
      editor.ghostEdge.destroy()
    }
    source = null
    editor.ghostEdge = null
    points = []
    graph.batchDraw()
  }

  const onMouseDown = (event) => {
    if (event.target.parent instanceof Vertex) {
      const vertex = event.target.parent
      if (!vertex.selected) {
        source = vertex
      } else {
        resetEdgeCreation()
      }
    }
  }

  const onMouseMove = (event) => {
    if (source !== null && event.evt.which === 1) {
      if (source !== event.target.parent) {
        if (editor.ghostEdge === null) {
          editor.ghostEdge = new Edge(uuid())
          points = [source.center.x, source.center.y]
          editor.ghostEdge.points = points
          graph.add(editor.ghostEdge)
        } else {
          editor.ghostEdge.points = points.concat(mousePointTo())
        }
        graph.batchDraw()
      }
    } else if (editor.ghostEdge !== null) {
      editor.ghostEdge.points = points.concat(mousePointTo())
      graph.batchDraw()
    } else {
      resetEdgeCreation()
    }
  }

  const onMouseUp = (event) => {
    if (editor.ghostEdge !== null) {
      if (event.target.parent instanceof Vertex) {
        const target = event.target.parent
        console.log('create edge', event.target.parent.center)
        const p = event.target.parent.center
        editor.ghostEdge.points = points.concat([p.x, p.y])

        graph.add(new Edge(uuid(), 'name', source, target, editor.ghostEdge.points))

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
      if (event.key === 'Escape' && editor.ghostEdge !== null && editor.ghostEdge.points.length > 4) {
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
