import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const getAll = () => httpService
  .get(`/${apiVersion}/projects`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const create = (project) => httpService
  .post(`/${apiVersion}/projects`, project)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const get = (id) => httpService
  .get(`/${apiVersion}/projects/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const update = (id, project) => httpService
  .put(`/${apiVersion}/projects/${id}`, project)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const remove = (id) => httpService
  .remove(`/${apiVersion}/projects/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const upload = (formData, conf) => httpService
  .post(`/${apiVersion}/projects/upload-thumb`, formData, {
    'Content-Type': 'multipart/form-data',
  }, conf)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const share = (id) => httpService
  .post(`/${apiVersion}/projects/${id}/share`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const removeShared = (id) => httpService
  .post(`/${apiVersion}/projects/${id}/remove-share`)
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

const lmsPublish = (lms, projectId, settingId, counter, playlistId) => httpService
  .post(`/${apiVersion}/go/${lms}/projects/${projectId}/playlists/${playlistId}/publish`, {
    setting_id: settingId,
    counter,
  }).then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

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
};
