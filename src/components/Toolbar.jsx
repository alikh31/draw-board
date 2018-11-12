import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import Draggable from 'react-draggable'
import SizeSelector from './SizeSelector.jsx'
import ColorSelector from './ColorSelector.jsx'
import ToolSelector from './ToolSelector.jsx'
import ControllerTools from './ControllerTools.jsx'

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <Draggable
        defaultPosition={{x: -70, y: 0}}
        position={null}
        grid={[25, 25]}>
        <div>
          <div style={{
            backgroundColor: '#d7d7d7',
            padding: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          }}>Toolbar</div>
          <div style={{
            backgroundColor: '#e7e7e7',
            padding: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
          }}>
            <ControllerTools/>
            <hr/>
            <ToolSelector/>
            <hr/>
            <SizeSelector/>
            <hr/>
            <ColorSelector/>
          </div>
        </div>
      </Draggable>
    )
  }
}

Footer.propTypes = {
  whiteBackground: React.PropTypes.bool
}

export default withRouter(Footer)
