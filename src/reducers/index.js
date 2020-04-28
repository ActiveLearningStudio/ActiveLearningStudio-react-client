import { combineReducers } from 'redux'

import authReducer from './authReducer'
import playlistReducer from './playlistReducer'
import resourceReducer from './resourceReducer'
import projectReducer from './projectReducer'

export default combineReducers({
  auth: authReducer,
  project: projectReducer,
  playlist: playlistReducer,
  resource: resourceReducer
})

