import * as actionTypes from '../../genericLMSActionTypes';

const INITIAL_STATE = {
  showLogin: true,
  showActivity: false,
  errors: null,
  activityId: null,
  lmsCourseId: null,
  h5pSettings: null,
  safariMontagePublishTool: null,
  safariMontageErrors: [],
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GENERIC_LMS_LOGIN:
      return {
        ...state,
        showLogin: false,
        showActivity: true,
        user: action.results,
      };

    case actionTypes.GENERIC_LMS_LOGIN_ERROR:
      return {
        ...state,
        showLogin: true,
        showActivity: false,
        user: null,
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

    case actionTypes.SAFARI_MONTAGE_LOAD_PUBLISH_TOOL:
      return {
        ...state,
        safariMontagePublishTool: action.results.launch,
        safariMontageErrors: [],
      };

    case actionTypes.SAFARI_MONTAGE_LOAD_PUBLISH_TOOL_ERROR:
      return {
        ...state,
        safariMontagePublishTool: null,
        safariMontageErrors: action.results,
      };

    case actionTypes.CLOSE_SAFARI_MONTAGE_TOOL:
      return {
        ...state,
        safariMontagePublishTool: null,
        safariMontageErrors: [],
      };

    default:
      return state;
  }
};
