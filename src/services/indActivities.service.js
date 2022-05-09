/* eslint-disable */

import config from 'config';
import httpService from './http.service';
import { errorCatcher } from './errors';

const { apiVersion } = config;

const create = (subOrgId, activity) =>
  httpService
    .post(`${apiVersion}/suborganization/${subOrgId}/activities`, activity)
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

export default {
  create,
};
