import config from 'config';
import Swal from 'sweetalert2';
import { errorCatcher } from './errors';
import httpService from './http.service';

const { apiVersion } = config;

const getAll = () => httpService
  .get(`/${apiVersion}/users/organizations`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getRoles = (subOrgId) => httpService
  .get(`/${apiVersion}/suborganizations/${subOrgId}/roles`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getOrganization = (id) => httpService
  .get(`/${apiVersion}/suborganizations/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getOrganizationSearch = (id, search) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/index?query=${search}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const inviteUserOutside = (id, info) => httpService
  .post(`/${apiVersion}/suborganizations/${id}/invite-members`, info)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const branding = (domain) => httpService
  .get(`/${apiVersion}/organization/get-by-domain?domain=${domain.trim()}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getSubOrganizationList = (id) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/index`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getAllUsers = (id, name, method) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/member-options?query=${name}&page=${method}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const deleteOrganization = (id) => httpService
  .remove(`/${apiVersion}/suborganizations/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const createOrganization = (organizationData) => httpService
  .post(`/${apiVersion}/suborganizations`, organizationData)
  .then(({ data }) => data)
  .catch((err) => {
    if (err.response.data?.message) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response.data.message,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong, kindly try again',
      });
    }
  });

const updateOrganization = (organizationData, id) => httpService
  .put(`/${apiVersion}/suborganizations/${id}`, organizationData)
  .then(({ data }) => data)
  .catch((err) => {
    if (err.response.data?.message) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response.data.message,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong, kindly try again',
      });
    }
  });

const upload = (id, formData) => httpService
  .post(`/${apiVersion}/suborganizations/${id}/upload-thumb`, formData, {
    'Content-Type': 'multipart/form-data',
  })
  .then((data) => data)
  .catch((err) => {
    if (err.response.data.errors) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response.data.errors[0],
      });
    }
  });

const allPermission = (id) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/permissions`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getOrgUsers = (id, page, size, activeRole) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/users?page=${page}&size=${size}${activeRole ? `&role=${activeRole}` : ''}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const deleteUserFromOrganization = (id, body) => httpService
  .remove(`/${apiVersion}/suborganizations/${id}/delete-user`, body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const removeUserFromOrganization = (subOrgId, body) => httpService
  .remove(`/${apiVersion}/suborganizations/${subOrgId}/remove-user`, body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const searchUserInOrganization = (id, query, page) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/users?query=${query}&page=${page}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getAllPermissions = (id) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/permissions`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

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
export default {
  getAll,
  getOrganization,
  branding,
  getSubOrganizationList,
  getAllUsers,
  upload,
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
};
