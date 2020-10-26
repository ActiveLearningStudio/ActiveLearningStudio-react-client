import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  userLmsSettings: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_LMS_SETTINGS:
      return {
        ...state,
        userLmsSettings: action.lmsSettings.data,
      };

    default:
      return state;
  }
};
