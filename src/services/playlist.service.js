import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const getAll = (projectId, skipContent) => httpService
  .get(`/${apiVersion}/projects/${projectId}/playlists`, {}, { skipContent })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const create = (projectId, playlist) => httpService
  .post(`/${apiVersion}/projects/${projectId}/playlists`, playlist)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const get = (projectId, id) => httpService
  .get(`/${apiVersion}/projects/${projectId}/playlists/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const update = (projectId, id, playlist) => httpService
  .put(`/${apiVersion}/projects/${projectId}/playlists/${id}`, playlist)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const remove = (projectId, id) => httpService
  .remove(`/${apiVersion}/projects/${projectId}/playlists/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const reorder = (projectId, playlists) => httpService
  .post(`/${apiVersion}/projects/${projectId}/playlists/reorder`, { playlists })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const loadShared = (id) => httpService
  .get(`/${apiVersion}/playlists/${id}/load-shared`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const loadLti = (id) => httpService
  .get(`/${apiVersion}/playlists/${id}/lti`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  getAll,
  create,
  get,
  update,
  remove,
  reorder,
  loadShared,
  loadLti,
};
