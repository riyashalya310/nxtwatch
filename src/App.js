import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ReactContext from './components/context/ReactContext'

// Replace your code here
class App extends Component {
  state = {
    darkMode: false,
    savedVideos: [],
    likedVideos: [],
    dislikedVideos: [],
  }

  onChangeDarkMode = () => {
    this.setState(prevState => ({darkMode: !prevState.darkMode}))
  }

  onChangeLikedVideos = id => {
    this.setState(prevState => ({
      likedVideos: prevState.likedVideos.map(video => {
        if (video.id === id) {
          return {...video, isLiked: !video.isLiked}
        }
        return {...video, isLiked: !video.isLiked}
      }),
    }))
  }

  onChangeDislikedVideos = id => {
    this.setState(prevState => ({
      dislikedVideos: prevState.dislikedVideos.map(video => {
        if (video.id === id) {
          return {...video, isDisliked: !video.isDisliked}
        }
        return {...video, isDisliked: !video.isDisliked}
      }),
    }))
  }

  onSaveVideo = id => {
    this.setState(prevState => ({
      savedVideos: prevState.savedVideos.map(video => {
        if (video.id === id) {
          return {...video, isSaved: !video.isSaved}
        }
        return {...video, isSaved: !video.isSaved}
      }),
    }))
  }

  render() {
    const {darkMode, savedVideos, likedVideos, dislikedVideos} = this.state
    return (
      <ReactContext.Provider
        value={{
          darkMode,
          onChangeDarkMode: this.onChangeDarkMode,
          savedVideos,
          onSaveVideo: this.onSaveVideo,
          likedVideos,
          onChangeLikedVideos: this.onChangeLikedVideos,
          dislikedVideos,
          onChangeDislikedVideos: this.onChangeDislikedVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ReactContext.Provider>
    )
  }
}

export default App
