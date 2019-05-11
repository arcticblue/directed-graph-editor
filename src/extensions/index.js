//import createEdge from './create-edge';
import createNode from './create-node';
import deleteSelected from './delete-selected';
import resizeNode from './resize-node';

const register = cytoscape => {
  if (!cytoscape) {
    return;
  }
  cytoscape('core', 'enableExtensions', function() {
    //createEdge(this);
    createNode(this);
    deleteSelected(this);
    resizeNode(this);
  });
};

if (typeof cytoscape !== 'undefined') {
  register(cytoscape);
}

export default register;
