import adminService from 'services/admin.service';
import * as actionTypes from '../actionTypes';
import store from '../index';

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
    type: actionTypes.ADD_NEW_USER,
    payload: result,
  });
  return result;
};

export const editUserInOrganization = (user) => async (dispatch) => {
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  const result = await adminService.editUserInOrganization(user, activeOrganization?.id);
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
