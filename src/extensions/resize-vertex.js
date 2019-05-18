const resizeVertex = (editor) => {
  const stage = editor.stage
  const graph = editor.graph

  const resizeVertex = (event) => {
    const node = event.currentTarget
    const vertex = event.currentTarget.parent
    node.on('transform', (event) => {
      /*
      let { x, y } = node.position()
      vertex.move({
        x: Math.min(x, 0),
        y: Math.min(y, 0)
      })
*/
      const { x: nodeX, y: nodeY } = node.absolutePosition()
      const { clientX, clientY } = event.evt
      console.log({
        clientX,
        nodeX,
        width: node.width() * node.scaleX(),
        clientY,
        nodeY,
        height: node.height() * node.scaleY()
      })

      /*
      node.setAttrs({
        width: Math.max(node.width() * node.scaleX(), 1),
        height: Math.max(node.height() * node.scaleY(), 1),
        scaleX: 1,
        scaleY: 1,
        //x: 0,
        //y: 0
      });
      vertex.updateTextPosition()
*/
    })
  }

  graph.on('select', (e) => {
    console.log('select', e)
  })

  graph.on('unselect', (e) => {
    console.log('unselect', e)
  })
}

export default resizeVertex
