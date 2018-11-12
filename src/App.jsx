import React, {Component, PropTypes} from 'react'
import { Switch, Route } from 'react-router-dom'
import DrawBoard from './pages/DrawBoard.jsx'
import Landing from './pages/Landing.jsx'

require('./styles/application.scss')

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <Switch>
        <Route exact path='/draw-board*' component={drawBoard}/>
        <Route exact path='/' component={Landing}/>
      </Switch>
    )
  }
}

function drawBoard() {
  return (
    <div>
      <DrawBoard/>
    </div>
  )
}

App.propTypes = {
  location: PropTypes.object
}

export default App;
