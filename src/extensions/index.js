import createEdge from './create-edge'
import createVertex from './create-vertex'
import deleteSelected from './delete-selected'
import moveVertex from './move-vertex'
import resizeVertex from './resize-vertex'
import selectVertex from './select-vertex'
import zoomGraph from './zoom-graph'

const enableExtensions = (editor) => {
  createEdge(editor)
  createVertex(editor)
  deleteSelected(editor)
  moveVertex(editor)
  resizeVertex(editor)
  selectVertex(editor)
  zoomGraph(editor)
}

export { enableExtensions }
