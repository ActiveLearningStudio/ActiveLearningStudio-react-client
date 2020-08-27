import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const me = () => httpService
  .get(`/${apiVersion}/users/me`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const login = (body) => httpService
  .post('/login', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const register = (body) => httpService
  .post('/register', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const confirmEmail = (body) => httpService
  .post('/verify-email', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const forgotPassword = (body) => httpService
  .post('/forgot-password', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const resetPassword = (body) => httpService
  .post('/reset-password', body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const updateProfile = (body) => httpService
  .put(`/${apiVersion}/users/${body.id}`, body)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const subscribe = () => httpService
  .post(`/${apiVersion}/subscribe`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  me,
  login,
  register,
  confirmEmail,
  forgotPassword,
  resetPassword,
  updateProfile,
  subscribe,
};
