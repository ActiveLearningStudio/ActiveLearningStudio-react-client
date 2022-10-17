/* eslint-disable */
import organization from 'services/organizations.services';
import store from 'store';
import Swal from 'sweetalert2';
import * as actionTypes from '../actionTypes';
import { DynamicBrandingApply } from 'containers/App/DynamicBrandingApply';
import adminService from 'services/admin.service';

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

export const getOrgsForDeepLinkingAction = (userEmail, ltiClientId) => async (dispatch) => {
  const result = await organization.getOrgsForDeepLinking(userEmail, ltiClientId);
  dispatch({
    type: actionTypes.ADD_ALL_ORG,
    payload: result.organizations,
  });
};

export const getAllOrganizationSearch = (id, search) => async (dispatch) => {
  const result = await organization.getOrganizationSearch(id, search);
  dispatch({
    type: actionTypes.ADD_SUBORG_LIST,
    payload: result,
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
  return result;
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

export const getsubOrgList = (id, size = 10, page = 1, query = '', column = '', orderBy = '') => async (dispatch) => {
  const result = await organization.getSubOrganizationList(id, size, page, query, column, orderBy);
  dispatch({
    type: actionTypes.ADD_SUBORG_LIST,
    payload: result,
  });
  return result;
};

export const clearSuborgList = () => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_SUBORG_LIST,
  });
};

export const uploadImage = (id, formData) => () => organization.upload(id, formData);

export const uploadFaviconIcon = (id, formData) => () => organization.uploadFavicon(id, formData);

export const deleteOrganization = (data) => async (dispatch) => {
  const result = await organization.deleteOrganization(data.id);
  dispatch({
    type: actionTypes.REMOVE_SUBORG_DEL,
    payload: data,
  });
  return result;
};

