import config from 'config';
import Swal from 'sweetalert2';

import httpService from './http.service';

const { apiVersion } = config;

const getAll = () => httpService
  .get(`/${apiVersion}/users/organizations`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getOrganization = (id) => httpService
  .get(`/${apiVersion}/suborganizations/${id}`)
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

const getAllUsers = (id, name) => httpService
  .get(`/${apiVersion}/suborganizations/${id}/member-options?query=${name}`)
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
};
