import React, {Component} from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import {connect} from 'react-redux'
import actions from '../actions'

class SizeSelector extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { prepareToDownload, prepareToSave } = this.props
    return (
      <div>
        <ButtonGroup
          style={{width: '100%'}}
          vertical
        >
          <Button
            value={1}
            onClick={() => prepareToSave()}
          >
            <div style={{height: 30, display: 'table', width: '100%', fontSize: '1.3em'}}>
              <i style={{verticalAlign: 'middle', textAlign: 'center', display: 'table-cell'}} className="fa fa-save" />
            </div>
          </Button>
          <Button value={1} onClick={() => prepareToDownload()}>
            <div style={{height: 30, display: 'table', width: '100%', fontSize: '1.3em'}}>
              <i style={{verticalAlign: 'middle', textAlign: 'center', display: 'table-cell'}} className="fa fa-download" />
            </div>
          </Button>
        </ButtonGroup>
      </div>
    )
  }
}

SizeSelector.propTypes = {
  prepareToSave: React.PropTypes.func,
  prepareToDownload: React.PropTypes.func
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

export default connect(mapStateToProps, mapDispatchToProps)(SizeSelector)
