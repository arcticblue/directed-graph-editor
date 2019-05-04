import createNode from './create-node';
import deleteSelected from './delete-selected';

const register = cytoscape => {
  if (!cytoscape) {
    return;
  }
  cytoscape('core', 'enableExtensions', function() {
    createNode(this);
    deleteSelected(this);
  });
};

if (typeof cytoscape !== 'undefined') {
  register(cytoscape);
}

export default register;
