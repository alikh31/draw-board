
const canvas = (state = {brushColor: 'black', lineWidth: 3, tool: 'pen', prepareToSave: false, prepareToDownload: false}, action) => {
  switch (action.type) {
    case 'SET_CANVAS_BRUSH_COLOR':
      return Object.assign({}, state, {brushColor: action.payload})

    case 'SET_CANVAS_LINE_WIDTH':
      return Object.assign({}, state, {lineWidth: action.payload})

    case 'SET_CANVAS_TOOL':
      return Object.assign({}, state, {tool: action.payload})

    case 'CANVAS_PREPARE_TO_SAVE':
      return Object.assign({}, state, {prepareToSave: true})

    case 'CANVAS_PREPARE_TO_DOWNLOAD':
      return Object.assign({}, state, {prepareToDownload: true})

    case 'CANVAS_DOWNLOADED':
      return Object.assign({}, state, {prepareToDownload: false})
  }

  return state
}

export default canvas
