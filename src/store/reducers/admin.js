/* eslint-disable */
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
  ltiTools: [],
  defaultSso: [],
  lmsIntegration: [],
  removeUser: null,
  teams: {},
  allbrightCove: null,
  subjects: null,
  education_level: null,
  author_tags: null,
  activity_layouts: null,
  indActivities: null,
  exportedActivities: null,
  allMediaSources: {},
  orgMediaSources: {},
  ltiToolsTypes: [],
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
    case actionTypes.LOAD_RESOURCE_ITEMS_REQUEST:
      const refreshActivityItems = state.activityItems.data.filter((data) => data.id !== action.payload);
      return {
        ...state,
        activityItems: { ...state.activityItems, data: refreshActivityItems },
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
    case actionTypes.GET_SUBECTS:
      return {
        ...state,
        subjects: action.payload,
      };
    case actionTypes.GET_EDUCATION_LEVEL:
      return {
        ...state,
        education_level: action.payload,
      };
    case actionTypes.GET_AUTHOR_TAGS:
      return {
        ...state,
        author_tags: action.payload,
      };
    case actionTypes.GET_ACTIVITY_LAYOUTS:
      return {
        ...state,
        activity_layouts: action.payload,
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
    case actionTypes.GET_LTI_TOOLS:
      return {
        ...state,
        ltiTools: action.payload,
      };
    case actionTypes.GET_DEFAULT_SSO:
      return {
        ...state,
        defaultSso: action.payload,
      };
    case actionTypes.GET_LMS_INTEGRATION:
      return {
        ...state,
        lmsIntegration: action.payload,
      };
    case actionTypes.SHOW_REMOVE_USER:
      return {
        ...state,
        removeUser: action.payload,
      };
    case actionTypes.CANCEL_REMOVE_USER:
      return {
        ...state,
        removeUser: null,
      };
    case actionTypes.UP_ALL_BRIGHTCOVE:
      return {
        ...state,
        allbrightCove: action.payload || [],
      };
    case actionTypes.NEW_BRIGHTCOVE:
      return {
        ...state,
        allbrightCove: {
          ...state.allbrightCove,
          data: [...state.allbrightCove.data, action.payload],
        },
      };
    case actionTypes.DEL_BRIGHTCOVE:
      const newBrigthList = state.allbrightCove?.data.filter((data) => data.id !== action.payload);
      return {
        ...state,
        allbrightCove: { ...state.allbrightCove, data: newBrigthList },
      };
    case actionTypes.EDIT_BRIGHTCOVE:
      const newBrigthListEdit = state.allbrightCove.data.map((data) => {
        if (data.id === action.payload.id) {
          return action.payload;
        }
        return data;
      });
      return {
        ...state,
        allbrightCove: { ...state.allbrightCove, data: newBrigthListEdit },
      };
    case actionTypes.GET_TEAMS_ADMIN:
      return {
        ...state,
        teams: action.payload,
      };
    case actionTypes.ALL_ADMIN_IND_ACTIVITIES:
      return {
        ...state,
        indActivities: action.payload,
      };
    case actionTypes.CLEAR_ADMIN_EXPORTED_ACTIVITIES:
      return {
        ...state,
        exportedActivities: action.payload,
      };
    case actionTypes.ALL_ADMIN_EXPORTED_ACTIVITIES:
      return {
        ...state,
        exportedActivities: action.payload,
      };
    case actionTypes.EDIT_ADMIN_IND_ACTIVITIES:
      const newIndActivityData = state.indActivities.data.map((data) => {
        if (data.id === action.payload.id) {
          return action.payload;
        }
        return data;
      });
      return {
        ...state,
        indActivities: { ...state.indActivities, data: newIndActivityData },
      };
    case actionTypes.EDIT_INDEX_ADMIN_IND_ACTIVITIES:
      const newIndIndexActivityData = state.indActivities.data.map((data) => {
        if (data.id === action.activityId) {
          return { ...data, indexing: action.payload.indexing, indexing_text: action.payload.indexing_text };
        }
        return data;
      });
      return {
        ...state,
        indActivities: { ...state.indActivities, data: newIndIndexActivityData },
      };
    case actionTypes.DEL_ADMIN_IND_ACTIVITIES:
      const delIndActivityData = state.indActivities.data.filter((data) => data.id !== action.payload);
      return {
        ...state,
        indActivities: { ...state.indActivities, data: delIndActivityData },
      };

    case actionTypes.GET_ALL_MEDIA_SOURCE:
      return {
        ...state,
        allMediaSources: action.payload,
      };
    case actionTypes.CLEAR_IND_ACTIVITIES:
      return {
        ...state,
        indActivities: null,
      };

    case actionTypes.GET_ORG_MEDIA_SOURCE:
      return {
        ...state,
        orgMediaSources: action.payload,
      };
    case actionTypes.UPDATE_ORG_MEDIA_SOURCE:
      const updateLtiTools = action.payload.mediaSources?.filter((source) => source.media_type === 'Video');
      return {
        ...state,
        orgMediaSources: action.payload,
        ltiToolsTypes: updateLtiTools,
      };

    case actionTypes.GET_MEDIA_SOURCES:
      return {
        ...state,
        mediaSources: action.payload,
      };

    case actionTypes.GET_LTI_TOOLS_TYPES_REQUEST:
      return {
        ...state,
        ltiToolsTypes: [],
      };
    case actionTypes.GET_LTI_TOOLS_TYPES_SUCCESS:
      return {
        ...state,
        ltiToolsTypes: action.payload,
      };

    case actionTypes.CLONE_LTI_TOOLS_TYPES_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
