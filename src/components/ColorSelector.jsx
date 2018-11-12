import React, {Component} from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import {connect} from 'react-redux'
import actions from '../actions'

const colors = ['black', 'darkgreen', 'darkred', 'purple']

class SizeSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: [0]
    }
  }

  componentDidMount() {
  }

  handleChange(e) {
    this.setState({ value: e.filter(t => this.state.value.indexOf(t) ) });
    this.props.setCanvasBrushColor(colors[e.filter(t => this.state.value.indexOf(t) )[0]])
    this.props.setCanvasToolPen()
  }

  render() {
    return (
      <div>
        <ToggleButtonGroup
          type="checkbox"
          value={this.state.value}
          onChange={(e) => this.handleChange(e)}
          style={{width: '100%'}}
          vertical
        >
          <ToggleButton value={0}>
            <div style={{height: 30, display: 'table', width: '100%'}}>
              <i style={{verticalAlign: 'middle', textAlign: 'center', display: 'table-cell', color: colors[0]}} className="fa fa-circle fa-2x" />
            </div>
          </ToggleButton>
          <ToggleButton value={1}>
            <div style={{height: 30, display: 'table', width: '100%'}}>
              <i style={{verticalAlign: 'middle', textAlign: 'center', display: 'table-cell', color: colors[1]}} className="fa fa-circle fa-2x" />
            </div>
          </ToggleButton>
          <ToggleButton value={2}>
            <div style={{height: 30, display: 'table', width: '100%'}}>
              <i style={{verticalAlign: 'middle', textAlign: 'center', display: 'table-cell', color: colors[2]}} className="fa fa-circle fa-2x" />
            </div>
          </ToggleButton>
          <ToggleButton value={3}>
            <div style={{height: 30, display: 'table', width: '100%'}}>
              <i style={{verticalAlign: 'middle', textAlign: 'center', display: 'table-cell', color: colors[3]}} className="fa fa-circle fa-2x" />
            </div>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    )
  }
}

SizeSelector.propTypes = {
  whiteBackground: React.PropTypes.bool,
  setCanvasBrushColor: React.PropTypes.func,
  setCanvasToolPen: React.PropTypes.func
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCanvasBrushColor: (l) =>
      dispatch((actions.setCanvasBrushColor(l))),
    setCanvasToolPen: () =>
      dispatch((actions.setCanvasToolPen()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SizeSelector)
