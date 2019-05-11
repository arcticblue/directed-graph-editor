const resizeNode = (cytoscape) => {
  cytoscape.on('select', 'node', (event) => {
    console.log('show handles')
  })
}

export default resizeNode
