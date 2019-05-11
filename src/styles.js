import Cytoscape from 'cytoscape'

const styles = Cytoscape.stylesheet()
  .selector('node')
  .style({
    content: 'data(name)',
    shape: 'roundrectangle',
    width: 'label',
    height: 'label',
    color: '#000000',
    'background-color': '#ffcc00',
    'border-width': 1,
    'border-color': '#000000',
    'padding-left': '10',
    'padding-right': '10',
    'padding-top': '10',
    'padding-bottom': '10',
    'text-wrap': 'wrap',
    'text-valign': 'center',
    'text-halign': 'center'
  })
  .selector('edge')
  .style({
    content: 'data(name)',
    width: '1',
    'line-color': '#000000',
    //'curve-style': 'bezier',
    //'curve-style': 'segments',
    'text-wrap': 'wrap',
    'text-rotation': 'autorotate',
    'text-background-color': '#ffffff',
    'text-background-opacity': 1,
    'text-background-padding': '3px',
    'target-arrow-shape': 'triangle',
    'target-arrow-color': '#000000',
    'target-endpoint': 'outside-to-line-or-label',
    'source-endpoint': 'inside-to-node'
    //'source-distance-from-node': '-10px',
    //'target-distance-from-node': '1px'
  })
  .selector(':selected')
  .style({
    'background-color': '#b18f00',
    'border-color': '#2C67D2',
    'line-color': '#2C67D2',
    'target-arrow-color': '#2C67D2'
  })

  .selector('#ghostEdge')
  .style({
    content: 'data(name)',
    width: '1',
    'line-color': '#000000',
    //'curve-style': 'bezier',
    //'curve-style': 'segments',
    'text-wrap': 'wrap',
    'text-rotation': 'autorotate',
    'text-background-color': '#ffffff',
    'text-background-opacity': 1,
    'text-background-padding': '3px',
    'target-arrow-shape': 'triangle',
    'target-arrow-color': '#000000',
    'target-endpoint': 'outside-to-line-or-label',
    'source-endpoint': 'inside-to-node'
    //'source-distance-from-node': '-10px',
    //'target-distance-from-node': '1px'
  })

export default styles
