import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const getUserMetrics = (userId) => httpService
  .get(`/${apiVersion}/users/${userId}/metrics`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const getUserMembership = (userId) => httpService
  .get(`/${apiVersion}/users/${userId}/membership`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const logActivityView = (activityId) => httpService
  .get(`/${apiVersion}/activities/${activityId}/logview`);

export default {
  getUserMetrics,
  getUserMembership,
  logActivityView
};
