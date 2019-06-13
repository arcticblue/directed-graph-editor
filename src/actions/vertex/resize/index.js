let attributes = {}

const startResize = (fromState, toState, { eventPayload: { editor, vertex } }) => {
  const node = vertex.node
  attributes = {
    x: node.x(),
    y: node.y(),
    width: node.width(),
    height: node.height()
  }
}

const resize = (fromState, toState, { eventPayload: { editor, vertex: resizeVertex } }) => {
  const targetNode = resizeVertex.node
  const dx = targetNode.width() * targetNode.scaleX() - attributes.width
  const dy = targetNode.height() * targetNode.scaleY() - attributes.height
  const px = targetNode.x() - attributes.x
  const py = targetNode.y() - attributes.y

  editor.selected.forEach((vertex) => {
    const node = vertex.node
    if (resizeVertex === vertex) {
      const width = node.width() * node.scaleX()
      const height = node.height() * node.scaleY()
      node.setAttrs({
        width: Math.max(width, 10),
        height: Math.max(height, 10),
        scaleX: 1,
        scaleY: 1,
        x: width < 10 ? attributes.x : node.x(),
        y: height < 10 ? attributes.y : node.y()
      })
    } else {
      const width = (node.width() + dx) * node.scaleX()
      const height = (node.height() + dy) * node.scaleY()
      vertex.setAttrs({
        x: vertex.x() + (width > 10 ? px : 0),
        y: vertex.y() + (height > 10 ? py : 0)
      })
      node.setAttrs({
        width: Math.max(width, 10),
        height: Math.max(height, 10),
        scaleX: 1,
        scaleY: 1
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

export { startResize, resize }
