import uuid from 'uuid/v1'
import { Edge } from '../../model'

let ghostEdge = null
let points = []

const toArray = ({ x, y }) => {
  return [x, y]
}

const reset = () => {
  points = []
  if (ghostEdge) {
    ghostEdge.destroy()
    ghostEdge = null
  }
}

/*
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
*/
const createEdge = (fromState, toState, { eventPayload: { editor, event } }) => {
  const target = event.target.parent
  editor.graph.add(new Edge(uuid(), 'name', ghostEdge.source, target, ghostEdge.points))
  reset()
}

const createGhostEdgePoint = (fromState, toState, { eventPayload: { editor } }) => {
  points.push(...toArray(editor.calculatePosition()))
}

const createGhostEdge = (fromState, toState, { eventPayload: { editor, event } }) => {
  const source = event.target.parent
  ghostEdge = new Edge(uuid(), null, event.target.parent, null, [source.center.x, source.center.y])
  points = [source.center.x, source.center.y]
  ghostEdge.points = points
  editor.graph.add(ghostEdge)
}

const isComplexEdge = () => {
  return ghostEdge.points.length > 4
}

const isSimpleEdge = () => {
  return !isComplexEdge()
}

const resetGhostEdge = (fromState, toState, { eventPayload: { editor } }) => {
  if (!isSimpleEdge()) {
    reset()
    editor.graph.batchDraw()
  }
}

const updateGhostEdge = (fromState, toState, { eventPayload: { editor, event } }) => {
  ghostEdge.points = points.concat(toArray(editor.calculatePosition()))
  editor.graph.batchDraw()
}

export { createEdge, createGhostEdgePoint, createGhostEdge, isComplexEdge, isSimpleEdge, resetGhostEdge, updateGhostEdge }
