import Swal from 'sweetalert2';

import searchService from 'services/search.service';
import gapiService from 'services/gapi.service';
import {
  GOOGLE_CLASSROOM_LOGIN,
  GOOGLE_CLASSROOM_LOGIN_FAILURE,
  GOOGLE_SHARE,
  LOAD_GOOGLE_CLASSROOM_COURSES,
  ALL_COURSES,
  GET_STUDENT_COURSES,
} from '../actionTypes';

export const googleClassRoomLogin = (id) => ({
  type: GOOGLE_CLASSROOM_LOGIN,
  id,
});

export const googleShare = (value) => ({
  type: GOOGLE_SHARE,
  value,
});

export const loadCourses = (value) => ({
  type: LOAD_GOOGLE_CLASSROOM_COURSES,
  value,
});

// let projectId = '';
export const getProjectId = (/* id */) => {
  // projectId = id;
};

export const fetchCourses = () => {
  Swal.fire({
    title: 'Loading...',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });
};

// shows the delete popup on activities, project, playlists
export const googleClassRoomLoginAction = (response) => async (dispatch) => {
  dispatch(googleShare(true));

  try {
    // save access token
    await searchService.googleShareToken(JSON.stringify(response.tokenObj));
    const getCourses = await searchService.getCourses();
    dispatch({
      type: ALL_COURSES,
      payload: getCourses.courses,
    });

    // dispatch(googleClassRoomLogin(response));
  } catch (e) {
    console.log(e);
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
    console.log(e);
  }
};

// Gets courses for student
export const getStudentCoursesAction = (token) => async (dispatch) => {
  const coursesResponse = await gapiService.getStudentCourses(token);
  dispatch({
    type: GET_STUDENT_COURSES,
    coursesResponse,
  });
};
