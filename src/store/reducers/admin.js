import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  activeForm: null,
  loading: true,
  activeTab: 'Organization',
  activityTypes: [],
  activityItems: [],
  usersReport: [],
  jobs: [],
  specificJob: null,
  allJobs: null,
  logs: [],
  currentUser: null,
  newUser: null,
  editUser: null,
  newlyCreated: null,
  newlyEdit: null,
  currentProject: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_FORM:
      return {
        ...state,
        activeForm: action.payload,
      };
    case actionTypes.NEWLY_CREATED_RESOURCE:
      return {
        ...state,
        newlyCreated: action.payload,
      };
    case actionTypes.NEWLY_EDIT_RESOURCE:
      return {
        ...state,
        newlyEdit: action.payload,
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
        activityTypes: action.payload.activityTypes,
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
    case actionTypes.GET_JOBS_LISTING:
      return {
        ...state,
        jobs: action.payload,
      };
    case actionTypes.GET_LOGS_LISTING:
      return {
        ...state,
        logs: action.payload,
      };
    case actionTypes.RETRY_ALL_FAILED_JOBS:
      return {
        ...state,
        allJobs: action.payload,
      };
    case actionTypes.FORGET_ALL_FAILED_JOBS:
      return {
        ...state,
        allJobs: action.payload,
      };
    case actionTypes.FORGET_FAILED_JOB:
      return {
        ...state,
        specificJob: action.payload,
      };
    case actionTypes.RETRY_FAILED_JOB:
      return {
        ...state,
        specificJob: action.payload,
      };
    case actionTypes.SET_CURRENT_PROJECT:
      return {
        ...state,
        currentProject: action.payload,
      };
    default:
      return state;
  }
};
