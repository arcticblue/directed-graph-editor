const createNode = cytoscape => {
  cytoscape.on('tap', event => {
    if (
      !event.isPropagationStopped() &&
      cytoscape === event.target &&
      !cytoscape.$(':selected').length
    ) {
      const position = event.renderedPosition;
      cytoscape.add([
        {
          group: 'nodes',
          data: {
            // temp just so it should be more unique
            id: 'testid' + position.x + new Date(),
            name: '' + cytoscape.nodes().length,
          },
          renderedPosition: position,
        },
      ]);
    }
  });
};

export default createNode;
