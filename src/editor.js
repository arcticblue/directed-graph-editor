import Cytoscape from 'cytoscape';
import style from './styles';

export default class DirectedGraphEditor {
  constructor(id) {
    this.cy = Cytoscape({
      container: document.getElementById('root'),
      style,
    });
  }
  load = elements => {
    this.cy.ready(() => {
      this.cy.batch(() => {
        this.cy.elements().remove();
        this.cy.add(elements);
      });
    });
  };
}
