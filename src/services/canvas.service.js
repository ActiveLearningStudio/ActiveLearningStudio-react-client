import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const search = (params) => httpService
  .post(
    `/${apiVersion}/go/lms/projects`,
    { params },
  )
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  search,
};
