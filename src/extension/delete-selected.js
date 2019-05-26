const deleteSelected = (editor) => {
  const stage = editor.stage

  const doDeleteSelected = (event) => {
    if (event.key === 'Backspace') {
      editor.selected.forEach((element) => {
        element.destroy()
      })
      stage.batchDraw()
    }
  }

  document.addEventListener('keydown', doDeleteSelected, true)
}

export default deleteSelected
