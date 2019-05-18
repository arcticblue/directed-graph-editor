import { Group, Rect, Text } from 'konva'

const options = {}

const nodeOptions = {
  width: 49,
  height: 49,
  fill: '#ffcc00',
  stroke: 'black',
  cornerRadius: 5,
  strokeScaleEnabled: false
}

const textOptions = {
  text: '',
  fontSize: 12,
  listening: false
}

export default class Vertex extends Group {
  constructor(id, name, x, y) {
    super({ ...options, id, x, y })
    const node = (this._node = new Rect({ ...nodeOptions }))
    const text = (this._text = new Text({ ...textOptions }))
    this._text.text(id)
    this._selected = false
    this.add(node, text)
    this.updateTextPosition()
  }

  get node() {
    return this._node
  }

  get text() {
    return this._text
  }

  get isSelected() {
    return this._selected
  }

  select = (selected) => {
    this._selected = selected
  }

  updateTextPosition = () => {
    this._text.position({
      x: this._node.x() + this._node.width() / 2 - this._text.width() / 2,
      y: this._node.y() + this._node.height() / 2 - this._text.height() / 2
    })
  }
}
