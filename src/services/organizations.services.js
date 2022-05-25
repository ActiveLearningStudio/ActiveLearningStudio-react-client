/* eslint-disable */
import config from "config";
import { errorCatcher } from "./errors";

import httpService from "./http.service";

const { apiVersion } = config;

const getAll = () => httpService
  .get(`/${apiVersion}/users/organizations`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const getRoles = (subOrgId) => httpService
  .get(`/${apiVersion}/suborganizations/${subOrgId}/roles`)
  .then(({ data }) => data)
  .catch((err) => {
    // errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const getOrganization = (id) => httpService
  .get(`/${apiVersion}/suborganizations/${id}`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const getOrganizationSearch = (id, search) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/index?query=${search.replace(/#/, '%23')}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const inviteUserOutside = (id, info) => httpService
  .post(`/${apiVersion}/suborganizations/${id}/invite-members`, info)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    return Promise.reject(err.response.data);
  });

const branding = (domain) => httpService
  .get(`/${apiVersion}/organization/get-by-domain?domain=${domain.trim()}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getSubOrganizationList = (id, size, page, query, column = '', orderBy = '') => httpService
  .get(`/${apiVersion}/suborganizations/${id}/index?size=${size}&page=${page}
  ${query !== '' ? `&query=${query}` : ''}${column !== '' ? `&order_by_column=${column}` : ''}${orderBy !== '' ? `&order_by_type=${orderBy}` : ''}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getAllUsers = (id, name, method) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/member-options?query=${name}&page=${method}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const deleteOrganization = (id) => httpService
  .remove(`/${apiVersion}/suborganizations/${id}`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const createOrganization = (organizationData) => httpService
  .post(`/${apiVersion}/suborganizations`, organizationData)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    return Promise.reject(err.response.data);
  });

const updateOrganization = (organizationData, id) => httpService
  .put(`/${apiVersion}/suborganizations/${id}`, organizationData)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    return Promise.reject(err.response.data);
  });

const upload = (id, formData) => httpService
  .post(`/${apiVersion}/suborganizations/${id}/upload-thumb`, formData, {
    'Content-Type': 'multipart/form-data',
  })
  .then((data) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const allPermission = (id) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/permissions`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getOrgUsers = (id, page, activeRole, size, query, column = '', orderBy = '') => httpService
  .get(`/${apiVersion}/suborganizations/${id}/users?page=${page}${activeRole ? `&role=${activeRole}` : ''}${size ? `&size=${size}` : ''}
  ${query !== '' ? `&query=${query}` : ''}${column !== '' ? `&order_by_column=${column}` : ''}${orderBy !== '' ? `&order_by_type=${orderBy}` : ''}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const deleteUserFromOrganization = (id, body) => httpService
  .remove(`/${apiVersion}/suborganizations/${id}/delete-user`, body)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const removeUserFromOrganization = (subOrgId, body) => httpService
  .remove(`/${apiVersion}/suborganizations/${subOrgId}/remove-user`, body)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const searchUserInOrganization = (id, query, page, role, size, column = '', orderBy = '') => httpService
  .get(`/${apiVersion}/suborganizations/${id}/users?query=${query}${page ? `&page=${page}` : ''}${role ? `&role=${role}` : ''}
  ${size ? `&size=${size}` : ''}${column !== '' ? `&order_by_column=${column}` : ''}${orderBy !== '' ? `&order_by_type=${orderBy}` : ''}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const searchUserInView = (id, query) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/users?query=${query}&page=1`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getAllPermissions = (id) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/permissions`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const getAllRoles = (id) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/roles`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const addRole = (id, rolesData) => httpService
  .post(`/${apiVersion}/suborganizations/${id}/add-role`, rolesData)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    return Promise.reject(err.response.data);
  });

const updateRole = (id, rolesData) => httpService
  .put(`/${apiVersion}/suborganizations/${id}/update-role`, rolesData)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    return Promise.reject(err.response.data);
  });

const permissionId = (id) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/default-permissions`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const roleDetail = (id, roleId) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/role/${roleId}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const searchOrganization = (searchKeyword) => httpService
  .get(`/${apiVersion}/organizations/search?query=${searchKeyword.replace(/#/, '%23')}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getOrgsForDeepLinking = (userEmail, ltiClientId) => httpService
  .get(`/${apiVersion}/go/lms/organizations?userEmail=${userEmail}&ltiClientId=${ltiClientId}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const uploadFavicon = (id, formData) =>
  httpService
    .post(`/${apiVersion}/suborganizations/${id}/upload-favicon`, formData, {
      "Content-Type": "multipart/form-data",
    })
    .then((data) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

export default {
  getAll,
  getOrganization,
  branding,
  getSubOrganizationList,
  getAllUsers,
  upload,
  uploadFavicon,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  getRoles,
  inviteUserOutside,
  getOrgUsers,
  getOrganizationSearch,
  deleteUserFromOrganization,
  removeUserFromOrganization,
  searchUserInOrganization,
  allPermission,
  getAllPermissions,
  getAllRoles,
  addRole,
  roleDetail,
  permissionId,
  updateRole,
  searchUserInView,
  searchOrganization,
  getOrgsForDeepLinking,
};
