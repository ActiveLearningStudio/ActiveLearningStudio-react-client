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

const allIndActivity = (subOrgId) =>
  httpService
    .get(`${apiVersion}/suborganization/${subOrgId}/independent-activities`)
    .then(({ data }) => data)
    .catch((err) => {
      return Promise.reject(err.response.data);
    });

export default {
  create,
  allIndActivity,
};
