import { GOOGLE_CLASSROOM_LOGIN, GET_STUDENT_COURSES, SET_STUDENT_AUTH } from '../actionTypes';

const defaultAuthState = () => {
  if (localStorage.getItem('gapi')) {
    return JSON.parse(localStorage.getItem('gapi'));
  }

  return {
    courses: null,
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

    default:
      return state;
  }
};

export default gapiReducer;
