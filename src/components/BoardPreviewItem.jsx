import React, {Component} from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import uniqid from 'uniqid'

class BoardPreviewItem extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { base, history } = this.props
    if(base.id === 'new')
      return (
        <div style={{width: '100%'}}>
          <Button
            style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}
            onClick={() => history.push('/draw-board/' + uniqid())}
          >
            Create a New Board
          </Button>
        </div>
      )

    return (
      <div>
        <a href={'/draw-board/' + base.id}>
          <img src={base.data}  className="img-responsive" />
        </a>
        <hr/>
      </div>
    )
  }
}

BoardPreviewItem.propTypes = {
  base: React.PropTypes.object,
  location: React.PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
    listen: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(BoardPreviewItem)
