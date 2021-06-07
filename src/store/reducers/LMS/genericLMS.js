import * as actionTypes from '../../genericLMSActionTypes';

const INITIAL_STATE = {
  showLogin: true,
  showActivity: false,
  errors: null,
  activityId: null,
  lmsCourseId: null,
  h5pSettings: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GENERIC_LMS_LOGIN:
      return {
        ...state,
        showLogin: false,
        showActivity: true,
      };

    case actionTypes.GENERIC_LMS_LOGIN_ERROR:
      return {
        ...state,
        showLogin: true,
        showActivity: false,
        errors: action.results.errors,
      };

    case actionTypes.GENERIC_LMS_LOAD_H5P_SETTINGS:
      return {
        ...state,
        h5pSettings: action.results,
      };

    case actionTypes.GENERIC_LMS_LOAD_H5P_SETTINGS_ERROR:
      return {
        ...state,
        showLogin: true,
        showActivity: false,
        errors: action.results.errors,
      };

    default:
      return state;
  }
};
