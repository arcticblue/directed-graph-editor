const zoomGraph = (fromState, toState, { eventPayload: { editor, event } }, scaleBy = 1.045) => {
  event.evt.preventDefault()
  const stage = editor.stage
  const scale = stage.scaleX()
  const mousePointTo = {
    x: stage.getPointerPosition().x / scale - stage.x() / scale,
    y: stage.getPointerPosition().y / scale - stage.y() / scale
  }
  const newScale = event.evt.deltaY > 0 ? scale * scaleBy : scale / scaleBy
  stage.scale({ x: newScale, y: newScale })
  const newPosition = {
    x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
    y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
  }
  stage.position(newPosition)
  stage.fire('zoom')
  stage.batchDraw()
}

export { zoomGraph }
