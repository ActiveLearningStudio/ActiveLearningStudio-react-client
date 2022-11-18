/* eslint-disable */
import adminService from 'services/admin.service';
import Swal from 'sweetalert2';
import * as actionTypes from '../actionTypes';
import store from '../index';
import { getUserAction } from './auth';

export const setActiveAdminForm = (type) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_ACTIVE_FORM,
    payload: type,
  });
};
export const setActiveTab = (type) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_ACTIVE_TAB,
    payload: type,
  });
};

export const removeActiveAdminForm = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_ACTIVE_FORM,
  });
};

export const setCurrentUser = (user) => async (dispatch) => {
  dispatch({
    type: actionTypes.CURRENT_USER,
    payload: user,
  });
};

export const addUserInOrganization = (user) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  const result = await adminService.addUserInOrganization(user, activeOrganization?.id);
  dispatch({
    type: actionTypes.CLEAR_USERS_STATE,
  });
  dispatch({
    type: actionTypes.ADD_NEW_USER,
    payload: result,
  });
  return result;
};

export const editUserInOrganization = (user) => async (dispatch) => {
  const centralizedState = store.getState();
  const {
    organization: { activeOrganization },
  } = centralizedState;
  let result;
  if (user.password) {
    result = await adminService.editUserInOrganization(user, activeOrganization?.id);
  } else {
    // eslint-disable-next-line no-param-reassign
    delete user.password;
    result = await adminService.editUserInOrganization(user, activeOrganization?.id);
  }
  if (result) {
    dispatch(getUserAction());
  }
  dispatch({
    type: actionTypes.CLEAR_USERS_STATE,
  });
  dispatch({
    type: actionTypes.EDIT_NEW_USER,
    payload: result,
  });
  return result;
};

export const getActivityTypes = (subOrgId, page, size = '', column = '', orderBy = '', search = '') => async (dispatch) => {
  const result = await adminService.getActivityTypes(subOrgId, page, size, column, orderBy, search);
  dispatch({
    type: actionTypes.GET_ACTIVITY_TYPES,
    payload: result,
  });
};

export const getUserReport = (mode, size, page, query) => async (dispatch) => {
  const result = await adminService.getUserReport(mode, size, page, query);
  dispatch({
    type: actionTypes.GET_USERS_REPORT,
    payload: result,
  });
  return result;
};

export const getJobListing = (filter, size, page, query) => async (dispatch) => {
  const result = await adminService.getJobListing(filter, size, page, query);
  dispatch({
    type: actionTypes.GET_JOBS_LISTING,
    payload: result,
  });
  return result;
};

export const retryAllFailedJobs = () => async (dispatch) => {
  const result = await adminService.retryAllFailedJobs();
  dispatch({
    type: actionTypes.RETRY_ALL_FAILED_JOBS,
    payload: result,
  });
  return result;
};

export const retrySpecificFailedJob = (job) => async (dispatch) => {
  const result = adminService.retrySpecificFailedJob(job);
  dispatch({
    type: actionTypes.RETRY_FAILED_JOB,
    payload: result,
  });
  return result;
};

export const forgetAllFailedJobs = () => async (dispatch) => {
  const result = await adminService.forgetAllFailedJobs();
  dispatch({
    type: actionTypes.FORGET_ALL_FAILED_JOBS,
    payload: result,
  });
  return result;
};

export const forgetSpecificFailedJob = (job) => async (dispatch) => {
  const result = adminService.forgetSpecificFailedJob(job);
  dispatch({
    type: actionTypes.FORGET_FAILED_JOB,
    payload: result,
  });
  return result;
};

export const getLogsListing = (filter, size, page, query) => async (dispatch) => {
  const result = await adminService.getLogsListing(filter, size, page, query);
  dispatch({
    type: actionTypes.GET_LOGS_LISTING,
    payload: result,
  });
  return result;
};

export const setCurrentProject = (project) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_CURRENT_PROJECT,
    payload: project,
  });
};

export const getLtiTools = (subOrgId, page, size, query, column, orderBy, filterBy) => async (dispatch) => {
  const result = await adminService.getLtiTools(subOrgId, page, size, query, column, orderBy, filterBy);
  dispatch({
    type: actionTypes.GET_LTI_TOOLS,
    payload: result,
    filterLti: filterBy,
  });
  return result;
};

export const getDefaultSso = (subOrgId, page, size = 10, query = '', column = '', orderBy = '', filterBy = '') => async (dispatch) => {
  const result = await adminService.getDefaultSso(subOrgId, page, size, query, column, orderBy, filterBy);
  dispatch({
    type: actionTypes.GET_DEFAULT_SSO,
    payload: result,
  });
  return result;
};

export const getLmsProject = (subOrgId, page, size = 10, query = '', column = '', orderBy = '', filterBy = '') => async (dispatch) => {
  const result = await adminService.getLmsProject(subOrgId, page, size, query, column, orderBy, filterBy);
  dispatch({
    type: actionTypes.GET_LMS_INTEGRATION,
    payload: result,
  });
  return result;
};

