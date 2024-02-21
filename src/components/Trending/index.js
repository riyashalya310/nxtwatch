import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideView from '../SideView'
import ReactContext from '../context/ReactContext'
import {ThemeComponent} from '../Home/styledComponents'

const trendingVideosAPIConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Trending extends Component {
  state = {
    trendingVideos: [],
    trendingVideosAPIStatus: trendingVideosAPIConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({trendingVideosAPIStatus: trendingVideosAPIConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/videos/trending',
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const filteredData = data.videos.map(item => ({
        id: item.id,
        title: item.title,
        thumbnailUrl: item.thumbnail_url,
        channel: {
          name: item.channel.name,
          profileImageUrl: item.channel.profile_image_url,
        },
        viewCount: item.view_count,
        publishedAt: item.published_at,
      }))
      this.setState({
        trendingVideos: filteredData,
        trendingVideosAPIStatus: trendingVideosAPIConstants.success,
      })
    } else {
      this.setState({
        trendingVideosAPIStatus: trendingVideosAPIConstants.failure,
      })
    }
  }

  renderSuccess = () => {
    const {trendingVideos} = this.state
    const currentDate = new Date().getFullYear()
    console.log(currentDate)
    return (
      <div>
        {trendingVideos.length > 0 ? (
          <ul>
            {trendingVideos.map(video => (
              <Link to={`/videos/${video.id}`}>
                <li key={video.id}>
                  <button type="button">
                    <img src={video.thumbnailUrl} alt="video thumbnail" />
                    <img
                      src={video.channel.profileImageUrl}
                      alt="channel logo"
                    />
                    <p>{video.title}</p>
                    <p>{video.channel.name}</p>
                    <p>
                      {video.viewCount} views .{' '}
                      {currentDate - video.publishedAt} years ago
                    </p>
                  </button>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <h1>No Search results found</h1>
            <p>Try different key words or remove search filter</p>
            <button
              type="button"
              onClick={() => {
                this.getTrendingVideos()
              }}
            >
              Retry
            </button>
          </div>
        )}
      </div>
    )
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <p>Please try again.</p>
      <button
        type="button"
        onClick={() => {
          this.getTrendingVideos()
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
    const {trendingVideosAPIStatus} = this.state
    switch (trendingVideosAPIStatus) {
      case trendingVideosAPIConstants.loading:
        return this.renderLoading()

      case trendingVideosAPIConstants.success:
        return this.renderSuccess()

      case trendingVideosAPIConstants.failure:
        return this.renderFailure()

      default:
        return null
    }
  }

  render() {
    return (
      <ReactContext.Consumer>
        <ThemeComponent>
          <Header />
          <div>
            <SideView />
            <h1>Trending</h1>
          </div>
        </ThemeComponent>
      </ReactContext.Consumer>
    )
  }
}
export default Trending
