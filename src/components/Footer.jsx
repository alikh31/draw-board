import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div
        id="footer"
        style={{
          borderTop: '',
          fontSize: '.8em',
          color: 'black',
          backgroundColor: 'white',
          textAlign: 'center'
        }}>
      </div>
    )
  }
}

Footer.propTypes = {
  whiteBackground: React.PropTypes.bool
}

export default withRouter(Footer)
