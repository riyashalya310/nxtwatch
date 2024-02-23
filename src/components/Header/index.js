import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import ReactContext from '../context/ReactContext'
import PopupDesign from '../PopupDesign'

const Header = props => (
  <ReactContext.Consumer>
    {value => {
      const {darkMode, onChangeDarkMode} = value
      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      return (
        <div>
          <button type="button">
            <Link to="/">
              <img
                src={
                  darkMode
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                alt="nxt watch logo"
              />
            </Link>
          </button>
          <button type="button" data-testid="theme" onClick={onChangeDarkMode}>
            {darkMode ? null : null}
          </button>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
          />
          <PopupDesign onClickLogout={onClickLogout} />
        </div>
      )
    }}
  </ReactContext.Consumer>
)
export default withRouter(Header)
