import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  activeForm: null,
  loading: true,
  activeTab: 'Stats',
  activityTypes: [],
  activityItems: [],
  usersReport: [],
  currentUser: null,
  newUser: null,
  editUser: null,
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
    case actionTypes.ADD_NEW_USER:
      return {
        ...state,
        newUser: action.payload,
      };
    case actionTypes.EDIT_NEW_USER:
      return {
        ...state,
        editUser: action.payload,
      };
    case actionTypes.GET_ACTIVITY_TYPES:
      return {
        ...state,
        activityTypes: action.payload,
      };
    case actionTypes.GET_ACTIVITY_ITEMS_ADMIN:
      return {
        ...state,
        activityItems: action.payload,
      };
    case actionTypes.GET_USERS_REPORT:
      return {
        ...state,
        usersReport: action.payload,
      };
    default:
      return state;
  }
};
