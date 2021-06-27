import {
  GOOGLE_CLASSROOM_LOGIN,
  GET_STUDENT_COURSES,
  SET_STUDENT_AUTH,
  SET_STUDENT_AUTH_TOKEN,
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
    submissionError: null,
    h5pSettings: null,
    summaryAuth: {
      student: null,
      teacher: null,
    },
    outcomeSummary: null,
    summaryError: null,
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

    case SET_STUDENT_AUTH_TOKEN:
      return {
        ...state,
        student: {
          ...state.student,
          auth: {
            ...state.student.auth,
            accessToken: action.newToken.access_token,
            tokenObj: action.newToken,
          },
        },
      };

    case GET_STUDENT_COURSES:
      return {
        ...state,
        courses: action.coursesResponse.data.courses,
      };

    case GET_SUBMISSION:
      if (action.submission.errors) {
        return {
          ...state,
          submission: null,
          submissionError: action.submission.errors[0],
        };
      }

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
      if (!action.outcomeSummary) {
        return {
          ...state,
          outcomeSummary: false,
          summaryError: null,
        };
      }

      if (action.outcomeSummary.errors) {
        return {
          ...state,
          outcomeSummary: false,
          summaryError: action.outcomeSummary.errors[0],
        };
      }

      if (action.outcomeSummary.summary.length === 0) {
        return {
          ...state,
          outcomeSummary: false,
          summaryError: 'The outcome data for this summary is still being processed. Please try again later.',
        };
      }

      return {
        ...state,
        outcomeSummary: action.outcomeSummary.summary,
        summaryError: null,
      };

    default:
      return state;
  }
};

export default gapiReducer;
