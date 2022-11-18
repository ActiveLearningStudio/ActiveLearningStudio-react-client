/* eslint-disable */
import { SHOW_LMS, CHANGE_LOADING, GOOGLE_SHARE, ALL_COURSES, GET_COURSE_TOPICS, SHARE_CANAVS, SHARE_MS_TEAM, PUBLISH_LMS_SETTINGS } from '../actionTypes';

const INITIAL_STATE = {
  shareVendors: [],
  loadingShare: false,
  googleShare: false,
  courses: false,
  topics: false,
  isCanvas: false,
  msTeamShare: false,
  publishingLms: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_LMS:
      return {
        ...state,
        shareVendors: action.lmsInfo,
      };

    case CHANGE_LOADING:
      return {
        ...state,
        loadingShare: action.change,
      };

    case GOOGLE_SHARE:
      return {
        ...state,
        googleShare: action.value,
      };
    case SHARE_MS_TEAM:
      return {
        ...state,
        msTeamShare: action.value,
      };
    case SHARE_CANAVS:
      return {
        ...state,
        isCanvas: action.value,
      };
    case PUBLISH_LMS_SETTINGS:
      return {
        ...state,
        publishingLms: action.value,
      };

    case ALL_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_COURSE_TOPICS:
      return {
        ...state,
        topics: action.payload,
      };

    default:
      return state;
  }
};
