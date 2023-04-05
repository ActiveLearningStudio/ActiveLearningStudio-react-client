/* eslint-disable */

import config from 'config';
import httpService from './http.service';
import { errorCatcher } from './errors';

const { apiVersion } = config;

const create = (subOrgId, activity) =>
  httpService
    .post(`${apiVersion}/suborganization/${subOrgId}/independent-activities`, activity)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const sharedIndependentActivity = (id) =>
  httpService
    .get(`${apiVersion}/independent-activities/${id}/h5p-activity`)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const allIndActivity = (subOrgId, page = 1, size = 10, search) =>
  httpService
    .get(`${apiVersion}/suborganization/${subOrgId}/independent-activities?page=${page}&size=${size}${search ? `&query=${search?.replace(/#/, '%23')}` : ''}`)
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response.data);
    });

const allAdminExportActivity = (subOrgId, page = 1, size = 10, search, column = '', orderBy = '') =>
  httpService
    .get(
      `${apiVersion}/suborganization/${subOrgId}/users/notifications/export-list-independent-activities?page=${page}&size=${size}${
        search && `&query=${search?.replace(/#/, '%23')}`
      }${column ? `&order_by_column=${column}` : ''}${orderBy ? `&order_by_type=${orderBy?.toLowerCase()}` : ''}`,
    )
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response.data);
    });

const renderh5pIndependent = (orgId, activityId) =>
  httpService
    .get(`/${apiVersion}/independent-activities/${activityId}/h5p`)
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response.data);
    });
const allAdminIntActivities = (subOrgId, page = 1, size = 10, search, column = '', orderBy = '', authorId, createdFrom, createdTo, updatedFrom, updatedTo, shared, index, visibility) =>
  httpService
    .get(
      `${apiVersion}/suborganizations/${subOrgId}/independent-activities?page=${page}&size=${size}${search ? `&query=${search?.replace(/#/, '%23')}` : ''}
  ${authorId ? `&author_id=${authorId}` : ''}${createdFrom ? `&created_from=${createdFrom}` : ''}${createdTo ? `&created_to=${createdTo}` : ''}
${updatedFrom ? `&updated_from=${updatedFrom}` : ''}${updatedTo ? `&updated_to=${updatedTo}` : ''}${shared || shared === 0 ? `&shared=${shared}` : ''}${
        index || index === null ? `&indexing=${index}` : ''}${visibility ? `&visibility=${visibility}` : ''}${
          column ? `&order_by_column=${column}` : ''}${orderBy ? `&order_by_type=${orderBy?.toLowerCase()}` : ''}
  `,
    )
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response.data);
    });

const deleteIndActivity = (subOrgId, id) =>
  httpService
    .remove(`/${apiVersion}/suborganization/${subOrgId}/independent-activities/${id}`)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const editIndActivityItem = (subOrgId, body, id) =>
  httpService
    .put(`/${apiVersion}/suborganization/${subOrgId}/independent-activities/${id}`, body)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const intActivityDetail = (subOrgId, id) =>
  httpService
    .get(`/${apiVersion}/independent-activities/${id}/detail`)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const shareEnable = (id) =>
  httpService
    .get(`/${apiVersion}/independent-activities/${id}/share`)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const shareDisable = (id) =>
  httpService
    .get(`/${apiVersion}/independent-activities/${id}/remove-share`)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const indActivityClone = (subOrgId, id) =>
  httpService
    .post(`/${apiVersion}/suborganization/${subOrgId}/independent-activities/${id}/clone`)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const copyToIndependentActivity = (subOrgId, id) =>
  httpService
    .post(`/${apiVersion}/suborganization/${subOrgId}/independent-activities/activity/${id}/copy-to-independent-activity`)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const exportIndAvtivity = (subOrgId, id) =>
  httpService
    .post(`/${apiVersion}/suborganization/${subOrgId}/independent-activities/${id}/export`)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const importIndAvtivity = (subOrgId, activityData) =>
  httpService
    .post(`/${apiVersion}/suborganization/${subOrgId}/independent-activities/import`, activityData)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const getIndex = (activtyId, indexId) =>
  httpService
    .get(`/${apiVersion}/independent-activities/${activtyId}/indexes/${indexId}`)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });
const h5pResourceSettingsSharedIndActivity = (activityId) =>
  httpService
    .get(`/${apiVersion}/independent-activities/${activityId}/h5p-resource-settings-shared`)
    .then(({ data }) => data)
    .catch((err) => {
      Promise.reject(err.response.data);
      return err.response.data;
    });

export default {
  create,
  allIndActivity,
  deleteIndActivity,
  editIndActivityItem,
  intActivityDetail,
  shareEnable,
  shareDisable,
  allAdminIntActivities,
  indActivityClone,
  exportIndAvtivity,
  importIndAvtivity,
  getIndex,
  allAdminExportActivity,
  renderh5pIndependent,
  h5pResourceSettingsSharedIndActivity,
  sharedIndependentActivity,
  copyToIndependentActivity,
};
