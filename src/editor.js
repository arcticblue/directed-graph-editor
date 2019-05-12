import cytoscape from 'cytoscape'
import style from './styles'
import extensions from './extensions'

cytoscape.use(extensions)

export default class DirectedGraphEditor {
  constructor(id) {
    const container = document.getElementById(id)
    this.cy = cytoscape({ container, style })
    this.cy.enableExtensions()
    this.cy.userPanningEnabled(false)
  }

  load = (elements) => {
    this.cy.batch(() => {
      this.cy.elements().remove()
      this.cy.add(elements)
    })
  }

  layout = (options) => {
    return this.cy.layout(options)
  }
}
