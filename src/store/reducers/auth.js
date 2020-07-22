import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  user: null,
  forgotPasswordEmail: null,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
      };
    case actionTypes.GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        error: null,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        error: null,
      };
    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case actionTypes.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case actionTypes.FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case actionTypes.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case actionTypes.RESET_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case actionTypes.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        error: null,
      };
    case actionTypes.UPDATE_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case actionTypes.LOG_OUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
