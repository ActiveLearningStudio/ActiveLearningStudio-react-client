import { AUTH_RECEIVE, AUTH_REQUEST, AUTH_ERROR,  AUTH_LOGOUT } from "../constants/actionTypes";

const defaultAuthState = () => {
  if (localStorage.getItem("auth")) {
    const localAuth = JSON.parse(localStorage.getItem("auth"));
    if(localAuth.auth_expiry > Math.round(new Date().getTime()/1000)){
      return JSON.parse(localStorage.getItem("auth"));
    }
    return {};
  } else {
    return {};
  }
};

const authReducer = (state = defaultAuthState(), action) => {
  switch (action.type) {
    case AUTH_RECEIVE:
      return {
        ...state,
        displayName: action.displayName,
        id: action.id,
        role: action.role
      };
    case AUTH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: 'Incorrect login or password!'
      };
    case AUTH_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default authReducer;
