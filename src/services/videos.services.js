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

const brightCMSVideo = (values) =>
  httpService
    .post(`/${apiVersion}/brightcove/get-bc-videos-list`, values)
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response.data);
    });

export default {
  getAll,
  addVideo,
  brightCMS,
  brightCMSVideo,
  deleteVideo,
};
