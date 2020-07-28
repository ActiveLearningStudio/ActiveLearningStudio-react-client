import {
  GOOGLE_CLASSROOM_LOGIN,
  GOOGLE_CLASSROOM_LOGIN_FAILURE,
  GOOGLE_SHARE,
} from "../constants/actionTypes";
import Swal from "sweetalert2";
import { copyProject, tokensave } from "./share.js";
import { shallowEqual } from "react-redux";

export const googleClassRoomLogin = (id) => ({
  type: GOOGLE_CLASSROOM_LOGIN,
  id,
});

export const GOOGLESHARE = (value) => ({
  type: GOOGLE_SHARE,
  value,
});

var projectid = "";
export const getprojectid = (id) => {
  projectid = id;
};

//shows the delete popup on activities, project, playlists
export const googleClassRoomLoginAction = (response) => {
  console.log("success", response);

  return async (dispatch) => {
    dispatch(GOOGLESHARE(true));
    try {
      // save access token
      tokensave(JSON.stringify(response.tokenObj));
      console.log("---------------");
      console.log(JSON.stringify(response.tokenObj));
      console.log("---------------");
      dispatch(googleClassRoomLogin(response));
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
export const googleClassRoomLoginFailureAction = (response) => {
  return async (dispatch) => {
    dispatch(GOOGLESHARE("close"));
    dispatch(googleClassRoomLogin(response));
    try {
      Swal.fire({
        confirmButtonColor: "#5952c6",
        icon: "error",
        text: response.error.replace(/_/g, " "),
      });
      // dispatch(GOOGLESHARE(true));
      dispatch(googleClassRoomLoginFailure(response));
    } catch (e) {
      throw new Error(e);
    }
  };
};
