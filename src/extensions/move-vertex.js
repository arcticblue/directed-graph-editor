const moveVertex = (editor) => {
  const stage = editor.stage
  const graph = editor.graph

  let cursorPoint = {}

  const onMouseDown = (event) => {
    const vertex = event.target.parent
    if (vertex.selected) {
      cursorPoint = { x: event.evt.x, y: event.evt.y }
    }
  }

  const onMouseMove = (event) => {
    if (event.evt.which === 1 && Object.entries(cursorPoint).length !== 0) {
      const point = { x: event.evt.x, y: event.evt.y }
      const delta = { x: point.x - cursorPoint.x, y: point.y - cursorPoint.y }
      editor.selected.forEach((vertex) => vertex.move(delta))
      graph.batchDraw()
      cursorPoint = point
    }
  }

  const onMouseUp = (event) => {
    cursorPoint = {}
  }

  graph.on('select', (vertex) => {
    const node = vertex.node
    node.on('mousedown.move', onMouseDown)
    stage.on('mousemove.move', onMouseMove)
    node.on('mouseup.move', onMouseUp)
  })

  graph.on('unselect', (vertex) => {
    const node = vertex.node
    node.off('.move')
    stage.off('.move')
  })
}

export default moveVertex
