/* eslint-disable */

import config from 'config';
import httpService from './http.service';
import { errorCatcher } from './errors';

const { apiVersion } = config;

const getKomdoVideoList = (id) =>
  httpService
    .post(`${apiVersion}/komodo/get-my-video-list`, { organization_id: id })
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

export default {
  getKomdoVideoList,
};
