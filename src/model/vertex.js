import { Rect, Text, Transformer } from 'konva'
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
  fontSize: 18,
  fontFamily: 'Calibri',
  listening: false
}

const transformerOptions = {
  rotateEnabled: false,
  borderEnabled: false,
  anchorFill: 'black',
  anchorStroke: 'black'
}

export default class Vertex extends Element {
  constructor(id, name, position) {
    super({ id, ...position })
    const node = (this._node = new Rect({ ...nodeOptions }))
    const text = (this._text = new Text({ ...textOptions }))
    this._text.text(name)
    this.add(node, text)
    this.updateTextPosition()
  }

  get selected() {
    return super.selected
  }

  set selected(selected) {
    super.selected = selected
    if (selected) {
      const stage = this.parent.parent
      this._transformer = new Transformer({ ...transformerOptions, anchorSize: 8 * stage.scaleX() })
      this._transformer.attachTo(this.node)
      this.add(this._transformer)
      this.node.on('transformstart', (event) => stage.fire('resizestart', this, event))
      this.node.on('transform', (event) => stage.fire('resize', this, event))
    } else {
      this.node.off('transformstart')
      this.node.off('transform')
      this._transformer.destroy()
    }
  }

  get node() {
    return this._node
  }

  get text() {
    return this._text
  }

  get center() {
    const scale = this.node.scaleX()
    const { x, y } = this.node.position()
    const { width, height } = this.node.size()
    return {
      x: this.x() + x + (width * scale) / 2,
      y: this.y() + y + (height * scale) / 2
    }
  }

  updateTextPosition = () => {
    this._text.position({
      x: this._node.x() + this._node.width() / 2 - this._text.width() / 2,
      y: this._node.y() + this._node.height() / 2 - this._text.height() / 2
    })
  }
}
