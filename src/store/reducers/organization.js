import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  activeScreen: 'intro',
  backScreen: '',
  roles: [],
  users: [],
  searchUsers: [],
  allOrganizations: [],
  currentOrganization: null,
  activeOrganization: null,
  allSuborgList: null,
  newlyCreated: null,
  editOrganization: null,
  logo: '',
  feedbackType: null,
  history: null,
  searchOrg: [],
  // permission: {},
  permission: {
    activeRole: 'member',
    roleId: 3,
    organization: ['organization:edit', 'organization:view', 'organization:invite-members', 'organization:add-user', 'organization:add-admin'],
    project: ['create', 'update', 'delete', 'view', 'publish', 'share'],
    playlist: ['create', 'update', 'delete', 'view', 'publish', 'share'],
    ativities: ['create', 'update', 'delete', 'view', 'publish', 'share'],
    account: ['update', 'view'],
    search: ['view'],
    dashboard: ['dashboard:view'],
    team: [
      'team:edit',
      'team:delete',
      'team:view',
      'team:create',
      'team:add-projects',
      'team:remove-projects',
      'team:add-project-user',
      'team:remove-project-user',
      'team:add-user',
      'team:remove-user',
      'team:invite-member',
      'team:request-indexing',
    ],
    group: [
      'group:edit',
      'group:delete',
      'group:view',
      'group:create',
      'group:add-projects',
      'group:remove-projects',
      'group:add-project-user',
      'group:remove-project-user',
      'group:add-user',
      'group:remove-user',
      'group:invite-member',
      'group:request-indexing',
    ],
    user: ['user:view', 'user:edit', 'user:delete', 'delete-admin'],
  },
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
        users: action.payload,
      };
    case actionTypes.DELETE_USER_FROM_ORGANIZATION:
      return {
        ...state,
        users: action.payload,
      };
    case actionTypes.SEARCH_USER_IN_ORGANIZATION:
      return {
        ...state,
        searchUsers: action.payload,
      };
    case actionTypes.SET_ALL_PERSMISSION:
      return {
        ...state,
        // permission: action.payload,
      };
    default:
      return state;
  }
};
