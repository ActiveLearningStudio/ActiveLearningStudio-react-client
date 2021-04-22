import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  activeForm: null,
  loading: true,
  activeTab: 'Stats',
  currentUser: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_FORM:
      return {
        ...state,
        activeForm: action.payload,
      };
    case actionTypes.CLEAR_ACTIVE_FORM:
      return {
        ...state,
        activeForm: null,
      };
    case actionTypes.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };
    case actionTypes.CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
