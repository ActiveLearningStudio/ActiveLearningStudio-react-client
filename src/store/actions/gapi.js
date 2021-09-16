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
  SET_STUDENT_AUTH,
  SET_STUDENT_AUTH_TOKEN,
  GET_H5P_SETTINGS,
  GET_SUBMISSION,
  TURNED_IN_ACTIVITY,
  GET_SUMMARY_AUTH,
  GET_OUTCOME_SUMMARY,
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

// Set student auth data
export const setStudentAuthAction = (data) => async (dispatch) => {
  // Auth data doesn't provide the google user ID so we get profile data
  const studentProfile = await gapiService.getStudentProfile(data.accessToken);

  dispatch({
    type: SET_STUDENT_AUTH,
    studentData: {
      auth: data,
      profile: studentProfile,
    },
  });
};

export const refreshStudentAuthTokenAction = (newToken) => async (dispatch) => {
  dispatch({
    type: SET_STUDENT_AUTH_TOKEN,
    newToken: { ...newToken },
  });
};

// Gets courses for student
export const getStudentCoursesAction = (token) => async (dispatch) => {
  const coursesResponse = await gapiService.getStudentCourses(token);
  dispatch({
    type: GET_STUDENT_COURSES,
    coursesResponse,
  });
};

export const loadH5pResourceSettings = (activityId, studentId = null, submissionId = null) => async (dispatch) => {
  const h5pSettings = await gapiService.h5pResourceSettings(activityId, studentId, submissionId);
  dispatch({
    type: GET_H5P_SETTINGS,
    h5pSettings,
  });
};

export const getSubmissionAction = (classworkId, courseId, auth) => async (dispatch) => {
  const submission = await gapiService.getSubmission(classworkId, courseId, JSON.stringify(auth.tokenObj))
    .catch((err) => err);

  dispatch({
    type: GET_SUBMISSION,
    submission,
  });
};

export const turnInAction = (classworkId, courseId, auth) => async (dispatch) => {
  const turnedIn = await gapiService.turnIn(classworkId, courseId, JSON.stringify(auth.tokenObj));
  dispatch({
    type: TURNED_IN_ACTIVITY,
    turnedIn,
  });
};

export const getSummaryAuthAction = (auth, courseId, classworkId, submissionId) => async (dispatch) => {
  const summaryAuth = await gapiService.getSummaryAuth(JSON.stringify(auth.tokenObj), courseId, classworkId, submissionId);

  dispatch({
    type: GET_SUMMARY_AUTH,
    summaryAuth,
  });
};

export const getOutcomeSummaryAction = (studentId, activityId) => async (dispatch) => {
  const outcomeSummary = await gapiService.getOutcomeSummary(studentId, activityId);
  dispatch({
    type: GET_OUTCOME_SUMMARY,
    outcomeSummary,
  });
};
