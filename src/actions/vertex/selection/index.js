import { Rect, Util } from 'konva'

const boxOptions = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  stroke: 'black',
  strokeScaleEnabled: false
}

let selectionBox = null

const createSelectionBox = (fromState, toState, { eventPayload: { editor } }) => {
  if (selectionBox) {
    selectionBox.destroy()
  }

  selectionBox = new Rect(boxOptions)
  selectionBox.listening(false)
  selectionBox.visible(false)
  editor.graph.add(selectionBox)

  const stage = editor.stage
  const scale = stage.scaleX()
  const mousePointTo = {
    x: stage.getPointerPosition().x / scale - stage.x() / scale,
    y: stage.getPointerPosition().y / scale - stage.y() / scale
  }
  selectionBox.position(mousePointTo)
  selectionBox.size({ width: 0, height: 0 })
  selectionBox.visible(true)
}

const selectSelectionBox = (
  fromState,
  toState,
  {
    eventPayload: {
      editor,
      event: {
        evt: { shiftKey }
      }
    }
  }
) => {
  const stage = editor.stage
  const selectionRect = selectionBox.getClientRect()
  editor.vertices.forEach((vertex) => {
    if (Util.haveIntersection(selectionRect, vertex.node.getClientRect())) {
      if (!vertex.selected) {
        vertex.selected = true
      }
    } else if (!shiftKey && vertex.selected) {
      vertex.selected = false
    }
  })
  selectionBox.destroy()
  stage.batchDraw()
}

const updateSelectionBox = (fromState, toState, { eventPayload: { editor, event } }) => {
  if (selectionBox) {
    const stage = editor.stage
    const scale = stage.scaleX()
    const mousePointTo = {
      x: stage.getPointerPosition().x / scale - stage.x() / scale,
      y: stage.getPointerPosition().y / scale - stage.y() / scale
    }
    selectionBox.size({
      width: mousePointTo.x - selectionBox.position().x,
      height: mousePointTo.y - selectionBox.position().y
    })
    stage.batchDraw()
  }
}

export { createSelectionBox, selectSelectionBox, updateSelectionBox }
