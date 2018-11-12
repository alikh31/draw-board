
export default {
  setCanvasBrushColor: (color) => ({
    type: 'SET_CANVAS_BRUSH_COLOR',
    payload: color
  }),
  setCanvasLineWidth: (width) => ({
    type: 'SET_CANVAS_LINE_WIDTH',
    payload: width
  }),
  setCanvasToolPen: () => ({
    type: 'SET_CANVAS_TOOL',
    payload: 'pen'
  }),
  setCanvasToolEraser: () => ({
    type: 'SET_CANVAS_TOOL',
    payload: 'eraser'
  }),
  prepareToSave: () => ({
    type: 'CANVAS_PREPARE_TO_SAVE'
  }),
  prepareToDownload: () => ({
    type: 'CANVAS_PREPARE_TO_DOWNLOAD'
  }),
  downloaded: () => ({
    type: 'CANVAS_DOWNLOADED'
  }),
  addBoard: (board) => ({
    type: 'ADD_BOARD',
    payload: board
  })
}
