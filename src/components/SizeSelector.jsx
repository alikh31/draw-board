import React, {Component} from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import {connect} from 'react-redux'
import actions from '../actions'

class SizeSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: [1]
    }
  }

  componentDidMount() {
  }

  handleChange(e) {
    this.setState({ value: e.filter(t => this.state.value.indexOf(t) ) });
    this.props.setCanvasLineWidth(e.filter(t => this.state.value.indexOf(t) )[0] * 2)
  }

  render() {
    return (
      <div>
        <ToggleButtonGroup
          type="checkbox"
          value={this.state.value}
          onChange={(e) => this.handleChange(e)}
          vertical
        >
          <ToggleButton value={1}>
            <div style={{height: 30, display: 'table', width: '100%', fontSize: '.7em' }}>
              <i style={{verticalAlign: 'middle', textAlign: 'center', display: 'table-cell'}} className="fa fa-circle" />
            </div>
          </ToggleButton>
          <ToggleButton value={2}>
            <div style={{height: 30, display: 'table', width: '100%', fontSize: '1.2em' }}>
              <i style={{verticalAlign: 'middle', textAlign: 'center', display: 'table-cell'}} className="fa fa-circle" />
            </div>
          </ToggleButton>
          <ToggleButton value={3}>
            <div style={{height: 30, display: 'table', width: '100%', fontSize: '2em' }}>
              <i style={{verticalAlign: 'middle', textAlign: 'center', display: 'table-cell'}} className="fa fa-circle" />
            </div>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    )
  }
}

SizeSelector.propTypes = {
  whiteBackground: React.PropTypes.bool,
  setCanvasLineWidth: React.PropTypes.func
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCanvasLineWidth: (l) =>
      dispatch((actions.setCanvasLineWidth(l)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SizeSelector)
