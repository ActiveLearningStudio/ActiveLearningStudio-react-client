import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const getAll = (playlistId) => httpService
  .get(`/${apiVersion}/playlists/${playlistId}/activities`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const create = (playlistId, activity) => httpService
  .post(`/${apiVersion}/playlists/${playlistId}/activities`, activity)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const get = (playlistId, id) => httpService
  .get(`/${apiVersion}/playlists/${playlistId}/activities/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const update = (playlistId, id, activity) => httpService
  .put(`/${apiVersion}/playlists/${playlistId}/activities/${id}`, activity)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const remove = (playlistId, id) => httpService
  .remove(`/${apiVersion}/playlists/${playlistId}/activities/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getTypes = () => httpService
  .get(`/${apiVersion}/activity-types`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getItems = (activityTypeId) => httpService
  .get(`/${apiVersion}/activity-types/${activityTypeId}/items`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const loadResource = (resourceId) => httpService
  .get(`/${apiVersion}/load-resource/${resourceId}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  getAll,
  create,
  get,
  update,
  remove,
  getTypes,
  getItems,
  loadResource,
};
