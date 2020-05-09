import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import authReducer from './authReducer'
import playlistReducer from './playlistReducer'
import resourceReducer from './resourceReducer'
import projectReducer from './projectReducer'
import uiReducer from './uiReducer'

export default combineReducers({
  auth: authReducer,
  project: projectReducer,
  playlist: playlistReducer,
  resource: resourceReducer,
  ui: uiReducer,
  form:formReducer
})

