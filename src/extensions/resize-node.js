import {debounce} from 'debounce';

const resizeNode = cytoscape => {
  cytoscape.on(
    'select',
    'node',
    debounce(event => {
      console.log('show handles');
    }),
    200,
  );
};

export default resizeNode;
