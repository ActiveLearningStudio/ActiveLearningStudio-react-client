import Swal from 'sweetalert2';

import {
  GOOGLE_CLASSROOM_LOGIN,
  GOOGLE_CLASSROOM_LOGIN_FAILURE,
  GOOGLE_SHARE,
} from '../actionTypes';

import { tokenSave } from './share';

export const googleClassRoomLogin = (id) => ({
  type: GOOGLE_CLASSROOM_LOGIN,
  id,
});

export const googleShare = (value) => ({
  type: GOOGLE_SHARE,
  value,
});

// let projectId = '';
export const getProjectId = (/* id */) => {
  // projectId = id;
};

// shows the delete popup on activities, project, playlists
export const googleClassRoomLoginAction = (response) => async (dispatch) => {
  dispatch(googleShare(true));

  try {
    // save access token
    tokenSave(JSON.stringify(response.tokenObj));
    dispatch(googleClassRoomLogin(response));
  } catch (e) {
    throw new Error(e);
  }
};

export const googleClassRoomLoginFailure = (id) => ({
  type: GOOGLE_CLASSROOM_LOGIN_FAILURE,
  id,
});

// shows the delete popup on activities, project, playlists
export const googleClassRoomLoginFailureAction = (response) => async (dispatch) => {
  dispatch(googleShare('close'));
  dispatch(googleClassRoomLogin(response));
  try {
    Swal.fire({
      confirmButtonColor: '#5952c6',
      icon: 'error',
      text: response.error.replace(/_/g, ' '),
    });
    // dispatch(googleShare(true));
    dispatch(googleClassRoomLoginFailure(response));
  } catch (e) {
    throw new Error(e);
  }
};
