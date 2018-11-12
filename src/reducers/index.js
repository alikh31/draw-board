import { combineReducers } from 'redux'
import user from './user'
import canvas from './canvas'
import boards from './boards'

const todoApp = combineReducers({
  user,
  canvas,
  boards
})

export default todoApp
