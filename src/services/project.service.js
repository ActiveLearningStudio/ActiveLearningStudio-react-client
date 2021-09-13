import Swal from 'sweetalert2';

import config from 'config';
import httpService from './http.service';
import { errorCatcher } from './errors';

const { apiVersion } = config;

const getAllFav = (subOrgId) => httpService
  .get(`/${apiVersion}/suborganization/${subOrgId}/projects/favorites`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getAll = (subOrgId) => httpService
  .get(`/${apiVersion}/suborganization/${subOrgId}/projects`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getClone = (subOrgId) => httpService
  .get(`/${apiVersion}/suborganization/${subOrgId}/projects/detail`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const create = (project, subOrgId) => httpService
  .post(`/${apiVersion}/suborganization/${subOrgId}/projects`, project)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const get = (id, subOrgId) => httpService
  .get(`/${apiVersion}/suborganization/${subOrgId}/projects/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getIndexed = (id) => httpService
  .get(`/${apiVersion}/projects/${id}/status-update`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    return Promise.reject(err.response.data);
  });

const getelastic = (id) => httpService
  .get(`/${apiVersion}/projects/${id}/indexing`)
  .then(({ data }) => data)
  .catch((err) => err.response.data);

const update = (id, project, subOrgId) => httpService
  .put(`/${apiVersion}/suborganization/${subOrgId}/projects/${id}`, project)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const remove = (id, subOrgId) => httpService
  .remove(`/${apiVersion}/suborganization/${subOrgId}/projects/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const upload = (formData, conf, subOrgId) => httpService
  .post(`/${apiVersion}/suborganization/${subOrgId}/projects/upload-thumb`, formData, {
    'Content-Type': 'multipart/form-data',
  }, conf)
  .then(({ data }) => data)
  .catch((err) => {
    if (err.response.data.errors) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response.data.errors[0],
      });
    }
  });

const share = (id, subOrgId) => httpService
  .post(`/${apiVersion}/suborganization/${subOrgId}/projects/${id}/share`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const shareProjects = (id) => httpService
  .post(`/${apiVersion}/projects/shared`, { user_id: id })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const removeShared = (subOrgId, id) => httpService
  .post(`/${apiVersion}/suborganization/${subOrgId}/projects/${id}/remove-share`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const addToFav = (id, subOrgId) => httpService
  .post(`/${apiVersion}/suborganization/${subOrgId}/projects/${id}/favorite`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getShared = (id) => httpService
  .get(`/${apiVersion}/projects/${id}/load-shared`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const lmsSetting = () => httpService
  .get(`/${apiVersion}/go/lms-settings/user/me`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const fetchLmsDetails = (lms, projectId, settingId) => httpService
  .post(`/${apiVersion}/go/${lms}/projects/${projectId}/fetch`, {
    setting_id: settingId,
  }).then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getReorderAll = (projectData, subOrgId) => httpService
  .post(`/${apiVersion}/suborganization/${subOrgId}/projects/reorder`, {
    projects: projectData,
  }).then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const lmsPublish = (lms, projectId, settingId, counter, playlistId) => httpService
  .post(`/${apiVersion}/go/${lms}/projects/${projectId}/playlists/${playlistId}/publish`, {
    setting_id: settingId,
    counter,
  }).then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const deepLinking = (dataDeep) => httpService
  .post(`/${apiVersion}/go/lms/projects`, dataDeep).then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getSampleProject = (subOrgId) => httpService
  .get(`/${apiVersion}/suborganization/${subOrgId}/projects/default`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getUpdatedProjects = () => httpService
  .get(`/${apiVersion}/projects/recent`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const visibilityTypes = () => httpService
  .get(`/${apiVersion}/suborganizations/visibility-types`)
  .then((data) => data)
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
export default {
  getAll,
  create,
  get,
  update,
  remove,
  upload,
  share,
  removeShared,
  getShared,
  lmsSetting,
  fetchLmsDetails,
  lmsPublish,
  deepLinking,
  getSampleProject,
  getUpdatedProjects,
  getClone,
  getReorderAll,
  getIndexed,
  getelastic,
  addToFav,
  getAllFav,
  shareProjects,
  visibilityTypes,
};
