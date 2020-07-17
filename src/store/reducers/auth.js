import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOG_OUT,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  user: null,
  forgotPasswordEmail: null,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        error: null,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case LOG_OUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
