const deleteSelected = (editor) => {
  const stage = editor.stage

  const doDeleteSelected = (event) => {
    if (event.key === 'Backspace') {
      editor.selected.forEach((vertex) => {
        editor.edges
          .filter((edge) => edge.source === vertex || edge.target === vertex)
          .forEach((edge) => edge.destroy())
        vertex.destroy()
      })
      stage.batchDraw()
    }
  }

  document.addEventListener('keydown', doDeleteSelected, true)
}

export default deleteSelected
