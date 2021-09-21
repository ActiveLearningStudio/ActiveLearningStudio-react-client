import organization from 'services/organizations.services';
import store from 'store';
import Swal from 'sweetalert2';

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

export const getAllOrganizationSearch = (id, search) => async (dispatch) => {
  const result = await organization.getOrganizationSearch(id, search);
  dispatch({
    type: actionTypes.ADD_SUBORG_LIST,
    payload: result?.suborganization,
  });
};

export const getOrganization = (id) => async (dispatch) => {
  const result = await organization.getOrganization(id);
  dispatch({
    type: actionTypes.ADD_ACTIVE_ORG,
    payload: result.suborganization,
  });
  return result.suborganization;
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

export const getAllOrganizationforSSO = () => async (dispatch) => {
  const result = await organization.getAll();
  dispatch({
  type: actionTypes.ADD_ACTIVE_ORG,
  payload: result?.data[0],
  });
  dispatch({
  type: actionTypes.ADD_CURRENT_ORG,
  payload: result?.data[0],
  });

  const permissionsResult = await organization.allPermission(result?.data[0].id);
  dispatch({
    type: actionTypes.SET_ALL_PERSMISSION,
    payload: permissionsResult.permissions,
  });

  const rolesResult = await organization.getRoles(result?.data[0].id);
  dispatch({
    type: actionTypes.ALL_ROLES,
    payload: rolesResult?.data,
  });
};

export const clearOrganizationState = () => (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_STATES_IN_ORGANIZATION,
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
    type: actionTypes.REMOVE_SUBORG_DEL,
    payload: data,
  });
  return result;
};

export const createOrganizationNew = (id, data) => async (dispatch) => {
  // const adminUsers = alladmins.map((admin) => admin?.value?.userInfo?.id);
  // const usersList = allUsers.map((user) => (
  //   {
  //     user_id: user?.value?.userInfo?.id,
  //     role_id: user?.role?.id,
  //   }
  // ));
  const details = {
    name: data.name,
    description: data.description,
    image: data.image,
    parent_id: id,
    account_id: data.account_id,
    api_key: data.api_key,
    unit_path: data.unit_path,
    domain: data.domain,
    self_registration: data.self_registration,
  };
  const result = organization.createOrganization(details);
  result.then((newOrg) => {
    dispatch({
      type: actionTypes.NEW_SUBORG_ADD,
      payload: newOrg.suborganization,
    });
    dispatch({
      type: 'CLEAR_ACTIVE_FORM',
    });
  });
  return result;
};

export const updateOrganization = (id, data, parent) => async (dispatch) => {
  // const adminUsers = alladmins.map((admin) => admin?.value?.userInfo?.id);
  // const usersList = allUsers.map((user) => (
  //   {
  //     user_id: user?.value?.userInfo?.id,
  //     role_id: user?.role?.id,
  //   }
  // ));
  const details = {
    name: data.name,
    description: data.description,
    image: data.image,
    parent_id: parent,
    domain: data.domain,
    account_id: data.account_id || '',
    api_key: data.api_key || '',
    unit_path: data.unit_path || '',
    self_registration: data.self_registration,

    // admins: adminUsers,
    // users: usersList,
  };
  const result = organization.updateOrganization(details, id);
  result.then((newOrg) => {
    dispatch({
      type: actionTypes.ADD_SUBORG_EDIT,
      payload: newOrg.suborganization,
    });
    dispatch({
      type: 'CLEAR_ACTIVE_FORM',
    });
  });
  return result;
};

export const allUsers = (id, name, method) => async () => {
  const result = await organization.getAllUsers(id, name, method);
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
  const centralizedState = store.getState();
  const { organization: { activeOrganization } } = centralizedState;
  const result = await organization.getRoles(activeOrganization?.id);
  dispatch({
    type: actionTypes.ALL_ROLES,
    payload: result?.data,
  });
};

export const inviteUserOutside = (id, data) => async () => {
  const result = await organization.inviteUserOutside(id, data);
  return result;
};

export const saveHistory = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.SAVE_HISTORY,
    payload: data,
  });
};

