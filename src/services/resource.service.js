import Swal from 'sweetalert2';
import axios from 'axios';
import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const getAll = () => httpService
  .get(`/${apiVersion}/activities`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const create = (activity) => httpService
  .post(`/${apiVersion}/activities`, activity)
  .then(({ data }) => data)
  .catch((err) => {
    if (err.errors) {
      if (err.errors.title.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.errors.title[0],
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
      });
    }
  });

const get = (id) => httpService
  .get(`/${apiVersion}/activities/${id}`)
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

const remove = (id) => httpService
  .remove(`/${apiVersion}/activities/${id}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const upload = (formData, conf) => httpService
  .post(`/${apiVersion}/activities/upload-thumb`, formData, {
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

const getTypes = () => httpService
  .get(`/${apiVersion}/activity-types`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getItems = (activityTypeId) => httpService
  .get(`/${apiVersion}/activity-types/${activityTypeId}/items`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

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

const h5pSettingsUpdate = (activityId, dataUpload) => httpService
  .put(`/${apiVersion}/activities/${activityId}`, dataUpload)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const h5pResourceSettings = (activityId) => httpService
  .get(`/${apiVersion}/activities/${activityId}/h5p-resource-settings`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const h5pResourceSettingsOpen = (activityId) => httpService
  // .get(`/${apiVersion}/activities/${activityId}/h5p-resource-settings-open`)
  .get(`/${apiVersion}/h5p/activity/${activityId}/visibility/public`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const h5pResourceSettingsShared = (activityId) => httpService
  .get(`/${apiVersion}/activities/${activityId}/h5p-resource-settings-shared`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const h5pResourceSettingsEmbed = (activityId) => httpService
  .get(`/${apiVersion}/h5p/embed/${activityId}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

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

const safeApiAuth = () => axios
  .post('https://api.v10.learnsafe.com/accounts/AC5771e791affd4176966bf63c846c8701/integrators/auth/token', null, {
    headers: {
      Authorization: 'Bearer TO2BF2E47CCCDD4A04944984A4E8275193',
    },
  })
  .then(({ data }) => data)
  .catch((err) => err.response.data);

const safeApiCheck = (token, content, time) => axios
  .post('https://api.v10.learnsafe.com/accounts/AC5771e791affd4176966bf63c846c8701/integrators/content/check',
    {
      userName: localStorage.getItem('userIdLearnSafe') || 'Vivensity User',
      workstationName: localStorage.getItem('auth_token'),
      reportedAt: time,
      applicationName: 'Vivensity imSparked Platform',
      ipAddress: '0.0.0.0',
      unitPath: 'demo',
      image: null,
      content,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  .then(({ data }) => data)
  .catch((err) => err.response.data);

export default {
  getAll,
  create,
  get,
  update,
  remove,
  upload,
  getTypes,
  getItems,
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
  safeApiAuth,
  safeApiCheck,
};
