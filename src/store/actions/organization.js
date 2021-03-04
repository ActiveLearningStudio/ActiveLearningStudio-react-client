import organization from 'services/organizations.services';

import * as actionTypes from '../actionTypes';

export const updateOrganizationScreen = (screen) => (dispatch) => {
  dispatch({
    type: actionTypes.CHANGE_ACTIVE_SCREEN,
    payload: screen,
  });
};

export const updatePreviousScreen = (screen) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_PREVIOUS_SCREEN,
    payload: screen,
  });
};

export const getAllOrganization = () => async (dispatch) => {
  const result = await organization.getAll();
  dispatch({
    type: actionTypes.ADD_ALL_ORG,
    payload: result.data,
  });
};

export const getOrganization = (id) => async (dispatch) => {
  const result = await organization.getOrganization(id);
  dispatch({
    type: actionTypes.ADD_ACTIVE_ORG,
    payload: result.suborganization,
  });
};

export const getOrganizationFirstTime = (id) => async (dispatch) => {
  const result = await organization.getOrganization(id);
  console.log(result);
  dispatch({
    type: actionTypes.ADD_ACTIVE_ORG,
    payload: result.suborganization,
  });
  dispatch({
    type: actionTypes.ADD_CURRENT_ORG,
    payload: result.suborganization,
  });
};

export const setCurrenteOrganization = (org) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_CURRENT_ORG,
    payload: org,
  });
};

export const setActiveOrganization = (org) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_ACTIVE_ORG,
    payload: org,
  });
};

export const setCurrentOrganization = (data) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_CURRENT_ORG,
    payload: data,
  });
};

export const getBranding = (data) => async (dispatch) => {
  const result = await organization.branding(data);
  dispatch({
    type: actionTypes.ADD_ACTIVE_ORG,
    payload: result?.organization,
  });
  dispatch({
    type: actionTypes.ADD_CURRENT_ORG,
    payload: result?.organization,
  });
  return result;
};

export const checkBranding = (data) => async () => {
  const result = await organization.branding(data);
  return result;
};

export const getsubOrgList = (id) => async (dispatch) => {
  const result = await organization.getSubOrganizationList(id);
  dispatch({
    type: actionTypes.ADD_SUBORG_LIST,
    payload: result.suborganization,
  });
  return result;
};

export const clearSuborgList = () => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_SUBORG_LIST,
  });
};

export const uploadImage = (id, formData) => () => organization.upload(id, formData);

export const deleteOrganization = (data) => async (dispatch) => {
  const result = await organization.deleteOrganization(data.id);
  dispatch({
    type: actionTypes.NEW_SUBORG_ADD,
    payload: data,
  });
  return result;
};

export const createOrganizationNew = (data, allUsers, alladmins) => async (dispatch) => {
  const adminUsers = alladmins.map((admin) => admin?.value?.userInfo?.id);
  const usersList = allUsers.map((user) => (
    {
      user_id: user?.value?.userInfo?.id,
      role_id: user?.role?.id,
    }
  ));
  const details = {
    name: data.name,
    description: data.description,
    image: data.image,
    parent_id: data.parent_id,
    admins: adminUsers,
    users: usersList,
    domain: data.domain,
  };
  const result = await organization.createOrganization(details);
  dispatch({
    type: actionTypes.NEW_SUBORG_ADD,
    payload: result.suborganization,
  });
  return result;
};

export const updateOrganization = (id, data, allUsers, alladmins) => async (dispatch) => {
  const adminUsers = alladmins.map((admin) => admin?.value?.userInfo?.id);
  const usersList = allUsers.map((user) => (
    {
      user_id: user?.value?.userInfo?.id,
      role_id: user?.role?.id,
    }
  ));
  const details = {
    name: data.name,
    description: data.description,
    image: data.image,
    parent_id: data.parent_id,
    admins: adminUsers,
    users: usersList,
  };
  const result = await organization.updateOrganization(details, id);
  dispatch({
    type: actionTypes.NEW_SUBORG_ADD,
    payload: result.suborganization,
  });
  return result;
};

export const allUsers = (data) => async () => {
  const result = await organization.getAllUsers(data);
  return result;
};

export const editOrganization = (org) => (dispatch) => {
  dispatch({
    type: actionTypes.EDIT_ORGANIZATION,
    payload: org,
  });
};

export const updateFeedbackScreen = (type) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_FEEDBACK,
    payload: type,
  });
};

export const getRoles = () => async (dispatch) => {
  const result = await organization.getRoles();
  dispatch({
    type: actionTypes.ALL_ROLES,
    payload: result.data,
  });
};
