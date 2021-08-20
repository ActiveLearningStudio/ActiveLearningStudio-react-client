import Swal from 'sweetalert2';

import config from 'config';
import httpService from './http.service';
import { errorCatcher } from './errors';

const { apiVersion } = config;

const getAll = () => httpService
  .get(`/${apiVersion}/activities`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const create = (activity, playlistId) => httpService
  .post(`/${apiVersion}/playlists/${playlistId}/activities`, activity)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const get = (id, playlistId) => httpService
  .get(`/${apiVersion}/playlists/${playlistId}/activities/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getXapi = (xapiData) => httpService
  .post(`/${apiVersion}/xapi/statements`, xapiData)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const update = (id, activity) => httpService
  .put(`/${apiVersion}/activities/${id}`, activity)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const remove = (id, playlistId) => httpService
  .remove(`/${apiVersion}/playlists/${playlistId}/activities/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const upload = (formData, conf) => httpService
  .post(`/${apiVersion}/activities/upload-thumb`, formData, {
    'Content-Type': 'multipart/form-data',
  }, conf)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const uploadActivityTypeThumb = (formData) => httpService
  .post(`/${apiVersion}/activity-types/upload-thumb`, formData, {
    'Content-Type': 'multipart/form-data',
  })
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const uploadActivityItemThumb = (formData) => httpService
  .post(`/${apiVersion}/activity-items/upload-thumb`, formData, {
    'Content-Type': 'multipart/form-data',
  })
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const getTypes = () => httpService
  .get(`/${apiVersion}/activity-types`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const createActivityType = (body) => httpService
  .post(`/${apiVersion}/activity-types`, body)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });
const editActivityType = (body, typeId) => httpService
  .put(`/${apiVersion}/activity-types/${typeId}`, body)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const deleteActivityType = (typeId) => httpService
  .remove(`/${apiVersion}/activity-types/${typeId}`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const getItems = (activityTypeId) => httpService
  .get(`/${apiVersion}/activity-types/${activityTypeId}/items`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getActivityItems = (query, page) => httpService
  .get(`${apiVersion}/get-activity-items${query ? `?query=${encodeURI(query)}` : ''}${page ? `?page=${page}` : ''}`)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const createActivityItem = (body) => httpService
  .post(`/${apiVersion}/activity-items`, body)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });
const editActivityItem = (body, itemId) => httpService
  .put(`/${apiVersion}/activity-items/${itemId}`, body)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const deleteActivityItem = (itemId) => httpService
  .remove(`/${apiVersion}/activity-items/${itemId}`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    Promise.reject(err.response.data);
  });

const h5pToken = (dataH5p) => httpService
  .post(`/${apiVersion}/h5p`, dataH5p)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const h5pSettings = () => httpService
  .get(`/${apiVersion}/h5p/settings`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const h5pResource = (activityId) => httpService
  .get(`/${apiVersion}/activities/${activityId}/h5p`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const h5pSettingsUpdate = (activityId, dataUpload, playlistId) => httpService
  .put(`/${apiVersion}/playlists/${playlistId}/activities/${activityId}`, dataUpload)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const h5pResourceSettings = (activityId) => httpService
  .get(`/${apiVersion}/activities/${activityId}/h5p-resource-settings`)
  .then(({ data }) => data)
  .catch((err) => {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      html: err.message || 'Something went wrong! We are unable to load activity.',
    });
    Promise.reject(err.response.data);
  });

const h5pResourceSettingsOpen = (activityId) => httpService
  // .get(`/${apiVersion}/activities/${activityId}/h5p-resource-settings-open`)
  .get(`/${apiVersion}/h5p/activity/${activityId}/visibility/public`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const h5pResourceSettingsShared = (activityId) => httpService
  .get(`/${apiVersion}/activities/${activityId}/h5p-resource-settings-shared`)
  .then(({ data }) => data)
  .catch((err) => {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      html: err.message || 'Something went wrong! We are unable to load activity.',
    });
    Promise.reject(err.response.data);
  });

const h5pResourceSettingsEmbed = (activityId) => httpService
  .get(`/${apiVersion}/h5p/embed/${activityId}`)
  .then(({ data }) => data)
  .catch((err) => {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      html: err.message || 'Something went wrong! We are unable to load activity.',
    });
    Promise.reject(err.response.data);
  });

const activityH5p = (activityId) => httpService
  .get(`/${apiVersion}/activities/${activityId}/detail`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const shareActivity = (activityId) => httpService
  .get(`/${apiVersion}/activities/${activityId}/share`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const removeShareActivity = (activityId) => httpService
  .get(`/${apiVersion}/activities/${activityId}/remove-share`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const loadH5pShared = (activityId) => httpService
  .get(`/${apiVersion}/h5p/activity/${activityId}/visibility/public`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  getAll,
  create,
  get,
  update,
  remove,
  upload,
  getTypes,
  createActivityType,
  editActivityType,
  deleteActivityType,
  getItems,
  getActivityItems,
  createActivityItem,
  editActivityItem,
  deleteActivityItem,
  uploadActivityTypeThumb,
  uploadActivityItemThumb,
  h5pToken,
  h5pSettings,
  h5pResource,
  h5pSettingsUpdate,
  h5pResourceSettings,
  h5pResourceSettingsOpen,
  h5pResourceSettingsShared,
  h5pResourceSettingsEmbed,
  activityH5p,
  shareActivity,
  loadH5pShared,
  removeShareActivity,
  getXapi,
};
