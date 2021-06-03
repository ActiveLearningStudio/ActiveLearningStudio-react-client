import config from 'config';
import Swal from 'sweetalert2';
import httpService from './http.service';

const { apiVersion } = config;

const addUserInOrganization = (user, subOrgId) => httpService
  .post(`/${apiVersion}/suborganizations/${subOrgId}/add-new-user`, user)
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: err || err.message || 'Error creating new user.',
    });
  });

const editUserInOrganization = (user, subOrgId) => httpService
  .put(`/${apiVersion}/suborganizations/${subOrgId}/update-user-detail`, user)
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: err || err.message || 'Error editing user.',
    });
  });

// project
const getAllProject = (subOrgId, page) => httpService
  .get(`/${apiVersion}/suborganizations/${subOrgId}/projects?page=${page}`)
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: err || err.message || 'Error loading projects.',
    });
  });

const getAllProjectSearch = (subOrgId, page, search) => httpService
  .get(`/${apiVersion}/suborganizations/${subOrgId}/projects?page=${page}&query=${search || ''}`)
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: err || err.message || 'Error loading projects.',
    });
  });

const getUserProject = (subOrgId, page) => httpService
  .get(`/${apiVersion}/suborganizations/${subOrgId}/projects?exclude_starter=true&page=${page}`)
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: err || err.message || 'Error loading projects.',
    });
  });

const getUserProjectSearch = (subOrgId, page, search) => httpService
  .get(`/${apiVersion}/suborganizations/${subOrgId}/projects?exclude_starter=true&page=${page}&query=${search}`)
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: err || err.message || 'Error loading projects.',
    });
  });

const getAllProjectIndex = (subOrgId, page, index) => httpService
  .get(`/${apiVersion}/suborganizations/${subOrgId}/projects?page=${page}&indexing=${index}`)
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: err || err.message || 'Error loading projects.',
    });
  });

const userSerchIndexs = (subOrgId, page, index, search) => httpService
  .get(`/${apiVersion}/suborganizations/${subOrgId}/projects?page=${page}&indexing=${index}&query=${search || ''}`)
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: err || err.message || 'Error loading projects.',
    });
  });

const updateIndex = (projectId, index) => httpService
  .get(`/${apiVersion}/projects/${projectId}/indexes/${index}`)
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: err || err.message || 'Error loading projects.',
    });
  });

const getActivityTypes = (query) => httpService
  .get(`/${apiVersion}/activity-types?query=${query}`)
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: err || err.message || 'Error loading activity types.',
    });
  });

export default {
  addUserInOrganization,
  editUserInOrganization,
  getAllProject,
  getUserProject,
  getAllProjectIndex,
  updateIndex,
  userSerchIndexs,
  getAllProjectSearch,
  getUserProjectSearch,
  getActivityTypes,
};
