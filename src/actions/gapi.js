import {
  GOOGLE_CLASSROOM_LOGIN,
  GOOGLE_CLASSROOM_LOGIN_FAILURE
} from "../constants/actionTypes";


import { copyProject, tokensave } from "./share.js";

export const googleClassRoomLogin = (id) => ({
  type: GOOGLE_CLASSROOM_LOGIN,
  id,
});
var projectid = "";
export const getprojectid = (id) => {
  projectid = id;
};

//shows the delete popup on activities, project, playlists
export const googleClassRoomLoginAction = (response) => {
  return async (dispatch) => {
    try {
      // save access token
      tokensave(response.access_token);
      console.log("---------------");
      console.log(response);
      console.log("---------------");
      dispatch(googleClassRoomLogin(response));
      setTimeout(() => {
        copyProject(projectid);
      }, 1000);
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const googleClassRoomLoginFailure = (id) => ({
  type: GOOGLE_CLASSROOM_LOGIN_FAILURE,
  id,
});

//shows the delete popup on activities, project, playlists
export const googleClassRoomLoginFailureAction = (response, projectId) => {
  setTimeout(() => {
    copyProject(projectid);
  }, 1000);
  return async (dispatch) => {
    try {
      dispatch(googleClassRoomLoginFailure(response));
    } catch (e) {
      throw new Error(e);
    }
  };
};
