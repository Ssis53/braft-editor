import './style.scss'
import React from 'react'
import { showModal } from 'components/common/Modal'

export default class Video extends React.Component {

  state = {
    toolbarVisible: false,
    playerVisible: false
  }

  componentWillUnmount () {
    this.playerModal && this.playerModal.destroy()
  }

  render () {

    const { toolbarVisible, playerVisible } = this.state
    const { mediaData, language } = this.props
    const { url, width, height, name, meta } = mediaData

    return (
      <div
        className="braft-media-video-holder"
        onMouseOver={this.showToolbar}
        onMouseLeave={this.hideToolbar}
      >
        {meta && meta.poster ? (
          <img className="braft-media-video-poster" src={meta.poster}/>
        ) : (
          <div>
            <i className="braft-icon-film"></i>
            <h5>{name}</h5>
            <h6>{url}</h6>
          </div>
        )}
        {toolbarVisible ? (
          <div
            ref={instance => this.toolbarElement = instance}
            className="braft-embed-video-toolbar"
          >
            <a onClick={this.showPlayer}>&#xe037;</a>
            <a onClick={this.removeVideo}>&#xe9ac;</a>
          </div>
        ) : null}
      </div>
    )

  }

  showPlayer = () => {

    const { url, meta } = this.props.mediaData

    this.playerModal = showModal({
      title: this.props.language.videoPlayer.title,
      width: 480,
      confirmable: true,
      language: this.props.language,
      showCancel: false,
      onClose: this.handlePlayerClose,
      children: <video poster={meta && meta.poster ? meta.poster : ''} className="braft-embed-video-player" src={url} controls/>
    })

  }

  removeVideo = () => {
    this.props.editor.removeBlock(this.props.block)
  }

  showToolbar = () => {
    this.setState({
      toolbarVisible: true
    })
  }

  hideToolbar = () => {
    this.setState({
      toolbarVisible: false
    })
  }

  handlePlayerClose = () => {
    this.props.editor && this.props.editor.focus()
  }

}