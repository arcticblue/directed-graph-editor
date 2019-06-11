import { Stage } from 'konva'
import { Edge, Vertex } from '../../../model'

const isEdge = ({ eventPayload: { editor, event } }) => {
  if (!event.evt) {
    return editor.stage.getIntersection(editor.stage.getPointerPosition(), 'Group') instanceof Edge
  }
  return event.target.parent instanceof Edge
}

const isSelected = ({ eventPayload: { editor, event } }) => {
  if (!event.evt) {
    const element = editor.stage.getIntersection(editor.stage.getPointerPosition(), 'Group')
    if (element) {
      return element.selected === true
    }
    return false
  }
  return event.target.parent.selected === true
}

const isStage = ({ eventPayload: { editor, event } }) => {
  if (!event.evt) {
    return editor.stage.getIntersection(editor.stage.getPointerPosition()) === null
  }
  return event.target instanceof Stage
}

const isVertex = ({ eventPayload: { editor, event } }) => {
  if (!event.evt) {
    return editor.stage.getIntersection(editor.stage.getPointerPosition(), 'Group') instanceof Vertex
  }
  return event.target.parent instanceof Vertex
}

const hasSelectedVertices = ({ eventPayload: { editor } }) => {
  return editor.selected.length > 0
}

let startDragPosition = null

const resetDragDistance = (
  fromState,
  toState,
  {
    eventPayload: {
      editor,
      event: {
        evt: { buttons }
      }
    }
  }
) => {
  if (fromState === toState) {
    startDragPosition = editor.stage.getPointerPosition()
  } else {
    startDragPosition = null
  }
}

const dragDistance = ({
  eventPayload: {
    editor,
    event: {
      evt: { buttons, x, y }
    }
  }
}) => {
  if (buttons !== 1) {
    startDragPosition = null
  }
  return !!startDragPosition && editor.calculateDistance(startDragPosition, { x, y }) > 2
}

export { isEdge, isSelected, isStage, isVertex, hasSelectedVertices, resetDragDistance, dragDistance }
