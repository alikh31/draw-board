import React, {Component, PropTypes} from 'react'
import DrawableCanvas from '../components/Drawable-canvas.jsx'
import Toolbar from '../components/Toolbar.jsx'
import { withRouter } from 'react-router-dom'
import ScrollLock from 'react-scrolllock'
import uniqid from 'uniqid'

class DrawBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      boardId: this.props.location.pathname.split('/')[2]
    }
  }

  refreshStats() {
  }

  componentDidMount() {
    if(!this.state.boardId) {
      this.props.history.push('/draw-board/' + uniqid())
    }
  }

  render() {
    return (
      <div style={{overflow: 'hidden', width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%'}}>
        <DrawableCanvas boardId={this.state.boardId} />
        <div style={{position: 'absolute', right: -70, top: 20}}>
          <Toolbar/>
        </div>
        <ScrollLock/>
      </div>
    )
  }
}

DrawBoard.propTypes = {
  location: PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
    listen: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(DrawBoard)