export const clearHistory = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLEAR_HISTORY,
  });
};

export const getOrgUsers = (id, page, activeRole) => async (dispatch) => {
  let result = '';
  // const centralizedState = store.getState();
  // const { organization: { activeOrganization, currentOrganization } } = centralizedState;
  // if (activeOrganization?.id !== currentOrganization?.id) {
  //   result = await organization.getOrgUsers(id, page, size);
  // }
  result = await organization.getOrgUsers(id, page, activeRole);
  dispatch({
    type: actionTypes.GET_ORGANIZATION_USERS,
    payload: {
      result,
      page,
      activeRole,
    },
  });
  return result;
};

export const deleteUserFromOrganization = (id, preserveData) => async (dispatch) => {
  const { organization: { activeOrganization, users, searchUsers } } = store.getState();
  const result = await organization.deleteUserFromOrganization(activeOrganization?.id, { user_id: id, preserve_data: preserveData });
  if (result) {
    users.data = users.data?.filter((user) => user.id !== id);
    searchUsers.data = searchUsers.data?.filter((user) => user.id !== id);
    dispatch({
      type: actionTypes.DELETE_USER_FROM_ORGANIZATION,
      payload: { users, searchUsers },
    });
  }
};

export const removeUserFromOrganization = (id, preserveData) => async (dispatch) => {
  const { organization: { activeOrganization, users, searchUsers } } = store.getState();
  const result = await organization.removeUserFromOrganization(activeOrganization?.id, { user_id: id, preserve_data: preserveData });
  if (result) {
    users.data = users.data?.filter((user) => user.id !== id);
    searchUsers.data = searchUsers.data?.filter((user) => user.id !== id);
    dispatch({
      type: actionTypes.REMOVE_USER_FROM_ORGANIZATION,
      payload: { users, searchUsers },
    });
  }
};

export const searchUserInOrganization = (id, query, page, role) => async (dispatch) => {
  const result = await organization.searchUserInOrganization(id, query, page, role);
  dispatch({
    type: actionTypes.SEARCH_USER_IN_ORGANIZATION,
    payload: result,
  });
  return result;
};

export const clearSearchUserInOrganization = () => (dispatch) => {
  dispatch({
    type: actionTypes.SEARCH_USER_IN_ORGANIZATION,
    payload: null,
  });
};

export const searchUserInOrganizationView = (id, query) => async (dispatch) => {
  const result = await organization.searchUserInView(id, query);
  dispatch({
    type: actionTypes.SEARCH_USER_IN_ORGANIZATION,
    payload: result,
  });
  return result;
};

export const getAllPermission = (id) => async (dispatch) => {
  const result = await organization.allPermission(id);
  dispatch({
    type: actionTypes.SET_ALL_PERSMISSION,
    payload: result.permissions,
  });
  return result;
};

export const getAllPermissionId = (id) => async (dispatch) => {
  const result = await organization.permissionId(id);
  dispatch({
    type: actionTypes.SET_ALL_PERSMISSION_ID,
    payload: result.permissions,
  });
};

export const roleDetail = (id, roleId) => async (dispatch) => {
  const result = await organization.roleDetail(id, roleId);
  dispatch({
    type: actionTypes.SET_ACTIVE_PERMISSION,
    payload: result?.data,
  });
};

export const updateRole = (id, roleId) => async (dispatch) => {
  Swal.fire({
    title: 'Please Wait !',
    html: 'Updating Role ...',
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  const result = organization.updateRole(id, roleId);
  result.then((res) => {
    dispatch(getAllPermission(id));
    Swal.fire({
      icon: 'success',
      title: res?.message,
    });
  });
};

export const addRole = (id, data) => async () => {
  Swal.fire({
    title: 'Please Wait !',
    html: 'Updating Role ...',
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  const result = organization.addRole(id, data);
  result.then((res) => {
    Swal.fire({
      icon: 'success',
      title: res?.message,
    });
  });
  return result;
};

export const updatePageNumber = (pageNo) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_PAGE_NUMBER,
    payload: pageNo,
  });
};

export const resetPageNumber = () => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_PAGE_NUMBER,
  });
};
