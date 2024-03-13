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

  onChangeLikedVideos = (isLiked, id) => {
    if (!isLiked) {
      // Add video details to the list of saved videos
      const videoDetails = {
        isLiked: true,
        id,
      }
      this.setState(prevState => [...prevState.likedVideos, videoDetails])
    } else {
      // Remove video details from the list of saved videos
      this.setState(prevState =>
        prevState.likedVideos.filter(video => video.id !== id),
      )
    }
  }

  onChangeDislikedVideos = (isDisliked, id) => {
    if (!isDisliked) {
      // Add video details to the list of saved videos
      const videoDetails = {
        isDisliked: true,
        id,
      }
      this.setState(prevState => [...prevState.dislikedVideos, videoDetails])
    } else {
      // Remove video details from the list of saved videos
      this.setState(prevState =>
        prevState.dislikedVideos.filter(video => video.id !== id),
      )
    }
  }

  onSaveVideo = (isSaved, id) => {
    if (!isSaved) {
      // Add video details to the list of saved videos
      const videoDetails = {
        isSaved: true,
        id,
      }
      this.setState(prevState => [...prevState.savedVideos, videoDetails])
    } else {
      // Remove video details from the list of saved videos
      this.setState(prevState =>
        prevState.dislikedVideos.filter(video => video.id !== id),
      )
    }
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
