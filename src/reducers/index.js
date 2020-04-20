import { combineReducers } from 'redux'

import authReducer from './authReducer'
import playlistReducer from './playlistReducer'
import resourceReducer from './resourceReducer'

export default combineReducers({
  auth: authReducer,
  playlist: playlistReducer,
  resource: resourceReducer
})

