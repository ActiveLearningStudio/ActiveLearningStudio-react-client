/* eslint-disable */

import config from 'config';
import httpService from './http.service';
import { errorCatcher } from './errors';

const { apiVersion } = config;

const getKomdoVideoList = (id, page = 1, size = 10, search) =>
  httpService
    .post(`${apiVersion}/komodo/get-my-video-list`, {
      organization_id: id,
      page: page,
      per_page: size,
      search: search?.replace(/#/, '%23'),
    })
    .then(({ data }) => data)
    .catch((err) => {
      errorCatcher(err.response.data);
      Promise.reject(err.response.data);
    });

export default {
  getKomdoVideoList,
};
