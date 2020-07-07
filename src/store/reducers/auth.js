import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOG_OUT,
} from '../actionTypes';

const INITIAL_STATE = {
  isLoggingIn: false,
  isSigningUp: false,

  user: null,

  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        user: action.payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggingIn: false,
        error: action.payload.error,
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        isSigningUp: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        user: action.payload.user,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isSigningUp: false,
        error: action.payload.error,
      };

    case LOG_OUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
