/* eslint-disable */
import config from 'config';
import httpService from './http.service';
import { errorCatcher } from './errors';
const { apiVersion } = config;

const getAll = (projectId, skipContent, signal) =>
  httpService
    .get(`/${apiVersion}/projects/${projectId}/playlists`, {}, { skipContent }, signal)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const create = (projectId, playlist) =>
  httpService
    .post(`/${apiVersion}/projects/${projectId}/playlists`, playlist)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const get = (projectId, id) =>
  httpService
    .get(`/${apiVersion}/projects/${projectId}/playlists/${id}`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const update = (projectId, id, playlist) =>
  httpService
    .put(`/${apiVersion}/projects/${projectId}/playlists/${id}`, playlist)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const remove = (projectId, id) =>
  httpService
    .remove(`/${apiVersion}/projects/${projectId}/playlists/${id}`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const reorder = (projectId, playlists) =>
  httpService
    .post(`/${apiVersion}/projects/${projectId}/playlists/reorder`, {
      playlists,
    })
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const loadShared = (id) =>
  httpService
    .get(`/${apiVersion}/playlists/${id}/load-shared`)
    .then(({ data }) => data)
    .catch((err) => {
      // errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const loadLti = (id) =>
  httpService
    .get(`/${apiVersion}/playlists/${id}/lti`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const enablePlaylistShare = (projectId, playlistId) =>
  httpService
    .get(`${apiVersion}/projects/${projectId}/playlists/${playlistId}/share`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const disablePlaylistShare = (projectId, playlistId) =>
  httpService
    .get(`${apiVersion}/projects/${projectId}/playlists/${playlistId}/remove-share`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const loadSingleSharedPlaylist = (projectId, playlistId) =>
  httpService
    .get(`${apiVersion}/projects/${projectId}/playlists/${playlistId}/load-shared-playlist`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const loadAllSharedPlaylists = (projectId) =>
  httpService
    .get(`${apiVersion}/projects/${projectId}/shared-playlist`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const searchPreviewPlaylist = (subOrgId, playlistId) =>
  httpService
    .get(`${apiVersion}/suborganization/${subOrgId}/playlists/${playlistId}/search-preview`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const addActivityPlaylistSearch = (org_id, ind_id, playlist_id) =>
  httpService
    .post(`${apiVersion}/suborganization/${org_id}/independent-activities/${ind_id}/playlist/${playlist_id}/copy-to-playlist`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const moveActivityPlaylist = (org_id, playlist_id, playlistData) =>
  httpService
    .post(`${apiVersion}/suborganization/${org_id}/independent-activities/playlist/${playlist_id}/move-to-playlist`, playlistData)
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
  enablePlaylistShare,
  disablePlaylistShare,
  loadSingleSharedPlaylist,
  loadAllSharedPlaylists,
  searchPreviewPlaylist,
  addActivityPlaylistSearch,
  moveActivityPlaylist,
};
