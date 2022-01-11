/* eslint-disable */
import config from 'config';
import { errorCatcher } from './errors';

import httpService from './http.service';

const { apiVersion } = config;

const getAll = (orgId) =>
  httpService
    .get(`/${apiVersion}/suborganizations/${orgId}/stand-alone-activity`)
    .then(({ data }) => data)
    .catch((err) => {
      //errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const deleteVideo = (orgId, activityID) =>
  httpService
    .remove(`/${apiVersion}/suborganizations/${orgId}/stand-alone-activity/${activityID}`)
    .then(({ data }) => data)
    .catch((err) => {
      //errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const addVideo = (orgId, values) =>
  httpService
    .post(`/${apiVersion}/suborganizations/${orgId}/stand-alone-activity`, {
      ...values,
      organization_id: orgId,
    })
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const brightCMS = (orgId) =>
  httpService
    .get(`/${apiVersion}/brightcove/suborganization/${orgId}/get-bc-account-list`)
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response.data);
    });

const brightCMSVideo = (values, offset) =>
  httpService
    .post(`/${apiVersion}/brightcove/get-bc-videos-list`, values)
    .then(({ data }) => data)
    .catch((err) => {
      //errorCatcher(err.response.data);
      return err;
    });

const videoh5pDetail = (orgId, activityId) =>
  httpService
    .get(`/${apiVersion}/suborganizations/${orgId}/stand-alone-activity/${activityId}/detail`)
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response.data);
    });

const renderh5pvideo = (orgId, activityId) =>
  httpService
    .get(`/${apiVersion}/suborganizations/${orgId}/stand-alone-activity/${activityId}/h5p`)
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response.data);
    });

const getSearchVideoCard = (orgId, searchQuery) =>
  httpService
    .get(`/${apiVersion}/suborganizations/${orgId}/stand-alone-activity?query=${searchQuery}`)
    .then(({ data }) => data)
    .catch((err) => {
      //errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const edith5pVideoActivity = (orgId, activityId, formData) =>
  httpService
    .put(`/${apiVersion}/suborganizations/${orgId}/stand-alone-activity/${activityId}`, formData)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const cloneh5pvideo = (orgId, activityId, formData) =>
  httpService
    .post(`/${apiVersion}/suborganizations/${orgId}/stand-alone-activity/${activityId}/clone`, formData)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const allBrightCove = (orgId) =>
  httpService
    .get(`/${apiVersion}/suborganizations/${orgId}/brightcove-api-settings`)
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response.data);
    });

const addBrightCove = (orgId, data) =>
  httpService
    .post(`/${apiVersion}/suborganizations/${orgId}/brightcove-api-settings`, data)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
    });

const deleteBrightCove = (orgId, settingId) =>
  httpService
    .remove(`/${apiVersion}/suborganizations/${orgId}/brightcove-api-settings/${settingId}`)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const editBrightCove = (orgId, settingId, data) =>
  httpService
    .put(`/${apiVersion}/suborganizations/${orgId}/brightcove-api-settings/${settingId}`, data)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

export default {
  getAll,
  addVideo,
  brightCMS,
  brightCMSVideo,
  getSearchVideoCard,
  deleteVideo,
  videoh5pDetail,
  renderh5pvideo,
  edith5pVideoActivity,
  cloneh5pvideo,
  allBrightCove,
  addBrightCove,
  deleteBrightCove,
  editBrightCove,
};
