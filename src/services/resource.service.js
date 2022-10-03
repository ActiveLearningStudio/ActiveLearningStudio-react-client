/* eslint-disable */
import Swal from 'sweetalert2';

import config from 'config';
import httpService from './http.service';
import { errorCatcher } from './errors';

const { apiVersion } = config;

const getAll = () =>
  httpService
    .get(`/${apiVersion}/activities`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const getAllLayout = (subOrgId) =>
  httpService
    .get(`/${apiVersion}/suborganizations/${subOrgId}/activity-layouts`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const getSingleLayout = (subOrgId) =>
  httpService
    .get(`/${apiVersion}/suborganizations/${subOrgId}/get-activity-items?skipPagination=true`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));
const create = (activity, playlistId) =>
  httpService
    .post(`/${apiVersion}/playlists/${playlistId}/activities`, activity)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const get = (id, playlistId) =>
  httpService
    .get(`/${apiVersion}/playlists/${playlistId}/activities/${id}`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const getXapi = (xapiData) =>
  httpService
    .post(`/${apiVersion}/xapi/statements`, xapiData)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const update = (id, activity) =>
  httpService
    .put(`/${apiVersion}/activities/${id}`, activity)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const remove = (id, playlistId) =>
  httpService
    .remove(`/${apiVersion}/playlists/${playlistId}/activities/${id}`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const upload = (formData, conf) =>
  httpService
    .post(
      `/${apiVersion}/activities/upload-thumb`,
      formData,
      {
        'Content-Type': 'multipart/form-data',
      },
      conf,
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const uploadActivityTypeThumb = (formData) =>
  httpService
    .post(`/${apiVersion}/activity-types/upload-thumb`, formData, {
      'Content-Type': 'multipart/form-data',
    })
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const uploadActivityTypeFile = (formData) =>
  httpService
    .post(`/${apiVersion}/activity-types/upload-css`, formData, {
      'Content-Type': 'multipart/form-data',
    })
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const uploadActivityItemThumb = (formData) =>
  httpService
    .post(`/${apiVersion}/activity-items/upload-thumb`, formData, {
      'Content-Type': 'multipart/form-data',
    })
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const uploadActivityLayoutThumb = (formData) =>
  httpService
    .post(`/${apiVersion}/activity-layouts/upload-thumb`, formData, {
      'Content-Type': 'multipart/form-data',
    })
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const getTypes = (subOrgId) =>
  httpService
    .get(`/${apiVersion}/suborganizations/${subOrgId}/activity-types`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const getAllTypesIV = () =>
  httpService
    .get(`/${apiVersion}/h5p/ajax/libraries`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const createActivityType = (subOrgId, body) =>
  httpService
    .post(`/${apiVersion}/suborganizations/${subOrgId}/activity-types`, body)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });
const editActivityType = (subOrgId, body, typeId) =>
  httpService
    .put(`/${apiVersion}/suborganizations/${subOrgId}/activity-types/${typeId}`, body)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const deleteActivityType = (subOrgId, typeId) =>
  httpService
    .remove(`/${apiVersion}/suborganizations/${subOrgId}/activity-types/${typeId}`)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const getItems = (activityTypeId) =>
  httpService
    .get(`/${apiVersion}/activity-types/${activityTypeId}/items`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const getActivityItems = (subOrgId, query, page, size, column = '', orderBy = '', filterBy) =>
  httpService
    .get(
      `${apiVersion}/suborganizations/${subOrgId}/get-activity-items${page ? `?page=${page}` : ''}${query ? `&query=${query.replace(/#/, '%23')}` : ''}
      ${size ? `&size=${size}` : ''}
      ${column ? `&order_by_column=${column}` : ''}
      ${orderBy ? `&order_by_type=${orderBy}` : ''}
      ${filterBy ? `&filter=${filterBy}` : ''}`,
    )
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const createActivityItem = (subOrgId, body) =>
  httpService
    .post(`/${apiVersion}/suborganizations/${subOrgId}/activity-items`, body)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });
const editActivityItem = (subOrgId, body, itemId) =>
  httpService
    .put(`/${apiVersion}/suborganizations/${subOrgId}/activity-items/${itemId}`, body)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const deleteActivityItem = (subOrgId, itemId) =>
  httpService
    .remove(`/${apiVersion}/suborganizations/${subOrgId}/activity-items/${itemId}`)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const h5pToken = (dataH5p) =>
  httpService
    .post(`/${apiVersion}/h5p`, dataH5p)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const h5pSettings = (library, accountId = null, settingId = null) =>
  httpService
    .get(`/${apiVersion}/h5p/settings?libraryName=${library}&accountId=${accountId}&brightcove_api_setting_id=${settingId}`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const h5pResource = (activityId) =>
  httpService
    .get(`/${apiVersion}/activities/${activityId}/h5p`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const h5pSettingsUpdate = (activityId, dataUpload, playlistId) =>
  httpService
    .put(`/${apiVersion}/playlists/${playlistId}/activities/${activityId}`, dataUpload)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const independentH5pResourceSettings = (activityId) =>
  httpService
    .get(`/${apiVersion}/independent-activities/${activityId}/h5p-resource-settings`)
    .then(({ data }) => data)
    .catch((err) => {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        html: err.message || 'Something went wrong! We are unable to load activity.',
      });
      Promise.reject(err.response.data);
    });

const h5pResourceSettings = (activityId) =>
  httpService
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

const h5pResourceSettingsOpen = (activityId) =>
  httpService
    // .get(`/${apiVersion}/activities/${activityId}/h5p-resource-settings-open`)
    .get(`/${apiVersion}/h5p/activity/${activityId}/visibility/public`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const h5pResourceSettingsShared = (activityId) =>
  httpService
    .get(`/${apiVersion}/activities/${activityId}/h5p-resource-settings-shared`)
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
    });

const h5pResourceSettingsEmbed = (activityId) =>
  httpService
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

const getActivityCss = (activityId) =>
  httpService
    .get(`/${apiVersion}/get-activity-item/${activityId}/external-css`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const activityH5p = (activityId) =>
  httpService
    .get(`/${apiVersion}/activities/${activityId}/detail`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const shareActivity = (activityId, orgId) =>
  httpService
    .get(`/${apiVersion}/activities/${activityId}/share`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const removeShareActivity = (activityId) =>
  httpService
    .get(`/${apiVersion}/activities/${activityId}/remove-share`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const loadH5pShared = (activityId) =>
  httpService
    .get(`/${apiVersion}/h5p/activity/${activityId}/visibility/public`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));

const searchPreviewActivity = (subOrgId, activityId) =>
  httpService
    .get(`/${apiVersion}/suborganization/${subOrgId}/activities/${activityId}/search-preview`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response.data));
const searchPreviewIndependentActivity = (subOrgId, independent_activity) =>
  httpService
    .get(`/${apiVersion}/suborganization/${subOrgId}/independent-activities/${independent_activity}/search-preview`)
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
  uploadActivityTypeFile,
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
  uploadActivityLayoutThumb,
  getActivityCss,
  h5pToken,
  h5pSettings,
  h5pResource,
  h5pSettingsUpdate,
  independentH5pResourceSettings,
  h5pResourceSettings,
  h5pResourceSettingsOpen,
  h5pResourceSettingsShared,
  h5pResourceSettingsEmbed,
  activityH5p,
  shareActivity,
  loadH5pShared,
  removeShareActivity,
  getXapi,
  getAllLayout,
  getSingleLayout,
  searchPreviewActivity,
  searchPreviewIndependentActivity,
  getAllTypesIV,
};
