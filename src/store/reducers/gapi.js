import { GOOGLE_CLASSROOM_LOGIN } from '../actionTypes';

const defaultAuthState = () => {
  if (localStorage.getItem('gapi')) {
    return JSON.parse(localStorage.getItem('gapi'));
  }

  return {};
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

    default:
      return state;
  }
};

export default gapiReducer;
