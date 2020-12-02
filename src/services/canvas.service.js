import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const search = (params) => httpService
  .post(
    `/${apiVersion}/go/lms/activities`,
    { ...params },
  )
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getH5pSettings = (activityId) => httpService
  .get(`/${apiVersion}/google-classroom/activities/${activityId}/h5p-resource-settings`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  search,
  getH5pSettings,
};
