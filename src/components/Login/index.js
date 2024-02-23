import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {ButtonComponent} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onaChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
      this.setState({username: '', password: ''})
    } else {
      this.onSubmitFailure(data.error_msg)
      this.setState({username: '', password: ''})
    }
  }

  render() {
    const {username, password, showPassword, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const hiddenPassword = '*'.repeat(password.length)
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />
        <form onSubmit={this.onSubmitForm}>
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={this.onChangeUsername}
            id="username"
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            placeholder="Password"
            value={showPassword ? password : hiddenPassword}
            onChange={this.onaChangePassword}
            id="password"
          />
          <label htmlFor="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              onClick={this.onChangeShowPassword}
            />
            Show Password
          </label>
          <ButtonComponent type="submit">Login</ButtonComponent>
          <p>{errorMsg}</p>
        </form>
      </div>
    )
  }
}
export default Login
