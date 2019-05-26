import uuid from 'uuid/v1'
import { Rect } from 'konva'
import { Edge, Vertex } from '../model'

const createEdge = (editor) => {
  const stage = editor.stage
  const graph = editor.graph

  let source = null
  let points = []

  const mousePointTo = () => {
    const mousePoint = editor.calculatePosition()
    return [mousePoint.x, mousePoint.y]
  }

  const resetEdgeCreation = () => {
    stage.off('mousemove.edge')
    stage.off('mouseup.edge')
    if (editor.ghostEdge !== null) {
      editor.ghostEdge.destroy()
    }
    source = null
    setTimeout(() => {
      editor.ghostEdge = null
    }, 1)
    points = []
    graph.batchDraw()
  }

  const onMouseDown = (event) => {
    if (event.target.parent instanceof Vertex) {
      const vertex = event.target.parent
      if (!vertex.selected && source === null) {
        source = vertex
        stage.on('mousemove.edge', onMouseMove)
        stage.on('mouseup.edge', onMouseUp)
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
        const { x: tx, y: ty } = target.center
        const theta = editor.calculateAngle(...points.slice(-2).concat([tx, ty]))
        points = points.slice(0, -2).concat([tx - 28 * Math.cos(theta), ty - 28 * Math.sin(theta)])
        const { x: sx, y: sy } = source.center
        if (points.length > 2) {
          const alpha = editor.calculateAngle(...points.slice(2, 4), ...points.slice(0, 2))
          editor.ghostEdge.points = [sx - 25 * Math.cos(alpha), sy - 25 * Math.sin(alpha)].concat(points.slice(2))
        } else {
          const alpha = editor.calculateAngle(tx, ty, sx, sy)
          editor.ghostEdge.points = [sx - 25 * Math.cos(alpha), sy - 25 * Math.sin(alpha)].concat(points)
        }
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
      if (event.key === 'Escape' && editor.ghostEdge !== null && editor.ghostEdge.points.length > 2) {
        resetEdgeCreation()
      }
    },
    true
  )

  stage.on('mousedown.edge', onMouseDown)
}

export default createEdge
