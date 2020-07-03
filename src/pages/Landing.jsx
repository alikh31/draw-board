import React, {Component} from 'react'
import {connect} from 'react-redux'
import Viewer from '../components/Viewer.jsx'
import BoardPreviewItem from '../components/BoardPreviewItem.jsx'

class DrawBoard extends Component {
  constructor(props) {
    super(props)
  }

  refreshStats() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Viewer
          largeRowCount={3}
          mediomRowCount={2}
          smallRowCount={1}
          ItemView={BoardPreviewItem}
          dommy={true}
          baseItems={
            [
              {id: 'new'},
              ...this.props.boards.allBoards.filter(t => t.data).reverse()
            ]
          }/>
      </div>
    )
  }
}

DrawBoard.propTypes = {
  boards: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    boards: state.boards
  }
}

const mapDispatchToProps = () => {
  return {
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DrawBoard)
