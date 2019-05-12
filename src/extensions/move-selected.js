const moveSelected = (cytoscape) => {
  cytoscape.on('select', 'node', (event) => {
    event.target.grabify()
  })
  cytoscape.on('unselect', 'node', (event) => {
    event.target.ungrabify()
  })
}

export default moveSelected
