import uuid from 'uuid/v1'
import { Stage, Circle, Line } from 'konva'
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

// y = mx+b
// x = (y - b)/m
// m = (y2 - y1)/(x2 - x1)
// b = y-mx

const calculateIntersection = (x1, y1, x2, y2, width, height) => {
  const m = (y2 - y1) / (x2 - x1)
  const b = y1 - m * x1
  const theta = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  if (theta > -45 && theta < 45) {
    return {
      x: x1 + width / 2,
      y: m * (x1 + width / 2) + b
    }
  }
  if (theta > -135 && theta < -45) {
    return {
      x: (y1 - height / 2 - b) / m,
      y: y1 - height / 2
    }
  }
  if (theta < -135 || theta > 135) {
    return {
      x: x1 - width / 2,
      y: m * (x1 - width / 2) + b
    }
  }
  if (theta < 135 && theta > 45) {
    return {
      x: (y1 + height / 2 - b) / m,
      y: y1 + height / 2
    }
  }
}

const createEdge = (fromState, toState, { eventPayload: { editor, event } }) => {
  const target = event.target.parent
  const { x: sx, y: sy } = ghostEdge.source.center
  const { x: tx, y: ty } = target.center
  const { width: sw, height: sh } = ghostEdge.source.node.size()
  const { width: tw, height: th } = target.node.size()
  const [fx, fy] = ghostEdge.points.slice(2, 4)
  const [lx, ly] = ghostEdge.points.slice(-4, -2)
  const sp = calculateIntersection(sx, sy, fx, fy, sw, sh)
  const tp = calculateIntersection(tx, ty, lx, ly, tw + 4.5, th + 4.5)

  editor.graph.add(new Edge(uuid(), 'name', ghostEdge.source, target, toArray(sp).concat(ghostEdge.points.slice(2, -2).concat(toArray(tp)))))
  editor.graph.batchDraw()
  reset()
}

const createGhostEdgePoint = (fromState, toState, { eventPayload: { editor } }) => {
  points.push(...toArray(editor.calculatePosition()))
}

const createGhostEdge = (fromState, toState, { eventPayload: { editor, event } }) => {
  const source = event.target.parent
  ghostEdge = new Edge(uuid(), null, source, null, [source.center.x, source.center.y])
  ghostEdge.dash = [4, 1]
  ghostEdge.stroke = 'gray'
  ghostEdge.fill = 'gray'
  points = [source.center.x, source.center.y]
  ghostEdge.points = points
  ghostEdge.hide()
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
  if (event.target instanceof Stage && !ghostEdge.isVisible()) {
    console.log('calculate start point', ghostEdge.source.node)

    ghostEdge.show()
  }
  ghostEdge.points = points.concat(toArray(editor.calculatePosition()))
  editor.graph.batchDraw()
}

export { createEdge, createGhostEdgePoint, createGhostEdge, isComplexEdge, isSimpleEdge, resetGhostEdge, updateGhostEdge }
