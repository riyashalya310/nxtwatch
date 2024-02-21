import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import {IoMdClose} from 'react-icons/io'
import {BackGroundComponent, ThemeComponent} from './styledComponents'
import Header from '../Header'
import SideView from '../SideView'

const homeVideosAPIStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    videoList: [],
    search: '',
    homeVideosAPIStatus: homeVideosAPIStatusConstants.initial,
    close: false,
  }

  componentDidMount() {
    this.getVideosList()
  }

  getVideosList = async () => {
    this.setState({homeVideosAPIStatus: homeVideosAPIStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {search} = this.state
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/videos/all?search=${search}`,
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
        videoList: filteredData,
        homeVideosAPIStatus: homeVideosAPIStatusConstants.success,
      })
    } else {
      console.log('Videos API failed')
      this.setState({homeVideosAPIStatus: homeVideosAPIStatusConstants.failure})
    }
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  renderSuccess = () => {
    const {videoList} = this.state
    return (
      <div>
        {videoList.length > 0 ? (
          <ul>
            {videoList.map(video => (
              <li key={video.id}>
                <Link to={`/videos/${video.id}`}>
                  <button type="button">
                    <img src={video.thumbnailUrl} alt="video thumbnail" />
                    <img
                      src={video.channel.profileImageUrl}
                      alt="channel logo"
                    />
                    <p>{video.title}</p>
                    <p>{video.channel.name}</p>
                    <p>{video.viewCount} views .</p>
                    <p>{video.publishedAt} years ago</p>
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
                this.getVideosList()
              }}
            >
              Retry
            </button>
          </div>
        )}
      </div>
    )
  }

  onClickSearchButton = () => {
    this.getVideosList()
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
          this.getVideosList()
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
    const {homeVideosAPIStatus} = this.state
    switch (homeVideosAPIStatus) {
      case homeVideosAPIStatusConstants.loading:
        return this.renderLoading()

      case homeVideosAPIStatusConstants.success:
        return this.renderSuccess()

      case homeVideosAPIStatusConstants.failure:
        return this.renderFailure()

      default:
        return null
    }
  }

  onClickCloseBtn = () => {
    this.setState({close: true})
  }

  render() {
    const {search, close} = this.state
    return (
      <ThemeComponent>
        <Header />
        <div>
          <SideView />
          <div>
            <BackGroundComponent disabled={close} data-testid="banner">
              <Link to="/">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                />
              </Link>
              <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
              <button type="button">GET IT NOW</button>
              <button
                type="button"
                data-testid="close"
                onClick={this.onClickCloseBtn}
              >
                <IoMdClose />.
              </button>
            </BackGroundComponent>
            <div>
              <input
                type="search"
                id="search"
                placeholder="Search"
                value={search}
                onChange={this.onChangeSearch}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearchButton}
              >
                <FaSearch />.
              </button>
            </div>
            {this.renderResult()}
          </div>
        </div>
      </ThemeComponent>
    )
  }
}
export default Home
