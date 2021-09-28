import config from 'config';
import httpService from './http.service';
import { errorCatcher } from './errors';

const { apiVersion } = config;

const addUserInOrganization = (user, subOrgId) => httpService
  .post(`/${apiVersion}/suborganizations/${subOrgId}/add-new-user`, user)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const editUserInOrganization = (user, subOrgId) => httpService
  .put(`/${apiVersion}/suborganizations/${subOrgId}/update-user-detail`, user)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

// project
const getAllProject = (subOrgId, page) => httpService
  .get(`/${apiVersion}/suborganizations/${subOrgId}/projects?page=${page}`)
  .then(({ data }) => data)
  .catch((err) => {
    // errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const exportProject = (subOrgId, projectId) => httpService
  .post(`/${apiVersion}/suborganization/${subOrgId}/projects/${projectId}/export`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    return Promise.reject(err.response.data);
  });

const importProject = (subOrgId, projectData) => httpService
  .post(`/${apiVersion}/suborganization/${subOrgId}/projects/import`, projectData)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    return Promise.reject(err.response.data);
  });

const getAllProjectSearch = (subOrgId, page, search) => httpService
  .get(`/${apiVersion}/suborganizations/${subOrgId}/projects?page=${page}&query=${search.replace(/#/, '%23') || ''}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getUserProject = (subOrgId, page) => httpService
  .get(`/${apiVersion}/suborganizations/${subOrgId}/projects?exclude_starter=true&page=${page}`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const getUserProjectSearch = (subOrgId, page, search) => httpService
  .get(`/${apiVersion}/suborganizations/${subOrgId}/projects?exclude_starter=true&page=${page}&query=${search.replace(/#/, '%23')}`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    return Promise.reject(err.response.data);
  });

const getAllProjectIndex = (subOrgId, page, index) => httpService
  .get(`/${apiVersion}/suborganizations/${subOrgId}/projects?page=${page}&indexing=${index}`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    return Promise.reject(err.response.data);
  });

const userSerchIndexs = (subOrgId, page, index, search) => httpService
  .get(`/${apiVersion}/suborganizations/${subOrgId}/projects?page=${page}&indexing=${index}&query=${search.replace(/#/, '%23') || ''}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const updateIndex = (projectId, index) => httpService
  .get(`/${apiVersion}/projects/${projectId}/indexes/${index}`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const getLmsProject = (subOrgId, page) => httpService
  .get(`${apiVersion}/admin/lms-settings?page=${page}`)
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
  });

const deleteLmsProject = (subOrgId, id) => httpService
  .remove(`${apiVersion}/admin/lms-settings/${id}`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    return Promise.reject();
  });

const updateLmsProject = (subOrgId, id, values) => httpService
  .put(`${apiVersion}/admin/lms-settings/${id}`, values)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    return Promise.reject();
  });

const createLmsProject = (subOrgId, values) => httpService
  .post(`${apiVersion}/admin/lms-settings`, values)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    return Promise.reject();
  });

const getLmsProjectSearch = (subOrgId, search, page) => httpService
  .get(`${apiVersion}/suborganizations/${subOrgId}/lms-settings?page=${page}&query=${search.replace(/#/, '%23')}`)
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
  });

const getActivityTypes = (query) => httpService
  .get(`/${apiVersion}/activity-types?query=${query}`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const getUserReport = (mode, size, page, query) => httpService
  .get(`/${apiVersion}/users/report/basic${mode ? `?mode=${mode}` : ''}${size ? `&size=${size}` : ''}${page ? `&page=${page}` : ''}${query ? `&query=${query}` : ''}`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const getJobListing = (filter, size, page, query) => httpService
  .get(`/${apiVersion}/queue-monitor/jobs${filter ? `?filter=${filter}` : ''}${size ? `&size=${size}` : ''}${page ? `&page=${page}` : ''}${query ? `&query=${query}` : ''}`)
  .then((data) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const retryAllFailedJobs = () => httpService
  .get(`/${apiVersion}/queue-monitor/jobs/retry/all`)
  .then((data) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const retrySpecificFailedJob = (job) => httpService
  .get(`/${apiVersion}/queue-monitor/jobs/retry/${job}`)
  .then((data) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const forgetAllFailedJobs = () => httpService
  .get(`/${apiVersion}/queue-monitor/jobs/forget/all`)
  .then((data) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const forgetSpecificFailedJob = (job) => httpService
  .get(`/${apiVersion}/queue-monitor/jobs/forget/${job}`)
  .then((data) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const getLogsListing = (filter, size, page, query) => httpService
  .get(`/${apiVersion}/queue-monitor${filter ? `?filter=${filter}` : ''}${size ? `&size=${size}` : ''}${page ? `&page=${page}` : ''}${query ? `&query=${query}` : ''}`)
  .then((data) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
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
  exportProject,
  getUserProjectSearch,
  getActivityTypes,
  getLmsProject,
  getLmsProjectSearch,
  deleteLmsProject,
  updateLmsProject,
  getUserReport,
  createLmsProject,
  getJobListing,
  retryAllFailedJobs,
  retrySpecificFailedJob,
  forgetAllFailedJobs,
  forgetSpecificFailedJob,
  getLogsListing,
  importProject,
};
