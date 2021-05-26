import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const login = (lms, params) => httpService
  .post(`/${apiVersion}/go/${lms}/login`, params)
  .then(({ data }) => data)
  .catch((err) => err.response.data);

const loadH5PSettings = (activityId, studentId = null) => httpService
  .get(
    `/${apiVersion}/google-classroom/activities/${activityId}/h5p-resource-settings`,
    {},
    { gcuid: studentId },
  )
  .then(({ data }) => data)
  .catch((err) => {
    Promise.reject(err.response.data);
  });

export default {
  login,
  loadH5PSettings,
};
