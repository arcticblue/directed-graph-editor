let prevoiusPointerPosition = {}

const moveVertices = (
  fromState,
  toState,
  {
    eventPayload: {
      editor,
      event: {
        evt: { x, y }
      }
    }
  }
) => {
  const currentPointerPosition = { x, y }
  const vector = editor.calculateVector(prevoiusPointerPosition, currentPointerPosition)
  editor.selected.forEach((vertex) => {
    vertex.moveToTop()
    vertex.move(vector)
    editor.edges
      .filter((edge) => edge.source === vertex)
      .forEach((edge) => {
        edge.points = [edge.points[0] + vector.x, edge.points[1] + vector.y].concat(edge.points.slice(2))
      })
    editor.edges
      .filter((edge) => edge.target === vertex)
      .forEach((edge) => {
        const [ex, ey] = edge.points.slice(-2)
        edge.points = edge.points.slice(0, -2).concat([ex + vector.x, ey + vector.y])
      })
  })
  editor.graph.batchDraw()
  prevoiusPointerPosition = currentPointerPosition
}

const startMoveVertices = (
  fromState,
  toState,
  {
    eventPayload: {
      event: {
        evt: { x, y }
      }
    }
  }
) => {
  prevoiusPointerPosition = { x, y }
}

export { moveVertices, startMoveVertices }
