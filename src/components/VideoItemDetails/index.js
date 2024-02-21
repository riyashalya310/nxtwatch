import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import Header from '../Header'
import SideView from '../SideView'
import VideoPlayer from '../ReactPlayer'
import ReactContext from '../context/ReactContext'
import {ThemeComponent} from '../Home/styledComponents'

const videoDetailsAPIStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    videoDetailsAPIStatus: videoDetailsAPIStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({
      videoDetailsAPIStatus: videoDetailsAPIStatusConstants.loading,
    })
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)
    if (response.ok) {
      const data = await response.json()
      const filteredData = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }
      this.setState({
        videoDetails: filteredData,
        videoDetailsAPIStatus: videoDetailsAPIStatusConstants.success,
      })
    } else {
      this.setState({
        videoDetailsAPIStatus: videoDetailsAPIStatusConstants.failure,
      })
    }
  }

  renderSuccess = () => {
    const {videoDetails} = this.state
    return (
      <ReactContext.Consumer>
        {value => {
          const {
            onSaveVideo,
            onChangeLikedVideos,
            onChangeDislikedVideos,
            savedVideos,
            likedVideos,
            dislikedVideos,
          } = value

          const saveVideo = () => {
            onSaveVideo(videoDetails.id)
          }

          const changeLikedVideos = () => {
            onChangeLikedVideos(videoDetails.id)
          }

          const changeDislikedVideos = () => {
            onChangeDislikedVideos(videoDetails.id)
          }

          const isLikedVideo = likedVideos.find(
            video => video.id === videoDetails.id,
          )

          const isDislikedVideo = dislikedVideos.find(
            video => video.id === videoDetails.id,
          )

          const isSavedVideo = savedVideos.find(
            video => video.id === videoDetails.id,
          )

          return (
            <div>
              <VideoPlayer videoURL={videoDetails.videoUrl} />
              <h1>{videoDetails.title}</h1>
              <p>
                {videoDetails.viewCount} views . {videoDetails.publishedAt}{' '}
                years ago
              </p>
              <button
                type="button"
                onClick={changeLikedVideos}
                disabled={isLikedVideo.isLiked}
              >
                <AiOutlineLike /> Like
              </button>
              <button
                type="button"
                onClick={changeDislikedVideos}
                disabled={isDislikedVideo.isDisliked}
              >
                <AiOutlineDislike /> Dislike
              </button>
              <button
                type="button"
                onClick={saveVideo}
                disabled={isSavedVideo.isSaved}
              >
                {isSavedVideo.isSaved ? 'Saved' : 'Save'}
              </button>
              <img src={videoDetails.channel.profileImageUrl} alt="" />
              <h1>{videoDetails.channel.name}</h1>
              <p>{videoDetails.channel.subscriberCount} Subscribers</p>
              <p>{videoDetails.description}</p>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme.png"
        alt=""
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble to complete your request.</p>
      <p>Please try again.</p>
      <button
        type="button"
        onClick={() => {
          this.getVideoDetails()
        }}
      >
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderResult = () => {
    const {videoDetailsAPIStatus} = this.state
    switch (videoDetailsAPIStatus) {
      case videoDetailsAPIStatusConstants.loading:
        return this.renderLoading()

      case videoDetailsAPIStatusConstants.success:
        return this.renderSuccess()

      case videoDetailsAPIStatusConstants.failure:
        return this.renderFailure()

      default:
        return null
    }
  }

  render() {
    return (
      <ThemeComponent>
        <Header />
        <div>
          <SideView />
          <h1>Gaming</h1>
          {this.renderResult()}
        </div>
      </ThemeComponent>
    )
  }
}
export default VideoItemDetails
