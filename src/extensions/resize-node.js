import { Group, Layer, Rect } from 'konva'

const resizeNode = (cytoscape, stage) => {
  const layer = new Layer()
  stage.add(layer)

  const handles = {}

  const calculatePosition = (node) => {
    const position = node.renderedPosition()
    const width = node.renderedOuterWidth()
    const height = node.renderedOuterHeight()
    return {
      x: position.x - width / 2,
      y: position.y - height / 2,
      width,
      height
    }
  }

  const calculateOffset = (node, group) => {
    const newPosition = calculatePosition(node)
    const oldPosition = group.position()
    return {
      x: newPosition.x - oldPosition.x,
      y: newPosition.y - oldPosition.y
    }
  }

  const attachEventHandlers = (direction, element) => {
    element.on('mouseenter', (event) => {
      const stage = event.target.getStage()
      if (stage) {
        stage.container().style.cursor = direction
      }
    })
    element.on('mouseleave', (event) => {
      const stage = event.target.getStage()
      if (stage) {
        stage.container().style.cursor = 'default'
      }
    })
    element.on('touchstart mousedown', (event) => {
      event.evt.stopImmediatePropagation()
    })

    return element
  }

  const createResizeHandles = (node) => {
    const { x, y, width, height } = calculatePosition(node)
    const group = new Group({ x, y })

    const options = {
      width: 9,
      height: 9,
      fill: 'black'
    }

    group.add(attachEventHandlers('nw-resize', new Rect({ ...options, x: -10, y: -10 })))
    group.add(attachEventHandlers('n-resize', new Rect({ ...options, x: width / 2 - 5, y: -10 })))
    group.add(attachEventHandlers('ne-resize', new Rect({ ...options, x: width + 1, y: -10 })))
    group.add(attachEventHandlers('w-resize', new Rect({ ...options, x: -10, y: height / 2 - 5 })))
    group.add(attachEventHandlers('sw-resize', new Rect({ ...options, x: -10, y: height + 1 })))
    group.add(attachEventHandlers('s-resize', new Rect({ ...options, x: width / 2 - 5, y: height + 1 })))
    group.add(attachEventHandlers('se-resize', new Rect({ ...options, x: width + 1, y: height + 1 })))
    group.add(attachEventHandlers('e-resize', new Rect({ ...options, x: width + 1, y: height / 2 - 5 })))

    handles[node.id()] = group
    layer.add(group).draw()
  }

  const updateResizeHandles = (node) => {
    const id = node.id()
    if (handles[id]) {
      handles[id].move(calculateOffset(node, handles[id]))
      layer.draw()
    }
  }

  const removeResizeHandles = (node) => {
    const id = node.id()
    if (handles[id]) {
      handles[id].destroy()
      delete handles[id]
      layer.draw()
    }
  }

  cytoscape.on('select', 'node', (event) => {
    createResizeHandles(event.target)
  })

  cytoscape.on('drag', 'node', (event) => {
    updateResizeHandles(event.target)
  })

  cytoscape.on('unselect', 'node', (event) => {
    removeResizeHandles(event.target)
  })

  cytoscape.on('remove', 'node', (event) => {
    removeResizeHandles(event.target)
  })
}

export default resizeNode
