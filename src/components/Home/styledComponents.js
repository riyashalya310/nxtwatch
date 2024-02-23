import styled from 'styled-components'

export const BackGroundComponent = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  display: ${props => (props.close ? 'none' : 'block')};
`

export const ThemeComponent = styled.div`
  background-color: ${props => (props.darkMode ? '#0f0f0f' : null)};
  color: ${props => (props.darkMode ? 'white' : null)};
`
