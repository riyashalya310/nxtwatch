import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import SideView from '../SideView'
import {ThemeComponent} from '../Home/styledComponents'

const gamingAPIStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Gaming extends Component {
  state = {
    gamingVideos: [],
    gamingAPIStatus: gamingAPIStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({gamingAPIStatus: gamingAPIStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/videos/gaming', options)
    if (response.ok) {
      const data = await response.json()
      const filteredData = data.videos.map(item => ({
        id: item.id,
        title: item.title,
        thumbnailUrl: item.thumbnail_url,
        viewCount: item.view_count,
      }))
      this.setState({
        gamingVideos: filteredData,
        gamingAPIStatus: gamingAPIStatusConstants.success,
      })
    } else {
      this.setState({
        gamingAPIStatus: gamingAPIStatusConstants.failure,
      })
    }
  }

  renderSuccess = () => {
    const {gamingVideos} = this.state
    return (
      <div>
        {gamingVideos.length > 0 ? (
          <ul>
            {gamingVideos.map(video => (
              <li key={video.id}>
                <Link to={`/videos/${video.id}`}>
                  <button type="button">
                    <img src={video.thumbnailUrl} alt="video thumbnail" />
                    <p>{video.title}</p>
                    <p>{video.viewCount} Watching WorldWide</p>
                  </button>
                </Link>
              </li>
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
                this.getGamingVideos()
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
          this.getGamingVideos()
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
    const {gamingAPIStatus} = this.state
    switch (gamingAPIStatus) {
      case gamingAPIStatusConstants.loading:
        return this.renderLoading()

      case gamingAPIStatusConstants.success:
        return this.renderSuccess()

      case gamingAPIStatusConstants.failure:
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
export default Gaming
