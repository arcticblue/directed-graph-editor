const deleteSelected = cytoscape => {
  document.addEventListener(
    'keydown',
    event => {
      if (event.key === 'Backspace') {
        cytoscape.remove(':selected');
      }
    },
    true,
  );
};

export default deleteSelected;
