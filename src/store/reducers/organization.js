/* eslint-disable */
import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  activeScreen: 'intro',
  activePage: 1,
  activeRole: '',
  size: 10,
  backScreen: '',
  roles: [],
  users: [],
  searchUsers: [],
  allOrganizations: [],
  currentOrganization: null,
  activeOrganization: null,
  allSuborgList: [],
  newlyCreated: null,
  editOrganization: null,
  logo: '',
  feedbackType: null,
  history: null,
  searchOrg: [],
  permission: {},
  activePermission: null,
  permissionsId: null,
  activeEdit: null,
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
    case actionTypes.UPDATE_ALL_ORG:
      return {
        ...state,
        allOrganizations: state.allOrganizations.map((data) => (data.id == action.payload.id ? action.payload : data)),
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
        allSuborgList: { ...state.allSuborgList, data: [action.payload, ...state.allSuborgList.data] },
      };
    case actionTypes.REMOVE_SUBORG_ADD:
      return {
        ...state,
        newlyCreated: null,
      };
    case actionTypes.REMOVE_SUBORG_DEL:
      return {
        ...state,
        allSuborgList: { data: state.allSuborgList.data?.filter((remove) => remove.id !== action.payload.id), links: state.allSuborgList.links, meta: state.allSuborgList.meta },
      };
    case actionTypes.ADD_SUBORG_EDIT:
      return {
        ...state,
        allSuborgList: {
          ...state.allSuborgList,
          data: state?.allSuborgList?.data?.map((edit) => {
            if (edit.id === action.payload.id) {
              return action.payload;
            }
            return edit;
          }),
        },
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
    case actionTypes.ALL_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    case actionTypes.SAVE_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case actionTypes.SEARCH_ORG:
      return {
        ...state,
        searchOrg: action.payload,
      };
    case actionTypes.CLEAR_HISTORY:
      return {
        ...state,
        history: null,
      };
    case actionTypes.GET_ORGANIZATION_USERS:
      return {
        ...state,
        users: action.payload.result,
        activePage: action.payload.page,
        size: action.payload.size,
        activeRole: action.payload.activeRole,
      };
    case actionTypes.DELETE_USER_FROM_ORGANIZATION:
      return {
        ...state,
        users: action.payload.users,
        searchUsers: action.payload.searchUsers,
      };
    case actionTypes.REMOVE_USER_FROM_ORGANIZATION:
      return {
        ...state,
        users: action.payload.users,
        searchUsers: action.payload.searchUsers,
      };
    case actionTypes.SEARCH_USER_IN_ORGANIZATION:
      return {
        ...state,
        searchUsers: action.payload,
      };
    case actionTypes.SET_ALL_PERSMISSION:
      return {
        ...state,
        permission: action.payload,
      };
    case actionTypes.SET_ACTIVE_PERMISSION:
      return {
        ...state,
        activePermission: action.payload,
      };
    case actionTypes.SET_ALL_PERSMISSION_ID:
      return {
        ...state,
        permissionsId: action.payload,
      };
    case actionTypes.SET_ACTIVE_EDIT:
      return {
        ...state,
        activeEdit: action.payload,
      };
    case actionTypes.CLEAR_STATES_IN_ORGANIZATION:
      return {
        ...state,
        users: [],
        roles: [],
        searchUsers: [],
        searchOrg: [],
      };
    case actionTypes.CLEAR_USERS_STATE:
      return {
        ...state,
        users: [],
      };
    case actionTypes.UPDATE_PAGE_NUMBER:
      return {
        ...state,
        activePage: action.payload,
      };
    case actionTypes.RESET_PAGE_NUMBER:
      return {
        ...state,
        activePage: 1,
      };
    case actionTypes.ORG_UPDATE_LIBRARY_PREFERENCE:
      state.activeOrganization.allowed_visibility_type_id = action.payload;
      return {
        ...state,
        activeOrganization: { ...state.activeOrganization },
      };
    case actionTypes.ORG_UPDATE_GCR_SETTINGS:
      const filterdata = action.payload;
      return {
        ...state,
        activeOrganization: { ...state.activeOrganization, ...filterdata },
      };
    default:
      return state;
  }
};
