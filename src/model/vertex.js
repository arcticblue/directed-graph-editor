import { Rect, Text } from 'konva'
import Element from './element'

const nodeOptions = {
  width: 49,
  height: 49,
  fill: '#ffcc00',
  stroke: 'black',
  cornerRadius: 5,
  x: -24,
  y: -24
}

const textOptions = {
  text: '',
  fontSize: 12,
  listening: false
}

export default class Vertex extends Element {
  constructor(id, name, position) {
    super({ id, ...position })
    const node = (this._node = new Rect({ ...nodeOptions }))
    const text = (this._text = new Text({ ...textOptions }))
    this._text.text(id)
    this.add(node, text)
    this.updateTextPosition()
  }

  get node() {
    return this._node
  }

  get text() {
    return this._text
  }

  get center() {
    const { width, height } = this.node.size()
    return {
      x: this.x() + width / 2,
      y: this.y() + height / 2
    }
  }

  updateTextPosition = () => {
    this._text.position({
      x: this._node.x() + this._node.width() / 2 - this._text.width() / 2,
      y: this._node.y() + this._node.height() / 2 - this._text.height() / 2
    })
  }
}
