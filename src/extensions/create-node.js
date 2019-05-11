import uuid from 'uuid/v1'

const createNode = (cytoscape) => {
  const shouldCreateNode = (event) => {
    return !event.isPropagationStopped() && cytoscape === event.target && !cytoscape.$(':selected').length
  }

  const doCreateNode = (event) => {
    cytoscape.add([
      {
        group: 'nodes',
        data: {
          id: uuid(),
          name: '' + cytoscape.nodes().length
        },
        renderedPosition: event.renderedPosition
      }
    ])
  }

  cytoscape.on('tap', (event) => {
    if (shouldCreateNode(event)) {
      doCreateNode(event)
    }
  })
}

export default createNode
