import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import assign from 'object-assign'
import moment from 'moment'
import actions from '../actions'

class DrawableCanvas extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      canvas: {},
      context: {},
      widthScaleFactor: 1,
      heightScaleFactor: 1,
      convasOffsetWidth: 0,
      convasOffsetHeight: 0,
      board: props.boards.filter(t => t.id == props.boardId)[0]
    }
  }

  updateDimensions() {
    const { canvas, convasOffsetWidth, convasOffsetHeight } = this.state

    this.setState({
      widthScaleFactor: canvas.offsetWidth / convasOffsetWidth,
      heightScaleFactor: canvas.offsetHeight / convasOffsetHeight
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.updateDimensions());
  }

  componentDidMount() {
    const canvas = ReactDOM.findDOMNode(this)

    const dpr = 2

    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr

    const context = canvas.getContext('2d')
    context.scale(dpr, dpr)

    if(this.state.board && this.state.board.data) {
      var image = new Image();
      image.src = this.state.board.data
      image.onload = function() {
        context.drawImage(image, 0, 0, canvas.offsetWidth, canvas.offsetHeight)

        this.setState({
          context
        })
      }
    }

    this.setState({
      canvas,
      context,
      convasOffsetWidth: canvas.offsetWidth,
      convasOffsetHeight: canvas.offsetHeight
    })

    window.addEventListener('resize', () => this.updateDimensions())
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.clear){
      this.resetCanvas()
    }

    const { canvasSettings } = this.props
    const { prepareToDownload, prepareToSave } = canvasSettings
    if (nextProps.canvasSettings.prepareToDownload !== prepareToDownload &&
      nextProps.canvasSettings.prepareToDownload) {
      this.downloadImage()
    }
    if (nextProps.canvasSettings.prepareToSave !== prepareToSave &&
      nextProps.canvasSettings.prepareToSave) {
      this.saveBoard()
    }
  }

  saveBoard() {
    const { boardId, addBoard } = this.props

    addBoard({
      updated: new Date(),
      id: boardId,
      data: this.state.canvas.toDataURL()
    })
  }

  downloadImage() {
    const { downloaded } = this.props

    const dUrl = this.state.canvas.toDataURL()
    var link = document.createElement('a')
    link.href = dUrl
    link.download = moment().format('h-mm--MMMM-Do-YYYY') + '.png'
    document.body.appendChild(link)
    link.click()
    downloaded()
  }

  static getDefaultStyle() {
    return {
      brushColor: '#FFFF00',
      lineWidth: 4,
      cursor: 'pointer',
      canvasStyle: {
        backgroundColor: '#00FFDC'
      },
      clear: false
    }
  }

  handleOnTouchStart (e) {
    const { lineWidth } = this.props.canvasSettings
    this.useTool(e.clientX - lineWidth/2, e.clientY - lineWidth/2, e.clientX + lineWidth/2, e.clientY + lineWidth/2)

    const rect = this.state.canvas.getBoundingClientRect()
    this.state.context.beginPath()
    this.setState({
      lastX: e.targetTouches[0].pageX - rect.left,
      lastY: e.targetTouches[0].pageY - rect.top,
      drawing: true
    })
  }

  handleOnMouseDown(e){
    const rect = this.state.canvas.getBoundingClientRect()
    this.state.context.beginPath()

    const { lineWidth } = this.props.canvasSettings
    this.useTool(e.clientX - lineWidth/10, e.clientY - lineWidth/10, e.clientX + lineWidth/10, e.clientY + lineWidth/10)

    this.setState({
      lastX: e.clientX - rect.left,
      lastY: e.clientY - rect.top,
      drawing: true
    })
  }

  handleOnTouchMove (e) {
    const { lastX, lastY } = this.state

    if (this.state.drawing) {
      const rect = this.state.canvas.getBoundingClientRect()
      let currentX = e.targetTouches[0].pageX - rect.left
      let currentY = e.targetTouches[0].pageY - rect.top
      this.useTool(lastX, lastY, currentX, currentY)
      this.setState({
        lastX: currentX,
        lastY: currentY
      })
    }
  }

  handleOnMouseMove(e){
    const { lastX, lastY } = this.state

    if(this.state.drawing){
      const rect = this.state.canvas.getBoundingClientRect()
      let currentX = e.clientX - rect.left
      let currentY = e.clientY - rect.top

      this.useTool(lastX, lastY, currentX, currentY)
      this.setState({
        lastX: currentX,
        lastY: currentY
      })
    }
  }

  useTool(lastX, lastY, currentX, currentY) {
    switch(this.props.canvasSettings.tool) {
      case 'pen':
        return this.draw(lastX, lastY, currentX, currentY)
      case 'eraser':
        return this.erase(currentX, currentY)
      default:
        return this.draw(lastX, lastY, currentX, currentY)
    }
  }

  erase(x, y) {
    const { lineWidth } = this.props.canvasSettings
    const scaled = lineWidth * 10
    this.state.context.clearRect(x - scaled / 2, y - scaled / 2, scaled, scaled)
  }

  handleonMouseUp() {
    this.setState({
      drawing: false
    })
  }

  draw(lX, lY, cX, cY) {
    const { widthScaleFactor, heightScaleFactor } = this.state
    const newContext = this.state.context
    newContext.strokeStyle = this.props.canvasSettings.brushColor
    newContext.lineCap = 'round'
    newContext.lineWidth = this.props.canvasSettings.lineWidth
    this.setState({
      context: newContext
    })
    this.state.context.moveTo(lX / widthScaleFactor, lY / heightScaleFactor)
    this.state.context.lineTo(cX / widthScaleFactor, cY / heightScaleFactor)
    this.state.context.stroke()
  }

  resetCanvas(){
    const width = this.state.context.canvas.width
    const height = this.state.context.canvas.height
    this.state.context.clearRect(0, 0, width, height)
  }

  canvasStyle(){
    const defaults = DrawableCanvas.getDefaultStyle()
    const custom = this.props.canvasStyle

    return assign({}, defaults, custom)
  }

  render() {
    return (
      <canvas style = {this.canvasStyle()}
        onMouseDown = {this.handleOnMouseDown.bind(this)}
        onTouchStart = {this.handleOnTouchStart.bind(this)}
        onMouseMove = {this.handleOnMouseMove.bind(this)}
        onTouchMove = {this.handleOnTouchMove.bind(this)}
        onMouseUp = {this.handleonMouseUp.bind(this)}
        onTouchEnd = {this.handleonMouseUp.bind(this)}
      >
      </canvas>
    )
  }

}

DrawableCanvas.propTypes = {
  canvasSettings: PropTypes.object,
  cursor: PropTypes.string,
  downloaded: PropTypes.func,
  addBoard: PropTypes.func,
  canvasStyle: PropTypes.shape({
    backgroundColor: PropTypes.string
  }),
  clear: PropTypes.bool,
  boardId: PropTypes.string,
  boards: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    canvasSettings: state.canvas,
    boards: state.boards.allBoards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    downloaded: () =>
      dispatch((actions.downloaded())),
    addBoard: (o) =>
      dispatch((actions.addBoard(o)))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawableCanvas)
