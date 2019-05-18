const deleteSelected = (editor) => {
  const stage = editor.stage

  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Backspace') {
        editor.selected.forEach((element) => {
          element.destroy()
        })
        stage.batchDraw()
      }
    },
    true
  )
}

export default deleteSelected
