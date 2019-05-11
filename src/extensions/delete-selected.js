const deleteSelected = (cytoscape) => {
  document.addEventListener(
    'keydown',
    (event) => {
      console.log(document.activeElement)
      if (event.key === 'Backspace') {
        cytoscape.remove(':selected')
      }
    },
    true
  )
}

export default deleteSelected
