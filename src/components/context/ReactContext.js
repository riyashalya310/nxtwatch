import React from 'react'

const ReactContext = React.createContext({
  darkMode: false,
  onChangeDarkMode: () => {},
  savedVideos: [],
  onSaveVideo: () => {},
  likedVideos: [],
  onChangeLikedVideos: () => {},
  dislikedVideos: [],
  onChangeDislikedVideos: () => {},
})

export default ReactContext
