import config from 'config';
import httpService from './http.service';
// import axios from 'axios';

const { apiVersion } = config;

const allNotifications = () => httpService
  .get(`/${apiVersion}/users/notifications`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  allNotifications,
};