export const createOrganizationNew = (id, data) => async (dispatch) => {
  const libraryPreferences = [];

  if (data.lp_private || !data.lp_private) {
    libraryPreferences.push(1);
  }
  if (data.lp_my_org) {
    libraryPreferences.push(2);
  }
  if (data.lp_my_org_parent) {
    libraryPreferences.push(3);
  }
  if (data.lp_all) {
    libraryPreferences.push(4);
  }
  const details = {
    name: data.name,
    description: data.description,
    image: data.image,
    favicon: data.favicon,
    parent_id: id,
    account_id: data.account_id,
    api_key: data.api_key,
    unit_path: data.unit_path,
    domain: data.domain,
    self_registration: data.self_registration,
    noovo_client_id: data.noovo_client_id || undefined,
    // gcr_project_visibility: data?.gcr_project_visibility || false,
    // gcr_playlist_visibility: data?.gcr_playlist_visibility || false,
    // gcr_activity_visibility: data?.gcr_activity_visibility || false,
    tos_type: data.tos_type,
    tos_url: data.tos_url,
    tos_content: data.tos_content,
    privacy_policy_type: data.privacy_policy_type,
    privacy_policy_url: data.privacy_policy_url,
    privacy_policy_content: data.privacy_policy_content,
    primary_color: data.primary_color,
    secondary_color: data.secondary_color,
    tertiary_color: data.tertiary_color,
    primary_font_family: data.primary_font_family,
    secondary_font_family: data.secondary_font_family,
    visibility_type_id: libraryPreferences,
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
  const libraryPreferences = [];

  if (data.lp_private || !data.lp_private) {
    libraryPreferences.push(1);
  }
  if (data.lp_my_org) {
    libraryPreferences.push(2);
  }
  if (data.lp_my_org_parent) {
    libraryPreferences.push(3);
  }
  if (data.lp_all) {
    libraryPreferences.push(4);
  }
  const centralizedState = store.getState();
  const {
    organization: { currentOrganization, activeOrganization },
  } = centralizedState;
  const details = {
    name: data.name,
    description: data.description,
    image: data.image,
    favicon: data.favicon,
    parent_id: parent,
    domain: data.domain,
    account_id: data.account_id || '',
    api_key: data.api_key || '',
    unit_path: data.unit_path || '',
    self_registration: data.self_registration,
    noovo_client_id: data.noovo_client_id || undefined,
    // gcr_project_visibility: data?.gcr_project_visibility || false,
    // gcr_playlist_visibility: data?.gcr_playlist_visibility || false,
    // gcr_activity_visibility: data?.gcr_activity_visibility || false,
    tos_type: data.tos_type,
    tos_url: data.tos_url,
    tos_content: data.tos_content,
    privacy_policy_type: data.privacy_policy_type,
    privacy_policy_url: data.privacy_policy_url,
    privacy_policy_content: data.privacy_policy_content,
    primary_color: data.primary_color,
    secondary_color: data.secondary_color,
    tertiary_color: data.tertiary_color,
    primary_font_family: data.primary_font_family,
    secondary_font_family: data.secondary_font_family,
    visibility_type_id: libraryPreferences,
    // admins: adminUsers,
    // users: usersList,
  };
  const result = organization.updateOrganization(details, id);
  result.then((newOrg) => {
    console.log('newOrg', newOrg);
    dispatch({
      type: actionTypes.ADD_SUBORG_EDIT,
      payload: newOrg.suborganization,
    });
    dispatch({
      type: actionTypes.UPDATE_ALL_ORG,
      payload: newOrg.suborganization,
    });

    if (activeOrganization?.id == newOrg.suborganization.id) {
      dispatch({
        type: actionTypes.ORG_UPDATE_LIBRARY_PREFERENCE,
        payload: newOrg?.suborganization?.allowed_visibility_type_id,
      });
    }

    if (newOrg.suborganization.id === currentOrganization.id) {
      DynamicBrandingApply(newOrg?.suborganization);
      dispatch({
        type: actionTypes.ADD_CURRENT_ORG,
        payload: newOrg.suborganization,
      });
    }
    dispatch({
      type: 'CLEAR_ACTIVE_FORM',
    });
  });
  return result;
};
export const updateOrgGcrSettings = (data, id, gcr) => async (dispatch) => {
  Swal.fire({
    title: 'Please Wait !',
    text: 'Updating view...!!!',
    allowOutsideClick: false,
  });
  if (!!gcr) {
    const filtergcr = {
      gcr_project_visibility: data.gcr_project_visibility,
      gcr_playlist_visibility: data.gcr_playlist_visibility,
      gcr_activity_visibility: data.gcr_activity_visibility,
    };

    const result = await organization.updateOrganizationGcrSettings(filtergcr, id);
    if (result.success) {
      dispatch({
        type: actionTypes.ORG_UPDATE_GCR_SETTINGS,
        payload: filtergcr,
      });
      Swal.fire({
        icon: 'success',
        title: result?.success[0],
      });
    }
  } else {
    const filtermsTeamSettings = {
      msteam_project_visibility: data.msteam_project_visibility,
      msteam_playlist_visibility: data.msteam_playlist_visibility,
      msteam_activity_visibility: data.msteam_activity_visibility,
      msteam_client_id: data.msteam_client_id,
      msteam_secret_id: data.msteam_secret_id,
      msteam_tenant_id: data.msteam_tenant_id,
      msteam_secret_id_expiry: data.msteam_secret_id_expiry,
    };
    const res = await organization.updateOrganizationGcrSettings(filtermsTeamSettings, id);
    if (res.success) {
      dispatch({
        type: actionTypes.ORG_UPDATE_GCR_SETTINGS,
        payload: filtermsTeamSettings,
      });
      Swal.fire({
        icon: 'success',
        title: res?.success[0],
      });
    }
  }
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
  const {
    organization: { activeOrganization },
  } = centralizedState;
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

export const getOrgUsers = (id, page, activeRole, size, query = '', column = '', orderBy = '') => async (dispatch) => {
  let result = '';
  // const centralizedState = store.getState();
  // const { organization: { activeOrganization, currentOrganization } } = centralizedState;
  // if (activeOrganization?.id !== currentOrganization?.id) {
  //   result = await organization.getOrgUsers(id, page, size);
  // }
  result = await organization.getOrgUsers(id, page, activeRole, size, query, column, orderBy);
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
  const {
    organization: { activeOrganization, users, searchUsers },
  } = store.getState();
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
  const {
    organization: { activeOrganization, users, searchUsers },
  } = store.getState();
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

export const searchUserInOrganization = (id, query, page, role, size, column, orderBy) => async (dispatch) => {
  const result = await organization.searchUserInOrganization(id, query, page, role, size, column, orderBy);
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
export const updateAllDynamicPermisison = (subOrgId, data, currentOrg) => async (dispatch) => {
  Swal.fire({
    title: 'Please Wait !',
    html: 'Updating Role ...',
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  const result = adminService.updateAllDynamicPermisison(subOrgId, data);
  result.then((res) => {
    if (subOrgId === currentOrg) {
      dispatch(getAllPermission(subOrgId));
    }
    Swal.fire({
      icon: 'success',
      title: res?.message,
    });
  });
};
export const updateRole = (id, roleId, currentOrg) => async (dispatch) => {
  Swal.fire({
    title: 'Please Wait !',
    html: 'Creating New Role ...',
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  const result = organization.updateRole(id, roleId);
  result.then((res) => {
    if (id === currentOrg) {
      dispatch(getAllPermission(id));
    }
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
