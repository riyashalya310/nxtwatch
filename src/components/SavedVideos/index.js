import './index.css'
import {Link} from 'react-router-dom'
import ReactContext from '../context/ReactContext'
import Header from '../Header'
import SideView from '../SideView'

const SavedVideos = () => (
  <ReactContext.Consumer>
    {value => {
      const {savedVideos} = value
      return (
        <>
          <Header />
          <div>
            <SideView />
            <h1>Saved Videos</h1>
            {savedVideos.length > 0 ? (
              <ul>
                {savedVideos.map(video => (
                  <Link to={`/videos/${video.id}`}>
                    <li key={video.id}>
                      <button type="button">
                        <img src={video.thumbnailUrl} alt="video thumbnail" />
                        <p>{video.title}</p>
                        <p>{video.viewCount} Watching WorldWide</p>
                      </button>
                    </li>
                  </Link>
                ))}
              </ul>
            ) : (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                />
                <h1>No saved videos found</h1>
                <p>You can save your videos while watching them</p>
              </div>
            )}
          </div>
        </>
      )
    }}
  </ReactContext.Consumer>
)
export default SavedVideos
