/*
import {debounce} from 'debounce';

const createEdge = cytoscape => {
  let sourceElement = null;
  let isCreatingEdge = false;
  let ghostNode = null;
  let ghostEdge = null;

  const startEdge = event => {
    console.log('start edge');
    cytoscape.autounselectify(true);
    cytoscape.autoungrabify(true);
 
    ghostNode = cytoscape.add({
      group: 'nodes',
      data: {
        id: 'ghostNode',
        name: ''
      },
      renderedPosition: event.renderedPosition
    });
    ghostEdge = cytoscape.add({
      group: 'edges',
      data: {
        id: 'ghostEdge',
        name: '',
        source: sourceElement.id(),
        target: ghostNode.id()
      }
    });
  
  };

  const updateSegment = debounce(event => {
    console.log('update edge');
    //ghostNode.renderedPosition(event.renderedPosition);
  }, 50);

  const createSegment = () => {
    console.log('create segment');
  };

  const createEdge = event => {
    console.log('create edge');
    cytoscape.autounselectify(false);
    cytoscape.autoungrabify(false);
   
    cytoscape.add({
      group: 'edges',
      data: {
        id: 'newEdge' + ghostEdge.source().id() + event.target.id() + new Date(),
        name: '',
        source: ghostEdge.source().id(),
        target: event.target.id()        
      },
    });
    cytoscape.remove(ghostEdge)
    cytoscape.remove(ghostNode)
    
    sourceElement = ghostEdge = ghostNode = null;
  };

  document.addEventListener(
    'keydown',
    debounce(event => {
      if (event.key === 'Escape' && isCreatingEdge) {
        if (sourceElement) {
          sourceElement.grabify();
        }
        isCreatingEdge = false;
        sourceElement = null;
        cytoscape.autounselectify(false);
        cytoscape.autoungrabify(false);
      }
    }, true),
    200,
  );

  cytoscape.on('mousedown', 'node', event => {
    if (!event.target.selected() && !isCreatingEdge) {
      sourceElement = event.target;
      sourceElement.ungrabify();
    }
  });

  cytoscape.on('mousemove', event => {
    if (cytoscape === event.target) {
      if (sourceElement) {
        if (!isCreatingEdge) {
          isCreatingEdge = true;
          startEdge(event);
        } else {
          updateSegment(event);
        }
      }
    }
  });

  cytoscape.on('tap', event => {
    if (isCreatingEdge) {
      event.stopPropagation();
      cytoscape.autounselectify(true);
      cytoscape.autoungrabify(true);
    } 
  });

  cytoscape.on('mouseup', event => {
    if (isCreatingEdge) {
      if (cytoscape !== event.target && event.target.isNode()) {
        createEdge(event);
        isCreatingEdge = false;
        sourceElement = null;
      } else {
        createSegment();
      }
    } else {
      if (sourceElement) {
        sourceElement.grabify();
      }
      sourceElement = null;
    }
  });
};

export default createEdge;
*/
