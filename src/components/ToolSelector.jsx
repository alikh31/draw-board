import React, {Component} from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import {connect} from 'react-redux'
import actions from '../actions'

class SizeSelector extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  handleChange(e) {
    e.filter(t => (this.props.tool === 'pen' ? 0 : 1) !== t )[0] === 1 ?
      this.props.setCanvasToolEraser() :
      this.props.setCanvasToolPen()
  }

  render() {
    return (
      <div>
        <ToggleButtonGroup
          type="checkbox"
          value={this.props.tool === 'pen' ? 0 : 1}
          onChange={(e) => this.handleChange(e)}
          style={{width: '100%'}}
          vertical
        >
          <ToggleButton value={0}>
            <div style={{height: 30, display: 'table', width: '100%', fontSize: '1.3em'}}>
              <i style={{verticalAlign: 'middle', textAlign: 'center', display: 'table-cell'}} className="fa fa-pencil" />
            </div>
          </ToggleButton>
          <ToggleButton value={1}>
            <div style={{height: 30, display: 'table', width: '100%', fontSize: '1.3em'}}>
              <i style={{verticalAlign: 'middle', textAlign: 'center', display: 'table-cell'}} className="fa fa-eraser" />
            </div>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    )
  }
}

SizeSelector.propTypes = {
  whiteBackground: React.PropTypes.bool,
  setCanvasToolPen: React.PropTypes.func,
  setCanvasToolEraser: React.PropTypes.func,
  tool: React.PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    tool : state.canvas.tool
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCanvasToolEraser: () =>
      dispatch((actions.setCanvasToolEraser())),
    setCanvasToolPen: () =>
      dispatch((actions.setCanvasToolPen()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SizeSelector)
