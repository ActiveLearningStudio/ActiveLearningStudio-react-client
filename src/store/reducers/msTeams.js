/* eslint-disable */
import {
  MT_CODE,
  MT_ASSIGNMENT_ID,
  MT_CLASS_ID,
  MT_VIEW,
  MT_USER_ROLE,
  MT_TOKEN,
  MT_REFRESH_TOKEN,
  TOGGLE_SIDEBAR,
  IS_MSTEAM,
} from '../actionTypes';
const INITIAL_STATE = {
  mt_code: null,
  mt_assignment_id: null,
  mt_class_id: null,
  mt_user_role: null,
  mt_token: null,
  mt_refresh_token: null,
  mt_code: null,
  toggle_sidebar: false,
  is_msteam: false,
};
const msTeamsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case MT_CODE:
        return {
          ...state,
          mt_code: action.payload,
        };
      case MT_ASSIGNMENT_ID:
        return {
          ...state,
          mt_assignment_id: action.payload,
        };
      case MT_CLASS_ID:
        return {
          ...state,
          mt_class_id: action.payload,
        };
      case MT_VIEW:
        return {
          ...state,
          mt_view: action.payload,
        };
      case MT_USER_ROLE:
        return {
          ...state,
          mt_user_role: action.payload,
        };
      case MT_TOKEN:
        return {
          ...state,
          mt_token: action.payload,
        };
      case MT_REFRESH_TOKEN:
        return {
          ...state,
          mt_refresh_token: action.payload,
        };
      case TOGGLE_SIDEBAR:
        return {
          ...state,
          toggle_sidebar: action.payload,
        };
      case IS_MSTEAM:
        return {
          ...state,
          is_msteam: action.payload,
        };

    default:
      return state;
  }
};

export default msTeamsReducer;
