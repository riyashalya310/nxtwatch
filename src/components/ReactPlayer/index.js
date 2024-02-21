import ReactPlayer from 'react-player'

import './index.css'

const VideoPlayer = props => {
  const {videoURL} = props
  return (
    <div className="video-container">
      <div className="responsive-container">
        <ReactPlayer url={videoURL} />
      </div>
    </div>
  )
}

export default VideoPlayer
