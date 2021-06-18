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
    // admins: adminUsers,
    // users: usersList,
    domain: data.domain,
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
    Swal.fire({
      icon: 'success',
      text: 'Created',
    });
  }).catch((err) => {
    try {
      Object.keys(err.errors).map((errors, index) => {
        if (index < 1) {
          Swal.fire({
            icon: 'error',
            text: err.errors[errors],
          });
        }
        return true;
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  });
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
    Swal.fire({
      icon: 'success',
      text: 'updated',
    });
  }).catch((err) => {
    try {
      Object.keys(err.errors).map((errors, index) => {
        if (index < 1) {
          Swal.fire({
            icon: 'error',
            text: err.errors[errors]?.[0],
          });
        }
        return true;
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  });
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
    payload: result.data,
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

export const getOrgUsers = (id, page, size, activeRole) => async (dispatch) => {
  let result = '';
  const centralizedState = store.getState();
  const { organization: { activeOrganization, currentOrganization } } = centralizedState;
  if (activeOrganization?.id !== currentOrganization?.id) {
    result = await organization.getOrgUsers(id, page, size);
  }
  result = await organization.getOrgUsers(id, page, size, activeRole);
  dispatch({
    type: actionTypes.GET_ORGANIZATION_USERS,
    payload: {
      result,
      page,
      size,
    },
  });
  return result;
};

export const deleteUserFromOrganization = (id, preserveData) => async (dispatch) => {
  const { organization: { activeOrganization, users } } = store.getState();
  await organization.deleteUserFromOrganization(activeOrganization?.id, { user_id: id, preserve_data: preserveData });
  users.data = users.data?.filter((user) => user.id !== id);
  dispatch({
    type: actionTypes.DELETE_USER_FROM_ORGANIZATION,
    payload: users,
  });
};

export const removeUserFromOrganization = (id, preserveData) => async (dispatch) => {
  const { organization: { activeOrganization, users } } = store.getState();
  await organization.removeUserFromOrganization(activeOrganization?.id, { user_id: id, preserve_data: preserveData });
  users.data = users.data?.filter((user) => user.id !== id);
  dispatch({
    type: actionTypes.REMOVE_USER_FROM_ORGANIZATION,
    payload: users,
  });
};

export const searchUserInOrganization = (id, query, page) => async (dispatch) => {
  const result = await organization.searchUserInOrganization(id, query, page);
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
    payload: result.data,
  });
};

export const updateRole = (id, roleId) => async () => {
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
