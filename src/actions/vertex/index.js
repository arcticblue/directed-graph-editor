import uuid from 'uuid/v1'
import { Vertex } from '../../model'

const createVertex = (fromState, toState, { eventPayload: { editor } }) => {
  const name = editor.vertices.length + ''
  editor.graph.add(new Vertex(uuid(), name, editor.calculatePosition()))
  editor.graph.batchDraw()
}

const deleteSelected = (fromState, toState, { eventPayload: { editor, event } }) => {
  if (event.key === 'Backspace') {
    editor.selected.forEach((vertex) => {
      editor.edges.filter((edge) => edge.source === vertex || edge.target === vertex).forEach((edge) => edge.destroy())
      vertex.destroy()
    })
    editor.stage.batchDraw()
  }
}

const selectVertex = (fromState, toState, { eventPayload: { editor, event } }) => {
  if (!event.evt.shiftKey) {
    editor.selected.forEach((vertex) => {
      if (vertex !== event.target.parent) {
        vertex.selected = false
      }
    })
    editor.graph.batchDraw()
  }
  const vertex = event.target.parent
  if (!vertex.selected) {
    vertex.selected = true
    editor.graph.batchDraw()
  }
}

const unselectVertices = (
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
  if (!shiftKey) {
    editor.selected.forEach((vertex) => {
      vertex.selected = false
    })
    editor.graph.batchDraw()
  }
}

export { createVertex, deleteSelected, selectVertex, unselectVertices }
