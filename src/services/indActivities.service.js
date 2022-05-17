/* eslint-disable */

import config from "config";
import httpService from "./http.service";
import { errorCatcher } from "./errors";

const { apiVersion } = config;

const create = (subOrgId, activity) =>
  httpService
    .post(
      `${apiVersion}/suborganization/${subOrgId}/independent-activities`,
      activity
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

// const allIndActivity = (subOrgId) =>
//   httpService
//     .get(`${apiVersion}/suborganization/${subOrgId}/independent-activities`)
//     .then(({ data }) => data)
//     .catch((err) => {
//       return Promise.reject(err.response.data);
//     });
const allIndActivity = (subOrgId, page = 1, size = 10) =>
  httpService
    .get(
      `${apiVersion}/suborganization/${subOrgId}/independent-activities?page=${page}&size=${size}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response.data);
    });

const allAdminIntActivities = (subOrgId, page = 1, size = 10, search) =>
  httpService
    .get(
      `${apiVersion}/suborganizations/${subOrgId}/independent-activities?page=${page}&size=${size}${
        search ? `&query=${search.replace(/#/, "%23")}` : ""
      }`
    )
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response.data);
    });

const deleteIndActivity = (subOrgId, id) =>
  httpService
    .remove(
      `/${apiVersion}/suborganization/${subOrgId}/independent-activities/${id}`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const editIndActivityItem = (subOrgId, body, id) =>
  httpService
    .put(
      `/${apiVersion}/suborganization/${subOrgId}/independent-activities/${id}`,
      body
    )
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
    .post(
      `/${apiVersion}/suborganization/${subOrgId}/independent-activities/${id}/clone`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

const exportIndAvtivity = (subOrgId, id) =>
  httpService
    .post(
      `/${apiVersion}/suborganization/${subOrgId}/independent-activities/${id}/export`
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
    });

const importIndAvtivity = (subOrgId, activityData) =>
  httpService
    .post(
      `/${apiVersion}/suborganization/${subOrgId}/independent-activities/import`,
      activityData
    )
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      return Promise.reject(err.response.data);
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
};
