import {debounce} from 'debounce';

const deleteSelected = cytoscape => {
  document.addEventListener(
    'keydown',
    debounce(event => {
      if (event.key === 'Backspace') {
        cytoscape.remove(':selected');
      }
    }, true),
    200,
  );
};

export default deleteSelected;
