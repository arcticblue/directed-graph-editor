const moveVertex = (editor) => {
  const stage = editor.stage
  const graph = editor.graph

  let prevoiusPointerPosition = {}

  const onMouseDown = (event) => {
    const vertex = event.target.parent
    if (vertex.selected) {
      const { x, y } = event.evt
      prevoiusPointerPosition = { x, y }
    }
  }

  const onMouseMove = (event) => {
    if (event.evt.which === 1 && Object.entries(prevoiusPointerPosition).length !== 0) {
      const { x, y } = event.evt
      const currentPointerPosition = { x, y }
      const vector = editor.calculateVector(prevoiusPointerPosition, currentPointerPosition)
      editor.selected.forEach((vertex) => vertex.move(vector))
      graph.batchDraw()
      prevoiusPointerPosition = currentPointerPosition
    }
  }

  const onMouseUp = () => {
    prevoiusPointerPosition = {}
  }

  const createEventHandlers = (vertex) => {
    const node = vertex.node
    node.on('mousedown.move', onMouseDown)
    stage.on('mousemove.move', onMouseMove)
    node.on('mouseup.move', onMouseUp)
  }

  const removeEventHandlers = (vertex) => {
    const node = vertex.node
    node.off('.move')
    stage.off('.move')
  }

  graph.on('select', createEventHandlers)
  graph.on('unselect', removeEventHandlers)
}

export default moveVertex
