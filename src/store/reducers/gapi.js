import {
  GOOGLE_CLASSROOM_LOGIN,
  GET_STUDENT_COURSES,
  SET_STUDENT_AUTH,
  GET_H5P_SETTINGS,
  GET_SUBMISSION,
  TURNED_IN_ACTIVITY,
  GET_SUMMARY_AUTH,
  GET_OUTCOME_SUMMARY,
} from '../actionTypes';

const defaultAuthState = () => {
  if (localStorage.getItem('gapi')) {
    return JSON.parse(localStorage.getItem('gapi'));
  }

  return {
    courses: null,
    student: null,
    submission: null,
    h5pSettings: null,
    summaryAuth: null,
    outcomeSummary: null,
  };
};

const gapiReducer = (state = defaultAuthState(), action) => {
  switch (action.type) {
    case GOOGLE_CLASSROOM_LOGIN:
      return {
        ...state,
        displayName: action.displayName,
        id: action.id,
        role: action.role,
      };

    case SET_STUDENT_AUTH:
      return {
        ...state,
        student: action.studentData,
      };

    case GET_STUDENT_COURSES:
      return {
        ...state,
        courses: action.coursesResponse.data.courses,
      };

    case GET_SUBMISSION:
      return {
        ...state,
        submission: {
          ...action.submission.submission,
          attemptId: Date.now(),
        },
      };

    case GET_H5P_SETTINGS:
      return {
        ...state,
        h5pSettings: action.h5pSettings,
      };

    case TURNED_IN_ACTIVITY:
      return state;

    case GET_SUMMARY_AUTH:
      return {
        ...state,
        summaryAuth: action.summaryAuth,
      };

    case GET_OUTCOME_SUMMARY:
      return {
        ...state,
        outcomeSummary: action.outcomeSummary,
      };

    default:
      return state;
  }
};

export default gapiReducer;
