import createEdge from './create-edge'
import createVertex from './create-vertex'
import deleteSelected from './delete-selected'
import selectVertex from './select-vertex'
import resizeVertex from './resize-vertex'
import zoomGraph from './zoom-graph'

const enableExtensions = (editor) => {
  createEdge(editor)
  createVertex(editor)
  deleteSelected(editor)
  selectVertex(editor)
  resizeVertex(editor)
  zoomGraph(editor)
}

export { enableExtensions }
