import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  userLmsSettings: [],
  userLmsSettingsLoaded: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_LMS_SETTINGS:
      return {
        ...state,
        userLmsSettings: action.lmsSettings.data,
        userLmsSettingsLoaded: true,
      };

    default:
      return state;
  }
};
