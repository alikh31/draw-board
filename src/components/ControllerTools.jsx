import React, {Component} from 'react'
import { Button, ButtonGroup, Alert } from 'react-bootstrap'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import uniqid from 'uniqid'
import actions from '../actions'

class SizeSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLeaveAlert: false
    }
  }

  render() {
    const { prepareToDownload, prepareToSave, history } = this.props
    return (
      <div key={this.state.boardId}>
        <ButtonGroup
          style={{width: '100%'}}
          vertical
        >
          {this.state.showLeaveAlert &&
            <Alert bsStyle="danger" onDismiss={this.handleDismiss} style={{ position: 'absolute', top: '0', right: 80, width: 200 }}>
              <h4>Board is not Saved!</h4>
              <p> Do you want to save the board before leaving? </p>
              <p>
              <ButtonGroup>
                <Button onClick={() => this.setState({showLeaveAlert: false})}>
                  Discard
                </Button>
                <Button href={this.state.leaveAddress}>
                  No
                </Button>
                <Button onClick={() => {
                  prepareToSave()
                  setTimeout(() => {
                    history.push(this.state.leaveAddress)
                    window.location.reload()
                  }, 1000)
                }}>
                  Yes
                </Button>
              </ButtonGroup>
              </p>
            </Alert> }
          <Button onClick={() => this.setState({showLeaveAlert: true, leaveAddress: '/draw-board/' + uniqid()})} >
            <div style={{height: 30, display: 'table', width: '100%', fontSize: '1.3em'}}>
              <i style={{verticalAlign: 'middle', textAlign: 'center', display: 'table-cell'}} className="fa fa-file" />
            </div>
          </Button>
          <Button
            onClick={() => prepareToSave()}
          >
            <div style={{height: 30, display: 'table', width: '100%', fontSize: '1.3em'}}>
              <i style={{verticalAlign: 'middle', textAlign: 'center', display: 'table-cell'}} className="fa fa-save" />
            </div>
          </Button>
          <Button onClick={() => prepareToDownload()}>
            <div style={{height: 30, display: 'table', width: '100%', fontSize: '1.3em'}}>
              <i style={{verticalAlign: 'middle', textAlign: 'center', display: 'table-cell'}} className="fa fa-download" />
            </div>
          </Button>
          <Button onClick={() => this.setState({showLeaveAlert: true, leaveAddress: '/'})} >
            <div style={{height: 30, display: 'table', width: '100%', fontSize: '1.3em'}}>
              <i style={{verticalAlign: 'middle', textAlign: 'center', display: 'table-cell'}} className="fa fa-home" />
            </div>
          </Button>
        </ButtonGroup>
      </div>
    )
  }
}

SizeSelector.propTypes = {
  prepareToSave: React.PropTypes.func,
  prepareToDownload: React.PropTypes.func,
  location: React.PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
    listen: React.PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBoard: (o) =>
      dispatch((actions.addBoard(o))),
    prepareToDownload: () =>
      dispatch((actions.prepareToDownload())),
    prepareToSave: () =>
      dispatch((actions.prepareToSave()))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SizeSelector))
