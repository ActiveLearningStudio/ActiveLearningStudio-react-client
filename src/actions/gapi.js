import {
  GOOGLE_CLASSROOM_LOGIN,
  GOOGLE_CLASSROOM_LOGIN_FAILURE
} from '../constants/actionTypes';


export const googleClassRoomLogin = (id) => ({
  type: GOOGLE_CLASSROOM_LOGIN,
  id,
});

//shows the delete popup on activities, project, playlists
export const googleClassRoomLoginAction = (response) => {
  return async dispatch => {
    try {
      // save access token
      console.log("---------------");
      console.log(response);
      console.log("---------------");
      dispatch(
        googleClassRoomLogin(response)
      )
    } catch (e) {
      throw new Error(e);
    }
  }
}



export const googleClassRoomLoginFailure = (id) => ({
  type: GOOGLE_CLASSROOM_LOGIN_FAILURE,
  id,
});

//shows the delete popup on activities, project, playlists
export const googleClassRoomLoginFailureAction = (response) => {
  return async dispatch => {
    try {
      dispatch(
        googleClassRoomLoginFailure(response)
      )
    } catch (e) {
      throw new Error(e);
    }
  }
}
