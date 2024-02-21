import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {SiYoutubegaming} from 'react-icons/si'
import './index.css'

const SideView = () => (
  <div>
    <ul>
      <li>
        <Link to="/">
          <IoMdHome /> Home
        </Link>
      </li>
      <li>
        <Link to="/trending">Trending</Link>
      </li>
      <li>
        <Link to="/gaming">
          <p>
            <SiYoutubegaming /> Gaming
          </p>
        </Link>
      </li>
      <li>
        <Link to="/saved-videos"> Saved Videos</Link>
      </li>
    </ul>
    <div>
      <p>CONTACT US</p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
        alt="facebook logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
        alt="twitter logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
        alt="linked in logo"
      />
      <p>Enjoy! Now to see your channels and recommendations!</p>
    </div>
  </div>
)
export default SideView
