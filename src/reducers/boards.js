
const user = (state = {
  allBoards: JSON.parse(localStorage.getItem('boards')) || []
}, action) => {
  let newBoards
  switch (action.type) {
    case 'ADD_BOARD':
      newBoards = state.allBoards.filter(t => t.id === action.payload.id).length > 0 ?
        state.allBoards.map(t => t.id !== action.payload.id ? t : action.payload) :
        [...state.allBoards, action.payload]
      localStorage.setItem('boards', JSON.stringify(newBoards))
      return Object.assign({}, state, {allBoards: newBoards})
  }

  return state
}

export default user