export const showRemoveUser = (user) => (dispatch) => {
  dispatch({
    type: actionTypes.SHOW_REMOVE_USER,
    payload: user,
  });
};

export const cancelRemoveUser = () => (dispatch) => {
  dispatch({
    type: actionTypes.CANCEL_REMOVE_USER,
  });
};

export const getSubjects = (subOrgId, page = '', size = '', query = '', column = '', orderBy = '') => async (dispatch) => {
  const result = await adminService.getSubjects(subOrgId, page, size, query, column, orderBy);
  dispatch({
    type: actionTypes.GET_SUBECTS,
    payload: result,
  });
  return result;
};

export const getEducationLevel = (subOrgId, page = '', size = '', query = '', column = '', orderBy = '') => async (dispatch) => {
  const result = await adminService.getEducationLevel(subOrgId, page, size, query, column, orderBy);
  dispatch({
    type: actionTypes.GET_EDUCATION_LEVEL,
    payload: result,
  });
  return result;
};

export const getAuthorTag = (subOrgId, page = '', size = '', query = '', column = '', orderBy = '') => async (dispatch) => {
  const result = await adminService.getAuthorTag(subOrgId, page, size, query, column, orderBy);
  dispatch({
    type: actionTypes.GET_AUTHOR_TAGS,
    payload: result,
  });
  return result;
};

export const gettAllDynamicPermisison = (subOrgId, roleId, add) => async (dispatch) => {
  const result = await adminService.gettAllDynamicPermisison(subOrgId, roleId, add);
  if (add) {
    dispatch({
      type: actionTypes.SET_ALL_DEFAULT_PERMISSION,
      payload: result?.data,
    });
  } else {
    dispatch({
      type: actionTypes.SET_ALL_PERMISSION,
      payload: result?.data,
    });
  }
};

export const getActivityLayout = (subOrgId, page = '', size = '', query = '', column = '', orderBy = '') => async (dispatch) => {
  const result = await adminService.getActivityLayout(subOrgId, page, size, query, column, orderBy);
  dispatch({
    type: actionTypes.GET_ACTIVITY_LAYOUTS,
    payload: result,
  });
  return result;
};

export const teamsActionAdminPanel = (subOrgId, query, page, size, order_by_column = '', order_by_type = '') => async (dispatch) => {
  const result = await adminService.teamsActionAdminPanel(subOrgId, query, page, size, order_by_column, order_by_type.toLowerCase());
  dispatch({
    type: actionTypes.GET_TEAMS_ADMIN,
    payload: result,
  });
  return result;
};
export const getMediaSources = (subOrgId, page = '', size = '', query = '', column = '', orderBy = '') => async (dispatch) => {
  const result = await adminService.getMediaSources(subOrgId, page, size, query, column, orderBy);
  dispatch({
    type: actionTypes.GET_MEDIA_SOURCES,
    payload: result,
  });
  return result;
};
export const getAllMediaSources = () => async (dispatch) => {
  const result = await adminService.getAllMediaSources();
  dispatch({
    type: actionTypes.GET_ALL_MEDIA_SOURCE,
    payload: result,
  });
  return result;
};
export const getOrganizationMedaiSource = (orgId) => async (dispatch) => {
  const result = await adminService.getOrgMediaSource(orgId);
  dispatch({
    type: actionTypes.GET_ORG_MEDIA_SOURCE,
    payload: result,
  });
  return result;
};
export const setLtiToolSettings = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_ORG_LTI_SETTINGS,
    payload: data,
  });
};

export const updateOrganizationMedaiSource = (subOrgId, media_ids, updatedMediasSource) => async (dispatch) => {
  const result = await adminService.updateOrgMediaSource(subOrgId, media_ids);
  if (result) {
    Swal.fire({
      icon: 'success',
      title: result.message,
      allowOutsideClick: false,
    });
    dispatch({
      type: actionTypes.UPDATE_ORG_MEDIA_SOURCE,
      payload: updatedMediasSource,
    });
  }

  return result;
};

export const ltiToolType = (subOrgId) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_LTI_TOOLS_TYPES_REQUEST,
  });
  try {
    const { data } = await adminService.ltiToolType(subOrgId);
    dispatch({
      type: actionTypes.GET_LTI_TOOLS_TYPES_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.GET_LTI_TOOLS_TYPES_REQUEST,
    });
  }
};

export const cloneLtiTool = (subOrgId, id, user_id) => async (dispatch) => {
  try {
    const { data } = await adminService.cloneLtiTool(subOrgId, id, user_id);
    dispatch({
      type: actionTypes.CLONE_LTI_TOOLS_TYPES_SUCCESS,
      payload: data,
    });
  } catch (e) {}
};
