import { Group } from 'konva'

const defaultOptions = {}

export default class Element extends Group {
  constructor(options) {
    super({ ...defaultOptions, ...options })
    this._selected = false
  }

  get selected() {
    return this._selected
  }

  set selected(selected) {
    this._selected = selected
  }
}
