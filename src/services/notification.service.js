import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const allNotifications = () => httpService
  .get(`/${apiVersion}/users/notifications`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const readAllNotifications = () => httpService
  .get(`/${apiVersion}/users/notifications/read-all`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const deleteNotification = (id) => httpService
  .post(`/${apiVersion}/users/notifications/${id}/delete`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  allNotifications,
  readAllNotifications,
  deleteNotification,
};
