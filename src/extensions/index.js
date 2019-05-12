import $ from 'jquery'
import { Stage } from 'konva'
//import createEdge from './create-edge';
import createNode from './create-node'
import deleteSelected from './delete-selected'
import resizeNode from './resize-node'

const prepareStage = (cytoscape) => {
  console.log(cytoscape.container())

  const canvasElementId = 'XY123'
  const $canvasElement = $('<div id="XY123"></div>')
  const $container = $(cytoscape.container())
  $container.append($canvasElement)

  $canvasElement
    .attr('height', $container.height())
    .attr('width', $container.width())
    .css({
      position: 'absolute',
      top: 0,
      left: 0,
      'z-index': '999'
    })

  const stage = new Stage({
    container: canvasElementId, // id of container <div>
    width: $container.width(),
    height: $container.height()
  })
  return stage
}

const register = (cytoscape) => {
  if (!cytoscape) {
    return
  }
  cytoscape('core', 'enableExtensions', function() {
    const stage = prepareStage(this)
    //createEdge(this);
    createNode(this)
    deleteSelected(this)
    resizeNode(this, stage)
  })
}

if (typeof cytoscape !== 'undefined') {
  register(cytoscape)
}

export default register
