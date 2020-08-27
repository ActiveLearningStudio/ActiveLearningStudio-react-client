import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: true,
  user: null,
  forgotPasswordEmail: null,
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
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.CONFIRM_EMAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CONFIRM_EMAIL_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.RESET_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
      };
    case actionTypes.UPDATE_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.ACCEPT_TERMS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.ACCEPT_TERMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
      };
    case actionTypes.ACCEPT_TERMS_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.LOG_OUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
