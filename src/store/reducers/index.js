import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import playlist from './playlist';
import resource from './resource';
import project from './project';
import ui from './ui';
import share from './share';
import gapi from './gapi';
import search from './search';
import metrics from './metrics';
import sidebar from './sidebar';
import team from './team';
import account from './account';
import dashboard from './dashboard';
import notification from './notification';
import canvas from './canvas';
import group from './group';
import organization from './organization';
import genericLMS from './LMS/genericLMS';
import admin from './admin';

export default combineReducers({
  auth,
  project,
  playlist,
  resource,
  ui,
  form: formReducer,
  share,
  gapi,
  search,
  metrics,
  sidebar,
  team,
  account,
  dashboard,
  notification,
  canvas,
  group,
  organization,
  genericLMS,
  admin,
});
