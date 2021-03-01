import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  activeScreen: 'intro',
  backScreen: '',
  roles: [{ name: 'admin', id: 1 }, { name: 'author', id: 2 }, { name: 'super-admin', id: 3 }],
  users: [{ name: 'qamar', id: 4 }, { name: 'ali', id: 5 }, { name: 'janah', id: 6 }],
  allOrganizations: [],
  currentOrganization: null,
  activeOrganization: null,
  allSuborgList: null,
  newlyCreated: null,
  editOrganization: null,
  logo: '',
  feedbackType: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_ACTIVE_SCREEN:
      return {
        ...state,
        activeScreen: action.payload,
      };
    case actionTypes.GET_PREVIOUS_SCREEN:
      return {
        ...state,
        backScreen: action.payload,
      };
    case actionTypes.ADD_ALL_ORG:
      return {
        ...state,
        allOrganizations: action.payload,
      };
    case actionTypes.ADD_CURRENT_ORG:
      return {
        ...state,
        currentOrganization: action.payload,
        logo: action.payload?.image,
      };
    case actionTypes.ADD_ACTIVE_ORG:
      return {
        ...state,
        activeOrganization: action.payload,
      };
    case actionTypes.ADD_SUBORG_LIST:
      return {
        ...state,
        allSuborgList: action.payload,
      };
    case actionTypes.CLEAR_SUBORG_LIST:
      return {
        ...state,
        allSuborgList: null,
      };
    case actionTypes.NEW_SUBORG_ADD:
      return {
        ...state,
        newlyCreated: action.payload,
      };
    case actionTypes.REMOVE_SUBORG_ADD:
      return {
        ...state,
        newlyCreated: null,
      };
    case actionTypes.EDIT_ORGANIZATION:
      return {
        ...state,
        editOrganization: action.payload,
      };
    case actionTypes.REMOVE_EDIT_ORGANIZATION:
      return {
        ...state,
        editOrganization: null,
      };
    case actionTypes.UPDATE_FEEDBACK:
      return {
        ...state,
        feedbackType: action.payload,
      };
    default:
      return state;
  }
};
