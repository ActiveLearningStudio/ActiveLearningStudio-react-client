import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import playlistReducer from "./playlistReducer";
import resourceReducer from "./resourceReducer";
import projectReducer from "./projectReducer";
import uiReducer from "./uiReducer";
import termsreducer from "./termsreducer";
import defaultsharestate from "./shareReducer";
import gapiReducer from "./gapiReducer";
import search from "./searchReducer";

export default combineReducers({
  auth: authReducer,
  project: projectReducer,
  playlist: playlistReducer,
  resource: resourceReducer,
  ui: uiReducer,
  form: formReducer,
  loginshow: termsreducer,
  defaultsharestate: defaultsharestate,
  gapi: gapiReducer,
  search: search,
});
