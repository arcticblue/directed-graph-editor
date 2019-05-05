import cytoscape from 'cytoscape';
import style from './styles';
import extensions from './extensions';

cytoscape.use(extensions);

export default class DirectedGraphEditor {
  constructor(id) {
    this.cy = cytoscape({
      container: document.getElementById(id),
      style,
    });
    this.cy.enableExtensions();
    this.cy.userPanningEnabled(false);
  }
  load = elements => {
    this.cy.ready(() => {
      this.cy.batch(() => {
        this.cy.elements().remove();
        this.cy.add(elements);
      });
    });
  };
  layout = options => {
    return this.cy.layout(options);
  };
}
