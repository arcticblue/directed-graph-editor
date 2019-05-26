const resizeVertex = (editor) => {
  const graph = editor.graph

  let attributes = {}

  const resize = (event) => {
    const targetNode = event.currentTarget
    const dx = targetNode.width() * targetNode.scaleX() - attributes.width
    const dy = targetNode.height() * targetNode.scaleY() - attributes.height
    const px = targetNode.x() - attributes.x
    const py = targetNode.y() - attributes.y

    editor.selected.forEach((vertex) => {
      const node = vertex.node
      if (event.currentTarget.parent === vertex) {
        vertex.setAttrs({
          x: vertex.x() + Math.min(node.x(), 0),
          y: vertex.y() + Math.min(node.y(), 0)
        })
        node.setAttrs({
          width: Math.max(node.width() * node.scaleX(), 10),
          height: Math.max(node.height() * node.scaleY(), 10),
          scaleX: 1,
          scaleY: 1,
          x: Math.max(node.x(), 0),
          y: Math.max(node.y(), 0)
        })
      } else {
        vertex.setAttrs({
          x: vertex.x() + px,
          y: vertex.y() + py
        })
        node.setAttrs({
          width: Math.max((node.width() + dx) * node.scaleX(), 10),
          height: Math.max((node.height() + dy) * node.scaleY(), 10),
          scaleX: 1,
          scaleY: 1,
          x: Math.max(node.x(), 0),
          y: Math.max(node.y(), 0)
        })
      }
      vertex.updateTextPosition()
    })
    attributes = {
      x: targetNode.x(),
      y: targetNode.y(),
      width: targetNode.width(),
      height: targetNode.height()
    }
  }

  graph.on('select', (vertex) => {
    vertex.node.on('transformstart', (event) => {
      const node = event.currentTarget
      attributes = {
        x: node.x(),
        y: node.y(),
        width: node.width(),
        height: node.height()
      }
    })
    vertex.node.on('transform', resize)
  })

  graph.on('unselect', (vertex) => {
    vertex.node.off('transform')
  })
}

export default resizeVertex
