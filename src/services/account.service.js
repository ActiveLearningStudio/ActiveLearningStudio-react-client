import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const getUserLmsSettings = () => httpService
  .get(`/${apiVersion}/user-lms-settings`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  getUserLmsSettings,
};
