import adminService from 'services/admin.service';
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
  const { organization: { activeOrganization } } = centralizedState;
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
  const { organization: { activeOrganization } } = centralizedState;
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

export const getActivityTypes = (query) => async (dispatch) => {
  const result = await adminService.getActivityTypes(query);
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
