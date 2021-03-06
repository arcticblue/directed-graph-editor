import Finity from 'finity'
import { isEdge, isSelected, isVertex, isStage, hasSelectedVertices, dragDistance, resetDragDistance, isText } from '../actions/common'
import { zoomGraph } from '../actions/stage'
import { createVertex, deleteSelected, selectVertex, unselectVertices } from '../actions/vertex'
import { createSelectionBox, selectSelectionBox, updateSelectionBox } from '../actions/vertex/selection'
import { startResize, resize } from '../actions/vertex/resize'
import { moveVertices, startMoveVertices } from '../actions/vertex/move'
import { createEdge, createGhostEdgePoint, createGhostEdge, isComplexEdge, isSimpleEdge, resetGhostEdge, updateGhostEdge } from '../actions/edge'

export default class EventHandler {
  constructor(editor) {
    this.machine = this.registerEventListeners(editor, this.createStateMachine())
  }

  createStateMachine = () => {
    // prettier-ignore
    return Finity.configure()
        .initialState('stage')
          .on('dblclick')
            .transitionTo('vertex').withCondition(isStage).withAction(createVertex)
          .on('mouseover')
            .transitionTo('vertex').withCondition(isVertex)
            .transitionTo('edge').withCondition(isEdge)
          .on('mousedown')
            .internalTransition().withAction(resetDragDistance)
          .on('mousemove')
            .transitionTo('selectionbox').withCondition(dragDistance).withAction(createSelectionBox)
          .on('wheel')
            .internalTransition().withAction(zoomGraph)
        .state('vertex')
          .on('mouseover')
            .transitionTo('stage').withCondition(isStage)
            .transitionTo('edge').withCondition(isEdge)
          .on('mousedown')
            .internalTransition().withAction(resetDragDistance)
          .on('mousemove')
            .transitionTo('createEdge').withCondition(dragDistance).withAction(resetDragDistance).withAction(createGhostEdge)
          .on('click')
            .transitionTo('selected').withCondition((event) => !isText(event)).withAction(selectVertex).withAction(resetDragDistance)
          .on('wheel')
            .internalTransition().withAction(zoomGraph)
          .on('dblclick')
            .transitionTo('edit').withCondition(isText)
        .state('edge')
          .on('mouseover')
            .transitionTo('stage').withCondition(isStage)
            .transitionTo('vertex').withCondition(isVertex)
          .on('wheel')
            .internalTransition().withAction(zoomGraph)
        .state('createEdge')
          .on('mousemove')
            .internalTransition().withAction(updateGhostEdge)
          .on('mouseup')
            .internalTransition().withCondition(isStage).withAction(createGhostEdgePoint)
            .transitionTo('vertex').withCondition(isVertex).withCondition(isSimpleEdge).withAction(createEdge)
          .on('click')
            .transitionTo('vertex').withCondition(isVertex).withAction(createEdge)
          .on('keydown')
            .transitionTo('stage').withCondition((event) => isComplexEdge() && isStage(event)).withAction(resetGhostEdge)
            .transitionTo('vertex').withCondition((event) => isComplexEdge() && isVertex(event)).withAction(resetGhostEdge)
            .transitionTo('edge').withCondition((event) => isComplexEdge() && isEdge(event)).withAction(resetGhostEdge)
        .state('selected')
          .on('click')
            .internalTransition().withCondition(isVertex).withAction(selectVertex)
            .transitionTo('stage').withCondition(isStage).withAction(unselectVertices)
          .on('mousedown')
            .internalTransition().withCondition(isStage).withAction(resetDragDistance)
            .transitionTo('moveVertices').withCondition(isVertex).withCondition(isSelected).withAction(startMoveVertices) 
          .on('mousemove')
            .transitionTo('selectionbox').withCondition(dragDistance).withAction(createSelectionBox)
          .on('keydown')
            .transitionTo('stage').withCondition(isStage).withAction(deleteSelected)
            .transitionTo('stage').withCondition(isVertex).withCondition(isSelected).withAction(deleteSelected)
            .transitionTo('vertex').withCondition(isVertex).withAction(deleteSelected)
            .transitionTo('edge').withCondition(isEdge).withAction(deleteSelected)
          .on('resizestart')
            .internalTransition().withAction(startResize)
          .on('resize')
            .internalTransition().withAction(resize)    
          .on('wheel')
            .internalTransition().withAction(zoomGraph) 
        .state('selectionbox')
          .on('mousemove')
            .internalTransition().withAction(updateSelectionBox)
          .on("mouseup")
            .transitionTo('selected').withCondition(isVertex).withAction(selectSelectionBox)
            .internalTransition().withCondition(isStage).withAction(selectSelectionBox)
          .on('click')
            .transitionTo('selected').withCondition(hasSelectedVertices)
            .transitionTo('stage')
        .state('moveVertices')
          .on('mousemove')
            .internalTransition().withAction(moveVertices)
          .on("click")
            .transitionTo('selected')
        .state('edit')
          .on('click')
            .transitionTo('stage').withCondition(isStage)
        .global()
          .onStateChange((oldState, newState, context) =>
            console.log(`Changing state from '${oldState}' to '${newState}'`, context)
          )
          .onUnhandledEvent((event, state) => {
            //console.log(`Unhandled event '${event}' in state '${state}'.`)
          })
      .start();
  }

  registerEventListeners = (editor, machine) => {
    const stage = editor.stage
    stage.on('dblclick', (event) => machine.handle('dblclick', { editor, event }))
    stage.on('click', (event) => machine.handle('click', { editor, event }))
    stage.on('mousedown', (event) => machine.handle('mousedown', { editor, event }))
    stage.on('mousemove', (event) => machine.handle('mousemove', { editor, event }))
    stage.on('mouseup', (event) => machine.handle('mouseup', { editor, event }))
    stage.on('mouseover', (event) => machine.handle('mouseover', { editor, event }))
    stage.on('mouseout', (event) => machine.handle('mouseout', { editor, event }))
    stage.on('wheel', (event) => machine.handle('wheel', { editor, event }))
    stage.on('resizestart', (vertex) => machine.handle('resizestart', { editor, vertex }))
    stage.on('resize', (vertex) => machine.handle('resize', { editor, vertex }))
    document.addEventListener('keydown', (event) => machine.handle('keydown', { editor, event }), true)
    return machine
  }
}
